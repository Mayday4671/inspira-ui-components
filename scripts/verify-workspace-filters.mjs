import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const rootPackage = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const packageDirs = [
  ...(await readdir(resolve(root, 'packages'), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => resolve(root, 'packages', entry.name)),
  resolve(root, 'playground'),
  resolve(root, 'docs'),
]

const workspaceNames = new Set()
for (const directory of packageDirs) {
  const manifest = JSON.parse(await readFile(resolve(directory, 'package.json'), 'utf8'))
  workspaceNames.add(manifest.name)
}

for (const [name, command] of Object.entries(rootPackage.scripts ?? {})) {
  const matches = [...String(command).matchAll(/--filter\s+([^\s]+)/g)]
  for (const [, filter] of matches) {
    assert.ok(
      workspaceNames.has(filter),
      `root script "${name}" filters unknown workspace package "${filter}"`,
    )
  }
}

console.log(`verified ${workspaceNames.size} workspace package names`)
