import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ImageTrailCursor from '../image-trail-cursor/src/ImageTrailCursor.vue'

afterEach(() => vi.unstubAllGlobals())

describe('ImageTrailCursor lifecycle', () => {
  it('cancels its frame and releases detached pointer listeners on unmount', async () => {
    const requestFrame = vi.fn(() => 17)
    const cancelFrame = vi.fn()
    vi.stubGlobal('requestAnimationFrame', requestFrame)
    vi.stubGlobal('cancelAnimationFrame', cancelFrame)
    const wrapper = mount(ImageTrailCursor, { props: { images: ['image.png'] } })
    const element = wrapper.element

    await wrapper.trigger('mousemove')
    expect(requestFrame).toHaveBeenCalledOnce()
    wrapper.unmount()
    expect(cancelFrame).toHaveBeenCalledWith(17)

    element.dispatchEvent(new MouseEvent('mousemove'))
    expect(requestFrame).toHaveBeenCalledOnce()
  })

  it('does not schedule a render with an empty image list', async () => {
    const requestFrame = vi.fn(() => 17)
    vi.stubGlobal('requestAnimationFrame', requestFrame)
    const wrapper = mount(ImageTrailCursor)
    try {
      await wrapper.trigger('mousemove')
      expect(requestFrame).not.toHaveBeenCalled()
    } finally {
      wrapper.unmount()
    }
  })
})
