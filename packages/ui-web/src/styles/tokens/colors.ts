// packages/ui-web/src/styles/tokens/colors.ts (NUEVA PALETA)

// 🎨 PALETA INSPIRADA EN TU SELECCIÓN
export const COLORS = {
  // 🟢 PRIMARY: Basado en #1C0394 (azul profundo de tu imagen)
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#1c0394", // ← Tu color de referencia
    500: "#1e3a8a",
    600: "#1d4ed8",
    700: "#1e40af",
    800: "#1e3a8a",
    900: "#1e3a8a",
  },

  // 🟡 SECONDARY: Verde azulado (#1C0394 complementario)
  secondary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#10b981", // Verde complementario
    500: "#059669",
    600: "#047857",
    700: "#065f46",
    800: "#064e3b",
    900: "#022c22",
  },

  // 🔶 ACCENT: Naranja cálido (#A52502 de tu imagen)
  accent: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#A52502", // ← Tu color naranja de referencia
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // ⚫ NEUTRAL: Basado en #000B0D (tu color favorito)
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#000B0D", // ← Tu color negro azulado favorito
  },

  // 🟤 WARM: Marrón cálido (#390D02 de tu imagen)
  warm: {
    50: "#fefbf3",
    100: "#fef7e7",
    200: "#fdecc4",
    300: "#fbdc95",
    400: "#f7c455",
    500: "#f4b942",
    600: "#390D02", // ← Tu color marrón de referencia
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Estados (adaptados a la nueva paleta)
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // Verde más vibrante
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // Amarillo cálido
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
    500: "#ef4444", // Rojo consistente
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
    500: "#3b82f6", // Azul información
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
} as const;

// 🎨 PALETA SIMPLIFICADA PARA USO RÁPIDO
export const BRAND_COLORS = {
  // Principales (basados en tu imagen)
  primary: "#1c0394", // Azul profundo
  secondary: "#10b981", // Verde complementario
  accent: "#A52502", // Naranja cálido
  warm: "#390D02", // Marrón rico

  // Neutros (con tu favorito)
  dark: "#000B0D", // ← Tu color negro azulado favorito
  gray: "#737373", // Gris medio
  light: "#fafafa", // Blanco cálido
  white: "#ffffff",
  black: "#000000",

  // Estados
  success: "#22c55e", // Verde
  warning: "#f59e0b", // Amarillo
  error: "#ef4444", // Rojo
  info: "#3b82f6", // Azul
} as const;

// 🎨 COLORES SEMÁNTICOS ACTUALIZADOS
export const SEMANTIC_COLORS = {
  // Texto (usando tu negro azulado)
  text: {
    primary: COLORS.neutral[900], // #000B0D - tu favorito
    secondary: COLORS.neutral[700], // #404040
    tertiary: COLORS.neutral[500], // #737373
    inverse: COLORS.neutral[50], // #fafafa
    disabled: COLORS.neutral[400], // #a3a3a3
  },

  // Backgrounds
  background: {
    primary: COLORS.neutral[50], // #fafafa
    secondary: COLORS.neutral[100], // #f5f5f5
    tertiary: COLORS.neutral[200], // #e5e5e5
    inverse: COLORS.neutral[900], // #000B0D - tu favorito
    disabled: COLORS.neutral[100], // #f5f5f5
  },

  // Borders
  border: {
    primary: COLORS.neutral[200], // #e5e5e5
    secondary: COLORS.neutral[300], // #d4d4d4
    tertiary: COLORS.neutral[400], // #a3a3a3
    inverse: COLORS.neutral[700], // #404040
    disabled: COLORS.neutral[200], // #e5e5e5
  },

  // Estados interactivos (con tus colores)
  interactive: {
    primary: COLORS.primary[400], // #1c0394
    primaryHover: COLORS.primary[500], // Más oscuro
    primaryActive: COLORS.primary[600], // Aún más oscuro
    secondary: COLORS.secondary[400], // #10b981
    secondaryHover: COLORS.secondary[500], // Más oscuro
    secondaryActive: COLORS.secondary[600], // Aún más oscuro
  },
} as const;

