import type { App, Plugin } from 'vue'
import * as components from './components'

export * from './components'
export * from './utils'
export { version } from './version'

/**
 * 全量安装（Element Plus 同款用法）：
 *
 * ```ts
 * import InspiraUI from 'inspira-ui-components'
 * import 'inspira-ui-components/dist/index.css'
 *
 * app.use(InspiraUI)  // 所有组件以 Iu 前缀全局注册
 * ```
 */
const InspiraUI: Plugin = {
  install(app: App): void {
    for (const comp of Object.values(components)) {
      const c = comp as { name?: string; install?: unknown }
      if (typeof c?.install === 'function') {
        // 组合组件可能已连带注册过该组件，跳过以避免重复注册告警
        if (c.name && app.component(c.name)) continue
        app.use(comp as unknown as Plugin)
      }
    }
  },
}

export default InspiraUI
export const install = InspiraUI.install

/** Volar 全局组件类型提示（app.use(InspiraUI) 后模板中可直接使用 IuXxx） */
declare module 'vue' {
  export interface GlobalComponents {
    IuInteractiveHoverButton: typeof components.IuInteractiveHoverButton
    IuRainbowButton: typeof components.IuRainbowButton
    IuRippleButton: typeof components.IuRippleButton
    IuGradientButton: typeof components.IuGradientButton
    IuShimmerButton: typeof components.IuShimmerButton
    IuDialog: typeof components.IuDialog
    IuCard3D: typeof components.IuCard3D
    IuCard3DContainer: typeof components.IuCard3DContainer
    IuCard3DBody: typeof components.IuCard3DBody
    IuCard3DItem: typeof components.IuCard3DItem
    IuCardSpotlight: typeof components.IuCardSpotlight
    IuFlipCard: typeof components.IuFlipCard
    IuGlareCard: typeof components.IuGlareCard
    IuNumberTicker: typeof components.IuNumberTicker
    IuStatistic: typeof components.IuStatistic
    IuTypewriterText: typeof components.IuTypewriterText
    IuFlipWords: typeof components.IuFlipWords
    IuTextGenerateEffect: typeof components.IuTextGenerateEffect
    IuBlurReveal: typeof components.IuBlurReveal
    IuAnimatedModal: typeof components.IuAnimatedModal
    IuAnimatedModalTrigger: typeof components.IuAnimatedModalTrigger
    IuAnimatedModalBody: typeof components.IuAnimatedModalBody
    IuAnimatedModalContent: typeof components.IuAnimatedModalContent
    IuAnimatedModalFooter: typeof components.IuAnimatedModalFooter
    IuAnimatedTooltip: typeof components.IuAnimatedTooltip
    IuMarquee: typeof components.IuMarquee
    IuBentoGrid: typeof components.IuBentoGrid
    IuBentoGridItem: typeof components.IuBentoGridItem
    IuBentoGridCard: typeof components.IuBentoGridCard
    IuAuroraBackground: typeof components.IuAuroraBackground
    IuPatternBackground: typeof components.IuPatternBackground
  }
}
