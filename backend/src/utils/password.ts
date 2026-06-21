import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

const hashPassword = async (password: string) =>
  bcrypt.hash(password, SALT_ROUNDS);

const verifyPassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export { hashPassword, verifyPassword };
