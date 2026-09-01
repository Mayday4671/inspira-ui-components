import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * 两种运行模式：
 *  - 默认（源码模式）：直接引用 packages/inspira-ui/src，改组件源码即时热更
 *  - --mode dist（产物模式）：模拟真实使用方，只引用构建产物 dist/ + index.css
 */
export default defineConfig(({ mode }) => {
  const useDist = mode === 'dist'

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        'inspira-ui-components': useDist
          ? fileURLToPath(new URL('../packages/inspira-ui/dist/inspira-ui.mjs', import.meta.url))
          : fileURLToPath(new URL('../packages/inspira-ui/src/index.ts', import.meta.url)),
      },
    },
    build: {
      outDir: useDist ? 'dist-consumer' : 'dist',
    },
  }
})
