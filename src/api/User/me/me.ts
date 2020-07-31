import { _Resolver } from "../../../interface";

// ! me를 통해서만 myRooms, joinRooms, pendings, notifications를 볼 수 있음
const me: _Resolver = {
  Query: {
    me: (_, __, { request, isLogin, prisma }) => {
      isLogin(request);
      const { id } = request.user!;
      return prisma.user.findOne({
        where: { id },
        include: {
          myRooms: true,
          joinRooms: true,
          pendings: true,
          notifications: true,
        },
      });
    },
  },
};

export default me;