// 🎨 VARIABLES CSS ACTUALIZADAS
export const colorsCSSVariables = {
  // Colores principales (tu nueva paleta)
  "--color-primary-50": COLORS.primary[50],
  "--color-primary-100": COLORS.primary[100],
  "--color-primary-200": COLORS.primary[200],
  "--color-primary-300": COLORS.primary[300],
  "--color-primary-400": COLORS.primary[400], // #1c0394
  "--color-primary-500": COLORS.primary[500],
  "--color-primary-600": COLORS.primary[600],
  "--color-primary-700": COLORS.primary[700],
  "--color-primary-800": COLORS.primary[800],
  "--color-primary-900": COLORS.primary[900],

  "--color-secondary-50": COLORS.secondary[50],
  "--color-secondary-100": COLORS.secondary[100],
  "--color-secondary-200": COLORS.secondary[200],
  "--color-secondary-300": COLORS.secondary[300],
  "--color-secondary-400": COLORS.secondary[400], // #10b981
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
  "--color-accent-500": COLORS.accent[500], // #A52502
  "--color-accent-600": COLORS.accent[600],
  "--color-accent-700": COLORS.accent[700],
  "--color-accent-800": COLORS.accent[800],
  "--color-accent-900": COLORS.accent[900],

  // Neutros (con tu #000B0D favorito)
  "--color-neutral-50": COLORS.neutral[50],
  "--color-neutral-100": COLORS.neutral[100],
  "--color-neutral-200": COLORS.neutral[200],
  "--color-neutral-300": COLORS.neutral[300],
  "--color-neutral-400": COLORS.neutral[400],
  "--color-neutral-500": COLORS.neutral[500],
  "--color-neutral-600": COLORS.neutral[600],
  "--color-neutral-700": COLORS.neutral[700],
  "--color-neutral-800": COLORS.neutral[800],
  "--color-neutral-900": COLORS.neutral[900], // #000B0D ← tu favorito

  // Cálidos (marrón de tu imagen)
  "--color-warm-50": COLORS.warm[50],
  "--color-warm-100": COLORS.warm[100],
  "--color-warm-200": COLORS.warm[200],
  "--color-warm-300": COLORS.warm[300],
  "--color-warm-400": COLORS.warm[400],
  "--color-warm-500": COLORS.warm[500],
  "--color-warm-600": COLORS.warm[600], // #390D02
  "--color-warm-700": COLORS.warm[700],
  "--color-warm-800": COLORS.warm[800],
  "--color-warm-900": COLORS.warm[900],

  // Estados
  "--color-success": COLORS.success[500],
  "--color-warning": COLORS.warning[500],
  "--color-error": COLORS.error[500],
  "--color-info": COLORS.info[500],

  // Semánticos (usando tu paleta)
  "--color-text-primary": SEMANTIC_COLORS.text.primary, // #000B0D
  "--color-text-secondary": SEMANTIC_COLORS.text.secondary,
  "--color-text-tertiary": SEMANTIC_COLORS.text.tertiary,
  "--color-text-inverse": SEMANTIC_COLORS.text.inverse,
  "--color-text-disabled": SEMANTIC_COLORS.text.disabled,

  "--color-bg-primary": SEMANTIC_COLORS.background.primary,
  "--color-bg-secondary": SEMANTIC_COLORS.background.secondary,
  "--color-bg-tertiary": SEMANTIC_COLORS.background.tertiary,
  "--color-bg-inverse": SEMANTIC_COLORS.background.inverse, // #000B0D
  "--color-bg-disabled": SEMANTIC_COLORS.background.disabled,

  "--color-border-primary": SEMANTIC_COLORS.border.primary,
  "--color-border-secondary": SEMANTIC_COLORS.border.secondary,
  "--color-border-tertiary": SEMANTIC_COLORS.border.tertiary,
  "--color-border-inverse": SEMANTIC_COLORS.border.inverse,
  "--color-border-disabled": SEMANTIC_COLORS.border.disabled,

  // Interactivos (con tus colores principales)
  "--color-interactive-primary": SEMANTIC_COLORS.interactive.primary, // #1c0394
  "--color-interactive-primary-hover": SEMANTIC_COLORS.interactive.primaryHover,
  "--color-interactive-primary-active":
    SEMANTIC_COLORS.interactive.primaryActive,
  "--color-interactive-secondary": SEMANTIC_COLORS.interactive.secondary, // #10b981
  "--color-interactive-secondary-hover":
    SEMANTIC_COLORS.interactive.secondaryHover,
  "--color-interactive-secondary-active":
    SEMANTIC_COLORS.interactive.secondaryActive,

  // Brand colors (acceso rápido)
  "--color-brand-primary": BRAND_COLORS.primary, // #1c0394
  "--color-brand-secondary": BRAND_COLORS.secondary, // #10b981
  "--color-brand-accent": BRAND_COLORS.accent, // #A52502
  "--color-brand-warm": BRAND_COLORS.warm, // #390D02
  "--color-brand-dark": BRAND_COLORS.dark, // #000B0D ← tu favorito
  "--color-brand-white": BRAND_COLORS.white,
  "--color-brand-black": BRAND_COLORS.black,
} as const;
