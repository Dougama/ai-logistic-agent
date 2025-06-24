import React from "react";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "../shared/services/auth/AuthContext";
import { logisticsTheme } from "../styles/theme";
import "@mantine/core/styles.css";
import "../styles/globals.css";

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
