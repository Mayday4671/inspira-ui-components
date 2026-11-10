import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { iuTailwindPlugin } from '../packages/inspira-ui/scripts/iu-tailwind-plugin.mjs'

/**
 * 两种运行模式：
 *  - 默认（源码模式）：直接引用 packages/inspira-ui/src，改组件源码即时热更
 *  - --mode dist（产物模式）：模拟真实使用方，只引用构建产物 dist/ + index.css
 */
export default defineConfig(({ mode }) => {
  const useDist = mode === 'dist'

  return {
    plugins: [
    vue(),
    // 自定义管线：demo 自身工具类（含 dark:）正确生成
    iuTailwindPlugin({
      stylesId: 'E:/My_Project/inspira-ui-components/playground/src/assets/tw.css'.replace(/\/g, '/'),
      base: 'E:/My_Project/inspira-ui-components/playground/src/assets/',
      sourceDirs: ['E:/My_Project/inspira-ui-components/playground/src'],
    }),
  ],
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
