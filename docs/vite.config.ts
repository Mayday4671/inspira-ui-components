import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 文档站（高保真设计原型复刻）。
 * 组件演示通过 alias 直接引用组件库源码 —— 演示即真实组件，改源码即时热更。
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      // 精确匹配产物 CSS（避免前缀 alias 把子路径错误替换）
      {
        find: 'inspira-ui-components/dist/index.css',
        replacement: fileURLToPath(
          new URL('../packages/inspira-ui/dist/index.css', import.meta.url),
        ),
      },
      { find: /^inspira-ui-components$/, replacement: fileURLToPath(new URL('../packages/inspira-ui/src/index.ts', import.meta.url)) },
    ],
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
