import React from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Text } from './Text'

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  loading?: boolean
  fullWidth?: boolean
  accessibilityLabel?: string
  accessibilityRole?: 'button' | 'link'
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  fullWidth = false,
  disabled,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}: ButtonProps) {
  const { theme, colors } = useTheme()

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          minHeight: 32,
        }
      case 'lg':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: 56,
        }
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
          minHeight: 44,
        }
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        }
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        }
      case 'link':
        return {
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          paddingVertical: 0,
        }
      default:
        return {
          backgroundColor: colors.primary,
        }
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#FFFFFF'
      case 'link':
        return colors.link
      default:
        return colors.text
    }
  }

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'sm' as const
      case 'lg':
        return 'lg' as const
      default:
        return 'md' as const
    }
  }

  const buttonStyle = StyleSheet.flatten([
    styles.base,
    getSizeStyles(),
    getVariantStyles(),
    fullWidth && styles.fullWidth,
    disabled && { opacity: 0.5 },
    style,
  ])

  return (
    <Pressable
      style={({ pressed }) => {
        const flatStyle = StyleSheet.flatten(buttonStyle) as any
        return {
          ...flatStyle,
          opacity: pressed && !disabled ? 0.8 : flatStyle.opacity || 1,
        }
      }}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : typeof children === 'string' ? (
        <Text
          size={getTextSize()}
          weight="semibold"
          color={getTextColor()}
          align="center"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 12,
  },
  fullWidth: {
    width: '100%',
  },
})
