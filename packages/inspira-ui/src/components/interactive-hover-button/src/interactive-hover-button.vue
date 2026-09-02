<script lang="ts" setup>
import { cn } from '../../../utils'
import { iuButtonSizeClass, iuButtonStateClass, useIuButton } from '../../button-shared'
import type { InteractiveHoverButtonProps } from './interactive-hover-button'

defineOptions({ name: 'IuInteractiveHoverButton' })

const props = withDefaults(defineProps<InteractiveHoverButtonProps>(), {
  text: 'Button',
  size: 'default',
  nativeType: 'button',
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { rootRef, resolvedTag, rootAttrs, handleClick, focus, blur } = useIuButton(props, (event, value) => emit(event, value))
defineExpose({ ref: rootRef, focus, blur })
</script>

<template>
  <component
    :is="resolvedTag"
    ref="rootRef"
    v-bind="rootAttrs"
    :class="
      cn(
        `group bg-background text-foreground relative inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border p-2 text-center font-semibold`,
        iuButtonSizeClass(size),
        iuButtonStateClass,
        block && 'flex w-full',
        props.class,
      )
    "
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <div class="flex items-center gap-2">
      <div
        class="bg-primary size-2 scale-100 rounded-lg transition-all duration-300 group-hover:scale-[100.8]"
      />
      <span
        class="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0"
      >
        <template v-if="loading && loadingText">{{ loadingText }}</template>
        <slot v-else>{{ text }}</slot>
      </span>
    </div>

    <div
      class="text-primary-foreground absolute top-0 z-10 flex size-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"
    >
      <span class="whitespace-nowrap">
        <template v-if="loading && loadingText">{{ loadingText }}</template>
        <slot v-else>{{ text }}</slot>
      </span>
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
        class="lucide lucide-arrow-right"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  </component>
</template>
