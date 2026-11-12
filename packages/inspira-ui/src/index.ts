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
    IuAnimateGrid: typeof components.IuAnimateGrid
    IuAnimatedBeam: typeof components.IuAnimatedBeam
    IuAnimatedCircularProgressBar: typeof components.IuAnimatedCircularProgressBar
    IuAnimatedList: typeof components.IuAnimatedList
    IuAnimatedLogoCloud: typeof components.IuAnimatedLogoCloud
    IuAnimatedModal: typeof components.IuAnimatedModal
    IuAnimatedModalBody: typeof components.IuAnimatedModalBody
    IuAnimatedModalContent: typeof components.IuAnimatedModalContent
    IuAnimatedModalFooter: typeof components.IuAnimatedModalFooter
    IuAnimatedModalTrigger: typeof components.IuAnimatedModalTrigger
    IuAnimatedTabs: typeof components.IuAnimatedTabs
    IuAnimatedTabsFadeInDiv: typeof components.IuAnimatedTabsFadeInDiv
    IuAnimatedTestimonials: typeof components.IuAnimatedTestimonials
    IuAnimatedTooltip: typeof components.IuAnimatedTooltip
    IuAppleBlurImage: typeof components.IuAppleBlurImage
    IuAppleCard: typeof components.IuAppleCard
    IuAppleCardCarousel: typeof components.IuAppleCardCarousel
    IuAppleCarouselItem: typeof components.IuAppleCarouselItem
    IuAuroraBackground: typeof components.IuAuroraBackground
    IuBalanceSlider: typeof components.IuBalanceSlider
    IuBendingGallery: typeof components.IuBendingGallery
    IuBentoGrid: typeof components.IuBentoGrid
    IuBentoGridCard: typeof components.IuBentoGridCard
    IuBentoGridItem: typeof components.IuBentoGridItem
    IuBlackHoleBackground: typeof components.IuBlackHoleBackground
    IuBlurReveal: typeof components.IuBlurReveal
    IuBook: typeof components.IuBook
    IuBookDescription: typeof components.IuBookDescription
    IuBookHeader: typeof components.IuBookHeader
    IuBookTitle: typeof components.IuBookTitle
    IuBorderBeam: typeof components.IuBorderBeam
    IuBoxReveal: typeof components.IuBoxReveal
    IuBreathingText: typeof components.IuBreathingText
    IuBubblesBg: typeof components.IuBubblesBg
    IuCard3D: typeof components.IuCard3D
    IuCard3DBody: typeof components.IuCard3DBody
    IuCard3DContainer: typeof components.IuCard3DContainer
    IuCard3DItem: typeof components.IuCard3DItem
    IuCardSpotlight: typeof components.IuCardSpotlight
    IuCardStack: typeof components.IuCardStack
    IuCardStackItem: typeof components.IuCardStackItem
    IuCarousel3D: typeof components.IuCarousel3D
    IuCircularGallery: typeof components.IuCircularGallery
    IuColorPicker: typeof components.IuColorPicker
    IuColourfulText: typeof components.IuColourfulText
    IuCompare: typeof components.IuCompare
    IuConfetti: typeof components.IuConfetti
    IuConfettiButton: typeof components.IuConfettiButton
    IuContainerScroll: typeof components.IuContainerScroll
    IuContainerScrollCard: typeof components.IuContainerScrollCard
    IuContainerScrollTitle: typeof components.IuContainerScrollTitle
    IuContainerTextFlip: typeof components.IuContainerTextFlip
    IuContrastRatio: typeof components.IuContrastRatio
    IuCosmicPortal: typeof components.IuCosmicPortal
    IuCubeCarousel: typeof components.IuCubeCarousel
    IuDefaultCursor: typeof components.IuDefaultCursor
    IuDesignTestimonials: typeof components.IuDesignTestimonials
    IuDialog: typeof components.IuDialog
    IuDirectionAwareHover: typeof components.IuDirectionAwareHover
    IuDitherShader: typeof components.IuDitherShader
    IuDock: typeof components.IuDock
    IuDockIcon: typeof components.IuDockIcon
    IuDockSeparator: typeof components.IuDockSeparator
    IuEncryptedText: typeof components.IuEncryptedText
    IuExpandableGallery: typeof components.IuExpandableGallery
    IuFallingStarsBg: typeof components.IuFallingStarsBg
    IuFeyCards: typeof components.IuFeyCards
    IuFile: typeof components.IuFile
    IuFileUpload: typeof components.IuFileUpload
    IuFileUploadGrid: typeof components.IuFileUploadGrid
    IuFlickeringGrid: typeof components.IuFlickeringGrid
    IuFlipCard: typeof components.IuFlipCard
    IuFlipWords: typeof components.IuFlipWords
    IuFloat: typeof components.IuFloat
    IuFloatingCard: typeof components.IuFloatingCard
    IuFluidCursor: typeof components.IuFluidCursor
    IuFocus: typeof components.IuFocus
    IuFolder: typeof components.IuFolder
    IuGithubGlobe: typeof components.IuGithubGlobe
    IuGlareCard: typeof components.IuGlareCard
    IuGlobe: typeof components.IuGlobe
    IuGlowBorder: typeof components.IuGlowBorder
    IuGlowingEffect: typeof components.IuGlowingEffect
    IuGradientButton: typeof components.IuGradientButton
    IuHaloSearch: typeof components.IuHaloSearch
    IuHighlightText: typeof components.IuHighlightText
    IuHtmlAscii: typeof components.IuHtmlAscii
    IuHtmlBlaze: typeof components.IuHtmlBlaze
    IuHtmlChromatic: typeof components.IuHtmlChromatic
    IuHtmlCloth: typeof components.IuHtmlCloth
    IuHtmlDrag: typeof components.IuHtmlDrag
    IuHtmlInCanvas: typeof components.IuHtmlInCanvas
    IuHtmlLiquid: typeof components.IuHtmlLiquid
    IuHyperText: typeof components.IuHyperText
    IuIInput: typeof components.IuIInput
    IuIPhone15ProMockup: typeof components.IuIPhone15ProMockup
    IuIconCloud: typeof components.IuIconCloud
    IuIconLogoCloud: typeof components.IuIconLogoCloud
    IuImageTrailCursor: typeof components.IuImageTrailCursor
    IuImagesBadge: typeof components.IuImagesBadge
    IuImagesSlider: typeof components.IuImagesSlider
    IuInfiniteGrid: typeof components.IuInfiniteGrid
    IuInteractiveGridPattern: typeof components.IuInteractiveGridPattern
    IuInteractiveHoverButton: typeof components.IuInteractiveHoverButton
    IuLampEffect: typeof components.IuLampEffect
    IuLens: typeof components.IuLens
    IuLetterPullup: typeof components.IuLetterPullup
    IuLetterSwap: typeof components.IuLetterSwap
    IuLightSpeed: typeof components.IuLightSpeed
    IuLineShadowText: typeof components.IuLineShadowText
    IuLinkPreview: typeof components.IuLinkPreview
    IuLiquidBackground: typeof components.IuLiquidBackground
    IuLiquidGlass: typeof components.IuLiquidGlass
    IuLiquidLogo: typeof components.IuLiquidLogo
    IuLogoOrigami: typeof components.IuLogoOrigami
    IuLogoOrigamiItem: typeof components.IuLogoOrigamiItem
    IuMarquee: typeof components.IuMarquee
    IuMediaText: typeof components.IuMediaText
    IuMeteors: typeof components.IuMeteors
    IuMorphingTabs: typeof components.IuMorphingTabs
    IuMorphingText: typeof components.IuMorphingText
    IuMultiStepLoader: typeof components.IuMultiStepLoader
    IuNeonBorder: typeof components.IuNeonBorder
    IuNeuralBg: typeof components.IuNeuralBg
    IuNumberTicker: typeof components.IuNumberTicker
    IuObjectColorInput: typeof components.IuObjectColorInput
    IuOrbit: typeof components.IuOrbit
    IuParallaxFloat: typeof components.IuParallaxFloat
    IuParallaxFloatElement: typeof components.IuParallaxFloatElement
    IuParticleImage: typeof components.IuParticleImage
    IuParticleWhirlpoolBg: typeof components.IuParticleWhirlpoolBg
    IuParticlesBg: typeof components.IuParticlesBg
    IuPathMarquee: typeof components.IuPathMarquee
    IuPatternBackground: typeof components.IuPatternBackground
    IuPhotoGallery: typeof components.IuPhotoGallery
    IuProgressiveBlur: typeof components.IuProgressiveBlur
    IuRadiantText: typeof components.IuRadiantText
    IuRainbowButton: typeof components.IuRainbowButton
    IuRibbonBackground: typeof components.IuRibbonBackground
    IuRipple: typeof components.IuRipple
    IuRippleButton: typeof components.IuRippleButton
    IuSVGMask: typeof components.IuSVGMask
    IuSafariMockup: typeof components.IuSafariMockup
    IuScales: typeof components.IuScales
    IuScratchToReveal: typeof components.IuScratchToReveal
    IuScrewText: typeof components.IuScrewText
    IuScrollIsland: typeof components.IuScrollIsland
    IuScrollSwapText: typeof components.IuScrollSwapText
    IuScrollWord: typeof components.IuScrollWord
    IuShaderToy: typeof components.IuShaderToy
    IuShimmerButton: typeof components.IuShimmerButton
    IuSilkBackground: typeof components.IuSilkBackground
    IuSingularityBackground: typeof components.IuSingularityBackground
    IuSleekLineCursor: typeof components.IuSleekLineCursor
    IuSmoothCursor: typeof components.IuSmoothCursor
    IuSnowfallBg: typeof components.IuSnowfallBg
    IuSparkles: typeof components.IuSparkles
    IuSparklesText: typeof components.IuSparklesText
    IuSpinningText: typeof components.IuSpinningText
    IuSpline: typeof components.IuSpline
    IuSplineParentSize: typeof components.IuSplineParentSize
    IuSpringCalendar: typeof components.IuSpringCalendar
    IuStarsBackground: typeof components.IuStarsBackground
    IuStaticLogoCloud: typeof components.IuStaticLogoCloud
    IuStatistic: typeof components.IuStatistic
    IuStractiumBackground: typeof components.IuStractiumBackground
    IuTailedCursor: typeof components.IuTailedCursor
    IuTestimonialSlider: typeof components.IuTestimonialSlider
    IuTetris: typeof components.IuTetris
    IuText3d: typeof components.IuText3d
    IuTextGenerateEffect: typeof components.IuTextGenerateEffect
    IuTextGlitch: typeof components.IuTextGlitch
    IuTextHighlight: typeof components.IuTextHighlight
    IuTextHoverEffect: typeof components.IuTextHoverEffect
    IuTextMorph: typeof components.IuTextMorph
    IuTextReveal: typeof components.IuTextReveal
    IuTextRevealCard: typeof components.IuTextRevealCard
    IuTextRevealStars: typeof components.IuTextRevealStars
    IuTextScrollReveal: typeof components.IuTextScrollReveal
    IuThunderstormBackground: typeof components.IuThunderstormBackground
    IuTimeline: typeof components.IuTimeline
    IuTracingBeam: typeof components.IuTracingBeam
    IuTree: typeof components.IuTree
    IuTreeIndicator: typeof components.IuTreeIndicator
    IuTypewriterText: typeof components.IuTypewriterText
    IuUnderlineText: typeof components.IuUnderlineText
    IuVanishingInput: typeof components.IuVanishingInput
    IuVariableLetterText: typeof components.IuVariableLetterText
    IuVariableText: typeof components.IuVariableText
    IuVideoText: typeof components.IuVideoText
    IuVortex: typeof components.IuVortex
    IuWarpBackground: typeof components.IuWarpBackground
    IuWarpBeam: typeof components.IuWarpBeam
    IuWavyBackground: typeof components.IuWavyBackground
    IuWorldMap: typeof components.IuWorldMap
  }
}
