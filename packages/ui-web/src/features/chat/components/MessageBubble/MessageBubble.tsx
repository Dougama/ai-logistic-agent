// packages/ui-web/src/features/chat/components/MessageBubble/MessageBubble.tsx (ACTUALIZADO)

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "../../types";

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-bubble ${
        isUser ? "message-bubble--user" : "message-bubble--assistant"
      }`}
    >
      {/* Contenido del mensaje - SIN HEADER */}
      <div
        className={`message-content ${
          isUser ? "message-content--user" : "message-content--assistant"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Párrafos
            p: ({ children }) => <p>{children}</p>,

            // Estilos de texto
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,

            // Encabezados
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,

            // Listas
            ul: ({ children }) => <ul>{children}</ul>,
            ol: ({ children }) => <ol>{children}</ol>,
            li: ({ children }) => <li>{children}</li>,

            // Citas
            blockquote: ({ children }) => <blockquote>{children}</blockquote>,

            // Código
            code: ({ children }) => <code>{children}</code>,
            pre: ({ children }) => <pre>{children}</pre>,

            // Enlaces
            a: ({ children, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),

            // COMPONENTES DE TABLA
            table: ({ children }) => (
              <div className="message-table-wrapper">
                <table className="message-table">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="message-table__head">{children}</thead>
            ),
            tbody: ({ children }) => (
              <tbody className="message-table__body">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="message-table__row">{children}</tr>
            ),
            th: ({ children }) => (
              <th className="message-table__header">{children}</th>
            ),
            td: ({ children }) => (
              <td className="message-table__cell">{children}</td>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
