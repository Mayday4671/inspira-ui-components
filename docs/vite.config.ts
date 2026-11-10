import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * 文档站（高保真设计原型复刻）。
 * 组件演示通过 alias 直接引用组件库源码 —— 演示即真实组件，改源码即时热更。
 */
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      'inspira-ui-components': fileURLToPath(
        new URL('../packages/inspira-ui/src/index.ts', import.meta.url),
      ),
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
