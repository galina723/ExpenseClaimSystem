import { Request, Response } from "express";
import * as authService from "../services/authService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const register = async (
  req: Request,
  res: Response
) => {

  const {
    name,
    email,
    password,
    departmentId,
  } = req.body;


  const user =
    await authService.register({
      name,
      email,
      password,
      departmentId,
    });


  res.status(201).json({
    success: true,
    data: user,
  });
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            email,
            password
        } = req.body;

        const result = await authService.login({
            email,
            password,
        }, res
        );
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}
export const getProfle = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error("User not found");
        }
        const user = await authService.getProfile(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}