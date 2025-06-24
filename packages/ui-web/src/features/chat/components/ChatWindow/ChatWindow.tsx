// packages/ui-web/src/features/chat/components/ChatWindow/ChatWindow.tsx (MIGRADO)

import React, { useRef, useEffect } from "react";
import { Container } from "@mantine/core";
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
    <div className="chat-window">
      {/* Área de mensajes */}
      <div className="chat-window__messages">
        <Container size="md">
          {messages.length === 0 && !isReplying && (
            <div className="chat-window__empty">
              {/* Icono principal */}
              <div className="chat-window__empty-icon">
                <IconSparkles
                  size={56}
                  color="white"
                  style={{ position: "relative", zIndex: 1 }}
                />
              </div>

              <div className="chat-window__empty-content">
                {/* Título principal */}
                <h1 className="chat-window__empty-title">¡Hola! Soy Tracko</h1>

                {/* Subtítulo */}
                <p className="chat-window__empty-subtitle">
                  Tu asistente de logística inteligente.
                </p>

                {/* Características destacadas */}
                <div className="chat-features">
                  <div
                    className="chat-feature"
                    onClick={() =>
                      onSendMessage("¿Cómo funciona el tiempo real?")
                    }
                  >
                    <span className="chat-feature__icon">⚡</span>
                    <h3 className="chat-feature__title">Tiempo Real</h3>
                    <p className="chat-feature__description">
                      Información actualizada
                    </p>
                  </div>

                  <div
                    className="chat-feature"
                    onClick={() =>
                      onSendMessage("¿Qué tan precisos son los datos?")
                    }
                  >
                    <span className="chat-feature__icon">🎯</span>
                    <h3 className="chat-feature__title">Precisión</h3>
                    <p className="chat-feature__description">
                      Datos confiables
                    </p>
                  </div>
                </div>

                {/* Sugerencias de conversación */}
                <div className="chat-suggestions">
                  <h2 className="chat-suggestions__title">
                    Prueba preguntando:
                  </h2>

                  <div className="chat-suggestions__list">
                    {[
                      "📦 ¿Cómo rastreo un envío?",
                      "🚚 Optimizar mis rutas de entrega",
                      "📊 Estado actual del inventario",
                      "🗺️ Mejores rutas para hoy",
                      "💰 Costos de envío",
                      "⏰ Tiempos de entrega",
                    ].map((suggestion, index) => (
                      <div
                        key={index}
                        className="chat-suggestion"
                        onClick={() =>
                          onSendMessage(
                            suggestion.replace(/^[📦🚚📊🗺️💰⏰]\s/, "")
                          )
                        }
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action */}
                <div className="chat-tip">
                  <p className="chat-tip__text">
                    💡 Tip: Puedes hacer preguntas específicas sobre tu
                    operación logística
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mensajes */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Indicador de escritura */}
          {isReplying && (
            <div className="typing-indicator">
              <div className="typing-indicator__header">
                <div className="typing-indicator__info">
                  <p className="typing-indicator__name">Tracko</p>
                  <p className="typing-indicator__status">
                    está escribiendo...
                  </p>
                </div>
              </div>

              <div className="typing-indicator__content">
                <div className="typing-indicator__dots">
                  <div className="typing-indicator__dot"></div>
                  <div className="typing-indicator__dot"></div>
                  <div className="typing-indicator__dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </Container>
      </div>

      {/* Input de mensajes */}
      <MessageInput onSendMessage={onSendMessage} isLoading={isReplying} />
    </div>
  );
};
