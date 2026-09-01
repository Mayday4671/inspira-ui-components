import type { HTMLAttributes } from 'vue'

export interface FlipCardProps {
  /** 翻转轴：x（上下翻）或 y（左右翻） */
  rotate?: 'x' | 'y'
  class?: HTMLAttributes['class']
}
