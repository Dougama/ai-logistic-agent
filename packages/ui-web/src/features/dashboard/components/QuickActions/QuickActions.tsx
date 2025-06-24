import React from "react";
import { Paper, Title, SimpleGrid, Button, Stack, Text } from "@mantine/core";
import {
  IconMessageCircle,
  IconTruck,
  IconPackage,
  IconMapPin,
  IconFileText,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Chat con Tracko",
      description: "Consulta con el asistente IA",
      icon: <IconMessageCircle size={20} />,
      color: "blue",
      onClick: () => navigate("/chat"),
    },
    {
      title: "Documentación",
      description: "Acceder a manuales y guías",
      icon: <IconFileText size={20} />,
      color: "green",
      onClick: () => navigate("/documentation"),
    },
    {
      title: "Rastrear Paquete",
      description: "Seguimiento de entregas",
      icon: <IconPackage size={20} />,
      color: "orange",
      onClick: () => console.log("Rastrear"),
    },
    {
      title: "Ver Rutas",
      description: "Optimizar recorridos",
      icon: <IconMapPin size={20} />,
      color: "violet",
      onClick: () => console.log("Rutas"),
    },
    {
      title: "Reportes",
      description: "Análisis y estadísticas",
      icon: <IconFileText size={20} />,
      color: "cyan",
      onClick: () => console.log("Reportes"),
    },
    {
      title: "Gestionar Equipos",
      description: "Administrar personal",
      icon: <IconUsers size={20} />,
      color: "teal",
      onClick: () => console.log("Equipos"),
    },
  ];

  return (
    <Paper p="md" radius="md" withBorder>
      <Title order={3} mb="md">
        Acciones Rápidas
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="sm">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="light"
            color={action.color}
            size="lg"
            leftSection={action.icon}
            onClick={action.onClick}
            style={{
              height: "auto",
              padding: "16px",
              justifyContent: "flex-start",
            }}
          >
            <Stack gap={2} align="flex-start">
              <Text fw={600} size="sm">
                {action.title}
              </Text>
              <Text size="xs" c="dimmed">
                {action.description}
              </Text>
            </Stack>
          </Button>
        ))}
      </SimpleGrid>
    </Paper>
  );
};
