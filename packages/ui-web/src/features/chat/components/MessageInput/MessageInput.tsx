// packages/ui-web/src/features/chat/components/MessageInput/MessageInput.tsx (MIGRADO)

import React, { useState } from "react";
import { Container } from "@mantine/core";
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

  const hasContent = inputValue.trim().length > 0;

  return (
    <div className="message-input">
      <Container size="md">
        <form onSubmit={handleSubmit} className="message-input__form">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            placeholder="Escribe tu mensaje a Tracko..."
            disabled={isLoading}
            className="message-input__field"
          />

          <button
            type="submit"
            disabled={!hasContent || isLoading}
            className={`message-input__button ${
              hasContent && !isLoading
                ? "message-input__button--enabled"
                : isLoading
                ? "message-input__button--loading"
                : "message-input__button--disabled"
            }`}
          >
            {isLoading ? (
              <IconSparkles className="message-input__icon message-input__icon--loading" />
            ) : (
              <IconSend className="message-input__icon" />
            )}
          </button>
        </form>
      </Container>
    </div>
  );
};
