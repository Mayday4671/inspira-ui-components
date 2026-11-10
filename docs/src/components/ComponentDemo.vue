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
  IuAnimatedModalTrigger,
  IuAuroraBackground,
  IuBentoGrid,
  IuCard3D,
  IuCardSpotlight,
  IuDialog,
  IuFlipCard,
  IuFlipWords,
  IuGlareCard,
  IuGradientButton,
  IuInteractiveHoverButton,
  IuMarquee,
  IuNumberTicker,
  IuPatternBackground,
  IuRainbowButton,
  IuRippleButton,
  IuShimmerButton,
  IuStatistic,
  IuTextGenerateEffect,
  IuTypewriterText,
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

const marqueeItems = [
  { key: 1, label: 'Vue 3' },
  { key: 2, label: 'TypeScript' },
  { key: 3, label: 'Motion' },
  { key: 4, label: 'Inspira UI' },
]

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

  <div v-else-if="meta.slug === 'card-spotlight'" class="demo-fit" style="height: 300px; width: 100%; max-width: 520px">
    <IuCardSpotlight
      :title="String(s.title)"
      description="鼠标在卡片上移动，会有一道聚光灯跟随光斑。"
      :gradient-size="Number(s.gradientSize) || 240"
      style="position: absolute; inset: 0"
    />
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

  <div v-else-if="meta.slug === 'marquee'" class="demo-fit" style="height: 90px; width: 100%; max-width: 520px; border: 1px solid var(--border); border-radius: 12px">
    <IuMarquee
      :items="marqueeItems"
      :speed="Number(s.speed) || 20"
      :reverse="Boolean(s.reverse)"
      :pause-on-hover="Boolean(s.pauseOnHover)"
      gap="0.75rem"
      style="height: 100%"
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
</template>

<style scoped>
.demo-fit {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
