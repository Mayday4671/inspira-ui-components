import { describe, expect, it } from 'vitest'
import * as components from '../index'

/**
 * P0 注册契约（整改任务书遗留的长期回归）：
 * 每个带 install 的导出，install 时必须以有效的组件名注册。
 * SFC 缺 defineOptions({ name }) 时 c.name 为 undefined，
 * app.component(undefined, comp) 静默失效 —— 此测试防止批次移植再漏。
 */
describe('withInstall registration contract', () => {
  it('no component registers under an undefined/null name', () => {
    const broken: string[] = []
    let checked = 0
    for (const [key, comp] of Object.entries(components)) {
      const c = comp as { install?: (app: unknown) => void }
      if (!c || typeof c.install !== 'function') continue
      checked += 1
      let name: unknown = 'NOT_CALLED'
      c.install({
        component(n: unknown) {
          if (name === 'NOT_CALLED') name = n
          return undefined
        },
      })
      if (name === undefined || name === null || typeof name !== 'string' || name.length === 0) {
        broken.push(key)
      }
    }
    expect(checked).toBeGreaterThan(150)
    expect(broken, `以下导出注册键无效: ${broken.join(', ')}`).toEqual([])
  })

  it('registered name matches the export name', () => {
    const mismatched: string[] = []
    for (const [key, comp] of Object.entries(components)) {
      const c = comp as { install?: (app: unknown) => void }
      if (!c || typeof c.install !== 'function') continue
      if (key === 'default' || key === 'InspiraUI') continue
      const names: string[] = []
      c.install({
        component(n: string) {
          names.push(n)
          return undefined
        },
      })
      // withInstallCompound 会连同子组件一起注册（设计如此），
      // 断言导出名本身在注册名集合中即可
      if (!names.includes(key)) mismatched.push(`${key} -> [${names.join(', ')}]`)
    }
    expect(mismatched, `注册名与导出名不一致: ${mismatched.join(', ')}`).toEqual([])
  })
})
