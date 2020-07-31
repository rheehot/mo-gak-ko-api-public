import { _Resolver } from "../../../interface";

type _Args = {
  area: string;
  title: string;
  description: string;
  contactURL: string;
};

const createRoom: _Resolver<never, _Args> = {
  Mutation: {
    createRoom: async (
      _,
      { area, title, description, contactURL },
      { request, isLogin, prisma }
    ) => {
      isLogin(request);
      // * Room 생성
      const { id, imageUrl } = request.user!;
      const createdRoom = await prisma.room.create({
        data: {
          manager: { connect: { id } },
          imageUrl,
          area,
          title,
          description,
          contactURL,
        },
      });
      return createdRoom;
    },
  },
};

export default createRoom;
