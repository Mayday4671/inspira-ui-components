import type { HTMLAttributes } from 'vue'

/**
 * IuDialog 确认函数：
 * - 返回 false 或抛出异常 → 弹窗保持打开
 * - 正常返回（含 undefined）→ 自动关闭弹窗
 * 执行期间确认按钮自动进入 loading 并防止重复提交。
 */
export type DialogConfirmHandler = () => Promise<unknown> | unknown

export interface DialogProps {
  /** v-model：弹窗开关 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 副标题 / 说明文字 */
  description?: string
  /** 弹窗宽度（px 数值或任意 CSS 宽度） */
  width?: number | string
  /** 确认按钮文案，传空字符串隐藏 */
  confirmText?: string
  /** 取消按钮文案，传空字符串隐藏 */
  cancelText?: string
  /** 异步确认函数：loading 与关闭时机自动管理 */
  confirm?: DialogConfirmHandler
  /** 外部控制的 loading（如提交中） */
  loading?: boolean
  /** 点击遮罩关闭 */
  closeOnClickModal?: boolean
  /** 显示右上角关闭按钮 */
  showClose?: boolean
  /** 确认按钮是否使用危险色 */
  danger?: boolean
  zIndex?: number
  teleportTo?: string | HTMLElement
  class?: HTMLAttributes['class']
}
