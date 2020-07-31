import { _Resolver } from "../../../interface";

type _Args = {
  last?: number;
};

// ! select로 설정된 Field만 return 됨
// * req.user가 존재하면 초기 7개, 존재하지 않으면 8개 take
const rooms: _Resolver<never, _Args> = {
  Query: {
    rooms: async (_, { last }, { prisma, request }) => {
      if (!last) {
        return prisma.room.findMany({
          orderBy: { id: "desc" },
          select: {
            id: true,
            imageUrl: true,
            area: true,
            title: true,
          },
          take: request.user ? 7 : 8,
        });
      }
      return prisma.room.findMany({
        orderBy: { id: "desc" },
        select: { id: true, imageUrl: true, area: true, title: true },
        cursor: { id: last },
        take: 8,
        skip: 1,
      });
    },
  },
};

export default rooms;
