import { _Resolver } from "../../../interface";
import { DENY } from "../../../util";

type _Args = {
  pendingId: number;
  message: string;
};

const denyPending: _Resolver<never, _Args> = {
  Mutation: {
    denyPending: async (
      _,
      { pendingId, message },
      { request, isLogin, isMe, prisma }
    ) => {
      isLogin(request);
      const pending = await prisma.pending.findOne({
        where: { id: pendingId },
        include: {
          room: {
            select: {
              managerId: true,
              title: true,
            },
          },
        },
      });
      isMe(request, pending?.room.managerId!);
      // * 해당 요청 삭제
      await prisma.pending.delete({ where: { id: pendingId } });
      // * 요청의 user에게 알림 전송
      await prisma.notification.create({
        data: {
          user: { connect: { id: pending?.userId } },
          room: { connect: { id: pending?.roomId } },
          type: DENY,
          message,
        },
      });
      return true;
    },
  },
};

export default denyPending;
