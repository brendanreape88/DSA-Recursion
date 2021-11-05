export enum NotificationType {
  friendRequest = "friend request",
  gift = "gift",
  shoutout = "shout-out",
}

export interface Notification {
  senderFirstName: string;
  senderLastName: string;
  type: "friendRequest" | "gift" | "shoutout";
}
