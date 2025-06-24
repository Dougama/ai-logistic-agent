import React from "react";
import { Card, Text, Group, Badge, Stack, ActionIcon } from "@mantine/core";
import { IconFileText, IconDownload, IconEye } from "@tabler/icons-react";
import type { Document } from "../../types";

interface DocumentCardProps {
  document: Document;
  onView: (document: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onView,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Reparto: "blue",
      People: "green",
      Seguridad: "red",
      Flota: "orange",
    };
    return colors[category] || "gray";
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick={() => onView(document)}
    >
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <IconFileText size={32} color="#38b2ac" />
          <Badge color={getCategoryColor(document.category)} variant="light">
            {document.category}
          </Badge>
        </Group>

        <div>
          <Text fw={600} size="lg" lineClamp={1}>
            {document.title}
          </Text>
          <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
            {document.description}
          </Text>
        </div>

        <Group justify="space-between" align="center">
          <Text size="xs" c="dimmed">
            {formatDate(document.uploadedAt)}
          </Text>
          <Group gap="xs">
            {document.size && (
              <Text size="xs" c="dimmed">
                {document.size}
              </Text>
            )}
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={(e) => {
                e.stopPropagation();
                window.open(document.pdfUrl, "_blank");
              }}
            >
              <IconDownload size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="green">
              <IconEye size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};
