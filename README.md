# inspira-ui-components

Inspira UI 风格的 **Vue 3 动效组件库** —— 参考 [Element Plus](https://element-plus.org) 的库架构打造，可发布为 npm 包直接调用。

组件移植自 [Inspira UI](https://inspira-ui.com)（MIT 协议），首批收录 20 个高通用性轻量组件（纯 CSS + motion-v，无 WebGL 重依赖）。

## 特性

- **Element Plus 式接入**：`app.use(InspiraUI)` 全量注册 `Iu` 前缀组件；也支持具名导入按需使用（tree-shaking 友好）
- **配置解决八成，插槽兜底两成**：IuDialog 传一个 `confirm` 函数自动管 loading 与关闭；按钮统一 `size / loading / disabled / block`；IuCard3D 一行代码出卡片（三件套保留精细控制）
- **自包含 CSS**：产物 `dist/index.css` 由 Tailwind v4 编译而成，使用方**零 Tailwind 依赖**，import 即用
- **CSS 变量主题**：设计令牌收敛为 `--iu-*` 变量（对标 `--el-*`），覆盖变量即换肤；`.dark` 类即开暗色
- **完整 TypeScript 类型**：含 Props 类型导出与 Volar `GlobalComponents` 全局提示
- **双格式产物**：ESM + CJS，`vue` 为 peerDependency（>= 3.5）

## 安装与使用

```bash
npm install inspira-ui-components
```

```ts
// 全量注册（main.ts）
import { createApp } from 'vue'
import InspiraUI from 'inspira-ui-components'
import 'inspira-ui-components/dist/index.css'
import App from './App.vue'

createApp(App).use(InspiraUI).mount('#app')
```

```vue
<!-- 模板中直接使用 -->
<template>
  <IuShimmerButton>立即开始</IuShimmerButton>
</template>
```

或按需引入：

```vue
<script setup lang="ts">
import { IuShimmerButton, IuAnimatedModal, IuNumberTicker } from 'inspira-ui-components'
</script>
```

完整文档（安装 / 快速上手 / 主题定制 / 每个组件的示例与 API 表格）见 `docs/` 文档站。

## 首批组件（22 个）

| 分类 | 组件 |
| ---- | ---- |
| 按钮 | InteractiveHoverButton · RainbowButton · RippleButton · GradientButton · ShimmerButton（统一 size/loading/disabled/block + variant 预设） |
| 卡片 | Card3D（快捷模式 + 三件套） · CardSpotlight · FlipCard · GlareCard |
| 文本动画 | NumberTicker · TypewriterText · FlipWords · TextGenerateEffect · BlurReveal |
| 交互 | **Dialog（confirm 函数自动管 loading/关闭）** · AnimatedModal（五件套） · AnimatedTooltip · Marquee · BentoGrid |
| 数据展示 | **Statistic（数字滚动 + 前后缀 + 涨跌幅）** |
| 背景 | AuroraBackground · PatternBackground |

## Monorepo 结构

```
├── packages/inspira-ui   # 组件库（npm 包名 inspira-ui-components）
│   ├── src/components/   # 每组件一目录：index.ts + src/（vue + types）
│   ├── src/styles/       # --iu-* 令牌 + Tailwind 主题映射（构建入口）
│   ├── src/utils/        # withInstall / withInstallCompound / cn
│   └── dist/             # inspira-ui.mjs / .cjs / index.css / 类型声明
├── playground/           # 演示站（源码模式 + --mode dist 产物验证模式）
└── docs/                 # VitePress 中文文档站（Element Plus 式示例 + API 表格）
```

## 开发

```bash
pnpm install          # 安装依赖
pnpm dev              # Playground（直连组件源码，热更）
pnpm dev:dist         # Playground 产物模式（只引 dist，模拟 npm 使用方）
pnpm dev:docs         # 文档站
pnpm typecheck        # vue-tsc 类型检查
pnpm build            # 构建组件库
pnpm build:playground # 构建演示站（源码模式）
pnpm build:docs       # 构建文档站
```

## 发布

```bash
cd packages/inspira-ui
pnpm build
npm publish           # 发布前请先在 npmjs.com 确认包名可用
```

## 主题定制

```css
/* 覆盖 --iu-* 变量即可换肤 */
:root {
  --iu-primary: #2563eb;
  --iu-primary-foreground: #ffffff;
}
```

暗色模式：给 `<html>` 添加 `dark` 类。

## 许可

组件源码移植自 [rahulv-official/inspira-ui](https://github.com/rahulv-official/inspira-ui)（MIT）。
