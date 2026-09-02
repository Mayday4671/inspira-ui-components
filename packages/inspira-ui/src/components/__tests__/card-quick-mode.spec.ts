import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card3D from '../card-3d/src/card-3d.vue'
import CardSpotlight from '../card-spotlight/src/card-spotlight.vue'
import FlipCard from '../flip-card/src/flip-card.vue'
import GlareCard from '../glare-card/src/glare-card.vue'

describe('card quick modes', () => {
  it.each([
    ['Card3D', Card3D],
    ['CardSpotlight', CardSpotlight],
    ['GlareCard', GlareCard],
  ] as const)('%s renders semantic content and action props', (_name, component) => {
    const wrapper = mount(component, {
      props: {
        title: 'Launch faster',
        description: 'Production-ready motion defaults.',
        image: '/cover.webp',
        imageAlt: 'Dashboard preview',
        cta: 'View component',
        href: '/components/card',
        target: '_blank',
      },
    })

    expect(wrapper.get('img').attributes('alt')).toBe('Dashboard preview')
    expect(wrapper.text()).toContain('Launch faster')
    expect(wrapper.text()).toContain('Production-ready motion defaults.')
    const action = wrapper.get('a')
    expect(action.attributes('href')).toBe('/components/card')
    expect(action.attributes('target')).toBe('_blank')
    expect(action.text()).toContain('View component')
  })

  it('FlipCard renders semantic front and back content', () => {
    const wrapper = mount(FlipCard, {
      props: {
        image: '/front.webp',
        imageAlt: 'Product cover',
        backTitle: 'Details',
        backDescription: 'Everything users need.',
        cta: 'Open',
        href: '/details',
      },
    })

    expect(wrapper.get('img').attributes('alt')).toBe('Product cover')
    expect(wrapper.text()).toContain('Details')
    expect(wrapper.text()).toContain('Everything users need.')
    expect(wrapper.get('a').attributes('href')).toBe('/details')
  })

  it('prefers custom slots over generated quick content', () => {
    const spotlight = mount(CardSpotlight, {
      props: { title: 'Generated', description: 'Generated description' },
      slots: { default: '<strong>Custom content</strong>' },
    })
    expect(spotlight.text()).toContain('Custom content')
    expect(spotlight.text()).not.toContain('Generated')
  })

  it('disables generated card actions', async () => {
    const wrapper = mount(GlareCard, {
      props: { title: 'Disabled', cta: 'Open', href: '/blocked', disabled: true },
    })
    const action = wrapper.get('a')
    expect(action.attributes('aria-disabled')).toBe('true')
    expect(action.attributes('tabindex')).toBe('-1')
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    action.element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })
})
