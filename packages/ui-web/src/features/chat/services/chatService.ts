import { apiClient } from '../../../shared/services/api';
import type { Chat, ChatSummary } from '../types';

export class ChatService {
  async getUserChats(userId: string, lastSeen?: number): Promise<ChatSummary[]> {
    const endpoint = lastSeen 
      ? `/chat/user/${userId}?lastSeen=${lastSeen}`
      : `/chat/user/${userId}`;
    
    return apiClient.get<ChatSummary[]>(endpoint);
  }

  async createChat(prompt: string): Promise<any> {
    return apiClient.post('/chat', { prompt });
  }

  async sendMessage(chatId: string, prompt: string): Promise<any> {
    return apiClient.post(`/chat/${chatId}`, { prompt });
  }

  async deleteChat(chatId: string): Promise<void> {
    return apiClient.delete(`/chat/${chatId}`);
  }

  async getChatMessages(chatId: string): Promise<any[]> {
    return apiClient.get(`/chat/${chatId}/messages`);
  }
}

export const chatService = new ChatService();

