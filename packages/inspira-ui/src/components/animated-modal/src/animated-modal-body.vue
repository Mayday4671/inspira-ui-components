<script lang="ts" setup>
import { cn } from '../../../utils'
import { useEventListener } from '@vueuse/core'
import { computed, inject, nextTick, ref, watch } from 'vue'
import { ANIMATED_MODAL_KEY } from './context'
import { isTopModal, modalZIndex, registerModal } from './modal-stack'
import type { AnimatedModalBodyProps } from './modal-types'

defineOptions({ name: 'IuAnimatedModalBody' })

const props = withDefaults(defineProps<AnimatedModalBodyProps>(), {
  class: '',
  overlayClass: '',
  contentClass: '',
  width: '',
  showClose: true,
  disableClose: false,
  destroyOnClose: true,
  closeOnOutside: true,
  lockScroll: true,
  zIndex: 10000,
  teleportTo: 'body',
})

const emit = defineEmits<{ afterEnter: []; afterLeave: [] }>()
const context = inject(ANIMATED_MODAL_KEY, null)
if (!context) throw new Error('IuAnimatedModalBody 必须在 <IuAnimatedModal> 内使用')
const modal = context

const rendered = ref(modal.open.value)
const overlayRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const zIndex = computed(() => {
  const overlay = overlayRef.value
  return overlay ? modalZIndex(overlay.ownerDocument, modal, props.zIndex) : props.zIndex
})

watch(
  () => modal.open.value,
  async (value, _previous, onCleanup) => {
    if (!value) return
    rendered.value = true
    if (typeof document === 'undefined') return

    const previous = document.activeElement
    const previousFocus = previous instanceof HTMLElement ? previous : null
    let cancelled = false
    let unregister: (() => void) | undefined
    onCleanup(() => {
      cancelled = true
      unregister?.()
    })
    await nextTick()

    const overlay = overlayRef.value
    const panel = panelRef.value
    if (cancelled || !overlay || !panel) return
    unregister = registerModal({
      modal,
      overlay,
      panel,
      previousFocus,
      lockScroll: props.lockScroll,
      zIndex: () => props.zIndex,
    })
  },
  { immediate: true },
)

function closeIfOutside(event: Event) {
  const panel = panelRef.value
  if (!props.closeOnOutside || !modal.open.value || !panel) return
  if (!isTopModal(panel.ownerDocument, modal)) return
  if (!panel.contains(event.target as Node)) modal.closeModal()
}

function handleAfterEnter() {
  if (modal.open.value) emit('afterEnter')
}

function handleAfterLeave() {
  if (modal.open.value) return
  if (props.destroyOnClose) rendered.value = false
  emit('afterLeave')
}

const tabbable = [
  'a[href]', 'area[href]', 'button', 'input', 'select', 'textarea',
  'iframe', 'summary', '[contenteditable]:not([contenteditable="false"])', '[tabindex]',
].join(', ')

function isNamedRadio(element: HTMLElement): element is HTMLInputElement {
  return element instanceof HTMLInputElement && element.type === 'radio' && Boolean(element.name)
}

function getTabStops(panel: HTMLElement, active: Element | null) {
  const candidates = Array.from(panel.querySelectorAll<HTMLElement>(tabbable))
    .filter((element) =>
      element.tabIndex >= 0 &&
      !element.matches(':disabled, input[type="hidden"]') &&
      !element.closest('[inert], [hidden]') &&
      element.checkVisibility?.({ checkVisibilityCSS: true }) !== false,
    )
    .sort((a, b) => (a.tabIndex || Infinity) - (b.tabIndex || Infinity))

  return candidates.filter((candidate) => {
    if (!isNamedRadio(candidate)) return true
    const group = candidates.filter((element): element is HTMLInputElement =>
      isNamedRadio(element) && element.name === candidate.name && element.form === candidate.form,
    )
    return candidate === (group.find((radio) => radio.checked) ?? group.find((radio) => radio === active) ?? group[0])
  })
}

if (typeof document !== 'undefined') {
  useEventListener(document, 'keydown', (event: KeyboardEvent) => {
    const panel = panelRef.value
    if (event.key !== 'Tab' || event.defaultPrevented || !modal.open.value || !panel) return
    if (!isTopModal(document, modal)) return

    const active = document.activeElement
    const targets = getTabStops(panel, active)
    const first = targets[0]
    const last = targets[targets.length - 1]
    if (active instanceof HTMLElement && targets.includes(active) && active !== (event.shiftKey ? first : last)) return

    event.preventDefault()
    const target = (event.shiftKey ? last : first) ?? panel
    target.focus()
  })

  useEventListener(document, 'focusin', (event) => {
    const panel = panelRef.value
    if (!modal.open.value || !panel || !isTopModal(document, modal)) return
    if (!panel.contains(event.target as Node)) panel.focus()
  })
}
</script>

<template>
  <Teleport :to="props.teleportTo">
    <Transition
      name="iu-animated-modal"
      appear
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="modal.open.value"
        ref="overlayRef"
        :style="{ zIndex }"
        :aria-hidden="modal.open.value ? undefined : true"
        :inert="!modal.open.value"
        class="iu-animated-modal-layer fixed inset-0 flex h-full w-full items-center justify-center perspective-midrange"
        @mousedown="closeIfOutside"
        @touchstart="closeIfOutside"
      >
        <div :class="cn('fixed inset-0 h-full w-full bg-black/50', props.overlayClass)" />

        <div
          v-if="rendered"
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-label="props.ariaLabelledby ? undefined : '对话框'"
          :aria-labelledby="props.ariaLabelledby"
          :aria-describedby="props.ariaDescribedby"
          tabindex="-1"
          :style="props.width ? { width: props.width } : undefined"
          :class="
            cn(
              'iu-animated-modal-panel relative z-50 flex max-h-[85vh] max-w-[calc(100vw-32px)] w-[min(720px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950',
              props.class,
            )
          "
        >
          <button
            v-if="props.showClose"
            type="button"
            class="group absolute top-4 right-4 border-0 bg-transparent p-0"
            aria-label="Close"
            :disabled="props.disableClose"
            @click="modal.closeModal()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="h-4 w-4 text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3 dark:text-white"
            >
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <div :class="cn('flex flex-1 flex-col', props.contentClass)">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.iu-animated-modal-layer {
  backdrop-filter: blur(10px);
}

.iu-animated-modal-enter-active,
.iu-animated-modal-leave-active {
  transition: opacity 240ms ease, backdrop-filter 240ms ease;
}

.iu-animated-modal-enter-active .iu-animated-modal-panel,
.iu-animated-modal-leave-active .iu-animated-modal-panel {
  transition: transform 240ms ease;
}

.iu-animated-modal-enter-from,
.iu-animated-modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.iu-animated-modal-enter-from .iu-animated-modal-panel {
  transform: translateY(40px) scale(0.5) rotateX(60deg);
}

.iu-animated-modal-leave-to .iu-animated-modal-panel {
  transform: scale(0.8) rotateX(10deg);
}

@media (prefers-reduced-motion: reduce) {
  .iu-animated-modal-enter-active,
  .iu-animated-modal-leave-active,
  .iu-animated-modal-enter-active .iu-animated-modal-panel,
  .iu-animated-modal-leave-active .iu-animated-modal-panel {
    transition: none;
  }
}
</style>
