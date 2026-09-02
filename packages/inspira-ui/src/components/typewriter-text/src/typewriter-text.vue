<script lang="ts" setup>
import { cn } from '../../../utils'
import { Motion } from 'motion-v'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { TypewriterTextProps } from './typewriter-text'
import { shouldReduceMotion, type PlayableMotionExposes } from '../../motion-shared'

defineOptions({ name: 'IuTypewriterText', inheritAttrs: false })

const props = withDefaults(defineProps<TypewriterTextProps>(), {
  as: 'div',
  speed: 50,
  initialDelay: 0,
  waitTime: 2000,
  deleteSpeed: 30,
  loop: true,
  showCursor: true,
  hideCursorOnType: false,
  cursorChar: '|',
  cursorClass: 'ml-1',
  cursorAnimationVariants: () => ({
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: 'reverse',
      },
    },
  }),
  reducedMotion: 'system',
})

const texts = computed(() => (Array.isArray(props.text) ? props.text : [props.text]))
const displayText = ref('')
const currentIndex = ref(0)
const currentTextIndex = ref(0)
const isDeleting = ref(false)
const paused = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | undefined

const currentText = computed(() => texts.value[currentTextIndex.value] ?? '')
const reduceMotion = computed(() => shouldReduceMotion(props.reducedMotion))
const renderedText = computed(() => reduceMotion.value ? currentText.value : displayText.value)
const hideCursor = computed(
  () =>
    props.hideCursorOnType && (currentIndex.value < currentText.value.length || isDeleting.value),
)

function clearTypingTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = undefined
  }
}

function scheduleTyping(delay: number) {
  clearTypingTimeout()
  if (paused.value || shouldReduceMotion(props.reducedMotion)) return
  timeoutId = setTimeout(typeNextCharacter, Math.max(0, delay))
}

function typeNextCharacter() {
  if (isDeleting.value) {
    if (!displayText.value) {
      isDeleting.value = false

      if (currentTextIndex.value === texts.value.length - 1 && !props.loop) return

      currentTextIndex.value = (currentTextIndex.value + 1) % texts.value.length
      currentIndex.value = 0
      scheduleTyping(props.waitTime)
      return
    }

    displayText.value = displayText.value.slice(0, -1)
    currentIndex.value = displayText.value.length
    scheduleTyping(props.deleteSpeed)
    return
  }

  if (currentIndex.value < currentText.value.length) {
    displayText.value += currentText.value[currentIndex.value]
    currentIndex.value += 1
    scheduleTyping(props.speed)
    return
  }

  if (texts.value.length > 1) {
    isDeleting.value = true
    scheduleTyping(props.waitTime)
  }
}

function resetTyping() {
  clearTypingTimeout()
  displayText.value = ''
  currentIndex.value = 0
  currentTextIndex.value = 0
  isDeleting.value = false
  if (shouldReduceMotion(props.reducedMotion)) {
    displayText.value = currentText.value
    currentIndex.value = currentText.value.length
    return
  }
  scheduleTyping(props.initialDelay)
}

function play() {
  if (!paused.value) return
  paused.value = false
  scheduleTyping(0)
}

function pause() {
  paused.value = true
  clearTypingTimeout()
}

function restart() {
  paused.value = false
  resetTyping()
}

onMounted(resetTyping)
onBeforeUnmount(clearTypingTimeout)

watch(() => props.text, resetTyping, { deep: true })

defineExpose<PlayableMotionExposes>({ play, pause, restart })
</script>

<template>
  <component
    :is="props.as"
    v-bind="$attrs"
    :class="cn('inline tracking-tight whitespace-pre-wrap', props.class)"
  >
    <span>{{ renderedText }}</span>

    <Motion
      v-if="props.showCursor && !reduceMotion"
      as="span"
      :variants="props.cursorAnimationVariants"
      initial="initial"
      animate="animate"
      :class="cn(props.cursorClass, hideCursor && 'hidden')"
    >
      {{ props.cursorChar }}
    </Motion>
  </component>
</template>
