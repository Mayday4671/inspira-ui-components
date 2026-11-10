<script setup lang="ts">
import { computed, ref } from 'vue'
import UiIcon from './UiIcon.vue'
import { toast } from '../composables/toast'

const props = defineProps<{ code: string; lang?: string }>()

const html = computed(() => highlight(props.code))

async function copy() {
  const value = props.code
  try {
    await navigator.clipboard.writeText(value)
    toast('代码已复制到剪贴板')
  } catch {
    fallbackCopy(value)
  }
}

function fallbackCopy(str: string) {
  const t = document.createElement('textarea')
  t.value = str
  t.style.position = 'fixed'
  t.style.opacity = '0'
  document.body.appendChild(t)
  t.select()
  try {
    document.execCommand('copy')
    toast('代码已复制到剪贴板')
  } catch {
    toast('复制失败，请手动选中代码')
  }
  t.remove()
}

/** 与原型一致的轻量高亮（转义后按词法着色，保持层次即可） */
function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

function highlight(input: string) {
  return esc(input)
    .replace(/(&lt;\/?)([A-Z][\w]*)/g, '$1<span class="fn">$2</span>')
    .replace(/(&quot;[^&]*?&quot;)/g, '<span class="str">$1</span>')
    .replace(/('[^']*')/g, '<span class="str">$1</span>')
    .replace(/\b(import|from|const|ref|setup|lang|template|script)\b/g, '<span class="kw">$1</span>')
}

const showLang = computed(() => Boolean(props.lang))
const langLabel = ref(props.lang ?? 'vue')
void showLang
void langLabel
</script>

<template>
  <div class="code-block">
    <span v-if="lang" class="lang">{{ lang }}</span>
    <button class="copy" type="button" @click="copy">
      <UiIcon name="copy" small /> 复制
    </button>
    <pre><code v-html="html" /></pre>
  </div>
</template>
