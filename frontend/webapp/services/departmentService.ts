import { api } from "@/lib/axios";

export const getDepartmentsApi = async () => {
  const res = await api.get("/departments");
  return res.data;
};