import { _Resolver } from "../../../interface";

type _Args = {
  roomId: number;
  area: string;
  title: string;
  description: string;
  contactURL: string;
};

const updateRoom: _Resolver<never, _Args> = {
  Mutation: {
    updateRoom: async (
      _,
      { roomId, area, title, description, contactURL },
      { request, isLogin, isMe, prisma }
    ) => {
      isLogin(request);
      const room = await prisma.room.findOne({ where: { id: roomId } });
      isMe(request, room?.managerId!);
      const { imageUrl } = request.user!;
      // * Room 업데이트
      await prisma.room.update({
        where: { id: roomId },
        data: { imageUrl, area, title, description, contactURL },
      });
      return true;
    },
  },
};

export default updateRoom;
