// packages/ui-web/src/App.tsx
import React, { useState, useEffect } from "react";
import { ChatMessage } from "shared-types";
import { Sidebar } from "./Sidebar";
import { MessageInputForm } from "./MessageInputForm";
import { MessageBubble } from "./MessageBubble";
function App() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Este efecto se ejecuta cada vez que el usuario selecciona un chat diferente
  useEffect(() => {
    if (!activeChatId) {
      setMessages([]); // Si no hay chat activo, limpiamos los mensajes
      return;
    }

    // Cargamos el historial del chat seleccionado
    setIsLoading(true);
    fetch(`http://localhost:8080/chat/${activeChatId}/messages`)
      .then((res) => res.json())
      .then((data) => {
        // Convertimos los timestamps de Firestore a objetos Date
        const formattedMessages = data.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp.toDate
            ? msg.timestamp.toDate()
            : new Date(msg.timestamp),
        }));
        setMessages(formattedMessages);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [activeChatId]); // La dependencia es activeChatId

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleNewChat = () => {
    setActiveChatId(null); // Poner el ID a null representa un nuevo chat
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Si es un nuevo chat, el ID es null. El backend creará uno.
    // Si es un chat existente, usamos el activeChatId.
    const endpoint = activeChatId
      ? `http://localhost:8080/chat/${activeChatId}`
      : "http://localhost:8080/chat";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const assistantResponse = await response.json();

      const assistantMessage: ChatMessage = {
        id: assistantResponse.id,
        role: "assistant",
        content: assistantResponse.content,
        timestamp: new Date(assistantResponse.timestamp),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (!activeChatId) {
        // Si era un chat nuevo, guardamos el ID para las siguientes peticiones
        setActiveChatId(assistantResponse.chatId);
      }
    } catch (error) {
      console.error("Error al contactar con el backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        activeChatId={activeChatId}
      />

      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid #ddd",
        }}
      >
        <div style={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
          {messages.length === 0 && !isLoading && (
            <p style={{ textAlign: "center", color: "#888" }}>
              Selecciona un chat o empieza una nueva conversación.
            </p>
          )}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading}
        </div>
        <MessageInputForm
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
