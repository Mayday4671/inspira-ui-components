# 安装

## 环境要求

- Node.js >= 20.19
- Vue >= 3.5

## 包管理器安装

::: code-group

```bash [npm]
npm install inspira-ui-components
```

```bash [pnpm]
pnpm add inspira-ui-components
```

```bash [yarn]
yarn add inspira-ui-components
```

:::

`vue` 需已存在于你的项目中（peer dependency）；`motion-v`、`@vueuse/core` 等运行时依赖会自动安装。

## 引入样式

组件库的样式是**编译后的自包含 CSS**，不需要在你的项目中安装或配置 Tailwind：

```ts
import 'inspira-ui-components/dist/index.css'
```

## 浏览器支持

| 浏览器 | 版本  |
| ------ | ----- |
| Chrome | ≥ 87  |
| Edge   | ≥ 88  |
| Firefox| ≥ 78  |
| Safari | ≥ 14  |

基于现代浏览器特性（CSS 嵌套、`cqw/cqh` 容器查询单位等），不支持 IE。
