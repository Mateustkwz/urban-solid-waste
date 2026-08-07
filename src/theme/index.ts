import { Platform } from "react-native";

const palette = {
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
};

export const Colors = {
  light: {
    text: palette.text,
    textSecondary: palette.textSecondary,

    background: palette.background,
    surface: palette.surface,

    tint: palette.primary,

    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,

    success: palette.success,
    warning: palette.warning,
    error: palette.error,

    icon: palette.icon,
    border: palette.border,

    tabIconDefault: palette.icon,
    tabIconSelected: palette.primary,
  },

  dark: {
    text: "#E8F5E9",
    textSecondary: "#B8C7B9",

    background: "#121713",
    surface: "#1B241D",

    tint: palette.accent,

    primary: palette.secondary,
    secondary: palette.primary,
    accent: palette.accent,

    success: "#66BB6A",
    warning: "#FFCA28",
    error: "#EF5350",

    icon: "#AAB5AB",
    border: "#303A32",

    tabIconDefault: "#AAB5AB",
    tabIconSelected: palette.accent,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
