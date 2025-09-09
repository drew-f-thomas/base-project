import { Theme, getThemeColors } from '@/constants/Theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useTheme() {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return {
    colors,
    spacing: Theme.spacing,
    typography: Theme.typography,
    borderRadius: Theme.borderRadius,
    shadows: Theme.shadows,
    colorScheme,
  };
}
