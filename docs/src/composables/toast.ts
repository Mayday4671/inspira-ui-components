import { ref } from 'vue'
export interface ToastItem {
  id: number
  msg: string
}

const toasts = ref<ToastItem[]>([])
let seq = 0

export function useToasts() {
  return toasts
}

export function toast(msg: string) {
  const id = ++seq
  toasts.value.push({ id, msg })
  setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 2100)
}
