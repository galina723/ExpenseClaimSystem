import { ApprovalDecision, AuditAction, ClaimStatus, Role } from "@prisma/client"
import prisma from "../config/db"

// manager approve
export const approveClaimByManager = async(
    userId: string,
    claimId: string,
) => {
    const manager = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    if (!manager) {
        throw new Error("User not found")
    }
    if(manager.role !== Role.MANAGER) {
        throw new Error("Only manager can approve claim")
    }

    const claim = await prisma.claim.findFirst({
        where: {
            claimId,
            status: ClaimStatus.PENDING_MANAGER
        }, include: {
            user: true
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }
    if (manager.departmentId !== claim.user.departmentId) {
        throw new Error("Not the same department")
    }
    const approveClaim = await prisma.$transaction(async(tx) => {
        await tx.claim.update({
            where: {
                claimId
            }, data: {
                status: ClaimStatus.PENDING_FINANCE
            }
        });
        await tx.auditLog.create({
            data: {
                claimId,
                userId,
                action: AuditAction.APPROVE_CLAIM,
                metaData: {
                    "from": ClaimStatus.PENDING_MANAGER,
                    "to": ClaimStatus.PENDING_FINANCE
                }
            }
        });
        await tx.approval.create({
            data: {
                claimId,
                userId,
                approvalLevel: 1,
                decision: ApprovalDecision.APPROVED
            }
        });
    })
    return approveClaim
}

//manager reject
export const rejectClaimByManager = async (
    userId: string,
    claimId: string,
    comment?: string
) => {
    const manager = await prisma.user.findFirst ({
        where: {
            userId
        }
    })
    if (!manager) {
        throw new Error("User not found")
    }
    if (manager.role !== Role.MANAGER) {
        throw new Error("Only manager can reject claim")
    }
    const claim = await prisma.claim.findUnique ({
        where: {
            claimId,
            status: ClaimStatus.PENDING_MANAGER
        }, include: {
            user: true
        }
    })
    if (!claim) {
        throw new Error("Claim not found")
    }
    if (manager.departmentId != claim.user.departmentId) {
        throw new Error("Not the same department")
    }
    const result = await prisma.$transaction(async(tx) => {

        await tx.claim.update({
            where: {
                claimId
            },
            data: {
                status: ClaimStatus.REJECTED
            }
        })

        await tx.auditLog.create({
            data: {
                userId,
                claimId,
                action: AuditAction.REJECT_CLAIM,
                metaData: {
                    "from": ClaimStatus.PENDING_MANAGER,
                    "to": ClaimStatus.REJECTED
                }
            }
        })

        await tx.approval.create({
            data: {
                claimId,
                userId,
                approvalLevel: 1,
                comment,
                decision: ApprovalDecision.REJECTED,
            }
        })
    })
    return result
}

//finance approve
export const approveClaimByFinance = async(
    userId: string,
    claimId: string,
) => {

    const finance = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    if (!finance) {
        throw new Error("User not found")
    }
    if(finance.role !== Role.FINANCE) {
        throw new Error("Only finance can approve claim")
    }

    const claim = await prisma.claim.findFirst({
        where: {
            claimId,
            status: ClaimStatus.PENDING_FINANCE
        }, include: {
            user: true
        }
    });
    if (!claim) {
        throw new Error("Claim not found");
    }
    const approveClaim = await prisma.$transaction(async(tx) => {
        await tx.claim.update({
            where: {
                claimId
            }, data: {
                status: ClaimStatus.APPROVED
            }
        });
        await tx.auditLog.create({
            data: {
                claimId,
                userId,
                action: AuditAction.APPROVE_CLAIM,
                metaData: {
                    "from": ClaimStatus.PENDING_FINANCE,
                    "to": ClaimStatus.APPROVED
                }
            }
        });
        await tx.approval.create({
            data: {
                claimId,
                userId,
                approvalLevel: 2,
                decision: ApprovalDecision.APPROVED
            }
        });
    })
    return approveClaim
}

//finance reject
export const rejectClaimByFinance = async (
    userId: string,
    claimId: string,
    comment?: string
) => {
    const finance = await prisma.user.findFirst ({
        where: {
            userId
        }
    })
    if (!finance) {
        throw new Error("User not found")
    }
    if (finance.role !== Role.FINANCE) {
        throw new Error("Only finance can reject claim")
    }
    const claim = await prisma.claim.findFirst ({
        where: {
            claimId,
            status: ClaimStatus.PENDING_FINANCE
        }, include: {
            user: true
        }
    })
    if (!claim) {
        throw new Error("Claim not found")
    }

    const result = await prisma.$transaction(async(tx) => {

        await tx.claim.update({
            where: {
                claimId
            },
            data: {
                status: ClaimStatus.REJECTED
            }
        })

        await tx.auditLog.create({
            data: {
                userId,
                claimId,
                action: AuditAction.REJECT_CLAIM,
                metaData: {
                    "from": ClaimStatus.PENDING_FINANCE,
                    "to": ClaimStatus.REJECTED
                }
            }
        })

        await tx.approval.create({
            data: {
                claimId,
                userId,
                approvalLevel: 2,
                comment,
                decision: ApprovalDecision.REJECTED
            }
        })
    })
    return result
}

//manager get all claim
export const getClaimByManager = async(
    userId: string,
) => {
    const manager = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    if (!manager) {
        throw new Error("User not found")
    }
    if (manager.role !== Role.MANAGER) {
        throw new Error("Only manager can see");
    }

    const claim = await prisma.claim.findFirst({
        where: {
            user: {
                departmentId: manager.departmentId
            }, 
            status: {
                not: ClaimStatus.DRAFT
            }
        }, include: {
            user: {
                select: {
                    userId: true,
                    name: true,
                    email: true
                }
            },
            claimItems: true,
            approvals: true
        }, orderBy: {
            createdAt: "desc"
        }
    })
    return claim
}

//finance get all claim
export const getClaimByFinance = async(
    userId: string,
) => {
    const finance = await prisma.user.findUnique({
        where: {
            userId
        }
    })
    if (!finance) {
        throw new Error("User not found")
    }
    if (finance.role !== Role.FINANCE) {
        throw new Error("Only finance can see");
    }

    const claim = await prisma.claim.findMany({
        where: {
            status: {
                not: ClaimStatus.DRAFT
            }
        },
        include: {
            user: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    department: {
                        select: {
                            name: true
                        }
                    }
                }
            }, 
            claimItems: true,
            approvals: true
        }, orderBy: {
            createdAt: "desc"
        }
    })
    return claim
}