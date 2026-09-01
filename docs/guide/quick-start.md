# 快速上手

本指南将以一个最小的 Vue 3 + Vite 项目为例，带你跑通组件库的两种使用方式。

## 1. 完整引入（推荐入门）

安装组件库后，在入口文件中全量注册——与 Element Plus 用法一致：

```ts
// main.ts
import { createApp } from 'vue'
import InspiraUI from 'inspira-ui-components'
import 'inspira-ui-components/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(InspiraUI)
app.mount('#app')
```

之后所有组件均已 `Iu` 前缀全局注册，模板中直接使用：

```vue
<!-- App.vue -->
<template>
  <IuShimmerButton>立即开始</IuShimmerButton>
  <IuTypewriterText text="Hello, inspira-ui-components" />
</template>
```

## 2. 按需引入（推荐生产）

具名导入需要的组件即可，配合构建工具自动 tree-shaking，未使用的组件不会打进产物：

```vue
<script setup lang="ts">
import { IuShimmerButton, IuNumberTicker } from 'inspira-ui-components'
</script>

<template>
  <IuNumberTicker :value="98765" :decimal-places="0" />
  <IuShimmerButton>立即开始</IuShimmerButton>
</template>
```

样式仍需全量引入一次：

```ts
// main.ts
import 'inspira-ui-components/dist/index.css'
```

单个组件也可以独立注册，或一次注册组合组件的全部子组件：

```ts
import { createApp } from 'vue'
import { IuAnimatedModal } from 'inspira-ui-components'
// IuAnimatedModal 的 install 会连带注册 Trigger / Body / Content / Footer

app.use(IuAnimatedModal)
```

## 3. CJS 项目

```js
const { InspiraUI } = require('inspira-ui-components')
app.use(InspiraUI.default ?? InspiraUI)
```

## 4. TypeScript

组件库自带完整类型声明：

```ts
import type { ShimmerButtonProps } from 'inspira-ui-components'
```

全量注册后，模板中的 `<IuXxx>` 组件也会获得 Volar 类型提示（内置 `GlobalComponents` 声明）。

## 5. 暗色模式

在 `<html>` 或任意祖先元素上添加 `dark` 类即可切换暗色：

```html
<html class="dark">
  ...
</html>
```

```ts
document.documentElement.classList.toggle('dark', isDark)
```
