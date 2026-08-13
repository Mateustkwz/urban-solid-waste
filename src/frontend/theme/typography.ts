export const Typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
  },

  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
  },

  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },

  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },

  bodySemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
} as const;

export type TypographyVariant = keyof typeof Typography;
