export interface User {
  username: string;
  email: string;
  password: string;
}

export interface FriendRequest {
  id?: number;
  senderId: number;
  receiverId: number;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: Date;
}

