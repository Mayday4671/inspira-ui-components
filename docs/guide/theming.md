# 主题定制

组件库将全部设计令牌收敛为 `--iu-*` CSS 变量（对标 Element Plus 的 `--el-*`）。
**覆盖变量即可换肤，无需重新编译。**

## 变量一览

| 变量                      | 说明             | 亮色默认  | 暗色默认  |
| ------------------------- | ---------------- | --------- | --------- |
| `--iu-background`         | 页面背景         | `#ffffff` | `#09090b` |
| `--iu-foreground`         | 前景文本         | `#09090b` | `#fafafa` |
| `--iu-primary`            | 主色             | `#18181b` | `#fafafa` |
| `--iu-primary-foreground` | 主色上的文本     | `#fafafa` | `#18181b` |
| `--iu-secondary`          | 次级色           | `#f4f4f5` | `#27272a` |
| `--iu-muted`              | 弱化背景         | `#f4f4f5` | `#27272a` |
| `--iu-muted-foreground`   | 弱化文本         | `#71717a` | `#a1a1aa` |
| `--iu-accent`             | 强调背景         | `#f4f4f5` | `#27272a` |
| `--iu-border`             | 边框             | `#e4e4e7` | `#27272a` |
| `--iu-input`              | 输入框边框       | `#e4e4e7` | `#27272a` |
| `--iu-ring`               | 焦点环           | `#18181b` | `#d4d4d8` |
| `--iu-card`               | 卡片背景         | `#ffffff` | `#09090b` |
| `--iu-destructive`        | 危险色           | `#dc2626` | `#ef4444` |

## 覆盖示例：品牌主色改为蓝色

在引入组件库样式**之后**覆盖变量：

```css
/* 你的全局样式 */
:root {
  --iu-primary: #2563eb;
  --iu-primary-foreground: #ffffff;
  --iu-ring: #2563eb;
}
```

或按命名空间局部生效（只影响某个区域）：

```vue
<template>
  <div class="brand-theme">
    <IuInteractiveHoverButton text="品牌按钮" />
  </div>
</template>

<style>
.brand-theme {
  --iu-primary: #2563eb;
  --iu-primary-foreground: #ffffff;
}
</style>
```

## 暗色模式

令牌分为 `:root`（亮色）与 `.dark`（暗色）两套。给 `<html>` 加 `dark` 类即切换：

```html
<html class="dark"></html>
```

也可以只在某个子树启用暗色：

```html
<div class="dark">
  <!-- 该区域内组件呈现暗色 -->
</div>
```

## 搭配 Tailwind 的项目

本组件库的产物 CSS **不包含 preflight、不输出任何 `--color-*` 全局变量**，
与使用方自己的 Tailwind v4 工程互不干扰，可放心共存。
