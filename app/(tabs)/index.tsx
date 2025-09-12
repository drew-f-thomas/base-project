import React from 'react'
import { ScrollView } from 'react-native'
import { Box } from '@/src/design-system/components/Box'
import { Text } from '@/src/design-system/components/Text'
import { Card } from '@/src/design-system/components/Card'
import { Button } from '@/src/design-system/components/Button'
import { ExampleLoginForm } from '@/src/features/example/ExampleForm'

export default function Index() {
  return (
    <ScrollView>
      <Box padding="lg">
        <Text variant="heading">Base Project</Text>

        <Box marginVertical="md">
          <Card variant="filled">
            <Text variant="subheading">Welcome to your base app</Text>
            <Text style={{ marginTop: 8 }}>
              This starter includes Expo Router, design system, Zustand,
              TanStack Query, React Hook Form with Zod validation, and more.
            </Text>
            <Box marginVertical="md">
              <Button
                variant="primary"
                onPress={() => console.log('Replace with your navigation')}
              >
                Get Started
              </Button>
            </Box>
          </Card>
        </Box>

        <Box marginVertical="lg">
          <Text variant="subheading" style={{ marginBottom: 16 }}>
            Example Form
          </Text>
          <ExampleLoginForm />
        </Box>
      </Box>
    </ScrollView>
  )
}
