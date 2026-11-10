/**
 * 组件库 CSS 构建脚本。
 *
 * 为什么不用 @tailwindcss/vite：其扫描阶段（4.0.17 ~ 4.3.3 全部实测）会静默丢弃
 * 所有 dark: 前缀候选，导致暗色工具类规则不生成。
 *
 * ⚠️ 执行顺序敏感：必须先 compile，再运行 oxide Scanner 提取候选，最后 build。
 * 实测在 4.1.17 中，若先运行 Scanner 再 compile，build 会静默丢弃全部 dark: 候选
 * （oxide 与 compile 共享的解析上下文被扫描污染）。
 */
import { Scanner } from '@tailwindcss/oxide'
import { compile } from 'tailwindcss'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const here = path.dirname(fileURLToPath(import.meta.url))
const pkgRoot = path.resolve(here, '..')
const srcRoot = path.resolve(pkgRoot, 'src')
const stylesEntry = path.join(srcRoot, 'styles/index.css')
const componentsDir = path.join(srcRoot, 'components')
const outFile = path.resolve(pkgRoot, 'dist/index.css')

// 1. 编译样式入口（展开 @import tailwindcss / theme.css / tokens.css）
const tailwindCssEntry = require.resolve('tailwindcss/index.css')
const compiled = await compile(fs.readFileSync(stylesEntry, 'utf8'), {
  base: path.dirname(stylesEntry) + '/',
  async loadStylesheet(id, base) {
    const resolved = id === 'tailwindcss' ? tailwindCssEntry : path.resolve(base, id)
    const newBase = path.dirname(resolved) + '/'
    return { content: fs.readFileSync(resolved, 'utf8'), base: newBase, path: resolved }
  },
})

// 2. 编译完成后再提取候选（含 dark: 变体）
function collectFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectFiles(full, out)
    else if (/\.(vue|ts|css)$/.test(entry.name)) out.push(full)
  }
  return out
}

const componentFiles = collectFiles(componentsDir)
const contents = [
  ...componentFiles.map((file) => ({
    content: fs.readFileSync(file, 'utf8'),
    extension: file.endsWith('.vue') ? 'vue' : file.endsWith('.css') ? 'css' : 'ts',
  })),
  { content: fs.readFileSync(stylesEntry, 'utf8'), extension: 'css' },
]

const scanner = new Scanner({ base: componentsDir })
const candidates = scanner.scanFiles(
  contents.map(({ content, extension }) => ({ content, extension })),
)
const darkCount = candidates.filter((c) => c.startsWith('dark:')).length

// 3. 生成规则
const css = compiled.build(candidates)

// 4. 校验并写入（暗色规则是硬性要求）
const darkRules = (css.match(/\.dark\\:[a-z0-9-]+/g) || []).length
if (darkRules === 0) {
  console.error('[gen-css] 暗色工具类规则缺失，构建中止')
  process.exit(1)
}

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, css)
console.log(
  `[gen-css] ${outFile} | ${(css.length / 1024).toFixed(1)}KB | candidates=${candidates.length} dark-candidates=${darkCount} dark-rules=${darkRules}`,
)
