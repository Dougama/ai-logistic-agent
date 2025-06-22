// packages/ui-web/src/pages/ChatPage.tsx
import React, { useState } from "react";
import { MessageInputForm } from "../components/MessageInputForm";
import { ChatMessage } from "shared-types";

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId, setChatId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`, // Usamos un ID simple por ahora
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    // CAMBIO 4: Actualizamos el estado, añadiendo el nuevo mensaje a la lista existente
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    const endpoint = chatId
      ? `http://localhost:8080/chat/${chatId}`
      : "http://localhost:8080/chat";
    try {
      // 4. Hacemos la llamada a nuestro backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      const assistantResponse: ChatMessage & { chatId: string } =
        await response.json();

      // 5. Añadimos la respuesta del asistente a la UI
      const assistantMessage: ChatMessage = {
        id: assistantResponse.id,
        role: "assistant",
        content: assistantResponse.content,
        timestamp: new Date(assistantResponse.timestamp),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // 6. Si es el primer mensaje, guardamos el chatId
      if (!chatId) {
        setChatId(assistantResponse.chatId);
      }
    } catch (error) {
      console.error("Error al contactar con el backend:", error);
      // Opcional: añadir un mensaje de error a la UI
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: "assistant",
        content:
          "Lo siento, no he podido conectar con el servidor. Inténtalo de nuevo.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      // 7. Desactivamos el indicador de "cargando"
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "800px",
        margin: "0 auto",
        border: "1px solid #ddd",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          padding: "10px",
          margin: "0",
          borderBottom: "1px solid #ddd",
        }}
      >
        Agente de Productividad Operativa
      </h1>

      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              margin: "5px 0",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                borderRadius: "18px",
                backgroundColor: msg.role === "user" ? "#007bff" : "#e9ecef",
                color: msg.role === "user" ? "white" : "black",
                maxWidth: "400px",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Mostramos el indicador de "escribiendo..." */}
        {isLoading && (
          <div style={{ alignSelf: "flex-start" }}>
            <p>Asistente está escribiendo...</p>
          </div>
        )}
      </div>

      <MessageInputForm onSendMessage={handleSendMessage} />
    </div>
  );
};
