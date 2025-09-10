import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { View } from 'react-native'
import { Input } from '@/src/design-system/components/Input'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Input', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Enter text" />
    )
    expect(getByPlaceholderText('Enter text')).toBeTruthy()
  })

  it('displays label when provided', () => {
    const { getByText } = renderWithTheme(
      <Input label="Email" placeholder="Enter email" />
    )
    expect(getByText('Email')).toBeTruthy()
  })

  it('handles text input correctly', () => {
    const onChangeText = jest.fn()
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Type here" onChangeText={onChangeText} />
    )

    const input = getByPlaceholderText('Type here')
    fireEvent.changeText(input, 'Hello World')
    expect(onChangeText).toHaveBeenCalledWith('Hello World')
  })

  it('displays error message', () => {
    const { getByText } = renderWithTheme(
      <Input
        label="Email"
        error="Invalid email address"
        placeholder="Enter email"
      />
    )
    expect(getByText('Invalid email address')).toBeTruthy()
  })

  it('displays helper text when no error', () => {
    const { getByText } = renderWithTheme(
      <Input
        label="Password"
        helperText="At least 8 characters"
        placeholder="Enter password"
      />
    )
    expect(getByText('At least 8 characters')).toBeTruthy()
  })

  it('prioritizes error over helper text', () => {
    const { getByText, queryByText } = renderWithTheme(
      <Input
        label="Email"
        error="Invalid email"
        helperText="Enter valid email"
        placeholder="Enter email"
      />
    )
    expect(getByText('Invalid email')).toBeTruthy()
    expect(queryByText('Enter valid email')).toBeNull()
  })

  it('renders with outlined variant by default', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Enter text" />
    )
    const input = getByPlaceholderText('Enter text')
    expect(input).toBeTruthy()
  })

  it('renders with filled variant', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input variant="filled" placeholder="Enter text" />
    )
    const input = getByPlaceholderText('Enter text')
    expect(input).toBeTruthy()
  })

  it('renders left icon', () => {
    const LeftIcon = () => <View testID="left-icon" />
    const { getByTestId } = renderWithTheme(
      <Input leftIcon={<LeftIcon />} placeholder="Enter text" />
    )
    expect(getByTestId('left-icon')).toBeTruthy()
  })

  it('renders right icon', () => {
    const RightIcon = () => <View testID="right-icon" />
    const { getByTestId } = renderWithTheme(
      <Input rightIcon={<RightIcon />} placeholder="Enter text" />
    )
    expect(getByTestId('right-icon')).toBeTruthy()
  })

  it('handles disabled state', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Disabled input" editable={false} />
    )
    const input = getByPlaceholderText('Disabled input')
    expect(input.props.editable).toBe(false)
  })

  it('shows error state correctly', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <Input error="Error message" placeholder="Enter text" />
    )
    const input = getByPlaceholderText('Enter text')
    const errorText = getByText('Error message')
    expect(input).toBeTruthy()
    expect(errorText).toBeTruthy()
  })

  it('sets accessibility properties correctly', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        label="Username"
        accessibilityLabel="Username input field"
        placeholder="Enter username"
      />
    )
    const input = getByPlaceholderText('Enter username')
    expect(input.props.accessibilityLabel).toBe('Username input field')
    expect(input.props.accessibilityRole).toBe('text')
  })

  it('uses label as accessibility label when none provided', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input label="Email Address" placeholder="Enter email" />
    )
    const input = getByPlaceholderText('Enter email')
    expect(input.props.accessibilityLabel).toBe('Email Address')
  })

  it('handles secure text entry', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <Input placeholder="Enter password" secureTextEntry />
    )
    const input = getByPlaceholderText('Enter password')
    expect(input.props.secureTextEntry).toBe(true)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>()
    renderWithTheme(<Input ref={ref} placeholder="Enter text" />)
    expect(ref.current).toBeTruthy()
  })
})
