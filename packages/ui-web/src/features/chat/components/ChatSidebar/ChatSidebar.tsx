import React from 'react';
import {
  Stack,
  Button,
  Text,
  Group,
  ActionIcon,
  ScrollArea,
  Divider,
  Box,
  Tooltip,
} from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconMessage,
} from '@tabler/icons-react';
import type { ChatSummary } from '../../types';

interface ChatSidebarProps {
  chats: ChatSummary[];
  activeChatId: string | null;
  isLoading: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => Promise<void>;
  onLoadMore: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChatId,
  isLoading,
  hasMore,
  isLoadingMore,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onLoadMore,
}) => {
  const handleDeleteChat = async (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await onDeleteChat(chatId);
    } catch (error) {
      console.error('Error deleting chat:', error);
      alert('Hubo un error al intentar eliminar la conversación.');
    }
  };

  return (
    <Box h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onNewChat}
        variant="light"
        fullWidth
        mb="md"
      >
        Nuevo Chat
      </Button>

      <Divider mb="md" />

      {/* Chat List */}
      <ScrollArea style={{ flex: 1 }} type="hover">
        <Stack gap="xs">
          {isLoading ? (
            <Text ta="center" c="dimmed" size="sm">
              Cargando chats...
            </Text>
          ) : chats.length === 0 ? (
            <Text ta="center" c="dimmed" size="sm">
              No hay conversaciones aún
            </Text>
          ) : (
            chats.map((chat) => (
              <Group
                key={chat.id}
                gap="xs"
                p="sm"
                style={{
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor:
                    chat.id === activeChatId
                      ? 'var(--mantine-color-blue-light)'
                      : 'transparent',
                  border:
                    chat.id === activeChatId
                      ? '1px solid var(--mantine-color-blue-6)'
                      : '1px solid transparent',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => onSelectChat(chat.id)}
              >
                <IconMessage
                  size={16}
                  style={{
                    flexShrink: 0,
                    color:
                      chat.id === activeChatId
                        ? 'var(--mantine-color-blue-6)'
                        : 'var(--mantine-color-gray-6)',
                  }}
                />

                <Text
                  size="sm"
                  style={{
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }}
                  c={chat.id === activeChatId ? 'blue.6' : 'gray.7'}
                >
                  {chat.title}
                </Text>

                <Tooltip label="Eliminar conversación" position="top">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    style={{ flexShrink: 0 }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ))
          )}

          {!isLoading && hasMore && (
            <Button
              variant="subtle"
              size="sm"
              onClick={onLoadMore}
              loading={isLoadingMore}
              fullWidth
            >
              {isLoadingMore ? 'Cargando...' : 'Ver más'}
            </Button>
          )}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

