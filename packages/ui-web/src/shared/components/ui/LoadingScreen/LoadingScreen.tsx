import React from "react";
import { Box, Loader, Text, Stack } from "@mantine/core";
import { IconRobot } from "@tabler/icons-react";

export const LoadingScreen: React.FC = () => {
  return (
    <Box
      h="100vh"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Stack align="center" gap="md">
        <Box
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            padding: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <IconRobot size={48} color="white" />
        </Box>
        <Loader color="white" size="lg" />
        <Text c="white" size="lg" fw={600}>
          Cargando Tracko...
        </Text>
      </Stack>
    </Box>
  );
};
