import { Colors } from "../theme/index";
import { useColorScheme } from "./useColorSchema";

type LightColorKeys = keyof typeof Colors.light;
type ColorValue = (typeof Colors.light)[LightColorKeys];

export const useThemeColors = (keys: LightColorKeys[]) => {
  const theme = useColorScheme() ?? "light";

  const resolvedColors = keys.map((key) => Colors[theme][key]) as ColorValue[];

  return resolvedColors;
};
