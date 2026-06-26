import prisma from "../config/db";

export const recalcTotalAmount = async (claimId: string) => {
    const result = await prisma.claimItem.aggregate({
        where: { claimId },
        _sum: {
            amount: true
        }
    });

    await prisma.claim.update({
        where: { claimId },
        data: {
            totalAmount: result._sum.amount ?? 0
        }
    });
};