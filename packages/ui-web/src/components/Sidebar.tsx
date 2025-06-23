// packages/ui-web/src/components/Sidebar.tsx
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Stack,
  Button,
  Text,
  Group,
  ActionIcon,
  ScrollArea,
  Divider,
  Box,
  Tooltip,
} from "@mantine/core";
import {
  IconPlus,
  IconTrash,
  IconLogout,
  IconMessage,
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
  chats: ChatSummary[];
  setChats: React.Dispatch<React.SetStateAction<ChatSummary[]>>;
  onDeleteChat: (chatId: string) => void;
  onRefreshChats: () => void;
}

const PAGE_SIZE = 6;

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectChat,
  onNewChat,
  activeChatId,
  chats,
  setChats,
  onDeleteChat,
  onRefreshChats,
}) => {
  // Estados del componente
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

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
  }, [setChats]);

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
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el chat.");
      }

      // Llamamos a la función del padre para actualizar el estado
      onDeleteChat(chatIdToDelete);
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

  return (
    <Box h="100%" style={{ display: "flex", flexDirection: "column" }}>
      {/* Header con botón de nuevo chat */}
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={onNewChat}
        variant="light"
        fullWidth
        mb="md"
      >
        Nuevo Chat
      </Button>

      <Divider mb="md" />

      {/* Lista de chats scrolleable */}
      <ScrollArea style={{ flex: 1 }} type="hover">
        <Stack gap="xs">
          {isLoading ? (
            <Text ta="center" c="dimmed" size="sm">
              Cargando chats...
            </Text>
          ) : chats.length === 0 ? (
            <Text ta="center" c="dimmed" size="sm">
              No hay conversaciones aún
            </Text>
          ) : (
            chats.map((chat) => (
              <Group
                key={chat.id}
                gap="xs"
                p="sm"
                style={{
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    chat.id === activeChatId
                      ? "var(--mantine-color-blue-light)"
                      : "transparent",
                  border:
                    chat.id === activeChatId
                      ? "1px solid var(--mantine-color-blue-6)"
                      : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
                onClick={() => onSelectChat(chat.id)}
              >
                {/* Icono de mensaje */}
                <IconMessage
                  size={16}
                  style={{
                    flexShrink: 0,
                    color:
                      chat.id === activeChatId
                        ? "var(--mantine-color-blue-6)"
                        : "var(--mantine-color-gray-6)",
                  }}
                />

                {/* Texto del chat con overflow controlado */}
                <Text
                  size="sm"
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0, // Importante para que funcione el ellipsis
                  }}
                  c={chat.id === activeChatId ? "blue.6" : "gray.7"}
                >
                  {chat.title}
                </Text>

                {/* Botón de eliminar con tooltip */}
                <Tooltip label="Eliminar conversación" position="top">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                    style={{ flexShrink: 0 }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            ))
          )}

          {/* Botón de cargar más */}
          {!isLoading && hasMore && (
            <Button
              variant="subtle"
              size="sm"
              onClick={handleLoadMore}
              loading={isLoadingMore}
              fullWidth
            >
              {isLoadingMore ? "Cargando..." : "Ver más"}
            </Button>
          )}
        </Stack>
      </ScrollArea>

      {/* Footer con botón de cerrar sesión */}
      <Box mt="md">
        <Divider mb="md" />
        <Button
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
          variant="light"
          color="red"
          fullWidth
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );
};
