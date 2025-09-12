#!/usr/bin/env node
/**
 * Template Bootstrap Script
 *
 * What it does:
 * - Updates app name, slug, scheme in app.config.ts
 * - Adds/updates ios.bundleIdentifier and android.package in app.config.ts
 * - Updates package.json "name"
 * - Scrubs EAS project link (extra.eas.projectId) so new apps don’t share the template project
 * - (Optional) Updates README title
 * - (Optional) Re-initializes git to start clean history
 *
 * Usage (flags override prompts):
 *   node scripts/bootstrap.js \
 *     --name "My New App" \
 *     --slug my-new-app \
 *     --scheme mynewapp \
 *     --ios com.myco.mynewapp \
 *     --android com.myco.mynewapp \
 *     --skip-readme \
 *     --keep-git \
 *     --yes
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const ROOT = process.cwd()
const APP_CONFIG = path.join(ROOT, 'app.config.ts')
const PACKAGE_JSON = path.join(ROOT, 'package.json')
const README = path.join(ROOT, 'README.md')
const GIT_DIR = path.join(ROOT, '.git')

/* ---------- helpers ---------- */

const args = process.argv.slice(2)
const flags = new Map()
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a.startsWith('--')) {
    const key = a.replace(/^--/, '')
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true
    flags.set(key, val)
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const ask = q => new Promise(res => rl.question(q, ans => res(ans.trim())))

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-_ ]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function isValidBundleId(id) {
  // com.example.app; labels start with letter, then letters/digits/-; 2+ segments
  return /^[a-zA-Z][a-zA-Z0-9-]*(\.[a-zA-Z][a-zA-Z0-9-]*)+$/.test(id)
}

function readFileSafe(file) {
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, 'utf8')
}

function writeFileBackup(file, content) {
  if (!fs.existsSync(file)) return
  fs.writeFileSync(file + '.bak', fs.readFileSync(file))
  fs.writeFileSync(file, content)
}

function replaceOrInsertExpoConfig(
  ts,
  { name, slug, scheme, iosBundleId, androidPackage }
) {
  let s = ts

  // Simple replacements for name/slug/scheme
  s = s.replace(/name:\s*'[^']*'/, `name: '${name}'`)
  s = s.replace(/slug:\s*'[^']*'/, `slug: '${slug}'`)
  s = s.replace(/scheme:\s*'[^']*'/, `scheme: '${scheme}'`)

  // Insert/replace ios.bundleIdentifier
  if (/ios:\s*\{[^}]*\}/s.test(s)) {
    s = s.replace(/ios:\s*\{\s*([^}]*)\}/s, (m, inner) => {
      let block = inner
      if (/bundleIdentifier:\s*'[^']*'/.test(block)) {
        block = block.replace(
          /bundleIdentifier:\s*'[^']*'/,
          `bundleIdentifier: '${iosBundleId}'`
        )
      } else {
        // add at top of ios block
        block = `bundleIdentifier: '${iosBundleId}',\n    ` + block
      }
      return `ios: {\n    ${block}\n  }`
    })
  }

  // Insert/replace android.package
  if (/android:\s*\{[^}]*\}/s.test(s)) {
    s = s.replace(/android:\s*\{\s*([^}]*)\}/s, (m, inner) => {
      let block = inner
      if (/package:\s*'[^']*'/.test(block)) {
        block = block.replace(
          /package:\s*'[^']*'/,
          `package: '${androidPackage}'`
        )
      } else {
        // place near adaptiveIcon or edgeToEdgeEnabled
        block = block.replace(
          /(\s*adaptiveIcon:\s*\{[\s\S]*?\},?)/,
          `$1\n    package: '${androidPackage}',`
        )
        if (!/package:\s*'/.test(block)) {
          // fallback add at top
          block = `package: '${androidPackage}',\n    ` + block
        }
      }
      return `android: {\n    ${block}\n  }`
    })
  }

  // Scrub EAS project link (avoid sharing template project)
  s = s.replace(
    /eas:\s*\{\s*projectId:\s*process\.env\.EAS_PROJECT_ID\s*\}/,
    `eas: {\n      projectId: undefined, // set via 'eas init' in the new app\n    }`
  )

  return s
}

/* ---------- main ---------- */

