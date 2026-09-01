import type { HTMLAttributes } from 'vue'
import type { TransitionPresets } from '@vueuse/core'

type TransitionPresetKey = keyof typeof TransitionPresets

export interface NumberTickerProps {
  /** 目标数值 */
  value?: number
  /** 数值滚动方向 */
  direction?: 'up' | 'down'
  /** 动画时长（毫秒） */
  duration?: number
  /** 动画延迟（毫秒） */
  delay?: number
  /** 小数位数 */
  decimalPlaces?: number
  class?: HTMLAttributes['class']
  /** 缓动曲线（@vueuse/core TransitionPresets 键名） */
  transition?: TransitionPresetKey
}

export type { TransitionPresetKey }
