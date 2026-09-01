<script setup lang="ts">
import { ref } from 'vue'
import {
  IuNumberTicker,
  IuTypewriterText,
  IuFlipWords,
  IuTextGenerateEffect,
  IuBlurReveal,
} from 'inspira-ui-components'

const ticker = ref(98765)
</script>

<template>
  <section id="text" class="pg-category">
    <h3 class="pg-category-title">文本动画 Text</h3>
    <p class="pg-category-desc">数字滚动、打字机、词语轮播与模糊揭示</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuNumberTicker 数字滚动</p>
      <p class="pg-demo-props">value · direction · duration · decimalPlaces · transition</p>
      <div class="pg-demo-stage">
        <span class="text-4xl font-bold">
          <IuNumberTicker :value="ticker" :decimal-places="0" :duration="1500" />
        </span>
        <button class="pg-btn" type="button" @click="ticker += 1379">value +1379</button>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuTypewriterText 打字机</p>
      <p class="pg-demo-props">text（string | string[]）· speed · waitTime · loop · showCursor</p>
      <div class="pg-demo-stage">
        <IuTypewriterText
          :text="['构建你自己的组件库', '像 Element Plus 一样使用', '通过 npm 包直接调用']"
          :speed="70"
          class="text-xl font-semibold"
        />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuFlipWords 词语轮播</p>
      <p class="pg-demo-props">words · duration · animationStart / animationComplete 事件</p>
      <div class="pg-demo-stage">
        <p class="text-xl">
          一次引入，
          <IuFlipWords :words="['全局注册', '按需引入', 'npm 包调用']" class="font-bold text-blue-500" />
          任意组件
        </p>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuTextGenerateEffect 文本生成</p>
      <p class="pg-demo-props">words · filter · duration · delay</p>
      <div class="pg-demo-stage col">
        <IuTextGenerateEffect
          words="Inspira UI 风格组件库，参考 Element Plus 的架构模式打造，开箱即用。"
          class="text-lg font-medium"
          :duration="0.6"
        />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuBlurReveal 模糊揭示</p>
      <p class="pg-demo-props">duration · delay（stagger 系数）· blur · yOffset</p>
      <div class="pg-demo-stage col">
        <IuBlurReveal :duration="0.8" :delay="0.3">
          <p class="text-lg font-bold">第一行：进入视口时模糊淡入</p>
          <p class="pg-muted-text">第二行：按 delay 系数依次错落出现</p>
          <p class="pg-muted-text">第三行：形成 stagger 揭示节奏</p>
        </IuBlurReveal>
      </div>
    </div>
  </section>
</template>
