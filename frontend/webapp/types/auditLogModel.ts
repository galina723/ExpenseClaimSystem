import { AuditAction } from "./enums";

export type AuditLog = {
  auditLogId: string;
  action: AuditAction;
  metaData?: any;
  createdAt: string;

  claimId: string;
  userId: string;
};