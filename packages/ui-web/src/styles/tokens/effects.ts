// packages/ui-web/src/styles/tokens/effects.ts (ACTUALIZADO CON TU PALETA)

import { COLORS } from "./colors";

// 🎨 GRADIENTES CON TU NUEVA PALETA
export const GRADIENTS = {
  // Principales (usando tus colores)
  primary: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.primary[500]} 100%)`, // Azul profundo
  secondary: `linear-gradient(135deg, ${COLORS.secondary[400]} 0%, ${COLORS.secondary[500]} 100%)`, // Verde
  accent: `linear-gradient(135deg, ${COLORS.accent[500]} 0%, ${COLORS.accent[600]} 100%)`, // Naranja
  warm: `linear-gradient(135deg, ${COLORS.warm[600]} 0%, ${COLORS.warm[700]} 100%)`, // Marrón

  // Especiales (combinando tus colores)
  hero: `linear-gradient(135deg, ${COLORS.primary[400]} 0%, ${COLORS.secondary[400]} 50%, ${COLORS.primary[500]} 100%)`, // Azul → Verde → Azul
  heroWarm: `linear-gradient(135deg, ${COLORS.warm[600]} 0%, ${COLORS.accent[500]} 50%, ${COLORS.warm[700]} 100%)`, // Marrón → Naranja → Marrón
  sunset: `linear-gradient(135deg, ${COLORS.accent[500]} 0%, ${COLORS.warm[600]} 100%)`, // Naranja → Marrón

  // Dark (usando tu #000B0D favorito)
  dark: `linear-gradient(135deg, ${COLORS.neutral[900]} 0%, ${COLORS.neutral[800]} 100%)`, // Tu negro azulado
  darkToBlue: `linear-gradient(135deg, ${COLORS.neutral[900]} 0%, ${COLORS.primary[400]} 100%)`, // Negro azulado → Azul

  // Light
  light: `linear-gradient(180deg, ${COLORS.neutral[50]} 0%, ${COLORS.neutral[100]} 100%)`,

  // Sutiles (para backgrounds)
  primarySubtle: `linear-gradient(135deg, ${COLORS.primary[100]} 0%, ${COLORS.primary[50]} 100%)`,
  secondarySubtle: `linear-gradient(135deg, ${COLORS.secondary[100]} 0%, ${COLORS.secondary[50]} 100%)`,
  accentSubtle: `linear-gradient(135deg, ${COLORS.accent[100]} 0%, ${COLORS.accent[50]} 100%)`,
  warmSubtle: `linear-gradient(135deg, ${COLORS.warm[100]} 0%, ${COLORS.warm[50]} 100%)`,
} as const;

// 🎨 SOMBRAS CON COLORES DE TU PALETA
export const SHADOWS = {
  // Sombras básicas (usando tu negro azulado)
  xs: `0 1px 3px rgba(0, 11, 13, 0.08), 0 1px 2px rgba(0, 11, 13, 0.06)`, // Tu #000B0D con opacidad
  sm: `0 1px 3px rgba(0, 11, 13, 0.08), 0 4px 6px rgba(0, 11, 13, 0.06)`,
  md: `0 4px 6px rgba(0, 11, 13, 0.07), 0 10px 15px rgba(0, 11, 13, 0.08)`,
  lg: `0 10px 15px rgba(0, 11, 13, 0.08), 0 20px 25px rgba(0, 11, 13, 0.10)`,
  xl: `0 25px 50px rgba(0, 11, 13, 0.15)`,
  "2xl": `0 35px 60px rgba(0, 11, 13, 0.20)`,

  // Sombras de colores (usando tus colores específicos)
  colored: {
    primary: `0 10px 30px rgba(28, 3, 148, 0.3)`, // #1c0394 con opacidad
    primaryHover: `0 6px 20px rgba(28, 3, 148, 0.4)`,
    secondary: `0 10px 30px rgba(16, 185, 129, 0.3)`, // #10b981 con opacidad
    secondaryHover: `0 6px 20px rgba(16, 185, 129, 0.4)`,
    accent: `0 10px 30px rgba(165, 37, 2, 0.3)`, // #A52502 con opacidad
    accentHover: `0 6px 20px rgba(165, 37, 2, 0.4)`,
    warm: `0 10px 30px rgba(57, 13, 2, 0.3)`, // #390D02 con opacidad
    warmHover: `0 6px 20px rgba(57, 13, 2, 0.4)`,
    dark: `0 10px 30px rgba(0, 11, 13, 0.4)`, // Tu #000B0D favorito
    darkHover: `0 6px 20px rgba(0, 11, 13, 0.5)`,
  },

  // Sombras internas (usando tu negro azulado)
  inner: `inset 0 2px 4px rgba(0, 11, 13, 0.06)`,
  innerSm: `inset 0 1px 2px rgba(0, 11, 13, 0.05)`,
} as const;

// 🎨 ANIMACIONES (sin cambios, pero listas para tus colores)
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

// 🎨 EFECTOS ESPECIALES (actualizados con tu paleta)
export const EFFECTS = {
  // Glassmorphism (usando tonos de tu paleta)
  glassmorphism: {
    light: {
      background: "rgba(250, 250, 250, 0.1)", // Basado en tu neutral[50]
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(250, 250, 250, 0.2)",
    },
    medium: {
      background: "rgba(250, 250, 250, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(250, 250, 250, 0.3)",
    },
    strong: {
      background: "rgba(250, 250, 250, 0.3)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(250, 250, 250, 0.4)",
    },
    dark: {
      background: "rgba(0, 11, 13, 0.2)", // Tu #000B0D favorito
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 11, 13, 0.3)",
    },
  },

  // Overlays (usando tu negro azulado)
  overlay: {
    light: "rgba(0, 11, 13, 0.1)", // Tu #000B0D con opacidades
    medium: "rgba(0, 11, 13, 0.3)",
    dark: "rgba(0, 11, 13, 0.5)",
    darker: "rgba(0, 11, 13, 0.7)",
  },
} as const;

// 🎨 CSS CUSTOM PROPERTIES ACTUALIZADAS
export const effectsCSSVariables = {
  // Gradientes (con tu nueva paleta)
  "--gradient-primary": GRADIENTS.primary, // Azul profundo
  "--gradient-secondary": GRADIENTS.secondary, // Verde
  "--gradient-accent": GRADIENTS.accent, // Naranja
  "--gradient-warm": GRADIENTS.warm, // Marrón
  "--gradient-hero": GRADIENTS.hero, // Azul → Verde → Azul
  "--gradient-hero-warm": GRADIENTS.heroWarm, // Marrón → Naranja → Marrón
  "--gradient-sunset": GRADIENTS.sunset, // Naranja → Marrón
  "--gradient-dark": GRADIENTS.dark, // Tu negro azulado
  "--gradient-dark-to-blue": GRADIENTS.darkToBlue, // Negro azulado → Azul
  "--gradient-light": GRADIENTS.light,

  // Sombras (usando tu #000B0D)
  "--shadow-xs": SHADOWS.xs,
  "--shadow-sm": SHADOWS.sm,
  "--shadow-md": SHADOWS.md,
  "--shadow-lg": SHADOWS.lg,
  "--shadow-xl": SHADOWS.xl,
  "--shadow-2xl": SHADOWS["2xl"],
  "--shadow-inner": SHADOWS.inner,

  // Sombras de colores (tu paleta específica)
  "--shadow-primary": SHADOWS.colored.primary, // #1c0394
  "--shadow-primary-hover": SHADOWS.colored.primaryHover,
  "--shadow-secondary": SHADOWS.colored.secondary, // #10b981
  "--shadow-secondary-hover": SHADOWS.colored.secondaryHover,
  "--shadow-accent": SHADOWS.colored.accent, // #A52502
  "--shadow-accent-hover": SHADOWS.colored.accentHover,
  "--shadow-warm": SHADOWS.colored.warm, // #390D02
  "--shadow-warm-hover": SHADOWS.colored.warmHover,
  "--shadow-dark": SHADOWS.colored.dark, // #000B0D tu favorito
  "--shadow-dark-hover": SHADOWS.colored.darkHover,

  // Animaciones
  "--duration-fast": ANIMATIONS.duration.fast,
  "--duration-normal": ANIMATIONS.duration.normal,
  "--duration-slow": ANIMATIONS.duration.slow,

  "--easing-linear": ANIMATIONS.easing.linear,
  "--easing-ease-in": ANIMATIONS.easing.easeIn,
  "--easing-ease-out": ANIMATIONS.easing.easeOut,
  "--easing-ease-in-out": ANIMATIONS.easing.easeInOut,
  "--easing-bounce": ANIMATIONS.easing.bounce,

  // Glassmorphism (con tonos de tu paleta)
  "--glass-light-bg": EFFECTS.glassmorphism.light.background,
  "--glass-light-backdrop": EFFECTS.glassmorphism.light.backdropFilter,
  "--glass-light-border": EFFECTS.glassmorphism.light.border,

  "--glass-medium-bg": EFFECTS.glassmorphism.medium.background,
  "--glass-medium-backdrop": EFFECTS.glassmorphism.medium.backdropFilter,
  "--glass-medium-border": EFFECTS.glassmorphism.medium.border,

  "--glass-dark-bg": EFFECTS.glassmorphism.dark.background, // Tu #000B0D
  "--glass-dark-backdrop": EFFECTS.glassmorphism.dark.backdropFilter,
  "--glass-dark-border": EFFECTS.glassmorphism.dark.border,

  // Overlays (tu negro azulado)
  "--overlay-light": EFFECTS.overlay.light, // rgba(0, 11, 13, 0.1)
  "--overlay-medium": EFFECTS.overlay.medium, // rgba(0, 11, 13, 0.3)
  "--overlay-dark": EFFECTS.overlay.dark, // rgba(0, 11, 13, 0.5)
  "--overlay-darker": EFFECTS.overlay.darker, // rgba(0, 11, 13, 0.7)
} as const;
