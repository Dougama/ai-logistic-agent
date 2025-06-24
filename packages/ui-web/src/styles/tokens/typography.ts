export const TYPOGRAPHY = {
  // Font families
  fontFamilies: {
    primary: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    mono: '"Fira Code", "Monaco", "Consolas", monospace',
  },

  // Font sizes
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
  },

  // Font weights
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  // Line heights
  lineHeight: {
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Letter spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// CSS Custom Properties para typography
export const typographyCSSVariables = {
  // Font families
  "--font-primary": TYPOGRAPHY.fontFamilies.primary,
  "--font-mono": TYPOGRAPHY.fontFamilies.mono,

  // Font sizes
  "--text-xs": TYPOGRAPHY.fontSize.xs,
  "--text-sm": TYPOGRAPHY.fontSize.sm,
  "--text-base": TYPOGRAPHY.fontSize.base,
  "--text-lg": TYPOGRAPHY.fontSize.lg,
  "--text-xl": TYPOGRAPHY.fontSize.xl,
  "--text-2xl": TYPOGRAPHY.fontSize["2xl"],
  "--text-3xl": TYPOGRAPHY.fontSize["3xl"],
  "--text-4xl": TYPOGRAPHY.fontSize["4xl"],
  "--text-5xl": TYPOGRAPHY.fontSize["5xl"],

  // Font weights
  "--font-light": TYPOGRAPHY.fontWeight.light,
  "--font-normal": TYPOGRAPHY.fontWeight.normal,
  "--font-medium": TYPOGRAPHY.fontWeight.medium,
  "--font-semibold": TYPOGRAPHY.fontWeight.semibold,
  "--font-bold": TYPOGRAPHY.fontWeight.bold,
  "--font-extrabold": TYPOGRAPHY.fontWeight.extrabold,

  // Line heights
  "--leading-tight": TYPOGRAPHY.lineHeight.tight,
  "--leading-snug": TYPOGRAPHY.lineHeight.snug,
  "--leading-normal": TYPOGRAPHY.lineHeight.normal,
  "--leading-relaxed": TYPOGRAPHY.lineHeight.relaxed,
  "--leading-loose": TYPOGRAPHY.lineHeight.loose,
} as const;
