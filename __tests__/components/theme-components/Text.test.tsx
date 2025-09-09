import { Text } from '@/components/theme-components';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

describe('Text Component', () => {
  it('renders with default variant', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('renders with title variant', () => {
    render(<Text variant="title">Title Text</Text>);
    expect(screen.getByText('Title Text')).toBeTruthy();
  });

  it('renders with body variant', () => {
    render(<Text variant="body">Body Text</Text>);
    expect(screen.getByText('Body Text')).toBeTruthy();
  });

  it('renders with custom color', () => {
    render(<Text color="tint">Tinted Text</Text>);
    expect(screen.getByText('Tinted Text')).toBeTruthy();
  });

  it('renders with custom style', () => {
    render(<Text style={{ fontSize: 20 }}>Styled Text</Text>);
    expect(screen.getByText('Styled Text')).toBeTruthy();
  });

  it('renders with lightColor and darkColor props', () => {
    render(
      <Text lightColor="#000000" darkColor="#ffffff">
        Themed Text
      </Text>
    );
    expect(screen.getByText('Themed Text')).toBeTruthy();
  });

  it('renders heading variants correctly', () => {
    render(<Text variant="h1">H1 Heading</Text>);
    expect(screen.getByText('H1 Heading')).toBeTruthy();

    render(<Text variant="h2">H2 Heading</Text>);
    expect(screen.getByText('H2 Heading')).toBeTruthy();

    render(<Text variant="h3">H3 Heading</Text>);
    expect(screen.getByText('H3 Heading')).toBeTruthy();

    render(<Text variant="h4">H4 Heading</Text>);
    expect(screen.getByText('H4 Heading')).toBeTruthy();
  });

  it('renders link variant correctly', () => {
    render(<Text variant="link">Link Text</Text>);
    expect(screen.getByText('Link Text')).toBeTruthy();
  });

  it('renders button variant correctly', () => {
    render(<Text variant="button">Button Text</Text>);
    expect(screen.getByText('Button Text')).toBeTruthy();
  });

  it('renders caption variant correctly', () => {
    render(<Text variant="caption">Caption Text</Text>);
    expect(screen.getByText('Caption Text')).toBeTruthy();
  });
});
