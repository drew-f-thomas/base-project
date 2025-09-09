import { View } from '@/components/theme-components';
import { render, screen } from '@testing-library/react-native';
import React from 'react';

describe('View Component', () => {
  it('renders with default variant', () => {
    render(<View testID="test-view">Content</View>);
    expect(screen.getByTestId('test-view')).toBeTruthy();
  });

  it('renders with card variant', () => {
    render(
      <View variant="card" testID="card-view">
        Card Content
      </View>
    );
    expect(screen.getByTestId('card-view')).toBeTruthy();
  });

  it('renders with button variant', () => {
    render(
      <View variant="button" testID="button-view">
        Button Content
      </View>
    );
    expect(screen.getByTestId('button-view')).toBeTruthy();
  });

  it('renders with input variant', () => {
    render(
      <View variant="input" testID="input-view">
        Input Content
      </View>
    );
    expect(screen.getByTestId('input-view')).toBeTruthy();
  });

  it('renders with elevated variant', () => {
    render(
      <View variant="elevated" testID="elevated-view">
        Elevated Content
      </View>
    );
    expect(screen.getByTestId('elevated-view')).toBeTruthy();
  });

  it('renders with custom padding', () => {
    render(
      <View padding="md" testID="padded-view">
        Padded Content
      </View>
    );
    expect(screen.getByTestId('padded-view')).toBeTruthy();
  });

  it('renders with custom border radius', () => {
    render(
      <View borderRadius="lg" testID="rounded-view">
        Rounded Content
      </View>
    );
    expect(screen.getByTestId('rounded-view')).toBeTruthy();
  });

  it('renders with custom shadow', () => {
    render(
      <View shadow="card" testID="shadowed-view">
        Shadowed Content
      </View>
    );
    expect(screen.getByTestId('shadowed-view')).toBeTruthy();
  });

  it('renders with custom background color', () => {
    render(
      <View backgroundColor="tint" testID="tinted-view">
        Tinted Content
      </View>
    );
    expect(screen.getByTestId('tinted-view')).toBeTruthy();
  });

  it('renders with lightColor and darkColor props', () => {
    render(
      <View lightColor="#ffffff" darkColor="#000000" testID="themed-view">
        Themed Content
      </View>
    );
    expect(screen.getByTestId('themed-view')).toBeTruthy();
  });

  it('renders with custom style', () => {
    render(
      <View style={{ flex: 1 }} testID="styled-view">
        Styled Content
      </View>
    );
    expect(screen.getByTestId('styled-view')).toBeTruthy();
  });
});
