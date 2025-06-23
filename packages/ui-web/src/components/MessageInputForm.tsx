// packages/ui-web/src/components/MessageInputForm.tsx
import React, { useState } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { IconSend, IconRocket } from "@tabler/icons-react";

interface MessageInputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
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
    <Box
      p="md"
      style={{
        borderTop: "1px solid var(--mantine-color-gray-3)",
        backgroundColor: "var(--mantine-color-gray-0)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Group gap="sm">
          <TextInput
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            placeholder="Pregúntale algo a Tracko..."
            style={{ flex: 1 }}
            disabled={isLoading}
            variant="filled"
            size="md"
            radius="xl"
            styles={{
              input: {
                border: "1px solid var(--mantine-color-gray-4)",
                backgroundColor: "white",
                "&:focus": {
                  borderColor: "var(--mantine-color-blue-5)",
                  backgroundColor: "white",
                },
                "&:disabled": {
                  backgroundColor: "var(--mantine-color-gray-1)",
                  color: "var(--mantine-color-gray-6)",
                },
              },
            }}
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={!inputValue.trim()}
            size="md"
            radius="xl"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 45 }}
            style={{ minWidth: "50px" }}
          >
            {isLoading ? <IconRocket size={18} /> : <IconSend size={18} />}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
