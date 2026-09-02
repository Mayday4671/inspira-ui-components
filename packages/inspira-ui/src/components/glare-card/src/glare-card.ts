import type { HTMLAttributes } from 'vue'

export interface GlareCardProps {
  /** 内容图地址（自动铺满） */
  image?: string
  /** 图片替代文本 */
  imageAlt?: string
  /** 快捷模式标题 */
  title?: string
  /** 快捷模式描述 */
  description?: string
  /** 行动文案 */
  cta?: string
  /** 行动链接 */
  href?: string
  /** 链接打开目标 */
  target?: string
  /** 禁止行动区跳转 */
  disabled?: boolean
  /** 卡片宽度（px） */
  width?: number
  /** 卡片高度（px），未设置时使用默认比例 */
  height?: number
  /** 卡片圆角（px） */
  radius?: number
  class?: HTMLAttributes['class']
}
