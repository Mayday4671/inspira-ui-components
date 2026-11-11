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
  | 'pullup'
  | 'spin'
  | 'box'
  | 'line-shadow'
  | 'hyper'
  | 'encrypt'
  | 'morph'
  | 'focus'
  | 'colourful'
  | 'beam'
  | 'meteors'
  | 'compare'
  | 'lens'
  | 'alist'
  | 'fgrid'
  | 'lswap'
  | 'thl'
  | 'uline'
  | 'float'
  | 'spk'
  | 'stx'
  | 'tglitch'
  | 'thover'
  | 'treveal'
  | 'radiant'
  | 'breath'
  | 'rip'
  | 'igp'
  | 'pblur'
  | 'mload'
  | 'dah'
  | 'neon'
  | 'fcard'
  | 'ctf'
  | 'inp'
  | 'tl'
  | 'tbm'
  | 'gborder'
  | 'geffect'
  | 'circprog'
  | 'atabs'
  | 'islider'
  | 'confetti'
  | 'cscroll'
  | 'ftree'
  | 'dock'
  | 'lprev'
  | 'book'
  | 'lamp'
  | 'iphone'
  | 'bslider'
  | 'atesti'
  | 'cstack'
  | 'ibadge'
  | 'htext'
  | 'agrid'
  | 'scursor'
  | 'wavy'
  | 'vortex'
  | 'bstar'
  | 'bhola'
  | 'bfall'
  | 'bsilk'
  | 'bsing'
  | 'bthun'
  | 'bstrac'
  | 'snow'
  | 'screw'
  | 'vtext'
  | 'vltext'
  | 'sswap'
  | 'scratch'
  | 'mtext'
  | 'pmarq'
  | 'vinput'
  | 'smask'
  | 'scscale'
  | 't3d'

