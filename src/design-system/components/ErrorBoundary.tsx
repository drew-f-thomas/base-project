import React, { Component, ReactNode } from 'react'
import { Box } from './Box'
import { Text } from './Text'
import { Button } from './Button'
import { Card } from './Card'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry)
      }

      return (
        <Box flex={1} alignItems="center" justifyContent="center" padding="lg">
          <Card variant="outlined" style={{ maxWidth: 400 }}>
            <Box alignItems="center" gap="md">
              <Text variant="heading" style={{ textAlign: 'center' }}>
                Something went wrong
              </Text>

              <Text variant="body" style={{ textAlign: 'center' }}>
                We&apos;re sorry, but something unexpected happened. Please try
                again.
              </Text>

              {__DEV__ ? (
                <Box
                  backgroundColor="#f5f5f5"
                  padding="sm"
                  borderRadius="sm"
                  style={{ width: '100%' }}
                >
                  <Text
                    variant="caption"
                    style={{
                      fontFamily: 'monospace',
                      color: '#666',
                    }}
                  >
                    {this.state.error.message}
                  </Text>
                </Box>
              ) : null}

              <Button
                variant="primary"
                onPress={this.handleRetry}
                style={{ minWidth: 120 }}
              >
                Try Again
              </Button>
            </Box>
          </Card>
        </Box>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}
