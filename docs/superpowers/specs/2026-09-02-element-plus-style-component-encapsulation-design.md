# Element Plus 式组件封装与文档站改造设计

## 背景

当前项目已经具备 Vue 3 组件库、VitePress 文档站和 Playground 三层结构，也为一部分组件增加了快捷 props。然而，28 个文档示例中有 18 个仍包含独立 `<style>`，多个示例要求用户手写布局容器、装饰标签、循环结构和纯展示 CSS。文档展示的是移植后的内部拼装方式，而不是成熟组件库面向业务用户的稳定公开 API。

本次改造参考 Element Plus 的产品方式：组件内部负责默认结构、样式、交互状态和可访问性；用户通过明确的属性、事件、插槽及实例方法完成常见需求。已有底层能力继续保留，不强迫现有用户迁移。

## 目标

1. 常见场景能够用一个 `Iu*` 组件标签和少量业务属性完成。
2. 用户示例不再展示仅用于组件外观的 CSS、无业务含义的包装标签或复制自源码的内部结构。
3. 每个组件按适用情况公开 Element Plus 式的 Props、Events、Slots 和 Exposes。
4. 保持现有 props、插槽、组件名和组合式组件可用，避免破坏已有项目。
5. 文档站补齐搜索、组件总览、版本、Playground、源码与维护入口，并统一 Demo 体验。
6. 为新的公共 API、事件和实例方法建立自动化测试，锁定兼容行为。

## 非目标

- 不逐像素复制 Element Plus 的品牌视觉、赞助商模块或内容。
- 不删除 Card3D、AnimatedModal、BentoGrid 等现有组合式子组件。
- 不把所有个性化表现都做成 props；复杂定制仍由插槽承担。
- 不在本次增加新的动效组件类别。
- 不伪造不存在的在线 Playground、仓库地址、更新日志或社区链接；没有真实目标时隐藏入口。

## 设计原则

### 配置覆盖常用场景

组件为常见的标题、描述、图片、操作、尺寸、状态和内容列表提供语义化 props，并提供合理默认样式。用户不需要了解组件内部 Tailwind 类、DOM 层级或动效实现。

### 插槽承接高级定制

已有默认插槽和命名插槽保持兼容。若用户提供插槽，插槽优先于对应快捷 props。插槽只承担业务内容或高级布局，不承担组件正常显示所必需的结构。

### 事件描述行为，方法控制实例

能够产生用户可观察状态变化的组件公开类型化事件。需要命令式控制的组件通过 `defineExpose` 提供最小实例 API，不暴露内部动画对象和实现细节。

### 旧 API 继续工作

新增 API 采用可选字段和默认值。已有 props 含义不变；已有插槽继续渲染；已有组合组件继续导出。若新旧输入同时出现，规则在文档中明确，并优先保护旧用法。

## 公共 API 设计

### 按钮组件

适用组件：InteractiveHoverButton、RainbowButton、RippleButton、GradientButton、ShimmerButton。

在现有 `size / loading / disabled / block` 基础上统一增加：

- `tag`: 渲染标签或组件，默认 `button`。
- `nativeType`: 原生按钮类型，默认 `button`。
- `autofocus`: 是否自动聚焦。
- `loadingText`: loading 时的可选文案；未设置时保留默认插槽内容。
- `ariaLabel`: 仅图标或视觉文本不足时使用的可访问名称。

RainbowButton 现有的 `is` 保留为兼容别名；若同时传入 `is` 与 `tag`，沿用旧字段 `is`，避免现有封装层改变渲染标签。

统一事件：

- `click(event)`: 非 loading、非 disabled 状态下触发。

统一实例方法：

- `ref`: 根 HTML 元素引用。
- `focus()`: 聚焦根元素。
- `blur()`: 移除焦点。

按钮内部统一处理 disabled/loading 拦截、原生属性、焦点环和 loading 状态，不要求用户添加状态 CSS。

### 卡片组件

适用组件：Card3D、CardSpotlight、FlipCard、GlareCard、BentoGridCard。

快捷字段按组件明确划分：

