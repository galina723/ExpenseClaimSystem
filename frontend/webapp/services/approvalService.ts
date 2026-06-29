import { api } from "@/lib/axios";

// MANAGER
export const getManagerClaimsApi = async () => {
  const res = await api.get("/approval/manager/allclaim");
  return res.data;
};

export const managerApproveApi = async (claimId: string) => {
  const res = await api.post(
    `/approval/manager/${claimId}/approve`
  );
  return res.data;
};

export const managerRejectApi = async (claimId: string) => {
  const res = await api.post(
    `/approval/manager/${claimId}/reject`
  );
  return res.data;
};

// FINANCE
export const getFinanceClaimsApi = async () => {
  const res = await api.get("/approval/finance/allclaim");
  return res.data;
};

export const financeApproveApi = async (claimId: string) => {
  const res = await api.post(
    `/approval/finance/${claimId}/approve`
  );
  return res.data;
};

export const financeRejectApi = async (claimId: string) => {
  const res = await api.post(
    `/approval/finance/${claimId}/reject`
  );
  return res.data;
};