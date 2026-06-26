import jwt from "jsonwebtoken";
import { Response } from "express";


export const generateToken = (
  userId: string,
  role: string
) => {

  const payload = {
    userId,
    role,
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn:
        (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"]
    }
  );
};


export const setAuthCookie = (
  res: Response,
  token: string
) => {

  res.cookie(
    "token",
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
    }
  );

};


export const verifyToken = (
  token: string
) => {

  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );

};