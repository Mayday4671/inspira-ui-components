import type { Plugin } from 'vite'

interface TailwindOptions {
  stylesId: string
  base?: string
  sourceDirs: string[]
  library?: boolean
}

export function iuTailwindPlugin(options: TailwindOptions): Plugin
export const libTailwindOptions: TailwindOptions
