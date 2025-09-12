import { useUpdateCheck } from '@/src/lib/updates/useUpdates'
import { useTheme } from '@/src/design-system/hooks/useTheme'
import { Button, Box, Text } from '@/src/design-system/components'

export default function Settings() {
  const { colorScheme, toggleColorScheme } = useTheme()
  const check = useUpdateCheck()
  return (
    <Box padding="lg">
      <Text variant="subheading">Settings</Text>
      <Button
        onPress={() => toggleColorScheme?.()}
      >{`Theme: ${colorScheme}`}</Button>
      <Button onPress={check}>Check for update</Button>
    </Box>
  )
}
