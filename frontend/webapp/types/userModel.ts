import { Approval } from "./approvalModel";
import { AuditLog } from "./auditLogModel";
import { Claim } from "./claimModel";
import { Department } from "./department";
import { Role } from "./enums";


export type User = {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
  createdAt: string;
  role: Role;

  departmentId: string;
  department?: Department;

  claims?: Claim[];
  notifications?: Notification[];
  approvals?: Approval[];
  auditLogs?: AuditLog[];
};