import { _Resolver } from "../../../interface";

// ! participants와 pendings를 포함한 data를 return
// * manager는 id, imageUrl, username만 return
const roomPrivate: _Resolver<never, { roomId: number }> = {
  Query: {
    roomPrivate: async (_, { roomId }, { request, isLogin, prisma }) => {
      isLogin(request);
      const { id } = request.user!;

      const room = await prisma.room.findOne({
        where: { id: roomId },
        include: {
          manager: {
            select: {
              imageUrl: true,
              username: true,
            },
          },
          participants: true,
          pendings: true,
        },
      });
      const isMember = Boolean(
        room?.participants.find((item) => item.userId === id)
      );

      if (room?.managerId !== id && !isMember) {
        throw Error("권한이 없습니다.");
      }
      return room;
    },
  },
};

export default roomPrivate;
