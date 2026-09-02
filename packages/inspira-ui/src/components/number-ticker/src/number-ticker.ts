import type { HTMLAttributes } from 'vue'
import type { TransitionPresets } from '@vueuse/core'
import type { ReducedMotionMode } from '../../motion-shared'

type TransitionPresetKey = keyof typeof TransitionPresets

export interface NumberTickerProps {
  /** 目标数值 */
  value?: number
  /** 数字滚动方向 */
  direction?: 'up' | 'down'
  /** 动画时长（毫秒） */
  duration?: number
  /** 动画延迟（毫秒） */
  delay?: number
  /** 小数位数 */
  decimalPlaces?: number
  /** 数字前缀，如 ¥、$ */
  prefix?: string
  /** 数字后缀，如 %、万 */
  suffix?: string
  class?: HTMLAttributes['class']
  /** 缓动曲线（@vueuse/core TransitionPresets 键名） */
  transition?: TransitionPresetKey
  reducedMotion?: ReducedMotionMode
}

export type { TransitionPresetKey }
