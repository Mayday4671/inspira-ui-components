<script lang="ts" setup>
import { Motion } from 'motion-v'
import { onMounted, ref, useSlots, watchEffect, type VNode } from 'vue'
import type { BlurRevealProps } from './blur-reveal'

defineOptions({ name: 'IuBlurReveal' })

const props = withDefaults(defineProps<BlurRevealProps>(), {
  duration: 1,
  delay: 2,
  blur: '20px',
  yOffset: 20,
})

const slots = useSlots() as unknown as { default?: () => VNode[] }

const children = ref<VNode[]>([])

onMounted(() => {
  // 响应式捕获默认插槽中的全部子节点
  watchEffect(() => {
    children.value = slots.default ? slots.default() : []
  })
})

function getInitial() {
  return {
    opacity: 0,
    filter: `blur(${props.blur})`,
    y: props.yOffset,
  }
}

function getAnimate() {
  return {
    opacity: 1,
    filter: `blur(0px)`,
    y: 0,
  }
}
</script>

<template>
  <div :class="props.class">
    <Motion
      v-for="(child, index) in children"
      :key="index"
      as="div"
      :initial="getInitial()"
      :while-in-view="getAnimate()"
      :transition="{
        duration: props.duration,
        ease: 'easeInOut',
        delay: props.delay * index,
      }"
    >
      <component :is="child" />
    </Motion>
  </div>
</template>
