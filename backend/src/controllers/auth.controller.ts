import { Request, Response } from "express";
import { z } from "zod";

import { COOKIE_NAME } from "../config/env";
import { loginUser, registerUser } from "../services/auth.service";
import { listStoresForUser } from "../services/store.service";
import { signToken } from "../utils/jwt";

const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(128),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);
  const user = await registerUser(body);

  const token = signToken({
    userId: user.id,
    email: user.email,
    platformRole: user.platformRole,
  });

  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(201).json({ user });
};

const login = async (req: Request, res: Response) => {
  const body = loginSchema.parse(req.body);
  const user = await loginUser(body);

  const token = signToken({
    userId: user.id,
    email: user.email,
    platformRole: user.platformRole,
  });

  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(200).json({ user });
};

const logout = async (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ ok: true });
};

const me = async (req: Request, res: Response) => {
  const user = req.user!;
  const stores = await listStoresForUser(user.id);

  res.status(200).json({ user, stores });
};

export { register, login, logout, me };
