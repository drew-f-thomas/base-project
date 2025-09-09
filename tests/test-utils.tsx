import { render, RenderOptions } from '@testing-library/react-native';
import React from 'react';

// Mock the useTheme hook for testing
const mockTheme = {
  colors: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  typography: {
    styles: {
      body: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 1.5,
      },
      title: {
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 1.2,
      },
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  colorScheme: 'light' as const,
};

// Mock ThemeProvider component
const MockThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return React.createElement(React.Fragment, {}, children);
};

// Custom render function that includes theme context
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: MockThemeProvider,
    ...options,
  });
};

// Re-export everything
export * from '@testing-library/react-native';
export { customRender as render };

// Mock theme for use in tests
export { mockTheme };

// Helper function to create test components with theme
export const createTestComponent = (Component: React.ComponentType<any>) => {
  const TestComponent = (props: any) =>
    React.createElement(
      MockThemeProvider,
      {},
      React.createElement(Component, props)
    );
  TestComponent.displayName = `TestComponent(${Component.displayName || Component.name})`;
  return TestComponent;
};
