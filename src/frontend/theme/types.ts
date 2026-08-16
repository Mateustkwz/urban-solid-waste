import { Colors } from "./colors";

export type ThemeMode = "light" | "dark";

export type ThemeColors = (typeof Colors)[ThemeMode];
