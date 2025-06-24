import React, { useRef, useEffect } from "react";
import { Box, Text, Stack, Container } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { MessageBubble } from "../MessageBubble";
import { MessageInput } from "../MessageInput";
import type { ChatMessage } from "../../types";

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
      }}
    >
      {/* Área de mensajes */}
      <Box style={{ flexGrow: 1, overflowY: "auto" }}>
        <Container size="md" py="xl">
          {messages.length === 0 && !isReplying && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <Box
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                }}
              >
                <IconSparkles size={48} color="white" />
              </Box>

              <Stack align="center" gap="md">
                <Text
                  size="xl"
                  fw={700}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ¡Hola! Soy Tracko
                </Text>

                <Text
                  ta="center"
                  c="#6b7280"
                  size="lg"
                  style={{ maxWidth: "400px", lineHeight: 1.6 }}
                >
                  Tu asistente de logística inteligente. Pregúntame sobre
                  envíos, rutas, inventario o cualquier cosa relacionada con tu
                  operación.
                </Text>

                <Box
                  mt="md"
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {[
                    "📦 ¿Cómo rastreo un envío?",
                    "🚚 Optimizar rutas",
                    "📊 Estado del inventario",
                  ].map((suggestion, index) => (
                    <Box
                      key={index}
                      p="xs"
                      px="md"
                      style={{
                        background: "rgba(102, 126, 234, 0.1)",
                        borderRadius: "20px",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() =>
                        onSendMessage(suggestion.replace(/^[📦🚚📊]\s/, ""))
                      }
                    >
                      <Text size="sm" c="#667eea" fw={500}>
                        {suggestion}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Box>
          )}

          {/* Mensajes */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Indicador de escritura */}
          {isReplying && (
            <Box mb="xl">
              <Box
                mb="sm"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Box
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "6px",
                    background:
                      "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSparkles size={14} color="white" />
                </Box>

                <Text size="sm" fw={600} c="#4caf50">
                  Tracko
                </Text>

                <Text size="xs" c="dimmed">
                  escribiendo...
                </Text>
              </Box>

              <Box
                pl="md"
                style={{
                  borderLeft: "3px solid #4caf50",
                  paddingLeft: "16px",
                }}
              >
                <Box
                  style={{ display: "flex", gap: "4px", alignItems: "center" }}
                >
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#4caf50",
                        animation: `pulse 1.4s ease-in-out ${
                          i * 0.2
                        }s infinite`,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* Input de mensajes */}
      <MessageInput onSendMessage={onSendMessage} isLoading={isReplying} />

      {/* CSS para la animación */}
      <style>{`
        @keyframes pulse {
          0%, 70%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          35% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};
