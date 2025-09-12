# Base Project

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

## Creating a New App

You can consume this template in two ways:

**Option A — GitHub Template**

1. Click **Use this template** on GitHub to create a new repo.
2. Clone it:

   ```bash
   git clone <your-new-repo-url> my-new-app
   cd my-new-app
   ```

3. Run the bootstrap script (see below).

**Option B — create-expo-app**

```bash
npx create-expo-app my-new-app \
  --template https://github.com/<you>/<this-repo>/tree/main
```

---

### Bootstrap Script

After creating a new project, run:

```bash
node scripts/bootstrap.js
```

This will:

- Update `name`, `slug`, and `scheme` in `app.config.ts`
- Set `ios.bundleIdentifier` and `android.package`
- Update `package.json` `"name"`
- Scrub the EAS project link so you can re-run `npx eas init`
- (Optionally) update README title
- (Optionally) re-init git history

You can pass flags to skip prompts:

```bash
node scripts/bootstrap.js \
  --name "Acme Mobile" \
  --slug acme-mobile \
  --scheme acmemobile \
  --ios com.acme.mobile \
  --android com.acme.mobile \
  --yes --skip-readme --keep-git
```

---

## Environment Variables

Create a `.env` file (not committed) with:

```env
EXPO_PUBLIC_API_URL=https://your-api.com
SENTRY_DSN=your-sentry-dsn
EAS_PROJECT_ID=your-eas-project-id
```

Environment validation happens at app startup with helpful error messages in development.

---

## Project Structure

```
src/
├── config/         # Environment validation
├── design-system/  # Theme, components, hooks
├── features/       # Feature-based organization
├── lib/            # API, storage, analytics
├── state/          # Zustand stores
└── utils/          # TypeScript utilities
```

---

## Available Scripts

```bash
# Development
yarn start          # Start Expo dev server
yarn ios            # Open iOS simulator
yarn android        # Open Android emulator

# Code Quality
yarn typecheck      # TypeScript check
yarn lint           # ESLint check
yarn lint:fix       # ESLint fix
yarn format         # Prettier format
yarn format:check   # Prettier check

# Testing
yarn test           # Jest watch mode
yarn test:ci        # Jest CI mode

# Building
yarn build:preview  # EAS preview build
yarn build:prod     # EAS production build
yarn update:preview # EAS update to preview
yarn update:prod    # EAS update to production
```

---

## Development Conventions

- **TypeScript**: Descriptive type names, prefer `Array<T>` over `T[]`
- **React**: Function declarations over expressions
- **JSX**: Use ternaries (`cond ? <X/> : null`) not logical AND
- **Imports**: Absolute imports with `@/*` alias
- **Commits**: Conventional commits enforced by commitlint

---

## Release & Upgrades

- `main` branch tracks the newest Expo SDK.
- Cut tags per SDK: `vX.Y.Z-sdk53`.
- Use Renovate + CI smoke tests to keep dependencies aligned.
- When upgrading Expo:
  - Run `npx expo upgrade && npx expo install --fix`
  - Update code for breaking changes
  - Run `yarn typecheck`, `yarn test:ci`, `npx expo-doctor`
  - Tag and release a new version

Consumers can pin to a specific tag:

```bash
npx create-expo-app my-app \
  --template https://github.com/<you>/<this-repo>/tree/v1.4.0-sdk54
```
