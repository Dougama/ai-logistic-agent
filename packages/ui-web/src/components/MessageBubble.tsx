// packages/ui-web/src/components/MessageBubble.tsx
import React from "react";
import { ChatMessage } from "shared-types";
import ReactMarkdown from "react-markdown";
// Nuevas importaciones de Mantine
import { Paper, Group } from "@mantine/core";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    // Group nos ayuda a alinear el contenido a la derecha o izquierda
    <Group justify={isUser ? "flex-end" : "flex-start"} my="sm">
      {/* Paper es un contenedor con sombra, borde y radio que podemos configurar */}
      <Paper
        shadow="sm"
        p="md" // 'p' es la prop de padding
        radius="lg"
        withBorder
        style={{
          backgroundColor: isUser
            ? "var(--mantine-color-blue-6)"
            : "var(--mantine-color-gray-1)",
          color: isUser ? "white" : "black",
          maxWidth: "75%",
        }}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: isUser ? "white" : "blue" }}
              />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </Paper>
    </Group>
  );
};
