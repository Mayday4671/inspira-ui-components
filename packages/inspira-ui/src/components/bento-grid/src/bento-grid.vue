<script lang="ts" setup>
import { cn } from '../../../utils'
import { useSlots } from 'vue'
import BentoGridCard from './bento-grid-card.vue'
import type { BentoGridProps } from './bento-grid-types'

defineOptions({ name: 'IuBentoGrid' })

const props = defineProps<BentoGridProps>()
const slots = useSlots()
</script>

<template>
  <div
    :class="
      cn(
        `mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3`,
        props.class,
      )
    "
  >
    <slot v-if="slots.default" />
    <BentoGridCard
      v-for="item in props.items ?? []"
      v-else
      :key="item.key"
      data-bento-item
      :name="item.name"
      :description="item.description"
      :icon="item.icon"
      :image="item.image"
      :image-alt="item.imageAlt"
      :href="item.href"
      :target="item.target"
      :cta="item.cta"
      :disabled="item.disabled"
      :class="item.class"
      :style="{
        gridColumn: item.colSpan ? `span ${item.colSpan}` : undefined,
        gridRow: item.rowSpan ? `span ${item.rowSpan}` : undefined,
      }"
    />
  </div>
</template>
