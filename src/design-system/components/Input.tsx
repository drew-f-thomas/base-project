import React, { forwardRef } from 'react'
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Text } from './Text'

export interface InputProps extends TextInputProps {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'outlined' | 'filled'
  accessibilityLabel?: string
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'outlined',
      style,
      accessibilityLabel,
      editable = true,
      ...props
    },
    ref
  ) => {
    const { theme, colors } = useTheme()

    const getVariantStyles = () => {
      if (variant === 'filled') {
        return {
          backgroundColor: colors.surface,
          borderWidth: 0,
          borderBottomWidth: 1,
        }
      }
      return {
        borderWidth: 1,
        borderRadius: theme.radii.md,
      }
    }

    const inputContainerStyle = StyleSheet.flatten([
      styles.inputContainer,
      getVariantStyles(),
      {
        borderColor: error ? colors.error : colors.border,
        backgroundColor:
          variant === 'filled' ? colors.surface : colors.background,
      },
      !editable && { opacity: 0.5 },
    ])

    const inputStyle = StyleSheet.flatten([
      styles.input,
      {
        color: colors.text,
        fontSize: theme.typography.sizes.md,
      },
      leftIcon ? { paddingLeft: theme.spacing.xl + theme.spacing.sm } : {},
      rightIcon ? { paddingRight: theme.spacing.xl + theme.spacing.sm } : {},
      style,
    ])

    return (
      <View style={styles.container}>
        {label && (
          <Text
            size="sm"
            weight="medium"
            color={colors.textSecondary}
            style={styles.label}
          >
            {label}
          </Text>
        )}
        <View style={inputContainerStyle}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={inputStyle}
            placeholderTextColor={colors.textTertiary}
            editable={editable}
            accessibilityLabel={accessibilityLabel || label}
            accessibilityRole="text"
            accessibilityState={{
              disabled: !editable,
            }}
            {...props}
          />
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
        {error && (
          <Text size="sm" color={colors.error} style={styles.helperText}>
            {error}
          </Text>
        )}
        {helperText && !error && (
          <Text
            size="sm"
            color={colors.textSecondary}
            style={styles.helperText}
          >
            {helperText}
          </Text>
        )}
      </View>
    )
  }
)

Input.displayName = 'Input'

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  helperText: {
    marginTop: 4,
  },
})
