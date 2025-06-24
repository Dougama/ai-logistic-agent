import { useState, useEffect } from 'react';
import { chatService, messageService } from '../services';
import type { ChatMessage } from '../types';

export const useChatHistory = (chatId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const loadChatHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await chatService.getChatMessages(chatId);
        const formattedMessages = messageService.formatMessages(data);
        setMessages(formattedMessages);
      } catch (err) {
        console.error('Error loading chat history:', err);
        setError('Error al cargar el historial del chat');
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, [chatId]);

  return { messages, setMessages, isLoading, error };
};

