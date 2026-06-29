import { ApprovalDecision } from "./enums";
import { User } from "./userModel";

export type Approval = {
  approvalId: string;
  approvalLevel: number;
  decision: ApprovalDecision;
  comment?: string;
  createdAt: string;

  claimId: string;
  userId: string;

  user?: User;
};