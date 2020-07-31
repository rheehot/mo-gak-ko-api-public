import { Participant } from "@prisma/client";
import { _Resolver } from "../../interface";

const Participant: _Resolver<Participant> = {
  Participant: {
    user: ({ userId }, __, { prisma }) =>
      prisma.user.findOne({
        where: { id: userId },
        select: {
          imageUrl: true,
          username: true,
        },
      }),
    room: ({ roomId }, __, { prisma }) =>
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

export default Participant;
