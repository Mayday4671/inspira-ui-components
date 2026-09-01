<script setup lang="ts">
import { ref } from 'vue'
import {
  IuAnimatedModal,
  IuAnimatedModalTrigger,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
  IuAnimatedTooltip,
  IuMarquee,
  IuBentoGrid,
  IuBentoGridItem,
} from 'inspira-ui-components'
import { avatar } from '../utils/avatar'

const open = ref(false)

const tooltipItems = [
  { id: 1, name: '张伟', designation: '前端工程师', image: avatar('Zhang Wei', '#6366f1') },
  { id: 2, name: '李娜', designation: 'UI 设计师', image: avatar('Li Na', '#ec4899') },
  { id: 3, name: '王强', designation: '架构师', image: avatar('Wang Qiang', '#14b8a6') },
  { id: 4, name: '赵敏', designation: '产品经理', image: avatar('Zhao Min', '#f59e0b') },
]

const marqueeItems = ['Vue 3.5', 'TypeScript', 'Vite 7', 'Tailwind v4 编译', 'motion-v', '零依赖接入']
</script>

<template>
  <section id="misc" class="pg-category">
    <h3 class="pg-category-title">交互 Misc</h3>
    <p class="pg-category-desc">模态框、悬浮名片、跑马灯与 Bento 网格</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuAnimatedModal 动画模态框</p>
      <p class="pg-demo-props">
        v-model:open（受控）· defaultOpen · closeOnEsc / closeOnOutside · 五件套组合
      </p>
      <div class="pg-demo-stage">
        <IuAnimatedModal v-model:open="open">
          <IuAnimatedModalTrigger
            class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            打开模态框
          </IuAnimatedModalTrigger>
          <IuAnimatedModalBody>
            <IuAnimatedModalContent>
              <h4 class="text-xl font-bold">受控模态框</h4>
              <p class="pg-muted-text mt-3">
                通过 v-model:open 双向绑定；支持 Esc 关闭、点击遮罩关闭、滚动锁定与焦点管理。
              </p>
            </IuAnimatedModalContent>
            <IuAnimatedModalFooter>
              <button class="pg-btn" type="button" @click="open = false">取消</button>
              <button
                class="pg-btn"
                type="button"
                style="background: #18181b; color: #fafafa; border-color: #18181b"
                @click="open = false"
              >
                确定
              </button>
            </IuAnimatedModalFooter>
          </IuAnimatedModalBody>
        </IuAnimatedModal>

        <IuAnimatedModal>
          <IuAnimatedModalTrigger
            class="rounded-lg border border-dashed px-4 py-2 text-sm"
          >
            非受控 + 插槽参数
          </IuAnimatedModalTrigger>
          <IuAnimatedModalBody :show-close="true">
            <IuAnimatedModalContent>
              <h4 class="text-lg font-bold">作用域插槽</h4>
              <p class="pg-muted-text mt-2">默认插槽提供 open / openModal / closeModal / toggle。</p>
            </IuAnimatedModalContent>
            <IuAnimatedModalFooter>
              <button class="pg-btn" type="button">知道了</button>
            </IuAnimatedModalFooter>
          </IuAnimatedModalBody>
        </IuAnimatedModal>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuAnimatedTooltip 悬浮名片</p>
      <p class="pg-demo-props">items: { id, name, designation, image }[] —— 悬停头像查看名片</p>
      <div class="pg-demo-stage">
        <div class="flex">
          <IuAnimatedTooltip :items="tooltipItems" />
        </div>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuMarquee 跑马灯</p>
      <p class="pg-demo-props">reverse · pauseOnHover · vertical · repeat</p>
      <div class="pg-demo-stage col">
        <IuMarquee class="rounded-xl border" pause-on-hover>
          <span
            v-for="item in marqueeItems"
            :key="item"
            class="mx-2 rounded-full border px-4 py-1.5 text-sm"
          >
            {{ item }}
          </span>
        </IuMarquee>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuBentoGrid / Item Bento 网格</p>
      <p class="pg-demo-props">header / icon / title / description 插槽</p>
      <div class="pg-demo-stage col">
        <IuBentoGrid>
          <IuBentoGridItem>
            <template #header>
              <div class="flex h-24 items-center justify-center rounded-lg bg-blue-500/10 text-3xl">
                🧩
              </div>
            </template>
            <template #title>20 个精选组件</template>
            <template #description>
              按钮 / 卡片 / 文本动画 / 交互 / 背景五大类，全部轻量无 WebGL 依赖。
            </template>
          </IuBentoGridItem>
          <IuBentoGridItem>
            <template #header>
              <div class="flex h-24 items-center justify-center rounded-lg bg-emerald-500/10 text-3xl">
                📦
              </div>
            </template>
            <template #title>npm 包直接调用</template>
            <template #description>
              app.use() 全量注册或具名导入按需使用，tree-shaking 友好。
            </template>
          </IuBentoGridItem>
          <IuBentoGridItem>
            <template #header>
              <div class="flex h-24 items-center justify-center rounded-lg bg-amber-500/10 text-3xl">
                🎨
              </div>
            </template>
            <template #title>CSS 变量主题</template>
            <template #description>
              覆盖 --iu-* 变量即可换肤，暗色模式加 .dark 类即启用。
            </template>
          </IuBentoGridItem>
        </IuBentoGrid>
      </div>
    </div>
  </section>
</template>
