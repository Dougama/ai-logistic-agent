export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  chatId?: string;
}

export interface MessageResponse {
  id: string;
  content: string;
  timestamp: string;
  chatId: string;
}

