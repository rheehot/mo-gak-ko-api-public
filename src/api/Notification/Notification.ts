import { Notification } from "@prisma/client";
import { _Resolver } from "../../interface";

const Notification: _Resolver<Notification> = {
  Notification: {
    user: ({ userId }, __, { prisma }) =>
      prisma.user.findOne({ where: { id: userId } }),
    room: ({ roomId }, __, { prisma }) =>
      prisma.room.findOne({
        where: { id: roomId },
        select: {
          id: true,
          title: true,
        },
      }),
  },
};

export default Notification;
