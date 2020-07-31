import { Room } from "@prisma/client";
import { _Resolver } from "../../interface";

const Room: _Resolver<Room> = {
  Room: {
    // ! roomPublic으로만 manager username을 제공 받기 때문에 주석 처리.
    // manager: ({ managerId }, __, { prisma }) =>
    //   prisma.user.findOne({ where: { id: managerId } }),
    // ! 포스트맨으로 roomPublic API를 통하여 참가자 목록, 요청 목록을 보는 것을 막기위한 주석 처리.
    // participants: ({ id }, __, { prisma }) =>
    //   prisma.participant.findMany({ where: { roomId: id } }),
    // pendings: ({ id }, __, { prisma }) =>
    //   prisma.pending.findMany({ where: { roomId: id } }),
    // * Room의 매니저인지 확인
    isManager: async ({ id }, _, { request, prisma }) => {
      if (!request.user) {
        return false;
      }
      const { id: requestId } = request.user!;
      const data = await prisma.room.findOne({ where: { id } });
      return data?.managerId === requestId;
    },
    // * Room에 참가 요청 중인지 확인
    isPending: async ({ id }, _, { request, prisma }) => {
      if (!request.user) {
        return false;
      }
      const { id: requestId } = request.user!;
      const data = await prisma.room
        .findOne({ where: { id } })
        .pendings({ where: { userId: requestId } });
      return Boolean(data[0]);
    },
    // * Room에 가입된 상태인지 확인
    isMember: async ({ id }, _, { request, prisma }) => {
      if (!request.user) {
        return false;
      }
      const { id: requestId } = request.user!;
      const data = await prisma.room
        .findOne({ where: { id } })
        .participants({ where: { userId: requestId } });
      return data[0]?.userId === requestId;
    },
    // * Room에 가입된 멤버가 몇 명인지 확인 (manager 본인 포함)
    memberCount: ({ id }, _, { prisma }) =>
      prisma.participant
        .count({ where: { roomId: id } })
        .then((res) => res + 1),
  },
};

export default Room;
