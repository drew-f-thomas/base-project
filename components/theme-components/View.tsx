import { View as RNView, type ViewProps as RNViewProps } from 'react-native';

import { Theme } from '@/constants/Theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ViewProps = RNViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'card' | 'button' | 'input' | 'default' | 'elevated';
  padding?: keyof typeof Theme.spacing;
  borderRadius?: keyof typeof Theme.borderRadius;
  shadow?: keyof typeof Theme.shadows;
  backgroundColor?: 'background' | 'tint' | 'text' | 'icon';
};

export function View({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  padding,
  borderRadius,
  shadow,
  backgroundColor = 'background',
  ...rest
}: ViewProps) {
  const bgColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    backgroundColor
  );

  const variantStyles = {
    card: {
      ...Theme.shadows.card,
      borderRadius: Theme.borderRadius.card.medium,
      padding: Theme.spacing.card.padding,
    },
    button: {
      ...Theme.shadows.button,
      borderRadius: Theme.borderRadius.button.medium,
      padding: Theme.spacing.button.padding,
    },
    input: {
      borderRadius: Theme.borderRadius.input.medium,
      padding: Theme.spacing.input.padding,
    },
    elevated: {
      ...Theme.shadows.lg,
      borderRadius: Theme.borderRadius.card.large,
    },
    default: {},
  };

  return (
    <RNView
      style={[
        { backgroundColor: bgColor },
        variantStyles[variant],
        padding && { padding: Theme.spacing[padding] },
        borderRadius && { borderRadius: Theme.borderRadius[borderRadius] },
        shadow && Theme.shadows[shadow],
        style,
      ]}
      {...rest}
    />
  );
}
