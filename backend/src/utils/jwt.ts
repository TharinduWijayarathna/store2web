import jwt, { type SignOptions } from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env";

type TokenPayload = {
  userId: number;
  email: string;
  platformRole: string;
};

const signToken = (payload: TokenPayload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);

const verifyToken = (token: string): TokenPayload =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;

export { signToken, verifyToken, type TokenPayload };