;(async function main() {
  const defaults = {
    name: typeof flags.get('name') === 'string' ? flags.get('name') : 'My App',
    slug:
      typeof flags.get('slug') === 'string'
        ? flags.get('slug')
        : slugify(flags.get('name') || 'My App'),
    scheme:
      typeof flags.get('scheme') === 'string'
        ? flags.get('scheme')
        : slugify(flags.get('name') || 'My App').replace(/-/g, ''),
    ios:
      typeof flags.get('ios') === 'string'
        ? flags.get('ios')
        : 'com.example.myapp',
    android:
      typeof flags.get('android') === 'string'
        ? flags.get('android')
        : 'com.example.myapp',
    yes: !!flags.get('yes'),
    skipReadme: !!flags.get('skip-readme'),
    keepGit: !!flags.get('keep-git'),
  }

  // Interactive prompts if not provided
  const NAME = defaults.yes
    ? defaults.name
    : (await ask(`App display name (${defaults.name}): `)) || defaults.name
  const SLUG = defaults.yes
    ? defaults.slug
    : slugify(
        (await ask(`App slug [kebab-case] (${defaults.slug}): `)) ||
          defaults.slug
      )
  const SCHEME = defaults.yes
    ? defaults.scheme
    : (await ask(`URL scheme (no spaces) (${defaults.scheme}): `)) ||
      defaults.scheme

  let IOS_BUNDLE = defaults.yes
    ? defaults.ios
    : (await ask(`iOS bundle identifier (${defaults.ios}): `)) || defaults.ios
  while (!isValidBundleId(IOS_BUNDLE)) {
    console.log('  ✖ Invalid bundle id. Example: com.company.app')
    IOS_BUNDLE =
      (await ask(`iOS bundle identifier (${defaults.ios}): `)) || defaults.ios
  }

  let ANDROID_PACKAGE = defaults.yes
    ? defaults.android
    : (await ask(`Android applicationId (${defaults.android}): `)) ||
      defaults.android
  while (!isValidBundleId(ANDROID_PACKAGE)) {
    console.log('  ✖ Invalid package. Example: com.company.app')
    ANDROID_PACKAGE =
      (await ask(`Android applicationId (${defaults.android}): `)) ||
      defaults.android
  }

  const UPDATE_README = defaults.yes
    ? !defaults.skipReadme
    : !/^(n|no)$/i.test((await ask('Update README title? (Y/n): ')) || 'y')
  const KEEP_GIT = defaults.yes
    ? defaults.keepGit
    : /^(y|yes)$/i.test(
        (await ask('Keep current .git history? (y/N): ')) || 'n'
      )

  console.log('\nPlanned changes:')
  console.log(
    `  • app.config.ts  name='${NAME}', slug='${SLUG}', scheme='${SCHEME}'`
  )
  console.log(`  • app.config.ts  ios.bundleIdentifier='${IOS_BUNDLE}'`)
  console.log(`  • app.config.ts  android.package='${ANDROID_PACKAGE}'`)
  console.log(`  • package.json   name='${SLUG}'`)
  console.log(`  • app.config.ts  extra.eas.projectId → undefined`)
  if (UPDATE_README && fs.existsSync(README))
    console.log(`  • README.md      title → '${NAME}'`)
  console.log(`  • Git history    ${KEEP_GIT ? 'KEEP' : 'RE-INIT'}`)

  if (!defaults.yes) {
    const confirm = (await ask('\nProceed? (Y/n): ')) || 'y'
    if (!/^(y|yes)$/i.test(confirm)) {
      console.log('Aborted.')
      rl.close()
      process.exit(0)
    }
  }

  try {
    // 1) package.json
    const pkgRaw = readFileSafe(PACKAGE_JSON)
    if (!pkgRaw) throw new Error('package.json not found')
    const pkg = JSON.parse(pkgRaw)
    pkg.name = SLUG
    writeFileBackup(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + '\n')
    console.log('✔ package.json updated')

    // 2) app.config.ts
    const cfgRaw = readFileSafe(APP_CONFIG)
    if (!cfgRaw) throw new Error('app.config.ts not found')
    const cfgNext = replaceOrInsertExpoConfig(cfgRaw, {
      name: NAME,
      slug: SLUG,
      scheme: SCHEME,
      iosBundleId: IOS_BUNDLE,
      androidPackage: ANDROID_PACKAGE,
    })
    writeFileBackup(APP_CONFIG, cfgNext)
    console.log('✔ app.config.ts updated')

    // 3) README
    if (UPDATE_README && fs.existsSync(README)) {
      let readme = fs.readFileSync(README, 'utf8')
      // Replace first markdown H1
      readme = readme.replace(/^#\s+.*$/m, `# ${NAME}`)
      writeFileBackup(README, readme)
      console.log('✔ README.md updated')
    }

    // 4) Git handling
    if (!KEEP_GIT && fs.existsSync(GIT_DIR)) {
      // Remove and re-init
      fs.rmSync(GIT_DIR, { recursive: true, force: true })
      require('child_process').execSync('git init -b main', {
        stdio: 'inherit',
      })
      require('child_process').execSync('git add .', { stdio: 'inherit' })
      require('child_process').execSync(
        'git commit -m "chore: bootstrap from template"',
        {
          stdio: 'inherit',
        }
      )
      console.log('✔ Git re-initialized')
    }

    console.log('\n✅ Bootstrap complete.')
    console.log('\nNext steps:')
    console.log('  1) yarn install')
    console.log('  2) npx expo start')
    console.log('  3) (Optional) npx eas init  # to link a new EAS project')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  } finally {
    rl.close()
  }
})()
