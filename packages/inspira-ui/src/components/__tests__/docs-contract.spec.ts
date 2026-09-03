import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const projectRoot = resolve(process.cwd(), '../..')
const examplesRoot = resolve(projectRoot, 'docs/examples')
const docsConfig = resolve(projectRoot, 'docs/.vitepress/config.mts')
const packageJson = resolve(projectRoot, 'packages/inspira-ui/package.json')
const demoBlock = resolve(projectRoot, 'docs/demo/demo-block.vue')
const customCss = resolve(projectRoot, 'docs/.vitepress/theme/custom.css')

async function findBasicExamples(): Promise<string[]> {
  const componentDirectories = await readdir(examplesRoot, { withFileTypes: true })
  return componentDirectories
    .filter((entry) => entry.isDirectory())
    .map((entry) => resolve(examplesRoot, entry.name, 'basic.vue'))
}

describe('recommended documentation examples', () => {
  it('contains no presentation-only style blocks', async () => {
    const offenders: string[] = []
    for (const file of await findBasicExamples()) {
      const source = await readFile(file, 'utf8')
      if (source.includes('<style')) offenders.push(file)
    }
    expect(offenders).toEqual([])
  })

  it('contains no demo-only class names', async () => {
    const offenders: string[] = []
    for (const file of await findBasicExamples()) {
      const source = await readFile(file, 'utf8')
      if (/class=["'][^"']*demo-/.test(source)) offenders.push(file)
    }
    expect(offenders).toEqual([])
  })
})

describe('documentation information architecture', () => {
  it('keeps search, overview, version, and repository metadata truthful', async () => {
    const config = await readFile(docsConfig, 'utf8')
    const manifest = JSON.parse(await readFile(packageJson, 'utf8')) as {
      version: string
      repository?: { url?: string }
      bugs?: { url?: string }
      homepage?: string
    }

    expect(config).not.toMatch(/^\s{2}search:/m)
    expect(config).toMatch(/themeConfig:\s*{[\s\S]*?search:\s*{/)
    expect(config).toContain("link: '/components/'")
    expect(config).toContain(`text: 'v${manifest.version}'`)
    expect(manifest.repository?.url).toContain('Mayday4671/inspira-ui-components')
    expect(manifest.bugs?.url).toContain('Mayday4671/inspira-ui-components/issues')
    expect(manifest.homepage).toContain('Mayday4671/inspira-ui-components')
  })

  it('keeps presentation controls inside DemoBlock', async () => {
    const source = await readFile(demoBlock, 'utf8')
    expect(source).toContain("layout?: 'row' | 'column' | 'center' | 'grid'")
    expect(source).toContain("surface?: 'default' | 'light' | 'dark' | 'checker'")
    expect(source).toContain('minHeight?: number | string')
    expect(source).toContain('aria-label="复制示例代码"')
    expect(source).toContain('aria-label="切换示例代码"')
  })

  it('uses the approved responsive three-column workspace', async () => {
    const css = await readFile(customCss, 'utf8')
    expect(css).toContain('--iu-doc-sidebar-width: 260px')
    expect(css).toContain('--iu-doc-aside-width: 220px')
    expect(css).toContain('.VPDoc.has-aside .content-container')
    expect(css).toMatch(/max-width:\s*none/)
    expect(css).toContain('@media (max-width: 1439px)')
    expect(css).toContain('@media (max-width: 959px)')
  })
})
