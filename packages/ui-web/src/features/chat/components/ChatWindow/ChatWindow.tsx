import React, { useRef, useEffect } from "react";
import { Box, Text, Stack, Container } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { MessageBubble } from "../MessageBubble";
import { MessageInput } from "../MessageInput";
import type { ChatMessage } from "../../types";

// Nueva paleta de colores
const COLORS = {
  neutral: {
    500: "#78716c",
    50: "#fafaf9",
    100: "#f5f5f4",
  },
  primary: {
    400: "#38b2ac",
  },
};

const GRADIENTS = {
  hero: "linear-gradient(135deg, #38b2ac 0%, #0ea5e9 50%, #319795 100%)",
  primary: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
  light: "linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)",
};

const SHADOWS = {
  primary: "0 10px 30px rgba(56, 178, 172, 0.3)",
};

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
        background: GRADIENTS.light,
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
                gap: "32px",
              }}
            >
              {/* Icono principal con nuevo gradiente */}
              <Box
                style={{
                  background: GRADIENTS.hero,
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: SHADOWS.primary,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "24px",
                  }}
                />
                <IconSparkles
                  size={56}
                  color="white"
                  style={{ position: "relative", zIndex: 1 }}
                />
              </Box>

              <Stack align="center" gap="lg" style={{ maxWidth: "500px" }}>
                {/* Título principal */}
                <Text
                  size="2xl"
                  fw={800}
                  ta="center"
                  style={{
                    background: GRADIENTS.primary,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "2.5rem",
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  ¡Hola! Soy Tracko
                </Text>

                {/* Subtítulo */}
                <Text
                  ta="center"
                  c={COLORS.neutral[500]}
                  size="xl"
                  style={{
                    maxWidth: "450px",
                    lineHeight: 1.6,
                    fontSize: "1.25rem",
                    fontWeight: 400,
                  }}
                >
                  Tu asistente de logística inteligente.
                </Text>

                {/* Características destacadas */}
                <Box
                  mt="md"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    width: "100%",
                    maxWidth: "600px",
                  }}
                >
                  {[
                    {
                      icon: "⚡",
                      title: "Tiempo Real",
                      desc: "Información actualizada",
                    },
                    {
                      icon: "🎯",
                      title: "Precisión",
                      desc: "Datos confiables",
                    },
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      p="lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        borderRadius: "16px",
                        border: "1px solid rgba(56, 178, 172, 0.1)",
                        backdropFilter: "blur(10px)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(56, 178, 172, 0.15)",
                        },
                      }}
                    >
                      <Text
                        size="2xl"
                        style={{ fontSize: "2rem", marginBottom: "8px" }}
                      >
                        {feature.icon}
                      </Text>
                      <Text fw={600} size="sm" c="#1c1917" mb="xs">
                        {feature.title}
                      </Text>
                      <Text size="xs" c={COLORS.neutral[500]}>
                        {feature.desc}
                      </Text>
                    </Box>
                  ))}
                </Box>

                {/* Sugerencias de conversación */}
                <Box mt="xl" w="100%">
                  <Text size="lg" fw={600} ta="center" mb="md" c="#1c1917">
                    Prueba preguntando:
                  </Text>

                  <Box
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {[
                      "📦 ¿Cómo rastreo un envío?",
                      "🚚 Optimizar mis rutas de entrega",
                      "📊 Estado actual del inventario",
                      "🗺️ Mejores rutas para hoy",
                      "💰 Costos de envío",
                      "⏰ Tiempos de entrega",
                    ].map((suggestion, index) => (
                      <Box
                        key={index}
                        p="sm"
                        px="lg"
                        style={{
                          background: "rgba(56, 178, 172, 0.08)",
                          borderRadius: "25px",
                          border: "1px solid rgba(56, 178, 172, 0.2)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          backdropFilter: "blur(5px)",
                          "&:hover": {
                            background: "rgba(56, 178, 172, 0.15)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 4px 15px rgba(56, 178, 172, 0.2)",
                          },
                        }}
                        onClick={() =>
                          onSendMessage(
                            suggestion.replace(/^[📦🚚📊🗺️💰⏰]\s/, "")
                          )
                        }
                      >
                        <Text
                          size="sm"
                          c={COLORS.primary[400]}
                          fw={500}
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {suggestion}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Call to action */}
                <Box
                  mt="lg"
                  p="md"
                  style={{
                    background: "rgba(14, 165, 233, 0.05)",
                    borderRadius: "12px",
                    border: "1px solid rgba(14, 165, 233, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <Text size="sm" c="#0ea5e9" fw={500}>
                    💡 Tip: Puedes hacer preguntas específicas sobre tu
                    operación logística
                  </Text>
                </Box>
              </Stack>
            </Box>
          )}

          {/* Mensajes */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Indicador de escritura mejorado */}
          {isReplying && (
            <Box mb="xl">
              <Box
                mb="sm"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingLeft: "8px",
                }}
              >
                <Box
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: GRADIENTS.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(56, 178, 172, 0.3)",
                  }}
                >
                  <IconSparkles size={16} color="white" />
                </Box>

                <Box>
                  <Text size="sm" fw={600} c={COLORS.primary[400]}>
                    Tracko
                  </Text>
                  <Text size="xs" c={COLORS.neutral[500]}>
                    está escribiendo...
                  </Text>
                </Box>
              </Box>

              <Box
                pl="md"
                style={{
                  borderLeft: `3px solid ${COLORS.primary[400]}`,
                  paddingLeft: "20px",
                  marginLeft: "8px",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    padding: "12px 0",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <Box
                      key={i}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: COLORS.primary[400],
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

      {/* CSS para las animaciones */}
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </Box>
  );
};
