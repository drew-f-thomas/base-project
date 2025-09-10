# Expo Base Project

Opinionated Expo + TypeScript base project with a complete stack for rapid development.

## Stack

- **Expo SDK 53** with Router (file-based routing)
- **TypeScript** with strict mode
- **Design System** in `src/design-system` with typed theme tokens
- **State Management** with Zustand + selector pattern
- **Server State** with TanStack Query
- **Forms** with React Hook Form + Zod validation
- **Storage** with Expo SecureStore abstraction
- **API Layer** with fetch wrapper + Zod validation
- **Environment Config** with Zod validation
- **Testing** with Jest + React Native Testing Library
- **Code Quality** with ESLint + Prettier + Commitlint + Husky
- **CI/CD** with GitHub Actions + EAS Build profiles

## New app from this template

1. Click **Use this template** on GitHub or clone directly:

   ```bash
   git clone <repo-url> my-new-app
   cd my-new-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Update project configuration:
   - Change `name`, `slug` in `app.config.ts`
   - Update `package.json` name and version
   - Set environment variables (see Environment section)

4. Start development:

   ```bash
   npx expo start
   ```

5. (Optional) Configure EAS for builds:
   ```bash
   npx eas build:configure
   ```

## Environment Variables

Create a `.env` file (not committed) with:

```env
EXPO_PUBLIC_API_URL=https://your-api.com
SENTRY_DSN=your-sentry-dsn
EAS_PROJECT_ID=your-eas-project-id
```

Environment validation happens at app startup with helpful error messages in development.

## Project Structure

```
src/
├── config/
│   └── env.ts                    # Environment validation
├── design-system/
│   ├── theme.ts                  # Design tokens
│   ├── ThemeProvider.tsx         # Theme context
│   ├── components/               # UI primitives
│   └── hooks/                    # Theme hooks
├── features/
│   └── example/                  # Feature-based organization
├── lib/
│   ├── api/                      # API client + validation
│   ├── storage/                  # Storage abstraction
│   └── analytics/                # Analytics abstraction
├── state/                        # Zustand stores
└── utils/                        # TypeScript utilities
```

## Available Scripts

```bash
# Development
yarn start                        # Start Expo dev server
yarn ios                          # Open iOS simulator
yarn android                     # Open Android emulator

# Code Quality
yarn typecheck                   # TypeScript check
yarn lint                        # ESLint check
yarn lint:fix                    # ESLint fix
yarn format                      # Prettier format
yarn format:check                # Prettier check

# Testing
yarn test                        # Jest watch mode
yarn test:ci                     # Jest CI mode

# Building
yarn build:preview               # EAS preview build
yarn build:prod                  # EAS production build
yarn update:preview              # EAS update to preview
yarn update:prod                 # EAS update to production
```

## Development Conventions

- **TypeScript**: Descriptive type names, prefer `Array<T>` over `T[]`
- **React**: Function declarations over expressions
- **JSX**: Ternary operators (`cond ? <X/> : null`) not logical AND
- **Imports**: Absolute imports with `@/*` alias
- **Commits**: Conventional commits enforced by commitlint

## Design System Usage

```tsx
import { Box } from '@/src/design-system/components/Box'
import { Text } from '@/src/design-system/components/Text'
import { Button } from '@/src/design-system/components/Button'
import { useTheme } from '@/src/design-system/hooks/useTheme'

function MyComponent() {
  const { colors } = useTheme()

  return (
    <Box padding="lg" backgroundColor={colors.surface}>
      <Text variant="heading">Hello World</Text>
      <Button variant="primary" onPress={() => {}}>
        Action
      </Button>
    </Box>
  )
}
```

## State Management Example

```tsx
// src/state/exampleStore.ts
import { create } from 'zustand'

interface ExampleState {
  count: number
  increment: () => void
}

export const useExampleStore = create<ExampleState>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}))

// Selector hook for performance
export const useCount = () => useExampleStore(state => state.count)
```

## Form Example

```tsx
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function LoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })

  // Form implementation...
}
```

## API Usage

```tsx
import { apiGet, apiPost } from '@/src/lib/api/client'
import { UserSchema } from '@/src/lib/api/schemas'

// GET request with validation
const user = await apiGet('/user/profile', UserSchema)

// POST request with body
const newUser = await apiPost('/user', UserSchema, {
  email: 'user@example.com',
  name: 'John Doe',
})
```

## Contributing

1. Follow conventional commits format
2. Ensure all tests pass (`yarn test:ci`)
3. Run type checking (`yarn typecheck`)
4. Format code (`yarn format`)
5. Pre-commit hooks will enforce these automatically

## License

MIT
