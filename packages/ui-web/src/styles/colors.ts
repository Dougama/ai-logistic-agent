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
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

// Gradientes predefinidos
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[500]} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary[400]} 0%, ${COLORS.secondary[500]} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.accent[500]} 0%, ${COLORS.accent[600]} 100%)`,
  hero: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.secondary[400]} 50%, ${COLORS.primary[500]} 100%)`,
  dark: `linear-gradient(135deg, ${COLORS.neutral[900]} 0%, ${COLORS.neutral[800]} 100%)`,
  light: `linear-gradient(180deg, ${COLORS.neutral[50]} 0%, ${COLORS.neutral[100]} 100%)`,
} as const;

// Sombras personalizadas
export const SHADOWS = {
  sm: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 15px rgba(0, 0, 0, 0.08)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.08), 0 20px 25px rgba(0, 0, 0, 0.10)",
  xl: "0 25px 50px rgba(0, 0, 0, 0.15)",
  colored: {
    primary: `0 10px 30px rgba(56, 178, 172, 0.3)`,
    secondary: `0 10px 30px rgba(14, 165, 233, 0.3)`,
    accent: `0 10px 30px rgba(249, 115, 22, 0.3)`,
  },
} as const;

// Configuraciones de componentes específicos
export const COMPONENT_STYLES = {
  // Para MessageBubble
  messageBubble: {
    user: {
      borderColor: COLORS.secondary[400],
      gradient: GRADIENTS.secondary,
      textColor: COLORS.neutral[900],
      accentColor: COLORS.secondary[400],
    },
    assistant: {
      borderColor: COLORS.primary[400],
      gradient: GRADIENTS.primary,
      textColor: COLORS.neutral[800],
      accentColor: COLORS.primary[400],
    },
  },

  // Para headers
  header: {
    background: GRADIENTS.hero,
    shadow: SHADOWS.colored.primary,
    glassmorphism: "rgba(255, 255, 255, 0.2)",
    glassBorder: "rgba(255, 255, 255, 0.3)",
  },

  // Para botones
  button: {
    primary: {
      background: GRADIENTS.primary,
      shadow: SHADOWS.colored.primary,
      hover: "0 6px 20px rgba(56, 178, 172, 0.4)",
    },
    secondary: {
      background: GRADIENTS.secondary,
      shadow: SHADOWS.colored.secondary,
      hover: "0 6px 20px rgba(14, 165, 233, 0.4)",
    },
    accent: {
      background: GRADIENTS.accent,
      shadow: SHADOWS.colored.accent,
      hover: "0 6px 20px rgba(249, 115, 22, 0.4)",
    },
  },

  // Para inputs
  input: {
    border: COLORS.neutral[200],
    focus: {
      border: COLORS.primary[400],
      shadow: `0 0 0 3px rgba(56, 178, 172, 0.1)`,
    },
    disabled: {
      background: COLORS.neutral[100],
      color: COLORS.neutral[400],
      border: COLORS.neutral[300],
    },
    placeholder: COLORS.neutral[400],
  },

  // Para código y pre
  code: {
    background: COLORS.neutral[900],
    color: COLORS.neutral[50],
    border: COLORS.neutral[700],
    inlineUser: {
      background: "#eff6ff",
      color: "#1e40af",
      border: "#dbeafe",
    },
    inlineAssistant: {
      background: "#ecfdf5",
      color: "#166534",
      border: "#dcfce7",
    },
  },

  // Para blockquotes
  blockquote: {
    user: {
      border: COLORS.secondary[200],
      background: "#f0f9ff",
    },
    assistant: {
      border: COLORS.primary[200],
      background: "#f0fdfa",
    },
  },

  // Para sugerencias
  suggestions: {
    background: `rgba(56, 178, 172, 0.1)`,
    border: `rgba(56, 178, 172, 0.2)`,
    hover: `rgba(56, 178, 172, 0.15)`,
    color: COLORS.primary[400],
  },
} as const;

// Utilidades para aplicar estilos
export const applyGradientText = (gradient: string) => ({
  background: gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const applyGlassmorphism = (opacity: number = 0.2) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

export const applyButtonHover = (shadowColor: string) => ({
  "&:hover": {
    boxShadow: shadowColor,
    transform: "translateY(-1px)",
  },
});

// Paleta completa para referencia rápida
export const BRAND_PALETTE = {
  // Principales
  teal: COLORS.primary[400], // #38b2ac
  blue: COLORS.secondary[400], // #0ea5e9
  orange: COLORS.accent[500], // #f97316

  // Neutros
  dark: COLORS.neutral[900], // #1c1917
  gray: COLORS.neutral[500], // #78716c
  light: COLORS.neutral[50], // #fafaf9

  // Estados
  success: COLORS.success, // #10b981
  warning: COLORS.warning, // #f59e0b
  error: COLORS.error, // #ef4444
  info: COLORS.info, // #3b82f6
} as const;
