import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并 Tailwind 类名（clsx 条件拼接 + tailwind-merge 冲突消解），
 * 与 Inspira UI / shadcn-vue 生态的 cn 工具保持一致。
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
