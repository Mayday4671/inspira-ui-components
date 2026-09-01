import { inject } from 'vue'
import { ANIMATED_MODAL_KEY, type AnimatedModalContext } from './src/context'

/** 在 <IuAnimatedModal> 内任意层级获取弹窗上下文（打开/关闭/切换） */
export function useAnimatedModal(): AnimatedModalContext {
  const modal = inject(ANIMATED_MODAL_KEY, null)
  if (!modal) {
    throw new Error('useAnimatedModal 必须在 <IuAnimatedModal> 内使用')
  }
  return modal
}
