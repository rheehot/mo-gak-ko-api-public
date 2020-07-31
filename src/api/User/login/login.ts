import { generateToken } from "../../../util";
import { _Resolver } from "../../../interface";

const login: _Resolver<never, { username: string }> = {
  Mutation: {
    login: async (_, { username }, { prisma, request }) => {
      if (request.headers.admin !== "true") {
        throw Error("관리자가 아닙니다.");
      }
      const user = await prisma.user.findOne({ where: { username } });
      const token = generateToken(user?.id!);
      return token;
    },
  },
};

export default login;
