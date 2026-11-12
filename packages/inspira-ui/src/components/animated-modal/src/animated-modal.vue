<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { computed, provide, ref } from 'vue'
import { ANIMATED_MODAL_KEY, type AnimatedModalContext } from './context'
import { isTopModal } from './modal-stack'
import type { AnimatedModalProps } from './modal-types'

defineOptions({ name: 'IuAnimatedModal' })

const props = withDefaults(defineProps<AnimatedModalProps>(), {
  open: undefined,
  defaultOpen: false,
  closeOnEsc: true,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const internalOpen = ref(Boolean(props.defaultOpen))
const isControlled = computed(() => props.open !== undefined)
const open = computed<boolean>({
  get() {
    return isControlled.value ? Boolean(props.open) : internalOpen.value
  },
  set(value) {
    if (!isControlled.value) internalOpen.value = value
    emit('update:open', value)
  },
})

const setOpen = (value: boolean) => {
  open.value = value
}

const openModal = () => {
  if (open.value) return
  setOpen(true)
  emit('open')
}

const closeModal = () => {
  if (!open.value) return
  setOpen(false)
  emit('close')
}

const toggle = () => {
  if (open.value) closeModal()
  else openModal()
}

const ctx: AnimatedModalContext = { open, setOpen, openModal, closeModal, toggle }
provide(ANIMATED_MODAL_KEY, ctx)

if (typeof window !== 'undefined') {
  useEventListener(window, 'keydown', (event: KeyboardEvent) => {
    if (event.defaultPrevented || event.key !== 'Escape' || !open.value || !props.closeOnEsc) return
    if (!isTopModal(window.document, ctx)) return
    event.preventDefault()
    closeModal()
  })
}
</script>

<template>
  <slot :open="open" :open-modal="openModal" :close-modal="closeModal" :toggle="toggle" />
</template>
