import React from "react";
import { Stack, Title, SimpleGrid, Text, Box } from "@mantine/core";
import { DocumentCard } from "../DocumentCard";
import type { DocumentsByCategory, Document } from "../../types";

interface DocumentCategoriesProps {
  categories: DocumentsByCategory[];
  onViewDocument: (document: Document) => void;
}

export const DocumentCategories: React.FC<DocumentCategoriesProps> = ({
  categories,
  onViewDocument,
}) => {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Reparto: "📦",
      People: "👥",
      Seguridad: "🛡️",
      Flota: "🚚",
    };
    return icons[category] || "📄";
  };

  return (
    <Stack gap="xl">
      {categories.map(({ category, documents }) => (
        <Box key={category}>
          <Title
            order={3}
            mb="md"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span style={{ fontSize: "1.5rem" }}>
              {getCategoryIcon(category)}
            </span>
            {category}
          </Title>

          {documents.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {documents.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onView={onViewDocument}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Text c="dimmed" size="sm">
              No hay documentos disponibles en esta categoría
            </Text>
          )}
        </Box>
      ))}
    </Stack>
  );
};
