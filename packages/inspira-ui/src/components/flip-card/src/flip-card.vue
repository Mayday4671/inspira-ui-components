<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import type { FlipCardProps } from './flip-card'

defineOptions({ name: 'IuFlipCard' })

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: 'y',
  image: '',
  imageAlt: '',
  backTitle: '',
  backDescription: '',
  cta: '',
  href: '',
  target: undefined,
  disabled: false,
})

const rotationClass = {
  x: ['group-hover:transform-[rotateX(180deg)]', 'transform-[rotateX(180deg)]'],
  y: ['group-hover:transform-[rotateY(180deg)]', 'transform-[rotateY(180deg)]'],
}

const rotation = computed(() => rotationClass[props.rotate])

function handleActionClick(event: MouseEvent) {
  if (!props.disabled) return
  event.preventDefault()
}
</script>

<template>
  <div :class="cn(`group h-72 w-56 perspective-[1000px]`, props.class)">
    <div
      :class="
        cn(
          `relative h-full rounded-2xl transition-all duration-500 transform-3d`,
          rotation[0],
        )
      "
    >
      <!-- 正面 -->
      <div class="absolute size-full overflow-hidden rounded-2xl border backface-hidden">
        <slot>
          <img v-if="image" :src="image" :alt="imageAlt" class="h-full w-full object-cover" />
          <div v-else class="iu-flip-fallback h-full w-full" />
        </slot>
      </div>

      <!-- 背面 -->
      <div
        :class="
          cn(
            `absolute h-full w-full overflow-hidden rounded-2xl border bg-black/80 p-4 text-slate-200 backface-hidden`,
            rotation[1],
          )
        "
      >
        <slot name="back">
          <div class="flex h-full flex-col justify-center">
            <p class="m-0 text-base font-semibold">{{ backTitle }}</p>
            <p v-if="backDescription" class="mt-2 text-xs leading-relaxed opacity-70">
              {{ backDescription }}
            </p>
            <a
              v-if="cta && href"
              :href="href"
              :target="target"
              :aria-disabled="disabled ? 'true' : undefined"
              :tabindex="disabled ? -1 : undefined"
              class="mt-4 inline-flex w-fit text-sm font-semibold underline-offset-4 hover:underline"
              @click="handleActionClick"
            >
              {{ cta }} →
            </a>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.iu-flip-fallback {
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
