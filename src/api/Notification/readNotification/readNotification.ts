import { _Resolver } from "../../../interface";

const readNotification: _Resolver = {
  Mutation: {
    readNotification: async (_, __, { request, isLogin, prisma }) => {
      isLogin(request);
      // * 자신에게 할당된 모든 알림 삭제
      const { id: userId } = request.user!;
      await prisma.notification.deleteMany({
        where: { userId },
      });
      return true;
    },
  },
};

export default readNotification;
