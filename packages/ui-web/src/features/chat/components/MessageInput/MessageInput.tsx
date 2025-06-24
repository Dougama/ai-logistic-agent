import React, { useState } from "react";
import { TextInput, Button, Group, Box, Container } from "@mantine/core";
import { IconSend, IconSparkles } from "@tabler/icons-react";

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
        borderTop: "1px solid #e5e7eb",
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
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
                  border: "2px solid #e5e7eb",
                  backgroundColor: "white",
                  fontSize: "16px",
                  padding: "16px 20px",
                  transition: "all 0.2s ease",
                  "&:focus": {
                    borderColor: "#667eea",
                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                    backgroundColor: "white",
                  },
                  "&:disabled": {
                    backgroundColor: "#f3f4f6",
                    color: "#9ca3af",
                    borderColor: "#d1d5db",
                  },
                  "&::placeholder": {
                    color: "#9ca3af",
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
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "#e5e7eb",
                border: "none",
                transition: "all 0.2s ease",
                boxShadow: inputValue.trim()
                  ? "0 4px 14px rgba(102, 126, 234, 0.3)"
                  : "none",
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
