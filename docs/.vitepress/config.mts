import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'inspira-ui-components',
  description:
    'Inspira UI 风格的 Vue 3 动效组件库 —— Element Plus 式 npm 包，自带编译后 CSS，零 Tailwind 依赖',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  search: {
    provider: 'local',
    options: {
      translations: {
        button: { buttonText: '搜索组件…', buttonAriaLabel: '搜索' },
        modal: { noResultsText: '没有找到结果' },
      },
    },
  },
  vite: {},
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/dialog', activeMatch: '/components/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速上手', link: '/guide/quick-start' },
            { text: '主题定制', link: '/guide/theming' },
          ],
        },
      ],
      '/components/': [
        {
          text: '按钮 Buttons',
          collapsed: false,
          items: [
            { text: 'InteractiveHoverButton 悬停按钮', link: '/components/interactive-hover-button' },
            { text: 'RainbowButton 彩虹按钮', link: '/components/rainbow-button' },
            { text: 'RippleButton 涟漪按钮', link: '/components/ripple-button' },
            { text: 'GradientButton 流光按钮', link: '/components/gradient-button' },
            { text: 'ShimmerButton 微光按钮', link: '/components/shimmer-button' },
          ],
        },
        {
          text: '卡片 Cards',
          collapsed: false,
          items: [
            { text: 'Card3D 3D 透视卡片', link: '/components/card-3d' },
            { text: 'CardSpotlight 聚光灯卡片', link: '/components/card-spotlight' },
            { text: 'FlipCard 翻转卡片', link: '/components/flip-card' },
            { text: 'GlareCard 眩光卡片', link: '/components/glare-card' },
          ],
        },
        {
          text: '文本动画 Text',
          collapsed: false,
          items: [
            { text: 'NumberTicker 数字滚动', link: '/components/number-ticker' },
            { text: 'TypewriterText 打字机', link: '/components/typewriter-text' },
            { text: 'FlipWords 词语轮播', link: '/components/flip-words' },
            { text: 'TextGenerateEffect 文本生成', link: '/components/text-generate-effect' },
            { text: 'BlurReveal 模糊揭示', link: '/components/blur-reveal' },
          ],
        },
        {
          text: '交互 Misc',
          collapsed: false,
          items: [
            { text: 'Dialog 弹窗（推荐）', link: '/components/dialog' },
            { text: 'AnimatedModal 五件套', link: '/components/animated-modal' },
            { text: 'AnimatedTooltip 悬浮名片', link: '/components/animated-tooltip' },
            { text: 'Marquee 跑马灯', link: '/components/marquee' },
            { text: 'BentoGrid Bento 网格', link: '/components/bento-grid' },
          ],
        },
        {
          text: '数据展示 Data',
          collapsed: false,
          items: [
            { text: 'Statistic 指标卡', link: '/components/statistic' },
            { text: 'NumberTicker 数字滚动', link: '/components/number-ticker' },
          ],
        },
        {
          text: '背景 Backgrounds',
          collapsed: false,
          items: [
            { text: 'AuroraBackground 极光背景', link: '/components/aurora-background' },
            { text: 'PatternBackground 图案背景', link: '/components/pattern-background' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/rahulv-official/inspira-ui' }],
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
  },
})
