<script setup>
import Demo from '../examples/animated-modal/basic.vue'
import DemoSource from '../examples/animated-modal/basic.vue?raw'
import Uncontrolled from '../examples/animated-modal/uncontrolled.vue'
import UncontrolledSource from '../examples/animated-modal/uncontrolled.vue?raw'
</script>

# AnimatedModal 动画模态框

带 3D 翻入动画、背景模糊与焦点管理的模态框，由五个组件组合而成。

## 受控模式（v-model:open）

<DemoBlock :demo="Demo" :code="DemoSource" title="受控模态框" />

## 非受控模式

不传 `open` 即非受控；默认插槽提供 `open / openModal / closeModal / toggle` 作用域参数。

<DemoBlock :demo="Uncontrolled" :code="UncontrolledSource" title="非受控模态框" />

## 组成

| 组件                     | 职责                                   |
| ------------------------ | -------------------------------------- |
| `IuAnimatedModal`        | 状态容器（受控 / 非受控、Esc 关闭）    |
| `IuAnimatedModalTrigger` | 触发按钮                               |
| `IuAnimatedModalBody`    | 弹层（Teleport、遮罩、关闭按钮、动画） |
| `IuAnimatedModalContent` | 内容区                                 |
| `IuAnimatedModalFooter`  | 底部操作区                             |

## IuAnimatedModal 属性

| 名称        | 说明                            | 类型      | 默认值   |
| ----------- | ------------------------------- | --------- | -------- |
| open        | 受控打开状态（配合 v-model:open）| `boolean` | —        |
| defaultOpen | 非受控模式的初始打开状态        | `boolean` | `false`  |
| closeOnEsc  | 按 Esc 关闭                     | `boolean` | `true`   |

## IuAnimatedModal 属性 / 事件

| 事件名        | 说明                     |
| ------------- | ------------------------ |
| update:open   | 打开状态变化（v-model）  |
| open          | 打开时触发               |
| close         | 关闭时触发               |

## IuAnimatedModalBody 属性

| 名称           | 说明                        | 类型                 | 默认值    |
| -------------- | --------------------------- | -------------------- | --------- |
| showClose      | 显示右上角关闭按钮          | `boolean`            | `true`    |
| closeOnOutside | 点击遮罩关闭                | `boolean`            | `true`    |
| lockScroll     | 打开时锁定页面滚动          | `boolean`            | `true`    |
| zIndex         | 弹层 z-index                | `number`             | `10000`   |
| teleportTo     | Teleport 目标               | `string \| HTMLElement` | `body` |
| class          | 面板类名（合并）            | `string`             | —         |
| overlayClass   | 遮罩类名                    | `string`             | —         |
| contentClass   | 内容包裹层类名              | `string`             | —         |

## IuAnimatedModalTrigger 属性

| 名称     | 说明               | 类型      | 默认值   |
| -------- | ------------------ | --------- | -------- |
| as       | 渲染的标签         | `string`  | `button` |
| disabled | 禁用触发           | `boolean` | `false`  |

## 组合式函数

```ts
import { useAnimatedModal } from 'inspira-ui-components'

// 在 <IuAnimatedModal> 内的任意层级组件中使用
const { open, openModal, closeModal, toggle } = useAnimatedModal()
```
