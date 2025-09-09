/**
 * Example usage of the theme system.
 * This file demonstrates how to use the various theme constants in your components.
 * Remove this file in production.
 */

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme, getThemeColors } from './Theme';

export function ThemeExample() {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Typography Examples */}
      <Text style={[styles.h1, { color: colors.text }]}>Heading 1</Text>
      <Text style={[styles.h2, { color: colors.text }]}>Heading 2</Text>
      <Text style={[styles.body, { color: colors.text }]}>
        This is body text with proper spacing and typography.
      </Text>

      {/* Spacing Examples */}
      <View style={styles.spacingExample}>
        <View style={[styles.box, { backgroundColor: colors.tint }]} />
        <View style={[styles.box, { backgroundColor: colors.tint }]} />
        <View style={[styles.box, { backgroundColor: colors.tint }]} />
      </View>

      {/* Button with Theme */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: colors.tint },
          Theme.shadows.button,
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>
          Themed Button
        </Text>
      </Pressable>

      {/* Card with Theme */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.background },
          Theme.shadows.card,
        ]}
      >
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Themed Card
        </Text>
        <Text style={[styles.cardBody, { color: colors.text }]}>
          This card uses theme spacing, colors, and shadows.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.screen.horizontal,
  },

  // Typography styles using theme
  h1: {
    ...Theme.typography.styles.h1,
    marginBottom: Theme.spacing.md,
  },
  h2: {
    ...Theme.typography.styles.h2,
    marginBottom: Theme.spacing.sm,
  },
  body: {
    ...Theme.typography.styles.body,
    marginBottom: Theme.spacing.lg,
  },
  buttonText: {
    ...Theme.typography.styles.button,
  },
  cardTitle: {
    ...Theme.typography.styles.h3,
    marginBottom: Theme.spacing.sm,
  },
  cardBody: {
    ...Theme.typography.styles.body,
  },

  // Spacing examples
  spacingExample: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  box: {
    width: Theme.spacing.xl,
    height: Theme.spacing.xl,
    borderRadius: Theme.borderRadius.md,
  },

  // Button with theme
  button: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.button.medium,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },

  // Card with theme
  card: {
    padding: Theme.spacing.card.padding,
    borderRadius: Theme.borderRadius.card.medium,
    marginBottom: Theme.spacing.card.margin,
  },
});
