import  express  from "express";
import { addClaim, deleteClaimController, editClaimController, getClaimDetailController, myAllClaimController, submitClaimController } from "../controllers/claimController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create-claim", authMiddleware, addClaim);
router.post("/:claimId/submit", authMiddleware, submitClaimController)
router.get("/my-claim", authMiddleware, myAllClaimController);
router.get("/:claimId", authMiddleware, getClaimDetailController);
router.put("/:claimId", authMiddleware, editClaimController);
router.delete("/:claimId", authMiddleware, deleteClaimController);

export default router;