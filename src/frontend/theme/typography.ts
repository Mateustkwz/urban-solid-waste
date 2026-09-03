export const Typography = {
  h1: {
    fontFamily: "Nunito-Bold",
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 700,
  },

  h2: {
    fontFamily: "Nunito-Bold",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 700,
  },

  h3: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
  },

  subtitle: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 700,
  },

  body: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    lineHeight: 24,
  },

  bodyMedium: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 24,
  },

  bodySemiBold: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },

  bodySmall: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    lineHeight: 20,
  },

  caption: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    lineHeight: 16,
  },

  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },

  link: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 24,
  },
} as const;

export const Size = {
  huge: {
    fontSize: 48,
    lineHeight: 56,
  },
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
  },
} as const;

export type TypographyVariant = keyof typeof Typography;
