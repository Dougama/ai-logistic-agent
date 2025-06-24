import React, { useState, useEffect } from "react";
import {
  AppShell,
  Burger,
  Group,
  Title,
  Text,
  Box,
  Stack,
  Button,
  Flex,
  ActionIcon,
  Tooltip,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconRobot,
  IconLogout,
  IconBell,
  IconSettings,
  IconSearch,
  IconFilter,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../shared/services/auth/firebase";
import { useAuth } from "../../../shared/services/auth";
import { DocumentCategories } from "../components/DocumentCategories";
import { PdfViewer } from "../components/PdfViewer";
import { documentationService } from "../services";
import type { DocumentsByCategory, Document } from "../types";

// Importar los estilos
const GRADIENTS = {
  hero: "linear-gradient(135deg, #38b2ac 0%, #0ea5e9 50%, #319795 100%)",
};

const SHADOWS = {
  primary: "0 4px 20px rgba(56, 178, 172, 0.15)",
};

const applyGlassmorphism = (opacity: number = 0.2) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

export const DocumentationPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [documentCategories, setDocumentCategories] = useState<
    DocumentsByCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const categories = await documentationService.getDocumentsByCategory();
      setDocumentCategories(categories);
    } catch (error) {
      console.error("Error loading documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  const sidebarItems = [
    { label: "Dashboard", onClick: () => navigate("/dashboard") },
    { label: "Chat con Tracko", onClick: () => navigate("/chat") },
    {
      label: "Documentación",
      active: true,
      onClick: () => navigate("/documentation"),
    },
    { label: "Rutas", onClick: () => console.log("Rutas") },
    { label: "Reportes", onClick: () => console.log("Reportes") },
    { label: "Configuración", onClick: () => console.log("Configuración") },
  ];

  // Filtrar documentos basado en la búsqueda
  const filteredCategories = documentCategories.map((category) => ({
    ...category,
    documents: category.documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 70 }}
        navbar={{
          width: 280,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened },
        }}
      >
        <AppShell.Header
          style={{
            background: GRADIENTS.hero,
            borderBottom: "none",
            boxShadow: SHADOWS.primary,
          }}
        >
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={mobileOpened}
                onClick={toggleMobile}
                hiddenFrom="sm"
                size="sm"
                color="white"
              />

              <Flex align="center" gap="sm">
                <Box
                  style={{
                    ...applyGlassmorphism(0.2),
                    borderRadius: "12px",
                    padding: "8px",
                  }}
                >
                  <IconRobot size={24} color="white" />
                </Box>

                <Box>
                  <Title
                    order={2}
                    c="white"
                    style={{
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Tracko Logistics
                  </Title>
                  <Text
                    size="sm"
                    c="rgba(255, 255, 255, 0.9)"
                    style={{
                      marginTop: "-2px",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    Centro de Documentación
                  </Text>
                </Box>
              </Flex>
            </Group>

            <Group>
              <Tooltip label="Notificaciones">
                <ActionIcon
                  variant="subtle"
                  color="white"
                  size="lg"
                  style={{
                    ...applyGlassmorphism(0.1),
                    transition: "all 0.2s ease",
                  }}
                >
                  <IconBell size={20} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Configuración">
                <ActionIcon
                  variant="subtle"
                  color="white"
                  size="lg"
                  style={{
                    ...applyGlassmorphism(0.1),
                    transition: "all 0.2s ease",
                  }}
                >
                  <IconSettings size={20} />
                </ActionIcon>
              </Tooltip>

              <Text
                c="white"
                size="sm"
                style={{
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                {currentUser?.email}
              </Text>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Stack gap="xs">
            <Title order={4} mb="md" c="#1c1917">
              Navegación
            </Title>
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "filled" : "subtle"}
                justify="flex-start"
                onClick={item.onClick}
                fullWidth
                style={{
                  backgroundColor: item.active ? "#38b2ac" : "transparent",
                  color: item.active ? "white" : "#44403c",
                  "&:hover": {
                    backgroundColor: item.active ? "#319795" : "#f5f5f4",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <Box mt="auto">
              <Button
                leftSection={<IconLogout size={16} />}
                onClick={handleLogout}
                variant="light"
                color="red"
                fullWidth
                style={{
                  "&:hover": {
                    backgroundColor: "#fef2f2",
                  },
                }}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
          <Stack gap="lg" style={{ position: "relative" }}>
            <LoadingOverlay visible={loading} />

            <div>
              <Title order={1} mb="xs" c="#1c1917">
                Centro de Documentación
              </Title>
              <Text c="#78716c" size="lg">
                Accede a todos los documentos y manuales de la empresa
              </Text>
            </div>

            <Group justify="space-between" align="center">
              <TextInput
                placeholder="Buscar documentos..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                style={{ flex: 1, maxWidth: "400px" }}
              />
              <Group>
                <Button variant="light" leftSection={<IconFilter size={16} />}>
                  Filtros
                </Button>
              </Group>
            </Group>

            <DocumentCategories
              categories={filteredCategories}
              onViewDocument={handleViewDocument}
            />
          </Stack>
        </AppShell.Main>
      </AppShell>

      {/* PDF Viewer Modal */}
      {selectedDocument && (
        <PdfViewer
          url={selectedDocument.pdfUrl}
          title={selectedDocument.title}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
};
