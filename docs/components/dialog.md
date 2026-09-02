<script setup>
import Demo from '../examples/dialog/basic.vue'
import DemoSource from '../examples/dialog/basic.vue?raw'
import Danger from '../examples/dialog/danger.vue'
import DangerSource from '../examples/dialog/danger.vue?raw'
</script>

# Dialog 弹窗

自带标题、确定/取消与异步 loading 的弹窗。**传一个 `confirm` 函数，loading 与关闭时机全自动**：
函数执行期间确认按钮转圈并防重复提交；正常返回自动关闭，返回 `false` 或抛异常保持打开。

## 基础用法（异步确认）

<DemoBlock :demo="Demo" :code="DemoSource" title="传一个函数，杂事自动管" />

## 危险操作

<DemoBlock :demo="Danger" :code="DangerSource" title="danger 红色确认按钮" />

## 属性

| 名称              | 说明                                              | 类型                          | 默认值    |
| ----------------- | ------------------------------------------------- | ----------------------------- | --------- |
| v-model           | 弹窗开关                                          | `boolean`                     | `false`   |
| title             | 标题                                              | `string`                      | —         |
| description       | 副标题 / 说明文字                                 | `string`                      | —         |
| width             | 弹窗宽度（px 数值或 CSS 宽度）                    | `number \| string`            | `460`     |
| confirm           | 异步确认函数（loading 与关闭时机自动管理）        | `() => Promise<any> \| any`   | —         |
| confirm-text      | 确认按钮文案，传空字符串隐藏                      | `string`                      | `确 定`   |
| cancel-text       | 取消按钮文案，传空字符串隐藏                      | `string`                      | `取 消`   |
| loading           | 外部控制的 loading                                | `boolean`                     | `false`   |
| close-on-click-modal | 点击遮罩关闭（loading 时自动禁用）             | `boolean`                     | `true`    |
| close-on-press-escape | 按 Escape 关闭                                | `boolean`                     | `true`    |
| before-close      | 关闭前守卫，仅调用 `done()` 后关闭               | `(done) => void \| Promise<void>` | —     |
| destroy-on-close | 关闭后销毁弹窗内容                               | `boolean`                     | `false`   |
| show-close        | 显示右上角关闭按钮                                | `boolean`                     | `true`    |
| danger            | 确认按钮使用危险色                                | `boolean`                     | `false`   |
| teleport-to       | Teleport 目标                                     | `string \| HTMLElement`       | `body`    |
| z-index           | 弹层 z-index                                      | `number`                      | `10000`   |

## 事件

| 名称    | 说明                                       |
| ------- | ------------------------------------------ |
| confirm | 点击确认时触发（若传了 `confirm` 函数则先触发事件再执行函数） |
| cancel  | 点击取消 / 关闭按钮时触发                   |
| open    | 开始打开时触发                             |
| opened  | 打开完成后触发                             |
| close   | 开始关闭时触发                             |
| closed  | 关闭完成后触发                             |

## 插槽

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 弹窗主体内容                     |
| header  | 自定义标题区（替代 title/description） |
| footer  | 自定义底部操作区（作用域参数：loading / confirm / cancel） |

## 实例方法

| 名称 | 说明 |
| --- | --- |
| open | 打开弹窗 |
| close | 请求关闭弹窗，并执行 `beforeClose` |
| handleConfirm | 执行确认流程 |
| handleCancel | 执行取消流程 |

::: tip
需要完全自定义弹窗结构（多区域布局、表单分块）时，改用底层五件套
[IuAnimatedModal](/components/animated-modal.md)。
:::
