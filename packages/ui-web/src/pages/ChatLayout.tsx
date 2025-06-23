import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "shared-types";
import { Sidebar } from "../components/Sidebar";
import { MessageInputForm } from "../components/MessageInputForm";
import { MessageBubble } from "../components/MessageBubble";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";

export const ChatLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }
    setIsHistoryLoading(true);
    const userId = currentUser?.uid;
    if (!userId) {
      setIsHistoryLoading(false);
      return;
    }
    // TODO: Usar el ID del usuario real desde el AuthContext
    fetch(`http://localhost:8080/chat/${activeChatId}/messages`)
      .then((res) => res.json())
      .then((data) => {
        const formattedMessages = data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp._seconds * 1000),
        }));
        setMessages(formattedMessages);
      })
      .catch(console.error)
      .finally(() => setIsHistoryLoading(false));
  }, [activeChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsReplying(true);

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
        setActiveChatId(assistantResponse.chatId);
      }
    } catch (error) {
      console.error("Error al contactar con el backend:", error);
    } finally {
      setIsReplying(false);
    }
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    toggleMobile(); // Cerramos el menú al seleccionar un chat en móvil
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    toggleMobile(); // Cerramos el menú al crear un chat nuevo en móvil
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm", // El sidebar se ocultará en pantallas más pequeñas que 'sm' (small)
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* El botón de hamburguesa solo es visible en pantallas más pequeñas que 'sm' */}
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Title order={3}>Agente de asistencia en reparto</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Sidebar
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          activeChatId={activeChatId}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <div
          style={{
            height: "calc(100vh - 60px - 2rem)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1, overflowY: "auto", padding: "10px" }}>
            {messages.length === 0 && !isReplying && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p style={{ textAlign: "center", color: "#888" }}>
                  Selecciona un chat o empieza una nueva conversación.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isReplying && <p>Asistente está escribiendo...</p>}
            <div ref={messagesEndRef} />
          </div>
          <MessageInputForm
            onSendMessage={handleSendMessage}
            isLoading={isReplying}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
