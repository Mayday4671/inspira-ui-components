<script setup lang="ts">
/**
 * 组件详情页「实时演示」舞台。
 * 按 slug 渲染真实组件，并把可调参数（demoState）双向绑定到组件 props。
 */
import { computed, ref } from 'vue'
import {
  IuAnimatedBeam,
  IuAnimatedCircularProgressBar,
  IuAnimatedModal,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalTrigger,
  IuAnimatedTabs,
  IuAnimatedTestimonials,
  IuAnimatedTooltip,
  IuAnimateGrid,
  IuAppleCardCarousel,
  IuAppleCarouselItem,
  IuAuroraBackground,
  IuBalanceSlider,
  IuBendingGallery,
  IuBentoGrid,
  IuBlackHoleBackground,
  IuBook,
  IuBorderBeam,
  IuBoxReveal,
  IuBreathingText,
  IuBubblesBg,
  IuCard3D,
  IuCardSpotlight,
  IuCardStack,
  IuCardStackItem,
  IuCarousel3D,
  IuCircularGallery,
  IuColorPicker,
  IuColourfulText,
  IuCompare,
  IuConfetti,
  IuConfettiButton,
  IuContainerScroll,
  IuContainerTextFlip,
  IuCosmicPortal,
  IuCubeCarousel,
  IuDesignTestimonials,
  IuDialog,
  IuDirectionAwareHover,
  IuDitherShader,
  IuDock,
  IuDockIcon,
  IuDockSeparator,
  IuEncryptedText,
  IuExpandableGallery,
  IuFallingStarsBg,
  IuFeyCards,
  IuFileUpload,
  IuFlickeringGrid,
  IuFlipCard,
  IuFlipWords,
  IuFloat,
  IuFloatingCard,
  IuFluidCursor,
  IuFocus,
  IuGithubGlobe,
  IuGlareCard,
  IuGlobe,
  IuGlowBorder,
  IuGlowingEffect,
  IuGradientButton,
  IuHaloSearch,
  IuHighlightText,
  IuHtmlAscii,
  IuHtmlBlaze,
  IuHtmlChromatic,
  IuHtmlCloth,
  IuHtmlDrag,
  IuHtmlInCanvas,
  IuHtmlLiquid,
  IuHyperText,
  IuIconCloud,
  IuIconLogoCloud,
  IuIInput,
  IuImagesBadge,
  IuImagesSlider,
  IuImageTrailCursor,
  IuInfiniteGrid,
  IuInteractiveGridPattern,
  IuInteractiveHoverButton,
  IuIPhone15ProMockup,
  IuLampEffect,
  IuLens,
  IuLetterPullup,
  IuLetterSwap,
  IuLightSpeed,
  IuLineShadowText,
  IuLinkPreview,
  IuLiquidBackground,
  IuLiquidGlass,
  IuLiquidLogo,
  IuLogoOrigami,
  IuLogoOrigamiItem,
  IuMarquee,
  IuMediaText,
  IuMeteors,
  IuMorphingTabs,
  IuMorphingText,
  IuMultiStepLoader,
  IuNeonBorder,
  IuNeuralBg,
  IuNumberTicker,
  IuOrbit,
  IuParallaxFloat,
  IuParallaxFloatElement,
  IuParticleImage,
  IuParticlesBg,
  IuParticleWhirlpoolBg,
  IuPathMarquee,
  IuPatternBackground,
  IuPhotoGallery,
  IuProgressiveBlur,
  IuRadiantText,
  IuRainbowButton,
  IuRibbonBackground,
  IuRipple,
  IuRippleButton,
  IuSafariMockup,
  IuScales,
  IuScratchToReveal,
  IuScrewText,
  IuScrollIsland,
  IuScrollSwapText,
  IuShaderToy,
  IuShimmerButton,
  IuSilkBackground,
  IuSingularityBackground,
  IuSleekLineCursor,
  IuSmoothCursor,
  IuSnowfallBg,
  IuSparkles,
  IuSparklesText,
  IuSpinningText,
  IuSpline,
  IuSpringCalendar,
  IuStarsBackground,
  IuStaticLogoCloud,
  IuStatistic,
  IuStractiumBackground,
  IuSVGMask,
  IuTailedCursor,
  IuTestimonialSlider,
  IuTetris,
  IuText3d,
  IuTextGenerateEffect,
  IuTextGlitch,
  IuTextHighlight,
  IuTextHoverEffect,
  IuTextReveal,
  IuTextRevealCard,
  IuTextScrollReveal,
  IuThunderstormBackground,
  IuTimeline,
  IuTracingBeam,
  IuTree,
  IuTypewriterText,
  IuUnderlineText,
  IuVanishingInput,
  IuVariableLetterText,
  IuVariableText,
  IuVideoText,
  IuVortex,
  IuWarpBackground,
  IuWavyBackground,
  IuWorldMap,
} from 'inspira-ui-components'
import type { ComponentMeta } from '../data/registry'

const props = defineProps<{
  meta: ComponentMeta
  state: Record<string, any>
  resetKey: number
}>()

const dialogOpen = ref(false)

const s = computed(() => props.state)

const btnText = computed(() => String(s.value.text ?? '开始探索'))

function avatar(name: string, color: string) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='112' height='112'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='54%' dy='.35em' text-anchor='middle' font-family='system-ui' font-size='42' fill='#fff'>${initials}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const tooltipItems = [
  { id: 1, name: '张伟', designation: '前端工程师', image: avatar('Zhang Wei', '#6366f1') },
  { id: 2, name: '李娜', designation: 'UI 设计师', image: avatar('Li Na', '#ec4899') },
]

const marqueeItems = ['Vue 3', 'TypeScript', 'Motion', 'Inspira UI']

const bentoItems = [
  { key: 'a', name: '统一 API', description: '统一 Props、Events 与插槽体验。' },
  { key: 'b', name: '按需引入', description: '具名导入，tree-shaking 友好。' },
  { key: 'c', name: '类型完备', description: 'Vue 3 + TypeScript 全量类型。' },
]

const wordsList = computed(() =>
  String(s.value.words ?? '流畅,轻盈,优雅')
    .split(',')
    .map((w) => w.trim())
    .filter(Boolean),
)

const flipList = computed(() => wordsList.value.length ? wordsList.value : ['流畅'])

const ctfWords = computed(() =>
  String(s.value.words ?? '更好,现代,漂亮,出色')
    .split(',')
    .map((w) => w.trim())
    .filter(Boolean),
)

const inputValue = ref('')

const mslLoading = ref(false)
const mslSteps = [
  { text: '连接数据库', afterText: '数据库已连接' },
  { text: '初始化模型', afterText: '模型就绪' },
  { text: '启动服务', afterText: '服务运行中' },
]

const atabsActive = ref('home')
const atabsTabs = [
  { title: '首页', value: 'home' },
  { title: '组件', value: 'components' },
  { title: '主题', value: 'themes' },
]

const treeElements = [
  { id: '1', name: 'src', children: [
    { id: '2', name: 'components', children: [{ id: '3', name: 'button.ts', isSelectable: true }] },
    { id: '4', name: 'index.ts', isSelectable: true },
  ] },
  { id: '5', name: 'package.json', isSelectable: true },
]

const sliderImages = [
  'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=800',
  'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=800',
]

const gridCards = [
  { logo: 'https://picsum.photos/seed/g1/200' },
  { logo: 'https://picsum.photos/seed/g2/200' },
  { logo: 'https://picsum.photos/seed/g3/200' },
  { logo: 'https://picsum.photos/seed/g4/200' },
]

const badgeImages = [
  'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300',
  'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=300',
]

const testimonialData = [
  { quote: '这套组件库让我们的动效页面交付速度快了三倍。', name: '张伟', designation: '前端负责人', image: avatar('Zhang Wei', '#6366f1') },
  { quote: '类型完备，暗色模式开箱即用。', name: '李娜', designation: 'UI 设计师', image: avatar('Li Na', '#ec4899') },
]

