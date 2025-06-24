import "./globals.css";

// Estilos compartidos
import "./shared/utilities.css";
import "./shared/components.css";
import "./features/documentation.css";
// Estilos por features
import "./features/auth.css";
import "./features/chat.css";
import "./features/message-bubble.css";
import "./features/message-input.css";
import "./features/chat-sidebar.css";
import "./features/dashboard.css";
import { COLORS, GRADIENTS } from "./colors";
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  colorsCSSVariables,
} from "./tokens/colors";
import { TYPOGRAPHY, typographyCSSVariables } from "./tokens/typography";
import {
  SPACING,
  SEMANTIC_SPACING,
  BORDER_RADIUS,
  spacingCSSVariables,
} from "./tokens/spacing";
import {
  SHADOWS,
  ANIMATIONS,
  EFFECTS,
  effectsCSSVariables,
} from "./tokens/effects";

// =============================================================================
// EXPORTACIÓN DE TOKENS DE DISEÑO
// =============================================================================

// Tokens principales
export * from "./tokens/colors";
export * from "./tokens/typography";
export * from "./tokens/spacing";
export * from "./tokens/effects";

// Re-exportar todo desde colors.ts para mantener compatibilidad
export {
  COLORS,
  BRAND_COLORS,
  SEMANTIC_COLORS,
  colorsCSSVariables,
} from "./tokens/colors";

export { TYPOGRAPHY, typographyCSSVariables } from "./tokens/typography";

export {
  SPACING,
  SEMANTIC_SPACING,
  BORDER_RADIUS,
  spacingCSSVariables,
} from "./tokens/spacing";

export {
  GRADIENTS,
  SHADOWS,
  ANIMATIONS,
  EFFECTS,
  effectsCSSVariables,
} from "./tokens/effects";

// =============================================================================
// UTILIDADES PARA APLICAR ESTILOS
// =============================================================================

/**
 * Aplica estilos de texto con gradiente
 */
export const applyGradientText = (gradient: string) => ({
  background: gradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
});

/**
 * Aplica efecto glassmorphism
 */
export const applyGlassmorphism = (opacity: number = 0.2) => ({
  backgroundColor: `rgba(255, 255, 255, ${opacity})`,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

/**
 * Aplica efecto hover para botones
 */
export const applyButtonHover = (shadowColor: string) => ({
  "&:hover": {
    boxShadow: shadowColor,
    transform: "translateY(-1px)",
  },
});

/**
 * Aplica transición estándar
 */
export const applyTransition = (properties: string[] = ["all"]) => ({
  transition: properties
    .map((prop) => `${prop} var(--duration-normal) var(--easing-ease-in-out)`)
    .join(", "),
});

/**
 * Aplica sombra con color personalizado
 */
export const applyColoredShadow = (color: string, opacity: number = 0.3) => ({
  boxShadow: `0 10px 30px ${color
    .replace("rgb", "rgba")
    .replace(")", `, ${opacity})`)}`,
});

// =============================================================================
// CONSTANTES DE UTILIDAD
// =============================================================================

/**
 * Breakpoints para responsive design
 */
export const BREAKPOINTS = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
  toast: 1070,
} as const;

/**
 * Configuraciones de componentes específicos
 */
export const COMPONENT_CONFIG = {
  // Para MessageBubble
  messageBubble: {
    user: {
      borderColor: "var(--color-secondary-400)",
      gradient: "var(--gradient-secondary)",
      textColor: "var(--color-neutral-900)",
      accentColor: "var(--color-secondary-400)",
    },
    assistant: {
      borderColor: "var(--color-primary-400)",
      gradient: "var(--gradient-primary)",
      textColor: "var(--color-neutral-800)",
      accentColor: "var(--color-primary-400)",
    },
  },

  // Para headers
  header: {
    background: "var(--gradient-hero)",
    shadow: "var(--shadow-primary)",
    glassmorphism: "var(--glass-medium-bg)",
    glassBorder: "var(--glass-medium-border)",
  },

  // Para botones
  button: {
    primary: {
      background: "var(--gradient-primary)",
      shadow: "var(--shadow-primary)",
      hover: "var(--shadow-primary-hover)",
    },
    secondary: {
      background: "var(--gradient-secondary)",
      shadow: "var(--shadow-secondary)",
      hover: "var(--shadow-secondary-hover)",
    },
    accent: {
      background: "var(--gradient-accent)",
      shadow: "var(--shadow-accent)",
      hover: "var(--shadow-accent-hover)",
    },
  },

  // Para inputs
  input: {
    border: "var(--color-border-primary)",
    focus: {
      border: "var(--color-primary-400)",
      shadow: "0 0 0 3px rgba(56, 178, 172, 0.1)",
    },
    disabled: {
      background: "var(--color-bg-disabled)",
      color: "var(--color-text-disabled)",
      border: "var(--color-border-disabled)",
    },
    placeholder: "var(--color-text-tertiary)",
  },
} as const;

// =============================================================================
// FUNCIONES HELPER
// =============================================================================

/**
 * Convierte un color a formato rgba con opacidad
 */
export const addOpacity = (color: string, opacity: number): string => {
  // Si ya es rgba, reemplazar la opacidad
  if (color.startsWith("rgba")) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }

  // Si es rgb, convertir a rgba
  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  // Si es hex, convertir a rgba
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return color;
};

/**
 * Genera clases CSS para responsive design
 */
export const generateResponsiveClasses = (
  property: string,
  values: Record<string, string>
): Record<string, any> => {
  const classes: Record<string, any> = {};

  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === "base") {
      classes[property] = value;
    } else {
      classes[
        `@media (min-width: ${
          BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS]
        })`
      ] = {
        [property]: value,
      };
    }
  });

  return classes;
};

/**
 * Crea una paleta de colores con opacidades
 */
export const createColorPalette = (baseColor: string) => ({
  5: addOpacity(baseColor, 0.05),
  10: addOpacity(baseColor, 0.1),
  20: addOpacity(baseColor, 0.2),
  30: addOpacity(baseColor, 0.3),
  40: addOpacity(baseColor, 0.4),
  50: addOpacity(baseColor, 0.5),
  60: addOpacity(baseColor, 0.6),
  70: addOpacity(baseColor, 0.7),
  80: addOpacity(baseColor, 0.8),
  90: addOpacity(baseColor, 0.9),
  100: baseColor,
});

// =============================================================================
// EXPORTACIÓN POR DEFECTO
// =============================================================================

export default {
  COLORS,
  BRAND_COLORS,
  SEMANTIC_COLORS,
  TYPOGRAPHY,
  SPACING,
  SEMANTIC_SPACING,
  BORDER_RADIUS,
  GRADIENTS,
  SHADOWS,
  ANIMATIONS,
  EFFECTS,
  BREAKPOINTS,
  Z_INDEX,
  COMPONENT_CONFIG,

  // Utilidades
  applyGradientText,
  applyGlassmorphism,
  applyButtonHover,
  applyTransition,
  applyColoredShadow,
  addOpacity,
  generateResponsiveClasses,
  createColorPalette,
};
