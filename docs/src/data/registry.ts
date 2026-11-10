/**
 * 组件注册表 —— 文档站唯一数据源。
 * 所有名称 / 分类 / API 行 / 默认值均提取自 packages/inspira-ui/src 真实源码，
 * 与 packages/inspira-ui/src/components/__tests__ 中的合约测试互为印证。
 * 禁止在此虚构不存在的组件或属性。
 */
import type { Component } from 'vue'

export interface ApiRow {
  prop: string
  desc: string
  type: string
  def: string
}

export type ControlKind = 'select' | 'text' | 'number' | 'switch'

export interface ControlSpec {
  kind: ControlKind
  /** 绑定到 demo state 的键 */
  key: string
  label: string
  options?: Array<{ label: string; value: string }>
  /** number 输入的步进 */
  step?: number
}

export type PreviewKind =
  | 'shimmer'
  | 'hover'
  | 'rainbow'
  | 'gradient'
  | 'ripple'
  | 'card'
  | 'spotlight'
  | 'flip'
  | 'glare'
  | 'bento'
  | 'number'
  | 'type'
  | 'words'
  | 'text'
  | 'blur'
  | 'dialog'
  | 'modal'
  | 'tooltip'
  | 'marquee'
  | 'stat'
  | 'aurora'
  | 'pattern'

export interface ComponentMeta {
  /** 导出名（含 Iu 前缀） */
  importName: string
  /** 展示名 */
  name: string
  zh: string
  category: '按钮' | '卡片' | '文本' | '交互' | '数据' | '背景'
  desc: string
  slug: string
  recommended?: boolean
  preview: PreviewKind
  /** 详情页默认演示状态（控件受控值） */
  demoState: Record<string, string | number | boolean>
  controls: ControlSpec[]
  /** 由演示状态生成可复制的真实代码 */
  demoCode: (state: Record<string, any>) => string
  apiRows: ApiRow[]
  eventRows?: ApiRow[]
  slotRows?: ApiRow[]
  /** 额外说明（安装提示下方的 hint） */
  note?: string
}

export const CATEGORIES = ['全部', '按钮', '卡片', '文本', '交互', '数据', '背景'] as const

const CATEGORY_EN: Record<string, string> = {
  按钮: 'Buttons',
  卡片: 'Cards',
  文本: 'Text',
  交互: 'Interaction',
  数据: 'Data',
  背景: 'Backgrounds',
}

export const categoryEn = (cat: string) => CATEGORY_EN[cat] ?? cat

const BUTTON_CONTROLS: ControlSpec[] = [
  {
    kind: 'select',
    key: 'size',
    label: '尺寸 Size',
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Default', value: 'default' },
      { label: 'Large', value: 'large' },
      { label: 'XL', value: 'xl' },
    ],
  },
  { kind: 'text', key: 'text', label: '按钮文字 Text' },
  { kind: 'switch', key: 'loading', label: 'loading' },
  { kind: 'switch', key: 'disabled', label: 'disabled' },
]

const BUTTON_DEMO_STATE = { size: 'default', text: '开始探索', loading: false, disabled: false }

/** 按钮通用代码片段：size 与文案参与代码，bool 开关仅在 true 时输出 */
function buttonCode(tag: string, state: Record<string, any>, useTextProp = false): string {
  const attrs: string[] = []
  if (useTextProp) attrs.push(`text="${state.text}"`)
  if (state.size !== 'default') attrs.push(`size="${state.size}"`)
  if (state.loading) attrs.push('loading')
  if (state.disabled) attrs.push('disabled')
  const attrText = attrs.length ? ' ' + attrs.join(' ') : ''
  if (useTextProp) {
    return `<template>\n  <${tag}${attrText} />\n</template>\n\n<script setup lang="ts">\nimport { ${tag.replace(
      /<[^>]*>/g,
      '',
    )} } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n<\/script>`
  }
  const content = state.loading && state.text ? state.text : state.text
  return `<template>\n  <${tag}${attrText}>${content}<\/${tag}>\n</template>\n\n<script setup lang="ts">\nimport { ${tag.replace(
    /<[^>]*>/g,
    '',
  )} } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n<\/script>`
}

const INSTALL_SNIPPET = `\n\n<script setup lang="ts">\nimport { %NAME% } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n<\/script>`

function staticCode(template: string, importName: string): string {
  return (
    template.replace('%NAME%', importName) +
    (template.includes('<script') ? '' : INSTALL_SNIPPET)
  )
}

