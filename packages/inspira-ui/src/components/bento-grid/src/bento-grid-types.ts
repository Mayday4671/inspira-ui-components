import type { Component, HTMLAttributes } from 'vue'

export interface BentoGridProps {
  class?: HTMLAttributes['class']
}

export interface BentoGridItemProps {
  class?: HTMLAttributes['class']
}

export interface BentoGridCardProps {
  /** 卡片标题 */
  name: string
  class?: HTMLAttributes['class']
  /** 图标（组件名或组件） */
  icon?: string | Component
  /** 描述文本 */
  description: string
  /** 跳转链接 */
  href: string
  /** 行动文案 */
  cta: string
}
