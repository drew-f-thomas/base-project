import React from 'react'
import { StyleSheet } from 'react-native'
import { Box, BoxProps } from './Box'
import { useTheme } from '../hooks/useTheme'

export interface CardProps extends BoxProps {
  variant?: 'elevated' | 'outlined' | 'filled'
}

export function Card({ variant = 'elevated', style, ...props }: CardProps) {
  const { theme, colors } = useTheme()

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
        }
      case 'filled':
        return {
          backgroundColor: colors.surface,
        }
      default:
        return {
          backgroundColor: colors.background,
          ...theme.shadows.md,
        }
    }
  }

  const cardStyle = StyleSheet.flatten([styles.base, getVariantStyles(), style])

  return <Box borderRadius="lg" padding="md" style={cardStyle} {...props} />
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
})
