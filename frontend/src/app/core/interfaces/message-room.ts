import { MessageContent } from "./message-content";
import { MessageRoomMember } from "./message-room-member";

export interface MessageRoom {
  id?: string;
  name?: string;
  isGroup?: boolean;
  createdDate?: string;
  createdById?: string;
  lastMessage?: MessageContent;
  members?: MessageRoomMember[];
  messages?: MessageContent[];
  unseenCount?: number;

  isAdmin?: boolean;
}
