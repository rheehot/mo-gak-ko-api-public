import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const REQUEST = "request";
export const ALLOW = "allow";
export const DENY = "deny";
export const KICK = "kick";

export const isLogin = (req: Request) => {
  if (!req.user) {
    throw Error("로그인이 필요합니다.");
  }
  return;
};

export const isMe = (req: Request, compareId: string) => {
  const { id: requestId } = req.user!;
  if (requestId !== compareId) {
    throw Error("권한이 없습니다.");
  }
  return;
};

export const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 * 24 * 3 });

export const cors = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "production") {
    res.header("Access-Control-Allow-Origin", process.env.PROD_API_URL);
  } else {
    res.header("Access-Control-Allow-Origin", process.env.DEV_API_URL);
  }
  next();
};
