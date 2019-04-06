export interface User {
  userId: string;
  userType: string;
  initial: string;
  name: string;
}

export interface Message {
  messageId: string;
  messageType: string;
  content: string;
  replyToken: string;
  timestamp: Date;
  answer: string;
}

export interface Comment {
  user: User;
  message: Message;
  replyToId: string;
}
