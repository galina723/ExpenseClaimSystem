import { api } from "@/lib/axios";

export const createClaimApi = async (data: any) => {
  const res = await api.post("/claim/create-claim", data);
  return res.data;
};

export const getMyClaimsApi = async () => {
  const res = await api.get("/claim/my-claim");
  return res.data;
};

export const getClaimDetailApi = async (claimId: string) => {
  const res = await api.get(`/claim/${claimId}`);
  return res.data;
};

export const submitClaimApi = async (claimId: string) => {
  const res = await api.post(`/claim/${claimId}/submit`);
  return res.data;
};

export const updateClaimApi = async (claimId: string, data: any) => {
  const res = await api.put(`/claim/${claimId}`, data);
  return res.data;
};

export const deleteClaimApi = async (claimId: string) => {
  const res = await api.delete(`/claim/${claimId}`);
  return res.data;
};