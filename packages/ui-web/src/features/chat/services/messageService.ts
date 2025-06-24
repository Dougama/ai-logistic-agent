import type { ChatMessage } from '../types';

export class MessageService {
  formatTimestamp(timestamp: any): Date {
    if (timestamp?._seconds) {
      return new Date(timestamp._seconds * 1000);
    }
    return new Date(timestamp);
  }

  formatMessages(messages: any[]): ChatMessage[] {
    return messages.map(msg => ({
      ...msg,
      timestamp: this.formatTimestamp(msg.timestamp),
    }));
  }

  generateChatTitle(firstMessage: string, maxLength: number = 50): string {
    return firstMessage.length > maxLength 
      ? firstMessage.substring(0, maxLength) + '...'
      : firstMessage;
  }
}

export const messageService = new MessageService();

