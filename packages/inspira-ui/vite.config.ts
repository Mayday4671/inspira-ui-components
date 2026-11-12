import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { vueOptions } from './scripts/vue-options'
import { iuTailwindPlugin, libTailwindOptions } from './scripts/iu-tailwind-plugin.mjs'
import { emitOglDeclarations, resolveDeclarationImports } from './scripts/declaration-imports'

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
  },
  plugins: [
    vue(vueOptions),
    iuTailwindPlugin(libTailwindOptions),
    dts({
      tsconfigPath: r('./tsconfig.json'),
      entryRoot: 'src',
      exclude: ['src/**/__tests__/**', 'src/**/*.spec.ts', 'src/library.ts'],
      beforeWriteFile: resolveDeclarationImports(r('./src/'), r('./dist/')),
      afterBuild: () => emitOglDeclarations(r('./dist/')),
    }),
  ],
  build: {
    lib: {
      entry: r('./src/library.ts'),
      formats: ['es'],
      cssFileName: 'index',
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
        preserveModules: true,
        preserveModulesRoot: r('./src/'),
        entryFileNames: ({ name }) => name === 'library' ? 'inspira-ui.mjs' : '[name].mjs',
      },
    },
  },
})
