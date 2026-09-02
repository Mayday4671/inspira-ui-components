import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NumberTicker from '../number-ticker/src/number-ticker.vue'
import TypewriterText from '../typewriter-text/src/typewriter-text.vue'
import FlipWords from '../flip-words/src/flip-words.vue'
import TextGenerateEffect from '../text-generate-effect/src/text-generate-effect.vue'
import BlurReveal from '../blur-reveal/src/blur-reveal.vue'
import AuroraBackground from '../aurora-background/src/aurora-background.vue'
import PatternBackground from '../pattern-background/src/pattern-background.vue'

describe('motion public contracts', () => {
  it('renders final content immediately when motion is reduced', () => {
    expect(mount(NumberTicker, { props: { value: 128, reducedMotion: 'always' } }).text()).toContain('128')
    expect(mount(TypewriterText, { props: { text: 'Ready', reducedMotion: 'always' } }).text()).toContain('Ready')
    expect(mount(FlipWords, { props: { words: ['One', 'Two'], reducedMotion: 'always' } }).text()).toContain('One')
  })

  it('pauses decorative backgrounds and exposes semantic sizing', () => {
    const aurora = mount(AuroraBackground, {
      props: { paused: true, reducedMotion: 'never', height: '240px' },
    })
    expect(aurora.get('[aria-hidden="true"]').attributes('style')).toContain('animation-play-state: paused')

    const pattern = mount(PatternBackground, {
      props: { animate: true, paused: true, height: '180px', rounded: '12px', centered: true },
    })
    expect(pattern.attributes('style')).toContain('height: 180px')
    expect(pattern.attributes('style')).toContain('border-radius: 12px')
    expect(pattern.attributes('style')).toContain('animation-play-state: paused')
    expect(pattern.classes()).toContain('w-full')
  })

  it.each([
    [NumberTicker, { value: 1 }, ['restart']],
    [TypewriterText, { text: 'Ready' }, ['play', 'pause', 'restart']],
    [FlipWords, { words: ['One', 'Two'] }, ['play', 'pause', 'restart']],
    [TextGenerateEffect, { words: 'Ready now' }, ['restart']],
    [BlurReveal, {}, ['restart']],
  ] as const)('exposes replay controls', (component, props, methods) => {
    const wrapper = mount(component, {
      props: { ...props, reducedMotion: 'always' },
      slots: { default: '<span>Ready</span>' },
    } as never)
    const api = wrapper.vm as unknown as Record<string, unknown>
    for (const method of methods) expect(api[method]).toBeTypeOf('function')
  })
})
