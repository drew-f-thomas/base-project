import React from 'react'
import { View, ViewProps, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'

export interface BoxProps extends ViewProps {
  padding?: keyof typeof import('../theme').theme.spacing
  margin?: keyof typeof import('../theme').theme.spacing
  paddingHorizontal?: keyof typeof import('../theme').theme.spacing
  paddingVertical?: keyof typeof import('../theme').theme.spacing
  marginHorizontal?: keyof typeof import('../theme').theme.spacing
  marginVertical?: keyof typeof import('../theme').theme.spacing
  marginTop?: keyof typeof import('../theme').theme.spacing
  marginBottom?: keyof typeof import('../theme').theme.spacing
  backgroundColor?: string
  borderRadius?: keyof typeof import('../theme').theme.radii
  flex?: number
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  gap?: keyof typeof import('../theme').theme.spacing
  position?: 'absolute' | 'relative'
  top?: number
  left?: number
  right?: number
  bottom?: number
  zIndex?: number
  width?: number
  height?: number
  minWidth?: number
}

export function Box({
  padding,
  margin,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  backgroundColor,
  borderRadius,
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  gap,
  position,
  top,
  left,
  right,
  bottom,
  zIndex,
  width,
  height,
  minWidth,
  style,
  ...props
}: BoxProps) {
  const { theme } = useTheme()

  const boxStyle = StyleSheet.flatten([
    padding !== undefined && { padding: theme.spacing[padding] },
    margin !== undefined && { margin: theme.spacing[margin] },
    paddingHorizontal !== undefined && {
      paddingHorizontal: theme.spacing[paddingHorizontal],
    },
    paddingVertical !== undefined && {
      paddingVertical: theme.spacing[paddingVertical],
    },
    marginHorizontal !== undefined && {
      marginHorizontal: theme.spacing[marginHorizontal],
    },
    marginVertical !== undefined && {
      marginVertical: theme.spacing[marginVertical],
    },
    marginTop !== undefined && { marginTop: theme.spacing[marginTop] },
    marginBottom !== undefined && { marginBottom: theme.spacing[marginBottom] },
    backgroundColor !== undefined && { backgroundColor },
    borderRadius !== undefined && { borderRadius: theme.radii[borderRadius] },
    flex !== undefined && { flex },
    alignItems !== undefined && { alignItems },
    justifyContent !== undefined && { justifyContent },
    flexDirection !== undefined && { flexDirection },
    gap !== undefined && { gap: theme.spacing[gap] },
    position !== undefined && { position },
    top !== undefined && { top },
    left !== undefined && { left },
    right !== undefined && { right },
    bottom !== undefined && { bottom },
    zIndex !== undefined && { zIndex },
    width !== undefined && { width },
    height !== undefined && { height },
    minWidth !== undefined && { minWidth },
    style,
  ])

  return <View style={boxStyle} {...props} />
}