const beamContainer = ref<HTMLElement | null>(null)
const beamFrom = ref<HTMLElement | null>(null)
const beamTo = ref<HTMLElement | null>(null)
const vtextContainer = ref<HTMLElement | null>(null)
const sswapContainer = ref<HTMLElement | null>(null)

const timelineItems = [
  { id: 'start', label: '2024' },
  { id: 'growth', label: '2025' },
  { id: 'now', label: '2026' },
]
</script>

<template>
  <!-- ============ 按钮 ×5（真实受控） ============ -->
  <IuShimmerButton
    v-if="meta.slug === 'shimmer-button'"
    :size="s.size"
    :loading="s.loading"
    :disabled="s.disabled"
  >{{ s.loading && btnText ? btnText : btnText }}</IuShimmerButton>

  <IuInteractiveHoverButton
    v-else-if="meta.slug === 'interactive-hover-button'"
    :text="btnText"
    :size="s.size"
    :loading="s.loading"
    :disabled="s.disabled"
  />

  <IuRainbowButton
    v-else-if="meta.slug === 'rainbow-button'"
    :size="s.size"
    :loading="s.loading"
    :disabled="s.disabled"
    :speed="Number(s.speed) || 2"
  >{{ btnText }}</IuRainbowButton>

  <IuGradientButton
    v-else-if="meta.slug === 'gradient-button'"
    :size="s.size"
    :loading="s.loading"
    :disabled="s.disabled"
    :variant="s.variant"
  >{{ btnText }}</IuGradientButton>

  <IuRippleButton
    v-else-if="meta.slug === 'ripple-button'"
    :size="s.size"
    :loading="s.loading"
    :disabled="s.disabled"
  >{{ btnText }}</IuRippleButton>

  <!-- ============ 卡片 ×5 ============ -->
  <div v-else-if="meta.slug === 'card-3d'" class="demo-fit" style="height: 300px">
    <div class="preview-scale" style="transform: scale(0.72)">
      <IuCard3D
        :title="String(s.title)"
        description="悬停整卡跟随鼠标旋转，标题与背景沿 Z 轴分层浮起。"
        :cta="String(s.cta)"
      />
    </div>
  </div>

  <div v-else-if="meta.slug === 'card-spotlight'" class="demo-fit" style="height: 240px; width: 100%; max-width: 560px">
    <!-- 插槽模式：内容均匀分布填满卡片，展示插槽自定义能力 -->
    <IuCardSpotlight
      :gradient-size="Number(s.gradientSize) || 240"
      style="position: absolute; inset: 0"
    >
      <div class="spot-fill">
        <div>
          <h4>{{ String(s.title) }}</h4>
          <p>鼠标在卡片上移动，会有一道聚光灯跟随光斑。</p>
        </div>
        <span class="spot-cta">查看详情</span>
      </div>
    </IuCardSpotlight>
  </div>

  <div v-else-if="meta.slug === 'flip-card'" class="demo-fit" style="height: 320px">
    <div class="preview-scale" style="transform: scale(0.95)">
      <IuFlipCard
        :rotate="s.rotate as 'x' | 'y'"
        :back-title="String(s.backTitle)"
        back-description="鼠标移开自动翻回正面。"
      />
    </div>
  </div>

  <div v-else-if="meta.slug === 'glare-card'" class="demo-fit" style="height: 380px">
    <div class="preview-scale" style="transform: scale(0.62)">
      <IuGlareCard
        :title="String(s.title)"
        description="移动鼠标感受全息箔纸眩光"
        cta="探索"
        :width="Number(s.width) || 320"
        :radius="Number(s.radius) || 48"
      />
    </div>
  </div>

  <div v-else-if="meta.slug === 'bento-grid'" class="demo-fit" style="height: 320px; width: 100%">
    <div class="preview-scale" style="transform: scale(0.62)">
      <IuBentoGrid :items="bentoItems" style="width: 760px" />
    </div>
  </div>

  <!-- ============ 文本 ×5 ============ -->
  <span
    v-else-if="meta.slug === 'number-ticker'"
    style="font-weight: 850; font-size: 44px; letter-spacing: -2px; display: inline-block"
  >
    <IuNumberTicker
      :value="Number(s.value) || 0"
      :decimal-places="Number(s.decimalPlaces) || 0"
      :prefix="String(s.prefix ?? '')"
      :suffix="String(s.suffix ?? '')"
      :duration="1200"
    />
  </span>

  <span
    v-else-if="meta.slug === 'typewriter-text'"
    style="font-family: monospace; font-size: 18px; font-weight: 800; letter-spacing: 1px; display: inline-block"
  >
    <IuTypewriterText :text="String(s.text)" :speed="Number(s.speed) || 70" :loop="true" />
  </span>

  <span
    v-else-if="meta.slug === 'flip-words'"
    style="font-size: 19px; font-weight: 800; color: var(--primary); display: inline-block; min-width: 220px; text-align: center"
  >
    <IuFlipWords :words="flipList" :duration="Number(s.duration) || 2600" />
  </span>

  <span
    v-else-if="meta.slug === 'text-generate-effect'"
    style="font-size: 17px; font-weight: 750; letter-spacing: 3px; display: inline-block"
  >
    <IuTextGenerateEffect :words="String(s.words)" :duration="0.55" :delay="300" />
  </span>

  <span
    v-else-if="meta.slug === 'blur-reveal'"
    style="font-size: 17px; font-weight: 750; color: var(--primary); display: inline-block; text-align: center"
  >
    <IuBlurReveal :duration="0.9" :delay="0.4" :key="resetKey">
      <span style="display: block">渐入你的视野</span>
      <span style="display: block; font-size: 13px; color: var(--muted)">由模糊到清晰</span>
    </IuBlurReveal>
  </span>

  <!-- ============ 交互 ×5 ============ -->
  <button v-else-if="meta.slug === 'dialog'" class="btn" type="button" @click="dialogOpen = true">
    打开弹窗
  </button>

  <IuAnimatedModal v-else-if="meta.slug === 'animated-modal'">
    <IuAnimatedModalTrigger class="btn">打开弹窗</IuAnimatedModalTrigger>
    <IuAnimatedModalBody :width="'420px'">
      <IuAnimatedModalContent>
        <h4 style="margin: 0; font-size: 18px; font-weight: 750">五件套弹窗</h4>
        <p style="margin: 12px 0 0; font-size: 13px; color: var(--muted)">
          这是真实渲染的 IuAnimatedModal：入场缩放 + 3D 旋转、背景模糊、滚动锁定与焦点管理。
        </p>
      </IuAnimatedModalContent>
    </IuAnimatedModalBody>
  </IuAnimatedModal>

  <IuAnimatedTooltip v-else-if="meta.slug === 'animated-tooltip'" :items="tooltipItems" />

  <div
    v-else-if="meta.slug === 'marquee'"
    class="demo-fit marquee-stage"
    style="height: 110px; width: 100%"
  >
    <IuMarquee
      :items="marqueeItems"
      :speed="Number(s.speed) || 20"
      :reverse="Boolean(s.reverse)"
      :pause-on-hover="Boolean(s.pauseOnHover)"
      gap="1rem"
      style="width: 100%"
    />
  </div>

  <!-- ============ 数据 ×1 ============ -->
  <div v-else-if="meta.slug === 'statistic'" class="demo-fit" style="height: 150px; width: 100%; max-width: 520px; border: 1px solid var(--border); border-radius: 12px; padding: 18px; align-items: flex-start">
    <IuStatistic
      :label="String(s.label)"
      :value="Number(s.value) || 0"
      :suffix="String(s.suffix ?? '')"
      :trend="s.trend === '' || s.trend === undefined ? undefined : Number(s.trend)"
      trend-label="较上月"
    />
  </div>

  <!-- ============ 背景 ×2 ============ -->
  <div
    v-else-if="meta.slug === 'aurora-background'"
    class="demo-fit"
    :style="{ height: String(s.height || '240px'), width: '100%', maxWidth: '640px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)' }"
  >
    <IuAuroraBackground :height="String(s.height || '240px')" rounded="0" style="position: absolute; inset: 0">
      <span style="font-size: 16px; font-weight: 750">流动的极光渐变（亮 / 暗色下表现不同）</span>
    </IuAuroraBackground>
  </div>

  <div
    v-else-if="meta.slug === 'pattern-background'"
    class="demo-fit"
    style="height: 240px; width: 100%; max-width: 640px; border-radius: 14px; overflow: hidden; border: 1px solid var(--border)"
  >
    <IuPatternBackground
      :variant="(s.variant as 'grid' | 'dot' | 'big-dot')"
      :animate="Boolean(s.animate)"
      direction="top"
      :speed="(12000 as any)"
      style="position: absolute; inset: 0"
    >
      <span style="font-size: 15px; font-weight: 750">网格 / 圆点图案背景</span>
    </IuPatternBackground>
  </div>

  <!-- ============ 批次 2：文本动画扩展 ============ -->
  <IuLetterPullup
    v-else-if="meta.slug === 'letter-pullup'"
    :words="String(s.words)"
    :delay="Number(s.delay) || 0.05"
    style="font-size: 28px"
  />

  <IuSpinningText
    v-else-if="meta.slug === 'spinning-text'"
    :text="String(s.text)"
    :duration="Number(s.duration) || 10"
    :radius="Number(s.radius) || 5"
    style="width: 200px; height: 200px; font-size: 14px"
  />

  <div v-else-if="meta.slug === 'box-reveal'" class="demo-fit" style="height: 160px; width: 100%; max-width: 520px">
    <IuBoxReveal :color="String(s.color)" :duration="Number(s.duration) || 0.5" :delay="Number(s.delay) || 0.25">
      <h4 style="margin: 0; font-size: 20px; font-weight: 700">Box Reveal</h4>
      <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.7">色块滑出后揭示内容。</p>
    </IuBoxReveal>
  </div>

  <span v-else-if="meta.slug === 'line-shadow-text'" style="font-size: 22px; font-weight: 700">
    <IuLineShadowText :shadow-color="String(s.shadowColor)">Hover Text</IuLineShadowText>
  </span>

  <span v-else-if="meta.slug === 'hyper-text'" style="font-family: monospace; font-size: 16px; font-weight: 700; display: inline-block">
    <IuHyperText :text="String(s.text)" :duration="Number(s.duration) || 800" :animate-on-load="true" />
  </span>

  <span v-else-if="meta.slug === 'encrypted-text'" style="font-size: 16px; font-weight: 600; display: inline-block">
    <IuEncryptedText :text="String(s.text)" />
  </span>

  <div v-else-if="meta.slug === 'morphing-text'" class="demo-fit" style="height: 120px; width: 100%; max-width: 520px; position: relative; overflow: hidden">
    <IuMorphingText :texts="['软件工程师', '设计师', '创造者']" style="font-size: 24px; font-weight: 700; text-align: center; width: 100%" />
  </div>

  <span v-else-if="meta.slug === 'focus'" style="font-size: 18px; font-weight: 650; display: inline-block">
    <IuFocus :sentence="String(s.sentence)" :manual-mode="true" />
  </span>

  <span v-else-if="meta.slug === 'colourful-text'" style="font-size: 20px; font-weight: 700; display: inline-block">
    <IuColourfulText :text="String(s.text)" />
  </span>

  <span v-else-if="meta.slug === 'letter-swap'" style="font-size: 16px; font-weight: 700; display: inline-block">
    <IuLetterSwap :label="String(s.label)" />
  </span>

  <span v-else-if="meta.slug === 'text-highlight'" style="font-size: 16px; display: inline-block">
    <IuTextHighlight>高亮的文字内容</IuTextHighlight>
  </span>

  <span v-else-if="meta.slug === 'underline-text'" style="font-size: 16px; display: inline-block">
    <IuUnderlineText>下划线动画文字</IuUnderlineText>
  </span>

  <!-- ============ 批次 2：特效扩展 ============ -->
  <div v-else-if="meta.slug === 'border-beam'" class="demo-fit" style="height: 200px; width: 100%; max-width: 560px; border: 1px solid var(--border); border-radius: 12px; padding: 24px; position: relative; overflow: hidden">
    <IuBorderBeam
      :color-from="String(s.colorFrom)"
      :color-to="String(s.colorTo)"
      :duration="Number(s.duration) || 6000"
    />
    <p style="margin: 0; font-size: 14px; opacity: 0.7">Border Beam 内容</p>
  </div>

  <div v-else-if="meta.slug === 'meteors'" class="demo-fit" style="height: 160px; width: 100%; max-width: 560px; border: 1px solid var(--border); position: relative; overflow: hidden">
    <span class="absolute inset-0">
      <IuMeteors />
    </span>
    <p style="padding: 24px; font-size: 14px; position: relative; z-index: 1">Meteor Shower</p>
  </div>

  <div v-else-if="meta.slug === 'flickering-grid'" class="demo-fit" style="height: 240px; width: 100%; max-width: 640px; position: relative; overflow: hidden; border: 1px solid var(--border); border-radius: 12px">
    <IuFlickeringGrid
      class="absolute inset-0 z-0 [mask-image:radial-gradient(320px_circle_at_center,white,transparent)]"
      :square-size="4"
      :grid-gap="4"
      color="#60a5fa"
      :max-opacity="0.6"
      :flicker-chance="0.1"
    />
    <p style="position: relative; z-index: 1; font-size: 14px; font-weight: 700">Flickering Grid</p>
  </div>

  <!-- ============ 批次 2：场景扩展 ============ -->
  <div v-else-if="meta.slug === 'compare'" class="demo-fit" style="height: 300px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuCompare
      first-image="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=800"
      second-image="https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=800"
      first-image-alt="Before"
      second-image-alt="After"
      :slide-mode="'drag'"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'lens'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuLens :zoom-factor="Number(s.zoomFactor) || 1.5" :lens-size="Number(s.lensSize) || 170" :is-static="true" style="width: 100%">
      <img
        src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600"
        alt="Lens demo"
        class="w-full"
        style="object-fit: cover; height: 300px"
      />
    </IuLens>
  </div>

  <div v-else-if="meta.slug === 'animated-list'" class="demo-fit" style="height: auto; width: 100%; max-width: 520px; padding: 16px 0">
    <IuAnimatedList :delay="800">
      <div style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; margin: 8px 0; font-size: 14px">第一条内容</div>
      <div style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; margin: 8px 0; font-size: 14px">第二条内容</div>
      <div style="padding: 12px 16px; border: 1px solid var(--border); border-radius: 8px; margin: 8px 0; font-size: 14px">第三条内容</div>
    </IuAnimatedList>
  </div>

  <!-- ============ 批次 3：扩展组件 ============ -->
  <div v-else-if="meta.slug === 'float'" class="demo-fit" style="height: 220px; perspective: 900px">
    <IuFloat>
      <div style="padding: 24px 32px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); font-size: 14px; font-weight: 600">漂浮的内容</div>
    </IuFloat>
  </div>

  <div v-else-if="meta.slug === 'sparkles'" class="demo-fit" style="height: 240px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden">
    <IuSparkles
      :particle-color="String(s.particleColor)"
      :min-size="Number(s.minSize) || 1"
      :max-size="Number(s.maxSize) || 2"
      :particle-density="120"
      style="position: absolute; inset: 0"
    />
  </div>

  <span v-else-if="meta.slug === 'sparkles-text'" style="font-size: 28px; font-weight: 700">
    <IuSparklesText :text="String(s.text)" :sparkles-count="Number(s.sparklesCount) || 10" />
  </span>

  <span v-else-if="meta.slug === 'text-glitch'" style="font-size: 32px; font-weight: 800; display: inline-block">
    <IuTextGlitch :text="String(s.text)" :speed="Number(s.speed) || 0.5" :enable-shadows="Boolean(s.enableShadows)" :enable-on-hover="Boolean(s.enableOnHover)" />
  </span>

  <div v-else-if="meta.slug === 'text-hover-effect'" class="demo-fit" style="height: 160px; width: 100%; max-width: 560px">
    <IuTextHoverEffect :text="String(s.text)" :stroke-width="Number(s.strokeWidth) || 0.75" />
  </div>

  <div v-else-if="meta.slug === 'text-reveal'" class="demo-fit" style="height: 140px; width: 100%; max-width: 560px">
    <IuTextReveal :duration="0.6" :delay="0.2" :stagger="0.1" :key="resetKey">
      <h3 style="margin: 0; font-size: 26px; font-weight: 700">文字逐词揭示入场</h3>
    </IuTextReveal>
  </div>

  <span v-else-if="meta.slug === 'radiant-text'" style="font-size: 26px; font-weight: 600">
    <IuRadiantText :duration="Number(s.duration) || 6" :radiant-width="Number(s.radiantWidth) || 100">Radiant Text</IuRadiantText>
  </span>

  <span v-else-if="meta.slug === 'breathing-text'" style="font-size: 32px">
    <IuBreathingText from-font-variation-settings='"wght" 100, "slnt" 0' to-font-variation-settings='"wght" 900, "slnt" 8'>Breathing</IuBreathingText>
  </span>

  <div v-else-if="meta.slug === 'ripple'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuRipple :number-of-circles="Number(s.numberOfCircles) || 7" :wave-speed="Number(s.waveSpeed) || 80" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'interactive-grid-pattern'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuInteractiveGridPattern :width="Number(s.width) || 40" :height="Number(s.height) || 40" :squares="[24, 24]" />
  </div>

  <div v-else-if="meta.slug === 'progressive-blur'" class="demo-fit" style="height: 240px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); position: relative">
    <p style="margin: 0; padding: 24px; font-size: 14px; line-height: 2; opacity: 0.8">底部内容逐渐模糊 —— 用于把次要信息压进渐隐层，常用于卡片底部与图片说明。</p>
    <IuProgressiveBlur class="absolute bottom-0 left-0 right-0 h-3/5" />
  </div>

  <button v-else-if="meta.slug === 'multi-step-loader'" class="btn" type="button" @click="mslLoading = true">
    启动加载流程
  </button>

  <div v-else-if="meta.slug === 'direction-aware-hover'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px">
    <IuDirectionAwareHover image-url="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600" class="h-72 w-full">
      <div style="padding: 24px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end">
        <h4 style="margin: 0; font-size: 18px; font-weight: 700">Direction Aware</h4>
        <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.85">内容从鼠标进入的方向滑入。</p>
      </div>
    </IuDirectionAwareHover>
  </div>

  <div v-else-if="meta.slug === 'neon-border'" class="demo-fit" style="height: 180px; width: 100%; max-width: 520px">
    <IuNeonBorder :color1="String(s.color1)" :color2="String(s.color2)" :duration="Number(s.duration) || 6" class="w-full rounded-xl p-10 text-center">
      <p style="margin: 0; font-size: 14px; font-weight: 600">Neon Border 内容</p>
    </IuNeonBorder>
  </div>

  <div v-else-if="meta.slug === 'floating-card'" class="demo-fit" style="height: 240px; width: 100%; max-width: 520px">
    <IuFloatingCard class="w-full max-w-sm">
      <div style="padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px">
        <h4 style="margin: 0; font-size: 18px; font-weight: 700">Floating Card</h4>
        <p style="margin: 10px 0 0; font-size: 13px; opacity: 0.7">鼠标悬停时卡片 3D 倾斜并出现眩光。</p>
      </div>
    </IuFloatingCard>
  </div>

  <span v-else-if="meta.slug === 'container-text-flip'" style="font-size: 24px; font-weight: 700">
    打造<IuContainerTextFlip :words="ctfWords" :interval="Number(s.interval) || 3000" />的界面
  </span>

  <div v-else-if="meta.slug === 'input'" class="demo-fit" style="width: 100%; max-width: 360px">
    <IuIInput v-model="inputValue" :placeholder="String(s.placeholder)" />
  </div>

  <div v-else-if="meta.slug === 'timeline'" style="width: 100%; max-width: 640px; max-height: 480px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px">
    <IuTimeline :items="timelineItems" title="项目大事记" description="滚动查看进度线填充。">
      <template #start>
        <div style="padding: 0 24px 80px 0"><h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">项目启动</h4><p style="margin: 0; font-size: 13px; opacity: 0.7">完成核心组件 20 个。</p></div>
      </template>
      <template #growth>
        <div style="padding: 0 24px 80px 0"><h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">生态扩展</h4><p style="margin: 0; font-size: 13px; opacity: 0.7">组件库规模翻倍，覆盖全部类别。</p></div>
      </template>
      <template #now>
        <div style="padding: 0 24px 80px 0"><h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">持续演进</h4><p style="margin: 0; font-size: 13px; opacity: 0.7">全量对齐上游，逐批移植。</p></div>
      </template>
    </IuTimeline>
  </div>

  <div v-else-if="meta.slug === 'tracing-beam'" style="width: 100%; max-width: 640px; border: 1px solid var(--border); border-radius: 12px">
    <IuTracingBeam>
      <div style="padding: 24px 24px 24px 40px; display: flex; flex-direction: column; gap: 56px">
        <div>
          <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">滚动追踪光束</h4>
          <p style="margin: 0; font-size: 13px; line-height: 1.8; opacity: 0.7">光束随页面滚动逐渐点亮，顶部节点随之变色。</p>
        </div>
        <div>
          <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">任意长内容</h4>
          <p style="margin: 0; font-size: 13px; line-height: 1.8; opacity: 0.7">把长文、博客正文或文档章节放进默认插槽，光束会持续追踪阅读位置。</p>
        </div>
        <div>
          <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 700">纯装饰</h4>
          <p style="margin: 0; font-size: 13px; line-height: 1.8; opacity: 0.7">不影响内容布局，仅在左侧绘制 SVG 光束。</p>
        </div>
      </div>
    </IuTracingBeam>
  </div>

  <!-- ============ 批次 4：扩展组件 ============ -->
  <div v-else-if="meta.slug === 'glow-border'" class="demo-fit" style="height: 180px; width: 100%; max-width: 520px">
    <div style="position: relative; width: 100%; height: 100%; border-radius: 14px; border: 1px solid var(--border); overflow: hidden; display: grid; place-items: center">
      <IuGlowBorder :color="String(s.color)" :border-width="Number(s.borderWidth) || 2" :duration="Number(s.duration) || 6" />
      <p style="margin: 0; font-size: 14px; font-weight: 600">Glow Border 内容</p>
    </div>
  </div>

  <div v-else-if="meta.slug === 'glowing-effect'" class="demo-fit" style="height: 180px; width: 100%; max-width: 520px">
    <div style="position: relative; width: 100%; height: 100%; border-radius: 16px; border: 1px solid var(--border); display: grid; place-items: center">
      <IuGlowingEffect :proximity="120" :spread="40" :disabled="false" :blur="0" />
      <p style="margin: 0; font-size: 14px; font-weight: 600">鼠标靠近时卡面出现辉光</p>
    </div>
  </div>

  <div v-else-if="meta.slug === 'animated-circular-progressbar'" class="demo-fit" style="height: 220px">
    <IuAnimatedCircularProgressBar :value="Number(s.value) || 0" :max="Number(s.max) || 100" :duration="Number(s.duration) || 1" />
  </div>

  <div v-else-if="meta.slug === 'animated-tabs'" class="demo-fit" style="width: 100%; max-width: 520px">
    <IuAnimatedTabs :tabs="atabsTabs" v-model="atabsActive">
      <template #content="{ tab }">
        <div style="padding: 16px; font-size: 14px; border: 1px solid var(--border); border-radius: 12px; margin-top: 12px">当前：{{ tab.value }}</div>
      </template>
    </IuAnimatedTabs>
  </div>

  <div v-else-if="meta.slug === 'images-slider'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px">
    <IuImagesSlider :images="sliderImages" style="width: 100%; height: 100%; border-radius: 14px" />
  </div>

  <div v-else-if="meta.slug === 'confetti'" class="demo-fit" style="height: 140px">
    <IuConfetti>
      <IuConfettiButton class="btn">撒彩带 🎉</IuConfettiButton>
    </IuConfetti>
  </div>

  <div v-else-if="meta.slug === 'container-scroll'" style="width: 100%; max-width: 640px; border: 1px solid var(--border); border-radius: 12px; overflow: hidden">
    <IuContainerScroll style="height: 320px">
      <template #title>
        <h3 style="text-align: center; font-size: 20px; font-weight: 700; margin: 0">滚动体验旋转展开</h3>
      </template>
      <div style="height: 240px; border-radius: 14px; border: 1px solid var(--border); background: linear-gradient(to bottom, rgba(99, 102, 241, 0.12), transparent)">
        <p style="padding: 24px; text-align: center; font-size: 13px; margin: 0">卡片随页面滚动旋转入场</p>
      </div>
    </IuContainerScroll>
  </div>

  <div v-else-if="meta.slug === 'file-tree'" style="width: 100%; max-width: 520px">
    <IuTree
      :elements="treeElements"
      initial-selected-id="4"
      :initial-expanded-items="['1', '2']"
      class="h-64 overflow-auto rounded-lg border p-2"
    />
  </div>

  <div v-else-if="meta.slug === 'dock'" class="demo-fit" style="height: 140px; align-items: flex-end; padding-bottom: 16px">
    <IuDock class="rounded-2xl border" style="padding: 8px 12px; background: var(--surface)">
      <IuDockIcon title="主页">🏠</IuDockIcon>
      <IuDockIcon title="文档">📄</IuDockIcon>
      <IuDockSeparator />
      <IuDockIcon title="设置">⚙️</IuDockIcon>
    </IuDock>
  </div>

  <div v-else-if="meta.slug === 'link-preview'" class="demo-fit" style="height: 200px; align-items: flex-start; padding-top: 24px">
    <span style="font-size: 15px">
      看
      <IuLinkPreview
        url="https://inspira-ui.com"
        :is-static="true"
        image-src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400"
      >
        这个链接
      </IuLinkPreview>
      的悬停预览。
    </span>
  </div>

  <div v-else-if="meta.slug === 'book'" class="demo-fit" style="height: 320px">
    <IuBook color="indigo" size="md">
      <template #header>
        <span style="font-size: 12px; opacity: 0.7">inspira-ui-components</span>
      </template>
      <template #title>
        <h4 style="margin: 0; font-size: 20px; font-weight: 700">Vue 动效组件集</h4>
      </template>
      <template #description>
        <p style="margin: 0; font-size: 12px; opacity: 0.8">悬停翻开封面查看内容。</p>
      </template>
    </IuBook>
  </div>

  <div v-else-if="meta.slug === 'lamp-effect'" class="demo-fit" style="width: 100%; max-width: 640px">
    <IuLampEffect class="rounded-xl" style="min-height: 260px">
      <h3 style="z-index: 10; text-align: center; font-size: 22px; font-weight: 650; color: #fff; margin: 0">Lamp Effect</h3>
    </IuLampEffect>
  </div>

  <div v-else-if="meta.slug === 'iphone-mockup'" class="demo-fit" style="height: 560px">
    <IuIPhone15ProMockup :width="260" :height="528" style="filter: drop-shadow(0 24px 48px rgba(0,0,0,0.35))">
      <img
        src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=520"
        alt="screen"
        style="width: 100%; height: 100%; object-fit: cover"
      >
    </IuIPhone15ProMockup>
  </div>

  <div v-else-if="meta.slug === 'balance-slider'" class="demo-fit" style="height: 160px; width: 100%; max-width: 520px">
    <IuBalanceSlider :initial-value="Number(s.initialValue) || 50" style="width: 100%" />
  </div>

  <div v-else-if="meta.slug === 'animated-testimonials'" class="demo-fit" style="width: 100%; max-width: 560px; min-height: 320px; border: 1px solid var(--border); border-radius: 14px; padding: 24px">
    <IuAnimatedTestimonials :testimonials="testimonialData" :autoplay="Boolean(s.autoplay)" :duration="Number(s.duration) || 5000" style="width: 100%" />
  </div>

  <div v-else-if="meta.slug === 'card-stack'" class="demo-fit" style="height: 460px; width: 100%; max-width: 520px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px">
    <IuCardStack :total-cards="3" class="h-[400%]">
      <IuCardStackItem :index="0" class="rounded-xl border p-6" style="background: var(--surface)">第一张 —— 向下滚动查看堆叠收起</IuCardStackItem>
      <IuCardStackItem :index="1" class="rounded-xl border p-6" style="background: var(--surface)">第二张</IuCardStackItem>
      <IuCardStackItem :index="2" class="rounded-xl border p-6" style="background: var(--surface)">第三张</IuCardStackItem>
    </IuCardStack>
  </div>

  <div v-else-if="meta.slug === 'images-badge'" class="demo-fit" style="height: 220px; width: 100%; max-width: 520px; align-items: flex-end; padding-bottom: 24px">
    <IuImagesBadge text="我的作品" :images="badgeImages" />
  </div>

  <div v-else-if="meta.slug === 'highlight-text'" class="demo-fit" style="height: 120px">
    <span style="font-size: 17px">
      <IuHighlightText highlight-color="hsl(25 90% 80%)">高亮涂色的文字内容</IuHighlightText>
    </span>
  </div>

  <div v-else-if="meta.slug === 'animate-grid'" class="demo-fit" style="height: 420px; width: 100%; max-width: 560px">
    <IuAnimateGrid :cards="gridCards" style="width: 100%" />
  </div>

  <!-- ============ 批次 5：扩展组件 ============ -->
  <div v-else-if="meta.slug === 'smooth-cursor'" class="demo-fit" style="height: 200px; cursor: none">
    <IuSmoothCursor />
    <span style="font-size: 14px; opacity: 0.7">移动鼠标，弹簧光标跟随</span>
  </div>

  <div v-else-if="meta.slug === 'wavy-background'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuWavyBackground :wave-width="Number(s.waveWidth) || 50" :blur="Number(s.blur) || 10" :wave-opacity="Number(s.waveOpacity) || 0.5" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'vortex'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuVortex :base-hue="220" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-stars'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #000">
    <IuStarsBackground :factor="Number(s.factor) || 0.05" :speed="Number(s.speed) || 0.8" :star-color="String(s.starColor)" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-black-hole'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #000">
    <IuBlackHoleBackground style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-falling-stars'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #020205">
    <IuFallingStarsBg :color="String(s.color)" :count="Number(s.count) || 200" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-silk'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuSilkBackground :hue="Number(s.hue) || 300" :saturation="Number(s.saturation) || 0.5" :brightness="Number(s.brightness) || 1" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-singularity'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuSingularityBackground :hue="Number(s.hue) || 260" :saturation="Number(s.saturation) || 0.6" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-thunderstorm'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuThunderstormBackground style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-stractium'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuStractiumBackground style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'snowfall-bg'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #0f172a">
    <IuSnowfallBg :color="String(s.color)" :quantity="Number(s.quantity) || 120" :speed="Number(s.speed) || 1" style="position: absolute; inset: 0" />
  </div>

  <span v-else-if="meta.slug === 'screw-text'" style="font-size: 34px; font-weight: 800">
    <IuScrewText :label="String(s.label)" :rotate-direction="(s.rotateDirection as 'right' | 'left')" />
  </span>

  <div v-else-if="meta.slug === 'variable-text'" class="demo-fit" style="height: 200px" ref="vtextContainer">
    <IuVariableText
      label="VARIABLE WEIGHT"
      :container-ref="vtextContainer"
      from-font-variation-settings="'wght' 100, 'slnt' 0"
      to-font-variation-settings="'wght' 900, 'slnt' 8"
      :radius="130"
      style="font-size: 32px"
    />
  </div>

  <span v-else-if="meta.slug === 'variable-letter-text'" style="font-size: 30px">
    <IuVariableLetterText label="LETTER WEIGHT" />
  </span>

  <div v-else-if="meta.slug === 'scroll-swap-text'" class="demo-fit" style="height: 220px; width: 100%; max-width: 480px" ref="sswapContainer">
    <IuScrollSwapText :container-ref="sswapContainer" text="向下滚动" style="font-size: 28px; font-weight: 700" />
  </div>

  <div v-else-if="meta.slug === 'scratch-to-reveal'" class="demo-fit" style="height: 260px">
    <IuScratchToReveal :width="Number(s.width) || 280" :height="Number(s.height) || 180" :min-scratch-percentage="Number(s.minScratchPercentage) || 50">
      <div style="width: 100%; height: 100%; display: grid; place-items: center; font-size: 18px; font-weight: 700">🎉 恭喜中奖</div>
    </IuScratchToReveal>
  </div>

  <div v-else-if="meta.slug === 'media-text'" class="demo-fit" style="width: 100%; max-width: 560px; padding: 16px 0">
    <IuMediaText
      first-text="灵感闪现的瞬间"
      second-text="画面随之展开"
      media-url="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600"
      media-type="image"
    />
  </div>

  <div v-else-if="meta.slug === 'path-marquee'" class="demo-fit" style="height: 200px; width: 100%; max-width: 640px">
    <IuPathMarquee
      path="M 20 100 C 200 10, 400 190, 620 100"
      text="Inspira UI · 动效组件 · Inspira UI · 动效组件"
      :base-velocity="2"
      :show-path="false"
      style="width: 100%"
    />
  </div>

  <div v-else-if="meta.slug === 'vanishing-input'" class="demo-fit" style="width: 100%; max-width: 480px">
    <IuVanishingInput :placeholders="['输入点什么…', '按下回车见证消失']" />
  </div>

  <div v-else-if="meta.slug === 'svg-mask'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuSVGMask class="h-full" :size="40" :reveal-size="600" style="height: 100%">
      <img
        src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=800"
        alt="mask"
        style="width: 100%; height: 100%; object-fit: cover"
      >
    </IuSVGMask>
  </div>

  <div v-else-if="meta.slug === 'scales'" class="demo-fit" style="height: 240px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuScales :size="Number(s.size) || 10" :orientation="(s.orientation as 'horizontal' | 'vertical' | 'diagonal')" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'text-3d'" class="demo-fit" style="height: 180px">
    <IuText3d
      :text-color="String(s.textColor)"
      :stroke-color="String(s.strokeColor)"
      :shadow-color="String(s.shadowColor)"
      :animate="Boolean(s.animate)"
      style="font-size: 48px; font-weight: 900"
    >
      3D TEXT
    </IuText3d>
  </div>

  <!-- ============ 批次 6：扩展组件 ============ -->
  <div v-else-if="meta.slug === 'animated-beam'" class="demo-fit" style="height: 240px; width: 100%; max-width: 520px">
    <div ref="beamContainer" style="position: relative; width: 100%; height: 100%; border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; padding: 20px; box-sizing: border-box">
      <span ref="beamFrom" style="width: 56px; height: 56px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface)" />
      <span ref="beamTo" style="width: 56px; height: 56px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface)" />
      <IuAnimatedBeam
        v-if="beamContainer && beamFrom && beamTo"
        :container-ref="beamContainer"
        :from-ref="beamFrom"
        :to-ref="beamTo"
        :curvature="Number(s.curvature) || 200"
        :gradient-start-color="String(s.gradientStartColor)"
        :gradient-stop-color="String(s.gradientStopColor)"
      />
    </div>
  </div>

  <div v-else-if="meta.slug === 'apple-card-carousel'" class="demo-fit" style="height: 340px; width: 100%; max-width: 640px; overflow: hidden">
    <IuAppleCardCarousel>
      <IuAppleCarouselItem v-for="(img, i) in sliderImages" :key="i" :index="i">
        <img :src="img" alt="" style="width: 320px; height: 300px; object-fit: cover; border-radius: 14px">
      </IuAppleCarouselItem>
    </IuAppleCardCarousel>
  </div>

  <div v-else-if="meta.slug === 'cube-carousel'" class="demo-fit" style="height: 360px; width: 100%; max-width: 520px">
    <IuCubeCarousel
      :items="[
        { id: 'a', type: 'image', src: sliderImages[0] },
        { id: 'b', type: 'image', src: sliderImages[1] },
      ]"
      :width="300"
      :height="300"
      :auto-play="true"
      :auto-play-interval="4000"
    />
  </div>

  <div v-else-if="meta.slug === 'design-testimonials'" class="demo-fit" style="height: 360px; width: 100%; max-width: 560px; border: 1px solid var(--border); border-radius: 14px; overflow: hidden">
    <IuDesignTestimonials
      :testimonials="[
        { quote: '交付速度提升三倍。', author: '张伟', role: '前端负责人', company: '某科技' },
        { quote: '类型完备，暗色开箱即用。', author: '李娜', role: 'UI 设计师', company: '某工作室' },
        { quote: '动效细腻，体验极佳。', author: '王强', role: '产品经理', company: '某团队' },
      ]"
      title="团队评价"
    />
  </div>

  <div v-else-if="meta.slug === 'fey-cards'" class="demo-fit" style="height: 320px; width: 100%; max-width: 520px">
    <IuFeyCards
      :img-src="sliderImages"
      :main-img="sliderImages[0]"
      :idle-img="sliderImages[1]"
    />
  </div>

  <div v-else-if="meta.slug === 'file-upload'" class="demo-fit" style="width: 100%; max-width: 480px">
    <IuFileUpload @change="(files: File[]) => undefined" />
  </div>

  <div v-else-if="meta.slug === 'logo-origami'" class="demo-fit" style="height: 180px; width: 100%; max-width: 520px">
    <IuLogoOrigami :duration="1.5" :delay="2">
      <IuLogoOrigamiItem><span style="font-size: 30px">◆</span></IuLogoOrigamiItem>
      <IuLogoOrigamiItem><span style="font-size: 30px">✦</span></IuLogoOrigamiItem>
      <IuLogoOrigamiItem><span style="font-size: 30px">●</span></IuLogoOrigamiItem>
      <IuLogoOrigamiItem><span style="font-size: 30px">▲</span></IuLogoOrigamiItem>
    </IuLogoOrigami>
  </div>

  <div v-else-if="meta.slug === 'spring-calendar'" class="demo-fit" style="height: 260px; width: 100%; max-width: 560px; overflow: hidden">
    <IuSpringCalendar
      :calendar-data="[
        { month: '11月', date: 11, day: '周二', events: [{ day: '周二', title: '发布 v1.0', time: '10:00' }] },
        { month: '11月', date: 12, day: '周三' },
        { month: '11月', date: 13, day: '周四', events: [{ day: '周四', title: '评审会', time: '15:00' }] },
      ]"
      :initial-index="0"
    />
  </div>

  <div v-else-if="meta.slug === 'warp-background'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); position: relative">
    <IuWarpBackground style="position: absolute; inset: 0" />
    <p style="position: relative; z-index: 10; width: 100%; height: 100%; display: grid; place-items: center; font-size: 14px; margin: 0">Warp Background</p>
  </div>

  <div v-else-if="meta.slug === 'globe'" class="demo-fit" style="height: 340px">
    <IuGlobe class="aspect-square" style="height: 320px" />
  </div>

  <div v-else-if="meta.slug === 'color-picker'" class="demo-fit" style="height: 220px; width: 100%; max-width: 420px; display: grid; place-items: center">
    <IuColorPicker :model-value="String(s.color)" :type="(s.type as 'hex')" :swatches="['#6366f1', '#ec4899', '#f59e0b']" />
  </div>

  <div v-else-if="meta.slug === 'testimonial-slider'" class="demo-fit" style="height: 320px; width: 100%; max-width: 520px; border: 1px solid var(--border); border-radius: 14px; overflow: hidden">
    <IuTestimonialSlider
      :testimonials="testimonialData.map((t) => ({ img: t.image, quote: t.quote, name: t.name, role: t.designation }))"
      :auto-rotate="true"
      :duration="4000"
    />
  </div>

  <div v-else-if="meta.slug === 'morphing-tabs'" class="demo-fit" style="height: 140px">
    <IuMorphingTabs :tabs="['home', 'search', 'settings']" :active-tab="String(s.activeTab)" @click="s.activeTab = $event" />
  </div>

  <div v-else-if="meta.slug === 'logo-cloud-animated'" class="demo-fit" style="height: 180px; width: 100%; max-width: 560px; overflow: hidden">
    <IuAnimatedLogoCloud title="受团队信任" :logos="[{ name: '◆', path: '' }, { name: '✦', path: '' }, { name: '●', path: '' }, { name: '▲', path: '' }]" />
  </div>

  <div v-else-if="meta.slug === 'logo-cloud-icon'" class="demo-fit" style="height: 180px; width: 100%; max-width: 560px; overflow: hidden">
    <IuIconLogoCloud :logos="[{ name: '◆', path: '' }, { name: '✦', path: '' }, { name: '●', path: '' }]" />
  </div>

  <div v-else-if="meta.slug === 'logo-cloud-static'" class="demo-fit" style="height: 180px; width: 100%; max-width: 560px; overflow: hidden">
    <IuStaticLogoCloud :logos="[{ name: '◆', path: '' }, { name: '✦', path: '' }]" />
  </div>

  <div v-else-if="meta.slug === 'photo-gallery'" class="demo-fit" style="width: 100%; max-width: 560px">
    <IuPhotoGallery :items="sliderImages.map((src) => ({ src }))" />
  </div>

  <div v-else-if="meta.slug === 'expandable-gallery'" class="demo-fit" style="height: 220px; width: 100%; max-width: 560px">
    <IuExpandableGallery :images="sliderImages" />
  </div>

  <div v-else-if="meta.slug === 'circular-gallery'" class="demo-fit" style="height: 300px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuCircularGallery text="GALLERY" text-color="#6366f1" class="h-full" />
  </div>

  <div v-else-if="meta.slug === 'safari-mockup'" class="demo-fit" style="height: 360px; width: 100%; max-width: 640px">
    <IuSafariMockup
      url="https://inspira-ui.com"
      src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=1200"
      :width="1200"
      :height="750"
      class="w-full"
    />
  </div>

  <div v-else-if="meta.slug === 'text-reveal-card'" class="demo-fit" style="height: 220px; width: 100%; max-width: 480px">
    <IuTextRevealCard text="把鼠标移过来" reveal-text="✦ 星光为你揭示答案" :stars-count="80" />
  </div>

  <div v-else-if="meta.slug === 'text-scroll-reveal'" class="demo-fit" style="height: 200px; width: 100%; max-width: 440px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px">
    <div style="height: 320px; padding: 24px; box-sizing: border-box">
      <IuTextScrollReveal text="滚动这段文字试试" style="font-size: 20px; font-weight: 700" />
    </div>
  </div>

  <div v-else-if="meta.slug === 'video-text'" class="demo-fit" style="height: 240px; width: 100%; max-width: 560px; overflow: hidden">
    <IuVideoText
      src="https://cdn.pixabay.com/video/2023/10/08/184118-874843721_tiny.mp4"
      font-size="90px"
      font-weight="900"
    >
      VIDEO
    </IuVideoText>
  </div>

  <div v-else-if="meta.slug === 'halo-search'" class="demo-fit" style="width: 100%; max-width: 440px">
    <IuHaloSearch placeholder="搜索组件…" />
  </div>

  <div v-else-if="meta.slug === 'parallax-float'" class="demo-fit" style="height: 280px; width: 100%; max-width: 520px">
    <IuParallaxFloat class="h-full w-full rounded-xl border" :sensitivity="0.2" style="display: grid; place-items: center">
      <IuParallaxFloatElement :sensitivity="0.35" style="font-size: 18px; font-weight: 700">前景层</IuParallaxFloatElement>
      <IuParallaxFloatElement :sensitivity="0.12" style="font-size: 13px; opacity: 0.6">背景层</IuParallaxFloatElement>
    </IuParallaxFloat>
  </div>

  <div v-else-if="meta.slug === 'orbit'" class="demo-fit" style="height: 280px">
    <IuOrbit class="size-56" :duration="16" :radius="46" reverse>
      <span class="rounded-full bg-emerald-500" style="width: 14px; height: 14px" />
      <span class="rounded-full bg-sky-500" style="width: 10px; height: 10px" />
    </IuOrbit>
  </div>

  <div v-else-if="meta.slug === 'sleek-line-cursor'" class="demo-fit" style="height: 220px; cursor: none">
    <IuSleekLineCursor />
    <span style="font-size: 14px; opacity: 0.7">移动鼠标查看拖尾细线</span>
  </div>

  <!-- ============ 批次 7a：自包含 canvas 组件 ============ -->
  <div v-else-if="meta.slug === 'particles-bg'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #171717">
    <IuParticlesBg :color="String(s.color)" :quantity="Number(s.quantity) || 100" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'icon-cloud'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px">
    <IuIconCloud
      :images="[
        'https://cdn.simpleicons.org/vuedotjs/4FC08D',
        'https://cdn.simpleicons.org/typescript/3178C6',
        'https://cdn.simpleicons.org/vite/646CFF',
        'https://cdn.simpleicons.org/pnpm/F9AD00',
        'https://cdn.simpleicons.org/vitest/6E9F18',
      ]"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'dither-shader'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuDitherShader
      :src="String(s.src)"
      :grid-size="Number(s.gridSize) || 4"
      dither-mode="bayer"
      color-mode="original"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'fluid-cursor'" class="demo-fit" style="height: 300px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); position: relative">
    <IuFluidCursor :sim-resolution="128" :dye-resolution="512" :density-dissipation="97" :velocity-dissipation="2" :pressure="0.8" :curl="20" style="position: absolute; inset: 0" />
    <p style="pointer-events: none; position: relative; z-index: 10; width: 100%; height: 100%; display: grid; place-items: center; font-size: 14px; opacity: 0.7; margin: 0">在区域内移动鼠标</p>
  </div>

  <div v-else-if="meta.slug === 'liquid-glass'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px">
    <IuLiquidGlass :radius="80" :displace="0.5" :blur="11" style="width: 320px; height: 220px">
      <div style="width: 100%; height: 100%; display: grid; place-items: center; font-size: 14px; font-weight: 600">Liquid Glass</div>
    </IuLiquidGlass>
  </div>

  <div v-else-if="meta.slug === 'liquid-logo'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; display: grid; place-items: center">
    <IuLiquidLogo
      image-url="https://cdn.simpleicons.org/vuedotjs/ffffff"
      :speed="0.15"
      :pattern-scale="2.7"
      :liquid="1.35"
      class="h-56 aspect-square"
    />
  </div>

  <div v-else-if="meta.slug === 'html-in-canvas'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlInCanvas
      shader-code="void main() { vec4 c = texture2D(uTexture, vUv); gl_FragColor = vec4(c.r, c.g, c.b, 1.0); }"
      :mouse-enabled="true"
      class="h-full"
    >
      <div style="padding: 28px; font-size: 18px; font-weight: 700">这段 DOM 进入了 WebGL 画布</div>
    </IuHtmlInCanvas>
  </div>

  <div v-else-if="meta.slug === 'html-ascii'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlAscii class="h-full" :cell-size="8">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">ASCII 化的内容</div>
    </IuHtmlAscii>
  </div>

  <div v-else-if="meta.slug === 'html-blaze'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlBlaze class="h-full">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">燃烧的内容</div>
    </IuHtmlBlaze>
  </div>

  <div v-else-if="meta.slug === 'html-chromatic'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlChromatic class="h-full">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">色差漂移的内容</div>
    </IuHtmlChromatic>
  </div>

  <div v-else-if="meta.slug === 'html-cloth'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlCloth class="h-full">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">布料波动的内容</div>
    </IuHtmlCloth>
  </div>

  <div v-else-if="meta.slug === 'html-drag'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlDrag class="h-full" :strength="0.6">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">拖拽扭曲的内容</div>
    </IuHtmlDrag>
  </div>

  <div v-else-if="meta.slug === 'html-liquid'" class="demo-fit" style="height: 300px; width: 100%; max-width: 560px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuHtmlLiquid class="h-full">
      <div style="padding: 28px; font-size: 18px; font-weight: 700">液态扭曲的内容</div>
    </IuHtmlLiquid>
  </div>

  <div v-else-if="meta.slug === 'image-trail-cursor'" class="demo-fit" style="height: 300px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); position: relative">
    <IuImageTrailCursor
      :images="[
        'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300',
        'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=300',
        'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300&sat=-100',
      ]"
      :variant="('type4' as never)"
      style="position: absolute; inset: 0"
    />
    <p style="pointer-events: none; position: absolute; inset: 0; display: grid; place-items: center; font-size: 14px; opacity: 0.6; margin: 0">移动鼠标产生图片拖尾</p>
  </div>

  <div v-else-if="meta.slug === 'particle-image'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuParticleImage
      :image-src="String(s.imageSrc)"
      :particle-size="String(s.particleSize)"
      mouse-force="30"
      class="h-full"
    />
  </div>

  <!-- ============ 批次 7b：WebGL 重型组件 ============ -->
  <div v-else-if="meta.slug === 'bending-gallery'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuBendingGallery
      :items="[
        { image: 'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600', text: 'Mountains' },
        { image: 'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=600', text: 'Ocean' },
      ]"
      :bend="-3"
      text-color="#ffffff"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'bg-bubbles'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuBubblesBg style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-neural'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuNeuralBg :hue="Number(s.hue) || 260" :saturation="Number(s.saturation) || 0.6" :chroma="Number(s.chroma) || 0.2" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'bg-particle-whirlpool'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #000">
    <IuParticleWhirlpoolBg style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'carousel-3d'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuCarousel3D
      :items="[
        'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600',
        'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=600',
        'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=600&sat=-100',
      ]"
      :width="320"
      :height="240"
    />
  </div>

  <div v-else-if="meta.slug === 'cosmic-portal'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuCosmicPortal class="h-full" />
  </div>

  <div v-else-if="meta.slug === 'github-globe'" class="demo-fit" style="height: 340px">
    <IuGithubGlobe
      class="aspect-square"
      style="height: 320px"
      :data="[
        { order: 0, startLat: 39.9, startLng: 116.4, endLat: 35.6, endLng: 139.7, arcAlt: 0.3, color: '#8B5CF6' },
        { order: 1, startLat: 40.7, startLng: -73.9, endLat: 51.5, endLng: -0.1, arcAlt: 0.4, color: '#3B82F6' },
      ]"
    />
  </div>

  <div v-else-if="meta.slug === 'infinite-grid'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuInfiniteGrid
      :card-data="[
         { title: '组件卡片', badge: 'NEW', tags: ['ogl'], date: '2025-11-11', image: 'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=500' },
         { title: '第二张', badge: '', tags: [], date: '2025-11-11', image: 'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=500' },
         { title: '第三张', badge: '', tags: [], date: '2025-11-11', image: 'https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=500&sat=-100' },
      ]"
      :options="{ tileSize: 3, gridCols: 3 }"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'light-speed'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #000">
    <IuLightSpeed style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'liquid-background'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuLiquidBackground style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'ribbon-background'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuRibbonBackground :colors="['#4f46e5', '#0ea5e9', '#ec4899']" :speed="0.5" style="position: absolute; inset: 0" />
  </div>

  <div v-else-if="meta.slug === 'scroll-island'" class="demo-fit" style="height: 200px; width: 100%; max-width: 440px; overflow-y: auto; border: 1px solid var(--border); border-radius: 12px">
    <div style="height: 400px; padding: 20px; box-sizing: border-box">
      <IuScrollIsland title="滚动进度" :height="64" />
    </div>
  </div>

  <div v-else-if="meta.slug === 'shader-toy'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuShaderToy
      shader-code="void mainImage(out vec4 c, vec2 uv) { c = vec4(uv.x * abs(sin(uTime * 0.5)), uv.y, abs(sin(uTime)), 1.0); }"
      :mouse-mode="'hover'"
      class="h-full"
    />
  </div>

  <div v-else-if="meta.slug === 'spline'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuSpline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" class="h-full" />
  </div>

  <div v-else-if="meta.slug === 'tailed-cursor'" class="demo-fit" style="height: 280px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); position: relative; cursor: none">
    <IuTailedCursor :colors="['#fe0c0c', '#b70cfe', '#0c46fe']" :base-thickness="2" style="position: absolute; inset: 0" />
    <p style="pointer-events: none; position: absolute; inset: 0; display: grid; place-items: center; font-size: 14px; opacity: 0.6; margin: 0">移动鼠标查看缎带拖尾</p>
  </div>

  <div v-else-if="meta.slug === 'tetris'" class="demo-fit" style="height: 460px; width: 100%; max-width: 420px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #0a0a0a">
    <IuTetris square-color="#6366f1" :base="12" class="h-full" />
  </div>

  <div v-else-if="meta.slug === 'world-map'" class="demo-fit" style="height: 320px; width: 100%; max-width: 640px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
    <IuWorldMap
      :dots="[
        { start: { lat: 39.9, lng: 116.4 }, end: { lat: 35.6, lng: 139.7 } },
        { start: { lat: 40.7, lng: -73.9 }, end: { lat: 51.5, lng: -0.1 } },
      ]"
      map-color="#3B82F6"
      map-bg-color="#0a0a0a"
      line-color="#8B5CF6"
      class="h-full"
    />
  </div>

  <!-- Dialog 详情页的真实弹窗实例 -->
  <Teleport to="body">
    <IuDialog
      v-if="meta.slug === 'dialog'"
      v-model="dialogOpen"
      :title="String(s.title)"
      description="通过 v-model 控制开关：支持 Esc、点击遮罩、滚动锁定与焦点管理。"
      :width="'420px'"
      :danger="Boolean(s.danger)"
      :show-close="Boolean(s.showClose)"
      confirm-text="确 定"
      cancel-text="取 消"
      @confirm="dialogOpen = false"
      @cancel="dialogOpen = false"
    >
      <div style="font-size: 13px; color: var(--muted)">
        确认按钮点击后自动进入 loading，异步完成后自动关闭。
      </div>
    </IuDialog>
  </Teleport>

  <!-- MultiStepLoader 详情页的真实全屏加载层（fixed 遮罩） -->
  <IuMultiStepLoader
    v-if="meta.slug === 'multi-step-loader'"
    :steps="mslSteps"
    :loading="mslLoading"
    :prevent-close="Boolean(s.preventClose)"
    @close="mslLoading = false"
    @complete="mslLoading = false"
  />
</template>

<style scoped>
.spot-fill {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
}

.spot-fill h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.spot-fill p {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.75;
}

.spot-cta {
  font-size: 13px;
  font-weight: 650;
}

.marquee-stage {
  background: var(--surface-2, var(--surface));
  border: 1px solid var(--border);
  border-radius: 12px;
}

.demo-fit {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
