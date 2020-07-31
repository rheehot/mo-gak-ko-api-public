import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

type _Decode = {
  id: string;
};

export const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) {
    return next();
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET!, async (_, decoded) => {
    if (!decoded) {
      return next();
    }
    const { id } = decoded as _Decode;
    const user = await prisma.user.findOne({ where: { id } });
    if (!user) {
      return next();
    }
    req.user = user;
    next();
  });
};
