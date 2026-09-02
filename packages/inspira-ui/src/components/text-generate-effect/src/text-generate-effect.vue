<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed, onMounted, ref } from 'vue'
import type { TextGenerateEffectProps } from './text-generate-effect'
import { shouldReduceMotion, type RestartableMotionExposes } from '../../motion-shared'

defineOptions({ name: 'IuTextGenerateEffect' })

const props = withDefaults(defineProps<TextGenerateEffectProps>(), {
  duration: 0.7,
  delay: 0,
  filter: true,
  reducedMotion: 'system',
})

const scope = ref<HTMLElement | null>(null)
const wordsArray = computed(() => props.words.split(' '))

const spanStyle = computed(() => ({
  opacity: shouldReduceMotion(props.reducedMotion) ? 1 : 0,
  filter: shouldReduceMotion(props.reducedMotion) ? 'none' : props.filter ? 'blur(10px)' : 'none',
  transition: `opacity ${props.duration}s, filter ${props.duration}s`,
}))

function restart() {
  if (scope.value) {
    const spans = scope.value.querySelectorAll('span')

    if (shouldReduceMotion(props.reducedMotion)) {
      spans.forEach((span: HTMLElement) => {
        span.style.opacity = '1'
        span.style.filter = 'none'
      })
      return
    }

    spans.forEach((span: HTMLElement) => {
      span.style.opacity = '0'
      span.style.filter = props.filter ? 'blur(10px)' : 'none'
    })

    setTimeout(() => {
      spans.forEach((span: HTMLElement, index: number) => {
        setTimeout(() => {
          span.style.opacity = '1'
          span.style.filter = props.filter ? 'blur(0px)' : 'none'
        }, index * 200)
      })
    }, props.delay)
  }
}

onMounted(restart)
defineExpose<RestartableMotionExposes>({ restart })
</script>

<template>
  <div :class="cn(`leading-snug tracking-wide`, props.class)">
    <div ref="scope">
      <span
        v-for="(word, idx) in wordsArray"
        :key="word + idx"
        class="inline-block"
        :style="spanStyle"
      >
        {{ word }}&nbsp;
      </span>
    </div>
  </div>
</template>
