import { api } from "@/lib/axios";


export const loginApi = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("http://localhost:8080/auth/login", data);
  console.log("LOGIN HIT");
console.log("BASE:", api.defaults.baseURL);
  return res.data;
};

export const registerApi = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getProfileApi = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};