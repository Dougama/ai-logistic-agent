// packages/ui-web/src/components/MessageInputForm.tsx
import React, { useState } from "react";
// Nuevas importaciones de Mantine
import { TextInput, Button, Group } from "@mantine/core";
import { IconSend } from "@tabler/icons-react"; // Librería de iconos que funciona bien con Mantine

interface MessageInputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean; // Recibimos el estado de carga para deshabilitar el formulario
}

export const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
      {/* Group es un componente de Mantine para alinear elementos en una fila con espacio */}
      <Group>
        <TextInput
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          placeholder="Escribe tu pregunta aquí..."
          style={{ flexGrow: 1 }}
          disabled={isLoading}
        />
        <Button type="submit" loading={isLoading}>
          <IconSend size={18} />
        </Button>
      </Group>
    </form>
  );
};
