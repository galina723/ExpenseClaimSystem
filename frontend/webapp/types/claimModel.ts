import { Approval } from "./approvalModel";
import { AuditLog } from "./auditLogModel";
import { ClaimItem } from "./claimItem";
import { ClaimStatus } from "./enums";
import { User } from "./userModel";


export type Claim = {
  claimId: string;
  title: string;
  description: string;
  totalAmount: number;
  status: ClaimStatus;
  createdAt: string;
  submittedAt?: string;
  deletedAt?: string;

  userId: string;
  user?: User;

  claimItems?: ClaimItem[];
  approvals?: Approval[];
  auditLogs?: AuditLog[];
};