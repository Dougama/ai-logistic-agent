// packages/ui-web/src/theme/logisticsTheme.ts
import { createTheme, MantineColorsTuple } from "@mantine/core";

// Paleta de colores para logística e IA - Inspirada en tecnología y eficiencia
const logisticsPrimary: MantineColorsTuple = [
  "#e3f2fd", // Azul muy claro
  "#bbdefb", // Azul claro
  "#90caf9", // Azul medio claro
  "#64b5f6", // Azul medio
  "#42a5f5", // Azul
  "#2196f3", // Azul principal
  "#1e88e5", // Azul medio oscuro
  "#1976d2", // Azul oscuro
  "#1565c0", // Azul muy oscuro
  "#0d47a1", // Azul navy
];

const logisticsSecondary: MantineColorsTuple = [
  "#f3e5f5", // Púrpura muy claro
  "#e1bee7", // Púrpura claro
  "#ce93d8", // Púrpura medio claro
  "#ba68c8", // Púrpura medio
  "#ab47bc", // Púrpura
  "#9c27b0", // Púrpura principal
  "#8e24aa", // Púrpura medio oscuro
  "#7b1fa2", // Púrpura oscuro
  "#6a1b9a", // Púrpura muy oscuro
  "#4a148c", // Púrpura navy
];

const logisticsAccent: MantineColorsTuple = [
  "#e8f5e8", // Verde muy claro
  "#c8e6c9", // Verde claro
  "#a5d6a7", // Verde medio claro
  "#81c784", // Verde medio
  "#66bb6a", // Verde
  "#4caf50", // Verde principal
  "#43a047", // Verde medio oscuro
  "#388e3c", // Verde oscuro
  "#2e7d32", // Verde muy oscuro
  "#1b5e20", // Verde navy
];

const logisticsWarning: MantineColorsTuple = [
  "#fff8e1", // Ámbar muy claro
  "#ffecb3", // Ámbar claro
  "#ffe082", // Ámbar medio claro
  "#ffd54f", // Ámbar medio
  "#ffca28", // Ámbar
  "#ffc107", // Ámbar principal
  "#ffb300", // Ámbar medio oscuro
  "#ffa000", // Ámbar oscuro
  "#ff8f00", // Ámbar muy oscuro
  "#ff6f00", // Ámbar intenso
];

export const logisticsTheme = createTheme({
  primaryColor: "logisticsPrimary",
  colors: {
    logisticsPrimary,
    logisticsSecondary,
    logisticsAccent,
    logisticsWarning,
  },
  fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    fontWeight: "600",
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.05), 0 20px 25px rgba(0, 0, 0, 0.1)",
    xl: "0 25px 50px rgba(0, 0, 0, 0.15)",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: "md",
      },
    },
    AppShell: {
      styles: {
        header: {
          backgroundColor: "var(--mantine-color-logisticsPrimary-6)",
          borderBottom: "none",
          boxShadow: "0 2px 8px rgba(33, 150, 243, 0.15)",
        },
        navbar: {
          backgroundColor: "#fafbfc",
          borderRight: "1px solid #e9ecef",
        },
        main: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});
