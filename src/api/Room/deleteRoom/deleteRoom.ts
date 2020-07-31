import { _Resolver } from "../../../interface";

type _Args = {
  roomId: number;
};

// ! database schema 이름이 변경되면 업데이트 해줘야 합니다.
const deleteRoom: _Resolver<never, _Args> = {
  Mutation: {
    deleteRoom: async (_, { roomId }, { request, isLogin, isMe, prisma }) => {
      isLogin(request);
      const room = await prisma.room.findOne({ where: { id: roomId } });
      isMe(request, room?.managerId!);
      // * Room 삭제 (DB 내 ON CASCADE 옵션으로 Room의 모든 정보 삭제)
      await prisma.queryRaw`delete from public."Room" where id = ${roomId};`;
      return true;
    },
  },
};

export default deleteRoom;
