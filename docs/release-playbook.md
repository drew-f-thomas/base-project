# Template Release Playbook

This repo is a **template** for Expo apps. We cut tagged releases per Expo SDK and keep `main` on the newest SDK.

## Branching / Tagging

- `main`: newest Expo SDK, continuously updated.
- `sdk-53`, `sdk-54`, …: optional maintenance branches if we need backports.
- Tags: `vX.Y.Z-sdk53` (bump X.Y.Z for template features/fixes, keep `sdkNN` suffix aligned with Expo SDK).

## Dependencies policy

- Expo core packages: pinned (no `^`). Upgrades gated by `npx expo upgrade`.
- Renovate opens grouped PRs (`expo-sdk`, `react-native-core`, etc.). Merge in order:
  1. `expo-sdk`
  2. `react-native-core`
  3. `state-and-data`
  4. `testing`
  5. `lint-and-build`

## Upgrade to a new Expo SDK

1. **Create a working branch**

   ```bash
   git checkout -b chore/upgrade-sdk54
   ```

2. **Upgrade**

   ```bash
   npx expo upgrade
   npx expo install --fix
   ```

3. **Audit & adjust code**
   - Fix any SDK breaking changes (routing, config, plugins).
   - Run codemods if Expo RN changes require it.
   - Update our template code (design-system, hooks, env validation) if APIs changed.

4. **Local smoke**

   ```bash
   yarn typecheck
   yarn lint
   yarn test:ci
   npx expo-doctor
   # Optional:
   npx expo prebuild --clean --non-interactive
   ```

5. **CI smoke**
   Open PR and ensure **Template Smoke** workflow is green.

6. **Docs**
   - Update `README.md` “current SDK”.
   - Add a brief `CHANGELOG.md` section for the release.
   - If there are consumer-facing breaking changes (template API), write a short **UPGRADE GUIDE** in `docs/`.

7. **Release**

   ```bash
   git tag v1.4.0-sdk54
   git push origin v1.4.0-sdk54
   ```

   - Create a GitHub Release from the tag with highlights.
   - Keep `main` at SDK 54 after merging.

8. **Consumers**
   - Document pinned creation:

     ```bash
     npx create-expo-app --template https://github.com/<you>/<template>/tree/v1.4.0-sdk54
     ```

   - If they need older SDK:

     ```bash
     npx create-expo-app --template https://github.com/<you>/<template>/tree/v1.3.0-sdk53
     ```

## Operational checks

- **Renovate running?** See open PRs weekly.
- **CI passing on main?** The smoke workflow must remain green.
- **Lockfile committed?** Yes—template reproducibility.

## Notes

- Prefer **one grouped PR** for Expo SDK upgrades (Renovate plus manual `expo upgrade`).
- Keep **breaking changes minimal** in template public API (e.g., design-system component props).