export interface ComponentMeta {
  /** 导出名（含 Iu 前缀） */
  importName: string
  /** 展示名 */
  name: string
  zh: string
  category: '按钮' | '卡片' | '文本' | '交互' | '数据' | '特效' | '背景'
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

export const CATEGORIES = ['全部', '按钮', '卡片', '文本', '特效', '交互', '数据', '背景'] as const

const CATEGORY_EN: Record<string, string> = {
  按钮: 'Buttons',
  卡片: 'Cards',
  文本: 'Text',
  交互: 'Interaction',
  数据: 'Data',
  背景: 'Backgrounds',
  特效: 'Special',
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
  // 先拼接再全局替换：INSTALL_SNIPPET 追加段中的 %NAME% 也必须被替换
  const full = template + (template.includes('<script') ? '' : INSTALL_SNIPPET)
  return full.split('%NAME%').join(importName)
}


/** 生成「数据定义在 script setup、模板只引用」的标准示例代码 */
function scriptedCode(
  name: string,
  consts: Array<[string, string]> | string[][],
  body: string,
): string {
  const constLines = consts.map(([k, v]) => `const ${k} = ${v}`).join('\n')
  return `<template>\n${body}\n</template>\n\n<script setup lang="ts">\nimport { ${name} } from 'inspira-ui-components'\nimport 'inspira-ui-components/dist/index.css'\n\n${constLines}\n<\/script>`
}

const avatarFn = `function avatar(name: string, color: string) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const svg = \`<svg xmlns='http://www.w3.org/2000/svg' width='112' height='112'><rect width='100%25' height='100%25' fill='\${color}'/><text x='50%25' y='54%25' dy='.35em' text-anchor='middle' font-family='system-ui' font-size='42' fill='%23fff'>\${initials}</text></svg>\`
  return \`data:image/svg+xml;utf8,\${encodeURIComponent(svg)}\`
}`

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
        demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['title', `'${s.title}'`],
        ['description', `'悬停整卡跟随鼠标旋转，标题与背景沿 Z 轴分层浮起。'`],
        ['cta', `'${s.cta}'`],
      ]
      const body = [
        '  <IuCard3D',
        '    :title="title"',
        '    :description="description"',
        '    :cta="cta"',
        '  />',
      ].join('\n')
      return scriptedCode('IuCard3D', consts, body)
    },
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
        demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['title', `'${s.title}'`],
        ['description', `'鼠标在卡片上移动，会有一道聚光灯跟随光斑。'`],
        ['gradientSize', String(s.gradientSize)],
      ]
      const body = [
        '  <IuCardSpotlight',
        '    :title="title"',
        '    :description="description"',
        '    :gradient-size="gradientSize"',
        '  />',
      ].join('\n')
      return scriptedCode('IuCardSpotlight', consts, body)
    },
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
        demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['rotate', `'${s.rotate}'`],
        ['backTitle', `'${s.backTitle}'`],
        ['backDescription', `'鼠标移开自动翻回正面。'`],
      ]
      const body = [
        '  <IuFlipCard',
        '    :rotate="rotate"',
        '    :back-title="backTitle"',
        '    :back-description="backDescription"',
        '  />',
      ].join('\n')
      return scriptedCode('IuFlipCard', consts, body)
    },
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
        demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['width', String(s.width)],
        ['radius', String(s.radius)],
      ]
      const body = [
        '  <IuGlareCard',
        '    :width="width"',
        '    :radius="radius"',
        '  >',
        '    <div style="width: 100%; height: 100%">自定义内容</div>',
        '  </IuGlareCard>',
      ].join('\n')
      return scriptedCode('IuGlareCard', consts, body)
    },
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
        demoCode: (s) => {
      const items = `[
    { key: 'a', name: '统一 API', description: '统一 Props、Events 与插槽体验。' },
    { key: 'b', name: '按需引入', description: '具名导入，tree-shaking 友好。' },
    { key: 'c', name: '类型完备', description: 'Vue 3 + TypeScript 全量类型。' },
  ]`
      const body = '  <IuBentoGrid :items="items" />'
      return scriptedCode('IuBentoGrid', [['items', items]], body)
    },
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
      const consts: Array<[string, string]> = [
        ['value', String(s.value)],
        ['decimalPlaces', String(s.decimalPlaces)],
      ]
      if (s.prefix) consts.push(['prefix', `'${s.prefix}'`])
      if (s.suffix) consts.push(['suffix', `'${s.suffix}'`])
      const body = [
        '  <IuNumberTicker',
        '    :value="value"',
        '    :decimal-places="decimalPlaces"',
        s.prefix ? '    :prefix="prefix"' : null,
        s.suffix ? '    :suffix="suffix"' : null,
        '  />',
      ].filter(Boolean)
      return scriptedCode('IuNumberTicker', consts, body.join('\n'))
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
        demoCode: (s) => {
      return scriptedCode(
        'IuTypewriterText',
        [
          ['text', `'${s.text}'`],
          ['speed', String(s.speed)],
        ],
        '  <IuTypewriterText :text="text" :speed="speed" />',
      )
    },
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
      const words = String(s.words)
        .split(',')
        .map((w) => `'${w.trim()}'`)
        .join(', ')
      return scriptedCode(
        'IuFlipWords',
        [
          ['words', `[${words}]`],
          ['duration', String(s.duration)],
        ],
        '  <IuFlipWords :words="words" :duration="duration" />',
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
        demoCode: (s) => {
      return scriptedCode(
        'IuTextGenerateEffect',
        [['words', `'${s.words}'`]],
        '  <IuTextGenerateEffect :words="words" />',
      )
    },
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
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['items', `[
    { id: 1, name: '张伟', designation: '前端工程师', image: avatar('Zhang Wei', '#6366f1') },
    { id: 2, name: '李娜', designation: 'UI 设计师', image: avatar('Li Na', '#ec4899') },
    { id: 3, name: '王强', designation: '架构师', image: avatar('Wang Qiang', '#14b8a6') },
    { id: 4, name: '赵敏', designation: '产品经理', image: avatar('Zhao Min', '#f59e0b') },
  ]`],
        ['avatar', avatarFn],
      ]
      const body = '  <IuAnimatedTooltip :items="items" />'
      return scriptedCode('IuAnimatedTooltip', consts, body)
    },
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
      const lines = [
        '  <IuMarquee',
        '    :speed="speed"',
        s.pauseOnHover ? '    pause-on-hover' : null,
        s.reverse ? '    reverse' : null,
        '    :items="items"',
        '  />',
      ].filter(Boolean)
      return scriptedCode(
        'IuMarquee',
        [
          ['items', `['Vue 3', 'TypeScript', 'Motion']`],
          ['speed', String(s.speed)],
        ],
        lines.join('\n'),
      )
    },
    apiRows: [
      { prop: 'items', desc: '滚动内容；字符串自动生成胶囊，对象可自定义 key/label', type: '(string | { key, label })[]', def: '—' },
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
        demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['label', `'${s.label}'`],
        ['value', String(s.value)],
        ['suffix', `'${s.suffix}'`],
        ['trend', String(s.trend)],
        ['trendLabel', `'${s.trendLabel}'`],
      ]
      const body = [
        '  <IuStatistic',
        '    :label="label"',
        '    :value="value"',
        '    :suffix="suffix"',
        '    :trend="trend"',
        '    :trend-label="trendLabel"',
        '  />',
      ].join('\n')
      return scriptedCode('IuStatistic', consts, body)
    },
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
        demoCode: (s) => {
      const animateAttr = s.animate ? ':animate="true"' : ':animate="false"'
      const body = [
        '  <IuPatternBackground',
        `    variant="${s.variant}"`,
        `    ${animateAttr}`,
        '    direction="top"',
        '    :speed="12000"',
        '    style="height: 240px; border-radius: 14px"',
        '  >',
        '    <p>网格 / 圆点图案背景</p>',
        '  </IuPatternBackground>',
      ].join('\n')
      return scriptedCode('IuPatternBackground', [['variant', `'${s.variant}'`], ['animate', String(s.animate)]], body)
    },
    apiRows: [
      { prop: 'variant', desc: '图案类型', type: "'grid' | 'dot' | 'big-dot'", def: "'grid'" },
      { prop: 'size', desc: '图案尺寸', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", def: "'md'" },
      { prop: 'animate', desc: '启用滚动动画', type: 'boolean', def: 'false' },
      { prop: 'direction', desc: '动画方向（八方向）', type: 'PatternBackgroundDirection', def: "'top'" },
      { prop: 'mask', desc: '径向遮罩', type: "'ellipse' | 'ellipse-top'", def: "'ellipse'" },
      { prop: 'speed', desc: '动画速度（毫秒/周期）', type: 'number', def: '10000' },
    ],
  },
  // ========= 批次 2：文本动画扩展 =========
  {
    importName: 'IuLetterPullup', name: 'LetterPullup', zh: '字母升起',
    category: '文本', desc: '字母逐个升起入场', slug: 'letter-pullup', preview: 'pullup',
    demoState: { words: 'Inspira UI', delay: 0.05 },
    controls: [{ kind: 'text', key: 'words', label: '文本 Words' }, { kind: 'number', key: 'delay', label: '延迟 Delay（秒）', step: 0.01 }],
    demoCode: (s) => {
      return scriptedCode('IuLetterPullup', [['words', `'${s.words}'`], ['delay', String(s.delay)]], '  <IuLetterPullup :words="words" :delay="delay" />')
    },
    apiRows: [
      { prop: 'words', desc: '要逐字升起的文本', type: 'string', def: '必填' },
      { prop: 'delay', desc: '每个字母间的延迟（秒）', type: 'number', def: '0.05' },
    ],
  },
  {
    importName: 'IuSpinningText', name: 'SpinningText', zh: '旋转文字',
    category: '文本', desc: '文字环形旋转动画', slug: 'spinning-text', preview: 'spin',
    demoState: { text: 'Loading · · ·', duration: 10, radius: 5 },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'duration', label: '周期 Duration（秒）', step: 1 },
      { kind: 'number', key: 'radius', label: '半径 Radius', step: 1 },
    ],
    demoCode: (s) => {
      return scriptedCode('IuSpinningText', [['text', `'${s.text}'`], ['duration', String(s.duration)], ['radius', String(s.radius)]],
        '  <IuSpinningText :text="text" :duration="duration" :radius="radius" />')
    },
    apiRows: [
      { prop: 'text', desc: '环形排列的文本', type: 'string', def: '必填' },
      { prop: 'duration', desc: '旋转一圈时长（秒）', type: 'number', def: '10' },
      { prop: 'radius', desc: '旋转半径（em）', type: 'number', def: '5' },
      { prop: 'reverse', desc: '反向旋转', type: 'boolean', def: 'false' },
    ],
  },
  {
    importName: 'IuBoxReveal', name: 'BoxReveal', zh: '方块揭示',
    category: '文本', desc: '色块滑出揭示内容', slug: 'box-reveal', preview: 'box',
    demoState: { color: '#5046e6', duration: 0.5, delay: 0.25 },
    controls: [
      { kind: 'text', key: 'color', label: '色块颜色 Color' },
      { kind: 'number', key: 'duration', label: '时长 Duration（秒）', step: 0.1 },
      { kind: 'number', key: 'delay', label: '延迟 Delay（秒）', step: 0.05 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['color', `'${s.color}'`],
        ['duration', String(s.duration)],
        ['delay', String(s.delay)],
      ]
      const body = [
        '  <IuBoxReveal :color="color" :duration="duration" :delay="delay">',
        '    <h3>Box Reveal</h3>',
        '    <p>色块滑出后揭示内容。</p>',
        '  </IuBoxReveal>',
      ].join('\n')
      return scriptedCode('IuBoxReveal', consts, body)
    },
    apiRows: [
      { prop: 'color', desc: '揭示色块颜色', type: 'string', def: "'#5046e6'" },
      { prop: 'duration', desc: '动画时长（秒）', type: 'number', def: '0.5' },
      { prop: 'delay', desc: '动画延迟（秒）', type: 'number', def: '0.25' },
    ],
    slotRows: [{ prop: 'default', desc: '被揭示的内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuLineShadowText', name: 'LineShadowText', zh: '行阴影文字',
    category: '文本', desc: '斜线阴影循环扫过', slug: 'line-shadow-text', preview: 'line-shadow',
    demoState: { shadowColor: 'black' },
    controls: [{ kind: 'text', key: 'shadowColor', label: '阴影色 Shadow Color' }],
    demoCode: (s) => {
      return scriptedCode('IuLineShadowText', [['shadowColor', `'${s.shadowColor}'`]], '  <IuLineShadowText :shadow-color="shadowColor">Hover Text</IuLineShadowText>')
    },
    apiRows: [
      { prop: 'shadowColor', desc: '阴影斜线颜色', type: 'string', def: "'black'" },
      { prop: 'as', desc: '渲染的标签', type: 'string', def: "'span'" },
    ],
    slotRows: [{ prop: 'default', desc: '文字内容（仅字符串）', type: 'string', def: '必填' }],
  },
  {
    importName: 'IuHyperText', name: 'HyperText', zh: '乱码解码',
    category: '文本', desc: '悬停时乱码解码动画', slug: 'hyper-text', preview: 'hyper',
    demoState: { text: 'Hover Me', duration: 800 },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'duration', label: '时长 Duration（毫秒）', step: 100 },
    ],
    demoCode: (s) => {
      return scriptedCode('IuHyperText', [['text', `'${s.text}'`], ['duration', String(s.duration)]], '  <IuHyperText :text="text" :duration="duration" :animate-on-load="true" />')
    },
    apiRows: [
      { prop: 'text', desc: '目标文本', type: 'string', def: '必填' },
      { prop: 'duration', desc: '解码动画时长（毫秒）', type: 'number', def: '800' },
      { prop: 'animateOnLoad', desc: '加载时自动播放', type: 'boolean', def: '—' },
    ],
  },
  {
    importName: 'IuEncryptedText', name: 'EncryptedText', zh: '加密解密',
    category: '文本', desc: '进入视口时从乱码解密', slug: 'encrypted-text', preview: 'encrypt',
    demoState: { text: 'Encrypted Text' },
    controls: [{ kind: 'text', key: 'text', label: '文本 Text' }],
    demoCode: (s) => {
      return scriptedCode('IuEncryptedText', [['text', `'${s.text}'`]], '  <IuEncryptedText :text="text" />')
    },
    apiRows: [
      { prop: 'text', desc: '目标文本', type: 'string', def: '必填' },
      { prop: 'revealDelayMs', desc: '每个字符解密间隔（毫秒）', type: 'number', def: '50' },
      { prop: 'charset', desc: '乱码字符集', type: 'string', def: '字母+数字+符号' },
    ],
  },
  {
    importName: 'IuMorphingText', name: 'MorphingText', zh: '形变文字',
    category: '文本', desc: '多组文本模糊形变切换', slug: 'morphing-text', preview: 'morph',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const texts = `['软件工程师', '设计师', '创造者']`
      const body = '  <IuMorphingText :texts="texts" />'
      return scriptedCode('IuMorphingText', [['texts', texts]], body)
    },
    apiRows: [
      { prop: 'texts', desc: '形变切换的文本数组', type: 'string[]', def: '必填' },
      { prop: 'morphTime', desc: '形变时长（秒）', type: 'number', def: '1.5' },
      { prop: 'coolDownTime', desc: '切换间隔冷却（秒）', type: 'number', def: '0.5' },
    ],
  },
  {
    importName: 'IuFocus', name: 'Focus', zh: '聚焦文字',
    category: '文本', desc: '逐词聚焦高亮动画', slug: 'focus', preview: 'focus',
    demoState: { sentence: 'Coding Is A Focus Game' },
    controls: [{ kind: 'text', key: 'sentence', label: '句子 Sentence' }],
    demoCode: (s) => {
      return scriptedCode('IuFocus', [['sentence', `'${s.sentence}'`]], '  <IuFocus :sentence="sentence" :manual-mode="true" />')
    },
    apiRows: [
      { prop: 'sentence', desc: '句子内容', type: 'string', def: "'Inspira Focus'" },
      { prop: 'manualMode', desc: '手动模式（鼠标控制）', type: 'boolean', def: 'false' },
      { prop: 'blurAmount', desc: '未聚焦模糊度', type: 'number', def: '5' },
    ],
  },
  {
    importName: 'IuColourfulText', name: 'ColourfulText', zh: '多彩文字',
    category: '文本', desc: '彩色字符随机变化', slug: 'colourful-text', preview: 'colourful',
    demoState: { text: 'Colourful' },
    controls: [{ kind: 'text', key: 'text', label: '文本 Text' }],
    demoCode: (s) => {
      return scriptedCode('IuColourfulText', [['text', `'${s.text}'`]], '  <IuColourfulText :text="text" />')
    },
    apiRows: [
      { prop: 'text', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'colors', desc: '颜色池', type: 'string[]', def: '10 种彩色' },
      { prop: 'duration', desc: '动画时长（秒）', type: 'number', def: '0.5' },
    ],
  },
  {
    importName: 'IuLetterSwap', name: 'LetterSwap', zh: '字母交换',
    category: '文本', desc: '悬停时字母乱序交换', slug: 'letter-swap', preview: 'lswap',
    demoState: { label: 'Hover Me' },
    controls: [{ kind: 'text', key: 'label', label: '文本 Label' }],
    demoCode: (s) => {
      return scriptedCode('IuLetterSwap', [['label', `'${s.label}'`]], '  <IuLetterSwap :label="label" />')
    },
    apiRows: [
      { prop: 'label', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'animation', desc: '动画模式', type: "'forward' | 'pingpong'", def: "'forward'" },
      { prop: 'staggerDuration', desc: '字母交错延迟', type: 'number', def: '0.03' },
    ],
  },
  {
    importName: 'IuTextHighlight', name: 'TextHighlight', zh: '文本高亮',
    category: '文本', desc: '进入视口时高亮文字', slug: 'text-highlight', preview: 'thl',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      return scriptedCode('IuTextHighlight', [], '  <IuTextHighlight>高亮的文字内容</IuTextHighlight>')
    },
    apiRows: [
      { prop: 'delay', desc: '动画延迟（毫秒）', type: 'number', def: '0' },
      { prop: 'duration', desc: '动画时长（毫秒）', type: 'number', def: '2000' },
      { prop: 'textEndColor', desc: '高亮后的文字色', type: 'string', def: "'inherit'" },
    ],
    slotRows: [{ prop: 'default', desc: '要高亮的文本内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuUnderlineText', name: 'UnderlineText', zh: '下划线动画',
    category: '文本', desc: '进入视口时下划线动画', slug: 'underline-text', preview: 'uline',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      return scriptedCode('IuUnderlineText', [], '  <IuUnderlineText>下划线动画文字</IuUnderlineText>')
    },
    apiRows: [
      { prop: 'as', desc: '渲染的标签', type: 'string', def: "'span'" },
      { prop: 'variant', desc: '下划线样式', type: "'center' | 'comes-in-goes-out' | 'goes-out-comes-in'", def: "'center'" },
      { prop: 'direction', desc: '动画方向', type: "'left' | 'right'", def: "'left'" },
      { prop: 'underlineHeightRatio', desc: '下划线高度比例', type: 'number', def: '0.1' },
    ],
    slotRows: [{ prop: 'default', desc: '文本内容', type: '—', def: '—' }],
  },
  // ========= 批次 2：特效扩展 =========
  {
    importName: 'IuBorderBeam', name: 'BorderBeam', zh: '边框光束',
    category: '特效', desc: '沿容器边框流动的光束', slug: 'border-beam', preview: 'beam',
    demoState: { size: 200, duration: 6000, colorFrom: '#ffaa40', colorTo: '#9c40ff' },
    controls: [
      { kind: 'number', key: 'duration', label: '周期 Duration（毫秒）', step: 1000 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['colorFrom', `'${s.colorFrom}'`],
        ['colorTo', `'${s.colorTo}'`],
        ['duration', String(s.duration)],
      ]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border p-6">',
        '    <IuBorderBeam :color-from="colorFrom" :color-to="colorTo" :duration="duration" />',
        '    <p>Border Beam 内容</p>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuBorderBeam', consts, body)
    },
    apiRows: [
      { prop: 'size', desc: '光束长度（px）', type: 'number', def: '200' },
      { prop: 'duration', desc: '一圈时长（毫秒）', type: 'number', def: '6000' },
      { prop: 'colorFrom / colorTo', desc: '光束渐变色', type: 'string', def: '—' },
      { prop: 'borderWidth', desc: '光束宽度', type: 'number', def: '—' },
    ],
  },
  {
    importName: 'IuMeteors', name: 'Meteors', zh: '流星',
    category: '特效', desc: '从上方划过的流星雨', slug: 'meteors', preview: 'meteors',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative overflow-hidden h-40 border">',
        '    <span class="absolute inset-0">',
        '      <IuMeteors />',
        '    </span>',
        '    <p class="p-6">Meteor Shower</p>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuMeteors', [], body)
    },
    apiRows: [
      { prop: 'number', desc: '流星数量', type: 'number', def: '20' },
      { prop: 'angle', desc: '流星角度', type: 'number', def: '215' },
    ],
  },
  {
    importName: 'IuFlickeringGrid', name: 'FlickeringGrid', zh: '闪烁网格',
    category: '特效', desc: '随机闪烁的网格粒子背景', slug: 'flickering-grid', preview: 'fgrid',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <FlickeringGrid',
        '    class="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"',
        '    :square-size="4"',
        '    :grid-gap="4"',
        '    color="#60a5fa"',
        '    :max-opacity="0.6"',
        '    :flicker-chance="0.1"',
        '  />',
      ].join('\n')
      return scriptedCode('FlickeringGrid', [], body)
    },
    apiRows: [
      { prop: 'squareSize', desc: '方块大小（px）', type: 'number', def: '4' },
      { prop: 'gridGap', desc: '网格间距（px）', type: 'number', def: '4' },
      { prop: 'flickerChance', desc: '闪烁概率', type: 'number', def: '0.3' },
      { prop: 'color', desc: '方块颜色', type: 'string', def: "'rgb(242,242,242)'" },
      { prop: 'maxOpacity', desc: '最大不透明度', type: 'number', def: '0.3' },
    ],
  },
  // ========= 批次 2：场景扩展 =========
  {
    importName: 'IuCompare', name: 'Compare', zh: '图片对比',
    category: '特效', desc: '拖动分割线对比两张图片', slug: 'compare', preview: 'compare',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuCompare',
        '    first-image="/before.jpg"',
        '    second-image="/after.jpg"',
        '    :slide-mode="\'drag\'"',
        '    class="h-80"',
        '  />',
      ].join('\n')
      return scriptedCode('IuCompare', [], body)
    },
    apiRows: [
      { prop: 'firstImage / secondImage', desc: '前后两张图片', type: 'string', def: '必填' },
      { prop: 'slideMode', desc: '交互方式', type: "'hover' | 'drag'", def: "'drag'" },
      { prop: 'showHandlebar', desc: '显示拖动把手', type: 'boolean', def: 'true' },
      { prop: 'autoplay', desc: '自动播放动画', type: 'boolean', def: 'false' },
    ],
  },
  {
    importName: 'IuLens', name: 'Lens', zh: '放大镜',
    category: '特效', desc: '悬停放大局部区域', slug: 'lens', preview: 'lens',
    demoState: { zoomFactor: 1.5, lensSize: 170 },
    controls: [
      { kind: 'number', key: 'zoomFactor', label: '倍率 Zoom Factor', step: 0.5 },
      { kind: 'number', key: 'lensSize', label: '镜面尺寸 Lens Size', step: 20 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['zoomFactor', String(s.zoomFactor)],
        ['lensSize', String(s.lensSize)],
      ]
      const body = [
        '  <IuLens :zoom-factor="zoomFactor" :lens-size="lensSize" is-static>',
        '    <img src="/image.jpg" alt="" class="w-full" />',
        '  </IuLens>',
      ].join('\n')
      return scriptedCode('IuLens', consts, body)
    },
    apiRows: [
      { prop: 'zoomFactor', desc: '放大倍率', type: 'number', def: '1.5' },
      { prop: 'lensSize', desc: '镜面尺寸（px）', type: 'number', def: '170' },
      { prop: 'isStatic', desc: '固定位置不跟随鼠标', type: 'boolean', def: 'false' },
      { prop: 'hovering', desc: '外部控制悬停状态', type: 'boolean', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '被放大的内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuAnimatedList', name: 'AnimatedList', zh: '列表入场',
    category: '特效', desc: '子元素逐个入场动画', slug: 'animated-list', preview: 'alist',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuAnimatedList :delay="800">',
        '    <div>第一条内容</div>',
        '    <div>第二条内容</div>',
        '    <div>第三条内容</div>',
        '  </IuAnimatedList>',
      ].join('\n')
      return scriptedCode('IuAnimatedList', [], body)
    },
    apiRows: [
      { prop: 'delay', desc: '子元素入场间隔（毫秒）', type: 'number', def: '1000' },
    ],
    slotRows: [{ prop: 'default', desc: '列表子元素', type: '—', def: '—' }],
  },
  // ========= 批次 3：扩展组件 =========
  {
    importName: 'IuFloat', name: 'Float', zh: '漂浮容器',
    category: '特效', desc: '内容持续上下漂浮并轻微旋转', slug: 'float', preview: 'float',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div style="perspective: 900px">',
        '    <IuFloat>',
        '      <div style="padding: 24px 32px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); font-size: 14px; font-weight: 600">',
        '        漂浮的内容',
        '      </div>',
        '    </IuFloat>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuFloat', [], body)
    },
    apiRows: [
      { prop: 'speed', desc: '漂浮速度', type: 'number', def: '0.5' },
      { prop: 'amplitude', desc: 'X/Y/Z 漂浮幅度（px）', type: '[number, number, number]', def: '[10, 30, 30]' },
      { prop: 'rotationRange', desc: '三轴旋转幅度（度）', type: '[number, number, number]', def: '[15, 15, 7.5]' },
      { prop: 'timeOffset', desc: '时间偏移（多实例错开相位）', type: 'number', def: '0' },
    ],
    slotRows: [{ prop: 'default', desc: '被漂浮容器包裹的内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuSparkles', name: 'Sparkles', zh: '星星粒子',
    category: '背景', desc: 'Canvas 绘制的闪烁粒子背景', slug: 'sparkles', preview: 'spk',
    demoState: { particleColor: '#ffffff', minSize: 1, maxSize: 2 },
    controls: [
      { kind: 'text', key: 'particleColor', label: '粒子颜色 Particle Color' },
      { kind: 'number', key: 'minSize', label: '最小尺寸 Min Size', step: 0.5 },
      { kind: 'number', key: 'maxSize', label: '最大尺寸 Max Size', step: 0.5 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['particleColor', `'${s.particleColor}'`],
        ['minSize', String(s.minSize)],
        ['maxSize', String(s.maxSize)],
      ]
      const body = [
        '  <div style="position: relative; height: 240px; border-radius: 12px; overflow: hidden">',
        '    <IuSparkles',
        '      :particle-color="particleColor"',
        '      :min-size="minSize"',
        '      :max-size="maxSize"',
        '      :particle-density="120"',
        '      style="position: absolute; inset: 0"',
        '    />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuSparkles', consts, body)
    },
    apiRows: [
      { prop: 'background', desc: '画布背景色', type: 'string', def: "'#0d47a1'" },
      { prop: 'particleColor', desc: '粒子颜色', type: 'string', def: "'#ffffff'" },
      { prop: 'minSize / maxSize', desc: '粒子尺寸范围（px）', type: 'number', def: '1 / 3' },
      { prop: 'particleDensity', desc: '粒子密度', type: 'number', def: '120' },
      { prop: 'speed', desc: '粒子移动速度', type: 'number', def: '1' },
    ],
  },
  {
    importName: 'IuSparklesText', name: 'SparklesText', zh: '星星文字',
    category: '文本', desc: '文字周围随机闪烁星星', slug: 'sparkles-text', preview: 'stx',
    demoState: { text: 'Sparkles', sparklesCount: 10 },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'sparklesCount', label: '星星数量 Sparkles Count', step: 1 },
    ],
    demoCode: (s) => {
      return scriptedCode('IuSparklesText', [['text', `'${s.text}'`], ['sparklesCount', String(s.sparklesCount)]],
        '  <IuSparklesText :text="text" :sparkles-count="sparklesCount" />')
    },
    apiRows: [
      { prop: 'text', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'sparklesCount', desc: '同时存在的星星数量', type: 'number', def: '10' },
      { prop: 'colors', desc: '星星双色', type: '{ first: string; second: string }', def: "'#9E7AFF' / '#FE8BBB'" },
    ],
  },
  {
    importName: 'IuTextGlitch', name: 'TextGlitch', zh: '故障文字',
    category: '文本', desc: '赛博朋克故障抖动效果', slug: 'text-glitch', preview: 'tglitch',
    demoState: { text: 'GLITCH', speed: 0.5, enableShadows: true, enableOnHover: false },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'speed', label: '速度 Speed', step: 0.1 },
      { kind: 'switch', key: 'enableShadows', label: '红蓝色差 shadows' },
      { kind: 'switch', key: 'enableOnHover', label: '仅悬停触发 onHover' },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [['text', `'${s.text}'`], ['speed', String(s.speed)]]
      const body = s.enableOnHover
        ? '  <IuTextGlitch :text="text" :speed="speed" enable-on-hover />'
        : '  <IuTextGlitch :text="text" :speed="speed" />'
      return scriptedCode('IuTextGlitch', consts, body)
    },
    apiRows: [
      { prop: 'text', desc: '故障文本', type: 'string', def: '必填' },
      { prop: 'speed', desc: '故障动画速度', type: 'number', def: '0.5' },
      { prop: 'enableShadows', desc: '红/蓝色差阴影', type: 'boolean', def: 'true' },
      { prop: 'enableOnHover', desc: '仅悬停时触发', type: 'boolean', def: 'false' },
    ],
  },
  {
    importName: 'IuTextHoverEffect', name: 'TextHoverEffect', zh: '描边文字',
    category: '文本', desc: '描边文字跟随光标上色', slug: 'text-hover-effect', preview: 'thover',
    demoState: { text: 'Inspira', strokeWidth: 0.75 },
    controls: [
      { kind: 'text', key: 'text', label: '文本 Text' },
      { kind: 'number', key: 'strokeWidth', label: '描边宽度 Stroke Width', step: 0.25 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [['text', `'${s.text}'`], ['strokeWidth', String(s.strokeWidth)]]
      const body = [
        '  <div style="width: 100%; max-width: 560px">',
        '    <IuTextHoverEffect :text="text" :stroke-width="strokeWidth" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuTextHoverEffect', consts, body)
    },
    apiRows: [
      { prop: 'text', desc: '描边文本（光标附近渐显彩色）', type: 'string', def: '必填' },
      { prop: 'strokeWidth', desc: '描边宽度', type: 'number', def: '0.75' },
      { prop: 'duration', desc: '光斑过渡时长', type: 'number', def: '200' },
      { prop: 'opacity', desc: '描边基础透明度', type: 'number', def: '0.75' },
    ],
  },
  {
    importName: 'IuTextReveal', name: 'TextReveal', zh: '逐词揭示',
    category: '文本', desc: '文字逐词渐入揭示', slug: 'text-reveal', preview: 'treveal',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuTextReveal>',
        '    <h3 style="font-size: 28px; font-weight: 700">文字逐词揭示入场</h3>',
        '  </IuTextReveal>',
      ].join('\n')
      return scriptedCode('IuTextReveal', [], body)
    },
    apiRows: [
      { prop: 'duration', desc: '单词入场时长（秒）', type: 'number', def: '0.6' },
      { prop: 'delay', desc: '整体延迟（秒）', type: 'number', def: '0.2' },
      { prop: 'stagger', desc: '单词间隔（秒）', type: 'number', def: '0.1' },
    ],
    slotRows: [{ prop: 'default', desc: '要揭示的富文本内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuRadiantText', name: 'RadiantText', zh: '光带文字',
    category: '文本', desc: '光带循环扫过文字', slug: 'radiant-text', preview: 'radiant',
    demoState: { duration: 6, radiantWidth: 100 },
    controls: [
      { kind: 'number', key: 'duration', label: '周期 Duration（秒）', step: 1 },
      { kind: 'number', key: 'radiantWidth', label: '光带宽度 Radiant Width', step: 20 },
    ],
    demoCode: (s) => {
      const body = [
        '  <IuRadiantText :duration="duration" :radiant-width="radiantWidth" style="font-size: 24px; font-weight: 600">',
        '    Radiant Text',
        '  </IuRadiantText>',
      ].join('\n')
      return scriptedCode('IuRadiantText', [['duration', String(s.duration)], ['radiantWidth', String(s.radiantWidth)]], body)
    },
    apiRows: [
      { prop: 'duration', desc: '光带扫过周期（秒）', type: 'number', def: '10' },
      { prop: 'radiantWidth', desc: '光带宽度（px）', type: 'number', def: '100' },
    ],
    slotRows: [{ prop: 'default', desc: '文字内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuBreathingText', name: 'BreathingText', zh: '呼吸文字',
    category: '文本', desc: '可变字重呼吸动画', slug: 'breathing-text', preview: 'breath',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        `  <IuBreathingText from-font-variation-settings='"wght" 100, "slnt" 0' to-font-variation-settings='"wght" 900, "slnt" 8' style="font-size: 32px">`,
        '    Breathing',
        '  </IuBreathingText>',
      ].join('\n')
      return scriptedCode('IuBreathingText', [], body)
    },
    apiRows: [
      { prop: 'fromFontVariationSettings', desc: '起始可变字体设置', type: 'string', def: '必填' },
      { prop: 'toFontVariationSettings', desc: '峰值可变字体设置', type: 'string', def: '必填' },
      { prop: 'staggerDuration', desc: '字母交错延迟（秒）', type: 'number', def: '0.1' },
      { prop: 'staggerFrom', desc: '交错起点', type: "'first' | 'last' | 'center' | number", def: "'first'" },
      { prop: 'repeatDelay', desc: '重复间隔（秒）', type: 'number', def: '0.1' },
    ],
    slotRows: [{ prop: 'default', desc: '文字内容（也可用 text prop）', type: '—', def: '—' }],
    note: '需要可变字体（variable font）才能看到字重呼吸效果',
  },
  {
    importName: 'IuRipple', name: 'Ripple', zh: '涟漪圆环',
    category: '背景', desc: '同心圆环向外扩散动画', slug: 'ripple', preview: 'rip',
    demoState: { numberOfCircles: 7, waveSpeed: 80 },
    controls: [
      { kind: 'number', key: 'numberOfCircles', label: '圆环数量 Circles', step: 1 },
      { kind: 'number', key: 'waveSpeed', label: '波动速度 Wave Speed', step: 10 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['numberOfCircles', String(s.numberOfCircles)],
        ['waveSpeed', String(s.waveSpeed)],
      ]
      const body = [
        '  <div style="position: relative; height: 300px; display: grid; place-items: center; overflow: hidden; border-radius: 12px">',
        '    <IuRipple :number-of-circles="numberOfCircles" :wave-speed="waveSpeed" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuRipple', consts, body)
    },
    apiRows: [
      { prop: 'baseCircleSize', desc: '基础圆环尺寸（px）', type: 'number', def: '210' },
      { prop: 'numberOfCircles', desc: '圆环数量', type: 'number', def: '7' },
      { prop: 'spaceBetweenCircle', desc: '圆环间距（px）', type: 'number', def: '70' },
      { prop: 'waveSpeed', desc: '波动速度（毫秒/周期）', type: 'number', def: '80' },
      { prop: 'baseCircleOpacity', desc: '基础透明度', type: 'number', def: '0.24' },
      { prop: 'circleOpacityDowngradeRatio', desc: '逐环透明度衰减比例', type: 'number', def: '0.03' },
      { prop: 'circleClass', desc: '圆环自定义 class', type: 'string', def: '—' },
    ],
    note: '组件自身铺满定位容器（absolute inset-0），请放在 relative 容器内使用',
  },
  {
    importName: 'IuInteractiveGridPattern', name: 'InteractiveGridPattern', zh: '互动网格图案',
    category: '背景', desc: '悬停点亮的网格图案', slug: 'interactive-grid-pattern', preview: 'igp',
    demoState: { width: 40, height: 40 },
    controls: [
      { kind: 'number', key: 'width', label: '格子宽 Cell Width', step: 10 },
      { kind: 'number', key: 'height', label: '格子高 Cell Height', step: 10 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [['width', String(s.width)], ['height', String(s.height)]]
      const body = [
        '  <div style="display: grid; place-items: center; height: 300px; border-radius: 12px; overflow: hidden">',
        '    <IuInteractiveGridPattern :width="width" :height="height" :squares="[24, 24]" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuInteractiveGridPattern', consts, body)
    },
    apiRows: [
      { prop: 'width / height', desc: '单个格子尺寸（px）', type: 'number', def: '40' },
      { prop: 'squares', desc: '横向与纵向格子数', type: '[number, number]', def: '[24, 24]' },
    ],
  },
  {
    importName: 'IuProgressiveBlur', name: 'ProgressiveBlur', zh: '渐进模糊',
    category: '特效', desc: '方向性渐变模糊层', slug: 'progressive-blur', preview: 'pblur',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div style="position: relative; height: 240px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">',
        '    <p style="padding: 24px; font-size: 14px; line-height: 2">底部内容逐渐模糊 — Progressive Blur</p>',
        '    <IuProgressiveBlur class="absolute bottom-0 left-0 right-0 h-3/5" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuProgressiveBlur', [], body)
    },
    apiRows: [
      { prop: 'direction', desc: '模糊渐变方向', type: "'top' | 'bottom' | 'left' | 'right'", def: "'bottom'" },
      { prop: 'blurLayers', desc: '渐进层数', type: 'number', def: '8' },
      { prop: 'blurIntensity', desc: '每层模糊强度', type: 'number', def: '0.25' },
    ],
  },
  {
    importName: 'IuMultiStepLoader', name: 'MultiStepLoader', zh: '多步加载',
    category: '数据', desc: '分步执行的全屏加载流程', slug: 'multi-step-loader', preview: 'mload',
    demoState: { preventClose: false },
    controls: [{ kind: 'switch', key: 'preventClose', label: '禁止手动关闭 preventClose' }],
    demoCode: (s) => {
      const stepsConst = "[\n    { text: '连接数据库', afterText: '数据库已连接' },\n    { text: '初始化模型', afterText: '模型就绪' },\n    { text: '启动服务', afterText: '服务运行中' },\n  ]"
      const body = [
        '  <IuMultiStepLoader :steps="steps" :loading="loading" :prevent-close="preventClose" @close="loading = false" />',
        '  <button @click="loading = true">启动加载流程</button>',
      ].join('\n')
      return scriptedCode('IuMultiStepLoader', [['loading', 'false'], ['preventClose', s.preventClose ? 'true' : 'false'], ['steps', stepsConst]], body)
    },
    apiRows: [
      { prop: 'steps', desc: '步骤数组（text / afterText / duration / action）', type: 'Step[]', def: '必填' },
      { prop: 'loading', desc: '是否显示加载层', type: 'boolean', def: 'false' },
      { prop: 'defaultDuration', desc: '默认步骤时长（毫秒）', type: 'number', def: '1500' },
      { prop: 'preventClose', desc: '禁止手动关闭', type: 'boolean', def: 'false' },
    ],
    eventRows: [
      { prop: 'state-change', desc: '当前步骤索引变化', type: '(index: number)', def: '—' },
      { prop: 'complete', desc: '全部步骤完成', type: '—', def: '—' },
      { prop: 'close', desc: '点击关闭按钮', type: '—', def: '—' },
    ],
    note: '加载层为 fixed 全屏遮罩（z-100 + 背景模糊）',
  },
  {
    importName: 'IuDirectionAwareHover', name: 'DirectionAwareHover', zh: '方向感知悬停',
    category: '交互', desc: '内容从鼠标进入的方向滑入', slug: 'direction-aware-hover', preview: 'dah',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuDirectionAwareHover',
        '    image-url="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600"',
        '    class="h-72 max-w-md"',
        '  >',
        '    <div class="p-6">',
        '      <h3>Direction Aware</h3>',
        '      <p>内容从鼠标进入的方向滑入。</p>',
        '    </div>',
        '  </IuDirectionAwareHover>',
      ].join('\n')
      return scriptedCode('IuDirectionAwareHover', [], body)
    },
    apiRows: [
      { prop: 'imageUrl', desc: '背景图片地址', type: 'string', def: '必填' },
      { prop: 'childrenClass', desc: '内容层样式（默认左下角白字）', type: 'string', def: '—' },
      { prop: 'imageClass', desc: '图片样式', type: 'string', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '悬停时滑入的内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuNeonBorder', name: 'NeonBorder', zh: '霓虹边框',
    category: '特效', desc: '双色霓虹扫光边框', slug: 'neon-border', preview: 'neon',
    demoState: { color1: '#0496ff', color2: '#ff0a54', duration: 6 },
    controls: [
      { kind: 'text', key: 'color1', label: '颜色一 Color 1' },
      { kind: 'text', key: 'color2', label: '颜色二 Color 2' },
      { kind: 'number', key: 'duration', label: '周期 Duration（秒）', step: 1 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['color1', `'${s.color1}'`],
        ['color2', `'${s.color2}'`],
        ['duration', String(s.duration)],
      ]
      const body = [
        '  <IuNeonBorder :color1="color1" :color2="color2" :duration="duration" class="rounded-xl p-8 text-center">',
        '    <p class="m-0 text-sm font-medium">Neon Border 内容</p>',
        '  </IuNeonBorder>',
      ].join('\n')
      return scriptedCode('IuNeonBorder', consts, body)
    },
    apiRows: [
      { prop: 'color1 / color2', desc: '霓虹渐变双色', type: 'string', def: "'#0496ff' / '#ff0a54'" },
      { prop: 'animationType', desc: '扫光模式', type: "'none' | 'half' | 'full'", def: "'half'" },
      { prop: 'duration', desc: '扫光周期（秒）', type: 'number', def: '6' },
    ],
    slotRows: [{ prop: 'default', desc: '边框内内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuFloatingCard', name: 'FloatingCard', zh: '悬浮卡片',
    category: '卡片', desc: '3D 倾斜 + 眩光跟随卡片', slug: 'floating-card', preview: 'fcard',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuFloatingCard class="max-w-sm">',
        '    <div class="p-6">',
        '      <h3 class="m-0 text-lg font-bold">Floating Card</h3>',
        '      <p class="mt-2 mb-0 text-sm opacity-70">鼠标悬停时卡片 3D 倾斜并出现眩光。</p>',
        '    </div>',
        '  </IuFloatingCard>',
      ].join('\n')
      return scriptedCode('IuFloatingCard', [], body)
    },
    apiRows: [
      { prop: 'rotateDepth', desc: '旋转幅度（度）', type: 'number', def: '17.5' },
      { prop: 'translateDepth', desc: 'Z 轴位移深度', type: 'number', def: '20' },
    ],
    slotRows: [{ prop: 'default', desc: '卡片内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuContainerTextFlip', name: 'ContainerTextFlip', zh: '容器文字翻转',
    category: '文本', desc: '词组翻转轮换容器', slug: 'container-text-flip', preview: 'ctf',
    demoState: { words: '更好,现代,漂亮,出色', interval: 3000 },
    controls: [
      { kind: 'text', key: 'words', label: '轮换词（逗号分隔） Words' },
      { kind: 'number', key: 'interval', label: '切换间隔 Interval（毫秒）', step: 500 },
    ],
    demoCode: (s) => {
      const words = `[${String(s.words)
        .split(',')
        .map((w) => `'${w.trim()}'`)
        .filter((w) => w !== "''")
        .join(', ')}]`
      const body = '  <span style="font-size: 24px; font-weight: 700">打造<IuContainerTextFlip :words="words" :interval="interval" />的界面</span>'
      return scriptedCode('IuContainerTextFlip', [['words', words], ['interval', String(s.interval)]], body)
    },
    apiRows: [
      { prop: 'words', desc: '轮换词数组', type: 'string[]', def: '["better", "modern", "beautiful", "awesome"]' },
      { prop: 'interval', desc: '切换间隔（毫秒）', type: 'number', def: '3000' },
      { prop: 'animationDuration', desc: '翻转动画时长（毫秒）', type: 'number', def: '700' },
    ],
  },
  {
    importName: 'IuIInput', name: 'IInput', zh: '输入框',
    category: '交互', desc: '悬停出现光斑的输入框', slug: 'input', preview: 'inp',
    demoState: { placeholder: '请输入邮箱地址' },
    controls: [{ kind: 'text', key: 'placeholder', label: '占位符 Placeholder' }],
    demoCode: (s) => {
      const body = '  <IuIInput :placeholder="placeholder" style="width: 320px" />'
      return scriptedCode('IuIInput', [['placeholder', `'${s.placeholder}'`]], body)
    },
    apiRows: [
      { prop: 'modelValue / v-model', desc: '输入值', type: 'string | number', def: '—' },
      { prop: 'defaultValue', desc: '非受控默认值', type: 'string | number', def: '—' },
      { prop: 'containerClass', desc: '外层容器样式', type: 'string', def: '—' },
    ],
    eventRows: [
      { prop: 'update:modelValue', desc: '输入值变化', type: '(value: string | number)', def: '—' },
    ],
  },
  {
    importName: 'IuTimeline', name: 'Timeline', zh: '时间轴',
    category: '交互', desc: '滚动进度驱动的渐变时间轴', slug: 'timeline', preview: 'tl',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const itemsConst = "[\n    { id: 'start', label: '2024' },\n    { id: 'growth', label: '2025' },\n    { id: 'now', label: '2026' },\n  ]"
      const body = [
        '  <IuTimeline :items="items" title="项目大事记" description="滚动页面查看进度线。">',
        '    <template #start>',
        '      <div class="pb-20"><h4>项目启动</h4><p>完成核心组件 20 个。</p></div>',
        '    </template>',
        '    <template #growth>',
        '      <div class="pb-20"><h4>生态扩展</h4><p>组件库规模翻倍。</p></div>',
        '    </template>',
        '    <template #now>',
        '      <div class="pb-20"><h4>持续演进</h4><p>全量对齐上游。</p></div>',
        '    </template>',
        '  </IuTimeline>',
      ].join('\n')
      return scriptedCode('IuTimeline', [['items', itemsConst]], body)
    },
    apiRows: [
      { prop: 'items', desc: '时间轴节点数组', type: '{ id: string; label: string }[]', def: '[]' },
      { prop: 'title', desc: '标题', type: 'string', def: '—' },
      { prop: 'description', desc: '描述文字', type: 'string', def: '—' },
    ],
    slotRows: [
      { prop: '#<id>', desc: '每个节点的内容插槽（以 items 中的 id 命名）', type: '—', def: '—' },
    ],
  },
  {
    importName: 'IuTracingBeam', name: 'TracingBeam', zh: '追踪光束',
    category: '特效', desc: '随滚动点亮的光束装饰', slug: 'tracing-beam', preview: 'tbm',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuTracingBeam>',
        '    <div class="p-6 space-y-6">',
        '      <h3>滚动追踪光束</h3>',
        '      <p>光束随页面滚动逐渐点亮，顶部节点随之变色。</p>',
        '      <p>把任意长内容放进默认插槽即可。</p>',
        '    </div>',
        '  </IuTracingBeam>',
      ].join('\n')
      return scriptedCode('IuTracingBeam', [], body)
    },
    apiRows: [
      { prop: 'class', desc: '容器样式（默认 max-w-4xl 居中）', type: 'string', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '长文本内容（滚动时被光束追踪）', type: '—', def: '—' }],
  },
  // ========= 批次 4：扩展组件 =========
  {
    importName: 'IuGlowBorder', name: 'GlowBorder', zh: '光晕边框',
    category: '特效', desc: '旋转扫过的光晕描边', slug: 'glow-border', preview: 'gborder',
    demoState: { color: '#6366f1', borderWidth: 2, duration: 6 },
    controls: [
      { kind: 'text', key: 'color', label: '光晕颜色 Color' },
      { kind: 'number', key: 'borderWidth', label: '边框宽度 Border Width', step: 1 },
      { kind: 'number', key: 'duration', label: '周期 Duration（秒）', step: 1 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['color', `'${s.color}'`],
        ['borderWidth', String(s.borderWidth)],
        ['duration', String(s.duration)],
      ]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border p-8 text-center">',
        '    <IuGlowBorder :color="color" :border-width="borderWidth" :duration="duration" />',
        '    <p class="m-0 text-sm font-medium">Glow Border 内容</p>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuGlowBorder', consts, body)
    },
    apiRows: [
      { prop: 'color', desc: '光晕颜色（数组为多彩）', type: 'string | string[]', def: "'#FFF'" },
      { prop: 'borderRadius', desc: '圆角（px）', type: 'number', def: '10' },
      { prop: 'borderWidth', desc: '光晕宽度（px）', type: 'number', def: '2' },
      { prop: 'duration', desc: '旋转周期（秒）', type: 'number', def: '10' },
    ],
    note: '组件自身铺满定位容器（absolute inset-0），请放在 relative rounded 容器内使用',
  },
  {
    importName: 'IuGlowingEffect', name: 'GlowingEffect', zh: '辉光效果',
    category: '特效', desc: '跟随光标的卡面辉光', slug: 'glowing-effect', preview: 'geffect',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative rounded-2xl border p-8 text-center">',
        '    <IuGlowingEffect :proximity="80" :spread="40" :disabled="false" :blur="0" />',
        '    <p class="m-0 text-sm font-medium">鼠标靠近时卡面出现辉光</p>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuGlowingEffect', [], body)
    },
    apiRows: [
      { prop: 'proximity', desc: '触发距离（px）', type: 'number', def: '0' },
      { prop: 'spread', desc: '辉光扩散（px）', type: 'number', def: '20' },
      { prop: 'inactiveZone', desc: '中心不敏感区（0-1）', type: 'number', def: '0.7' },
      { prop: 'glow', desc: '是否开启外发光', type: 'boolean', def: 'false' },
      { prop: 'disabled', desc: '禁用（默认 true）', type: 'boolean', def: 'true' },
      { prop: 'variant', desc: '配色', type: "'default' | 'white'", def: "'default'" },
    ],
  },
  {
    importName: 'IuAnimatedCircularProgressBar', name: 'AnimatedCircularProgressBar', zh: '环形进度条',
    category: '数据', desc: '入视口时动画填充的环形进度', slug: 'animated-circular-progressbar', preview: 'circprog',
    demoState: { value: 72, max: 100, duration: 1 },
    controls: [
      { kind: 'number', key: 'value', label: '当前值 Value', step: 1 },
      { kind: 'number', key: 'max', label: '最大值 Max', step: 10 },
      { kind: 'number', key: 'duration', label: '动画时长 Duration（秒）', step: 0.5 },
    ],
    demoCode: (s) => {
      const consts: Array<[string, string]> = [
        ['value', String(s.value)],
        ['max', String(s.max)],
        ['duration', String(s.duration)],
      ]
      const body = '  <IuAnimatedCircularProgressBar :value="value" :max="max" :duration="duration" />'
      return scriptedCode('IuAnimatedCircularProgressBar', consts, body)
    },
    apiRows: [
      { prop: 'value / max / min', desc: '进度数值范围', type: 'number', def: '0 / 100 / 0' },
      { prop: 'gaugePrimaryColor', desc: '进度环颜色', type: 'string', def: "'rgb(79 70 229)'" },
      { prop: 'gaugeSecondaryColor', desc: '轨道颜色', type: 'string', def: "'rgba(0,0,0,0.1)'" },
      { prop: 'circleStrokeWidth', desc: '环宽（px）', type: 'number', def: '10' },
      { prop: 'showPercentage', desc: '显示百分比文字', type: 'boolean', def: 'true' },
      { prop: 'duration', desc: '动画时长（秒）', type: 'number', def: '1' },
    ],
  },
  {
    importName: 'IuAnimatedTabs', name: 'AnimatedTabs', zh: '动画标签页',
    category: '交互', desc: '滑动胶囊指示器的标签页', slug: 'animated-tabs', preview: 'atabs',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const tabsConst = `[\n    { title: '首页', value: 'home' },\n    { title: '组件', value: 'components' },\n    { title: '主题', value: 'themes' },\n  ]`
      const body = [
        '  <IuAnimatedTabs :tabs="tabs" v-model="active">',
        '    <template #content="{ tab }">',
        '      <div class="p-4 text-sm">当前：{{ tab.value }}</div>',
        '    </template>',
        '  </IuAnimatedTabs>',
      ].join('\n')
      return scriptedCode('IuAnimatedTabs', [['tabs', tabsConst], ['active', "'home'"]], body)
    },
    apiRows: [
      { prop: 'tabs', desc: '标签数组（title / value）', type: 'AnimatedTab[]', def: '必填' },
      { prop: 'modelValue / v-model', desc: '当前标签 value', type: 'string', def: '—' },
      { prop: 'containerClassName', desc: '标签条样式', type: 'string', def: "''" },
      { prop: 'contentClassName', desc: '内容面板样式', type: 'string', def: "''" },
    ],
    slotRows: [
      { prop: '#content', desc: '面板内容插槽（作用域：tab）', type: '—', def: '—' },
    ],
    eventRows: [
      { prop: 'update:modelValue', desc: '标签切换', type: '(value: string)', def: '—' },
    ],
  },
  {
    importName: 'IuImagesSlider', name: 'ImagesSlider', zh: '图片滑动',
    category: '特效', desc: '缩放入场的图片轮播', slug: 'images-slider', preview: 'islider',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const imgsConst = "[\n    'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=800',\n    'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=800',\n  ]"
      const body = [
        '  <IuImagesSlider :images="images" class="h-72 rounded-xl">',
        '    <template #overlay>',
        '      <div class="p-6 text-white text-lg font-bold">叠加内容</div>',
        '    </template>',
        '  </IuImagesSlider>',
      ].join('\n')
      return scriptedCode('IuImagesSlider', [['images', imgsConst]], body)
    },
    apiRows: [
      { prop: 'images', desc: '图片地址数组', type: 'string[]', def: '[]' },
      { prop: 'hideOverlay', desc: '隐藏叠加层', type: 'boolean', def: 'false' },
      { prop: 'overlayClass / imageClass', desc: '叠加层 / 图片样式', type: 'string', def: '—' },
    ],
    slotRows: [{ prop: '#overlay', desc: '图片上的叠加内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuConfetti', name: 'Confetti', zh: '彩带',
    category: '特效', desc: 'canvas-confetti 彩带画布', slug: 'confetti', preview: 'confetti',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuConfetti>',
        '    <IuConfettiButton class="btn">',
        '      撒彩带 🎉',
        '    </IuConfettiButton>',
        '  </IuConfetti>',
      ].join('\n')
      return scriptedCode('IuConfetti', [], body)
    },
    apiRows: [
      { prop: 'options', desc: '彩带参数（particleCount / spread 等）', type: 'ConfettiOptions', def: '—' },
      { prop: 'globalOptions', desc: '全局默认参数', type: 'ConfettiGlobalOptions', def: '—' },
      { prop: 'manualstart', desc: '不自动撒放，仅手动 fire()', type: 'boolean', def: 'false' },
    ],
    slotRows: [{ prop: 'default', desc: '触发内容（IuConfettiButton 会注入上下文）', type: '—', def: '—' }],
    note: '依赖 canvas-confetti（已随库安装），IuConfetti 暴露 fire() 方法可编程触发',
  },
  {
    importName: 'IuContainerScroll', name: 'ContainerScroll', zh: '滚动缩放容器',
    category: '特效', desc: '滚动驱动的 3D 旋转展示台', slug: 'container-scroll', preview: 'cscroll',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuContainerScroll>',
        '    <template #title>',
        '      <h3 class="text-center text-2xl font-bold">滚动体验旋转展开</h3>',
        '    </template>',
        '    <div class="h-96 rounded-2xl border bg-gradient-to-b from-indigo-100 to-white dark:from-zinc-800 dark:to-zinc-900">',
        '      <p class="p-8 text-center text-sm">卡片随页面滚动旋转入场</p>',
        '    </div>',
        '  </IuContainerScroll>',
      ].join('\n')
      return scriptedCode('IuContainerScroll', [], body)
    },
    apiRows: [
      { prop: 'rotate / scale / translateY', desc: '由滚动进度自动驱动', type: 'number', def: '—' },
    ],
    slotRows: [
      { prop: '#title', desc: '顶部标题（随滚动上移）', type: '—', def: '—' },
      { prop: 'default', desc: '被旋转卡片包裹的内容', type: '—', def: '—' },
    ],
  },
  {
    importName: 'IuTree', name: 'Tree', zh: '文件树',
    category: '数据', desc: '可展开选中的文件树', slug: 'file-tree', preview: 'ftree',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const elsConst = `[\n    { id: '1', name: 'src', children: [\n      { id: '2', name: 'components', children: [{ id: '3', name: 'button.ts', isSelectable: true }] },\n      { id: '4', name: 'index.ts', isSelectable: true },\n    ] },\n    { id: '5', name: 'package.json', isSelectable: true },\n  ]`
      const body = [
        '  <IuTree',
        '    :elements="elements"',
        '    initial-selected-id="4"',
        '    :initial-expanded-items="[\'1\', \'2\']"',
        '    class="h-64 overflow-auto rounded-lg border p-2"',
        '  />',
      ].join('\n')
      return scriptedCode('IuTree', [['elements', elsConst]], body)
    },
    apiRows: [
      { prop: 'elements', desc: '树数据（id / name / children / isSelectable）', type: 'TreeViewElement[]', def: '必填' },
      { prop: 'initialSelectedId', desc: '初始选中节点 id', type: 'string', def: '必填' },
      { prop: 'initialExpandedItems', desc: '初始展开节点 id 数组', type: 'string[]', def: '必填' },
      { prop: 'indicator', desc: '显示缩进参考线', type: 'boolean', def: '—' },
      { prop: 'openIcon / closeIcon / fileIcon', desc: '图标（heroicon 名）', type: 'string', def: '—' },
    ],
  },
  {
    importName: 'IuDock', name: 'Dock', zh: '程序坞',
    category: '交互', desc: 'macOS 风格放大 Dock', slug: 'dock', preview: 'dock',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuDock class="rounded-2xl border p-2">',
        '    <IuDockIcon title="主页">🏠</IuDockIcon>',
        '    <IuDockIcon title="文档">📄</IuDockIcon>',
        '    <IuDockSeparator />',
        '    <IuDockIcon title="设置">⚙️</IuDockIcon>',
        '  </IuDock>',
      ].join('\n')
      return scriptedCode('IuDock', [], body)
    },
    apiRows: [
      { prop: 'magnification', desc: '放大后的图标尺寸（px）', type: 'number', def: '60' },
      { prop: 'distance', desc: '放大影响距离（px）', type: 'number', def: '140' },
      { prop: 'orientation', desc: '排列方向', type: "'horizontal' | 'vertical'", def: "'horizontal'" },
      { prop: 'direction', desc: '图标展开方向', type: "'top' | 'middle' | 'bottom'", def: "'middle'" },
    ],
    slotRows: [{ prop: 'default', desc: 'IuDockIcon / IuDockSeparator 列表', type: '—', def: '—' }],
  },
  {
    importName: 'IuLinkPreview', name: 'LinkPreview', zh: '链接预览',
    category: '交互', desc: '悬停链接弹出图片预览', slug: 'link-preview', preview: 'lprev',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <span style="font-size: 15px">',
        '    看',
        '    <IuLinkPreview',
        '      url="https://inspira-ui.com"',
        '      is-static',
        '      image-src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400"',
        '    >',
        '      这个链接',
        '    </IuLinkPreview>',
        '    的悬停预览。',
        '  </span>',
      ].join('\n')
      return scriptedCode('IuLinkPreview', [], body)
    },
    apiRows: [
      { prop: 'url', desc: '目标链接', type: 'string', def: '必填' },
      { prop: 'isStatic', desc: '静态图片模式（不请求 microlink）', type: 'boolean', def: 'false' },
      { prop: 'imageSrc', desc: '静态模式图片地址', type: 'string', def: '—' },
      { prop: 'width / height', desc: '预览图尺寸', type: 'number', def: '200 / 125' },
      { prop: 'linkClass', desc: '链接文字样式', type: 'string', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '链接文字内容', type: '—', def: '—' }],
  },
  {
    importName: 'IuBook', name: 'Book', zh: '3D 书本',
    category: '卡片', desc: '悬停翻开封面变化的书', slug: 'book', preview: 'book',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuBook color="indigo" size="md" is-static>',
        '    <template #header>',
        '      <span class="text-xs opacity-70">inspira-ui-components</span>',
        '    </template>',
        '    <template #title>',
        '      <h4 class="m-0 text-xl font-bold">Vue 动效组件集</h4>',
        '    </template>',
        '    <template #description>',
        '      <p class="m-0 text-xs opacity-80">悬停翻开封面查看内容。</p>',
        '    </template>',
        '  </IuBook>',
      ].join('\n')
      return scriptedCode('IuBook', [], body)
    },
    apiRows: [
      { prop: 'color', desc: '封面色系（tailwind 色名）', type: 'BookColor', def: "'zinc'" },
      { prop: 'size', desc: '尺寸', type: "'sm' | 'md' | 'lg' | 'xl'", def: "'md'" },
      { prop: 'radius', desc: '圆角', type: 'BookRadius', def: "'md'" },
      { prop: 'shadowSize', desc: '书脊阴影', type: 'BookShadowSize', def: "'lg'" },
      { prop: 'isStatic', desc: '静态翻开（不悬停）', type: 'boolean', def: 'false' },
      { prop: 'duration', desc: '翻开动画时长（毫秒）', type: 'number', def: '1000' },
    ],
    slotRows: [
      { prop: '#header / #title / #description', desc: '封面三段内容', type: '—', def: '—' },
    ],
  },
  {
    importName: 'IuLampEffect', name: 'LampEffect', zh: '台灯效果',
    category: '背景', desc: '顶部双锥形光束照明', slug: 'lamp-effect', preview: 'lamp',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuLampEffect class="min-h-64 rounded-xl">',
        '    <h3 class="z-10 text-center text-2xl font-semibold text-white">Lamp Effect</h3>',
        '  </IuLampEffect>',
      ].join('\n')
      return scriptedCode('IuLampEffect', [], body)
    },
    apiRows: [
      { prop: 'delay', desc: '光束入场延迟（秒）', type: 'number', def: '0.5' },
      { prop: 'duration', desc: '光束入场时长（秒）', type: 'number', def: '0.8' },
    ],
    slotRows: [{ prop: 'default', desc: '灯下内容（自身为深色底容器）', type: '—', def: '—' }],
    note: '组件默认 min-h-screen，用 class 覆盖高度',
  },
  {
    importName: 'IuIPhone15ProMockup', name: 'IPhone15ProMockup', zh: '手机样机',
    category: '特效', desc: 'iPhone 15 Pro 边框样机', slug: 'iphone-mockup', preview: 'iphone',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuIPhone15ProMockup :width="300" :height="610" class="drop-shadow-xl">',
        '    <img',
        '      src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600"',
        '      alt=""',
        '      style="width: 100%; height: 100%; object-fit: cover"',
        '    />',
        '  </IuIPhone15ProMockup>',
      ].join('\n')
      return scriptedCode('IuIPhone15ProMockup', [], body)
    },
    apiRows: [
      { prop: 'width / height', desc: '样机尺寸（px）', type: 'number', def: '433 / 882' },
    ],
    slotRows: [{ prop: 'default', desc: '屏幕内容（填入边框内屏）', type: '—', def: '—' }],
  },
  {
    importName: 'IuBalanceSlider', name: 'BalanceSlider', zh: '平衡滑块',
    category: '交互', desc: '左右加权的平衡拖动条', slug: 'balance-slider', preview: 'bslider',
    demoState: { initialValue: 50 },
    controls: [{ kind: 'number', key: 'initialValue', label: '初始值 Initial Value', step: 5 }],
    demoCode: (s) => {
      const body = '  <IuBalanceSlider :initial-value="initialValue" style="width: 360px" />'
      return scriptedCode('IuBalanceSlider', [['initialValue', String(s.initialValue)]], body)
    },
    apiRows: [
      { prop: 'initialValue', desc: '初始比例（0-100）', type: 'number', def: '50' },
      { prop: 'leftColor / rightColor', desc: '两侧颜色', type: 'string', def: "'#e68a00' / '#ffffff'" },
      { prop: 'leftContent / rightContent', desc: '两侧文字', type: 'string', def: "'LEFT' / 'RIGHT'" },
      { prop: 'indicatorColor', desc: '指针颜色', type: 'string', def: "'#FFFFFF'" },
      { prop: 'minShiftLimit / maxShiftLimit', desc: '指针可动范围', type: 'number', def: '40 / 68' },
      { prop: 'borderRadius', desc: '圆角（px）', type: 'number', def: '8' },
    ],
  },
  {
    importName: 'IuAnimatedTestimonials', name: 'AnimatedTestimonials', zh: '见证轮播',
    category: '数据', desc: '逐词浮现的用户评价轮播', slug: 'animated-testimonials', preview: 'atesti',
    demoState: { autoplay: false, duration: 5000 },
    controls: [
      { kind: 'switch', key: 'autoplay', label: '自动轮播 autoplay' },
      { kind: 'number', key: 'duration', label: '停留时长 Duration（毫秒）', step: 1000 },
    ],
    demoCode: (s) => {
      const tConst = `[\n    {\n      quote: '这套组件库让我们的动效页面交付速度快了三倍。',\n      name: '张伟',\n      designation: '前端负责人',\n      image: '/avatar-zhang.png',\n    },\n    {\n      quote: '类型完备，暗色模式开箱即用。',\n      name: '李娜',\n      designation: 'UI 设计师',\n      image: '/avatar-li.png',\n    },\n  ]`
      const body = '  <IuAnimatedTestimonials :testimonials="testimonials" :autoplay="autoplay" :duration="duration" />'
      return scriptedCode('IuAnimatedTestimonials', [['testimonials', tConst], ['autoplay', s.autoplay ? 'true' : 'false'], ['duration', String(s.duration)]], body)
    },
    apiRows: [
      { prop: 'testimonials', desc: '评价数组（quote / name / designation / image）', type: 'Testimonial[]', def: '[]' },
      { prop: 'autoplay', desc: '自动轮播', type: 'boolean', def: 'false' },
      { prop: 'duration', desc: '停留时长（毫秒）', type: 'number', def: '5000' },
    ],
  },
  {
    importName: 'IuCardStack', name: 'CardStack', zh: '卡片堆叠',
    category: '卡片', desc: '滚动时逐张收起的卡片堆', slug: 'card-stack', preview: 'cstack',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuCardStack :total-cards="3" class="h-96">',
        '    <IuCardStackItem :index="0" class="rounded-xl border p-6">第一张</IuCardStackItem>',
        '    <IuCardStackItem :index="1" class="rounded-xl border p-6">第二张</IuCardStackItem>',
        '    <IuCardStackItem :index="2" class="rounded-xl border p-6">第三张</IuCardStackItem>',
        '  </IuCardStack>',
      ].join('\n')
      return scriptedCode('IuCardStack', [], body)
    },
    apiRows: [
      { prop: 'totalCards', desc: '卡片总数', type: 'number', def: '必填' },
      { prop: 'scaleMultiplier', desc: '滚动缩放系数', type: 'number', def: '0.03' },
    ],
    slotRows: [{ prop: 'default', desc: 'IuCardStackItem 列表', type: '—', def: '—' }],
  },
  {
    importName: 'IuImagesBadge', name: 'ImagesBadge', zh: '文件夹徽章',
    category: '交互', desc: '悬停展开图片的文件夹图标', slug: 'images-badge', preview: 'ibadge',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const imgsConst = "[\n    'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300',\n    'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=300',\n    'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300&sat=-100',\n  ]"
      const body = '  <IuImagesBadge text="我的作品" :images="images" />'
      return scriptedCode('IuImagesBadge', [['images', imgsConst]], body)
    },
    apiRows: [
      { prop: 'text', desc: '文件夹旁文字', type: 'string', def: '必填' },
      { prop: 'images', desc: '展开的图片数组', type: 'string[]', def: '必填' },
      { prop: 'folderSize', desc: '文件夹尺寸', type: '{ width: number; height: number }', def: '{ width: 60, height: 44 }' },
      { prop: 'hoverSpread / hoverRotation', desc: '悬停散开间距 / 旋转角', type: 'number', def: '—' },
      { prop: 'href / target', desc: '渲染为链接', type: 'string', def: '—' },
    ],
  },
  {
    importName: 'IuHighlightText', name: 'HighlightText', zh: '高亮涂色',
    category: '文本', desc: '笔刷式方向高亮动画', slug: 'highlight-text', preview: 'htext',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = '  <IuHighlightText highlight-color="hsl(25 90% 80%)">高亮涂色的文字内容</IuHighlightText>'
      return scriptedCode('IuHighlightText', [], body)
    },
    apiRows: [
      { prop: 'highlightColor', desc: '高亮颜色', type: 'string', def: "'hsl(25 90% 80%)'" },
      { prop: 'direction', desc: '涂色方向', type: "'ltr' | 'rtl' | 'ttb' | 'btt'", def: "'ltr'" },
      { prop: 'triggerType', desc: '触发方式', type: "'hover' | 'ref' | 'inView' | 'auto'", def: "'inView'" },
    ],
    slotRows: [{ prop: 'default', desc: '要高亮的文字', type: '—', def: '—' }],
  },
  {
    importName: 'IuAnimateGrid', name: 'AnimateGrid', zh: '网格联动',
    category: '特效', desc: '悬停时相邻卡片联动的网格', slug: 'animate-grid', preview: 'agrid',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const cardsConst = `[\n    { logo: 'https://picsum.photos/seed/g1/200' },\n    { logo: 'https://picsum.photos/seed/g2/200' },\n    { logo: 'https://picsum.photos/seed/g3/200' },\n    { logo: 'https://picsum.photos/seed/g4/200' },\n  ]`
      const body = '  <IuAnimateGrid :cards="cards" class="max-w-md" />'
      return scriptedCode('IuAnimateGrid', [['cards', cardsConst]], body)
    },
    apiRows: [
      { prop: 'cards', desc: '卡片图片数组（4 的倍数排布）', type: '{ logo: string }[]', def: '必填' },
      { prop: 'perspective', desc: '透视距离（px）', type: 'number', def: '600' },
      { prop: 'rotateX / rotateY', desc: '联动倾斜幅度（度）', type: 'number', def: '-1 / -15' },
      { prop: 'textGlowStartColor / textGlowEndColor', desc: '文字光晕色', type: 'string', def: "'#38ef7d80' / '#38ef7d'" },
    ],
  },

  // ========= 批次 5：扩展组件 =========
  {
    importName: 'IuSmoothCursor', name: 'SmoothCursor', zh: '弹性光标',
    category: '交互', desc: '弹簧跟随的自定义光标', slug: 'smooth-cursor', preview: 'scursor',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="flex h-40 items-center justify-center rounded-xl border" style="cursor: none">',
        '    <IuSmoothCursor />',
        '    <span class="text-sm opacity-70">移动鼠标，弹簧光标跟随</span>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuSmoothCursor', [], body)
    },
    apiRows: [
      { prop: 'cursor', desc: '自定义光标组件', type: 'Component', def: '默认圆点' },
      { prop: 'springConfig', desc: '弹簧参数（damping/stiffness/mass/restDelta）', type: 'object', def: '—' },
    ],
    note: '组件会隐藏系统光标，请在演示区域移动鼠标查看效果',
  },
  {
    importName: 'IuWavyBackground', name: 'WavyBackground', zh: '波浪背景',
    category: '背景', desc: '多条渐变波浪线流动', slug: 'wavy-background', preview: 'wavy',
    demoState: { waveWidth: 50, blur: 10, waveOpacity: 0.5 },
    controls: [
      { kind: 'number', key: 'waveWidth', label: '波宽 Wave Width', step: 10 },
      { kind: 'number', key: 'blur', label: '模糊 Blur', step: 2 },
      { kind: 'number', key: 'waveOpacity', label: '透明度 Opacity', step: 0.1 },
    ],
    demoCode: (s) => {
      const consts = [['waveWidth', String(s.waveWidth)], ['blur', String(s.blur)], ['waveOpacity', String(s.waveOpacity)]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuWavyBackground :wave-width="waveWidth" :blur="blur" :wave-opacity="waveOpacity" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuWavyBackground', consts, body)
    },
    apiRows: [
      { prop: 'colors', desc: '波浪渐变五色', type: 'string[]', def: '五种蓝紫渐变' },
      { prop: 'waveWidth', desc: '波浪宽度', type: 'number', def: '50' },
      { prop: 'backgroundFill', desc: '底色', type: 'string', def: "'black'" },
      { prop: 'blur', desc: '模糊半径', type: 'number', def: '10' },
      { prop: 'speed', desc: '速度', type: "'slow' | 'fast'", def: "'fast'" },
      { prop: 'waveOpacity', desc: '波浪透明度（0-1）', type: 'number', def: '0.5' },
    ],
    note: '组件自带黑色底，深浅色模式下观感一致',
  },
  {
    importName: 'IuVortex', name: 'Vortex', zh: '漩涡粒子',
    category: '背景', desc: '向内汇聚的彩色粒子漩涡', slug: 'vortex', preview: 'vortex',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuVortex base-hue="220" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuVortex', [], body)
    },
    apiRows: [
      { prop: 'particleCount', desc: '粒子数量', type: 'number', def: '700' },
      { prop: 'rangeY', desc: '纵向分布范围', type: 'number', def: '100' },
      { prop: 'baseHue', desc: '基础色相', type: 'number', def: '随机' },
      { prop: 'baseSpeed / rangeSpeed', desc: '基础/随机速度', type: 'number', def: '0 / 0' },
      { prop: 'baseRadius / rangeRadius', desc: '基础/随机半径', type: 'number', def: '1 / 2' },
      { prop: 'backgroundColor', desc: '底色', type: 'string', def: "'black'" },
    ],
  },
  {
    importName: 'IuStarsBackground', name: 'StarsBackground', zh: '星空背景',
    category: '背景', desc: '视差跟随的闪烁星空', slug: 'bg-stars', preview: 'bstar',
    demoState: { factor: 0.05, speed: 0.8, starColor: '#FFF' },
    controls: [
      { kind: 'number', key: 'factor', label: '视差系数 Factor', step: 0.01 },
      { kind: 'number', key: 'speed', label: '速度 Speed', step: 0.1 },
      { kind: 'text', key: 'starColor', label: '星星颜色 Star Color' },
    ],
    demoCode: (s) => {
      const consts = [['factor', String(s.factor)], ['speed', String(s.speed)], ['starColor', "'" + s.starColor + "'"]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border bg-black" style="height: 280px">',
        '    <IuStarsBackground :factor="factor" :speed="speed" :star-color="starColor" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuStarsBackground', consts, body)
    },
    apiRows: [
      { prop: 'factor', desc: '鼠标视差系数', type: 'number', def: '0.05' },
      { prop: 'speed', desc: '回弹速度', type: 'number', def: '0.8' },
      { prop: 'starColor', desc: '星星颜色', type: 'string', def: "'#FFF'" },
    ],
  },
  {
    importName: 'IuBlackHoleBackground', name: 'BlackHoleBackground', zh: '黑洞背景',
    category: '背景', desc: '同心圆盘旋转的黑洞', slug: 'bg-black-hole', preview: 'bhola',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border bg-black" style="height: 280px">',
        '    <IuBlackHoleBackground style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuBlackHoleBackground', [], body)
    },
    apiRows: [
      { prop: 'strokeColor', desc: '圆盘描边色', type: 'string', def: "'white'" },
      { prop: 'numberOfLines', desc: '线条组数', type: 'number', def: '—' },
      { prop: 'numberOfDiscs', desc: '圆盘数量', type: 'number', def: '—' },
      { prop: 'particleRGBColor', desc: '粒子颜色（RGB 三元组）', type: '[number, number, number]', def: '—' },
    ],
  },
  {
    importName: 'IuFallingStarsBg', name: 'FallingStarsBg', zh: '坠落流星',
    category: '背景', desc: 'canvas 流星划落动画', slug: 'bg-falling-stars', preview: 'bfall',
    demoState: { color: '#FFF', count: 200 },
    controls: [
      { kind: 'text', key: 'color', label: '流星颜色 Color' },
      { kind: 'number', key: 'count', label: '数量 Count', step: 10 },
    ],
    demoCode: (s) => {
      const consts = [['color', "'" + s.color + "'"], ['count', String(s.count)]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border bg-black" style="height: 280px">',
        '    <IuFallingStarsBg :color="color" :count="count" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuFallingStarsBg', consts, body)
    },
    apiRows: [
      { prop: 'color', desc: '流星颜色', type: 'string', def: "'#FFF'" },
      { prop: 'count', desc: '流星数量', type: 'number', def: '200' },
    ],
  },
  {
    importName: 'IuSilkBackground', name: 'SilkBackground', zh: '丝绸背景',
    category: '背景', desc: '流动丝绸质感渐变', slug: 'bg-silk', preview: 'bsilk',
    demoState: { hue: 300, saturation: 0.5, brightness: 1 },
    controls: [
      { kind: 'number', key: 'hue', label: '色相 Hue', step: 10 },
      { kind: 'number', key: 'saturation', label: '饱和度 Saturation', step: 0.1 },
      { kind: 'number', key: 'brightness', label: '亮度 Brightness', step: 0.1 },
    ],
    demoCode: (s) => {
      const consts = [['hue', String(s.hue)], ['saturation', String(s.saturation)], ['brightness', String(s.brightness)]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuSilkBackground :hue="hue" :saturation="saturation" :brightness="brightness" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuSilkBackground', consts, body)
    },
    apiRows: [
      { prop: 'hue', desc: '色相（0-360）', type: 'number', def: '300' },
      { prop: 'saturation', desc: '饱和度', type: 'number', def: '0.5' },
      { prop: 'brightness', desc: '亮度', type: 'number', def: '1' },
      { prop: 'speed', desc: '流速', type: 'number', def: '—' },
    ],
  },
  {
    importName: 'IuSingularityBackground', name: 'SingularityBackground', zh: '奇点背景',
    category: '背景', desc: '鼠标互动的奇点流场', slug: 'bg-singularity', preview: 'bsing',
    demoState: { hue: 260, saturation: 0.6 },
    controls: [
      { kind: 'number', key: 'hue', label: '色相 Hue', step: 10 },
      { kind: 'number', key: 'saturation', label: '饱和度 Saturation', step: 0.1 },
    ],
    demoCode: (s) => {
      const consts = [['hue', String(s.hue)], ['saturation', String(s.saturation)]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuSingularityBackground :hue="hue" :saturation="saturation" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuSingularityBackground', consts, body)
    },
    apiRows: [
      { prop: 'hue / saturation / brightness', desc: '流场颜色', type: 'number', def: '—' },
      { prop: 'mouseSensitivity', desc: '鼠标敏感度', type: 'number', def: '—' },
      { prop: 'damping', desc: '阻尼', type: 'number', def: '—' },
      { prop: 'noise', desc: '噪点（opacity / scale）', type: '{ opacity: number; scale: number }', def: '—' },
    ],
  },
  {
    importName: 'IuThunderstormBackground', name: 'ThunderstormBackground', zh: '雷暴背景',
    category: '背景', desc: '闪电交加的动态雷雨', slug: 'bg-thunderstorm', preview: 'bthun',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuThunderstormBackground style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuThunderstormBackground', [], body)
    },
    apiRows: [
      { prop: 'hue / saturation / brightness', desc: '云层颜色', type: 'number', def: '—' },
      { prop: 'speed', desc: '雷暴节奏', type: 'number', def: '—' },
      { prop: 'noise', desc: '噪点（opacity / scale）', type: '{ opacity: number; scale: number }', def: '—' },
    ],
  },
  {
    importName: 'IuStractiumBackground', name: 'StractiumBackground', zh: '岩浆背景',
    category: '背景', desc: '熔岩流动质感背景', slug: 'bg-stractium', preview: 'bstrac',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 280px">',
        '    <IuStractiumBackground style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuStractiumBackground', [], body)
    },
    apiRows: [
      { prop: 'hue / saturation / brightness', desc: '岩浆颜色', type: 'number', def: '—' },
      { prop: 'speed', desc: '流速', type: 'number', def: '—' },
      { prop: 'noise', desc: '噪点（opacity / scale）', type: '{ opacity: number; scale: number }', def: '—' },
    ],
  },
  {
    importName: 'IuSnowfallBg', name: 'SnowfallBg', zh: '飘雪背景',
    category: '背景', desc: 'canvas 飘雪动画', slug: 'snowfall-bg', preview: 'snow',
    demoState: { color: '#FFFFFF', quantity: 120, speed: 1 },
    controls: [
      { kind: 'text', key: 'color', label: '雪花颜色 Color' },
      { kind: 'number', key: 'quantity', label: '数量 Quantity', step: 10 },
      { kind: 'number', key: 'speed', label: '速度 Speed', step: 0.5 },
    ],
    demoCode: (s) => {
      const consts = [['color', "'" + s.color + "'"], ['quantity', String(s.quantity)], ['speed', String(s.speed)]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border bg-slate-900" style="height: 280px">',
        '    <IuSnowfallBg :color="color" :quantity="quantity" :speed="speed" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuSnowfallBg', consts, body)
    },
    apiRows: [
      { prop: 'color', desc: '雪花颜色', type: 'string', def: '—' },
      { prop: 'quantity', desc: '雪花数量', type: 'number', def: '—' },
      { prop: 'speed', desc: '下落速度', type: 'number', def: '—' },
      { prop: 'minRadius / maxRadius', desc: '雪花半径范围（px）', type: 'number', def: '—' },
    ],
  },
  {
    importName: 'IuScrewText', name: 'ScrewText', zh: '螺旋文字',
    category: '文本', desc: '字符螺旋翻转入场', slug: 'screw-text', preview: 'screw',
    demoState: { label: 'SCREW', rotateDirection: 'right' },
    controls: [
      { kind: 'text', key: 'label', label: '文本 Label' },
      { kind: 'select', key: 'rotateDirection', label: '旋转方向 Direction', options: [{ label: 'right', value: 'right' }, { label: 'left', value: 'left' }] },
    ],
    demoCode: (s) => {
      const consts = [['label', "'" + s.label + "'"], ['rotateDirection', "'" + s.rotateDirection + "'"]]
      const body = '  <IuScrewText :label="label" :rotate-direction="rotateDirection" style="font-size: 34px; font-weight: 800" />'
      return scriptedCode('IuScrewText', consts, body)
    },
    apiRows: [
      { prop: 'label', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'rotateDirection', desc: '螺旋方向', type: "'right' | 'left'", def: "'right'" },
      { prop: 'staggerDuration', desc: '字符间隔（秒）', type: 'number', def: '0.05' },
      { prop: 'staggerFrom', desc: '交错起点', type: "'first' | 'last' | 'center' | number", def: "'first'" },
    ],
  },
  {
    importName: 'IuVariableText', name: 'VariableText', zh: '可变文字',
    category: '文本', desc: '鼠标周围字重渐变', slug: 'variable-text', preview: 'vtext',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div ref="container">',
        '    <IuVariableText',
        '      label="VARIABLE WEIGHT"',
        '      :container-ref="container"',
        '      from-font-variation-settings="\'wght\' 100, \'slnt\' 0"',
        '      to-font-variation-settings="\'wght\' 900, \'slnt\' 8"',
        '      :radius="120"',
        '      style="font-size: 32px"',
        '    />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuVariableText', [['container', 'useTemplateRef(\'container\')']], body)
    },
    apiRows: [
      { prop: 'label', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'containerRef', desc: '鼠标追踪容器（useTemplateRef）', type: 'MaybeComputedElementRef', def: '必填' },
      { prop: 'fromFontVariationSettings', desc: '起始可变字体设置', type: 'string', def: '必填' },
      { prop: 'toFontVariationSettings', desc: '峰值可变字体设置', type: 'string', def: '必填' },
      { prop: 'radius', desc: '影响半径（px）', type: 'number', def: '—' },
      { prop: 'falloff', desc: '衰减曲线', type: 'Falloff', def: '—' },
    ],
    note: '需要可变字体才能看到字重变化',
  },
  {
    importName: 'IuVariableLetterText', name: 'VariableLetterText', zh: '逐字可变文字',
    category: '文本', desc: '字符字重交错呼吸', slug: 'variable-letter-text', preview: 'vltext',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = '  <IuVariableLetterText label="LETTER WEIGHT" style="font-size: 30px" />'
      return scriptedCode('IuVariableLetterText', [], body)
    },
    apiRows: [
      { prop: 'label', desc: '文本内容', type: 'string', def: '必填' },
      { prop: 'fromFontVariationSettings', desc: '起始设置', type: 'string', def: "'wght' 400" },
      { prop: 'toFontVariationSettings', desc: '峰值设置', type: 'string', def: "'wght' 900" },
      { prop: 'staggerDuration', desc: '交错延迟（秒）', type: 'number', def: '0.03' },
      { prop: 'staggerFrom', desc: '交错起点', type: "'first' | 'last' | 'center' | number", def: "'first'" },
    ],
    note: '需要可变字体才能看到字重变化',
  },
  {
    importName: 'IuScrollSwapText', name: 'ScrollSwapText', zh: '滚动换字',
    category: '文本', desc: '随滚动上下换位的文字', slug: 'scroll-swap-text', preview: 'sswap',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <div ref="container" class="h-40 overflow-auto rounded-xl border">',
        '    <div class="h-80 p-6">',
        '      <IuScrollSwapText :container-ref="container" text="向下滚动" style="font-size: 28px; font-weight: 700" />',
        '    </div>',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuScrollSwapText', [['container', 'useTemplateRef(\'container\')']], body)
    },
    apiRows: [
      { prop: 'containerRef', desc: '滚动容器（useTemplateRef）', type: 'MaybeComputedElementRef', def: '必填' },
      { prop: 'text', desc: '文字（默认取插槽）', type: 'string', def: '—' },
      { prop: 'offset', desc: '滚动触发偏移', type: '[string, string]', def: '—' },
      { prop: 'springConfig', desc: '弹簧参数', type: 'SpringConfig', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '文字内容（text 为空时使用）', type: '—', def: '—' }],
  },
  {
    importName: 'IuScratchToReveal', name: 'ScratchToReveal', zh: '刮刮卡',
    category: '特效', desc: '刮开涂层显示内容', slug: 'scratch-to-reveal', preview: 'scratch',
    demoState: { width: 280, height: 180, minScratchPercentage: 50 },
    controls: [
      { kind: 'number', key: 'width', label: '宽 Width', step: 20 },
      { kind: 'number', key: 'height', label: '高 Height', step: 20 },
      { kind: 'number', key: 'minScratchPercentage', label: '完成阈值（%）', step: 10 },
    ],
    demoCode: (s) => {
      const consts = [['width', String(s.width)], ['height', String(s.height)], ['minScratchPercentage', String(s.minScratchPercentage)]]
      const body = [
        '  <IuScratchToReveal :width="width" :height="height" :min-scratch-percentage="minScratchPercentage" @complete="onComplete">',
        '    <div class="flex size-full items-center justify-center text-lg font-bold">🎉 恭喜中奖</div>',
        '  </IuScratchToReveal>',
      ].join('\n')
      return scriptedCode('IuScratchToReveal', consts, body)
    },
    apiRows: [
      { prop: 'width / height', desc: '刮卡区域尺寸（px）', type: 'number', def: '必填' },
      { prop: 'minScratchPercentage', desc: '判定完成的刮开比例（%）', type: 'number', def: '50' },
      { prop: 'gradientColors', desc: '涂层渐变色', type: '[string, string, string]', def: '粉紫橙' },
    ],
    eventRows: [{ prop: 'complete', desc: '刮开达标时触发', type: '—', def: '—' }],
    slotRows: [{ prop: 'default', desc: '涂层下的内容', type: '—', def: '—' }],
    note: '鼠标按住刮擦涂层，触屏同样支持',
  },
  {
    importName: 'IuMediaText', name: 'MediaText', zh: '图文展开',
    category: '特效', desc: '媒体随文字逐词展开', slug: 'media-text', preview: 'mtext',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuMediaText',
        '    first-text="灵感闪现的瞬间"',
        '    second-text="画面随之展开"',
        '    media-url="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600"',
        '    media-type="image"',
        '  />',
      ].join('\n')
      return scriptedCode('IuMediaText', [], body)
    },
    apiRows: [
      { prop: 'firstText / secondText', desc: '媒体前后的文字', type: 'string', def: '必填' },
      { prop: 'mediaUrl', desc: '媒体地址（图片/视频）', type: 'string', def: '必填' },
      { prop: 'mediaType', desc: '媒体类型', type: "'image' | 'video'", def: '必填' },
      { prop: 'triggerType', desc: '触发方式', type: "'hover' | 'inView'", def: "'hover'" },
      { prop: 'autoPlay / loop / muted', desc: '视频播放参数', type: 'boolean', def: 'true' },
    ],
  },
  {
    importName: 'IuPathMarquee', name: 'PathMarquee', zh: '路径跑马灯',
    category: '特效', desc: '文字沿 SVG 路径循环', slug: 'path-marquee', preview: 'pmarq',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const pathD = "'M 20 60 C 200 -30, 400 150, 680 60'"
      const body = [
        '  <IuPathMarquee',
        '    :path="path"',
        '    text="Inspira UI · 动效组件 · Inspira UI · 动效组件"',
        '    :base-velocity="2"',
        '    :show-path="false"',
        '  />',
      ].join('\n')
      return scriptedCode('IuPathMarquee', [['path', pathD]], body)
    },
    apiRows: [
      { prop: 'path', desc: 'SVG 路径（d 属性）', type: 'string', def: '必填' },
      { prop: 'text', desc: '循环文字（默认取插槽）', type: 'string', def: '—' },
      { prop: 'baseVelocity', desc: '基础速度', type: 'number', def: '—' },
      { prop: 'direction', desc: '方向', type: "'normal' | 'reverse'", def: "'normal'" },
      { prop: 'slowdownOnHover', desc: '悬停减速', type: 'boolean', def: '—' },
      { prop: 'useScrollVelocity', desc: '滚动加减速联动', type: 'boolean', def: '—' },
      { prop: 'showPath', desc: '显示路径参考线', type: 'boolean', def: '—' },
    ],
    slotRows: [{ prop: 'default', desc: '循环内容（text 为空时使用）', type: '—', def: '—' }],
  },
  {
    importName: 'IuVanishingInput', name: 'VanishingInput', zh: '消失输入框',
    category: '交互', desc: '提交时文字像素化飞散', slug: 'vanishing-input', preview: 'vinput',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const phConst = "[\n    '输入点什么…',\n    '按下回车见证消失',\n  ]"
      const body = '  <IuVanishingInput :placeholders="placeholders" @submit="onSubmit" />'
      return scriptedCode('IuVanishingInput', [['placeholders', phConst]], body)
    },
    apiRows: [
      { prop: 'placeholders', desc: '占位文案轮换数组', type: 'string[]', def: '必填' },
    ],
    eventRows: [
      { prop: 'submit', desc: '回车提交（文字粒子消散）', type: '(value: string)', def: '—' },
      { prop: 'change', desc: '输入变化', type: '(value: string)', def: '—' },
    ],
  },
  {
    importName: 'IuSVGMask', name: 'SVGMask', zh: '图像揭幕',
    category: '特效', desc: '光标处的揭幕遮罩', slug: 'svg-mask', preview: 'smask',
    demoState: {},
    controls: [],
    demoCode: (s) => {
      const body = [
        '  <IuSVGMask class="h-80" :size="40" :reveal-size="600">',
        '    <img src="/image.jpg" alt="" class="size-full object-cover" />',
        '  </IuSVGMask>',
      ].join('\n')
      return scriptedCode('IuSVGMask', [], body)
    },
    apiRows: [
      { prop: 'size', desc: '光标遮罩尺寸（px）', type: 'number', def: '10' },
      { prop: 'revealSize', desc: '展开后的遮罩尺寸（px）', type: 'number', def: '600' },
    ],
    slotRows: [{ prop: 'default', desc: '被揭幕的内容', type: '—', def: '—' }],
    note: '组件默认 h-screen，用 class 覆盖高度；悬停扩大遮罩',
  },
  {
    importName: 'IuScales', name: 'Scales', zh: '鳞片纹理',
    category: '背景', desc: '细密的鳞片图案纹理', slug: 'scales', preview: 'scscale',
    demoState: { size: 10, orientation: 'diagonal' },
    controls: [
      { kind: 'number', key: 'size', label: '鳞片尺寸 Size', step: 2 },
      { kind: 'select', key: 'orientation', label: '方向 Orientation', options: [{ label: 'diagonal', value: 'diagonal' }, { label: 'horizontal', value: 'horizontal' }, { label: 'vertical', value: 'vertical' }] },
    ],
    demoCode: (s) => {
      const consts = [['size', String(s.size)], ['orientation', "'" + s.orientation + "'"]]
      const body = [
        '  <div class="relative overflow-hidden rounded-xl border" style="height: 240px">',
        '    <IuScales :size="size" :orientation="orientation" style="position: absolute; inset: 0" />',
        '  </div>',
      ].join('\n')
      return scriptedCode('IuScales', consts, body)
    },
    apiRows: [
      { prop: 'orientation', desc: '鳞片方向', type: "'horizontal' | 'vertical' | 'diagonal'", def: "'diagonal'" },
      { prop: 'size', desc: '鳞片尺寸（px）', type: 'number', def: '10' },
      { prop: 'color', desc: '鳞片颜色', type: 'string', def: '—' },
    ],
  },
  {
    importName: 'IuText3d', name: 'Text3d', zh: '立体文字',
    category: '文本', desc: '描边加阴影的 3D 文字', slug: 'text-3d', preview: 't3d',
    demoState: { textColor: '#FFFFFF', strokeColor: '#000000', shadowColor: '#6366F1', animate: true },
    controls: [
      { kind: 'text', key: 'textColor', label: '文字颜色 Text Color' },
      { kind: 'text', key: 'strokeColor', label: '描边色 Stroke Color' },
      { kind: 'text', key: 'shadowColor', label: '阴影色 Shadow Color' },
      { kind: 'switch', key: 'animate', label: '抖动动画 animate' },
    ],
    demoCode: (s) => {
      const consts = [['textColor', "'" + s.textColor + "'"], ['strokeColor', "'" + s.strokeColor + "'"], ['shadowColor', "'" + s.shadowColor + "'"], ['animate', s.animate ? 'true' : 'false']]
      const body = [
        '  <IuText3d',
        '    :text-color="textColor"',
        '    :stroke-color="strokeColor"',
        '    :shadow-color="shadowColor"',
        '    :animate="animate"',
        '  >',
        '    3D TEXT',
        '  </IuText3d>',
      ].join('\n')
      return scriptedCode('IuText3d', consts, body)
    },
    apiRows: [
      { prop: 'textColor', desc: '文字颜色', type: 'string', def: "'white'" },
      { prop: 'strokeColor / shadowColor', desc: '描边/阴影颜色', type: 'string', def: "'black' / 'yellow'" },
      { prop: 'strokeSize', desc: '描边粗细', type: 'number', def: '20' },
      { prop: 'shadow1Size / shadow2Size', desc: '两层阴影尺寸', type: 'number', def: '7 / 10' },
      { prop: 'animate', desc: '抖动动画', type: 'boolean', def: 'true' },
      { prop: 'animationDuration', desc: '动画时长（毫秒）', type: 'number', def: '1500' },
    ],
    slotRows: [{ prop: 'default', desc: '文字内容', type: '—', def: '—' }],
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
