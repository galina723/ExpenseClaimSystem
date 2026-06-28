import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";
import { createClaimItem, deleteClaimItem, editClaimitem, getAllClaimItem } from "../services/claimItemService";

//craete claim item
export const createClaimItemController = async (
    req: AuthRequest,
    res: Response
) => {

    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        const claimId = req.params.claimId as string;

        const result = await createClaimItem(userId, claimId, req.body);
        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//get all claim item
export const getCLaimItemController = async(
    req: AuthRequest,
    res: Response
) => {
    try{
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }
    const claimId = req.params.claimId as string;
    const result = await getAllClaimItem(userId, claimId);
    return res.status(200).json({
        success: true,
        data: result
    })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//edit claim item
export const editClaimItemController = async(
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
        const claimItemId = req.params.claimItemId as string;
        const result = await editClaimitem(userId, claimId, claimItemId, req.body);
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

//delete claim item
export const deleteClaimItemController = async(
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
        const claimItemId = req.params.claimItemId as string;
        const result = await deleteClaimItem(userId, claimId, claimItemId);
        return res.status(200).json({
            success: true,
            message: "Delete claim item successfully"
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}