import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";
import { hashPassword, verifyPassword } from "../utils/password";
import { AppError } from "../utils/errors";

const findUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  return user ?? null;
};

const findUserById = async (id: number) => {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user ?? null;
};

const registerUser = async (input: {
  name: string;
  email: string;
  password: string;
}) => {
  const email = input.email.toLowerCase().trim();
  const existing = await findUserByEmail(email);

  if (existing) {
    throw new AppError("Email already registered.", 409);
  }

  const passwordHash = await hashPassword(input.password);

  const [user] = await db
    .insert(users)
    .values({
      name: input.name.trim(),
      email,
      passwordHash,
      platformRole: "user",
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      platformRole: users.platformRole,
      createdAt: users.createdAt,
    });

  return user;
};

const loginUser = async (input: { email: string; password: string }) => {
  const user = await findUserByEmail(input.email.toLowerCase().trim());

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  if (user.disabledAt) {
    throw new AppError("Account is disabled.", 403);
  }

  const valid = await verifyPassword(input.password, user.passwordHash);

  if (!valid) {
    throw new AppError("Invalid email or password.", 401);
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    platformRole: user.platformRole,
  };
};

export { findUserByEmail, findUserById, registerUser, loginUser };
