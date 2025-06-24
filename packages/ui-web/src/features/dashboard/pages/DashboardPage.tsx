import React from "react";
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconRobot,
  IconLogout,
  IconBell,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../shared/services/auth/firebase";
import { useAuth } from "../../../shared/services/auth";
import { DashboardStats } from "../components/DashboardStats";
import { QuickActions } from "../components/QuickActions";

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const sidebarItems = [
    { label: "Dashboard", active: true, onClick: () => navigate("/dashboard") },
    { label: "Chat con Tracko", onClick: () => navigate("/chat") },
    { label: "Envíos", onClick: () => console.log("Envíos") },
    { label: "Rutas", onClick: () => console.log("Rutas") },
    { label: "Reportes", onClick: () => console.log("Reportes") },
    { label: "Configuración", onClick: () => console.log("Configuración") },
  ];

  return (
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderBottom: "none",
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
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "12px",
                  padding: "8px",
                  backdropFilter: "blur(10px)",
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
                  }}
                >
                  Tracko Logistics
                </Title>
                <Text
                  size="sm"
                  c="rgba(255, 255, 255, 0.8)"
                  style={{ marginTop: "-2px" }}
                >
                  Dashboard Principal
                </Text>
              </Box>
            </Flex>
          </Group>

          <Group>
            <Tooltip label="Notificaciones">
              <ActionIcon variant="subtle" color="white" size="lg">
                <IconBell size={20} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Configuración">
              <ActionIcon variant="subtle" color="white" size="lg">
                <IconSettings size={20} />
              </ActionIcon>
            </Tooltip>

            <Text c="white" size="sm">
              {currentUser?.email}
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <Title order={4} mb="md">
            Navegación
          </Title>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "filled" : "subtle"}
              justify="flex-start"
              onClick={item.onClick}
              fullWidth
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
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack gap="lg">
          <div>
            <Title order={1} mb="xs">
              ¡Bienvenido al Dashboard!
            </Title>
            <Text c="dimmed" size="lg">
              Gestiona tu operación logística desde aquí
            </Text>
          </div>

          <DashboardStats />
          <QuickActions />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
