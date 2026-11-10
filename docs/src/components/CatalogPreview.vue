<script setup lang="ts">
/**
 * 目录 / 首页精选卡片中的迷你预览。
 * 全部渲染 packages/inspira-ui 的真实组件（经 workspace alias），
 * 仅用 transform: scale 控制视觉尺寸，不伪造任何演示。
 */
import { computed } from 'vue'
import {
  IuAnimatedTooltip,
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
  IuAnimatedModal,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalTrigger,
} from 'inspira-ui-components'
import { ref } from 'vue'
import type { PreviewKind } from '../data/registry'

const props = defineProps<{ kind: PreviewKind }>()

const dialogOpen = ref(false)

/** 各预览的视觉缩放（真实组件按原始尺寸渲染，仅缩放呈现） */
const scale = computed(() => {
  switch (props.kind) {
    case 'card':
      return 0.33
    case 'spotlight':
      return 0.52
    case 'flip':
      return 0.46
    case 'glare':
      return 0.34
    case 'bento':
      return 0.4
    case 'stat':
      return 0.9
    case 'aurora':
    case 'pattern':
      return 1
    default:
      return 1
  }
})

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
]

const bentoItems = [
  { key: 'p1', name: '统一 API', description: '统一 Props / Events / 插槽' },
  { key: 'p2', name: '按需引入', description: 'tree-shaking 友好' },
  { key: 'p3', name: '类型完备', description: 'Vue 3 + TypeScript' },
]

const auroraHeight = '128px'
</script>

