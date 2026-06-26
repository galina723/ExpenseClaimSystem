import { Request, Response } from "express";
import * as departmentService from "../services/departmentService";


export const getDepartments = async (
  req: Request,
  res: Response
) => {

  try {

    const departments = await departmentService.getDepartments();
    return res.status(200).json({
      success: true,
      data: departments,
    });


  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};