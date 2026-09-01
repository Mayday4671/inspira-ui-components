<script setup lang="ts">
import { ref } from 'vue'
import {
  IuInteractiveHoverButton,
  IuRainbowButton,
  IuRippleButton,
  IuGradientButton,
  IuShimmerButton,
} from 'inspira-ui-components'

const loading = ref(false)

function fakeSubmit() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <section id="buttons" class="pg-category">
    <h3 class="pg-category-title">按钮 Buttons</h3>
    <p class="pg-category-desc">
      全部按钮共享同一套 API：size（small/default/large/xl）· loading · disabled · block
    </p>

    <div class="pg-demo">
      <p class="pg-demo-title">统一尺寸体系</p>
      <p class="pg-demo-props">size="small | default | large | xl"</p>
      <div class="pg-demo-stage pg-align-end">
        <IuShimmerButton size="small">Small</IuShimmerButton>
        <IuShimmerButton>Default</IuShimmerButton>
        <IuShimmerButton size="large">Large</IuShimmerButton>
        <IuShimmerButton size="xl">XL</IuShimmerButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">加载 / 禁用 / 块级</p>
      <p class="pg-demo-props">loading 自动转圈并防重复点击 · disabled · block 占满一行</p>
      <div class="pg-demo-stage col">
        <div class="pg-demo-stage">
          <IuShimmerButton :loading="loading" @click="fakeSubmit">
            {{ loading ? '处理中…' : '提交订单' }}
          </IuShimmerButton>
          <IuRainbowButton loading>加载中</IuRainbowButton>
          <IuGradientButton disabled>禁用状态</IuGradientButton>
        </div>
        <IuRippleButton block>Block 按钮（占满一行）</IuRippleButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuShimmerButton 主题预设</p>
      <p class="pg-demo-props">variant="dark | light"（dark 配亮色页面，light 配暗色页面）</p>
      <div class="pg-demo-stage">
        <IuShimmerButton>Dark 微光</IuShimmerButton>
        <IuShimmerButton variant="light">Light 微光</IuShimmerButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuGradientButton 配色预设</p>
      <p class="pg-demo-props">variant="rainbow | ocean | sunset | candy"</p>
      <div class="pg-demo-stage">
        <IuGradientButton variant="rainbow"><span class="text-white">Rainbow</span></IuGradientButton>
        <IuGradientButton variant="ocean"><span class="text-white">Ocean</span></IuGradientButton>
        <IuGradientButton variant="sunset"><span class="text-white">Sunset</span></IuGradientButton>
        <IuGradientButton variant="candy"><span class="text-white">Candy</span></IuGradientButton>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">更多按钮</p>
      <p class="pg-demo-props">text 属性 / speed / rippleColor 等仍可细调</p>
      <div class="pg-demo-stage">
        <IuInteractiveHoverButton text="了解更多" />
        <IuRainbowButton :speed="4">Rainbow (4s)</IuRainbowButton>
        <IuRippleButton ripple-color="#7c3aed" :duration="900">紫色涟漪</IuRippleButton>
        <IuInteractiveHoverButton size="large" text="大号悬停" />
      </div>
    </div>
  </section>
</template>
