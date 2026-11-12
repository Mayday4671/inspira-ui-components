import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { iuTailwindPlugin, libTailwindOptions } from './scripts/iu-tailwind-plugin.mjs'

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
  },
  plugins: [
    vue(),
    // 自定义 Tailwind 编译管线（替代 @tailwindcss/vite —— 其扫描阶段丢失 dark: 候选）
    iuTailwindPlugin(libTailwindOptions),
    dts({ tsconfigPath: r('./tsconfig.json'), entryRoot: 'src' }),
  ],
  build: {
    lib: {
      entry: r('./src/index.ts'),
      name: 'InspiraUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'inspira-ui.mjs' : 'inspira-ui.cjs'),
    },
    outDir: 'dist',
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) =>
        /^(vue|@vue|motion-v|motion-dom|@vueuse|clsx|tailwind-merge|class-variance-authority|@splinetool\/runtime|three|three-globe|ogl|gsap|postprocessing|cobe|simplex-noise|dotted-map|theme-colors|@uiw\/color-convert|@number-flow\/vue|canvas-confetti|vue-use-spring)(\/|$)/.test(
          id,
        ),
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.names?.some((n) => n.endsWith('.css'))
            ? 'index.css'
            : 'assets/[name][extname]',
      },
    },
  },
})
