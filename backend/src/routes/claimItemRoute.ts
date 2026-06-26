import  express  from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createClaimItemController, deleteClaimItemController, editClaimItemController, getCLaimItemController } from "../controllers/claimItemController";
import { submitClaimController } from "../controllers/claimController";

const router = express.Router();

router.get("/:claimId/item", authMiddleware, getCLaimItemController);
router.post("/:claimId/create-claim-item", authMiddleware, createClaimItemController);
router.put("/:claimId/:claimItemId", authMiddleware, editClaimItemController);
router.delete("/:claimId/:claimItemId", authMiddleware, deleteClaimItemController);
export default router;