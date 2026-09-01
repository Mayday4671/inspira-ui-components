import type { HTMLAttributes } from 'vue'

export interface FlipCardProps {
  /** 翻转轴：x（上下翻）或 y（左右翻） */
  rotate?: 'x' | 'y'
  /** 正面背景图地址（快捷模式；有默认插槽时忽略） */
  image?: string
  /** 背面标题（快捷模式） */
  backTitle?: string
  /** 背面描述（快捷模式） */
  backDescription?: string
  class?: HTMLAttributes['class']
}
