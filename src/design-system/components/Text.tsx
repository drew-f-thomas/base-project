import React from 'react'
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native'
import { useTheme } from '../hooks/useTheme'

export interface TextProps extends RNTextProps {
  variant?: 'body' | 'heading' | 'subheading' | 'caption' | 'label'
  size?: keyof typeof import('../theme').theme.typography.sizes
  weight?: keyof typeof import('../theme').theme.typography.weights
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: keyof typeof import('../theme').theme.typography.lineHeights
}

export function Text({
  variant = 'body',
  size,
  weight,
  color,
  align,
  lineHeight,
  style,
  ...props
}: TextProps) {
  const { theme, colors } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case 'heading':
        return {
          fontSize: theme.typography.sizes.xxl,
          fontWeight: theme.typography.weights.bold,
          lineHeight:
            theme.typography.sizes.xxl * theme.typography.lineHeights.tight,
        }
      case 'subheading':
        return {
          fontSize: theme.typography.sizes.lg,
          fontWeight: theme.typography.weights.semibold,
          lineHeight:
            theme.typography.sizes.lg * theme.typography.lineHeights.normal,
        }
      case 'caption':
        return {
          fontSize: theme.typography.sizes.sm,
          fontWeight: theme.typography.weights.regular,
          lineHeight:
            theme.typography.sizes.sm * theme.typography.lineHeights.normal,
        }
      case 'label':
        return {
          fontSize: theme.typography.sizes.xs,
          fontWeight: theme.typography.weights.medium,
          lineHeight:
            theme.typography.sizes.xs * theme.typography.lineHeights.tight,
        }
      default:
        return {
          fontSize: theme.typography.sizes.md,
          fontWeight: theme.typography.weights.regular,
          lineHeight:
            theme.typography.sizes.md * theme.typography.lineHeights.normal,
        }
    }
  }

  const textStyle = StyleSheet.flatten([
    getVariantStyles(),
    size !== undefined && { fontSize: theme.typography.sizes[size] },
    weight !== undefined && { fontWeight: theme.typography.weights[weight] },
    color !== undefined ? { color } : { color: colors.text },
    align !== undefined && { textAlign: align },
    lineHeight !== undefined && {
      lineHeight:
        (size ? theme.typography.sizes[size] : theme.typography.sizes.md) *
        theme.typography.lineHeights[lineHeight],
    },
    style,
  ])

  return <RNText style={textStyle} {...props} />
}
