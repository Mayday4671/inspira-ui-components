import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { iuTailwindPlugin } from '../packages/inspira-ui/scripts/iu-tailwind-plugin.mjs'
import { vueOptions } from '../packages/inspira-ui/scripts/vue-options'

/**
 * 文档站（高保真设计原型复刻）。
 * 组件演示通过 alias 直接引用组件库源码 —— 演示即真实组件，改源码即时热更。
 */
export default defineConfig({
  plugins: [
    vue(vueOptions),
    iuTailwindPlugin({
      stylesId: fileURLToPath(new URL('./src/styles/utilities.css', import.meta.url)),
      base: fileURLToPath(new URL('./src/styles', import.meta.url)),
      sourceDirs: [fileURLToPath(new URL('./src', import.meta.url))],
    }),
  ],
  resolve: {
    alias: [
      // 精确匹配产物 CSS（避免前缀 alias 把子路径错误替换）
      {
        find: 'inspira-ui-components/dist/index.css',
        replacement: fileURLToPath(
          new URL('../packages/inspira-ui/dist/index.css', import.meta.url),
        ),
      },
      {
        find: /^inspira-ui-components\/components\/([^/]+)$/,
        replacement: fileURLToPath(new URL('../packages/inspira-ui/src/components/', import.meta.url)) + '$1/index.ts',
      },
      { find: /^inspira-ui-components$/, replacement: fileURLToPath(new URL('../packages/inspira-ui/src/index.ts', import.meta.url)) },
    ],
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
