<script setup lang="ts">
import { computed, ref } from 'vue'
import { toast } from '../composables/toast'

const props = defineProps<{ code: string; lang?: string }>()

const html = computed(() => highlight(props.code))
const copied = ref(false)

async function copy() {
  const value = props.code
  try {
    await navigator.clipboard.writeText(value)
    markCopied()
    toast('代码已复制到剪贴板')
  } catch {
    if (fallbackCopy(value)) {
      markCopied()
      toast('代码已复制到剪贴板')
    } else {
      toast('复制失败，请手动选中代码')
    }
  }
}

function markCopied() {
  copied.value = true
  setTimeout(() => (copied.value = false), 1600)
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
    return true
  } catch {
    return false
  } finally {
    t.remove()
  }
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
</script>

<template>
  <div class="code-block">
    <span v-if="lang" class="lang">{{ lang }}</span>
    <button
      class="copy copy-icon"
      type="button"
      :class="{ copied }"
      :aria-label="copied ? '已复制' : '复制'"
      :data-tip="copied ? '已复制' : '复制'"
      @click="copy"
    >
      <!-- 复制中/已复制显示对勾，默认纯图标，悬停显示提示 -->
      <svg v-if="copied" class="icon small" aria-hidden="true"><use href="#i-check" /></svg>
      <svg v-else class="icon small" aria-hidden="true"><use href="#i-copy" /></svg>
    </button>
    <pre><code v-html="html" /></pre>
  </div>
</template>

<style scoped>
.copy-icon {
  width: 30px;
  height: 30px;
  padding: 0;
  display: grid;
  place-items: center;
  position: relative;
}

.copy-icon .icon {
  width: 15px;
  height: 15px;
}

/* 悬停提示：data-tip 渲染为小气泡 */
.copy-icon::after {
  content: attr(data-tip);
  position: absolute;
  top: calc(100% + 7px);
  right: 0;
  background: #32394b;
  border: 1px solid #454c60;
  color: #dee4f5;
  font-size: 10px;
  line-height: 1;
  padding: 5px 8px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-3px);
  transition: opacity 0.15s, transform 0.15s;
  z-index: 2;
}

.copy-icon:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.copy-icon.copied::after {
  content: attr(data-tip);
}
</style>
