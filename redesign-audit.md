# redesign-audit.md —— 重设计前置盘点（基于当前工作树实测，非猜测）

> 审计时间：阶段 A 开始前。工具：源码直读 + git log + 合约测试通读。
> 结论分级：✅ 已存在可复用 ｜ ⚠️ 存在缺陷/需迁移 ｜ ❓ 未验证（进入对应阶段时实测）

## 1. 构建体系与包元数据 ✅

- pnpm monorepo（pnpm 10.24.0，Node engines >=20.19）。**本机注意**：系统 Node（D:\soft\NodeJs）为 32 位 ia32，Tailwind v4 原生依赖（lightningcss/oxide）无 ia32 Windows 构建；项目已备 `.tools/node-v22.17.0-win-x64` 便携 x64 Node，**所有 vite/vitest 命令必须以它为 PATH 前置执行**。
- npm 包名 `inspira-ui-components` v0.1.0，exports（types/import/require + dist/index.css）、files=[dist]、sideEffects=[**/*.css]、peerDeps vue>=3.5、deps @vueuse/core+motion-v+clsx+tailwind-merge+cva —— 全部保持不动。
- 构建 `pnpm --filter inspira-ui-components build`（vite lib，es+cjs+dts+自包含 CSS）；`typecheck`（vue-tsc）；`test`（vitest，7 个合约测试文件 456 行）。
- 根脚本：dev / dev:docs / build / build:playground / build:docs / build:all / test:workspace。

## 2. 真实组件清单（以源码导出为准，非页面数字）✅

`Iu` 前缀导出 31 个（含组合子组件）。**文档级组件 22 个**（与原型"标注 22"吻合）：

| 分类 | 组件（导出名 = Iu + name） |
|---|---|
| 按钮 ×5 | ShimmerButton、InteractiveHoverButton、RainbowButton、GradientButton、RippleButton |
| 卡片 ×5 | Card3D（快捷模式；Container/Body/Item 为其高级子件）、CardSpotlight、FlipCard、GlareCard、BentoGrid（Grid/Item/Card 三件套） |
| 文本 ×5 | NumberTicker、TypewriterText、FlipWords、TextGenerateEffect、BlurReveal |
| 交互 ×5 | Dialog、AnimatedModal（五件套）、AnimatedTooltip、Marquee、Statistic* |
| 背景 ×2 | AuroraBackground、PatternBackground |

\* Statistic 归入"数据"类（原型分类），合计 5 类 22 个。原型列表少列的 Aurora/Pattern 以真实导出补齐——**不虚构、不删减**。

## 3. 当前 API 状态（自上次会话后已被后续开发增强）✅ 需逐组件读源码建表

关键增强（已读源码确认）：
- 统一按钮契约（button-shared.ts）：size/loading/disabled/block/**tag**/**nativeType**/autofocus/**loadingText**/ariaLabel + exposes(ref/focus/blur)；RainbowButton 保留 legacy `is` 优先于 `tag`。
- 卡片类普遍新增 `imageAlt/cta/href/target/disabled` CTA 能力；GlareCard 有 `width/height/radius`。
- 动效组件新增 `reducedMotion?: ReducedMotionMode`（尊重 prefers-reduced-motion）。
- Dialog：`closeOnPressEscape/beforeClose/destroyOnClose` 等（Element Plus 风格）；Marquee 新增结构化 `items` prop。
- **详情页 API 表与演示代码必须逐个从这些类型文件提取，禁止用旧文档记忆填充。**

## 4. 现有文档站（将被替换）⚠️ 迁移说明

- 现状：VitePress 1.6.4 站点（config.mts + 22 个 md + demo-block.vue + examples/*/basic.vue + custom.css 宽度覆盖）。
- 决策：原型是自定义 hash 路由 SPA 设计（#/home 等、自建顶栏/侧栏/TOC/搜索命令面板），VitePress 主题机制无法高保真复现。**将 docs/ 替换为 Vite + Vue 3 + vue-router(hash) SPA**，通过 vite alias 直接引用 `packages/inspira-ui/src`（与 playground 同方案 → 演示即真实组件且热更）。
- 前后兼容说明：
  - 组件库本身 0 改动（导出、API、动画、npm 用法、dist 产物全部不动）。
  - `docs-contract.spec.ts` 现断言 VitePress 文件结构（config.mts/examples/demo-block/custom.css）→ 随 IA 替换**同步重写**为新结构的合约（注册表完整性 = 真实导出、每个 slug 有详情、示例代码必须 import 真实包名等），其余 6 个组件行为合约测试不动且必须继续通过。
  - playground 不动。

## 5. 滚动条与布局现状 ❓（阶段 A 实测）

- 现文档为 VitePress 默认滚动模型。新 SPA 按规范实现：html/body 自然滚动（唯一主滚动条）、侧栏 sticky + 隐藏滚动条（scrollbar-width:none）、TOC sticky 无独立滚动、preview-stage 无纵向滚动；验收脚本按提示词量化检查。

## 6. 环境风险 ❓→ 已知缓解

- 浏览器工具：本会话 Playwright MCP 不可用，改用 browser-use 官方技能驱动 Chromium 截图与量化检查（阶段 F）。
- 设计基准文件在 `design-reference/`（原型 CSS/交互全部在手，含 tokens/breakpoints/交互 JS 逻辑），实现时逐段对照。
