<script lang="ts" setup>
import { cn } from '../../../utils'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { FlipWordsProps } from './flip-words'

defineOptions({ name: 'IuFlipWords' })

const props = withDefaults(defineProps<FlipWordsProps>(), {
  duration: 3000,
  class: '',
})

defineEmits(['animationStart', 'animationComplete'])

const currentWord = ref(props.words[0])
const isVisible = ref(true)
const timeoutId = ref<number | null>(null)

function startAnimation() {
  isVisible.value = false

  setTimeout(() => {
    const currentIndex = props.words.indexOf(currentWord.value)
    const nextWord = props.words[currentIndex + 1] || props.words[0]
    currentWord.value = nextWord
    isVisible.value = true
  }, 600)
}

const splitWords = computed(() => {
  return currentWord.value.split(' ').map((word) => ({
    word,
    letters: word.split(''),
  }))
})

function startTimeout() {
  timeoutId.value = window.setTimeout(() => {
    startAnimation()
  }, props.duration)
}

onMounted(() => {
  startTimeout()
})

onBeforeUnmount(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }
})

watch(isVisible, (newValue) => {
  if (newValue) {
    startTimeout()
  }
})
</script>

<template>
  <div class="relative inline-block px-2">
    <Transition
      name="iu-flip-words"
      @after-enter="$emit('animationStart')"
      @after-leave="$emit('animationComplete')"
    >
      <div
        v-show="isVisible"
        :class="
          cn(
            `relative z-10 inline-block text-left text-neutral-900 dark:text-neutral-100`,
            props.class,
          )
        "
      >
        <template
          v-for="(wordObj, wordIndex) in splitWords"
          :key="wordObj.word + wordIndex"
        >
          <span
            class="inline-block whitespace-nowrap opacity-0"
            :style="{
              animation: `iu-flip-words-fade-in-word 0.3s ease forwards`,
              animationDelay: `${wordIndex * 0.3}s`,
            }"
          >
            <span
              v-for="(letter, letterIndex) in wordObj.letters"
              :key="wordObj.word + letterIndex"
              class="inline-block opacity-0"
              :style="{
                animation: `iu-flip-words-fade-in-letter 0.2s ease forwards`,
                animationDelay: `${wordIndex * 0.3 + letterIndex * 0.05}s`,
              }"
            >
              {{ letter }}
            </span>
            <span class="inline-block">&nbsp;</span>
          </span>
        </template>
      </div>
    </Transition>
  </div>
</template>

<!-- keyframes 需保持全局（内联 style 引用无法被 scoped 改写），故加 iu- 前缀防冲突 -->
<style>
@keyframes iu-flip-words-fade-in-word {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes iu-flip-words-fade-in-letter {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.iu-flip-words-enter-active {
  animation: iu-flip-words-enter 0.6s ease-in-out forwards;
}

.iu-flip-words-leave-active {
  animation: iu-flip-words-leave 0.6s ease-in-out forwards;
}

@keyframes iu-flip-words-enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iu-flip-words-leave {
  0% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: scale(2);
    filter: blur(8px);
  }
}
</style>
