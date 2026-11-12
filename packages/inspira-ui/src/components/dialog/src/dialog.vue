<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { IuAnimatedModal, IuAnimatedModalBody } from '../../animated-modal'
import type { DialogExposes, DialogProps } from './dialog-types'

defineOptions({ name: 'IuDialog' })

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '',
  description: '',
  width: 460,
  confirmText: '确 定',
  cancelText: '取 消',
  confirm: undefined,
  loading: false,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  beforeClose: undefined,
  destroyOnClose: false,
  showClose: true,
  danger: false,
  zIndex: 10000,
  teleportTo: 'body',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'open'): void
  (e: 'opened'): void
  (e: 'close'): void
  (e: 'closed'): void
}>()

const visible = computed<boolean>({
  get: () => props.modelValue,
  set: (value) => {
    if (value) open()
    else void close()
  },
})

const internalLoading = ref(false)
const isLoading = computed(() => props.loading || internalLoading.value)

const panelWidth = computed(() =>
  typeof props.width === 'number' ? `${props.width}px` : props.width,
)
const slots = defineSlots<{
  default?(): unknown
  header?(): unknown
  footer?(props: { loading: boolean; confirm: () => Promise<void>; cancel: () => Promise<void> }): unknown
}>()
const titleId = `iu-dialog-title-${useId()}`
const descriptionId = `iu-dialog-description-${useId()}`

interface CloseAttempt {
  promise: Promise<void>
  resolve: () => void
  running: boolean
}

let pendingClose: CloseAttempt | undefined
let openCycle = 0
let closeRequested = false

function requestClose() {
  const cycle = openCycle
  closeRequested = true
  emit('update:modelValue', false)
  void nextTick(() => {
    if (cycle === openCycle) closeRequested = false
  })
}

function finishClose(attempt: CloseAttempt, approved: boolean) {
  if (pendingClose !== attempt) return
  pendingClose = undefined
  if (approved && props.modelValue) requestClose()
  attempt.resolve()
}

function open() {
  if (!props.modelValue) emit('update:modelValue', true)
}

function close(): Promise<void> {
  if (!props.modelValue || closeRequested) return Promise.resolve()
  if (pendingClose?.running) return pendingClose.promise
  if (pendingClose) finishClose(pendingClose, false)

  if (!props.beforeClose) {
    requestClose()
    return Promise.resolve()
  }

  let resolve!: () => void
  const promise = new Promise<void>((complete) => { resolve = complete })
  const attempt = { promise, resolve, running: true }
  pendingClose = attempt

  try {
    const result = props.beforeClose(() => finishClose(attempt, true))
    if (result) {
      void Promise.resolve(result).then(
        () => { attempt.running = false },
        () => finishClose(attempt, false),
      )
    } else {
      attempt.running = false
    }
  } catch {
    finishClose(attempt, false)
  }

  return promise
}

async function handleConfirm() {
  if (isLoading.value) return
  const cycle = openCycle
  emit('confirm')

  if (props.confirm) {
    internalLoading.value = true
    try {
      if ((await props.confirm()) === false) return
    } catch {
      // 提交失败保持弹窗打开，由调用方提示错误
      return
    } finally {
      if (cycle === openCycle) internalLoading.value = false
    }
  }
  if (cycle === openCycle) await close()
}

async function handleCancel() {
  if (isLoading.value) return
  emit('cancel')
  await close()
}

watch(
  () => props.modelValue,
  (value, previous) => {
    openCycle++
    closeRequested = false
    if (pendingClose) finishClose(pendingClose, false)
    internalLoading.value = false
    if (value) emit('open')
    else if (previous) emit('close')
  },
  { immediate: true, flush: 'sync' },
)

onBeforeUnmount(() => {
  openCycle++
  if (pendingClose) finishClose(pendingClose, false)
})

defineExpose<DialogExposes>({ open, close, handleConfirm, handleCancel })
</script>

<template>
  <IuAnimatedModal v-model:open="visible" :close-on-esc="closeOnPressEscape && !isLoading">
    <IuAnimatedModalBody
      :show-close="showClose"
      :disable-close="isLoading"
      :destroy-on-close="destroyOnClose"
      :close-on-outside="closeOnClickModal && !isLoading"
      :z-index="zIndex"
      :teleport-to="teleportTo"
      :width="panelWidth"
      :class="cn('w-auto', props.class)"
      :aria-labelledby="title || slots.header ? titleId : undefined"
      :aria-describedby="description && !slots.header ? descriptionId : undefined"
      @after-enter="emit('opened')"
      @after-leave="emit('closed')"
    >
      <!-- 标题区 -->
      <div :id="titleId" class="flex flex-col gap-1.5 p-6 pb-0">
        <slot name="header">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {{ title }}
          </h3>
          <p v-if="description" :id="descriptionId" class="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {{ description }}
          </p>
        </slot>
      </div>

      <!-- 内容区 -->
      <div class="flex flex-1 flex-col overflow-y-auto p-6">
        <slot />
      </div>

      <!-- 底部操作区 -->
      <div
        v-if="confirmText || cancelText || slots.footer"
        class="flex items-center justify-end gap-3 border-t border-neutral-200/60 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
      >
        <slot name="footer" :loading="isLoading" :confirm="handleConfirm" :cancel="handleCancel">
          <button
            v-if="cancelText"
            type="button"
            :disabled="isLoading"
            class="h-9 cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
          <button
            v-if="confirmText"
            type="button"
            :disabled="isLoading"
            :class="
              cn(
                'inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-white transition-colors disabled:pointer-events-none disabled:opacity-60',
                danger
                  ? 'bg-red-600 hover:bg-red-500'
                  : 'bg-neutral-900 hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200',
              )
            "
            @click="handleConfirm"
          >
            <span
              v-if="isLoading"
              class="inline-block size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
            {{ isLoading ? '处理中…' : confirmText }}
          </button>
        </slot>
      </div>
    </IuAnimatedModalBody>
  </IuAnimatedModal>
</template>
