/**
 * 自定义 Tailwind v4 编译插件（替代 @tailwindcss/vite）。
 *
 * 为什么不用官方插件：@tailwindcss/vite 的完整管线（4.0.17 ~ 4.3.3 全部实测）在扫描
 * 阶段静默丢弃所有 dark: 前缀候选，导致暗色工具类规则不生成；而直接调用
 * @tailwindcss/oxide Scanner + tailwindcss compile/build 两个底层环节均工作正常。
 *
 * ⚠️ 顺序敏感：必须先 compile 再运行 Scanner——实测先运行 Scanner 会污染 compile
 * 的解析上下文，导致 build 静默丢弃全部 dark: 候选。
 */
import { Scanner } from '@tailwindcss/oxide'
import { compile } from 'tailwindcss'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const tailwindCssEntry = require.resolve('tailwindcss/index.css')

function collectFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collectFiles(full, out)
    else if (/\.(vue|ts|css|html)$/.test(entry.name)) out.push(full)
  }
  return out
}

/**
 * @param {object} opts
 * @param {string} opts.stylesId      被拦截编译的 CSS 文件绝对路径（正斜杠）
 * @param {string} opts.base          Tailwind base 目录（相对 @source/@import 的锚点）
 * @param {string[]} opts.sourceDirs  参与候选扫描的目录列表
 */
export function iuTailwindPlugin(opts) {
  const { stylesId, base, sourceDirs } = opts
  const sourceDirsNorm = sourceDirs.map((d) => path.resolve(d))

  return {
    name: 'iu-tailwind',
    enforce: 'pre',
    async transform(code, id) {
      const norm = id.split('?')[0].replace(/\\/g, '/')
      if (norm !== stylesId.replace(/\\/g, '/')) return null

      const contents = []
      for (const dir of sourceDirsNorm) {
        for (const file of collectFiles(dir)) {
          contents.push({
            content: fs.readFileSync(file, 'utf8'),
            extension: file.endsWith('.vue')
              ? 'vue'
              : file.endsWith('.css')
                ? 'css'
                : file.endsWith('.html')
                  ? 'html'
                  : 'ts',
          })
        }
      }
      contents.push({ content: code, extension: 'css' })

      const scanner = new Scanner({ base: sourceDirsNorm[0] })
      const candidates = scanner.scanFiles(
        contents.map(({ content, extension }) => ({ content, extension })),
      )

      const compiled = await compile(code, {
        base: (base ?? path.dirname(norm)) + '/',
        async loadStylesheet(id, ctxBase) {
          const resolved =
            id === 'tailwindcss' ? tailwindCssEntry : path.resolve(ctxBase, id)
          const newBase = path.dirname(resolved) + '/'
          return { content: fs.readFileSync(resolved, 'utf8'), base: newBase, path: resolved }
        },
      })

      const css = compiled.build(candidates)
      return { code: css, map: null }
    },
  }
}

/** 组件库默认配置（供库自身与 workspace 内 docs/playground 复用） */
export const libTailwindOptions = {
  stylesId: path
    .resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/styles/index.css')
    .replace(/\\/g, '/'),
  base: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/styles') + '/',
  sourceDirs: [path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/components')],
}
