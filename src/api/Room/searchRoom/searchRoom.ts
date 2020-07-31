import { _Resolver } from "../../../interface";

type _Args = {
  keyward: string;
};

// ! select로 설정된 Field만 return 됨
// * contactURL은 return 하지않음
const searchRoom: _Resolver<never, _Args> = {
  Query: {
    searchRoom: (_, { keyward }, { prisma }) =>
      prisma.room.findMany({
        where: {
          OR: [
            { title: { contains: keyward } },
            { area: { contains: keyward } },
          ],
        },
        select: {
          id: true,
          imageUrl: true,
          area: true,
          title: true,
        },
      }),
  },
};

export default searchRoom;
