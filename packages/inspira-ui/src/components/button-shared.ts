import type { HTMLAttributes } from 'vue'

/** 全部按钮组件统一的尺寸标识 */
export type IuButtonSize = 'small' | 'default' | 'large' | 'xl'

/** 按钮通用 props：所有 Iu 按钮保持同一套使用习惯 */
export interface IuButtonBaseProps {
  /** 统一尺寸 */
  size?: IuButtonSize
  /** 加载中（自动禁用并显示转圈） */
  loading?: boolean
  /** 禁用 */
  disabled?: boolean
  /** 占满一行 */
  block?: boolean
  class?: HTMLAttributes['class']
}

const SIZE_CLASSES: Record<IuButtonSize, string> = {
  small: 'h-8 px-3 text-xs',
  default: 'h-10 px-5 text-sm',
  large: 'h-12 px-7 text-base',
  xl: 'h-14 px-9 text-lg',
}

export function iuButtonSizeClass(size: IuButtonSize = 'default'): string {
  return SIZE_CLASSES[size]
}

export const iuButtonStateClass =
  'disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
