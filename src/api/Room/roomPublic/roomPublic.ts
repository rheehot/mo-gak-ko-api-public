import { _Resolver } from "../../../interface";

type _Args = {
  roomId: number;
};

// ! select로 설정된 Field만 return 됨
// * contactURL, participants, pendings는 return 안됨
const roomPublic: _Resolver<never, _Args> = {
  Query: {
    roomPublic: (_, { roomId }, { prisma }) =>
      prisma.room.findOne({
        where: { id: roomId },
        select: {
          id: true,
          area: true,
          title: true,
          description: true,
          manager: {
            select: {
              username: true,
              imageUrl: true,
            },
          },
        },
      }),
  },
};

export default roomPublic;
