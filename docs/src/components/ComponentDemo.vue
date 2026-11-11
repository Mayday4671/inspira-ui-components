<script setup lang="ts">
/**
 * 组件详情页「实时演示」舞台。
 * 按 slug 渲染真实组件，并把可调参数（demoState）双向绑定到组件 props。
 */
import { computed, ref } from 'vue'
import {
  IuAnimatedModal,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedTooltip,
  IuAnimatedModalTrigger,
  IuAuroraBackground,
  IuBentoGrid,
  IuBorderBeam,
  IuBoxReveal,
  IuBreathingText,
  IuCard3D,
  IuCardSpotlight,
  IuColourfulText,
  IuCompare,
  IuContainerTextFlip,
  IuDialog,
  IuDirectionAwareHover,
  IuEncryptedText,
  IuFlickeringGrid,
  IuFloat,
  IuFloatingCard,
  IuFlipCard,
  IuFlipWords,
  IuFocus,
  IuGlareCard,
  IuGradientButton,
  IuHyperText,
  IuInteractiveGridPattern,
  IuInteractiveHoverButton,
  IuIInput,
  IuLens,
  IuLetterPullup,
  IuLetterSwap,
  IuLineShadowText,
  IuMarquee,
  IuMeteors,
  IuMorphingText,
  IuMultiStepLoader,
  IuNeonBorder,
  IuNumberTicker,
  IuPatternBackground,
  IuProgressiveBlur,
  IuRadiantText,
  IuRainbowButton,
  IuRipple,
  IuRippleButton,
  IuShimmerButton,
  IuSparkles,
  IuSparklesText,
  IuSpinningText,
  IuStatistic,
  IuTextGenerateEffect,
  IuTextGlitch,
  IuTextHighlight,
  IuTextHoverEffect,
  IuTextReveal,
  IuTimeline,
  IuTracingBeam,
  IuTypewriterText,
  IuUnderlineText,
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
