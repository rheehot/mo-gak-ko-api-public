import { _Resolver } from "../../../interface";

const roomCount: _Resolver = {
  Query: {
    roomCount: (_, __, { prisma }) => prisma.room.count(),
  },
};

export default roomCount;
