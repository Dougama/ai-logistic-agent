import { createTheme, MantineColorsTuple } from "@mantine/core";

const logisticsPrimary: MantineColorsTuple = [
  "#e3f2fd",
  "#bbdefb",
  "#90caf9",
  "#64b5f6",
  "#42a5f5",
  "#2196f3",
  "#1e88e5",
  "#1976d2",
  "#1565c0",
  "#0d47a1",
];

const logisticsSecondary: MantineColorsTuple = [
  "#f3e5f5",
  "#e1bee7",
  "#ce93d8",
  "#ba68c8",
  "#ab47bc",
  "#9c27b0",
  "#8e24aa",
  "#7b1fa2",
  "#6a1b9a",
  "#4a148c",
];

const logisticsAccent: MantineColorsTuple = [
  "#e8f5e8",
  "#c8e6c9",
  "#a5d6a7",
  "#81c784",
  "#66bb6a",
  "#4caf50",
  "#43a047",
  "#388e3c",
  "#2e7d32",
  "#1b5e20",
];

export const logisticsTheme = createTheme({
  primaryColor: "logisticsPrimary",
  colors: {
    logisticsPrimary,
    logisticsSecondary,
    logisticsAccent,
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
});
