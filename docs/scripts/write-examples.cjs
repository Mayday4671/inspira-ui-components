const { mkdirSync, readFileSync, writeFileSync } = require('node:fs')
const { createRequire } = require('node:module')
const { dirname, join, resolve } = require('node:path')
const ts = require('typescript')
const { parse } = require('vue/compiler-sfc')

const outputDir = process.argv[2]
if (!outputDir) throw new Error('Usage: node docs/scripts/write-examples.cjs <output-directory>')

const registryPath = join(__dirname, '../src/data/registry.ts')
const manifest = require('../../packages/inspira-ui/package.json')
const registryRequire = createRequire(registryPath)
const source = readFileSync(registryPath, 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText

function loadRegistryImport(id) {
  if (id.endsWith('.vue?raw')) return readFileSync(resolve(dirname(registryPath), id.slice(0, -4)), 'utf8')
  return registryRequire(id)
}

const registry = { exports: {} }
new Function('exports', 'require', compiled)(registry.exports, loadRegistryImport)

function findComponentTags(node, tags) {
  if (!node) return
  if (node.type === 1 && /^Iu[A-Z]/.test(node.tag)) tags.add(node.tag)
  for (const child of node.children ?? []) findComponentTags(child, tags)
}

const examples = new Map()
const diagnostics = []
for (const { slug, importName, demoCode, demoState } of registry.exports.COMPONENTS) {
  const filename = `${slug}.vue`
  if (examples.has(filename)) throw new Error(`Duplicate docs example: ${filename}`)
  const example = demoCode(demoState)
  examples.set(filename, example)

  const { descriptor, errors } = parse(example, { filename })
  for (const error of errors) diagnostics.push(`${filename}: ${error.message ?? error}`)
  const script = ts.createSourceFile(filename, descriptor.scriptSetup?.content ?? '', ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  for (const error of script.parseDiagnostics) diagnostics.push(`${filename}: ${ts.flattenDiagnosticMessageText(error.messageText, '\n')}`)

  const imports = script.statements.filter(ts.isImportDeclaration)
  const namedComponents = new Set()
  for (const entry of imports) {
    const specifier = entry.moduleSpecifier.text
    if (specifier !== manifest.name && !specifier.startsWith(`${manifest.name}/components/`)) continue
    const bindings = entry.importClause?.namedBindings
    if (!entry.importClause?.isTypeOnly && bindings && ts.isNamedImports(bindings)) {
      for (const binding of bindings.elements) {
        if (!binding.isTypeOnly) namedComponents.add(binding.name.text)
      }
    }
  }
  const componentTags = new Set([importName])
  findComponentTags(descriptor.template?.ast, componentTags)
  for (const name of componentTags) {
    if (!namedComponents.has(name)) diagnostics.push(`${filename}: explicitly import ${name} from ${manifest.name}`)
  }
  if (!imports.some((entry) => entry.moduleSpecifier.text === `${manifest.name}/dist/index.css`)) {
    diagnostics.push(`${filename}: import the published stylesheet`)
  }
}

if (diagnostics.length) {
  console.error(diagnostics.join('\n'))
  process.exitCode = 1
} else {
  mkdirSync(outputDir, { recursive: true })
  for (const [filename, example] of examples) writeFileSync(join(outputDir, filename), example)
  console.log(`Wrote ${examples.size} documentation examples to ${resolve(outputDir)}`)
}
