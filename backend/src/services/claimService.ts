import { ClaimStatus } from "@prisma/client"
import prisma from "../config/db"

//create new claim
export const createClaim = async (
    userId: string,
    data: {
        title: string,
        description: string,
    }
) => {
    const claim = await prisma.claim.create({
        data: {
            title: data.title,
            description: data.description,
            totalAmount: 0,
            status: ClaimStatus.DRAFT,
            userId: userId
        },
        select: {
            claimId: true,
            title: true,
            description: true,
            totalAmount: true,
            status: true,
            createdAt: true,
        }
    });
    return claim;
}

//get claim detail
export const getClaimDetail = async (
    userId: string,
    claimId: string
) => {
    const claim = await prisma.claim.findUnique({
        where: {
            claimId,
            userId,
            deletedAt: null
        },
        select: {
            claimId: true,
            title: true,
            description: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            submittedAt: true,

            claimItems: {
                select: {
                    claimItemId: true,
                    category: true,
                    description: true,
                    amount: true,
                    expenseDate: true
                }
            }
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }
    return claim;
}

//get personal claim
export const myAllClaim = async (
    userId: string,
) => {
    const claim = await prisma.claim.findMany({
        where: {
            userId
            ,deletedAt: null
        },
        select: {
            claimId: true,
            title: true,
            description: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            submittedAt: true,

            claimItems: {
                select: {
                    claimItemId: true,
                    category: true,
                    description: true,
                    amount: true,
                    expenseDate: true
                }
            }
        }
    })
    return claim;
}

//edit claim (status = draft/rejected)
export const editClaim = async (
    userId: string,
    claimId: string,
    data: {
        title: string,
        description: string
    }
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            claimId,
            userId,
            deletedAt: null
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }

    if (claim.status !== ClaimStatus.DRAFT && claim.status !== ClaimStatus.REJECTED) {
        throw new Error("Claim cannot be edited")
    }

    const updateClaim = await prisma.claim.update({
        where: {
            claimId
        },
        data: {
            title: data.title,
            description: data.description
        },
        select: {
            claimId: true,
            title: true,
            description: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            submittedAt: true,

            claimItems: {
                select: {
                    claimItemId: true,
                    category: true,
                    description: true,
                    amount: true,
                    expenseDate: true
                }
            }
        }
    });
    return updateClaim;
}

//delete claim (soft delete)
export const deleteClaim = async (
    userId: string,
    claimId: string
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            userId,
            claimId,
            deletedAt: null
        },
    })

    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== ClaimStatus.DRAFT && claim.status !== ClaimStatus.REJECTED) {
        throw new Error("Claim cannot be deleted");
    }

    await prisma.claim.update({
        where: {
            claimId
        },
        data: {
            deletedAt: new Date()
        }
    })
    return {
        message: "Claim deleted successfully"
    }
}

//submit claim
export const submitClaim = async(
    userId: string,
    claimId: string
) => {
    const claim = await prisma.claim.findFirst({
        where: {
            userId,
            claimId,
            deletedAt: null
        }, include: {
            claimItems: true
        }
    })
    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== ClaimStatus.DRAFT && claim.status !== ClaimStatus.REJECTED) {
        throw new Error("Claim is locked");
    }
    if (claim.claimItems.length <= 0) {
        throw new Error("Claim must have >= 1 item")
    }
    const submitClaim = await prisma.claim.update({
        where: {
            claimId
        }, data: {
            status: ClaimStatus.PENDING_MANAGER,
            submittedAt: new Date()
        }
    })
    return submitClaim;
}