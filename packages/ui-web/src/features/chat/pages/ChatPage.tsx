import React, { useState, useCallback } from 'react';
import { AppShell, Burger, Group, Title, Text, Box, Badge, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconRobot, IconBolt, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../../../shared/services/auth';
import { ChatWindow } from '../components/ChatWindow';
import { ChatSidebar } from '../components/ChatSidebar';
import { useChatHistory } from '../hooks/useChatHistory';
import { useChatList } from '../hooks/useChatList';
import { useChat } from '../hooks/useChat';
import { signOut } from 'firebase/auth';
import { auth } from '../../../shared/services/auth/firebase';

export const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

  // Hooks del chat
  const { messages: historyMessages, setMessages: setHistoryMessages } = useChatHistory(activeChatId);
  const { messages: chatMessages, setMessages: setChatMessages, isReplying, sendMessage } = useChat(activeChatId);
  
  // Usamos el historial si existe, sino los mensajes del chat actual
  const messages = activeChatId ? historyMessages : chatMessages;
  const setMessages = activeChatId ? setHistoryMessages : setChatMessages;

  const userId = currentUser?.uid || 'user123';
  const {
    chats,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMoreChats,
    deleteChat,
    addNewChat,
  } = useChatList(userId);

  const handleSendMessage = useCallback(async (text: string) => {
    try {
      const result = await sendMessage(text);
      
      if (!activeChatId && result?.chatId) {
        setActiveChatId(result.chatId);
        addNewChat(result);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [sendMessage, activeChatId, addNewChat]);

  const handleSelectChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    toggleMobile();
  }, [toggleMobile]);

  const handleNewChat = useCallback(() => {
    setActiveChatId(null);
    toggleMobile();
  }, [toggleMobile]);

  const handleDeleteChat = useCallback(async (chatId: string) => {
    await deleteChat(chatId);
    if (activeChatId === chatId) {
      setActiveChatId(null);
    }
  }, [deleteChat, activeChatId]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderBottom: 'none',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />

            <Flex align="center" gap="sm">
              <Box
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '8px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <IconRobot size={24} color="white" />
              </Box>

              <Box>
                <Title
                  order={2}
                  c="white"
                  style={{
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                  }}
                >
                  Tracko
                </Title>
                <Text
                  size="sm"
                  c="rgba(255, 255, 255, 0.8)"
                  style={{ marginTop: '-2px' }}
                >
                  Agente de Logística IA
                </Text>
              </Box>
            </Flex>
          </Group>

          <Group>
            <Badge
              variant="light"
              color="white"
              size="sm"
              leftSection={<IconBolt size={12} />}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              {isReplying ? 'Procesando...' : 'En línea'}
            </Badge>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          isLoading={isLoading}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onLoadMore={loadMoreChats}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <div style={{ height: 'calc(100vh - 70px - 2rem)' }}>
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isReplying={isReplying}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

