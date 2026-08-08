import { Colors } from "@theme/index";
import { useColorScheme } from "./useColorSchema";

type ColorName = keyof typeof Colors.light;

export function useThemeColor(colorName: ColorName) {
  const theme = useColorScheme() ?? "light";

  return Colors[theme][colorName];
}
