<script lang="ts" setup>
import { cn } from '../../../utils'
import { ref, watch } from 'vue'
import { useCard3D } from './context'
import type { Card3DItemProps } from './card-3d-types'

defineOptions({ name: 'IuCard3DItem' })

const {
  as = 'div',
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...props
} = defineProps<Card3DItemProps>()

const refElement = ref<HTMLElement | null>(null)

const { isMouseEntered } = useCard3D()

function handleAnimation(entered: boolean) {
  if (!refElement.value) return

  if (entered) {
    refElement.value.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
  } else {
    refElement.value.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
  }
}

watch(isMouseEntered, handleAnimation, { immediate: true })
</script>

<template>
  <component
    :is="as"
    ref="refElement"
    :class="cn(`w-fit transition duration-500 ease-in-out`, props.class)"
  >
    <slot />
  </component>
</template>
