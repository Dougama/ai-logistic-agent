import React, { useState, useRef, useEffect } from "react";
import {
  Textarea,
  Button,
  Group,
  Paper,
  ActionIcon,
  Tooltip,
  Box,
  Text,
} from "@mantine/core";
import {
  IconSend,
  IconMicrophone,
  IconPaperclip,
  IconSparkles,
} from "@tabler/icons-react";

interface MessageInputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const MessageInputForm: React.FC<MessageInputFormProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [inputValue]);

  const suggestions = [
    "¿Cuál es el estado de mi envío?",
    "Optimizar ruta de entrega",
    "Calcular tiempo estimado",
    "Consultar inventario",
  ];

  return (
    <Box>
      {/* Sugerencias rápidas */}
      {inputValue === "" && (
        <Group gap="xs" mb="sm" px="md">
          <Text size="xs" c="dimmed" style={{ whiteSpace: "nowrap" }}>
            Prueba con:
          </Text>
          {suggestions.slice(0, 2).map((suggestion, index) => (
            <Button
              key={index}
              size="xs"
              variant="light"
              color="logisticsPrimary"
              radius="xl"
              onClick={() => setInputValue(suggestion)}
              style={{
                fontSize: "11px",
                height: "24px",
                padding: "0 12px",
              }}
            >
              {suggestion}
            </Button>
          ))}
        </Group>
      )}

      <Paper
        shadow="md"
        p="md"
        style={{
          borderTop: "1px solid var(--mantine-color-gray-3)",
          backgroundColor: "white",
          borderRadius: 0,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Group align="flex-end" wrap="nowrap">
            {/* Botones de acciones adicionales */}
            <Group gap="xs">
              <Tooltip label="Adjuntar archivo">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  disabled={isLoading}
                >
                  <IconPaperclip size={18} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Grabar audio">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="lg"
                  disabled={isLoading}
                >
                  <IconMicrophone size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>

            {/* Textarea principal */}
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta sobre logística aquí... (Enter para enviar)"
              disabled={isLoading}
              autosize
              minRows={1}
              maxRows={4}
              radius="xl"
              style={{
                flexGrow: 1,
              }}
              styles={{
                input: {
                  border: "2px solid var(--mantine-color-gray-3)",
                  backgroundColor: "var(--mantine-color-gray-0)",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: "var(--mantine-color-logisticsPrimary-4)",
                    backgroundColor: "white",
                    boxShadow: "0 0 0 3px rgba(33, 150, 243, 0.1)",
                  },
                  "&::placeholder": {
                    color: "var(--mantine-color-gray-5)",
                    opacity: 0.8,
                  },
                  "&:disabled": {
                    backgroundColor: "var(--mantine-color-gray-1)",
                    color: "var(--mantine-color-gray-6)",
                    cursor: "not-allowed",
                  },
                },
              }}
            />

            {/* Botón de envío */}
            <Tooltip
              label={
                inputValue.trim()
                  ? "Enviar mensaje"
                  : "Escribe algo para enviar"
              }
            >
              <ActionIcon
                type="submit"
                variant="filled"
                color="logisticsPrimary"
                size="lg"
                radius="xl"
                disabled={!inputValue.trim() || isLoading}
                loading={isLoading}
                style={{
                  minWidth: "40px",
                  minHeight: "40px",
                  transition: "all 0.2s ease",
                }}
              >
                <IconSend size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </form>

        {/* Indicador de estado */}
        {isLoading && (
          <Group mt="xs" gap="xs" justify="center">
            <IconSparkles size={14} style={{ opacity: 0.6 }} />
            <Text size="xs" c="dimmed">
              Procesando consulta...
            </Text>
          </Group>
        )}
      </Paper>
    </Box>
  );
};
