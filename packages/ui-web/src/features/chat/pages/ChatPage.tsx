import React, { useState, useCallback } from "react";
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
import { IconRobot, IconBolt } from "@tabler/icons-react";
import { useAuth } from "../../../shared/services/auth";
import { ChatWindow } from "../components/ChatWindow";
import { ChatSidebar } from "../components/ChatSidebar";
import { useChatList } from "../hooks/useChatList";
import { chatService, messageService } from "../services";
import type { ChatMessage } from "../types";

// Importar los nuevos colores
const GRADIENTS = {
  hero: "linear-gradient(135deg, #38b2ac 0%, #0ea5e9 50%, #319795 100%)",
};

const SHADOWS = {
  primary: "0 4px 20px rgba(56, 178, 172, 0.15)",
};

const applyGlassmorphism = (opacity: number = 0.2) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

export const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

  // Estados locales para mensajes
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isReplying, setIsReplying] = useState(false);

  const userId = currentUser?.uid || "user123";
  const {
    chats,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMoreChats,
    deleteChat,
    addNewChat,
  } = useChatList(userId);

  // Cargar mensajes cuando se selecciona un chat
  const loadChatMessages = useCallback(async (chatId: string) => {
    try {
      const data = await chatService.getChatMessages(chatId);
      const formattedMessages = messageService.formatMessages(data);
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error loading chat messages:", error);
      setMessages([]);
    }
  }, []);

  // Enviar mensaje
  const handleSendMessage = useCallback(
    async (text: string) => {
      console.log("🚀 Enviando mensaje:", text);

      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsReplying(true);

      try {
        let response;

        if (activeChatId) {
          console.log("📤 Enviando a chat existente:", activeChatId);
          response = await chatService.sendMessage(activeChatId, text);
        } else {
          console.log("🆕 Creando nuevo chat");
          response = await chatService.createChat(text);
        }

        console.log("📥 Respuesta del servidor:", response);

        const assistantMessage: ChatMessage = {
          id: response.id,
          role: "assistant",
          content: response.content,
          timestamp: new Date(response.timestamp),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Si es un chat nuevo, actualizar el ID y agregar a la lista
        if (!activeChatId && response.chatId) {
          setActiveChatId(response.chatId);
          addNewChat({
            id: response.chatId,
            title: messageService.generateChatTitle(text),
          });
        }
      } catch (error) {
        console.error("❌ Error enviando mensaje:", error);

        // Remover el mensaje del usuario si hay error
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));

        // Mostrar error al usuario
        alert(
          "Error al enviar el mensaje. Por favor, verifica que el servidor esté funcionando."
        );
      } finally {
        setIsReplying(false);
      }
    },
    [activeChatId, addNewChat]
  );

  // Seleccionar chat
  const handleSelectChat = useCallback(
    async (chatId: string) => {
      console.log("📂 Seleccionando chat:", chatId);
      setActiveChatId(chatId);
      await loadChatMessages(chatId);
      toggleMobile();
    },
    [loadChatMessages, toggleMobile]
  );

  // Nuevo chat
  const handleNewChat = useCallback(() => {
    console.log("🆕 Iniciando nuevo chat");
    setActiveChatId(null);
    setMessages([]);
    toggleMobile();
  }, [toggleMobile]);

  // Eliminar chat
  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      await deleteChat(chatId);
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([]);
      }
    },
    [deleteChat, activeChatId]
  );

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
          background: GRADIENTS.hero,
          borderBottom: "none",
          boxShadow: SHADOWS.primary,
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
                  ...applyGlassmorphism(0.2),
                  borderRadius: "12px",
                  padding: "8px",
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
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Tracko
                </Title>
                <Text
                  size="sm"
                  c="rgba(255, 255, 255, 0.9)"
                  style={{
                    marginTop: "-2px",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Agente de Logística IA
                </Text>
              </Box>
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          isLoading={isLoading}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          onLoadMore={loadMoreChats}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <div style={{ height: "calc(100vh - 70px - 2rem)" }}>
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isReplying={isReplying}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};
