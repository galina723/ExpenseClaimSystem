import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";
import prisma from "../config/db";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
    departmentId: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token =
      req.headers.authorization.split(" ")[1];
  } 
  else if (req.cookies?.token) {

    token =
      req.cookies.token;

  }

  if (!token) {
    return res.status(401).json({
      message:"No token provided"
    });
  }
  try {
    const secret =
      process.env.JWT_SECRET;


    if (!secret) {
      throw new Error(
        "JWT_SECRET missing"
      );
    }
    const decoded =
      jwt.verify(
        token,
        secret
      ) as {
        userId:string;
        role:string;
      };
    const user =
      await prisma.user.findUnique({
        where:{
          userId: decoded.userId
        },

        select:{
          userId:true,
          name:true,
          email:true,
          role:true,
          avatar:true,
          departmentId:true,
        }
      });
    if(!user){

      return res.status(401).json({
        message:"User not found"
      });
    }
    req.user = user;
    next();
  } catch(error) {
    return res.status(401).json({
      message:"Invalid token"
    });
  }
};