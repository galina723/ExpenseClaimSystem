import { api } from "@/lib/axios";

export const getClaimItemsApi = async (claimId: string) => {
  const res = await api.get(`/claim/${claimId}/item`);
  return res.data;
};

export const createClaimItemApi = async (
  claimId: string,
  data: any
) => {
  const res = await api.post(
    `/claim/${claimId}/create-claim-item`,
    data
  );
  return res.data;
};

export const updateClaimItemApi = async (
  claimId: string,
  claimItemId: string,
  data: any
) => {
  const res = await api.put(
    `/claim/${claimId}/${claimItemId}`,
    data
  );
  return res.data;
};

export const deleteClaimItemApi = async (
  claimId: string,
  claimItemId: string
) => {
  const res = await api.delete(
    `/claim/${claimId}/${claimItemId}`
  );
  return res.data;
};