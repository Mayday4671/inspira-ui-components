<script setup lang="ts">
const stats = [
  { value: '22', label: '通用组件' },
  { value: '40+', label: '可运行用例' },
  { value: '19', label: '--iu-* 主题变量' },
  { value: '0', label: 'Tailwind 依赖' },
]

const components = [
  { icon: '⌁', name: 'IuDialog', badge: '推荐', link: '/components/dialog', desc: '传一个 confirm 函数，loading 与关闭时机全自动。' },
  { icon: '▤', name: 'IuStatistic', badge: '推荐', link: '/components/statistic', desc: '数字滚动 + 前后缀 + 涨跌幅徽标，一行配置。' },
  { icon: '✦', name: 'IuCard3D', badge: '', link: '/components/card-3d', desc: '一行代码出 3D 透视卡片；三件套保留逐元素控制。' },
  { icon: '◈', name: 'IuShimmerButton', badge: '', link: '/components/shimmer-button', desc: '微光环绕 CTA 按钮，variant 双主题、统一 size/loading。' },
  { icon: '◉', name: 'IuGradientButton', badge: '', link: '/components/gradient-button', desc: '4 种流光配色预设，文字颜色按背景自动适配。' },
  { icon: '★', name: 'IuRainbowButton', badge: '', link: '/components/rainbow-button', desc: '彩虹渐变沿边框持续流动。' },
  { icon: '⌁', name: 'IuRippleButton', badge: '', link: '/components/ripple-button', desc: 'Material 涟漪扩散，颜色缺省跟随主题主色。' },
  { icon: '→', name: 'IuInteractiveHoverButton', badge: '', link: '/components/interactive-hover-button', desc: '文字滑出、箭头滑入的悬停按钮。' },
  { icon: '▩', name: 'IuCardSpotlight', badge: '', link: '/components/card-spotlight', desc: '聚光灯跟随光斑卡片，title/description 快捷模式。' },
  { icon: '⇄', name: 'IuFlipCard', badge: '', link: '/components/flip-card', desc: '双面翻转卡片，backTitle/backDescription 直出。' },
  { icon: '◪', name: 'IuGlareCard', badge: '', link: '/components/glare-card', desc: '全息箔纸眩光卡片，image/width/radius 可调。' },
  { icon: '#', name: 'IuNumberTicker', badge: '', link: '/components/number-ticker', desc: '数字滚动，prefix/suffix 前后缀。' },
  { icon: '|', name: 'IuTypewriterText', badge: '', link: '/components/typewriter-text', desc: '打字机效果，多段轮播与自定义光标。' },
  { icon: '↻', name: 'IuFlipWords', badge: '', link: '/components/flip-words', desc: '词语模糊展开/聚合轮播。' },
  { icon: '☁', name: 'IuTextGenerateEffect', badge: '', link: '/components/text-generate-effect', desc: '逐词从模糊到清晰生成。' },
  { icon: '◐', name: 'IuBlurReveal', badge: '', link: '/components/blur-reveal', desc: '子元素错落模糊揭示容器。' },
  { icon: '⧉', name: 'IuAnimatedModal', badge: '底层', link: '/components/animated-modal', desc: '五件套组合，完全自定义弹窗结构。' },
  { icon: '☻', name: 'IuAnimatedTooltip', badge: '', link: '/components/animated-tooltip', desc: '头像堆叠 + 跟随倾斜的成员名片。' },
  { icon: '»', name: 'IuMarquee', badge: '', link: '/components/marquee', desc: '无缝循环滚动，speed/gap 直接传参。' },
  { icon: '▦', name: 'IuBentoGrid', badge: '', link: '/components/bento-grid', desc: '苹果发布会风格 Bento 网格三件套。' },
  { icon: '≈', name: 'IuAuroraBackground', badge: '', link: '/components/aurora-background', desc: '流动极光背景，height/rounded 局部可用。' },
  { icon: '⌗', name: 'IuPatternBackground', badge: '', link: '/components/pattern-background', desc: '网格/圆点图案，八方向滚动 + 遮罩。' },
]

