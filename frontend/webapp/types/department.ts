import { User } from "./userModel";

export type Department = {
  departmentId: string;
  name: string;
  createdAt: string;

  users?: User[];
};