import  express  from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { financeApproveController, financeGetAllClaimController, financeRejectController, managerApproveController, managerGetAllClaimController, managerRejectController } from "../controllers/approvalController";

const router = express.Router();

router.get("/manager/allclaim", authMiddleware, managerGetAllClaimController);
router.get("/finance/allclaim", authMiddleware, financeGetAllClaimController);

router.post("/manager/:claimId/approve", authMiddleware, managerApproveController);
router.post("/manager/:claimId/reject", authMiddleware, managerRejectController);

router.post("/finance/:claimId/approve", authMiddleware, financeApproveController);
router.post("/finance/:claimId/reject", authMiddleware, financeRejectController);

export default router;