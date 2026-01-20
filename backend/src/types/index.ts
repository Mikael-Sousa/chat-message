export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt: Date;
  isActive?: number;
}

export interface FriendRequest {
  id?: number;
  senderId?: number;
  receiverId?: number;
  status?: "pending" | "accepted" | "rejected";
  createdAt?: Date;
}

export interface Messages {
  id?: number;
  senderId: number;
  receiverId: number;
  content: string | number;
  status?: "sent" | "delivered" | "read";
  createdAt?: Date;
}