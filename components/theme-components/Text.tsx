import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { Theme } from '@/constants/Theme';
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?:
    | 'body'
    | 'title'
    | 'subtitle'
    | 'caption'
    | 'button'
    | 'link'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4';
  color?: 'text' | 'tint' | 'icon' | 'tabIconDefault' | 'tabIconSelected';
};

export function Text({
  style,
  lightColor,
  darkColor,
  variant = 'body',
  color = 'text',
  ...rest
}: TextProps) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  const variantStyle = {
    body: Theme.typography.styles.body,
    title: Theme.typography.styles.h1,
    subtitle: Theme.typography.styles.h3,
    caption: Theme.typography.styles.caption,
    button: Theme.typography.styles.button,
    link: Theme.typography.styles.link,
    h1: Theme.typography.styles.h1,
    h2: Theme.typography.styles.h2,
    h3: Theme.typography.styles.h3,
    h4: Theme.typography.styles.h4,
  }[variant];

  return (
    <RNText style={[variantStyle, { color: textColor }, style]} {...rest} />
  );
}
