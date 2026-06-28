import { ClaimStatus } from "@prisma/client";
import prisma from "../config/db"
import { recalcTotalAmount } from "../helpers/recalcTotalAmount";

//create claim item
export const createClaimItem = async (
    userId: string,
    claimId: string,
    data: {
        category: string,
        description: string,
        expenseDate: string,
        amount: number
    }
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            userId,
            claimId,
            deletedAt: null
        }
    });
    if (!claim) {
        throw new Error("Claim not found")
    }
    if (claim.status !== ClaimStatus.DRAFT && claim.status !==ClaimStatus.REJECTED) {
        throw new Error("Claim is locked");
    }
    const item = await prisma.claimItem.create({
        data: {
            claimId,
            category: data.category,
            description: data.description,
            expenseDate: new Date(data.expenseDate),
            amount: data.amount
        }, select: {
            claimId: true,
            claimItemId: true,
            category: true,
            description: true,
            expenseDate: true,
            amount: true
        }
    });
    await recalcTotalAmount(claimId);
    return item;
}

//get all claim item
export const getAllClaimItem = async(
    userId: string,
    claimId: string,

) => {
    const claim = await prisma.claim.findFirst({
        where: {
            userId,
            claimId,
            deletedAt: null
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }
    
    const item = await prisma.claimItem.findMany({
        where: {
            claimId
        },
        select: {
            claimItemId: true,
            category: true,
            description: true,
            amount: true,
            expenseDate: true,
            createdAt: true
        }, orderBy: {
            createdAt: "asc"
        }
    })
    return item;
}

//edit claim item
export const editClaimitem = async (
    userId: string,
    claimId: string,
    claimItemId: string,
    data: {
        category: string,
        description: string,
        expenseDate: string,
        amount: number
    }
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            userId,
            claimId,
            deletedAt: null
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== ClaimStatus.DRAFT && claim.status !== ClaimStatus.REJECTED) {
        throw new Error("Claim cannot be edited")
    }
    const item = await prisma.claimItem.findFirst({
        where: {
            claimItemId,
            claimId
        }
    });
    if (!item) {
        throw new Error("Claim item not found");
    }
    const result = await prisma.claimItem.update({
        where: {
            claimItemId
        },
        data: {
            category: data.category,
            description: data.description,
            expenseDate: new Date(data.expenseDate),
            amount: data.amount
        }
    })
    return result;

}

//delete claim item
export const deleteClaimItem = async(
    userId: string,
    claimId: string,
    claimItemId: string
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            claimId,
            deletedAt: null
        }
    })
    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== ClaimStatus.DRAFT && claim.status !== ClaimStatus.REJECTED) {
        throw new Error("Claim is locked");
    }
    const item = await prisma.claimItem.delete({
        where: {
            claimItemId
        }
    })
    await recalcTotalAmount(claimId);
    return item
}