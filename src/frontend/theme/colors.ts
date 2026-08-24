export const palette = {
  primary: "#416F32",
  primaryLight: "#5A8F48",
  secondary: "#66BB6A",
  accent: "#81C784",
  componentBackground: "#E8F4E8",

  background: "#F7F9F5",
  surface: "#FFFFFF",
  transparent: "transparent",

  text: "#1B1F1A",
  textSecondary: "#5F685C",
  icon: "#687263",

  success: "#43A047",
  warning: "#FFB300",
  error: "#D32F2F",

  border: "#DDE5DA",
  inputBackground: "#f1f1f1",

  citizenBackground: "#E6F4EA", // verde claro
  citizenIcon: "#2E7D32", // verde escuro
  associationBackground: "#E6F0FA", // azul claro
  associationIcon: "#1565C0", // azul médio
  cityHallBackground: "#F3E8F9", // roxo claro
  cityHallIcon: "#6A1B9A",
} as const;

export const Colors = {
  light: {
    ...palette,
    tint: palette.primary,
    tabIconDefault: palette.icon,
    tabIconSelected: palette.primary,
  },

  dark: {
    primary: "#6FA85A",
    primaryLight: "#82B96C",
    secondary: "#81C784",
    accent: "#A5D6A7",
    componentBackground: "#E8F4E8",

    background: "#111711",
    surface: "#1A211A",

    text: "#F1F5EF",
    textSecondary: "#B7C1B3",
    icon: "#AAB5A6",

    success: "#66BB6A",
    warning: "#FFCA4D",
    error: "#EF5350",

    border: "#303A2F",

    tint: "#6FA85A",
    tabIconDefault: "#AAB5A6",
    tabIconSelected: "#6FA85A",

    inputBackground: "#3d3636",
    transparent: palette.transparent,

    citizenBackground: "rgba(46, 125, 50, 0.2)", // verde translúcido
    citizenIcon: "#81C784", // verde claro
    associationBackground: "rgba(21, 101, 192, 0.2)", // azul translúcido
    associationIcon: "#64B5F6", // azul claro
    cityHallBackground: "rgba(106, 27, 154, 0.2)", // roxo translúcido
    cityHallIcon: "#BA68C8",
  },
} as const;
