export const palette = {
  primary: "#2E7D32",
  secondary: "#66BB6A",
  accent: "#81C784",

  background: "#F7F9F8",
  surface: "#FFFFFF",

  text: "#1B1F1B",
  textSecondary: "#5F6B61",

  icon: "#6B756D",

  success: "#43A047",
  warning: "#FFB300",
  error: "#D32F2F",

  border: "#E1E7E2",
} as const;

export const Colors = {
  light: {
    text: palette.text,
    textSecondary: palette.textSecondary,

    background: palette.background,
    surface: palette.surface,

    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,

    success: palette.success,
    warning: palette.warning,
    error: palette.error,

    icon: palette.icon,
    border: palette.border,
  },

  dark: {
    text: "#E8F5E9",
    textSecondary: "#B8C7B9",

    background: "#121713",
    surface: "#1B241D",

    primary: palette.secondary,
    secondary: palette.primary,
    accent: palette.accent,

    success: "#66BB6A",
    warning: "#FFCA28",
    error: "#EF5350",

    icon: "#AAB5AB",
    border: "#303A32",
  },
} as const;
