<script setup lang="ts">
import {
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
    <p class="pg-category-desc">3D 透视、聚光灯、翻转与眩光卡片</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuCard3DContainer / Body / Item 3D 透视卡片</p>
      <p class="pg-demo-props">
        translateX/Y/Z · rotateX/Y/Z —— 悬停卡片，内部元素按 Z 轴分层浮起
      </p>
      <div class="pg-demo-stage">
        <IuCard3DContainer>
          <IuCard3DBody class="bg-gray-50 dark:bg-black">
            <IuCard3DItem :translate-z="200" class="text-2xl font-bold"> 3D Card </IuCard3DItem>
            <IuCard3DItem as="p" :translate-z="100" class="mt-2 max-w-[24rem] text-sm opacity-70">
              悬停时整卡跟随鼠标旋转，元素沿 Z 轴分层抬升，形成景深效果。
            </IuCard3DItem>
            <IuCard3DItem :translate-z="150" class="mt-4">
              <div class="pg-stage-box h-40 w-64">
                <div class="pg-gradient-art" />
              </div>
            </IuCard3DItem>
            <IuCard3DItem
              :translate-z="60"
              class="mt-4 inline-flex rounded-full bg-black px-4 py-2 text-xs text-white dark:bg-white dark:text-black"
            >
              Try Me
            </IuCard3DItem>
          </IuCard3DBody>
        </IuCard3DContainer>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuCardSpotlight 聚光灯卡片</p>
      <p class="pg-demo-props">gradientSize · gradientColor · gradientOpacity · slotClass</p>
      <div class="pg-demo-stage">
        <div class="w-full max-w-md">
          <IuCardSpotlight class="min-h-56 p-6" :gradient-size="240">
            <h4 class="text-lg font-bold">Spotlight 卡片</h4>
            <p class="pg-muted-text mt-2">鼠标在卡片上移动，会有一道聚光灯跟随光斑。</p>
          </IuCardSpotlight>
        </div>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuFlipCard 翻转卡片</p>
      <p class="pg-demo-props">rotate（x / y）· 默认插槽 + back 插槽</p>
      <div class="pg-demo-stage">
        <IuFlipCard>
          <div class="pg-stage-box h-full w-full">
            <div class="pg-gradient-art" />
          </div>
          <template #back>
            <div class="flex h-full flex-col justify-center">
              <p class="text-base font-semibold">背面内容</p>
              <p class="mt-2 text-xs opacity-70">鼠标移开自动翻回正面。</p>
            </div>
          </template>
        </IuFlipCard>
        <IuFlipCard rotate="x">
          <div class="pg-stage-box h-full w-full">
            <div class="pg-gradient-art" />
          </div>
          <template #back>
            <div class="flex h-full flex-col justify-center">
              <p class="text-base font-semibold">上下翻转</p>
            </div>
          </template>
        </IuFlipCard>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuGlareCard 眩光全息卡片</p>
      <p class="pg-demo-props">class —— 移动鼠标感受全息箔纸眩光</p>
      <div class="pg-demo-stage">
        <IuGlareCard>
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
