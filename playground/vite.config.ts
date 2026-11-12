import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vueOptions } from '../packages/inspira-ui/scripts/vue-options'
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
    vue(vueOptions),
    // 自定义管线：demo 自身工具类（含 dark:）正确生成
    iuTailwindPlugin({
      stylesId: fileURLToPath(new URL('./src/assets/tw.css', import.meta.url)),
      base: fileURLToPath(new URL('./src/assets/', import.meta.url)),
      sourceDirs: [fileURLToPath(new URL('./src', import.meta.url))],
    }),
  ],
    resolve: {
      // 精确匹配产物 CSS（避免裸包名 alias 把子路径错误替换 —— 同 docs 配置）
      alias: [
        {
          find: 'inspira-ui-components/dist/index.css',
          replacement: fileURLToPath(new URL('../packages/inspira-ui/dist/index.css', import.meta.url)),
        },
        {
          find: /^inspira-ui-components$/,
          replacement: useDist
            ? fileURLToPath(new URL('../packages/inspira-ui/dist/inspira-ui.mjs', import.meta.url))
            : fileURLToPath(new URL('../packages/inspira-ui/src/index.ts', import.meta.url)),
        },
      ],
    },
    build: {
      outDir: useDist ? 'dist-consumer' : 'dist',
    },
  }
})
