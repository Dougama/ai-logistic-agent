export const SPACING = {
  // Base spacing scale
  0: "0px",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

// Semantic spacing
export const SEMANTIC_SPACING = {
  // Component spacing
  component: {
    xs: SPACING[1], // 4px
    sm: SPACING[2], // 8px
    md: SPACING[4], // 16px
    lg: SPACING[6], // 24px
    xl: SPACING[8], // 32px
  },

  // Layout spacing
  layout: {
    xs: SPACING[4], // 16px
    sm: SPACING[6], // 24px
    md: SPACING[8], // 32px
    lg: SPACING[12], // 48px
    xl: SPACING[16], // 64px
  },

  // Container spacing
  container: {
    xs: SPACING[4], // 16px
    sm: SPACING[6], // 24px
    md: SPACING[8], // 32px
    lg: SPACING[12], // 48px
    xl: SPACING[16], // 64px
  },
} as const;

// Border radius
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// CSS Custom Properties para spacing
export const spacingCSSVariables = {
  // Base spacing
  "--spacing-0": SPACING[0],
  "--spacing-px": SPACING.px,
  "--spacing-1": SPACING[1],
  "--spacing-2": SPACING[2],
  "--spacing-3": SPACING[3],
  "--spacing-4": SPACING[4],
  "--spacing-5": SPACING[5],
  "--spacing-6": SPACING[6],
  "--spacing-8": SPACING[8],
  "--spacing-10": SPACING[10],
  "--spacing-12": SPACING[12],
  "--spacing-16": SPACING[16],
  "--spacing-20": SPACING[20],
  "--spacing-24": SPACING[24],
  "--spacing-32": SPACING[32],

  // Semantic spacing
  "--spacing-component-xs": SEMANTIC_SPACING.component.xs,
  "--spacing-component-sm": SEMANTIC_SPACING.component.sm,
  "--spacing-component-md": SEMANTIC_SPACING.component.md,
  "--spacing-component-lg": SEMANTIC_SPACING.component.lg,
  "--spacing-component-xl": SEMANTIC_SPACING.component.xl,

  "--spacing-layout-xs": SEMANTIC_SPACING.layout.xs,
  "--spacing-layout-sm": SEMANTIC_SPACING.layout.sm,
  "--spacing-layout-md": SEMANTIC_SPACING.layout.md,
  "--spacing-layout-lg": SEMANTIC_SPACING.layout.lg,
  "--spacing-layout-xl": SEMANTIC_SPACING.layout.xl,

  // Border radius
  "--radius-sm": BORDER_RADIUS.sm,
  "--radius-base": BORDER_RADIUS.base,
  "--radius-md": BORDER_RADIUS.md,
  "--radius-lg": BORDER_RADIUS.lg,
  "--radius-xl": BORDER_RADIUS.xl,
  "--radius-2xl": BORDER_RADIUS["2xl"],
  "--radius-3xl": BORDER_RADIUS["3xl"],
  "--radius-full": BORDER_RADIUS.full,
} as const;
