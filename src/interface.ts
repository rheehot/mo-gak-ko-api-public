import { Request } from "express";
import { PrismaClient } from "@prisma/client";

interface _Context {
  request: Request;
  isLogin: (req: Request) => void;
  isMe: (req: Request, compareId: string) => void;
  prisma: PrismaClient;
}

export interface _Resolver<
  TypeRoot = never,
  TypeArgs = any,
  TypeContext = _Context
> {
  [type: string]: {
    [resolver: string]: (
      root: TypeRoot,
      args: TypeArgs,
      context: TypeContext,
      info: any
    ) => any;
  };
}
