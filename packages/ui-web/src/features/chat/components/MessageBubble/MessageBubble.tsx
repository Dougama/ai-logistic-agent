// ========================================
// src/features/chat/components/MessageBubble/MessageBubble.tsx (CORREGIDO)
// ========================================
import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Text, Group } from "@mantine/core";
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
    <Box mb="xl">
      {/* Header con info del emisor */}
      <Group gap="xs" mb="sm">
        <Box
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "6px",
            background: isUser
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isUser ? (
            <IconUser size={14} color="white" />
          ) : (
            <IconRobot size={14} color="white" />
          )}
        </Box>

        <Text size="sm" fw={600} c={isUser ? "#667eea" : "#4caf50"}>
          {isUser ? "Tú" : "Tracko"}
        </Text>

        <Text size="xs" c="dimmed">
          {formatTime(message.timestamp)}
        </Text>
      </Group>

      {/* Contenido del mensaje */}
      <Box
        pl="md"
        style={{
          borderLeft: `3px solid ${isUser ? "#667eea" : "#4caf50"}`,
          paddingLeft: "16px",
        }}
      >
        <Box
          style={{
            fontSize: "15px",
            lineHeight: 1.6,
            color: isUser ? "#2d3748" : "#1a202c",
            fontWeight: isUser ? 500 : 400,
          }}
        >
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text
                    {...restProps}
                    mb="sm"
                    style={{
                      margin: "0 0 12px 0",
                      color: isUser ? "#4a5568" : "#2d3748",
                      fontWeight: isUser ? 500 : 400,
                    }}
                  />
                );
              },

              strong: ({ node, ...props }) => (
                <strong
                  {...props}
                  style={{
                    fontWeight: 700,
                    color: isUser ? "#667eea" : "#4caf50",
                  }}
                />
              ),

              em: ({ node, ...props }) => (
                <em
                  {...props}
                  style={{
                    fontStyle: "italic",
                    color: isUser ? "#805ad5" : "#38a169",
                  }}
                />
              ),

              h1: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="xl" fw={700} mb="md" c="#2d3748" />
                );
              },

              h2: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="lg" fw={600} mb="sm" c="#4a5568" />
                );
              },

              h3: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="md" fw={600} mb="sm" c="#4a5568" />
                );
              },

              ul: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Box
                    component="ul"
                    {...restProps}
                    ml="md"
                    mb="sm"
                    style={{
                      listStyle: "none",
                      padding: 0,
                    }}
                  />
                );
              },

              ol: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return <Box component="ol" {...restProps} ml="md" mb="sm" />;
              },

              li: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Box
                    component="li"
                    {...restProps}
                    mb="xs"
                    style={{
                      position: "relative",
                      paddingLeft: "20px",
                    }}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "8px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: isUser ? "#667eea" : "#4caf50",
                      }}
                    />
                    {restProps.children}
                  </Box>
                );
              },

              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  style={{
                    borderLeft: `4px solid ${isUser ? "#e2e8f0" : "#f0f4f8"}`,
                    backgroundColor: isUser ? "#f8fafc" : "#f7fafc",
                    borderRadius: "4px",
                    fontStyle: "italic",
                    color: "#4a5568",
                    paddingLeft: "1rem", // equivalente a pl="md"
                    paddingTop: "0.5rem", // equivalente a py="sm"
                    paddingBottom: "0.5rem",
                    marginBottom: "0.5rem", // equivalente a mb="sm"
                    margin: "0 0 0.5rem 0",
                  }}
                />
              ),

              code: ({ node, ...props }) => (
                <code
                  {...props}
                  style={{
                    backgroundColor: isUser ? "#edf2f7" : "#e6fffa",
                    color: isUser ? "#2d3748" : "#234e52",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                    fontWeight: 500,
                    padding: "2px 6px",
                  }}
                />
              ),

              // FIX: Usar elemento pre nativo para evitar conflictos de tipos
              pre: ({ node, ...props }) => (
                <pre
                  {...props}
                  style={{
                    backgroundColor: "#1a202c",
                    color: "#e2e8f0",
                    borderRadius: "8px",
                    overflow: "auto",
                    fontSize: "14px",
                    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                    border: "1px solid #2d3748",
                    padding: "1rem", // equivalente a p="md"
                    marginBottom: "0.5rem", // equivalente a mb="sm"
                  }}
                />
              ),

              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isUser ? "#667eea" : "#4caf50",
                    textDecoration: "underline",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                  }}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </Box>
      </Box>
    </Box>
  );
};
