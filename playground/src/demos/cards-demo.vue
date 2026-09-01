<script setup lang="ts">
import {
  IuCard3D,
  IuCard3DContainer,
  IuCard3DBody,
  IuCard3DItem,
  IuCardSpotlight,
  IuFlipCard,
  IuGlareCard,
} from 'inspira-ui-components'
</script>

<template>
  <section id="cards" class="pg-category">
    <h3 class="pg-category-title">卡片 Cards</h3>
    <p class="pg-category-desc">快捷模式一行出卡；需要精细控制时用插槽 / 三件套</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuCard3D 快捷模式</p>
      <p class="pg-demo-props">title · description · image · cta —— 一行代码出一张 3D 卡片</p>
      <div class="pg-demo-stage">
        <IuCard3D
          title="Nebula 观测站"
          description="悬停整卡跟随鼠标旋转，标题与背景沿 Z 轴分层浮起。"
          cta="立即探索"
        />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuCard3D 三件套（高级模式）</p>
      <p class="pg-demo-props">IuCard3DContainer / Body / Item，逐元素控制 translate / rotate</p>
      <div class="pg-demo-stage">
        <IuCard3DContainer>
          <IuCard3DBody class="bg-gray-50 dark:bg-black">
            <IuCard3DItem :translate-z="200" class="text-2xl font-bold"> 3D Card </IuCard3DItem>
            <IuCard3DItem as="p" :translate-z="100" class="mt-2 max-w-[24rem] text-sm opacity-70">
              需要自定义分层时使用三件套，每个元素可独立设置变换。
            </IuCard3DItem>
            <IuCard3DItem :translate-z="150" class="mt-4">
              <div class="pg-stage-box h-40 w-64">
                <div class="pg-gradient-art" />
              </div>
            </IuCard3DItem>
          </IuCard3DBody>
        </IuCard3DContainer>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuCardSpotlight 快捷模式</p>
      <p class="pg-demo-props">title · description —— 默认带内边距，也可以用插槽完全自定义</p>
      <div class="pg-demo-stage">
        <div class="w-full max-w-md">
          <IuCardSpotlight title="聚光灯卡片" description="鼠标移动时，一道聚光灯跟随光斑。" />
        </div>
        <div class="w-full max-w-xs">
          <IuCardSpotlight class="min-h-40" :padded="false">
            <div class="p-6">
              <p class="m-0 font-bold">插槽模式</p>
              <p class="pg-muted-text mt-2 mb-0">传默认插槽即完全接管内容。</p>
            </div>
          </IuCardSpotlight>
        </div>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuFlipCard 快捷模式</p>
      <p class="pg-demo-props">backTitle · backDescription —— 正面自动使用渐变底图</p>
      <div class="pg-demo-stage">
        <IuFlipCard back-title="背面标题" back-description="鼠标移开自动翻回正面。" />
        <IuFlipCard
          rotate="x"
          back-title="上下翻转"
          back-description="rotate='x' 沿水平轴翻转。"
        />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuGlareCard</p>
      <p class="pg-demo-props">image · width · radius —— 移动鼠标感受全息箔纸眩光</p>
      <div class="pg-demo-stage">
        <IuGlareCard :width="280" :radius="36">
          <div class="relative h-full w-full">
            <div class="pg-gradient-art" />
            <div class="absolute bottom-4 left-4 text-sm font-semibold text-white">
              Glare Card
            </div>
          </div>
        </IuGlareCard>
      </div>
    </div>
  </section>
</template>
