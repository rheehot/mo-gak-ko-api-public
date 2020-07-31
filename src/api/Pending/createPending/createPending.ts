import { _Resolver } from "../../../interface";
import { REQUEST } from "../../../util";

type _Args = {
  roomId: number;
  appeal: string;
};

const createPending: _Resolver<never, _Args> = {
  Mutation: {
    createPending: async (
      _,
      { roomId, appeal },
      { request, isLogin, prisma }
    ) => {
      isLogin(request);
      const { id: userId } = request.user!;
      // * 요청이 존재하는지 확인
      const room = await prisma.room.findOne({
        where: { id: roomId },
        include: { pendings: { where: { userId } } },
      });
      if (room?.pendings.length !== 0) {
        throw Error("이미 요청 하셨습니다.");
      }
      // * 요청 전송
      await prisma.pending.create({
        data: {
          user: { connect: { id: userId } },
          room: { connect: { id: roomId } },
          appeal,
        },
      });
      // * 알림 전송
      await prisma.notification.create({
        data: {
          user: { connect: { id: room.managerId } },
          room: { connect: { id: room.id } },
          type: REQUEST,
        },
      });
      return true;
    },
  },
};

export default createPending;
