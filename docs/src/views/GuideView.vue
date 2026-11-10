<script setup lang="ts">
import { ref } from 'vue'
import UiIcon from '../components/UiIcon.vue'
import DocsShell from '../components/DocsShell.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { PACKAGE_NAME } from '../data/registry'

const term = ref<'pnpm' | 'npm' | 'yarn'>('pnpm')

const installCommands: Record<string, string> = {
  pnpm: `pnpm add ${PACKAGE_NAME}`,
  npm: `npm install ${PACKAGE_NAME}`,
  yarn: `yarn add ${PACKAGE_NAME}`,
}

const tocLinks: Array<[string, string]> = [
  ['step1', '安装组件库'],
  ['step2', '按需引入'],
  ['step3', '全局注册'],
  ['step4', '验证与排错'],
]

const onDemandCode = `<script setup lang="ts">
import { IuShimmerButton, IuNumberTicker } from '${PACKAGE_NAME}'
import '${PACKAGE_NAME}/dist/index.css'
<\/script>

<template>
  <IuShimmerButton>立即开始</IuShimmerButton>
  <IuNumberTicker :value="1280" :decimal-places="0" />
</template>`

const globalCode = `import { createApp } from 'vue'
import App from './App.vue'
import InspiraUI from '${PACKAGE_NAME}'
import '${PACKAGE_NAME}/dist/index.css'

createApp(App).use(InspiraUI).mount('#app')
// 全部组件以 Iu 前缀注册：<IuShimmerButton /> 等可直接在模板中使用`
</script>

<template>
  <DocsShell active="guide" :toc-links="tocLinks">
    <div class="page-heading">
      <h1>快速开始</h1>
      <p>以最小化的 Vue 3 + Vite 项目为例，三步接入组件库。此页面按开发者实际使用顺序编排，不把教程拆成过多零碎页面。</p>
    </div>

    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div><b>安装依赖</b><p>选择 npm / pnpm / yarn</p></div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div><b>引入组件</b><p>支持全局注册与按需使用</p></div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div><b>验证效果</b><p>可直接复制运行的示例</p></div>
      </div>
    </div>

    <h2 id="step1" class="h2">01 · 安装组件库</h2>
    <p class="prose">
      在已有 Vue 3 项目中执行以下命令。包名为 <code style="font-size: 12px; color: var(--primary)">{{ PACKAGE_NAME }}</code>（与仓库 packages/inspira-ui 的 package.json name 一致）。
    </p>
    <div class="term-tabs">
      <button
        v-for="t in ['pnpm', 'npm', 'yarn']"
        :key="t"
        type="button"
        :class="{ active: term === t }"
        @click="term = t as 'pnpm' | 'npm' | 'yarn'"
      >
        {{ t }}
      </button>
    </div>
    <CodeBlock :code="installCommands[term]" lang="bash" />

    <h2 id="step2" class="h2">02 · 推荐：按需引入</h2>
    <p class="prose">直接导入需要使用的组件与样式，避免将未使用的组件带入最终构建。</p>
    <CodeBlock :code="onDemandCode" lang="vue" />

    <h2 id="step3" class="h2">03 · 或者：全局注册</h2>
    <p class="prose">更适合快速验证或统一注入场景。组件导出自带 install 方法（Element Plus 同款模式），支持整体 app.use 与单个组件 app.use。</p>
    <CodeBlock :code="globalCode" lang="ts" />

    <h2 id="step4" class="h2">04 · 验证与排错</h2>
    <div class="hint">
      <strong>验收前检查：</strong>
      组件可从包入口具名导出（31 个 Iu* 导出）；样式经 dist/index.css 引入后组件即拥有完整外观（自包含 CSS，无需 Tailwind）；
      类型声明随包分发（dist/index.d.ts + GlobalComponents）；动画基于 motion-v 与 CSS 运行。
      若示例 API 与真实代码不一致，以源码为准修正文档。
    </div>
    <router-link to="/component/shimmer-button" class="btn primary">
      前往第一个组件
    </router-link>
  </DocsShell>
</template>
