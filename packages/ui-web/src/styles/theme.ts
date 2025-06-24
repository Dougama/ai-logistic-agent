import { createTheme, MantineColorsTuple } from "@mantine/core";

// Paleta principal: Teal/Aqua moderno
const logisticsPrimary: MantineColorsTuple = [
  "#e6fffa", // muy claro
  "#b2f5ea", // claro
  "#81e6d9", // medio claro
  "#4fd1c7", // medio
  "#38b2ac", // base
  "#319795", // medio oscuro
  "#2c7a7b", // oscuro
  "#285e61", // muy oscuro
  "#234e52", // extra oscuro
  "#1d4044", // ultra oscuro
];

// Color secundario: Azul profundo/Navy
const logisticsSecondary: MantineColorsTuple = [
  "#e6f3ff", // muy claro
  "#bae6fd", // claro
  "#7dd3fc", // medio claro
  "#38bdf8", // medio
  "#0ea5e9", // base
  "#0284c7", // medio oscuro
  "#0369a1", // oscuro
  "#075985", // muy oscuro
  "#0c4a6e", // extra oscuro
  "#082f49", // ultra oscuro
];

// Color de acento: Naranja cálido
const logisticsAccent: MantineColorsTuple = [
  "#fff7ed", // muy claro
  "#ffedd5", // claro
  "#fed7aa", // medio claro
  "#fdba74", // medio
  "#fb923c", // base
  "#f97316", // medio oscuro
  "#ea580c", // oscuro
  "#dc2626", // muy oscuro
  "#b91c1c", // extra oscuro
  "#991b1b", // ultra oscuro
];

// Color neutro: Grises cálidos
const logisticsNeutral: MantineColorsTuple = [
  "#fafaf9", // muy claro
  "#f5f5f4", // claro
  "#e7e5e4", // medio claro
  "#d6d3d1", // medio
  "#a8a29e", // base
  "#78716c", // medio oscuro
  "#57534e", // oscuro
  "#44403c", // muy oscuro
  "#292524", // extra oscuro
  "#1c1917", // ultra oscuro
];

export const logisticsTheme = createTheme({
  primaryColor: "logisticsPrimary",
  colors: {
    logisticsPrimary,
    logisticsSecondary,
    logisticsAccent,
    logisticsNeutral,
  },
  fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
  headings: {
    fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    fontWeight: "700",
  },
  radius: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  shadows: {
    xs: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
    sm: "0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 15px rgba(0, 0, 0, 0.08)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.08), 0 20px 25px rgba(0, 0, 0, 0.10)",
    xl: "0 25px 50px rgba(0, 0, 0, 0.15)",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
      },
    },
  },
});

// Constantes de colores para usar en componentes
export const BRAND_COLORS = {
  primary: "#38b2ac", // Teal principal
  secondary: "#0ea5e9", // Azul
  accent: "#f97316", // Naranja
  success: "#10b981", // Verde
  warning: "#f59e0b", // Amarillo
  error: "#ef4444", // Rojo
  neutral: "#78716c", // Gris
  dark: "#1c1917", // Negro cálido
  light: "#fafaf9", // Blanco cálido
} as const;

// Gradientes predefinidos
export const BRAND_GRADIENTS = {
  primary: "linear-gradient(135deg, #38b2ac 0%, #319795 100%)",
  secondary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
  accent: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  hero: "linear-gradient(135deg, #38b2ac 0%, #0ea5e9 50%, #319795 100%)",
  dark: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
} as const;
