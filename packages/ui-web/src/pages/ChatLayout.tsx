import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "shared-types";
import { Sidebar } from "../components/Sidebar";
import { MessageInputForm } from "../components/MessageInputForm";
import { MessageBubble } from "../components/MessageBubble";
import {
  AppShell,
  Burger,
  Group,
  Title,
  Text,
  Box,
  Badge,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { IconRobot, IconBolt } from "@tabler/icons-react";

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
    toggleMobile();
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    toggleMobile();
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
    >
      <AppShell.Header
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottom: "none",
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />

            <Flex align="center" gap="sm">
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  padding: "8px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <IconRobot size={24} color="white" />
              </Box>

              <Box>
                <Title
                  order={2}
                  c="white"
                  style={{
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  Tracko
                </Title>
                <Text
                  size="sm"
                  c="rgba(255, 255, 255, 0.8)"
                  style={{ marginTop: "-2px" }}
                >
                  Agente de Logística IA
                </Text>
              </Box>
            </Flex>
          </Group>

          <Badge
            variant="light"
            color="white"
            size="sm"
            leftSection={<IconBolt size={12} />}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {isReplying ? "Procesando..." : "En línea"}
          </Badge>
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
            height: "calc(100vh - 70px - 2rem)",
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
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    padding: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <IconRobot size={48} color="white" />
                </Box>
                <Title order={3} c="gray.6">
                  ¡Hola! Soy Tracko
                </Title>
                <Text ta="center" c="gray.5" size="lg">
                  Tu asistente de logística inteligente.
                  <br />
                  Pregúntame lo que necesites sobre envíos y entregas.
                </Text>
              </div>
            )}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isReplying && (
              <Group gap="sm" p="md">
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <IconRobot size={16} color="white" />
                </Box>
                <Text c="gray.6" fs="italic">
                  Tracko está escribiendo...
                </Text>
              </Group>
            )}
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
