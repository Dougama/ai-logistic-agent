import React from "react";
import { ChatMessage } from "shared-types";
import ReactMarkdown from "react-markdown";
import { Paper, Group, Avatar, Text, Box, Stack } from "@mantine/core";
import { IconUser, IconRobot } from "@tabler/icons-react";

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
    <Group
      align="flex-start"
      justify={isUser ? "flex-end" : "flex-start"}
      mb="lg"
      wrap="nowrap"
    >
      {!isUser && (
        <Avatar
          size="md"
          radius="xl"
          color="logisticsPrimary"
          style={{
            background:
              "linear-gradient(135deg, var(--mantine-color-logisticsPrimary-6), var(--mantine-color-logisticsSecondary-6))",
          }}
        >
          <IconRobot size={20} />
        </Avatar>
      )}

      <Stack gap={4} style={{ maxWidth: "75%", minWidth: "200px" }}>
        <Paper
          shadow="sm"
          p="md"
          radius="xl"
          style={{
            backgroundColor: isUser
              ? "var(--mantine-color-logisticsPrimary-6)"
              : "var(--mantine-color-gray-0)",
            color: isUser ? "white" : "var(--mantine-color-gray-9)",
            position: "relative",
            border: isUser ? "none" : "1px solid var(--mantine-color-gray-3)",
            ...(isUser
              ? {
                  background:
                    "linear-gradient(135deg, var(--mantine-color-logisticsPrimary-6), var(--mantine-color-logisticsPrimary-7))",
                  boxShadow: "0 4px 12px rgba(33, 150, 243, 0.2)",
                }
              : {
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }),
          }}
        >
          <Box
            style={{
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: isUser
                        ? "rgba(255, 255, 255, 0.9)"
                        : "var(--mantine-color-logisticsPrimary-6)",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} style={{ margin: "0 0 8px 0" }} />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    {...props}
                    style={{ margin: "8px 0", paddingLeft: "20px" }}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    {...props}
                    style={{ margin: "8px 0", paddingLeft: "20px" }}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} style={{ margin: "4px 0" }} />
                ),
                code: ({ node, ...props }) => (
                  <code
                    {...props}
                    style={{
                      backgroundColor: isUser
                        ? "rgba(255, 255, 255, 0.2)"
                        : "var(--mantine-color-gray-2)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontFamily: "Monaco, Consolas, monospace",
                    }}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    style={{
                      backgroundColor: isUser
                        ? "rgba(255, 255, 255, 0.1)"
                        : "var(--mantine-color-gray-1)",
                      padding: "12px",
                      borderRadius: "8px",
                      overflow: "auto",
                      fontSize: "13px",
                      fontFamily: "Monaco, Consolas, monospace",
                      border: isUser
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid var(--mantine-color-gray-3)",
                      margin: "8px 0",
                    }}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    {...props}
                    style={{
                      borderLeft: `4px solid ${
                        isUser
                          ? "rgba(255, 255, 255, 0.5)"
                          : "var(--mantine-color-logisticsPrimary-4)"
                      }`,
                      paddingLeft: "12px",
                      margin: "8px 0",
                      fontStyle: "italic",
                      opacity: 0.9,
                    }}
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </Box>
        </Paper>

        <Text
          size="xs"
          c="dimmed"
          style={{
            alignSelf: isUser ? "flex-end" : "flex-start",
            marginTop: "4px",
            fontSize: "11px",
          }}
        >
          {formatTime(message.timestamp)}
        </Text>
      </Stack>

      {isUser && (
        <Avatar
          size="md"
          radius="xl"
          color="logisticsAccent"
          style={{
            background:
              "linear-gradient(135deg, var(--mantine-color-logisticsAccent-5), var(--mantine-color-logisticsAccent-6))",
          }}
        >
          <IconUser size={20} />
        </Avatar>
      )}
    </Group>
  );
};
