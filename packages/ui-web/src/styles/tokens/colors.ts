export const COLORS = {
  // Colores principales
  primary: {
    50: "#e6fffa",
    100: "#b2f5ea",
    200: "#81e6d9",
    300: "#4fd1c7",
    400: "#38b2ac", // Principal
    500: "#319795",
    600: "#2c7a7b",
    700: "#285e61",
    800: "#234e52",
    900: "#1d4044",
  },

  // Azul secundario
  secondary: {
    50: "#e6f3ff",
    100: "#bae6fd",
    200: "#7dd3fc",
    300: "#38bdf8",
    400: "#0ea5e9", // Principal
    500: "#0284c7",
    600: "#0369a1",
    700: "#075985",
    800: "#0c4a6e",
    900: "#082f49",
  },

  // Naranja de acento
  accent: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316", // Principal
    600: "#ea580c",
    700: "#dc2626",
    800: "#b91c1c",
    900: "#991b1b",
  },

  // Grises neutros
  neutral: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c", // Principal
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },

  // Estados
  success: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981", // Principal
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // Principal
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Principal
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Principal
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
} as const;

// Paleta simplificada para referencia rápida
export const BRAND_COLORS = {
  // Principales
  primary: COLORS.primary[400], // #38b2ac
  secondary: COLORS.secondary[400], // #0ea5e9
  accent: COLORS.accent[500], // #f97316

  // Neutros
  dark: COLORS.neutral[900], // #1c1917
  gray: COLORS.neutral[500], // #78716c
  light: COLORS.neutral[50], // #fafaf9
  white: "#ffffff",
  black: "#000000",

  // Estados
  success: COLORS.success[500], // #10b981
  warning: COLORS.warning[500], // #f59e0b
  error: COLORS.error[500], // #ef4444
  info: COLORS.info[500], // #3b82f6
} as const;

// Colores semánticos
export const SEMANTIC_COLORS = {
  // Texto
  text: {
    primary: COLORS.neutral[900],
    secondary: COLORS.neutral[700],
    tertiary: COLORS.neutral[500],
    inverse: COLORS.neutral[50],
    disabled: COLORS.neutral[400],
  },

  // Backgrounds
  background: {
    primary: COLORS.neutral[50],
    secondary: COLORS.neutral[100],
    tertiary: COLORS.neutral[200],
    inverse: COLORS.neutral[900],
    disabled: COLORS.neutral[100],
  },

  // Borders
  border: {
    primary: COLORS.neutral[200],
    secondary: COLORS.neutral[300],
    tertiary: COLORS.neutral[400],
    inverse: COLORS.neutral[700],
    disabled: COLORS.neutral[200],
  },

  // Estados interactivos
  interactive: {
    primary: COLORS.primary[400],
    primaryHover: COLORS.primary[500],
    primaryActive: COLORS.primary[600],
    secondary: COLORS.secondary[400],
    secondaryHover: COLORS.secondary[500],
    secondaryActive: COLORS.secondary[600],
  },
} as const;

// CSS Custom Properties
export const colorsCSSVariables = {
  // Colores principales
  "--color-primary-50": COLORS.primary[50],
  "--color-primary-100": COLORS.primary[100],
  "--color-primary-200": COLORS.primary[200],
  "--color-primary-300": COLORS.primary[300],
  "--color-primary-400": COLORS.primary[400],
  "--color-primary-500": COLORS.primary[500],
  "--color-primary-600": COLORS.primary[600],
  "--color-primary-700": COLORS.primary[700],
  "--color-primary-800": COLORS.primary[800],
  "--color-primary-900": COLORS.primary[900],

  "--color-secondary-50": COLORS.secondary[50],
  "--color-secondary-100": COLORS.secondary[100],
  "--color-secondary-200": COLORS.secondary[200],
  "--color-secondary-300": COLORS.secondary[300],
  "--color-secondary-400": COLORS.secondary[400],
  "--color-secondary-500": COLORS.secondary[500],
  "--color-secondary-600": COLORS.secondary[600],
  "--color-secondary-700": COLORS.secondary[700],
  "--color-secondary-800": COLORS.secondary[800],
  "--color-secondary-900": COLORS.secondary[900],

  "--color-accent-50": COLORS.accent[50],
  "--color-accent-100": COLORS.accent[100],
  "--color-accent-200": COLORS.accent[200],
  "--color-accent-300": COLORS.accent[300],
  "--color-accent-400": COLORS.accent[400],
  "--color-accent-500": COLORS.accent[500],
  "--color-accent-600": COLORS.accent[600],
  "--color-accent-700": COLORS.accent[700],
  "--color-accent-800": COLORS.accent[800],
  "--color-accent-900": COLORS.accent[900],

  "--color-neutral-50": COLORS.neutral[50],
  "--color-neutral-100": COLORS.neutral[100],
  "--color-neutral-200": COLORS.neutral[200],
  "--color-neutral-300": COLORS.neutral[300],
  "--color-neutral-400": COLORS.neutral[400],
  "--color-neutral-500": COLORS.neutral[500],
  "--color-neutral-600": COLORS.neutral[600],
  "--color-neutral-700": COLORS.neutral[700],
  "--color-neutral-800": COLORS.neutral[800],
  "--color-neutral-900": COLORS.neutral[900],

  // Estados
  "--color-success": COLORS.success[500],
  "--color-warning": COLORS.warning[500],
  "--color-error": COLORS.error[500],
  "--color-info": COLORS.info[500],

  // Semánticos
  "--color-text-primary": SEMANTIC_COLORS.text.primary,
  "--color-text-secondary": SEMANTIC_COLORS.text.secondary,
  "--color-text-tertiary": SEMANTIC_COLORS.text.tertiary,
  "--color-text-inverse": SEMANTIC_COLORS.text.inverse,
  "--color-text-disabled": SEMANTIC_COLORS.text.disabled,

  "--color-bg-primary": SEMANTIC_COLORS.background.primary,
  "--color-bg-secondary": SEMANTIC_COLORS.background.secondary,
  "--color-bg-tertiary": SEMANTIC_COLORS.background.tertiary,
  "--color-bg-inverse": SEMANTIC_COLORS.background.inverse,
  "--color-bg-disabled": SEMANTIC_COLORS.background.disabled,

  "--color-border-primary": SEMANTIC_COLORS.border.primary,
  "--color-border-secondary": SEMANTIC_COLORS.border.secondary,
  "--color-border-tertiary": SEMANTIC_COLORS.border.tertiary,
  "--color-border-inverse": SEMANTIC_COLORS.border.inverse,
  "--color-border-disabled": SEMANTIC_COLORS.border.disabled,

  // Interactivos
  "--color-interactive-primary": SEMANTIC_COLORS.interactive.primary,
  "--color-interactive-primary-hover": SEMANTIC_COLORS.interactive.primaryHover,
  "--color-interactive-primary-active":
    SEMANTIC_COLORS.interactive.primaryActive,
  "--color-interactive-secondary": SEMANTIC_COLORS.interactive.secondary,
  "--color-interactive-secondary-hover":
    SEMANTIC_COLORS.interactive.secondaryHover,
  "--color-interactive-secondary-active":
    SEMANTIC_COLORS.interactive.secondaryActive,

  // Brand colors
  "--color-brand-primary": BRAND_COLORS.primary,
  "--color-brand-secondary": BRAND_COLORS.secondary,
  "--color-brand-accent": BRAND_COLORS.accent,
  "--color-brand-white": BRAND_COLORS.white,
  "--color-brand-black": BRAND_COLORS.black,
} as const;
