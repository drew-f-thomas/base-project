import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
} from 'react-native';

import { Theme } from '@/constants/Theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PressableProps = RNPressableProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'button' | 'card' | 'default';
  padding?: keyof typeof Theme.spacing;
  borderRadius?: keyof typeof Theme.borderRadius;
  shadow?: keyof typeof Theme.shadows;
  backgroundColor?: 'background' | 'tint' | 'text' | 'icon';
};

export function Pressable({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  padding,
  borderRadius,
  shadow,
  backgroundColor = 'background',
  ...rest
}: PressableProps) {
  const bgColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    backgroundColor
  );

  const variantStyles = {
    button: {
      ...Theme.shadows.button,
      borderRadius: Theme.borderRadius.button.medium,
      padding: Theme.spacing.button.padding,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    card: {
      ...Theme.shadows.card,
      borderRadius: Theme.borderRadius.card.medium,
      padding: Theme.spacing.card.padding,
    },
    default: {},
  };

  return (
    <RNPressable
      style={[
        { backgroundColor: bgColor },
        variantStyles[variant],
        padding && {
          padding:
            typeof Theme.spacing[padding] === 'number'
              ? Theme.spacing[padding]
              : (Theme.spacing[padding] as any).padding ||
                Theme.spacing[padding],
        },
        borderRadius && {
          borderRadius:
            typeof Theme.borderRadius[borderRadius] === 'number'
              ? Theme.borderRadius[borderRadius]
              : Theme.borderRadius[borderRadius].medium,
        },
        shadow && Theme.shadows[shadow],
        style,
      ]}
      {...rest}
    />
  );
}
