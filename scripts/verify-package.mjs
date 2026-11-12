import assert from 'node:assert/strict'
import { execFile, execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { gzipSync } from 'node:zlib'

const root = fileURLToPath(new URL('../', import.meta.url))
const library = join(root, 'packages', 'inspira-ui')
const scratch = realpathSync(tmpdir())
const consumer = mkdtempSync(join(scratch, 'inspira-package-'))
const tarball = join(consumer, 'library.tgz')
const pnpm = process.env.npm_execpath

const json = (path) => JSON.parse(readFileSync(path, 'utf8'))
const write = (name, value) => writeFileSync(join(consumer, name), value)

function run(args, cwd = consumer, quiet = false) {
  assert(pnpm, 'Run this check with pnpm test:package')
  const binary = /\.(?:c?js|mjs)$/i.test(pnpm) ? process.execPath : pnpm
  const commandArgs = binary === process.execPath ? [pnpm, ...args] : args
  execFileSync(binary, commandArgs, { cwd, stdio: quiet ? ['ignore', 'pipe', 'inherit'] : 'inherit' })
}

async function checkBrowser(entry, output) {
  const chrome = process.env.CHROME_PATH
  if (!chrome) return

  const html = `<html lang="en"><head><meta charset="utf-8"><title>Packaged component check</title></head>
    <body><h1>Host heading</h1><ul><li>Host list</li></ul><p class="p-4" id="host-utility">Host class</p><div id="app"></div>
    <script type="module" src="/${entry.fileName}"></script></body></html>`
  const files = new Map(output.map((file) => [file.fileName, file]))
  const server = createServer((request, response) => {
    if (request.url === '/') {
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      response.end(html)
      return
    }

    const file = files.get(new URL(request.url, 'http://localhost').pathname.slice(1))
    if (!file) {
      response.writeHead(404).end()
      return
    }

    response.setHeader('Content-Type', file.fileName.endsWith('.css') ? 'text/css' : 'text/javascript')
    response.end(file.type === 'asset' ? file.source : file.code)
  })

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  try {
    const flags = [
      '--headless',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--no-first-run',
      '--dump-dom',
      '--virtual-time-budget=6000',
      `--user-data-dir=${join(consumer, 'chrome-profile')}`,
    ]
    if (process.getuid?.() === 0) flags.push('--no-sandbox')
    const { stdout } = await promisify(execFile)(chrome, [
      ...flags, `http://127.0.0.1:${server.address().port}/`,
    ], { timeout: 30000, windowsHide: true })
    assert.match(stdout, /data-package-check="passed"/, stdout)
    console.log('Packed component animation and host CSS verified in Chromium')
  } finally {
    server.close()
  }
}

try {
  const { name } = json(join(library, 'package.json'))
  run(['pack', '--out', tarball], library, true)
  console.log(`Packed ${name} to ${tarball}`)

  const installedVersion = (dependency) => json(join(library, 'node_modules', dependency, 'package.json')).version
  const tools = ['typescript', 'vite', 'vue-tsc']
  write('package.json', JSON.stringify({
    private: true,
    type: 'module',
    dependencies: { [name]: 'file:./library.tgz', vue: installedVersion('vue') },
    devDependencies: Object.fromEntries(tools.map((dependency) => [dependency, installedVersion(dependency)])),
  }))
  write('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler',
      strict: true, skipLibCheck: false, noEmit: true, types: ['vite/client'],
    },
    vueCompilerOptions: { strictTemplates: true },
    include: ['examples/**/*.vue', 'entry-types.ts'],
  }))
  write('entry-types.ts', `
    import { IuDialog, type DialogProps, type DialogExposes } from '${name}'
    const props: DialogProps = { modelValue: false, beforeClose: (done) => done() }
    const close = (instance: DialogExposes) => instance.close()
    void [IuDialog, props, close]
  `)
  execFileSync(process.execPath, [join(root, 'docs', 'scripts', 'write-examples.cjs'), join(consumer, 'examples')], {
    cwd: root, stdio: 'inherit',
  })
  run(['install', '--prefer-offline', '--ignore-scripts'])
  run(['exec', 'vue-tsc', '--noEmit'])
  run(['exec', 'tsc', '--noEmit', '--strict', '--target', 'ES2022', '--module', 'NodeNext', 'entry-types.ts'])

  const installed = join(consumer, 'node_modules', name)
  const publishedFiles = readdirSync(installed)
  assert(publishedFiles.includes('LICENSE'), 'Published package must contain the upstream MIT license')
  assert(publishedFiles.includes('README.md'), 'Published package must contain installation instructions')
  const distFiles = readdirSync(join(installed, 'dist'), { recursive: true })
  assert(!distFiles.some((file) => /(?:\.spec\.d\.|\.wasm$|runtime-webgpu|physics-)/.test(file)),
    'Published dist contains internal test declarations or unrelated heavy assets')
  const css = readFileSync(join(installed, 'dist', 'index.css'), 'utf8')
  assert.match(css, /@keyframes\s+shimmer-btn-shimmer-slide/, 'Scoped ShimmerButton CSS is missing')

  const shimmer = (specifier) => `
    import { createApp, h } from 'vue'
    import { IuShimmerButton } from '${specifier}'
    const hostStyles = () => [getComputedStyle(document.querySelector('h1')).fontSize,
      getComputedStyle(document.querySelector('ul')).listStyleType,
      getComputedStyle(document.querySelector('#host-utility')).paddingTop]
    async function check() {
      const before = hostStyles()
      await import('${name}/dist/index.css')
      createApp({ render: () => h(IuShimmerButton, null, () => 'Packaged shimmer') }).mount('#app')
      const slide = document.querySelector('.animate-shimmer-btn-shimmer-slide')
      if (String(before) !== String(hostStyles())) throw new Error('Host CSS was reset')
      if (!slide || getComputedStyle(slide).animationName === 'none') throw new Error('Shimmer animation is missing')
      document.body.dataset.packageCheck = 'passed'
    }
    check().catch((error) => { document.body.dataset.packageCheck = error.message })
  `
  const require = createRequire(join(consumer, 'package.json'))
  const { build } = await import(pathToFileURL(require.resolve('vite')).href)
  const heavy = /[\\/](?:@splinetool[\\/]runtime|three(?:-globe)?|ogl|gsap|postprocessing)[\\/]/
  const componentPath = `${name}/components/shimmer-button`
  for (const specifier of [name, componentPath]) {
    write('shimmer.mjs', shimmer(specifier))
    const { output } = await build({
      root: consumer,
      configFile: false,
      build: { write: false, rollupOptions: { input: join(consumer, 'shimmer.mjs') } },
    })
    const chunks = output.filter((file) => file.type === 'chunk')
    const wasm = output.filter((file) => file.fileName.endsWith('.wasm'))
    const entry = chunks.find((chunk) => chunk.isEntry)
    assert(entry, 'Consumer build did not emit an entry chunk')
    assert(!chunks.flatMap((chunk) => Object.keys(chunk.modules)).some((id) => heavy.test(id)),
      `${specifier} retains unrelated heavy dependencies`)
    assert(!wasm.some((asset) => chunks.some((chunk) => chunk.code.includes(basename(asset.fileName)))),
      `${specifier} references unrelated WASM`)
    console.log(`${specifier}: ${gzipSync(entry.code).length} bytes gzip JS, ${wasm.length} WASM files`)

    if (specifier === componentPath) {
      assert.equal(wasm.length, 0, 'Component subpath import emits WASM')
      await checkBrowser(entry, output)
    }
  }
} finally {
  if (process.env.KEEP_PACKAGE_FIXTURE === '1') {
    console.log(`External package fixture: ${consumer}`)
  } else if (dirname(realpathSync(consumer)) === scratch && basename(consumer).startsWith('inspira-package-')) {
    rmSync(consumer, { recursive: true, force: true, maxRetries: 3 })
  }
}
