<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed } from 'vue'
import type { FlipCardProps } from './flip-card'

defineOptions({ name: 'IuFlipCard' })

const props = withDefaults(defineProps<FlipCardProps>(), {
  rotate: 'y',
  image: '',
  backTitle: '',
  backDescription: '',
})

const rotationClass = {
  x: ['group-hover:transform-[rotateX(180deg)]', 'transform-[rotateX(180deg)]'],
  y: ['group-hover:transform-[rotateY(180deg)]', 'transform-[rotateY(180deg)]'],
}

const rotation = computed(() => rotationClass[props.rotate])
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
          <div v-if="image" class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url(${image})` }" />
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
