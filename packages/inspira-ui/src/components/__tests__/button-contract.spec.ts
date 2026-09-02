import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import InteractiveHoverButton from '../interactive-hover-button/src/interactive-hover-button.vue'
import RainbowButton from '../rainbow-button/src/rainbow-button.vue'
import RippleButton from '../ripple-button/src/ripple-button.vue'
import GradientButton from '../gradient-button/src/gradient-button.vue'
import ShimmerButton from '../shimmer-button/src/shimmer-button.vue'

const buttons = [
  ['InteractiveHoverButton', InteractiveHoverButton],
  ['RainbowButton', RainbowButton],
  ['RippleButton', RippleButton],
  ['GradientButton', GradientButton],
  ['ShimmerButton', ShimmerButton],
] as const

describe.each(buttons)('%s public contract', (_name, component) => {
  it('supports native button attributes and accessible loading text', () => {
    const wrapper = mount(component, {
      props: {
        nativeType: 'submit',
        autofocus: true,
        ariaLabel: '保存',
        loading: true,
        loadingText: '保存中',
      },
      slots: { default: '保存' },
    })

    const root = wrapper.get('button')
    expect(root.attributes('type')).toBe('submit')
    expect(root.attributes('autofocus')).toBeDefined()
    expect(root.attributes('aria-label')).toBe('保存')
    expect(root.attributes('aria-busy')).toBe('true')
    expect(root.text()).toContain('保存中')
  })

  it('supports tag and suppresses click while disabled', async () => {
    const link = mount(component, {
      props: { tag: 'a' },
      attrs: { href: '/guide' },
      slots: { default: 'Guide' },
    })
    expect(link.element.tagName).toBe('A')

    const disabled = mount(component, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    await disabled.trigger('click')
    expect(disabled.emitted('click')).toBeUndefined()
  })

  it('exposes root, focus, and blur', () => {
    const wrapper = mount(component, { slots: { default: 'Focus' }, attachTo: document.body })
    const api = wrapper.vm as unknown as {
      ref: HTMLElement
      focus: () => void
      blur: () => void
    }

    expect(api.ref).toBe(wrapper.element)
    api.focus()
    expect(document.activeElement).toBe(wrapper.element)
    api.blur()
    expect(document.activeElement).not.toBe(wrapper.element)
    wrapper.unmount()
  })
})

describe('RainbowButton compatibility', () => {
  it('keeps the legacy is prop ahead of tag', () => {
    const wrapper = mount(RainbowButton, {
      props: { is: 'span', tag: 'a' },
      slots: { default: 'Legacy' },
    })
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})
