import React, { useState } from "react";
import { TextInput, Button, Group, Box, Container } from "@mantine/core";
import { IconSend, IconSparkles } from "@tabler/icons-react";

// Nuevos colores y estilos
const COLORS = {
  neutral: {
    200: "#e7e5e4",
    400: "#a8a29e",
    100: "#f5f5f4",
    300: "#d6d3d1",
  },
  primary: {
    400: "#38b2ac",
    500: "#319795",
  },
};

const GRADIENTS = {
  light: "linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)",
  primary: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
};

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
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
    <Box
      py="lg"
      style={{
        borderTop: `1px solid ${COLORS.neutral[200]}`,
        background: GRADIENTS.light,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container size="md">
        <form onSubmit={handleSubmit}>
          <Group gap="md">
            <TextInput
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              placeholder="Escribe tu mensaje a Tracko..."
              style={{ flex: 1 }}
              disabled={isLoading}
              size="lg"
              radius="xl"
              styles={{
                input: {
                  border: `2px solid ${COLORS.neutral[200]}`,
                  backgroundColor: "white",
                  fontSize: "16px",
                  padding: "16px 20px",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: COLORS.primary[400],
                    boxShadow: "0 0 0 3px rgba(56, 178, 172, 0.1)",
                    backgroundColor: "white",
                  },
                  "&:disabled": {
                    backgroundColor: COLORS.neutral[100],
                    color: COLORS.neutral[400],
                    borderColor: COLORS.neutral[300],
                  },
                  "&::placeholder": {
                    color: COLORS.neutral[400],
                  },
                },
              }}
            />

            <Button
              type="submit"
              loading={isLoading}
              disabled={!inputValue.trim()}
              size="lg"
              radius="xl"
              style={{
                minWidth: "60px",
                height: "56px",
                background: inputValue.trim()
                  ? GRADIENTS.primary
                  : COLORS.neutral[200],
                border: "none",
                transition: "all 0.2s ease",
                boxShadow: inputValue.trim()
                  ? "0 4px 14px rgba(56, 178, 172, 0.3)"
                  : "none",
                "&:hover": inputValue.trim()
                  ? {
                      boxShadow: "0 6px 20px rgba(56, 178, 172, 0.4)",
                      transform: "translateY(-1px)",
                    }
                  : {},
              }}
            >
              {isLoading ? (
                <IconSparkles
                  size={20}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <IconSend size={20} />
              )}
            </Button>
          </Group>
        </form>
      </Container>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};
