export interface MessageRoomMember {
  messageRoomId?: string;
  username?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  lastSeen?: string;
  lastLogin?: string;
}
