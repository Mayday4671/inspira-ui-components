import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
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
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) =>
        /^(vue|@vue|motion-v|@vueuse|clsx|tailwind-merge|class-variance-authority)(\/|$)/.test(
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