- Card3D 保留 `title / description / image / cta`，新增 `imageAlt / href / target / disabled`。
- CardSpotlight 保留 `title / description`，新增 `image / imageAlt / cta / href / target / disabled`。
- FlipCard 保留 `image / backTitle / backDescription`，新增 `imageAlt / cta / href / target / disabled`。
- GlareCard 保留 `image / width / radius`，新增 `title / description / imageAlt / height / cta / href / target / disabled`。
- BentoGridCard 保留 `name / description / icon / href / cta`，新增 `image / imageAlt / target / disabled`；网格跨度由 BentoGrid 数据项或 IuBentoGridItem 控制。

仅在存在操作文案或目标时渲染行动区；数值尺寸由组件内部转成带单位的样式。`disabled` 会禁止链接跳转和指针交互，但不隐藏内容。

统一优先级：命名插槽 > 对应快捷 props > 不渲染该区域。已有默认插槽保持最高自由度。

Card3D 的三件套和现有快捷组件并存；文档默认展示快捷模式，高级页面再展示逐元素变换控制。

### 列表与集合组件

适用组件：AnimatedTooltip、Marquee、BentoGrid。

- AnimatedTooltip 保留现有 `items`，补齐空数组处理、图片替代文本和 item 点击事件。
- Marquee 新增可选 `items: Array<string | { key: string | number; label: string }>` 与 `itemKey`，能够直接渲染字符串或带稳定键的简单对象；默认插槽继续支持完全自定义内容。
- BentoGrid 新增可选 `items: BentoGridDataItem[]`；数据项明确包含 `key`、`name`、`description`，并可选包含 `icon`、`href`、`cta`、`colSpan`、`rowSpan`。现有 Grid/Item/Card 组合组件继续保留。

当同时提供 `items` 和默认插槽时，默认插槽优先，避免改变旧代码行为。

### 弹窗组件

IuDialog 继续作为推荐的高层组件，AnimatedModal 继续作为底层组合能力。

IuDialog 补齐：

- 事件：`open`、`opened`、`close`、`closed`、`confirm`、`cancel`、`update:modelValue`。
- 实例方法：`open()`、`close()`、`handleConfirm()`、`handleCancel()`。
- `beforeClose(done): void | Promise<void>`：可选关闭守卫；只有调用 `done()` 才继续关闭，抛错或未调用时保持打开。
- `destroyOnClose`：关闭后销毁主体内容。
- `closeOnPressEscape`：是否允许 Escape 关闭。
- 标题与描述的 ARIA 关联、打开后的焦点进入、关闭后的焦点恢复。

现有 `confirm` 函数的自动 loading 和返回 `false` 保持打开语义不变。

### 数字与文本动效

适用组件：NumberTicker、Statistic、TypewriterText、FlipWords、TextGenerateEffect、BlurReveal。

按组件实际生命周期补齐：

- `start`：动画开始。
- `change(value)`：显示值或当前词发生变化。
- `finish`：单次动画完成。
- `cycle(index)`：多段文字完成一次轮播。

增加 `reducedMotion?: 'system' | 'always' | 'never'` 策略，默认 `system` 并尊重 `prefers-reduced-motion`。减少动效时直接显示最终内容并保持事件语义可预测。

实例方法按组件固定：NumberTicker 与 Statistic 暴露 `restart()`；TypewriterText 与 FlipWords 暴露 `play() / pause() / restart()`；TextGenerateEffect 与 BlurReveal 暴露 `restart()`。其他文本或背景组件不制造无意义的命令式方法。

### 背景与装饰组件

适用组件：AuroraBackground、PatternBackground。

补齐语义化尺寸和暂停能力，并默认标记装饰层为不参与辅助技术阅读。业务内容仍通过默认插槽传入；组件内部负责定位、裁剪、遮罩和背景样式。尊重 reduced motion，避免用户必须写 CSS 来关闭动画。

## 文档示例体系

### DemoBlock 承担展示布局

DemoBlock 新增文档专用参数：

- `layout`: `row | column | center | grid`。
- `surface`: `default | light | dark | checker`。
- `minHeight`: 示例舞台最小高度。
- `code`: 面向用户的最小用法源码。
- 可选的源码、复制和外部 Playground 操作，仅在真实目标存在时显示。

