// ========================================
// src/features/chat/components/MessageBubble/MessageBubble.tsx (CON NUEVA PALETA)
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
    <Box
      mb="xl"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        maxWidth: "100%",
      }}
    >
      {/* Header con info del emisor */}
      <Group
        gap="xs"
        mb="sm"
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
        }}
      >
        {isUser && (
          <>
            <Text size="xs" c="dimmed">
              {formatTime(message.timestamp)}
            </Text>
            <Text size="sm" fw={600} c="#0ea5e9">
              Tú
            </Text>
            <Box
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconUser size={14} color="white" />
            </Box>
          </>
        )}

        {!isUser && (
          <>
            <Box
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconRobot size={14} color="white" />
            </Box>
            <Text size="sm" fw={600} c="#38b2ac">
              Tracko
            </Text>
            <Text size="xs" c="dimmed">
              {formatTime(message.timestamp)}
            </Text>
          </>
        )}
      </Group>

      {/* Contenido del mensaje */}
      <Box
        style={{
          maxWidth: "80%",
          minWidth: "200px",
          borderLeft: !isUser ? `3px solid #38b2ac` : "none",
          borderRight: isUser ? `3px solid #0ea5e9` : "none",
          paddingLeft: !isUser ? "16px" : "0",
          paddingRight: isUser ? "16px" : "0",
          alignSelf: isUser ? "flex-end" : "flex-start",
        }}
      >
        <Box
          style={{
            fontSize: "15px",
            lineHeight: 1.6,
            color: isUser ? "#1c1917" : "#292524",
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
                      color: isUser ? "#44403c" : "#1c1917",
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
                    color: isUser ? "#0ea5e9" : "#38b2ac",
                  }}
                />
              ),

              em: ({ node, ...props }) => (
                <em
                  {...props}
                  style={{
                    fontStyle: "italic",
                    color: isUser ? "#f97316" : "#ea580c",
                  }}
                />
              ),

              h1: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="xl" fw={700} mb="md" c="#1c1917" />
                );
              },

              h2: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="lg" fw={600} mb="sm" c="#292524" />
                );
              },

              h3: ({ node, ...props }) => {
                const { ref, ...restProps } = props;
                return (
                  <Text {...restProps} size="md" fw={600} mb="sm" c="#44403c" />
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
                        background: isUser ? "#0ea5e9" : "#38b2ac",
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
                    borderLeft: `4px solid ${isUser ? "#bae6fd" : "#b2f5ea"}`,
                    backgroundColor: isUser ? "#f0f9ff" : "#f0fdfa",
                    borderRadius: "8px",
                    fontStyle: "italic",
                    color: "#57534e",
                    paddingLeft: "1rem",
                    paddingTop: "0.75rem",
                    paddingBottom: "0.75rem",
                    marginBottom: "0.75rem",
                    margin: "0 0 0.75rem 0",
                  }}
                />
              ),

              code: ({ node, ...props }) => (
                <code
                  {...props}
                  style={{
                    backgroundColor: isUser ? "#eff6ff" : "#ecfdf5",
                    color: isUser ? "#1e40af" : "#166534",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                    fontWeight: 500,
                    padding: "3px 6px",
                    border: `1px solid ${isUser ? "#dbeafe" : "#dcfce7"}`,
                  }}
                />
              ),

              pre: ({ node, ...props }) => (
                <pre
                  {...props}
                  style={{
                    backgroundColor: "#1c1917",
                    color: "#fafaf9",
                    borderRadius: "12px",
                    overflow: "auto",
                    fontSize: "14px",
                    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
                    border: "1px solid #44403c",
                    padding: "1.25rem",
                    marginBottom: "1rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              ),

              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isUser ? "#0ea5e9" : "#38b2ac",
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
