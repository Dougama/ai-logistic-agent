import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Stack,
  Button,
  ScrollArea,
  Text,
  Group,
  ActionIcon,
  Divider,
  Box,
  Badge,
  Tooltip,
  Avatar,
} from "@mantine/core";
import {
  IconPlus,
  IconLogout,
  IconTrash,
  IconMessage,
  IconTruck,
  IconUser,
} from "@tabler/icons-react";

// Interfaz para los datos que vienen del backend
interface ChatSummary {
  id: string;
  title: string;
  lastUpdatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

// Props que el componente recibe de su padre
interface SidebarProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  activeChatId: string | null;
}

const PAGE_SIZE = 6;

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectChat,
  onNewChat,
  activeChatId,
}) => {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialChats = async () => {
      setIsLoading(true);
      const userId = auth.currentUser?.uid || "user123";
      try {
        const res = await fetch(`http://localhost:8080/chat/user/${userId}`);
        const data: ChatSummary[] = await res.json();
        setChats(data);
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error al cargar los chats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialChats();
  }, []);

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore || chats.length === 0) return;

    setIsLoadingMore(true);
    const lastChat = chats[chats.length - 1];
    const lastTimestamp =
      lastChat.lastUpdatedAt._seconds * 1000 +
      lastChat.lastUpdatedAt._nanoseconds / 1000000;
    const userId = auth.currentUser?.uid || "user123";

    try {
      const res = await fetch(
        `http://localhost:8080/chat/user/${userId}?lastSeen=${lastTimestamp}`
      );
      const newChats: ChatSummary[] = await res.json();
      setChats((prevChats) => [...prevChats, ...newChats]);
      if (newChats.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error al cargar más chats:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleDeleteChat = async (chatIdToDelete: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/chat/${chatIdToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el chat.");
      }

      setChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== chatIdToDelete)
      );

      if (activeChatId === chatIdToDelete) {
        onNewChat();
      }
    } catch (error) {
      console.error("Error al eliminar el chat:", error);
      alert("Hubo un error al intentar eliminar la conversación.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const formatChatTitle = (title: string) => {
    return title.length > 25 ? `${title.substring(0, 25)}...` : title;
  };

  return (
    <Stack h="100%" justify="space-between" p={0}>
      {/* Header del Sidebar */}
      <Box>
        <Group p="md" justify="space-between">
          <Group>
            <IconTruck
              size={24}
              color="var(--mantine-color-logisticsPrimary-6)"
            />
            <Text fw={600} size="sm" c="logisticsPrimary.6">
              LogiBot IA
            </Text>
          </Group>
          <Badge variant="light" color="logisticsAccent" size="xs">
            Beta
          </Badge>
        </Group>

        <Box px="md" pb="md">
          <Button
            onClick={onNewChat}
            fullWidth
            leftSection={<IconPlus size={18} />}
            variant="gradient"
            gradient={{ from: "logisticsPrimary.6", to: "logisticsPrimary.8" }}
            radius="md"
            size="sm"
            style={{
              boxShadow: "0 2px 8px rgba(33, 150, 243, 0.2)",
            }}
          >
            Nueva Consulta
          </Button>
        </Box>

        <Divider />

        {/* Lista de Chats */}
        <ScrollArea style={{ height: "calc(100vh - 200px)" }} p="md">
          <Stack gap="xs">
            {isLoading ? (
              <Text c="dimmed" size="sm" ta="center" py="xl">
                Cargando conversaciones...
              </Text>
            ) : chats.length === 0 ? (
              <Box ta="center" py="xl">
                <IconMessage size={48} color="var(--mantine-color-gray-4)" />
                <Text c="dimmed" size="sm" mt="md">
                  No hay conversaciones aún
                </Text>
              </Box>
            ) : (
              chats.map((chat) => (
                <Group
                  key={chat.id}
                  p="sm"
                  style={{
                    borderRadius: "var(--mantine-radius-md)",
                    cursor: "pointer",
                    backgroundColor:
                      chat.id === activeChatId
                        ? "var(--mantine-color-logisticsPrimary-0)"
                        : "transparent",
                    border:
                      chat.id === activeChatId
                        ? "1px solid var(--mantine-color-logisticsPrimary-3)"
                        : "1px solid transparent",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => onSelectChat(chat.id)}
                  onMouseEnter={(e) => {
                    if (chat.id !== activeChatId) {
                      e.currentTarget.style.backgroundColor =
                        "var(--mantine-color-gray-0)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (chat.id !== activeChatId) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  justify="space-between"
                  wrap="nowrap"
                >
                  <Group style={{ flex: 1, minWidth: 0 }}>
                    <IconMessage
                      size={16}
                      color={
                        chat.id === activeChatId
                          ? "var(--mantine-color-logisticsPrimary-6)"
                          : "var(--mantine-color-gray-6)"
                      }
                    />
                    <Text
                      size="sm"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color:
                          chat.id === activeChatId
                            ? "var(--mantine-color-logisticsPrimary-8)"
                            : "inherit",
                        fontWeight: chat.id === activeChatId ? 500 : 400,
                      }}
                    >
                      {formatChatTitle(chat.title)}
                    </Text>
                  </Group>

                  <Tooltip label="Eliminar conversación">
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      style={{
                        opacity: 0.6,
                        transition: "opacity 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.6";
                      }}
                    >
                      <IconTrash size={14} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              ))
            )}

            {!isLoading && hasMore && (
              <Button
                onClick={handleLoadMore}
                loading={isLoadingMore}
                variant="subtle"
                size="sm"
                color="gray"
                fullWidth
                mt="sm"
              >
                {isLoadingMore ? "Cargando..." : "Ver más conversaciones"}
              </Button>
            )}
          </Stack>
        </ScrollArea>
      </Box>

      {/* Footer del Sidebar */}
      <Box>
        <Divider />
        <Group p="md" justify="space-between">
          <Group>
            <Avatar size="sm" color="logisticsPrimary">
              <IconUser size={16} />
            </Avatar>
            <Text size="sm" fw={500}>
              {auth.currentUser?.email?.split("@")[0] || "Usuario"}
            </Text>
          </Group>

          <Tooltip label="Cerrar sesión">
            <ActionIcon
              onClick={handleLogout}
              color="red"
              variant="subtle"
              size="sm"
            >
              <IconLogout size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
    </Stack>
  );
};