这些参数只影响文档舞台，不进入组件库公共 API。

### 示例代码标准

每个基础示例必须满足：

- 只包含业务必要的组件标签、响应式状态和事件处理。
- 不包含纯展示 `<style>`。
- 不包含只为居中、间距、背景或尺寸服务的包装 DOM。
- 不展示组件内部 Tailwind/CSS 类。
- 复杂内容确实需要自定义结构时，明确标记为“插槽高级用法”，不作为推荐入口。

文档默认先展示快捷用法，再展示高级插槽或组合式用法。

## 文档站信息架构

- 将本地搜索正确配置到 VitePress `themeConfig`。
- 顶栏展示当前包版本，并提供指南、组件总览和可用的 Playground/源码入口。
- 新增独立组件总览页，按 Buttons、Cards、Text、Interaction、Data、Background 分类。
- GitHub、主页和问题反馈链接从包元数据读取或使用真实配置；不继续指向上游项目作为当前库源码。
- 组件页统一为 Examples、Attributes、Events、Slots、Exposes、Source 的顺序；不存在的章节不渲染。
- 顶栏、首页操作、组件卡片和 Demo 工具栏补齐可见的键盘焦点状态。

## 测试策略

### API 契约测试

- 验证所有旧 props 和旧插槽仍能渲染。
- 验证新增快捷 props 生成预期语义区域。
- 验证插槽覆盖快捷 props 的优先级。
- 验证公共类型能够从包入口导入。

### 行为测试

- 按钮验证 loading/disabled 不触发 click，focus/blur 可用。
- Dialog 验证事件顺序、关闭守卫、异步确认和实例方法。
- 数据驱动组件验证 items 渲染、空数据和 item 点击。
- 动效组件验证 start/change/finish 和 reduced-motion 最终状态。

### 文档约束测试

- 基础示例不得包含 `<style>`。
- 基础示例不得使用仅用于舞台布局的 `demo-*` class。
- 文档配置必须包含可用搜索与组件总览入口。
- 每个公共组件文档的属性、事件、插槽和实例方法与导出的类型保持一致。

### 构建验证

- 组件库类型检查和构建通过。
- 文档站构建通过。
- Playground 源码模式与 dist 模式构建通过。
- 在 Chrome 中复核首页、组件总览、按钮、卡片、列表和 Dialog 页面，并检查亮暗主题与键盘焦点。

## 分阶段实施

1. 建立测试基础和共享 API 类型。
2. 完成按钮统一 API 与示例。
3. 完成卡片快捷 API 与示例。
4. 完成列表/集合的数据驱动 API 与示例。
5. 完成 Dialog 事件、方法与可访问性。
6. 完成文本/数字动效事件和 reduced motion。
7. 完成背景组件的尺寸、暂停与 reduced motion。
8. 升级 DemoBlock、清理全部基础示例。
9. 修复文档站信息架构和维护信息。
10. 运行全量构建与 Chrome 视觉、交互复核。

每一阶段都先添加失败测试，再实现最小改动，最后运行全量回归。

## 兼容性规则

- 不删除、不重命名现有导出。
- 不改变现有 prop 的默认值和主要语义，除非修复明确的可访问性缺陷且不影响视觉使用。
- 新 props 均为可选；旧代码不传入时保持原行为。
- 原生属性继续透传到合理的根元素。
- 默认插槽覆盖快捷内容；组合组件保持原注册方式。
- 新事件不替代原有事件，原有事件载荷保持不变。

## 验收标准

- 所有 22 个公共组件都有明确的推荐快捷用法。
- 基础推荐示例中没有 `<style>` 和纯舞台包装 DOM。
- 常见卡片、列表、按钮和弹窗示例可以用一个顶层组件标签完成。
- Props、Events、Slots、Exposes 文档与实际类型一致。
- 旧 API 契约测试、所有新增行为测试、类型检查和四类构建全部通过。
- Chrome 中搜索、组件总览、主题切换、Demo 展开复制、键盘焦点和核心交互均可使用。
