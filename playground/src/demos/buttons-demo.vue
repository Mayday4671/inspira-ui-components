<script setup lang="ts">
import {
  IuInteractiveHoverButton,
  IuRainbowButton,
  IuRippleButton,
  IuGradientButton,
  IuShimmerButton,
} from 'inspira-ui-components'
</script>

<template>
  <section id="buttons" class="pg-category">
    <h3 class="pg-category-title">按钮 Buttons</h3>
    <p class="pg-category-desc">悬停 / 点击触发动效的 5 款按钮</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuInteractiveHoverButton 交互悬停按钮</p>
      <p class="pg-demo-props">text · class</p>
      <div class="pg-demo-stage">
        <IuInteractiveHoverButton text="了解更多" />
        <IuInteractiveHoverButton text="自定义样式" class="rounded-none text-sm" />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuRainbowButton 彩虹按钮</p>
      <p class="pg-demo-props">is · speed · 默认插槽</p>
      <div class="pg-demo-stage">
        <IuRainbowButton>Get Unlimited Access</IuRainbowButton>
        <IuRainbowButton :speed="5" class="h-10">慢速彩虹</IuRainbowButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuRippleButton 涟漪按钮</p>
      <p class="pg-demo-props">rippleColor · duration · click 事件</p>
      <div class="pg-demo-stage">
        <IuRippleButton>默认涟漪</IuRippleButton>
        <IuRippleButton ripple-color="#7c3aed" :duration="900">紫色涟漪</IuRippleButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuGradientButton 渐变流光按钮</p>
      <p class="pg-demo-props">colors · duration · borderWidth · borderRadius · blur · bgColor</p>
      <div class="pg-demo-stage">
        <IuGradientButton>
          <span class="text-white">Gradient Button</span>
        </IuGradientButton>
        <IuGradientButton
          :colors="['#22d3ee', '#818cf8', '#e879f9', '#22d3ee']"
          :duration="1500"
          bg-color="#0f172a"
        >
          <span class="text-white">赛博配色</span>
        </IuGradientButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuShimmerButton 微光按钮</p>
      <p class="pg-demo-props">shimmerColor · shimmerDuration · background</p>
      <div class="pg-demo-stage">
        <IuShimmerButton>Shimmer Button</IuShimmerButton>
        <IuShimmerButton shimmer-color="#a5f3fc" background="rgba(15,23,42,1)" shimmer-duration="2s">
          青色微光
        </IuShimmerButton>
      </div>
    </div>
  </section>
</template>
