<script setup lang="ts">
import { ref } from 'vue'
import {
  IuDialog,
  IuShimmerButton,
  IuAnimatedModal,
  IuAnimatedModalTrigger,
  IuAnimatedModalBody,
  IuAnimatedModalContent,
  IuAnimatedModalFooter,
  IuAnimatedTooltip,
  IuMarquee,
  IuBentoGrid,
  IuBentoGridItem,
  IuStatistic,
} from 'inspira-ui-components'
import { avatar } from '../utils/avatar'

const show = ref(false)
const showDelete = ref(false)
const open = ref(false)

// 模拟提交接口：传给 IuDialog 的 confirm，loading 与关闭时机全自动
async function submitOrder() {
  await new Promise((r) => setTimeout(r, 1500))
  console.log('订单已提交')
}

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
    <h3 class="pg-category-title">交互与数据 Misc</h3>
    <p class="pg-category-desc">IuDialog / IuStatistic —— 传配置即用，插槽兜底</p>

    <div class="pg-demo">
      <p class="pg-demo-title">IuDialog 弹窗（推荐）</p>
      <p class="pg-demo-props">
        v-model + title + :confirm 函数 —— loading、防重复提交、关闭时机全自动
      </p>
      <div class="pg-demo-stage">
        <IuShimmerButton size="default" @click="show = true">提交订单</IuShimmerButton>
        <IuShimmerButton variant="light" @click="showDelete = true">删除（danger）</IuShimmerButton>
      </div>

      <IuDialog
        v-model="show"
        title="确认提交订单"
        description="提交后 30 分钟内可撤销，确认继续吗？"
        :confirm="submitOrder"
        width="440px"
      >
        <div class="rounded-lg bg-neutral-50 p-4 text-sm dark:bg-neutral-900">
          订单金额：<b>¥328.50</b>　·　支付方式：余额支付
        </div>
      </IuDialog>

      <IuDialog
        v-model="showDelete"
        title="删除这条记录？"
        description="删除后无法恢复，请谨慎操作。"
        confirm-text="删 除"
        danger
        @confirm="console.log('deleted')"
      />
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuAnimatedModal 五件套（高级模式）</p>
      <p class="pg-demo-props">需要完全自定义弹窗结构 / 多区域布局时使用</p>
      <div class="pg-demo-stage">
        <IuAnimatedModal v-model:open="open">
          <IuAnimatedModalTrigger
            class="rounded-lg border border-dashed px-4 py-2 text-sm"
          >
            打开五件套弹窗
          </IuAnimatedModalTrigger>
          <IuAnimatedModalBody>
            <IuAnimatedModalContent>
              <h4 class="text-lg font-bold m-0">完全自定义</h4>
              <p class="pg-muted-text mt-2">
                Trigger / Body / Content / Footer 各自独立，可任意组合排版。
              </p>
            </IuAnimatedModalContent>
            <IuAnimatedModalFooter>
              <button class="pg-btn" type="button" @click="open = false">关闭</button>
            </IuAnimatedModalFooter>
          </IuAnimatedModalBody>
        </IuAnimatedModal>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuStatistic 指标卡</p>
      <p class="pg-demo-props">label · value · prefix · suffix · trend —— 数字滚动 + 涨跌幅一行配置</p>
      <div class="pg-demo-stage pg-gap-xl">
        <IuStatistic label="今日营收" :value="32850.6" prefix="¥" :trend="12.5" trend-label="较昨日" />
        <IuStatistic label="新增用户" :value="1284" :trend="-3.2" trend-label="较上周" />
        <IuStatistic label="转化率" :value="98.7" suffix="%" :decimals="1" :duration="800" />
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuAnimatedTooltip 悬浮名片</p>
      <p class="pg-demo-props">items: { id, name, designation, image }[]</p>
      <div class="pg-demo-stage">
        <div class="flex">
          <IuAnimatedTooltip :items="tooltipItems" />
        </div>
      </div>
    </div>

    <div class="pg-demo">
      <p class="pg-demo-title">IuMarquee 跑马灯</p>
      <p class="pg-demo-props">speed（秒/圈）· gap · reverse · pauseOnHover · vertical</p>
      <div class="pg-demo-stage col">
        <IuMarquee class="rounded-xl border" :speed="20" gap="0.5rem" pause-on-hover>
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
            <template #title>22 个组件</template>
            <template #description>
              按钮统一 size/loading 体系，IuDialog 传函数即用。
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
              app.use() 全量注册或具名导入按需使用。
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
              覆盖 --iu-* 变量即可换肤，.dark 类即启用暗色。
            </template>
          </IuBentoGridItem>
        </IuBentoGrid>
      </div>
    </div>
  </section>
</template>
