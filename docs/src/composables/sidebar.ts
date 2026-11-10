import { ref } from 'vue'

/** 移动端侧边抽屉开关（App 头部菜单按钮与各文档壳共用） */
export const sidebarOpen = ref(false)

export function useSidebar() {
  return { open: sidebarOpen, close: () => (sidebarOpen.value = false) }
}