export const COMPONENTS: ComponentMeta[] = [
  {
    importName: 'IuShimmerButton',
    name: 'ShimmerButton',
    zh: '微光按钮',
    category: '按钮',
    desc: '柔和流动的高光动效',
    slug: 'shimmer-button',
    recommended: true,
    preview: 'shimmer',
    demoState: { ...BUTTON_DEMO_STATE },
    controls: BUTTON_CONTROLS,
    demoCode: (s) => buttonCode('IuShimmerButton', s),
    apiRows: [
      { prop: 'variant', desc: '主题预设，dark 配亮色页面 / light 配暗色页面', type: "'dark' | 'light'", def: "'dark'" },
      { prop: 'size', desc: '统一尺寸', type: "'small' | 'default' | 'large' | 'xl'", def: "'default'" },
      { prop: 'loading', desc: '加载中，自动禁用并显示转圈', type: 'boolean', def: 'false' },
      { prop: 'loadingText', desc: 'loading 时替代默认内容的文案', type: 'string', def: '—' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
      { prop: 'block', desc: '占满一行', type: 'boolean', def: 'false' },
      { prop: 'shimmerColor', desc: '微光颜色（缺省跟随 variant）', type: 'string', def: '—' },
      { prop: 'shimmerDuration', desc: '微光周期（CSS 时间）', type: 'string', def: "'3s'" },
      { prop: 'background', desc: '按钮背景色（缺省跟随 variant）', type: 'string', def: '—' },
      { prop: 'tag', desc: '渲染标签或组件', type: 'string | Component', def: "'button'" },
      { prop: 'nativeType', desc: 'button 原生 type', type: 'string', def: "'button'" },
    ],
    eventRows: [{ prop: 'click', desc: '点击时触发（loading / disabled 下被抑制）', type: '(e: MouseEvent) => void', def: '—' }],
    slotRows: [{ prop: 'default', desc: '按钮内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuInteractiveHoverButton',
    name: 'InteractiveHoverButton',
    zh: '悬停按钮',
    category: '按钮',
    desc: '箭头滑入与文字过渡',
    slug: 'interactive-hover-button',
    preview: 'hover',
    demoState: { ...BUTTON_DEMO_STATE, text: '了解更多' },
    controls: BUTTON_CONTROLS,
    demoCode: (s) => buttonCode('IuInteractiveHoverButton', s, true),
    apiRows: [
      { prop: 'text', desc: '按钮文本（也可用默认插槽覆盖）', type: 'string', def: "'Button'" },
      { prop: 'size', desc: '统一尺寸', type: "'small' | 'default' | 'large' | 'xl'", def: "'default'" },
      { prop: 'loading', desc: '加载中，自动禁用', type: 'boolean', def: 'false' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
      { prop: 'block', desc: '占满一行', type: 'boolean', def: 'false' },
      { prop: 'tag', desc: '渲染标签或组件', type: 'string | Component', def: "'button'" },
    ],
    eventRows: [{ prop: 'click', desc: '点击时触发', type: '(e: MouseEvent) => void', def: '—' }],
    slotRows: [{ prop: 'default', desc: '覆盖 text 属性的自定义内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuRainbowButton',
    name: 'RainbowButton',
    zh: '彩虹按钮',
    category: '按钮',
    desc: '缓慢旋转的渐变描边',
    slug: 'rainbow-button',
    preview: 'rainbow',
    demoState: { ...BUTTON_DEMO_STATE, text: '查看详情 ✦', speed: 2 },
    controls: [
      BUTTON_CONTROLS[0],
      BUTTON_CONTROLS[1],
      BUTTON_CONTROLS[2],
      BUTTON_CONTROLS[3],
      { kind: 'number', key: 'speed', label: '速度 Speed（秒）', step: 1 },
    ],
    demoCode: (s) => {
      const attrs: string[] = []
      if (s.size !== 'default') attrs.push(`size="${s.size}"`)
      if (s.loading) attrs.push('loading')
      if (s.disabled) attrs.push('disabled')
      if (Number(s.speed) !== 2) attrs.push(`:speed="${s.speed}"`)
      const attrText = attrs.length ? ' ' + attrs.join(' ') : ''
      return `<template>\n  <IuRainbowButton${attrText}>${s.text}<\/IuRainbowButton>\n</template>\n\n<script setup lang="ts">\nimport { IuRainbowButton } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n<\/script>`
    },
    apiRows: [
      { prop: 'speed', desc: '彩虹流动一个周期的时长（秒）', type: 'number', def: '2' },
      { prop: 'size', desc: '统一尺寸', type: "'small' | 'default' | 'large' | 'xl'", def: "'default'" },
      { prop: 'loading', desc: '加载中，自动禁用', type: 'boolean', def: 'false' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
      { prop: 'is', desc: '（兼容保留）渲染标签，优先级低于 tag', type: 'string', def: "'button'" },
      { prop: 'tag', desc: '渲染标签或组件', type: 'string | Component', def: "'button'" },
    ],
    slotRows: [{ prop: 'default', desc: '按钮内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuGradientButton',
    name: 'GradientButton',
    zh: '流光按钮',
    category: '按钮',
    desc: '流动渐变与聚焦反馈',
    slug: 'gradient-button',
    preview: 'gradient',
    demoState: { ...BUTTON_DEMO_STATE, text: '渐变流光', variant: 'rainbow' },
    controls: [
      BUTTON_CONTROLS[0],
      BUTTON_CONTROLS[1],
      BUTTON_CONTROLS[2],
      BUTTON_CONTROLS[3],
      {
        kind: 'select',
        key: 'variant',
        label: '配色 Variant',
        options: [
          { label: 'Rainbow', value: 'rainbow' },
          { label: 'Ocean', value: 'ocean' },
          { label: 'Sunset', value: 'sunset' },
          { label: 'Candy', value: 'candy' },
        ],
      },
    ],
    demoCode: (s) => {
      const attrs: string[] = []
      if (s.size !== 'default') attrs.push(`size="${s.size}"`)
      if (s.loading) attrs.push('loading')
      if (s.disabled) attrs.push('disabled')
      if (s.variant !== 'rainbow') attrs.push(`variant="${s.variant}"`)
      const attrText = attrs.length ? ' ' + attrs.join(' ') : ''
      return `<template>\n  <IuGradientButton${attrText}>${s.text}<\/IuGradientButton>\n</template>\n\n<script setup lang="ts">\nimport { IuGradientButton } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n<\/script>`
    },
    apiRows: [
      { prop: 'variant', desc: '内置配色预设（被显式 colors / bgColor 覆盖）', type: "'rainbow' | 'ocean' | 'sunset' | 'candy'", def: "'rainbow'" },
      { prop: 'colors', desc: 'conic-gradient 颜色序列', type: 'string[]', def: '预设色板' },
      { prop: 'duration', desc: '旋转一个周期时长（毫秒）', type: 'number', def: '2500' },
      { prop: 'borderWidth', desc: '流光边框宽度（px）', type: 'number', def: '2' },
      { prop: 'borderRadius', desc: '圆角（px）', type: 'number', def: '8' },
      { prop: 'blur', desc: '边框光晕模糊（px）', type: 'number', def: '4' },
      { prop: 'size', desc: '统一尺寸', type: "'small' | 'default' | 'large' | 'xl'", def: "'default'" },
      { prop: 'loading', desc: '加载中，自动禁用', type: 'boolean', def: 'false' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
    ],
    slotRows: [{ prop: 'default', desc: '按钮内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuRippleButton',
    name: 'RippleButton',
    zh: '涟漪按钮',
    category: '按钮',
    desc: '点击触发水波扩散',
    slug: 'ripple-button',
    preview: 'ripple',
    demoState: { ...BUTTON_DEMO_STATE, text: '点击试试' },
    controls: BUTTON_CONTROLS,
    demoCode: (s) => buttonCode('IuRippleButton', s),
    apiRows: [
      { prop: 'rippleColor', desc: '涟漪颜色（缺省跟随主题主色）', type: 'string', def: '—' },
      { prop: 'duration', desc: '涟漪动画时长（毫秒）', type: 'number', def: '600' },
      { prop: 'size', desc: '统一尺寸', type: "'small' | 'default' | 'large' | 'xl'", def: "'default'" },
      { prop: 'loading', desc: '加载中，自动禁用', type: 'boolean', def: 'false' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
    ],
    eventRows: [{ prop: 'click', desc: '点击时触发（先产生涟漪）', type: '(e: MouseEvent) => void', def: '—' }],
    slotRows: [{ prop: 'default', desc: '按钮内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuCard3D',
    name: 'Card3D',
    zh: '3D 透视卡片',
    category: '卡片',
    desc: '悬停时的轻量三维倾斜',
    slug: 'card-3d',
    preview: 'card',
    demoState: { title: 'Nebula 观测站', cta: '立即探索' },
    controls: [
      { kind: 'text', key: 'title', label: '标题 Title' },
      { kind: 'text', key: 'cta', label: '按钮文案 CTA' },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuCard3D\n    title="${s.title}"\n    description="悬停整卡跟随鼠标旋转，标题与背景沿 Z 轴分层浮起。"\n    cta="${s.cta}"\n  />\n</template>`,
        'IuCard3D',
      ),
    apiRows: [
      { prop: 'title', desc: '卡片标题', type: 'string', def: '—' },
      { prop: 'description', desc: '描述文字', type: 'string', def: '—' },
      { prop: 'image', desc: '背景图地址（缺省为内置渐变底图）', type: 'string', def: '—' },
      { prop: 'imageAlt', desc: '背景图替代文本', type: 'string', def: '—' },
      { prop: 'cta', desc: '底部按钮文案', type: 'string', def: '—' },
      { prop: 'href', desc: '点击跳转地址', type: 'string', def: '—' },
      { prop: 'target', desc: '链接打开方式', type: 'string', def: '—' },
      { prop: 'disabled', desc: '禁用交互', type: 'boolean', def: 'false' },
    ],
    note: '需要逐元素控制变换时，改用 IuCard3DContainer / IuCard3DBody / IuCard3DItem 三件套（同一入口导出）。',
  },
  {
    importName: 'IuCardSpotlight',
    name: 'CardSpotlight',
    zh: '聚光灯卡片',
    category: '卡片',
    desc: '随光标移动的柔光效果',
    slug: 'card-spotlight',
    recommended: true,
    preview: 'spotlight',
    demoState: { title: 'Spotlight', gradientSize: 240 },
    controls: [
      { kind: 'text', key: 'title', label: '标题 Title' },
      { kind: 'number', key: 'gradientSize', label: '光斑半径 Gradient Size', step: 20 },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuCardSpotlight\n    title="${s.title}"\n    description="鼠标在卡片上移动，会有一道聚光灯跟随光斑。"\n    :gradient-size="${s.gradientSize}"\n  />\n</template>`,
        'IuCardSpotlight',
      ),
    apiRows: [
      { prop: 'title', desc: '标题（有默认插槽时忽略）', type: 'string', def: '—' },
      { prop: 'description', desc: '描述文字', type: 'string', def: '—' },
      { prop: 'image', desc: '背景图地址', type: 'string', def: '—' },
      { prop: 'cta', desc: '底部按钮文案', type: 'string', def: '—' },
      { prop: 'href', desc: '点击跳转地址', type: 'string', def: '—' },
      { prop: 'padded', desc: '快捷模式自带内边距', type: 'boolean', def: 'true' },
      { prop: 'gradientSize', desc: '光斑半径（px）', type: 'number', def: '200' },
      { prop: 'gradientColor', desc: '光斑颜色', type: 'string', def: "'#262626'" },
      { prop: 'gradientOpacity', desc: '光斑不透明度', type: 'number', def: '0.8' },
    ],
    slotRows: [{ prop: 'default', desc: '完全自定义内容（传入后忽略 title / description）', type: '—', def: '—' }],
  },
  {
    importName: 'IuFlipCard',
    name: 'FlipCard',
    zh: '翻转卡片',
    category: '卡片',
    desc: '正反两面的内容切换',
    slug: 'flip-card',
    preview: 'flip',
    demoState: { rotate: 'y', backTitle: '背面标题' },
    controls: [
      {
        kind: 'select',
        key: 'rotate',
        label: '翻转轴 Rotate',
        options: [
          { label: '左右（y）', value: 'y' },
          { label: '上下（x）', value: 'x' },
        ],
      },
      { kind: 'text', key: 'backTitle', label: '背面标题 Back Title' },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuFlipCard rotate="${s.rotate}" back-title="${s.backTitle}" back-description="鼠标移开自动翻回正面。" />\n</template>`,
        'IuFlipCard',
      ),
    apiRows: [
      { prop: 'rotate', desc: '翻转轴：x 上下 / y 左右', type: "'x' | 'y'", def: "'y'" },
      { prop: 'image', desc: '正面背景图地址', type: 'string', def: '—' },
      { prop: 'backTitle', desc: '背面标题（有 back 插槽时忽略）', type: 'string', def: '—' },
      { prop: 'backDescription', desc: '背面描述', type: 'string', def: '—' },
      { prop: 'cta', desc: '背面按钮文案', type: 'string', def: '—' },
      { prop: 'href', desc: '背面按钮跳转地址', type: 'string', def: '—' },
    ],
    slotRows: [
      { prop: 'default', desc: '正面内容', type: '—', def: '—' },
      { prop: 'back', desc: '背面内容', type: '—', def: '—' },
    ],
  },
  {
    importName: 'IuGlareCard',
    name: 'GlareCard',
    zh: '眩光卡片',
    category: '卡片',
    desc: '细腻的悬停高光',
    slug: 'glare-card',
    preview: 'glare',
    demoState: { title: 'Glare Card', width: 320, radius: 48 },
    controls: [
      { kind: 'number', key: 'width', label: '宽度 Width（px）', step: 20 },
      { kind: 'number', key: 'radius', label: '圆角 Radius（px）', step: 4 },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuGlareCard :width="${s.width}" :radius="${s.radius}">\n    <div style="width: 100%; height: 100%">自定义内容</div>\n  </IuGlareCard>\n</template>`,
        'IuGlareCard',
      ),
    apiRows: [
      { prop: 'image', desc: '内容图地址（自动铺满）', type: 'string', def: '—' },
      { prop: 'title', desc: '内容标题', type: 'string', def: '—' },
      { prop: 'description', desc: '内容描述', type: 'string', def: '—' },
      { prop: 'width', desc: '卡片宽度（px）', type: 'number', def: '320' },
      { prop: 'height', desc: '卡片高度（px）', type: 'number', def: '—' },
      { prop: 'radius', desc: '卡片圆角（px）', type: 'number', def: '48' },
    ],
    slotRows: [{ prop: 'default', desc: '自定义内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuBentoGrid',
    name: 'BentoGrid',
    zh: 'Bento 网格',
    category: '卡片',
    desc: '可组合的信息模块布局',
    slug: 'bento-grid',
    preview: 'bento',
    demoState: {},
    controls: [],
    demoCode: () =>
      staticCode(
        `<template>\n  <IuBentoGrid :items="[\n    { key: 'a', name: '20 个精选组件', description: '按钮 / 卡片 / 文本动画 / 交互 / 背景。' },\n    { key: 'b', name: 'npm 包直接调用', description: 'app.use() 全量注册或具名导入。' },\n    { key: 'c', name: 'CSS 变量主题', description: '覆盖 --iu-* 变量即可换肤。' },\n  ]" />\n</template>`,
        'IuBentoGrid',
      ),
    apiRows: [
      { prop: 'items', desc: '快捷模式数据（默认插槽存在时忽略）', type: 'BentoGridDataItem[]', def: '—' },
      { prop: 'items[].name', desc: '模块标题', type: 'string', def: '必填' },
      { prop: 'items[].description', desc: '模块描述', type: 'string', def: '必填' },
      { prop: 'items[].icon', desc: '图标', type: 'string | Component', def: '—' },
      { prop: 'items[].colSpan / rowSpan', desc: '跨列 / 跨行数', type: 'number', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '自定义模块（配合 IuBentoGridItem / IuBentoGridCard）', type: '—', def: '—' }],
  },
  {
    importName: 'IuNumberTicker',
    name: 'NumberTicker',
    zh: '数字滚动',
    category: '文本',
    desc: '数值从零平滑递增',
    slug: 'number-ticker',
    recommended: true,
    preview: 'number',
    demoState: { value: 12860, decimalPlaces: 0, prefix: '', suffix: '+' },
    controls: [
      { kind: 'number', key: 'value', label: '数值 Value', step: 100 },
      { kind: 'text', key: 'prefix', label: '前缀 Prefix' },
      { kind: 'text', key: 'suffix', label: '后缀 Suffix' },
      { kind: 'number', key: 'decimalPlaces', label: '小数位 Decimals', step: 1 },
    ],
    demoCode: (s) => {
      const attrs = [`:value="${s.value}"`, `:decimal-places="${s.decimalPlaces}"`]
      if (s.prefix) attrs.push(`prefix="${s.prefix}"`)
      if (s.suffix) attrs.push(`suffix="${s.suffix}"`)
      return staticCode(
        `<template>\n  <IuNumberTicker ${attrs.join(' ')} />\n</template>`,
        'IuNumberTicker',
      )
    },
    apiRows: [
      { prop: 'value', desc: '目标数值（变化时重新滚动）', type: 'number', def: '0' },
      { prop: 'direction', desc: '滚动方向', type: "'up' | 'down'", def: "'up'" },
      { prop: 'duration', desc: '动画时长（毫秒）', type: 'number', def: '1000' },
      { prop: 'delay', desc: '动画延迟（毫秒）', type: 'number', def: '0' },
      { prop: 'decimalPlaces', desc: '小数位数', type: 'number', def: '2' },
      { prop: 'prefix', desc: '数字前缀，如 ¥', type: 'string', def: '—' },
      { prop: 'suffix', desc: '数字后缀，如 %', type: 'string', def: '—' },
      { prop: 'transition', desc: '缓动曲线（@vueuse TransitionPresets 键名）', type: 'string', def: "'easeOutCubic'" },
      { prop: 'reducedMotion', desc: '减少动效偏好', type: 'ReducedMotionMode', def: '—' },
    ],
  },
  {
    importName: 'IuTypewriterText',
    name: 'TypewriterText',
    zh: '打字机文本',
    category: '文本',
    desc: '逐字显示的文案效果',
    slug: 'typewriter-text',
    preview: 'type',
    demoState: { text: 'Hello, Inspira UI', speed: 70 },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'speed', label: '速度 Speed（毫秒/字符）', step: 10 },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuTypewriterText :text="${s.text}" :speed="${s.speed}" />\n</template>`,
        'IuTypewriterText',
      ),
    apiRows: [
      { prop: 'text', desc: '要打出的文本；传数组则多段轮播', type: 'string | string[]', def: '必填' },
      { prop: 'as', desc: '渲染的标签', type: 'string', def: "'div'" },
      { prop: 'speed', desc: '打字速度（毫秒/字符）', type: 'number', def: '50' },
      { prop: 'initialDelay', desc: '首次开始前延迟（毫秒）', type: 'number', def: '0' },
      { prop: 'waitTime', desc: '打完一段后的停留（毫秒）', type: 'number', def: '2000' },
      { prop: 'deleteSpeed', desc: '删除速度（毫秒/字符）', type: 'number', def: '30' },
      { prop: 'loop', desc: '多段文本是否循环', type: 'boolean', def: 'true' },
      { prop: 'showCursor', desc: '是否显示光标', type: 'boolean', def: 'true' },
      { prop: 'cursorChar', desc: '光标字符', type: 'string', def: "'|'" },
    ],
  },
  {
    importName: 'IuFlipWords',
    name: 'FlipWords',
    zh: '词语轮播',
    category: '文本',
    desc: '多组关键词自然切换',
    slug: 'flip-words',
    preview: 'words',
    demoState: { words: '流畅,轻盈,优雅', duration: 2600 },
    controls: [
      { kind: 'text', key: 'words', label: '词组 Words（英文逗号分隔）' },
      { kind: 'number', key: 'duration', label: '停留时长 Duration（毫秒）', step: 200 },
    ],
    demoCode: (s) => {
      const list = String(s.words)
        .split(',')
        .map((w) => `'${w.trim()}'`)
        .join(', ')
      return staticCode(
        `<template>\n  <IuFlipWords :words="[${list}]" :duration="${s.duration}" />\n</template>`,
        'IuFlipWords',
      )
    },
    apiRows: [
      { prop: 'words', desc: '轮播的词组', type: 'string[]', def: '必填' },
      { prop: 'duration', desc: '每个词停留时长（毫秒）', type: 'number', def: '3000' },
      { prop: 'reducedMotion', desc: '减少动效偏好', type: 'ReducedMotionMode', def: '—' },
    ],
    eventRows: [
      { prop: 'animationStart', desc: '词进入动画完成后触发', type: '() => void', def: '—' },
      { prop: 'animationComplete', desc: '词离场动画完成后触发', type: '() => void', def: '—' },
    ],
  },
  {
    importName: 'IuTextGenerateEffect',
    name: 'TextGenerateEffect',
    zh: '文本生成',
    category: '文本',
    desc: '依次出现的文字动画',
    slug: 'text-generate-effect',
    preview: 'text',
    demoState: { words: '让每一帧都有意义' },
    controls: [{ kind: 'text', key: 'words', label: '文本 Words' }],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuTextGenerateEffect words="${s.words}" />\n</template>`,
        'IuTextGenerateEffect',
      ),
    apiRows: [
      { prop: 'words', desc: '要逐词显示的文本', type: 'string', def: '必填' },
      { prop: 'filter', desc: '是否启用模糊过渡', type: 'boolean', def: 'true' },
      { prop: 'duration', desc: '每个词的过渡时长（秒）', type: 'number', def: '0.7' },
      { prop: 'delay', desc: '首个词出现前的延迟（毫秒）', type: 'number', def: '0' },
      { prop: 'reducedMotion', desc: '减少动效偏好', type: 'ReducedMotionMode', def: '—' },
    ],
  },
  {
    importName: 'IuBlurReveal',
    name: 'BlurReveal',
    zh: '模糊揭示',
    category: '文本',
    desc: '由模糊到清晰的入场',
    slug: 'blur-reveal',
    preview: 'blur',
    demoState: {},
    controls: [],
    demoCode: () =>
      staticCode(
        `<template>\n  <IuBlurReveal :duration="0.8" :delay="0.3">\n    <p>第一行：进入视口时模糊淡入</p>\n    <p>第二行：按 delay 系数依次错落出现</p>\n  </IuBlurReveal>\n</template>`,
        'IuBlurReveal',
      ),
    apiRows: [
      { prop: 'duration', desc: '单个子元素动画时长（秒）', type: 'number', def: '1' },
      { prop: 'delay', desc: '相邻子元素的 stagger 系数（秒）', type: 'number', def: '2' },
      { prop: 'blur', desc: '初始模糊半径', type: 'string', def: "'20px'" },
      { prop: 'yOffset', desc: '初始 Y 轴偏移（px）', type: 'number', def: '20' },
      { prop: 'reducedMotion', desc: '减少动效偏好', type: 'ReducedMotionMode', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '依次揭示的子元素列表', type: '—', def: '—' }],
  },
  {
    importName: 'IuDialog',
    name: 'Dialog',
    zh: '弹窗',
    category: '交互',
    desc: '焦点与关闭行为可控',
    slug: 'dialog',
    recommended: true,
    preview: 'dialog',
    demoState: { title: '确认提交订单', danger: false, showClose: true },
    controls: [
      { kind: 'text', key: 'title', label: '标题 Title' },
      { kind: 'switch', key: 'danger', label: 'danger' },
      { kind: 'switch', key: 'showClose', label: 'showClose' },
    ],
    demoCode: (s) => {
      const attrs: string[] = ['v-model="show"', `title="${s.title}"`, 'width="420px"']
      if (s.danger) attrs.push('danger')
      if (!s.showClose) attrs.push(':show-close="false"')
      return `<template>\n  <IuDialog\n    ${attrs.join('\n    ')}\n  >\n    内容区：通过 v-model 控制开关，确认 / 取消按钮自带 loading。\n  </IuDialog>\n</template>\n\n<script setup lang="ts">\nimport { ref } from 'vue'\nimport { IuDialog } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n\nconst show = ref(false)\n<\/script>`
    },
    apiRows: [
      { prop: 'v-model', desc: '弹窗开关', type: 'boolean', def: 'false' },
      { prop: 'title / description', desc: '标题与说明文字', type: 'string', def: '—' },
      { prop: 'width', desc: '弹窗宽度（px 数值或 CSS 宽度）', type: 'number | string', def: '460' },
      { prop: 'confirm', desc: '异步确认函数：loading 与关闭时机自动管理，返回 false 或抛异常保持打开', type: '() => Promise<any> | any', def: '—' },
      { prop: 'confirm-text / cancel-text', desc: '按钮文案，传空字符串隐藏', type: 'string', def: "'确 定' / '取 消'" },
      { prop: 'danger', desc: '确认按钮使用危险色', type: 'boolean', def: 'false' },
      { prop: 'close-on-click-modal', desc: '点击遮罩关闭', type: 'boolean', def: 'true' },
      { prop: 'close-on-press-escape', desc: '按 Esc 关闭', type: 'boolean', def: 'true' },
      { prop: 'before-close', desc: '关闭前拦截函数', type: '(done) => void', def: '—' },
      { prop: 'destroy-on-close', desc: '关闭时销毁内容', type: 'boolean', def: 'false' },
    ],
    eventRows: [
      { prop: 'confirm', desc: '点击确认时触发', type: '() => void', def: '—' },
      { prop: 'cancel', desc: '点击取消 / 关闭时触发', type: '() => void', def: '—' },
      { prop: 'update:modelValue', desc: '开关状态变化', type: '(v: boolean) => void', def: '—' },
    ],
    slotRows: [
      { prop: 'default', desc: '弹窗主体内容', type: '—', def: '—' },
      { prop: 'footer', desc: '自定义底部（作用域：loading / confirm / cancel）', type: '—', def: '—' },
    ],
  },
  {
    importName: 'IuAnimatedModal',
    name: 'AnimatedModal',
    zh: '五件套弹窗',
    category: '交互',
    desc: '舒适的入场与退出过渡',
    slug: 'animated-modal',
    preview: 'modal',
    demoState: {},
    controls: [],
    demoCode: () =>
      staticCode(
        `<template>\n  <IuAnimatedModal>\n    <IuAnimatedModalTrigger>打开弹窗</IuAnimatedModalTrigger>\n    <IuAnimatedModalBody>\n      <IuAnimatedModalContent>\n        <h4>完全自定义的五件套弹窗</h4>\n        <p>Trigger / Body / Content / Footer 各自独立，可任意组合排版。</p>\n      </IuAnimatedModalContent>\n      <IuAnimatedModalFooter>\n        <button @click="useAnimatedModal().closeModal()">关闭</button>\n      </IuAnimatedModalFooter>\n    </IuAnimatedModalBody>\n  </IuAnimatedModal>\n</template>`,
        'IuAnimatedModal',
      ),
    apiRows: [
      { prop: 'open / v-model:open', desc: '受控打开状态', type: 'boolean', def: '—' },
      { prop: 'defaultOpen', desc: '非受控模式的初始状态', type: 'boolean', def: 'false' },
      { prop: 'closeOnEsc', desc: '按 Esc 关闭', type: 'boolean', def: 'true' },
      { prop: 'Body.width', desc: '弹层宽度（CSS 宽度）', type: 'string', def: '—' },
      { prop: 'Body.showClose', desc: '显示右上角关闭按钮', type: 'boolean', def: 'true' },
      { prop: 'Body.closeOnOutside', desc: '点击遮罩关闭', type: 'boolean', def: 'true' },
      { prop: 'Body.lockScroll', desc: '打开时锁定页面滚动', type: 'boolean', def: 'true' },
    ],
    slotRows: [
      { prop: 'default', desc: '作用域插槽：open / openModal / closeModal / toggle', type: '—', def: '—' },
    ],
    note: '组合式组件：app.use(IuAnimatedModal) 会连带注册 Trigger / Body / Content / Footer。',
  },
  {
    importName: 'IuAnimatedTooltip',
    name: 'AnimatedTooltip',
    zh: '悬浮提示',
    category: '交互',
    desc: '轻量反馈提示内容',
    slug: 'animated-tooltip',
    preview: 'tooltip',
    demoState: {},
    controls: [],
    demoCode: () =>
      staticCode(
        `<template>\n  <IuAnimatedTooltip :items="[\n    { id: 1, name: '张伟', designation: '前端工程师', image: avatarUrl },\n    { id: 2, name: '李娜', designation: 'UI 设计师', image: avatarUrl },\n  ]" />\n</template>`,
        'IuAnimatedTooltip',
      ),
    apiRows: [
      { prop: 'items', desc: '成员列表', type: 'AnimatedTooltipItem[]', def: '必填' },
      { prop: 'items[].name', desc: '名称（名片主标题）', type: 'string', def: '必填' },
      { prop: 'items[].designation', desc: '职位 / 描述', type: 'string', def: '必填' },
      { prop: 'items[].image', desc: '头像图片地址', type: 'string', def: '必填' },
    ],
  },
  {
    importName: 'IuMarquee',
    name: 'Marquee',
    zh: '跑马灯',
    category: '交互',
    desc: '内容水平连续滚动',
    slug: 'marquee',
    preview: 'marquee',
    demoState: { speed: 20, reverse: false, pauseOnHover: true },
    controls: [
      { kind: 'number', key: 'speed', label: '速度 Speed（秒/圈）', step: 5 },
      { kind: 'switch', key: 'reverse', label: 'reverse' },
      { kind: 'switch', key: 'pauseOnHover', label: 'pauseOnHover' },
    ],
    demoCode: (s) => {
      const attrs = [`:speed="${s.speed}"`]
      if (s.reverse) attrs.push('reverse')
      if (s.pauseOnHover) attrs.push('pause-on-hover')
      return staticCode(
        `<template>\n  <IuMarquee ${attrs.join(' ')} :items="[\n    { key: 1, label: 'Vue 3' },\n    { key: 2, label: 'TypeScript' },\n    { key: 3, label: 'Motion' },\n  ]" />\n</template>`,
        'IuMarquee',
      )
    },
    apiRows: [
      { prop: 'items', desc: '滚动内容（快捷模式）', type: 'MarqueeItem[]', def: '—' },
      { prop: 'speed', desc: '一圈滚动时长（秒）', type: 'number', def: '40' },
      { prop: 'gap', desc: '相邻内容间距（CSS 长度）', type: 'string', def: "'1rem'" },
      { prop: 'reverse', desc: '反向滚动', type: 'boolean', def: 'false' },
      { prop: 'pauseOnHover', desc: '悬停时暂停', type: 'boolean', def: 'false' },
      { prop: 'vertical', desc: '纵向滚动', type: 'boolean', def: 'false' },
      { prop: 'repeat', desc: '内容重复次数', type: 'number', def: '4' },
    ],
    slotRows: [{ prop: 'default', desc: '自定义滚动内容（传入后忽略 items）', type: '—', def: '—' }],
  },
  {
    importName: 'IuStatistic',
    name: 'Statistic',
    zh: '指标展示',
    category: '数据',
    desc: '数值与趋势的组合展示',
    slug: 'statistic',
    recommended: true,
    preview: 'stat',
    demoState: { label: '本月访问量', value: 24800, suffix: '+', trend: 12.6 },
    controls: [
      { kind: 'text', key: 'label', label: '名称 Label' },
      { kind: 'number', key: 'value', label: '数值 Value', step: 100 },
      { kind: 'number', key: 'trend', label: '涨跌幅 Trend（%）', step: 0.1 },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuStatistic\n    label="${s.label}"\n    :value="${s.value}"\n    suffix="${s.suffix}"\n    :trend="${s.trend}"\n    trend-label="较上月"\n  />\n</template>`,
        'IuStatistic',
      ),
    apiRows: [
      { prop: 'label', desc: '指标名称', type: 'string', def: '—' },
      { prop: 'value', desc: '指标数值（进入视口时滚动）', type: 'number', def: '必填' },
      { prop: 'prefix / suffix', desc: '数值前后缀', type: 'string', def: '—' },
      { prop: 'decimals', desc: '小数位数', type: 'number', def: '0' },
      { prop: 'duration', desc: '滚动动画时长（毫秒）', type: 'number', def: '1200' },
      { prop: 'trend', desc: '涨跌幅（正绿▲ 负红▼）', type: 'number', def: '—' },
      { prop: 'trendLabel', desc: '涨跌幅说明', type: 'string', def: '—' },
    ],
  },
  {
    importName: 'IuAuroraBackground',
    name: 'AuroraBackground',
    zh: '极光背景',
    category: '背景',
    desc: '流动的极光渐变画布',
    slug: 'aurora-background',
    preview: 'aurora',
    demoState: { height: '240px' },
    controls: [
      {
        kind: 'select',
        key: 'height',
        label: '高度 Height',
        options: [
          { label: '240px', value: '240px' },
          { label: '320px', value: '320px' },
          { label: '100vh', value: '100vh' },
        ],
      },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuAuroraBackground height="${s.height}" rounded="14px">\n    <h4>流动的极光渐变（亮 / 暗色下表现不同）</h4>\n  </IuAuroraBackground>\n</template>`,
        'IuAuroraBackground',
      ),
    apiRows: [
      { prop: 'height', desc: '容器高度（CSS 长度）', type: 'string', def: "'100vh'" },
      { prop: 'rounded', desc: '容器圆角（CSS 长度）', type: 'string', def: '—' },
      { prop: 'radialGradient', desc: '启用右上角径向遮罩', type: 'boolean', def: 'true' },
      { prop: 'paused', desc: '暂停动画', type: 'boolean', def: 'false' },
      { prop: 'reducedMotion', desc: '减少动效偏好', type: 'ReducedMotionMode', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '前景内容（组件内部自动垫高层级）', type: '—', def: '—' }],
  },
  {
    importName: 'IuPatternBackground',
    name: 'PatternBackground',
    zh: '图案背景',
    category: '背景',
    desc: '网格与圆点图案画布',
    slug: 'pattern-background',
    preview: 'pattern',
    demoState: { variant: 'grid', animate: true },
    controls: [
      {
        kind: 'select',
        key: 'variant',
        label: '图案 Variant',
        options: [
          { label: 'Grid', value: 'grid' },
          { label: 'Dot', value: 'dot' },
          { label: 'BigDot', value: 'big-dot' },
        ],
      },
      { kind: 'switch', key: 'animate', label: 'animate' },
    ],
    demoCode: (s) =>
      staticCode(
        `<template>\n  <IuPatternBackground\n    variant="${s.variant}"\n    ${s.animate ? ':animate="true"' : ':animate="false"'}\n    direction="top"\n    :speed="25000"\n    style="height: 240px; border-radius: 14px"\n  >\n    <p>网格 / 圆点图案背景</p>\n  </IuPatternBackground>\n</template>`,
        'IuPatternBackground',
      ),
    apiRows: [
      { prop: 'variant', desc: '图案类型', type: "'grid' | 'dot' | 'big-dot'", def: "'grid'" },
      { prop: 'size', desc: '图案尺寸', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", def: "'md'" },
      { prop: 'animate', desc: '启用滚动动画', type: 'boolean', def: 'false' },
      { prop: 'direction', desc: '动画方向（八方向）', type: 'PatternBackgroundDirection', def: "'top'" },
      { prop: 'mask', desc: '径向遮罩', type: "'ellipse' | 'ellipse-top'", def: "'ellipse'" },
      { prop: 'speed', desc: '动画速度（毫秒/周期）', type: 'number', def: '10000' },
    ],
  },
]

export const getComponent = (slug: string): ComponentMeta | undefined =>
  COMPONENTS.find((c) => c.slug === slug)

export const componentCount = COMPONENTS.length

/** 真实包版本（顶栏展示，不虚构） */
export { version as packageVersion } from 'inspira-ui-components'

export const REPO_URL = 'https://github.com/Mayday4671/inspira-ui-components'
export const PACKAGE_NAME = 'inspira-ui-components'

export type { Component }
