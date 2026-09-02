import type { HTMLAttributes } from 'vue'

export interface FlipCardProps {
  /** 翻转轴：x（上下翻）或 y（左右翻） */
  rotate?: 'x' | 'y'
  /** 正面背景图地址（快捷模式；有默认插槽时忽略） */
  image?: string
  /** 正面图片替代文本 */
  imageAlt?: string
  /** 背面标题（快捷模式） */
  backTitle?: string
  /** 背面描述（快捷模式） */
  backDescription?: string
  /** 背面行动文案 */
  cta?: string
  /** 背面行动链接 */
  href?: string
  /** 链接打开目标 */
  target?: string
  /** 禁止行动区跳转 */
  disabled?: boolean
  class?: HTMLAttributes['class']
}
