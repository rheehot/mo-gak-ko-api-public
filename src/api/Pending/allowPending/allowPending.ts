import { _Resolver } from "../../../interface";
import { ALLOW } from "../../../util";

type _Args = {
  pendingId: number;
};

const allowPending: _Resolver<never, _Args> = {
  Mutation: {
    allowPending: async (
      _,
      { pendingId },
      { request, isLogin, isMe, prisma }
    ) => {
      isLogin(request);
      // * pendingId에 대한 정보 조회
      const pending = await prisma.pending.findOne({
        where: { id: pendingId },
        include: {
          room: {
            select: {
              id: true,
              managerId: true,
              title: true,
            },
          },
        },
      });
      isMe(request, pending?.room.managerId!);
      // * 요청 확인 후 참가자 추가
      await prisma.participant.create({
        data: {
          user: { connect: { id: pending?.userId } },
          room: { connect: { id: pending?.room.id } },
          appeal: pending?.appeal!,
        },
      });
      // * 요청 삭제
      await prisma.pending.delete({ where: { id: pendingId } });
      // * 알림 전송
      await prisma.notification.create({
        data: {
          user: { connect: { id: pending?.userId } },
          room: { connect: { id: pending?.roomId } },
          type: ALLOW,
        },
      });
      return true;
    },
  },
};

export default allowPending;
