<script setup lang="ts">
/**
 * 目录 / 首页精选卡片中的迷你预览。
 * 全部渲染 packages/inspira-ui 的真实组件（经 workspace alias），
 * 仅用 transform: scale 控制视觉尺寸，不伪造任何演示。
 */
import { computed } from 'vue'
import {
  IuAnimateGrid,
  IuAnimatedCircularProgressBar,
  IuAnimatedTabs,
  IuAnimatedTestimonials,
  IuAnimatedTooltip,
  IuAuroraBackground,
  IuBalanceSlider,
  IuBook,
  IuBentoGrid,
  IuBorderBeam,
  IuBoxReveal,
  IuBreathingText,
  IuCard3D,
  IuCardSpotlight,
  IuCardStack,
  IuCardStackItem,
  IuColourfulText,
  IuCompare,
  IuConfetti,
  IuConfettiButton,
  IuContainerTextFlip,
  IuDialog,
  IuDirectionAwareHover,
  IuDock,
  IuDockIcon,
  IuEncryptedText,
  IuFlickeringGrid,
  IuFloat,
  IuFloatingCard,
  IuFlipCard,
  IuFlipWords,
  IuFocus,
  IuGlareCard,
  IuGradientButton,
  IuGlowBorder,
  IuGlowingEffect,
  IuHighlightText,
  IuHyperText,
  IuInteractiveGridPattern,
  IuIPhone15ProMockup,
  IuImagesBadge,
  IuImagesSlider,
  IuInteractiveHoverButton,
  IuIInput,
  IuLens,
  IuLampEffect,
  IuLetterPullup,
  IuLetterSwap,
  IuLinkPreview,
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
  IuTree,
  IuTextReveal,
  IuTimeline,
  IuTracingBeam,
  IuTypewriterText,
  IuUnderlineText,
} from 'inspira-ui-components'
import { ref } from 'vue'
import type { PreviewKind } from '../data/registry'

const props = defineProps<{ kind: PreviewKind }>()

