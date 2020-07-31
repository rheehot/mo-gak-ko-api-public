require("dotenv").config();
import { GraphQLServer, Options } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import helmet from "helmet";
import logger from "morgan";

import schema from "./schema";
import { isLogin, isMe, cors } from "./util";
import { githubAuth } from "./github";
import { extractJWT } from "./jwt";

const prisma = new PrismaClient();

// * 인스턴스 배포도 4000으로 배포합니다.
const PORT = process.env.PORT || 4000;
const PROD_API_URL = process.env.PROD_API_URL!;

// * 서버 옵션 설정
const options: Options =
  process.env.NODE_ENV === "production"
    ? {
        port: PORT,
        cors: {
          origin: [PROD_API_URL],
          methods: "POST",
        },
        playground: false,
      }
    : {
        port: PORT,
      };

// * 서버 설정
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isLogin, isMe, prisma }),
});

// ! 미들웨어 실행
// * helmet 동작
server.express.use(helmet());
// * Github OAuth를 위한 CORS
server.express.use(cors);
// * 로그 출력
server.express.use(
  logger(process.env.NODE_ENV === "production" ? "combined" : "dev")
);
// * JWT 인증
server.express.use(extractJWT);

// * Github 인증
server.express.post("/auth/github", githubAuth);

// ! 서버 시작
server.start(options, () => {
  console.log(`✅ Server is running on PORT:${PORT}`);
});
