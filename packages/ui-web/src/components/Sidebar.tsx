import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Interfaz para los datos que vienen del backend
interface ChatSummary {
  id: string;
  title: string;
  lastUpdatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

// Props que el componente recibe de su padre (App.tsx)
interface SidebarProps {
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  activeChatId: string | null;
}

const PAGE_SIZE = 6; // Número de chats a cargar por página

export const Sidebar: React.FC<SidebarProps> = ({
  onSelectChat,
  onNewChat,
  activeChatId,
}) => {
  // --- ESTADOS DEL COMPONENTE ---
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // --- LÓGICA DE DATOS ---

  useEffect(() => {
    // Carga inicial de los primeros chats
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
  }, []); // Se ejecuta solo una vez

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
      // Llamamos al endpoint DELETE que creaste en el backend

      const response = await fetch(
        `http://localhost:8080/chat/${chatIdToDelete}`,

        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el chat.");
      }

      // Si la eliminación fue exitosa en el backend, actualizamos la UI localmente

      // para que el chat desaparezca al instante.

      setChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== chatIdToDelete)
      );

      // Si el chat eliminado era el que estaba activo, reseteamos la vista

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

      // Nuestro AuthContext se encargará de redirigir a la página de login automáticamente
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // --- ESTILOS (Restaurados y completos) ---
  const sidebarStyle: React.CSSProperties = {
    width: "260px",
    borderRight: "1px solid #ddd",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8f9fa",
    boxSizing: "border-box",
    height: "100%", // <-- ¡LA LÍNEA CLAVE!
  };

  const chatItemStyle = (id: string): React.CSSProperties => ({
    padding: "10px",
    margin: "5px 0",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: id === activeChatId ? "#007bff" : "transparent",
    color: id === activeChatId ? "white" : "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  });

  return (
    <div style={sidebarStyle}>
      <button
        onClick={onNewChat}
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        + Nuevo Chat
      </button>

      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {isLoading ? (
          <p>Cargando chats...</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              style={chatItemStyle(chat.id)}
              onClick={(e) => {
                if ((e.target as HTMLElement).id !== `delete-btn-${chat.id}`) {
                  onSelectChat(chat.id);
                }
              }}
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {chat.title}
              </span>
              <button
                id={`delete-btn-${chat.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteChat(chat.id);
                }}
                style={{
                  flexShrink: 0,
                  background: "none",
                  border: "none",
                  color: chat.id === activeChatId ? "white" : "red",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                X
              </button>
            </div>
          ))
        )}

        {/* El botón de "Ver más" que añadimos */}
        {!isLoading && hasMore && (
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            style={{ width: "100%", marginTop: "10px", padding: "8px" }}
          >
            {isLoadingMore ? "Cargando..." : "Ver más"}
          </button>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#dc3545",
          color: "white",
          cursor: "pointer",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
