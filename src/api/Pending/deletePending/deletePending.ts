import { _Resolver } from "../../../interface";

type _Args = {
  roomId: number;
};

const deletePending: _Resolver<never, _Args> = {
  Mutation: {
    deletePending: async (
      _,
      { roomId },
      { request, isLogin, isMe, prisma }
    ) => {
      isLogin(request);
      const { id: requestId } = request.user!;
      const pending = await prisma.room
        .findOne({ where: { id: roomId } })
        .pendings({ where: { userId: requestId } });
      isMe(request, pending[0].userId);
      // * 요청 삭제
      await prisma.pending.delete({ where: { id: pending[0].id } });
      return true;
    },
  },
};

export default deletePending;
