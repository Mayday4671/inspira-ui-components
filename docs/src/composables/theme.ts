import { ref, watchEffect } from 'vue'



const KEY = 'inspira-docs-theme'

const current = ref<'light' | 'dark'>(readInitial())

function readInitial(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* localStorage 不可用时忽略 */
  }
  return 'light'
}

let toastHandler: ((msg: string) => void) | null = null

export function useTheme() {
  return current
}

export function setTheme(mode: 'light' | 'dark', silent = false) {
  current.value = mode
  try {
    localStorage.setItem(KEY, mode)
  } catch {
    /* 忽略 */
  }
  if (!silent && toastHandler) {
    toastHandler(mode === 'dark' ? '已切换深色主题' : '已切换浅色主题')
  }
}

export function toggleTheme() {
  setTheme(current.value === 'dark' ? 'light' : 'dark')
}

export function bindThemeToaster(handler: (msg: string) => void) {
  toastHandler = handler
}

/**
 * 主题类同时挂到 html 与 body：
 * - 视口滚动条属于 html 层，只挂 body 会导致滚动条读不到暗色变量；
 * - 组件库 --iu-* 令牌按 .dark 祖先匹配，html 级同样生效。
 */
watchEffect(() => {
  const dark = current.value === 'dark'
  document.documentElement.classList.toggle('dark', dark)
  document.body.classList.toggle('dark', dark)
})
