import React from 'react'
import { render } from '@testing-library/react-native'
import { Loading } from '@/src/design-system/components/Loading'
import { ThemeProvider } from '@/src/design-system/ThemeProvider'

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>)
}

describe('Loading', () => {
  it('renders activity indicator', () => {
    const { getByTestId } = renderWithTheme(
      <Loading testID="loading-spinner" />
    )
    expect(getByTestId('loading-spinner')).toBeTruthy()
  })

  it('displays loading text when provided', () => {
    const { getByText } = renderWithTheme(<Loading text="Loading data..." />)
    expect(getByText('Loading data...')).toBeTruthy()
  })

  it('renders without text by default', () => {
    const { queryByText } = renderWithTheme(<Loading />)
    expect(queryByText('Loading')).toBeNull()
  })

  it('renders small size correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Loading size="small" testID="small-loading" />
    )
    const indicator = getByTestId('small-loading')
    expect(indicator.props.size).toBe('small')
  })

  it('renders large size by default', () => {
    const { getByTestId } = renderWithTheme(
      <Loading testID="default-loading" />
    )
    const indicator = getByTestId('default-loading')
    expect(indicator.props.size).toBe('large')
  })

  it('applies custom color', () => {
    const customColor = '#FF0000'
    const { getByTestId } = renderWithTheme(
      <Loading color={customColor} testID="colored-loading" />
    )
    const indicator = getByTestId('colored-loading')
    expect(indicator.props.color).toBe(customColor)
  })

  it('renders overlay variant', () => {
    const { getByText } = renderWithTheme(
      <Loading overlay text="Loading overlay..." />
    )
    expect(getByText('Loading overlay...')).toBeTruthy()
  })

  it('renders inline variant by default', () => {
    const { getByText } = renderWithTheme(<Loading text="Inline loading..." />)
    expect(getByText('Inline loading...')).toBeTruthy()
  })

  it('forwards additional ActivityIndicator props', () => {
    const { getByTestId } = renderWithTheme(
      <Loading
        testID="custom-loading"
        animating={false}
        hidesWhenStopped={false}
      />
    )
    const indicator = getByTestId('custom-loading')
    expect(indicator.props.animating).toBe(false)
    expect(indicator.props.hidesWhenStopped).toBe(false)
  })

  it('handles accessibility correctly', () => {
    const { getByTestId } = renderWithTheme(
      <Loading
        testID="accessible-loading"
        accessibilityLabel="Loading content"
      />
    )
    const indicator = getByTestId('accessible-loading')
    expect(indicator.props.accessibilityLabel).toBe('Loading content')
  })
})