const dialogOpen = ref(false)
const mloadOpen = ref(false)

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

    <IuGradientButton v-else-if="kind === 'gradient'" variant="ocean" size="small">渐变流光</IuGradientButton>

    <IuRippleButton v-else-if="kind === 'ripple'" size="small">点击试试</IuRippleButton>

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

    <!-- ============ 批次 2 预览补齐 ============ -->
    <span v-else-if="kind === 'pullup'" style="font-size: 15px; font-weight: 800; display: inline-block">
      <IuLetterPullup words="Inspira" :delay="0.05" />
    </span>

    <span v-else-if="kind === 'spin'" style="display: inline-block">
      <IuSpinningText text="LOADING · · ·" :duration="10" :radius="4.5" style="width: 130px; height: 130px; font-size: 10px" />
    </span>

    <div v-else-if="kind === 'box'" class="scaled-box" style="width: 220px; height: 110px">
      <IuBoxReveal color="#5046e6" :duration="0.5" :delay="0.25" style="position: absolute; inset: 0; padding: 16px">
        <span style="font-size: 14px; font-weight: 700">Box Reveal</span>
      </IuBoxReveal>
    </div>

    <span v-else-if="kind === 'line-shadow'" style="font-size: 15px; font-weight: 700; display: inline-block">
      <IuLineShadowText shadow-color="#6366f1">Hover</IuLineShadowText>
    </span>

    <span v-else-if="kind === 'hyper'" style="font-family: monospace; font-size: 13px; font-weight: 700; display: inline-block">
      <IuHyperText text="HOVER" :duration="800" :animate-on-load="true" />
    </span>

    <span v-else-if="kind === 'encrypt'" style="font-size: 13px; font-weight: 600; display: inline-block">
      <IuEncryptedText text="Encrypted" />
    </span>

    <div v-else-if="kind === 'morph'" class="scaled-box" style="width: 200px; height: 64px">
      <IuMorphingText :texts="['工程师', '设计师']" style="position: absolute; inset: 0; width: 100%; font-size: 16px; font-weight: 700; text-align: center" />
    </div>

    <span v-else-if="kind === 'focus'" style="font-size: 14px; font-weight: 650; display: inline-block">
      <IuFocus sentence="Coding Focus" :manual-mode="true" />
    </span>

    <span v-else-if="kind === 'colourful'" style="font-size: 15px; font-weight: 700; display: inline-block">
      <IuColourfulText text="Colourful" />
    </span>

    <span v-else-if="kind === 'lswap'" style="font-size: 13px; font-weight: 700; display: inline-block">
      <IuLetterSwap label="Swap" />
    </span>

    <span v-else-if="kind === 'thl'" style="font-size: 13px; display: inline-block">
      <IuTextHighlight>高亮文字</IuTextHighlight>
    </span>

    <span v-else-if="kind === 'uline'" style="font-size: 13px; display: inline-block">
      <IuUnderlineText>下划线</IuUnderlineText>
    </span>

    <div v-else-if="kind === 'beam'" class="scaled-box" style="width: 210px; height: 120px; border: 1px solid var(--border); border-radius: 10px; position: relative; overflow: hidden; padding: 16px">
      <IuBorderBeam color-from="#ffaa40" color-to="#9c40ff" :duration="4000" />
      <span style="font-size: 12px; font-weight: 600">Border Beam</span>
    </div>

    <div v-else-if="kind === 'meteors'" class="scaled-box" style="width: 210px; height: 120px; border: 1px solid var(--border); position: relative; overflow: hidden">
      <span class="absolute inset-0"><IuMeteors /></span>
      <span style="position: relative; z-index: 1; padding: 14px; font-size: 12px; display: inline-block">Meteors</span>
    </div>

    <div v-else-if="kind === 'fgrid'" class="scaled-box" style="width: 210px; height: 120px; position: relative; overflow: hidden; border-radius: 10px; border: 1px solid var(--border)">
      <IuFlickeringGrid
        class="absolute inset-0 z-0 [mask-image:radial-gradient(160px_circle_at_center,white,transparent)]"
        :square-size="4"
        :grid-gap="4"
        color="#60a5fa"
        :max-opacity="0.6"
        :flicker-chance="0.1"
      />
    </div>

    <div v-else-if="kind === 'compare'" class="scaled-box" style="width: 210px; height: 130px; border-radius: 10px; overflow: hidden">
      <IuCompare
        first-image="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400"
        second-image="https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=400"
        first-image-alt="Before"
        second-image-alt="After"
        slide-mode="hover"
        class="h-full"
      />
    </div>

    <div v-else-if="kind === 'lens'" class="scaled-box" style="width: 210px; height: 130px; border-radius: 10px; overflow: hidden">
      <IuLens :zoom-factor="1.5" :lens-size="120" :is-static="true" class="h-full">
        <img src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400" alt="" style="width: 100%; height: 130px; object-fit: cover">
      </IuLens>
    </div>

    <div v-else-if="kind === 'alist'" class="scaled-box" style="width: 210px; height: 120px">
      <IuAnimatedList :delay="600">
        <div style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; margin: 5px 0; font-size: 12px">第一条</div>
        <div style="padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; margin: 5px 0; font-size: 12px">第二条</div>
      </IuAnimatedList>
    </div>

    <!-- ============ 批次 3 预览 ============ -->
    <div v-else-if="kind === 'float'" class="scaled-box" style="width: 210px; height: 120px; perspective: 700px; display: grid; place-items: center">
      <IuFloat>
        <span style="padding: 10px 16px; border: 1px solid var(--border); border-radius: 10px; font-size: 12px; font-weight: 600; background: var(--surface)">Float</span>
      </IuFloat>
    </div>

    <div v-else-if="kind === 'spk'" class="scaled-box" style="width: 210px; height: 120px; border-radius: 10px; overflow: hidden">
      <IuSparkles :particle-density="80" style="position: absolute; inset: 0; width: 100%; height: 100%" />
    </div>

    <span v-else-if="kind === 'stx'" style="font-size: 16px; font-weight: 700; display: inline-block">
      <IuSparklesText text="Sparkles" :sparkles-count="8" />
    </span>

    <span v-else-if="kind === 'tglitch'" style="font-size: 16px; font-weight: 800; display: inline-block">
      <IuTextGlitch text="GLITCH" :speed="0.5" />
    </span>

    <div v-else-if="kind === 'thover'" class="scaled-box" style="width: 200px; height: 72px">
      <IuTextHoverEffect text="Inspira" :stroke-width="0.75" style="width: 100%" />
    </div>

    <span v-else-if="kind === 'treveal'" style="font-size: 14px; font-weight: 700; display: inline-block">
      <IuTextReveal><span>文字逐词揭示</span></IuTextReveal>
    </span>

    <span v-else-if="kind === 'radiant'" style="font-size: 15px; font-weight: 700; display: inline-block">
      <IuRadiantText :duration="6" :radiant-width="80">Radiant</IuRadiantText>
    </span>

    <span v-else-if="kind === 'breath'" style="font-size: 16px; display: inline-block">
      <IuBreathingText from-font-variation-settings='"wght" 100' to-font-variation-settings='"wght" 900'>Breathing</IuBreathingText>
    </span>

    <div v-else-if="kind === 'rip'" class="scaled-box" style="width: 210px; height: 130px; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); position: relative">
      <IuRipple :number-of-circles="5" style="position: absolute; inset: 0" />
    </div>

    <div v-else-if="kind === 'igp'" class="scaled-box" style="width: 210px; height: 130px; display: grid; place-items: center; border: 1px solid var(--border); border-radius: 10px; overflow: hidden">
      <IuInteractiveGridPattern :width="24" :height="24" :squares="[20, 12]" />
    </div>

    <div v-else-if="kind === 'pblur'" class="scaled-box" style="width: 210px; height: 120px; position: relative; overflow: hidden; border: 1px solid var(--border); border-radius: 10px">
      <span style="position: absolute; inset: 0; padding: 14px; font-size: 12px; line-height: 1.8">渐进模糊层效果演示文本。</span>
      <IuProgressiveBlur class="absolute bottom-0 left-0 right-0 h-1/2" />
    </div>

    <button v-else-if="kind === 'mload'" class="btn sm" type="button" @click="mloadOpen = true">
      加载流程
    </button>

    <div v-else-if="kind === 'dah'" class="scaled-box" style="width: 210px; height: 130px">
      <IuDirectionAwareHover image-url="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400" style="width: 100%; height: 100%">
        <div style="padding: 14px; height: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end">
          <b style="font-size: 12px">Direction Aware</b>
        </div>
      </IuDirectionAwareHover>
    </div>

    <div v-else-if="kind === 'neon'" class="scaled-box" style="width: 210px; height: 110px">
      <IuNeonBorder class="h-full w-full rounded-xl" style="display: grid; place-items: center">
        <span style="font-size: 12px; font-weight: 600">Neon Border</span>
      </IuNeonBorder>
    </div>

    <div v-else-if="kind === 'fcard'" class="scaled-box" style="width: 210px; height: 120px; display: grid; place-items: center">
      <IuFloatingCard style="width: 180px">
        <div style="padding: 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px">
          <b style="font-size: 12px">Floating Card</b>
        </div>
      </IuFloatingCard>
    </div>

    <span v-else-if="kind === 'ctf'" style="font-size: 13px; font-weight: 700; display: inline-block">
      打造<IuContainerTextFlip :words="['流畅', '轻盈']" :interval="2400" />界面
    </span>

    <div v-else-if="kind === 'inp'" class="scaled-box" style="width: 200px">
      <IuIInput placeholder="Placeholder" style="width: 200px" />
    </div>

    <div v-else-if="kind === 'tl'" class="scaled-box" style="width: 230px; height: 150px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden">
      <IuTimeline :items="[{ id: 'a', label: '2024' }]" title="Timeline" style="pointer-events: none">
        <template #a>
          <div style="padding: 0 12px 40px 0; font-size: 12px"><b>节点一</b><p style="margin: 4px 0 0">滚动进度线。</p></div>
        </template>
      </IuTimeline>
    </div>

    <div v-else-if="kind === 'tbm'" class="scaled-box" style="width: 230px; height: 150px; overflow: hidden">
      <IuTracingBeam>
        <div style="padding: 12px 12px 12px 36px; font-size: 12px; line-height: 1.7">
          <b>追踪光束</b>
          <p style="margin: 6px 0 0">随滚动点亮。</p>
        </div>
      </IuTracingBeam>
    </div>

    <!-- ============ 批次 4 预览 ============ -->
    <div v-else-if="kind === 'gborder'" class="scaled-box" style="width: 210px; height: 120px; border: 1px solid var(--border); border-radius: 12px; position: relative; overflow: hidden; display: grid; place-items: center">
      <IuGlowBorder color="#6366f1" :duration="5" />
      <span style="font-size: 12px; font-weight: 600">Glow Border</span>
    </div>

    <div v-else-if="kind === 'geffect'" class="scaled-box" style="width: 210px; height: 110px; border: 1px solid var(--border); border-radius: 14px; position: relative; display: grid; place-items: center">
      <IuGlowingEffect :proximity="140" :spread="40" :disabled="false" :blur="0" />
      <span style="font-size: 12px; font-weight: 600">Glowing Effect</span>
    </div>

    <div v-else-if="kind === 'circprog'" class="scaled-box" style="width: 130px; height: 130px; display: grid; place-items: center">
      <IuAnimatedCircularProgressBar :value="72" :duration="1" />
    </div>

    <div v-else-if="kind === 'atabs'" class="scaled-box" style="width: 220px">
      <IuAnimatedTabs :tabs="[{ title: 'A', value: 'a' }, { title: 'B', value: 'b' }]" model-value="a">
        <template #content>
          <div style="padding: 10px; font-size: 12px; border: 1px solid var(--border); border-radius: 10px; margin-top: 8px">内容面板</div>
        </template>
      </IuAnimatedTabs>
    </div>

    <div v-else-if="kind === 'islider'" class="scaled-box" style="width: 210px; height: 130px; border-radius: 10px; overflow: hidden">
      <IuImagesSlider :images="['https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=400', 'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=400']" style="width: 100%; height: 100%" />
    </div>

    <div v-else-if="kind === 'confetti'" class="scaled-box" style="display: grid; place-items: center">
      <IuConfetti>
        <IuConfettiButton class="btn sm">撒彩带 🎉</IuConfettiButton>
      </IuConfetti>
    </div>

    <div v-else-if="kind === 'cscroll'" class="scaled-box" style="width: 230px; height: 150px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden">
      <IuContainerScroll style="height: 150px">
        <template #title>
          <h4 style="text-align: center; font-size: 12px; font-weight: 700; margin: 6px 0">旋转展开</h4>
        </template>
        <div style="height: 90px; margin: 0 12px; border-radius: 8px; border: 1px solid var(--border); background: rgba(99,102,241,0.1)" />
      </IuContainerScroll>
    </div>

    <div v-else-if="kind === 'ftree'" class="scaled-box" style="width: 220px; height: 140px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden">
      <IuTree
        :elements="[{ id: '1', name: 'src', children: [{ id: '2', name: 'app.ts', isSelectable: true }] }, { id: '3', name: 'package.json', isSelectable: true }]"
        initial-selected-id="2"
        :initial-expanded-items="['1']"
        style="font-size: 12px; padding: 8px"
      />
    </div>

    <div v-else-if="kind === 'dock'" class="scaled-box" style="width: 230px; height: 90px; display: grid; place-items: center">
      <IuDock class="rounded-xl border" style="padding: 6px 8px; background: var(--surface)">
        <IuDockIcon title="A">🏠</IuDockIcon>
        <IuDockIcon title="B">📄</IuDockIcon>
        <IuDockIcon title="C">⚙️</IuDockIcon>
      </IuDock>
    </div>

    <div v-else-if="kind === 'lprev'" class="scaled-box" style="height: 110px; display: grid; place-items: center">
      <span style="font-size: 12px">
        看
        <IuLinkPreview url="https://inspira-ui.com" :is-static="true" image-src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=300">
          这个链接
        </IuLinkPreview>
        预览
      </span>
    </div>

    <div v-else-if="kind === 'book'" class="scaled-box" style="width: 180px; height: 150px; display: grid; place-items: center">
      <IuBook color="indigo" size="sm" :is-static="true">
        <template #title>
          <h5 style="margin: 0; font-size: 13px; font-weight: 700">动效组件集</h5>
        </template>
        <template #description>
          <p style="margin: 0; font-size: 10px; opacity: 0.8">静态翻开预览</p>
        </template>
      </IuBook>
    </div>

    <div v-else-if="kind === 'lamp'" class="scaled-box" style="width: 230px; height: 140px; border-radius: 10px; overflow: hidden">
      <IuLampEffect style="min-height: 140px">
        <h5 style="z-index: 10; text-align: center; font-size: 12px; font-weight: 650; color: #fff; margin: 0">Lamp</h5>
      </IuLampEffect>
    </div>

    <div v-else-if="kind === 'iphone'" class="scaled-box" style="width: 140px; height: 150px; display: grid; place-items: center; overflow: hidden">
      <IuIPhone15ProMockup :width="120" :height="244" style="transform: scale(0.62)">
        <img src="https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=240" alt="" style="width: 100%; height: 100%; object-fit: cover">
      </IuIPhone15ProMockup>
    </div>

    <div v-else-if="kind === 'bslider'" class="scaled-box" style="width: 210px; height: 80px; display: grid; place-items: center">
      <IuBalanceSlider :initial-value="50" style="width: 190px" />
    </div>

    <div v-else-if="kind === 'atesti'" class="scaled-box" style="width: 230px; height: 150px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; padding: 12px">
      <IuAnimatedTestimonials
        :testimonials="[{ quote: '交付速度提升三倍。', name: '张伟', designation: '前端负责人', image: avatar('Zhang Wei', '#6366f1') }]"
        style="pointer-events: none"
      />
    </div>

    <div v-else-if="kind === 'cstack'" class="scaled-box" style="width: 210px; height: 140px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden">
      <IuCardStack :total-cards="2" style="height: 200%">
        <IuCardStackItem :index="0" class="rounded-lg border p-3" style="font-size: 12px; background: var(--surface)">第一张</IuCardStackItem>
        <IuCardStackItem :index="1" class="rounded-lg border p-3" style="font-size: 12px; background: var(--surface)">第二张</IuCardStackItem>
      </IuCardStack>
    </div>

    <div v-else-if="kind === 'ibadge'" class="scaled-box" style="width: 210px; height: 140px; display: grid; place-items: flex-end; padding: 16px; box-sizing: border-box">
      <IuImagesBadge
        text="作品"
        :images="['https://images.unsplash.com/photo-1677696791882-47344f63ceb5?w=240', 'https://images.unsplash.com/photo-1677696792100-3b0a6f0c3a27?w=240']"
        style="pointer-events: none"
      />
    </div>

    <span v-else-if="kind === 'htext'" style="font-size: 13px; display: inline-block">
      <IuHighlightText highlight-color="hsl(25 90% 80%)">高亮涂色文字</IuHighlightText>
    </span>

    <div v-else-if="kind === 'agrid'" class="scaled-box" style="width: 220px; height: 150px; display: grid; place-items: center">
      <IuAnimateGrid
        :cards="[{ logo: 'https://picsum.photos/seed/g1/160' }, { logo: 'https://picsum.photos/seed/g2/160' }, { logo: 'https://picsum.photos/seed/g3/160' }, { logo: 'https://picsum.photos/seed/g4/160' }]"
        style="width: 200px"
      />
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

    <!-- MultiStepLoader 真实全屏加载层（fixed 遮罩） -->
    <IuMultiStepLoader
      v-if="kind === 'mload'"
      :steps="[
        { text: '连接数据库', afterText: '数据库已连接' },
        { text: '初始化模型', afterText: '模型就绪' },
        { text: '启动服务', afterText: '服务运行中' },
      ]"
      :loading="mloadOpen"
      @close="mloadOpen = false"
      @complete="mloadOpen = false"
    />
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
