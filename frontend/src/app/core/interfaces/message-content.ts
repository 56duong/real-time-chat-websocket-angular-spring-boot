export interface MessageContent {
  id?: string;
  content?: string;
  dateSent?: string;
  messageType?: MessageType;
  messageRoomId?: string;
  sender?: string;
}

export enum MessageType {
  TEXT = 'TEXT'
}
