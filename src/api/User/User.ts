import { User } from "@prisma/client";
import { _Resolver } from "../../interface";

const User: _Resolver<User> = {
  User: {
    notificationCount: ({ id }, _, { prisma }) =>
      prisma.notification.count({ where: { userId: id } }),
    // ! roomPublic으로 manager에 접근하는 것을 방지하기 위한 주석 처리.
    // myRooms: ({ id }, _, { prisma }) =>
    //   prisma.room.findMany({
    //     where: { managerId: id },
    //     select: {
    //       id: true,
    //       imageUrl: true,
    //       area: true,
    //       title: true,
    //     },
    //   }),
    // joinRooms: async ({ id }, _, { prisma }) =>
    //   prisma.participant.findMany({
    //     where: { userId: id },
    //   }),
    // pendings: ({ id }, _, { prisma }) =>
    //   prisma.pending.findMany({ where: { userId: id } }),
    // notifications: ({ id }, _, { prisma }) =>
    //   prisma.notification.findMany({
    //     where: { userId: id },
    //     orderBy: { id: "desc" },
    //   }),
  },
};

export default User;
