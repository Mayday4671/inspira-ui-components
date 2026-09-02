import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import Dialog from '../dialog/src/dialog.vue'

const stubs = {
  IuAnimatedModal: { template: '<div><slot /></div>' },
  IuAnimatedModalBody: { template: '<section><slot /></section>' },
}

describe('Dialog public contract', () => {
  it('exposes open, close, confirm, and cancel methods', async () => {
    const wrapper = mount(Dialog, { global: { stubs } })
    const api = wrapper.vm as unknown as {
      open: () => void
      close: () => Promise<void>
      handleConfirm: () => Promise<void>
      handleCancel: () => Promise<void>
    }

    expect(api.open).toBeTypeOf('function')
    expect(api.close).toBeTypeOf('function')
    expect(api.handleConfirm).toBeTypeOf('function')
    expect(api.handleCancel).toBeTypeOf('function')

    api.open()
    const updates = wrapper.emitted('update:modelValue') ?? []
    expect(updates[updates.length - 1]).toEqual([true])
  })

  it('waits for beforeClose to call done before closing', async () => {
    let done: (() => void) | undefined
    const beforeClose = vi.fn((next: () => void) => {
      done = next
    })
    const wrapper = mount(Dialog, {
      props: { modelValue: true, beforeClose },
      global: { stubs },
    })
    const api = wrapper.vm as unknown as { close: () => Promise<void> }

    const closing = api.close()
    expect(beforeClose).toHaveBeenCalledOnce()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    done?.()
    await closing
    const updates = wrapper.emitted('update:modelValue') ?? []
    expect(updates[updates.length - 1]).toEqual([false])
  })

  it('emits Element Plus style lifecycle events', async () => {
    const wrapper = mount(Dialog, { global: { stubs } })

    await wrapper.setProps({ modelValue: true })
    await nextTick()
    expect(wrapper.emitted('open')).toHaveLength(1)
    expect(wrapper.emitted('opened')).toHaveLength(1)

    await wrapper.setProps({ modelValue: false })
    await nextTick()
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('closed')).toHaveLength(1)
  })

  it('destroys dialog content after closing when requested', async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, destroyOnClose: true },
      slots: { default: '<span data-test="content">content</span>' },
      global: { stubs },
    })
    expect(wrapper.find('[data-test="content"]').exists()).toBe(true)

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false)
  })
})
