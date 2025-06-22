// packages/ui-web/src/components/MessageInputForm.tsx
import React, { useState } from "react";

// Definimos las "props" que este componente recibirá de su padre
interface MessageInputFormProps {
  onSendMessage: (message: string) => void;
}

export const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSendMessage,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue(""); // Limpiamos el input después de enviar
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", padding: "10px" }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        style={{
          flexGrow: 1,
          padding: "10px",
          marginRight: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          background: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
    </form>
  );
};
