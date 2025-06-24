import { useState, useCallback } from 'react';
import { chatService, messageService } from '../services';
import type { ChatMessage } from '../types';

export const useChat = (chatId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReplying, setIsReplying] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsReplying(true);

    try {
      const response = chatId 
        ? await chatService.sendMessage(chatId, text)
        : await chatService.createChat(text);

      const assistantMessage: ChatMessage = {
        id: response.id,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(response.timestamp),
      };

      setMessages(prev => [...prev, assistantMessage]);

      return {
        chatId: response.chatId,
        title: messageService.generateChatTitle(text),
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsReplying(false);
    }
  }, [chatId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    setMessages,
    isReplying,
    sendMessage,
    clearMessages,
  };
};

