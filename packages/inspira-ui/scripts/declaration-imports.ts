import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import ts from 'typescript'

function rewriteImports(filePath: string, content: string, rewrite: (path: string) => string) {
  const source = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)
  const edits: { start: number; end: number; value: string }[] = []

  function visit(node: ts.Node) {
    const path = ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
      ? node.moduleSpecifier
      : ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)
        ? node.argument.literal
        : undefined

    if (path && ts.isStringLiteral(path)) {
      const value = rewrite(path.text)
      if (value !== path.text) edits.push({ start: path.getStart(source) + 1, end: path.end - 1, value })
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
  for (const { start, end, value } of edits.reverse()) {
    content = content.slice(0, start) + value + content.slice(end)
  }
  return content
}

const isRelative = (path: string) => /^\.\.?(?:\/|$)/.test(path)
const oglDeclarationPath = 'types/ogl'

// The source uses bundler resolution. Give the emitted declaration graph
// explicit ESM paths so TypeScript consumers can also use NodeNext.
export function resolveDeclarationImports(srcDir: string, outDir: string) {
  return (filePath: string, content: string) => {
    const sourceDir = dirname(resolve(srcDir, relative(outDir, filePath)))

    return {
      content: rewriteImports(filePath, content, (path) => {
        if (path === 'ogl') {
          const specifier = relative(dirname(filePath), resolve(outDir, oglDeclarationPath, 'index.js')).replace(/\\/g, '/')
          return isRelative(specifier) ? specifier : `./${specifier}`
        }
        if (!isRelative(path)) return path

        const target = resolve(sourceDir, path)
        if (path.endsWith('.vue') || existsSync(`${target}.ts`)) return `${path}.js`
        if (existsSync(resolve(target, 'index.ts'))) return `${path}/index.js`
        return path
      }),
    }
  }
}

// OGL's declarations are Unlicensed, and its public index uses extensionless
// imports. Distribute a corrected copy so OGL-backed props and exported types
// keep their shape without forcing NodeNext consumers to skip type checking.
export function emitOglDeclarations(outDir: string) {
  const oglEntry = createRequire(import.meta.url).resolve('ogl')
  const oglTypes = resolve(dirname(oglEntry), '../types')

  for (const entry of readdirSync(oglTypes, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.d.ts')) continue
    const sourcePath = resolve(entry.parentPath, entry.name)
    const outputPath = resolve(outDir, oglDeclarationPath, relative(oglTypes, sourcePath))
    const content = rewriteImports(sourcePath, readFileSync(sourcePath, 'utf8'), (path) =>
      isRelative(path) && existsSync(resolve(dirname(sourcePath), `${path}.d.ts`)) ? `${path}.js` : path,
    )
    mkdirSync(dirname(outputPath), { recursive: true })
    writeFileSync(outputPath, content)
  }
}
