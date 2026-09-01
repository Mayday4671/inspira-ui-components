<script lang="ts" setup>
import { cn } from '../../../utils'
import Card3DBody from './card-3d-body.vue'
import Card3DContainer from './card-3d-container.vue'
import Card3DItem from './card-3d-item.vue'
import type { Card3DProps } from './card-3d-quick'

defineOptions({ name: 'IuCard3D' })

const props = withDefaults(defineProps<Card3DProps>(), {
  title: '',
  description: '',
  image: '',
  cta: '',
})
</script>

<template>
  <Card3DContainer>
    <Card3DBody :class="cn('overflow-hidden rounded-2xl', props.class)">
      <Card3DItem :translate-z="160" class="absolute inset-0">
        <div
          v-if="image"
          class="h-full w-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${image})` }"
        />
        <div v-else class="iu-card-3d-fallback h-full w-full" />
      </Card3DItem>

      <Card3DItem
        :translate-z="100"
        class="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 pt-14 text-white"
      >
        <h3 class="text-2xl font-bold">{{ title }}</h3>
        <p v-if="description" class="text-sm leading-relaxed text-white/75">
          {{ description }}
        </p>
        <span
          v-if="cta"
          class="mt-3 inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black"
        >
          {{ cta }}
        </span>
      </Card3DItem>
    </Card3DBody>
  </Card3DContainer>
</template>

<style scoped>
.iu-card-3d-fallback {
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
