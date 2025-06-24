import React, { useRef, useEffect } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { IconRobot, IconBolt } from '@tabler/icons-react';
import { MessageBubble } from '../MessageBubble';
import { MessageInput } from '../MessageInput';
import type { ChatMessage } from '../../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isReplying: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onSendMessage,
  isReplying,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.length === 0 && !isReplying && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                padding: '20px',
                marginBottom: '10px',
              }}
            >
              <IconRobot size={48} color="white" />
            </Box>
            <Text size="xl" fw={600} c="gray.6">
              ¡Hola! Soy Tracko
            </Text>
            <Text ta="center" c="gray.5" size="lg">
              Tu asistente de logística inteligente.
              <br />
              Pregúntame lo que necesites sobre envíos y entregas.
            </Text>
          </div>
        )}
        
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isReplying && (
          <Group gap="sm" p="md">
            <Box
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                padding: '8px',
              }}
            >
              <IconRobot size={16} color="white" />
            </Box>
            <Text c="gray.6" fs="italic">
              Tracko está escribiendo...
            </Text>
          </Group>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={onSendMessage} isLoading={isReplying} />
    </div>
  );
};

