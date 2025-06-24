import { COLORS } from "./colors";

// Gradientes
export const GRADIENTS = {
  // Principales
  primary: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[500]} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary[400]} 0%, ${COLORS.secondary[500]} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.accent[500]} 0%, ${COLORS.accent[600]} 100%)`,

  // Especiales
  hero: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.secondary[400]} 50%, ${COLORS.primary[500]} 100%)`,
  dark: `linear-gradient(135deg, ${COLORS.neutral[900]} 0%, ${COLORS.neutral[800]} 100%)`,
  light: `linear-gradient(180deg, ${COLORS.neutral[50]} 0%, ${COLORS.neutral[100]} 100%)`,

  // Sutiles
  primarySubtle: `linear-gradient(135deg, ${COLORS.primary[100]} 0%, ${COLORS.primary[50]} 100%)`,
  secondarySubtle: `linear-gradient(135deg, ${COLORS.secondary[100]} 0%, ${COLORS.secondary[50]} 100%)`,
  accentSubtle: `linear-gradient(135deg, ${COLORS.accent[100]} 0%, ${COLORS.accent[50]} 100%)`,
} as const;

// Sombras
export const SHADOWS = {
  // Sombras básicas
  xs: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
  sm: "0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 15px rgba(0, 0, 0, 0.08)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.08), 0 20px 25px rgba(0, 0, 0, 0.10)",
  xl: "0 25px 50px rgba(0, 0, 0, 0.15)",
  "2xl": "0 35px 60px rgba(0, 0, 0, 0.20)",

  // Sombras de colores
  colored: {
    primary: "0 10px 30px rgba(56, 178, 172, 0.3)",
    primaryHover: "0 6px 20px rgba(56, 178, 172, 0.4)",
    secondary: "0 10px 30px rgba(14, 165, 233, 0.3)",
    secondaryHover: "0 6px 20px rgba(14, 165, 233, 0.4)",
    accent: "0 10px 30px rgba(249, 115, 22, 0.3)",
    accentHover: "0 6px 20px rgba(249, 115, 22, 0.4)",
  },

  // Sombras internas
  inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
  innerSm: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
} as const;

// Animaciones
export const ANIMATIONS = {
  // Duraciones
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },

  // Easing
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Transformaciones
  transforms: {
    scaleUp: "scale(1.05)",
    scaleDown: "scale(0.95)",
    slideUp: "translateY(-2px)",
    slideDown: "translateY(2px)",
    rotate: "rotate(180deg)",
  },
} as const;

// Efectos especiales
export const EFFECTS = {
  // Glassmorphism
  glassmorphism: {
    light: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    medium: {
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    strong: {
      background: "rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    },
  },

  // Overlays
  overlay: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.3)",
    dark: "rgba(0, 0, 0, 0.5)",
    darker: "rgba(0, 0, 0, 0.7)",
  },
} as const;

// CSS Custom Properties para effects
export const effectsCSSVariables = {
  // Gradientes
  "--gradient-primary": GRADIENTS.primary,
  "--gradient-secondary": GRADIENTS.secondary,
  "--gradient-accent": GRADIENTS.accent,
  "--gradient-hero": GRADIENTS.hero,
  "--gradient-dark": GRADIENTS.dark,
  "--gradient-light": GRADIENTS.light,

  // Sombras
  "--shadow-xs": SHADOWS.xs,
  "--shadow-sm": SHADOWS.sm,
  "--shadow-md": SHADOWS.md,
  "--shadow-lg": SHADOWS.lg,
  "--shadow-xl": SHADOWS.xl,
  "--shadow-2xl": SHADOWS["2xl"],
  "--shadow-inner": SHADOWS.inner,

  // Sombras de colores
  "--shadow-primary": SHADOWS.colored.primary,
  "--shadow-primary-hover": SHADOWS.colored.primaryHover,
  "--shadow-secondary": SHADOWS.colored.secondary,
  "--shadow-secondary-hover": SHADOWS.colored.secondaryHover,
  "--shadow-accent": SHADOWS.colored.accent,
  "--shadow-accent-hover": SHADOWS.colored.accentHover,

  // Animaciones
  "--duration-fast": ANIMATIONS.duration.fast,
  "--duration-normal": ANIMATIONS.duration.normal,
  "--duration-slow": ANIMATIONS.duration.slow,

  "--easing-linear": ANIMATIONS.easing.linear,
  "--easing-ease-in": ANIMATIONS.easing.easeIn,
  "--easing-ease-out": ANIMATIONS.easing.easeOut,
  "--easing-ease-in-out": ANIMATIONS.easing.easeInOut,
  "--easing-bounce": ANIMATIONS.easing.bounce,

  // Glassmorphism
  "--glass-light-bg": EFFECTS.glassmorphism.light.background,
  "--glass-light-backdrop": EFFECTS.glassmorphism.light.backdropFilter,
  "--glass-light-border": EFFECTS.glassmorphism.light.border,

  "--glass-medium-bg": EFFECTS.glassmorphism.medium.background,
  "--glass-medium-backdrop": EFFECTS.glassmorphism.medium.backdropFilter,
  "--glass-medium-border": EFFECTS.glassmorphism.medium.border,

  // Overlays
  "--overlay-light": EFFECTS.overlay.light,
  "--overlay-medium": EFFECTS.overlay.medium,
  "--overlay-dark": EFFECTS.overlay.dark,
  "--overlay-darker": EFFECTS.overlay.darker,
} as const;