<template>
  <div class="preview-scale" :style="{ transform: `scale(${scale})` }" @click.stop @pointerdown.stop>
    <IuShimmerButton v-if="kind === 'shimmer'" size="small" @click.stop>开始探索</IuShimmerButton>

    <IuInteractiveHoverButton v-else-if="kind === 'hover'" size="small" text="了解更多" />

    <IuRainbowButton v-else-if="kind === 'rainbow'" size="small">查看详情 ✦</IuRainbowButton>

    <IuGradientButton v-else-if="kind === 'gradient'" variant="ocean" size="small">渐变流光 →</IuGradientButton>

    <IuRippleButton v-else-if="kind === 'ripple'" size="small">点击试试 →</IuRippleButton>

    <div v-else-if="kind === 'card'" class="scaled-box" style="width: 210px; height: 132px">
      <IuCard3D title="3D Card" description="悬停时跟随鼠标倾斜" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)" />
    </div>

    <div v-else-if="kind === 'spotlight'" class="scaled-box" style="width: 260px; height: 150px">
      <IuCardSpotlight
        title="Spotlight"
        description="随光标移动的柔光"
        style="position: absolute; inset: 0"
      />
    </div>

    <div v-else-if="kind === 'flip'" class="scaled-box" style="width: 210px; height: 132px">
      <IuFlipCard
        back-title="点击翻转"
        back-description="悬停翻到背面"
        style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
      />
    </div>

    <div v-else-if="kind === 'glare'" class="scaled-box" style="width: 210px; height: 132px">
      <IuGlareCard
        title="Glare Card"
        description="细腻的悬停高光"
        :width="200"
        :radius="28"
        style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
      />
    </div>

    <div v-else-if="kind === 'bento'" class="scaled-box" style="width: 330px; height: 180px">
      <IuBentoGrid
        :items="bentoItems"
        style="position: absolute; inset: 0"
      />
    </div>

    <span v-else-if="kind === 'number'" style="font-weight: 850; font-size: 40px; letter-spacing: -2px; display: inline-block">
      <IuNumberTicker :value="12860" :decimal-places="0" suffix="+" :duration="1600" />
    </span>

    <span v-else-if="kind === 'type'" style="font-family: monospace; font-size: 16px; font-weight: 800; letter-spacing: 1px; display: inline-block">
      <IuTypewriterText text="Hello, Inspira" :speed="75" />
    </span>

    <span v-else-if="kind === 'words'" style="font-size: 16px; font-weight: 800; color: var(--primary); display: inline-block; min-width: 150px; text-align: center">
      <IuFlipWords :words="['流畅', '轻盈', '优雅']" :duration="2400" />
    </span>

    <span v-else-if="kind === 'text'" style="font-size: 15px; font-weight: 750; letter-spacing: 3px; display: inline-block">
      <IuTextGenerateEffect words="让每一帧都有意义" :duration="0.5" />
    </span>

    <span v-else-if="kind === 'blur'" style="font-size: 16px; font-weight: 750; color: var(--primary); display: inline-block">
      <IuBlurReveal :duration="0.9" :delay="0.4">
        <span style="display: block">渐入你的视野</span>
      </IuBlurReveal>
    </span>

    <!-- 真实弹窗：点击按钮弹出真正的 IuDialog -->
    <button v-else-if="kind === 'dialog'" class="btn sm" type="button" @click="dialogOpen = true">
      打开弹窗
    </button>

    <!-- 真实五件套弹窗 -->
    <IuAnimatedModal v-else-if="kind === 'modal'">
      <IuAnimatedModalTrigger class="btn sm">打开弹窗</IuAnimatedModalTrigger>
      <IuAnimatedModalBody :width="'380px'">
        <IuAnimatedModalContent>
          <h4 style="margin: 0; font-size: 17px; font-weight: 750">五件套弹窗</h4>
          <p style="margin: 10px 0 0; font-size: 13px; color: var(--muted)">
            这是真实渲染的 IuAnimatedModal：Trigger / Body / Content / Footer 组合。
          </p>
        </IuAnimatedModalContent>
      </IuAnimatedModalBody>
    </IuAnimatedModal>

    <IuAnimatedTooltip v-else-if="kind === 'tooltip'" :items="tooltipItems" />

    <div v-else-if="kind === 'marquee'" class="scaled-box" style="width: 190px; height: 60px">
      <IuMarquee
        :items="marqueeItems"
        :speed="8"
        gap="0.75rem"
        style="position: absolute; inset: 0; display: flex; align-items: center"
      />
    </div>

    <div v-else-if="kind === 'stat'" class="scaled-box" style="width: 180px; height: 110px">
      <IuStatistic
        label="本月访问量"
        :value="24800"
        suffix="+"
        :trend="12.6"
        trend-label="较上月"
        style="position: absolute; inset: 0"
      />
    </div>

    <div v-else-if="kind === 'aurora'" class="scaled-box" style="width: 230px; height: 130px; border-radius: 12px; overflow: hidden">
      <IuAuroraBackground :height="auroraHeight" rounded="12px" style="position: absolute; inset: 0">
        <span style="font-size: 13px; font-weight: 750">Aurora Background</span>
      </IuAuroraBackground>
    </div>

    <div v-else-if="kind === 'pattern'" class="scaled-box" style="width: 230px; height: 130px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border)">
      <IuPatternBackground variant="grid" :animate="true" direction="top" :speed="(12000 as any)" style="position: absolute; inset: 0">
        <span style="font-size: 13px; font-weight: 750">Pattern Background</span>
      </IuPatternBackground>
    </div>

    <!-- 真实 IuDialog：teleport 到 body，受预览容器控制 -->
    <Teleport to="body">
      <IuDialog
        v-if="kind === 'dialog'"
        v-model="dialogOpen"
        title="演示弹窗"
        description="这是真实渲染的 IuDialog：v-model 控制、Esc / 遮罩可关、确认自带 loading。"
        :width="'380px'"
        confirm-text="确认"
        cancel-text="取消"
        @confirm="dialogOpen = false"
        @cancel="dialogOpen = false"
      >
        <div style="font-size: 13px; color: var(--muted)">目录预览中弹出的真实组件实例。</div>
      </IuDialog>
    </Teleport>
  </div>
</template>

<style scoped>
.preview-scale {
  display: grid;
  place-items: center;
}

.scaled-box {
  position: relative;
}
</style>
