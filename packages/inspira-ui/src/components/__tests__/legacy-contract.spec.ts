import { describe, expect, it } from 'vitest'
import * as components from '../index'

const legacyExports = [
  'IuInteractiveHoverButton',
  'IuRainbowButton',
  'IuRippleButton',
  'IuGradientButton',
  'IuShimmerButton',
  'IuDialog',
  'IuCard3D',
  'IuCard3DContainer',
  'IuCard3DBody',
  'IuCard3DItem',
  'IuCardSpotlight',
  'IuFlipCard',
  'IuGlareCard',
  'IuNumberTicker',
  'IuStatistic',
  'IuTypewriterText',
  'IuFlipWords',
  'IuTextGenerateEffect',
  'IuBlurReveal',
  'IuAnimatedModal',
  'IuAnimatedModalTrigger',
  'IuAnimatedModalBody',
  'IuAnimatedModalContent',
  'IuAnimatedModalFooter',
  'IuAnimatedTooltip',
  'IuMarquee',
  'IuBentoGrid',
  'IuBentoGridItem',
  'IuBentoGridCard',
  'IuAuroraBackground',
  'IuPatternBackground',
] as const

describe('legacy public component exports', () => {
  it.each(legacyExports)('keeps %s available', (name) => {
    expect(components[name]).toBeDefined()
  })
})
