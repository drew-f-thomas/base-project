import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text as RNText } from 'react-native'
import { Modal, AlertModal } from '@/src/design-system/components/Modal'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Modal', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders when visible', () => {
    const { getByText } = renderWithTheme(
      <Modal {...defaultProps}>
        <RNText>Modal content</RNText>
      </Modal>
    )
    expect(getByText('Modal content')).toBeTruthy()
  })

  it('does not render when not visible', () => {
    const { queryByText } = renderWithTheme(
      <Modal {...defaultProps} visible={false}>
        <RNText>Modal content</RNText>
      </Modal>
    )
    expect(queryByText('Modal content')).toBeNull()
  })

  it('displays title when provided', () => {
    const { getByText } = renderWithTheme(
      <Modal {...defaultProps} title="Test Modal">
        <RNText>Modal content</RNText>
      </Modal>
    )
    expect(getByText('Test Modal')).toBeTruthy()
  })

  it('shows close button by default', () => {
    const { getByText } = renderWithTheme(
      <Modal {...defaultProps} title="Test Modal">
        <RNText>Modal content</RNText>
      </Modal>
    )
    expect(getByText('✕')).toBeTruthy()
  })

  it('hides close button when showCloseButton is false', () => {
    const { queryByText } = renderWithTheme(
      <Modal {...defaultProps} title="Test Modal" showCloseButton={false}>
        <RNText>Modal content</RNText>
      </Modal>
    )
    expect(queryByText('✕')).toBeNull()
  })

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn()
    const { getByText } = renderWithTheme(
      <Modal visible={true} onClose={onClose} title="Test Modal">
        <RNText>Modal content</RNText>
      </Modal>
    )

    fireEvent.press(getByText('✕'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders different sizes correctly', () => {
    const sizes = ['small', 'medium', 'large', 'fullscreen'] as const

    sizes.forEach(size => {
      const { getByText } = renderWithTheme(
        <Modal {...defaultProps} size={size}>
          <RNText>Size: {size}</RNText>
        </Modal>
      )
      expect(getByText(`Size: ${size}`)).toBeTruthy()
    })
  })

  it('renders with custom animation type', () => {
    const { getByText } = renderWithTheme(
      <Modal {...defaultProps} animationType="slide">
        <RNText>Slide animation</RNText>
      </Modal>
    )
    expect(getByText('Slide animation')).toBeTruthy()
  })
})

describe('AlertModal', () => {
  const defaultProps = {
    visible: true,
    onClose: jest.fn(),
    title: 'Alert Title',
    message: 'Alert message',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders alert content', () => {
    const { getByText } = renderWithTheme(<AlertModal {...defaultProps} />)
    expect(getByText('Alert Title')).toBeTruthy()
    expect(getByText('Alert message')).toBeTruthy()
    expect(getByText('OK')).toBeTruthy()
  })

  it('renders custom confirm text', () => {
    const { getByText } = renderWithTheme(
      <AlertModal {...defaultProps} confirmText="Confirm" />
    )
    expect(getByText('Confirm')).toBeTruthy()
  })

  it('renders cancel button when cancelText provided', () => {
    const { getByText } = renderWithTheme(
      <AlertModal {...defaultProps} cancelText="Cancel" />
    )
    expect(getByText('Cancel')).toBeTruthy()
    expect(getByText('OK')).toBeTruthy()
  })

  it('calls onConfirm and onClose when confirm button pressed', () => {
    const onClose = jest.fn()
    const onConfirm = jest.fn()
    const { getByText } = renderWithTheme(
      <AlertModal {...defaultProps} onClose={onClose} onConfirm={onConfirm} />
    )

    fireEvent.press(getByText('OK'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel and onClose when cancel button pressed', () => {
    const onClose = jest.fn()
    const onCancel = jest.fn()
    const { getByText } = renderWithTheme(
      <AlertModal
        {...defaultProps}
        onClose={onClose}
        onCancel={onCancel}
        cancelText="Cancel"
      />
    )

    fireEvent.press(getByText('Cancel'))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders different alert types', () => {
    const types = ['info', 'warning', 'error', 'success'] as const

    types.forEach(type => {
      const { getByText } = renderWithTheme(
        <AlertModal {...defaultProps} type={type} />
      )
      expect(getByText('Alert Title')).toBeTruthy()
    })
  })

  it('displays correct icons for different types', () => {
    const typeIcons = {
      info: 'i',
      warning: '⚠',
      error: '!',
      success: '✓',
    } as const

    Object.entries(typeIcons).forEach(([type, icon]) => {
      const { getByText } = renderWithTheme(
        <AlertModal {...defaultProps} type={type as keyof typeof typeIcons} />
      )
      expect(getByText(icon)).toBeTruthy()
    })
  })

  it('does not call onConfirm when not provided', () => {
    const onClose = jest.fn()
    const { getByText } = renderWithTheme(
      <AlertModal {...defaultProps} onClose={onClose} />
    )

    fireEvent.press(getByText('OK'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onCancel when not provided', () => {
    const onClose = jest.fn()
    const { getByText } = renderWithTheme(
      <AlertModal {...defaultProps} onClose={onClose} cancelText="Cancel" />
    )

    fireEvent.press(getByText('Cancel'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
