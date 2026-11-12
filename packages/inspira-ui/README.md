# inspira-ui-components

Vue 3.5+ 动效组件库，面向 Vite 等浏览器打包器。

```sh
npm install inspira-ui-components
```

```vue
<script setup lang="ts">
import { IuShimmerButton } from 'inspira-ui-components/components/shimmer-button'
import 'inspira-ui-components/dist/index.css'
</script>

<template>
  <IuShimmerButton>立即开始</IuShimmerButton>
</template>
```

组件和相关类型也可从 `inspira-ui-components` 具名导入。使用 Vite 7 时，组件入口可避免构建产物出现根入口扫描产生的闲置 WASM 资产。全量注册时，从 `inspira-ui-components` 默认导入 `InspiraUI` 并调用 `app.use(InspiraUI)`，同时导入上述 CSS。

CSS 自带作用于库组件的工具类和组件 scoped 样式。在 `<html>` 上添加 `dark` 类启用暗色模式，也可通过 `--iu-*` CSS 变量定制主题。

包提供 ESM 入口。此前使用 CommonJS `require()` 的项目需迁移到 ESM `import`。根入口的运行时兼容范围为浏览器构建。

组件移植自 [Inspira UI](https://github.com/rahulv-official/inspira-ui)。上游版权和 MIT 许可全文随包提供，参见 [LICENSE](LICENSE)。

`dist/types/ogl` 中的声明来自 [OGL](https://github.com/oframe/ogl)，依照其 Unlicense 分发，修正了 ESM 相对导入路径。
