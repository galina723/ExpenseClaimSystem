import prisma from "../config/db";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createClaim, deleteClaim, editClaim, getClaimDetail, myAllClaim, submitClaim } from "../services/claimService";
import { Request, Response } from "express";

//create new claim
export const addClaim = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            title,
            description
        } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            throw new Error("User not found");
        }
        const claim =
            await createClaim(
                userId,
                {
                    title,
                    description
                }
            );
        return res.status(201).json({
            success: true,
            data: claim
        });
    } catch (error:any) {

        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//get claim detail
export const getClaimDetailController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }
        const claimId = req.params.claimId as string;
        const claim = await getClaimDetail(
            userId,
            claimId
        );
        return res.status(200).json({
            success:true,
            data:claim
        });
    } catch(error:any){

        return res.status(404).json({
            success:false,
            message:error.message
        });
    }
}

//get personal claim
export const myAllClaimController = async(
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const claim = await myAllClaim(userId);
        return res.status(200).json({
            success: true,
            data: claim
        })
    } catch (error: any) {
       return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

//edit claim
export const editClaimController = async(
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            title,
            description
        } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        const claimId = req.params.claimId as string;
        const claim = await editClaim(userId, claimId, {
            title,
            description
        });
        return res.status(200).json({
            success: true,
            data: claim
        })
    
    } catch (error: any) {
       return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

//delete claim
export const deleteClaimController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        };
        const claimId = req.params.claimId as string;
        const result = await deleteClaim(
            userId,
            claimId
        );
        return res.status(200).json({
            success: true,
            message: "Delete claim successfully"
        })
    } catch (error: any) {
       return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}

//submit claim
export const submitClaimController = async(
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        
        const claimId = req.params.claimId as string;
        const result = await submitClaim(userId, claimId);
        return res.status(200).json({
            success: true,
            data: result
        })
        
    } catch (error: any) {
       return res.status(500).json({
            success: false,
            message: error.message
        }); 
    }
}