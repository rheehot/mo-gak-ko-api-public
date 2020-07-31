import { _Resolver } from "../../../interface";

type _Args = {
  roomId: number;
};

const withdrawMember: _Resolver<never, _Args> = {
  Mutation: {
    withdrawMember: async (_, { roomId }, { request, isLogin, prisma }) => {
      isLogin(request);
      const { id } = request.user!;
      const participant = await prisma.room
        .findOne({ where: { id: roomId } })
        .participants({ where: { userId: id } });
      await prisma.participant.delete({ where: { id: participant[0].id } });
      return true;
    },
  },
};

export default withdrawMember;
