import { flushPromises, mount } from '@vue/test-utils'
import { h, ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import Dialog from '../dialog/src/dialog.vue'
import type { DialogExposes } from '../dialog/src/dialog-types'

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

  it('runs a synchronous close guard again after reopening', async () => {
    const beforeClose = vi.fn((done: () => void) => done())
    const wrapper = mount(Dialog, { props: { modelValue: true, beforeClose }, global: { stubs } })
    const api = wrapper.vm as unknown as DialogExposes

    await api.close()
    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    await api.close()

    expect(beforeClose).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false], [false]])
    wrapper.unmount()
  })

  it('coalesces repeated synchronous close requests before the model updates', async () => {
    const beforeClose = vi.fn((done: () => void) => done())
    const wrapper = mount(Dialog, { props: { modelValue: true, beforeClose }, global: { stubs } })
    const api = wrapper.vm as unknown as DialogExposes

    await Promise.all([api.close(), api.close()])

    expect(beforeClose).toHaveBeenCalledOnce()
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('retries a close guard that threw synchronously', async () => {
    const beforeClose = vi.fn((done: () => void) => done()).mockImplementationOnce(() => {
      throw new Error('guard failed')
    })
    const wrapper = mount(Dialog, { props: { modelValue: true, beforeClose }, global: { stubs } })
    const api = wrapper.vm as unknown as DialogExposes

    await api.close()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await api.close()

    expect(beforeClose).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('unlocks the action buttons when confirmation succeeds but the guard defers closing', async () => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, beforeClose: () => {}, confirm: async () => true },
      global: { stubs },
    })
    void (wrapper.vm as unknown as DialogExposes).handleConfirm()
    await flushPromises()

    expect(wrapper.findAll('button:disabled')).toHaveLength(0)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('ignores a deferred done callback from a previous opening', async () => {
    let done: (() => void) | undefined
    const wrapper = mount(Dialog, {
      props: { modelValue: true, beforeClose: (next) => { done = next } },
      global: { stubs },
    })
    const pending = (wrapper.vm as unknown as DialogExposes).close()
    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })

    done?.()
    await pending

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('deduplicates an active async guard and permits a retry after rejection', async () => {
    let rejectGuard!: (reason: Error) => void
    const beforeClose = vi.fn((done: () => void) => done()).mockImplementationOnce(
      () => new Promise<void>((_resolve, reject) => { rejectGuard = reject }),
    )
    const wrapper = mount(Dialog, { props: { modelValue: true, beforeClose }, global: { stubs } })
    const api = wrapper.vm as unknown as DialogExposes

    const firstClose = api.close()
    expect(api.close()).toBe(firstClose)
    rejectGuard(new Error('guard rejected'))
    await firstClose
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await api.close()

    expect(beforeClose).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    wrapper.unmount()
  })

  it('does not close a reopened dialog when an earlier confirmation resolves', async () => {
    let finish!: () => void
    const confirm = () => new Promise<void>((resolve) => { finish = resolve })
    const wrapper = mount(Dialog, { props: { modelValue: true, confirm }, global: { stubs } })
    const confirmation = (wrapper.vm as unknown as DialogExposes).handleConfirm()
    await wrapper.setProps({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    finish()
    await confirmation

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('keeps keyboard focus within the real dialog and restores it on close', async () => {
    const open = ref(false)
    const wrapper = mount({ render: () => h('main', [
      h('button', { id: 'dialog-trigger' }, 'Open'),
      h(Dialog, {
        modelValue: open.value,
        'onUpdate:modelValue': (value) => { open.value = value },
        title: 'Dialog',
      }, () => h('input', { 'aria-label': 'Dialog field' })),
    ]) }, { attachTo: document.body })

    const trigger = wrapper.get('#dialog-trigger').element as HTMLButtonElement
    trigger.focus()
    open.value = true
    await flushPromises()
    const panel = document.querySelector<HTMLElement>('[role="dialog"]')!
    const buttons = panel.querySelectorAll('button')
    const first = buttons[0]!
    const last = buttons[buttons.length - 1]!

    try {
      last.focus()
      last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))
      expect(document.activeElement).toBe(first)
      first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }))
      expect(document.activeElement).toBe(last)
      last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(open.value).toBe(false)
      expect(document.activeElement).toBe(trigger)
    } finally {
      wrapper.unmount()
    }
  })

  it('closes only the top dialog on Escape and restores focus to the preceding layer', async () => {
    const parent = ref(true)
    const child = ref(false)
    const wrapper = mount({ render: () => h('main', [
      h(Dialog, {
        modelValue: parent.value,
        'onUpdate:modelValue': (value) => { parent.value = value },
        title: 'Parent',
      }, () => h('button', { id: 'nested-trigger' }, 'Open child')),
      h(Dialog, {
        modelValue: child.value,
        'onUpdate:modelValue': (value) => { child.value = value },
        title: 'Child',
      }),
    ]) }, { attachTo: document.body })

    try {
      await flushPromises()
      const trigger = document.querySelector<HTMLButtonElement>('#nested-trigger')!
      trigger.focus()
      child.value = true
      await flushPromises()
      const active = document.activeElement!
      expect(active.textContent).toContain('Child')

      active.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }))
      await flushPromises()
      expect(parent.value).toBe(true)
      expect(child.value).toBe(false)
      expect(document.activeElement).toBe(trigger)
    } finally {
      wrapper.unmount()
    }
  })

  it('traps Tab when the final tab stop is a checked radio', async () => {
    const wrapper = mount(Dialog, {
      attachTo: document.body,
      props: { modelValue: true, showClose: false, confirmText: '', cancelText: '' },
      slots: { default: '<input type="radio" name="choice" checked><input type="radio" name="choice">' },
    })
    try {
      await flushPromises()
      const checked = document.querySelector<HTMLInputElement>('input[name="choice"]:checked')!
      checked.focus()
      const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
      checked.dispatchEvent(tab)
      expect(tab.defaultPrevented).toBe(true)
      expect(document.activeElement).toBe(checked)
    } finally {
      wrapper.unmount()
    }
  })

  it('makes background nodes inserted while the dialog is open inert', async () => {
    const wrapper = mount(Dialog, { attachTo: document.body, props: { modelValue: true } })
    const newButton = document.createElement('button')
    try {
      await flushPromises()
      document.body.append(newButton)
      await vi.waitFor(() => expect(newButton.hasAttribute('inert')).toBe(true))
      await wrapper.setProps({ modelValue: false })
      expect(newButton.hasAttribute('inert')).toBe(false)
    } finally {
      wrapper.unmount()
      newButton.remove()
    }
  })

  it('emits Element Plus style lifecycle events', async () => {
    const wrapper = mount(Dialog, { attachTo: document.body, global: { stubs: { transition: false } } })
    try {
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.emitted('open')).toHaveLength(1)
      await vi.waitFor(() => expect(wrapper.emitted('opened')).toHaveLength(1))

      await wrapper.setProps({ modelValue: false })
      expect(wrapper.emitted('close')).toHaveLength(1)
      await vi.waitFor(() => expect(wrapper.emitted('closed')).toHaveLength(1))
    } finally {
      wrapper.unmount()
    }
  })

  it.each([true, false])('controls whether dialog content is destroyed (destroyOnClose=%s)', async (destroyOnClose) => {
    const wrapper = mount(Dialog, {
      props: { modelValue: true, destroyOnClose },
      slots: { default: '<span data-test="dialog-content">content</span>' },
      attachTo: document.body,
      global: { stubs: { transition: false } },
    })
    try {
      expect(document.querySelector('[data-test="dialog-content"]')).not.toBeNull()

      await wrapper.setProps({ modelValue: false })
      await vi.waitFor(() => expect(wrapper.emitted('closed')).toHaveLength(1))
      expect(document.querySelector('[data-test="dialog-content"]') === null).toBe(destroyOnClose)
    } finally {
      wrapper.unmount()
    }
  })
})
