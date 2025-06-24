// packages/ui-web/src/app/AppProviders.tsx (ACTUALIZADO)

import React from "react";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "../shared/services/auth/AuthContext";
import { logisticsTheme } from "../styles/theme";

// Importar todos los estilos desde el punto de entrada
import "../styles";

// Importar estilos de Mantine
import "@mantine/core/styles.css";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <MantineProvider theme={logisticsTheme} defaultColorScheme="light">
      <AuthProvider>{children}</AuthProvider>
    </MantineProvider>
  );
};
