import { Pending } from "@prisma/client";
import { _Resolver } from "../../interface";

const Pending: _Resolver<Pending> = {
  Pending: {
    user: ({ userId }, _, { prisma }) =>
      prisma.user.findOne({
        where: { id: userId },
        select: {
          imageUrl: true,
          username: true,
        },
      }),
    room: ({ roomId }, _, { prisma }) =>
      prisma.room.findOne({
        where: { id: roomId },
        select: {
          id: true,
          imageUrl: true,
          area: true,
          title: true,
        },
      }),
  },
};

export default Pending;
