import { AuthRequest } from "../middlewares/authMiddleware";
import { Response } from "express";
import { approveClaimByFinance, approveClaimByManager, getClaimByFinance, getClaimByManager, rejectClaimByFinance, rejectClaimByManager } from "../services/approvalService";

//manager approve controller
export const managerApproveController = async (
    req: AuthRequest,
    res: Response
) => {
    try {

        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const claimId = req.params.claimId as string;

        const result = await approveClaimByManager (
            userId,
            claimId
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//manager reject controller
export const managerRejectController = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const claimId = req.params.claimId as string;

        const result = await rejectClaimByManager(
            userId,
            claimId,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//finance approve controller
export const financeApproveController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const claimId = req.params.claimId as string;

        const result = await approveClaimByFinance(
            userId,
            claimId
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//finance reject controller
export const financeRejectController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const claimId = req.params.claimId as string;

        const comment = req.body?.comment;

        const result = await rejectClaimByFinance(
            userId,
            claimId,
            comment
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//manager get all claim controller
export const managerGetAllClaimController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    //const claimId = req.params.claimId as string;
    const result = await getClaimByManager(userId);
    return res.status(200).json({
        success: true,
        data: result
    })
    }
    catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

//manager get all claim controller
export const financeGetAllClaimController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    //const claimId = req.params.claimId as string;
    const result = await getClaimByFinance(userId);
    return res.status(200).json({
        success: true,
        data: result
    })
    }
    catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}