import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from '@/src/design-system/components/Text'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Text', () => {
  it('renders correctly with default variant', () => {
    const { getByText } = renderWithTheme(<Text>Hello World</Text>)
    expect(getByText('Hello World')).toBeTruthy()
  })

  it('applies different variants correctly', () => {
    const variants = [
      'body',
      'heading',
      'subheading',
      'caption',
      'label',
    ] as const

    variants.forEach(variant => {
      const { getByText } = renderWithTheme(
        <Text variant={variant}>Test {variant}</Text>
      )
      expect(getByText(`Test ${variant}`)).toBeTruthy()
    })
  })

  it('applies custom color', () => {
    const { getByText } = renderWithTheme(<Text color="#FF0000">Red text</Text>)
    const textElement = getByText('Red text')
    expect(textElement.props.style).toMatchObject(
      expect.objectContaining({
        color: '#FF0000',
      })
    )
  })

  it('applies text alignment', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const

    alignments.forEach(align => {
      const { getByText } = renderWithTheme(
        <Text align={align}>Aligned {align}</Text>
      )
      const textElement = getByText(`Aligned ${align}`)
      expect(textElement.props.style).toMatchObject(
        expect.objectContaining({
          textAlign: align,
        })
      )
    })
  })

  it('applies custom size', () => {
    const { getByText } = renderWithTheme(<Text size="xl">Large text</Text>)
    const textElement = getByText('Large text')
    expect(textElement.props.style).toMatchObject(
      expect.objectContaining({
        fontSize: 20, // xl size from theme
      })
    )
  })

  it('applies custom weight', () => {
    const { getByText } = renderWithTheme(<Text weight="bold">Bold text</Text>)
    const textElement = getByText('Bold text')
    expect(textElement.props.style).toMatchObject(
      expect.objectContaining({
        fontWeight: '700',
      })
    )
  })

  it('merges custom styles', () => {
    const customStyle = { marginTop: 10, opacity: 0.8 }
    const { getByText } = renderWithTheme(
      <Text style={customStyle}>Styled text</Text>
    )
    const textElement = getByText('Styled text')
    expect(textElement.props.style).toMatchObject(
      expect.objectContaining(customStyle)
    )
  })

  it('passes through accessibility props', () => {
    const { getByText } = renderWithTheme(
      <Text accessibilityLabel="Custom label">Accessible text</Text>
    )
    const textElement = getByText('Accessible text')
    expect(textElement.props.accessibilityLabel).toBe('Custom label')
  })
})
