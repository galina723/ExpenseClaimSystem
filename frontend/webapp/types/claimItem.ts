import { Attachment } from "./attachment";


export type ClaimItem = {
  claimItemId: string;
  category: string;
  description: string;
  expenseDate: string;
  amount: number;
  createdAt: string;

  claimId: string;
  attachments?: Attachment[];
};