const principles = [
  {
    no: '01',
    title: '配置解决八成，插槽兜底两成',
    desc: 'props 覆盖常规场景；剩下的个性化需求一律用同名插槽接管，不往配置里堆开关。',
  },
  {
    no: '02',
    title: '默认值替代样板代码',
    desc: '按钮文字颜色按背景亮度自适应、弹窗 loading 与关闭时机自动管、前景层级自动垫高——这些每次都要写的东西收进组件里。',
  },
  {
    no: '03',
    title: '自包含优先于环境假设',
    desc: '产物 CSS 由 Tailwind v4 预编译，使用方零 Tailwind 依赖、无 preflight 污染、不泄漏全局变量，拷进任何 Vue 3 项目即用。',
  },
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <p class="hero-eyebrow">VUE 3 · TYPESCRIPT · NPM READY</p>
      <h1 class="hero-title">
        一套 <em>开箱即用</em> 的<br />动效组件库
      </h1>
      <p class="hero-desc">
        Inspira UI 的视觉，Element Plus 的用法。按钮统一 size/loading 体系，弹窗传一个函数即用；
        自带编译后 CSS，npm 安装后 import 即跑。
      </p>
      <div class="hero-actions">
        <a class="hero-btn hero-btn-main" href="/guide/quick-start">快速上手 →</a>
        <a class="hero-btn" href="/components/dialog">看组件</a>
      </div>

      <div class="hero-stats">
        <div v-for="s in stats" :key="s.label" class="stat-card">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- 组件总览 -->
    <section class="section">
      <h2 class="section-title">组件总览</h2>
      <div class="comp-grid">
        <a v-for="c in components" :key="c.name" class="comp-card" :href="c.link">
          <span class="comp-icon">{{ c.icon }}</span>
          <span class="comp-name">
            {{ c.name }}
            <em v-if="c.badge" class="comp-badge">{{ c.badge }}</em>
          </span>
          <span class="comp-desc">{{ c.desc }}</span>
        </a>
      </div>
    </section>

    <!-- 设计取舍 -->
    <section class="section">
      <h2 class="section-title">三条设计取舍</h2>
      <div class="principle-grid">
        <article v-for="p in principles" :key="p.no" class="principle">
          <span class="principle-no">{{ p.no }}</span>
          <h3 class="principle-title">{{ p.title }}</h3>
          <p class="principle-desc">{{ p.desc }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* ---------- Hero ---------- */
.hero {
  padding: 72px 0 8px;
  text-align: center;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--vp-c-brand-1);
  margin: 0 0 18px;
}

.hero-title {
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 20px;
}

.hero-title em {
  font-style: normal;
  background: linear-gradient(92deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-desc {
  max-width: 620px;
  margin: 0 auto 32px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 48px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 600;
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  transition: all 0.18s;
}

.hero-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.hero-btn-main {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.hero-btn-main:hover {
  opacity: 0.88;
  color: #fff;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.stat-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 20px 12px;
  background: var(--vp-c-bg-soft);
}

.stat-value {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.stat-label {
  margin-top: 4px;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

/* ---------- 组件总览 ---------- */
.section {
  margin-top: 72px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}

.comp-card {
  display: grid;
  grid-template-columns: 38px 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  padding: 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.18s;
}

.comp-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.06);
}

.comp-icon {
  grid-row: 1 / 3;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 17px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, transparent);
  color: var(--vp-c-brand-1);
}

.comp-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.comp-badge {
  font-style: normal;
  font-size: 10.5px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  color: var(--vp-c-brand-1);
}

.comp-desc {
  margin-top: 4px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

/* ---------- 设计取舍 ---------- */
.principle-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.principle {
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 22px;
}

.principle-no {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.1em;
}

.principle-title {
  margin: 10px 0 8px;
  font-size: 15.5px;
  font-weight: 700;
}

.principle-desc {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

@media (max-width: 900px) {
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .principle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
