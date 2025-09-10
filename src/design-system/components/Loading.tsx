import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Box } from './Box'
import { Text } from './Text'

export interface LoadingProps extends Omit<ActivityIndicatorProps, 'color'> {
  size?: 'small' | 'large'
  text?: string
  overlay?: boolean
  color?: string
}

export function Loading({
  size = 'large',
  text,
  overlay = false,
  color,
  style,
  ...props
}: LoadingProps) {
  const { colors } = useTheme()

  const loadingColor = color || colors.primary

  const loadingContent = (
    <Box alignItems="center" justifyContent="center" gap="sm">
      <ActivityIndicator
        size={size}
        color={loadingColor}
        style={style}
        {...props}
      />
      {text ? (
        <Text variant="body" style={{ color: colors.textSecondary }}>
          {text}
        </Text>
      ) : null}
    </Box>
  )

  if (overlay) {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(0,0,0,0.5)"
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
      >
        <Box
          backgroundColor={colors.surface}
          padding="xl"
          borderRadius="md"
          alignItems="center"
          justifyContent="center"
          minWidth={120}
        >
          {loadingContent}
        </Box>
      </Box>
    )
  }

  return loadingContent
}
