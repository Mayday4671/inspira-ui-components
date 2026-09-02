<script setup>
import Demo from '../examples/card-3d/basic.vue'
import DemoSource from '../examples/card-3d/basic.vue?raw'
</script>

# Card3D 3D 透视卡片

鼠标悬停时整卡跟随旋转、内部元素沿 Z 轴分层抬升的 3D 卡片。默认使用属性式快捷 API，原有三件套继续用于高级定制。

## 快捷模式（推荐）

<DemoBlock :demo="Demo" :code="DemoSource" title="属性式快捷调用" />

## IuCard3D 属性

| 名称         | 说明                     | 类型     | 默认值            |
| ------------ | ------------------------ | -------- | ----------------- |
| title        | 标题                     | `string` | —                 |
| description  | 描述文字                 | `string` | —                 |
| image        | 背景图地址（自动铺满）   | `string` | 内置渐变底图      |
| imageAlt     | 背景图替代文本           | `string` | —                 |
| cta          | 底部胶囊按钮文案         | `string` | —                 |
| href         | 行动链接                  | `string` | —                 |
| target       | 链接打开目标              | `string` | —                 |
| disabled     | 禁用行动链接              | `boolean` | `false`          |
| class        | 卡片主体类名（合并）     | `string` | —                 |

## 三件套组件

| 组件                | 职责                                     |
| ------------------- | ---------------------------------------- |
| `IuCard3DContainer` | 外层容器，监听鼠标、驱动整卡旋转         |
| `IuCard3DBody`      | 卡片主体（默认 384×384），保持 3D 空间   |
| `IuCard3DItem`      | 可变换的内部元素，悬停时按 Z 轴浮起      |

::: tip
在 `IuCard3DBody` 内用普通 `div` 包裹 `IuCard3DItem` 时，需要给该 div 加
`style="transform-style: preserve-3d"`，否则 Z 轴位移不生效。
:::

## IuCard3DContainer 属性

| 名称           | 说明                             | 类型     | 默认值 |
| -------------- | -------------------------------- | -------- | ------ |
| class          | 旋转层类名（合并）               | `string` | —      |
| containerClass | 最外层 perspective 容器类名      | `string` | —      |

## IuCard3DBody 属性

| 名称  | 说明                 | 类型     | 默认值 |
| ----- | -------------------- | -------- | ------ |
| class | 主体类名（合并）     | `string` | —      |

## IuCard3DItem 属性

| 名称       | 说明                          | 类型     | 默认值  |
| ---------- | ----------------------------- | -------- | ------- |
| as         | 渲染的标签（如 `p`、`img`）   | `string` | `div`   |
| translateX | 悬停时 X 轴位移（px）         | `number` | `0`     |
| translateY | 悬停时 Y 轴位移（px）         | `number` | `0`     |
| translateZ | 悬停时 Z 轴位移（px）         | `number` | `0`     |
| rotateX    | 悬停时绕 X 轴旋转（deg）      | `number` | `0`     |
| rotateY    | 悬停时绕 Y 轴旋转（deg）      | `number` | `0`     |
| rotateZ    | 悬停时绕 Z 轴旋转（deg）      | `number` | `0`     |
| class      | 元素类名（合并）              | `string` | —       |

## 插槽

三件套组件均提供 `default` 插槽承载内容。
