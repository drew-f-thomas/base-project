import React from 'react'
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Pressable,
  Dimensions,
} from 'react-native'
import { useTheme } from '../hooks/useTheme'
import { Box } from './Box'
import { Text } from './Text'
import { Button } from './Button'

export interface ModalProps extends Omit<RNModalProps, 'children'> {
  children?: React.ReactNode
  title?: string
  visible: boolean
  onClose: () => void
  size?: 'small' | 'medium' | 'large' | 'fullscreen'
  showCloseButton?: boolean
  closeOnBackdropPress?: boolean
}

export function Modal({
  children,
  title,
  visible,
  onClose,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = 'fade',
  transparent = true,
  ...props
}: ModalProps) {
  const { colors } = useTheme()
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

  const getModalSize = () => {
    switch (size) {
      case 'small':
        return {
          width: Math.min(320, screenWidth * 0.8),
          maxHeight: screenHeight * 0.6,
        }
      case 'medium':
        return {
          width: Math.min(480, screenWidth * 0.9),
          maxHeight: screenHeight * 0.8,
        }
      case 'large':
        return {
          width: Math.min(640, screenWidth * 0.95),
          maxHeight: screenHeight * 0.9,
        }
      case 'fullscreen':
        return { width: screenWidth, height: screenHeight }
      default:
        return {
          width: Math.min(480, screenWidth * 0.9),
          maxHeight: screenHeight * 0.8,
        }
    }
  }

  const modalSize = getModalSize()

  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      {...props}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: size === 'fullscreen' ? 0 : 16,
        }}
        onPress={closeOnBackdropPress ? onClose : undefined}
      >
        <Pressable
          style={[
            modalSize,
            {
              backgroundColor: colors.surface,
              borderRadius: size === 'fullscreen' ? 0 : 12,
              overflow: 'hidden',
            },
          ]}
          onPress={e => e.stopPropagation()}
        >
          {title || showCloseButton ? (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              padding="lg"
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              {title ? (
                <Text variant="subheading" style={{ flex: 1 }}>
                  {title}
                </Text>
              ) : (
                <Box flex={1} />
              )}

              {showCloseButton ? (
                <Button
                  variant="ghost"
                  onPress={onClose}
                  accessibilityLabel="Close modal"
                  style={{ paddingHorizontal: 8 }}
                >
                  ✕
                </Button>
              ) : null}
            </Box>
          ) : null}

          <Box flex={1} padding={title || showCloseButton ? 'lg' : undefined}>
            {children}
          </Box>
        </Pressable>
      </Pressable>
    </RNModal>
  )
}

export interface AlertModalProps {
  visible: boolean
  onClose: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  type?: 'info' | 'warning' | 'error' | 'success'
}

export function AlertModal({
  visible,
  onClose,
  title,
  message,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel,
  type = 'info',
}: AlertModalProps) {
  const { colors } = useTheme()

  const getTypeColor = () => {
    switch (type) {
      case 'error':
        return colors.error || '#FF4444'
      case 'warning':
        return colors.warning || '#FF8800'
      case 'success':
        return colors.success || '#00CC44'
      default:
        return colors.primary
    }
  }

  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      size="small"
      closeOnBackdropPress={false}
    >
      <Box gap="lg" alignItems="center">
        <Box
          borderRadius="full"
          backgroundColor={getTypeColor()}
          alignItems="center"
          justifyContent="center"
          style={{ width: 48, height: 48 }}
        >
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
            {type === 'error'
              ? '!'
              : type === 'warning'
                ? '⚠'
                : type === 'success'
                  ? '✓'
                  : 'i'}
          </Text>
        </Box>

        <Box alignItems="center" gap="sm">
          <Text variant="subheading" style={{ textAlign: 'center' }}>
            {title}
          </Text>
          <Text
            variant="body"
            style={{ textAlign: 'center', color: colors.textSecondary }}
          >
            {message}
          </Text>
        </Box>

        <Box flexDirection="row" gap="md" style={{ width: '100%' }}>
          {cancelText ? (
            <Box flex={1}>
              <Button variant="secondary" onPress={handleCancel}>
                {cancelText}
              </Button>
            </Box>
          ) : null}
          <Box flex={1}>
            <Button variant="primary" onPress={handleConfirm}>
              {confirmText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
