import type { App, Component } from 'vue'

export type SFCWithInstall<T> = T & {
  install: (app: App) => void
}

type NamedComponent = Component & { name?: string }

/**
 * Element Plus 同款模式：为组件挂上 install 方法，
 * 使其既能被 `app.use(IuXxx)` 单独注册，也能被全局插件批量注册。
 */
export function withInstall<T extends Component>(comp: T): SFCWithInstall<T> {
  const c = comp as SFCWithInstall<T> & NamedComponent
  c.install = (app: App) => {
    app.component(c.name as string, comp)
  }
  return c
}

/**
 * 组合式组件（如 IuAnimatedModal / IuCard3DContainer）：
 * 父组件单独 use 时，连同其子组件一起注册。
 * 已被注册过的子组件会跳过，避免与全局安装或单独安装产生重复注册告警。
 */
export function withInstallCompound<T extends Component>(
  comp: T,
  ...extras: Component[]
): SFCWithInstall<T> {
  const c = withInstall(comp)
  const baseInstall = c.install
  c.install = (app: App) => {
    baseInstall(app)
    for (const extra of extras as NamedComponent[]) {
      if (extra?.name && !app.component(extra.name)) {
        app.component(extra.name, extra)
      }
    }
  }
  return c
}
