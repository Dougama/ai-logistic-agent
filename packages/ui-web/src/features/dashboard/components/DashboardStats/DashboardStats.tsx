import React from "react";
import { SimpleGrid, Paper, Text, Group, ActionIcon } from "@mantine/core";
import {
  IconTruck,
  IconPackage,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Paper p="md" radius="md" withBorder>
    <Group justify="apart">
      <div>
        <Text c="dimmed" size="sm" fw={500} tt="uppercase">
          {title}
        </Text>
        <Text fw={700} size="xl">
          {value}
        </Text>
      </div>
      <ActionIcon color={color} variant="light" radius="md" size={50}>
        {icon}
      </ActionIcon>
    </Group>
  </Paper>
);

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: "Envíos Activos",
      value: "156",
      icon: <IconTruck size={24} />,
      color: "blue",
    },
    {
      title: "Paquetes Entregados",
      value: "2,847",
      icon: <IconPackage size={24} />,
      color: "green",
    },
    {
      title: "Tiempo Promedio",
      value: "2.4h",
      icon: <IconClock size={24} />,
      color: "orange",
    },
    {
      title: "Clientes Activos",
      value: "89",
      icon: <IconUsers size={24} />,
      color: "violet",
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </SimpleGrid>
  );
};
