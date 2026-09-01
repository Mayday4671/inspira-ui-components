<script lang="ts" setup>
import { cn } from '../../../utils'
import { useEventListener, useScrollLock } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { inject, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ANIMATED_MODAL_KEY } from './context'
import type { AnimatedModalBodyProps } from './modal-types'

defineOptions({ name: 'IuAnimatedModalBody' })

const props = withDefaults(defineProps<AnimatedModalBodyProps>(), {
  class: '',
  overlayClass: '',
  contentClass: '',
  width: '',
  showClose: true,
  closeOnOutside: true,
  lockScroll: true,
  zIndex: 10000,
  teleportTo: 'body',
})

const modal = inject(ANIMATED_MODAL_KEY, null)
if (!modal) {
  throw new Error('IuAnimatedModalBody 必须在 <IuAnimatedModal> 内使用')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const panelRef = ref<any>(null)
const previousActive = ref<HTMLElement | null>(null)

const getPanelEl = (): HTMLElement | null => {
  const raw = panelRef.value as unknown
  if (!raw) return null
  if (raw instanceof HTMLElement) return raw
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((raw as any)?.$el instanceof HTMLElement) return (raw as any).$el
  return null
}

const focusPanel = async () => {
  if (typeof document === 'undefined') return
  await nextTick()
  getPanelEl()?.focus?.()
}

const closeIfOutside = (event: Event) => {
  if (!props.closeOnOutside) return
  const el = getPanelEl()
  if (!el) return
  const target = event.target as Node | null
  if (!target) return
  if (el.contains(target)) return
  modal.closeModal()
}

const scrollLock = useScrollLock(typeof document !== 'undefined' ? document.body : null)

watch(
  () => modal.open.value,
  async (value) => {
    if (typeof document === 'undefined') return
    if (value) {
      previousActive.value = (document.activeElement as HTMLElement) || null

      if (props.lockScroll) {
        scrollLock.value = true
      }

      await focusPanel()
    } else {
      scrollLock.value = false

      previousActive.value?.focus?.()
      previousActive.value = null
    }
  },
  { immediate: true },
)

if (typeof document !== 'undefined') {
  useEventListener(document, 'mousedown', (e) => {
    if (!modal.open.value) return
    closeIfOutside(e)
  })
  useEventListener(document, 'touchstart', (e) => {
    if (!modal.open.value) return
    closeIfOutside(e)
  })
}

onBeforeUnmount(() => {
  scrollLock.value = false
  previousActive.value?.focus?.()
  previousActive.value = null
})
</script>

<template>
  <Teleport :to="props.teleportTo">
    <AnimatePresence>
      <Motion
        v-if="modal.open.value"
        as="div"
        :style="{ zIndex: props.zIndex }"
        class="fixed inset-0 z-50 flex h-full w-full items-center justify-center perspective-midrange transform-3d"
        :animate="{
          backdropFilter: 'blur(10px)',
        }"
        :exit="{
          opacity: 0,
          backdropFilter: 'blur(0px)',
        }"
      >
        <Motion
          as="div"
          :initial="{ opacity: 0 }"
          :animate="{
            opacity: 1,
            backdropFilter: 'blur(10px)',
          }"
          :exit="{
            opacity: 0,
            backdropFilter: 'blur(0px)',
          }"
          :class="cn(`fixed inset-0 h-full w-full bg-black/50`, props.overlayClass)"
        />

        <Motion
          ref="panelRef"
          as="div"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :style="props.width ? { width: props.width } : undefined"
          :initial="{
            opacity: 0,
            scale: 0.5,
            rotateX: 80,
            y: 40,
          }"
          :animate="{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
          }"
          :exit="{
            opacity: 0,
            scale: 0.8,
            rotateX: 10,
          }"
          :transition="{
            opacity: { duration: 0.2, ease: 'easeOut' },
            scale: { type: 'spring', stiffness: 260, damping: 15 },
            rotateX: { type: 'spring', stiffness: 260, damping: 15 },
            y: { type: 'spring', stiffness: 260, damping: 15 },
          }"
          :class="
            cn(
              `relative z-50 flex max-h-[85vh] w-[min(720px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950`,
              props.class,
            )
          "
        >
          <button
            v-if="props.showClose"
            type="button"
            class="group absolute top-4 right-4"
            aria-label="Close"
            @click="modal.closeModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-4 w-4 text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3 dark:text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <div :class="cn(`flex flex-1 flex-col`, props.contentClass)">
            <slot />
          </div>
        </Motion>
      </Motion>
    </AnimatePresence>
  </Teleport>
</template>
