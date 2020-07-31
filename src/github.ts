import { Request, Response } from "express";
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "./util";

const prisma = new PrismaClient();

type _Profile = {
  id: number;
  login: string;
  avatar_url: string;
};

export const githubAuth = async (req: Request, res: Response) => {
  const {
    query: { code },
  } = req;

  // * access_token 요청
  const { access_token } = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id:
          process.env.NODE_ENV === "production"
            ? process.env.GITHUB_ID
            : process.env.GITHUB_BETA_ID,
        client_secret:
          process.env.NODE_ENV === "production"
            ? process.env.GITHUB_SECRET
            : process.env.GITHUB_BETA_SECRET,
        code,
      }),
    }
  ).then((res) => res.json());

  // * user 정보 요청
  const user: _Profile = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `token ${access_token}`,
    },
  }).then((res) => res.json());

  // * 구조 분해 할당
  const { id: githubId, login: username, avatar_url: imageUrl } = user;

  // * user 정보 얻는 부분
  try {
    const user = await prisma.user.findOne({ where: { githubId } });
    if (user) {
      // * user가 존재하면 update된 user를 req.user로 보내요
      const updatedUser = await prisma.user.update({
        where: { githubId },
        data: { username, imageUrl },
      });
      const token = generateToken(updatedUser.id);
      return res.json({
        token,
      });
    }
    // * user가 존재하지 않으면 create한 user를 req.user로 내보내요
    const newUser = await prisma.user.create({
      data: { githubId, username, imageUrl },
    });
    const token = generateToken(newUser.id);
    return res.json({
      token,
    });
  } catch (e) {
    console.log(e);
  }
};
