import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AnimatedTooltip from '../animated-tooltip/src/animated-tooltip.vue'
import BentoGrid from '../bento-grid/src/bento-grid.vue'
import Marquee from '../marquee/src/marquee.vue'

describe('collection quick modes', () => {
  it('renders tooltips from items and emits the clicked item', async () => {
    const item = { id: 7, name: 'Ada', designation: 'Engineer', image: '/ada.webp' }
    const wrapper = mount(AnimatedTooltip, { props: { items: [item] } })
    expect(wrapper.get('img').attributes('alt')).toBe('Ada')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('itemClick')?.[0]).toEqual([item, expect.any(MouseEvent)])
  })

  it('renders marquee strings and objects without a slot', () => {
    const wrapper = mount(Marquee, {
      props: { items: ['Vue', { key: 'motion', label: 'Motion' }], repeat: 1 },
    })
    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.text()).toContain('Motion')
  })

  it('keeps the marquee default slot ahead of items', () => {
    const wrapper = mount(Marquee, {
      props: { items: ['Generated'], repeat: 1 },
      slots: { default: '<strong>Custom</strong>' },
    })
    expect(wrapper.text()).toContain('Custom')
    expect(wrapper.text()).not.toContain('Generated')
  })

  it('renders a complete bento grid from data', () => {
    const wrapper = mount(BentoGrid, {
      props: {
        items: [
          {
            key: 'docs',
            name: 'Documentation',
            description: 'Clear public APIs.',
            href: '/docs',
            cta: 'Read docs',
            colSpan: 2,
          },
        ],
      },
    })
    expect(wrapper.text()).toContain('Documentation')
    expect(wrapper.text()).toContain('Clear public APIs.')
    expect(wrapper.get('a').attributes('href')).toBe('/docs')
    expect(wrapper.get('[data-bento-item]').attributes('style')).toContain('grid-column: span 2')
  })

  it('keeps the bento default slot ahead of items', () => {
    const wrapper = mount(BentoGrid, {
      props: { items: [{ key: 1, name: 'Generated', description: 'Hidden' }] },
      slots: { default: '<article>Custom grid</article>' },
    })
    expect(wrapper.text()).toContain('Custom grid')
    expect(wrapper.text()).not.toContain('Generated')
  })
})
