import { _Resolver } from "../../../interface";
import { KICK } from "../../../util";

type _Args = {
  participantId: number;
};

const releaseMember: _Resolver<never, _Args> = {
  Mutation: {
    releaseMember: async (
      _,
      { participantId },
      { request, isLogin, isMe, prisma }
    ) => {
      isLogin(request);
      const participant = await prisma.participant.findOne({
        where: { id: participantId },
        include: {
          room: {
            select: {
              id: true,
              managerId: true,
            },
          },
        },
      });
      isMe(request, participant?.room.managerId!);
      await prisma.participant.delete({ where: { id: participantId } });
      await prisma.notification.create({
        data: {
          user: { connect: { id: participant?.userId } },
          room: { connect: { id: participant?.room.id } },
          type: KICK,
        },
      });
      return true;
    },
  },
};

export default releaseMember;
