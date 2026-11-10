<script setup lang="ts">
import { ref } from 'vue'
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
    <p class="prose">在已有 Vue 3 项目中执行以下命令：</p>
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
    <p class="prose">组件导出自带 install 方法，支持整体 app.use 或单个组件 app.use。</p>
    <CodeBlock :code="globalCode" lang="ts" />

    <h2 id="step4" class="h2">04 · 验证与排错</h2>
    <div class="hint">
      <strong>常见问题：</strong>
      组件未注册 → 检查是否执行 app.use(InspiraUI) 或具名导入；
      样式丢失 → 确认引入了 dist/index.css；
      类型无提示 → 确保 TS 项目包含包自带的 d.ts（随 node_modules 自动生效）。
    </div>
    <router-link to="/component/shimmer-button" class="btn primary">
      前往第一个组件
    </router-link>
  </DocsShell>
</template>
