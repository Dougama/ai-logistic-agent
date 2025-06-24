import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services';
import type { ChatSummary } from '../types';

const PAGE_SIZE = 6;

export const useChatList = (userId: string) => {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await chatService.getUserChats(userId);
      setChats(data);
      setHasMore(data.length >= PAGE_SIZE);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const loadMoreChats = useCallback(async () => {
    if (isLoadingMore || !hasMore || chats.length === 0) return;

    setIsLoadingMore(true);
    try {
      const lastChat = chats[chats.length - 1];
      const lastTimestamp = lastChat.lastUpdatedAt._seconds * 1000 + 
                           lastChat.lastUpdatedAt._nanoseconds / 1000000;
      
      const newChats = await chatService.getUserChats(userId, lastTimestamp);
      setChats(prev => [...prev, ...newChats]);
      setHasMore(newChats.length >= PAGE_SIZE);
    } catch (error) {
      console.error('Error loading more chats:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [userId, chats, isLoadingMore, hasMore]);

  const deleteChat = useCallback(async (chatId: string) => {
    try {
      await chatService.deleteChat(chatId);
      setChats(prev => prev.filter(chat => chat.id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw error;
    }
  }, []);

  const addNewChat = useCallback((newChatData: { id: string; title: string }) => {
    const newChat: ChatSummary = {
      id: newChatData.id,
      title: newChatData.title,
      lastUpdatedAt: {
        _seconds: Math.floor(Date.now() / 1000),
        _nanoseconds: 0,
      },
    };
    setChats(prev => [newChat, ...prev]);
  }, []);

  useEffect(() => {
    loadInitialChats();
  }, [loadInitialChats]);

  return {
    chats,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMoreChats,
    deleteChat,
    addNewChat,
    refreshChats: loadInitialChats,
  };
};

