import { NotificationType } from "./enums";

export type Notification = {
  notificationId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: string;

  userId: string;
};