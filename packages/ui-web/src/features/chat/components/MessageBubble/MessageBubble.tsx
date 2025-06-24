// packages/ui-web/src/features/chat/components/MessageBubble/MessageBubble.tsx (MIGRADO)

import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Text } from "@mantine/core";
import { IconUser, IconRobot } from "@tabler/icons-react";
import type { ChatMessage } from "../../types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  return (
    <div
      className={`message-bubble ${
        isUser ? "message-bubble--user" : "message-bubble--assistant"
      }`}
    >
      {/* Header con info del emisor */}
      <div
        className={`message-header ${
          isUser ? "message-header--user" : "message-header--assistant"
        }`}
      >
        <div
          className={`message-header__avatar ${
            isUser
              ? "message-header__avatar--user"
              : "message-header__avatar--assistant"
          }`}
        >
          {isUser ? (
            <IconUser size={14} color="white" />
          ) : (
            <IconRobot size={14} color="white" />
          )}
        </div>

        <Text
          component="p"
          className={`message-header__name ${
            isUser
              ? "message-header__name--user"
              : "message-header__name--assistant"
          }`}
        >
          {isUser ? "Tú" : "Tracko"}
        </Text>

        <Text component="p" className="message-header__time">
          {formatTime(message.timestamp)}
        </Text>
      </div>

      {/* Contenido del mensaje */}
      <div
        className={`message-content ${
          isUser ? "message-content--user" : "message-content--assistant"
        }`}
      >
        <ReactMarkdown
          components={{
            // Todos los componentes de markdown ahora usan las clases CSS
            p: ({ children, ...props }) => <p {...props}>{children}</p>,
            strong: ({ children, ...props }) => (
              <strong {...props}>{children}</strong>
            ),
            em: ({ children, ...props }) => <em {...props}>{children}</em>,
            h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
            h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
            h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
            ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
            ol: ({ children, ...props }) => <ol {...props}>{children}</ol>,
            li: ({ children, ...props }) => <li {...props}>{children}</li>,
            blockquote: ({ children, ...props }) => (
              <blockquote {...props}>{children}</blockquote>
            ),
            code: ({ children, ...props }) => (
              <code {...props}>{children}</code>
            ),
            pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
            a: ({ children, href, ...props }) => (
              <a
                {...props}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
