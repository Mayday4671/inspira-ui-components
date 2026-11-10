<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useRoute } from 'vue-router'
import UiIcon from '../components/UiIcon.vue'
import DocsShell from '../components/DocsShell.vue'
import ComponentDemo from '../components/ComponentDemo.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { COMPONENTS, getComponent, PACKAGE_NAME } from '../data/registry'
import { toast } from '../composables/toast'

const route = useRoute()

const meta = computed(() => getComponent(route.params.slug as string)!)

function cloneState(): Record<string, any> {
  return JSON.parse(JSON.stringify(meta.value.demoState))
}

const state = reactive<Record<string, any>>(cloneState())
let DEFAULT_STATE = cloneState()

const resetKey = ref(0)
const showSource = ref(false)

/** SPA 内跳转（侧栏 / 搜索 / 上一个组件）时路由组件被复用，必须显式重建演示状态 */
watch(
  () => route.params.slug,
  () => {
    for (const key of Object.keys(state)) delete state[key]
    Object.assign(state, cloneState())
    DEFAULT_STATE = cloneState()
    resetKey.value++
    showSource.value = false
  },
)

function resetPreview() {
  Object.assign(state, JSON.parse(JSON.stringify(DEFAULT_STATE)))
  resetKey.value++
  toast('演示参数已重置')
}

const code = computed(() => meta.value.demoCode(state))

const categoryIcon = computed(
  () =>
    ({ 按钮: 'bolt', 卡片: 'box', 文本: 'type', 交互: 'mouse', 数据: 'chart', 背景: 'layers' })[
      meta.value.category
    ] ?? 'bolt',
)

const tocLinks: Array<[string, string]> = [
  ['section-preview', '实时演示'],
  ['section-install', '安装与引入'],
  ['section-api', 'API 属性'],
  ['section-accessibility', '交互与无障碍'],
]

const nextComponent = computed(() => {
  const i = COMPONENTS.findIndex((c) => c.slug === meta.value.slug)
  return COMPONENTS[(i + 1) % COMPONENTS.length]!
})


function onControlEnter(e: KeyboardEvent) {
  if (e.key === 'Enter') (e.target as HTMLElement).blur()
}

</script>

<template>
  <DocsShell active="components" :toc-links="tocLinks">
    <div class="crumbs">
      <router-link to="/home">首页</router-link>
      <UiIcon name="chevron" small />
      <router-link to="/components">组件文档</router-link>
      <UiIcon name="chevron" small />
      <span>{{ meta.category }}</span>
    </div>

    <div class="component-title-row">
      <div class="component-symbol"><UiIcon :name="categoryIcon" /></div>
      <div class="page-heading">
        <h1>{{ meta.name }} <span class="dot-accent">·</span> {{ meta.zh }}</h1>
        <p>{{ meta.desc }}。以统一 API 封装动效体验，支持在 Vue 3 项目中直接使用。</p>
        <div class="heading-tags">
          <span class="neutral-tag">{{ meta.category }}</span>
          <span class="neutral-tag">Vue 3</span>
          <span class="neutral-tag">TypeScript</span>
          <span v-if="meta.recommended" class="tag">推荐</span>
        </div>
      </div>
    </div>

    <!-- 实时演示 -->
    <h2 id="section-preview" class="h2">
      实时演示 <span class="muted-sm" style="font-weight: 400">Live Preview</span>
    </h2>
    <div class="browser-panel">
      <div class="panel-toolbar">
        <span class="panel-label">基础示例</span>
        <span class="tag"><span class="pill-dot"></span> 可交互</span>
        <span class="toolbar-spacer"></span>
        <button class="btn sm ghost" type="button" title="重置效果" @click="resetPreview">
          <UiIcon name="rotate" small /> 重置
        </button>
        <button class="btn sm ghost" type="button" @click="showSource = !showSource">
          <UiIcon name="code" small /> {{ showSource ? '隐藏代码' : '查看代码' }}
        </button>
      </div>
      <div class="preview-stage">
        <ComponentDemo :key="meta.slug" :meta="meta" :state="state" :reset-key="resetKey" />
      </div>

      <div v-if="meta.controls.length" class="props-panel">
        <!-- 与原型一致：switch 类控件合并进「交互状态」一格，其余每格一个控件 -->
        <template v-for="ctl in meta.controls.filter((c) => c.kind !== 'switch')" :key="ctl.key">
          <div>
            <label class="control-label" :for="`ctl-${ctl.key}`">{{ ctl.label }}</label>

            <select
              v-if="ctl.kind === 'select'"
              :id="`ctl-${ctl.key}`"
              v-model="state[ctl.key]"
              class="select"
            >
              <option v-for="opt in ctl.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>

            <input
              v-else-if="ctl.kind === 'text'"
              :id="`ctl-${ctl.key}`"
              v-model="state[ctl.key]"
              class="text-input"
              type="text"
              maxlength="30"
              @keydown="onControlEnter"
            />

            <input
              v-else-if="ctl.kind === 'number'"
              :id="`ctl-${ctl.key}`"
              v-model.number="state[ctl.key]"
              class="text-input"
              type="number"
              :step="ctl.step ?? 1"
            />
          </div>
        </template>

        <div v-if="meta.controls.some((c) => c.kind === 'switch')">
          <span class="control-label">交互状态</span>
          <div class="switch-row">
            <label v-for="ctl in meta.controls.filter((c) => c.kind === 'switch')" :key="ctl.key" class="switch-label" :for="`ctl-${ctl.key}`">
              <input :id="`ctl-${ctl.key}`" v-model="state[ctl.key]" type="checkbox" /> {{ ctl.label }}
            </label>
          </div>
        </div>
      </div>

      <div v-if="showSource" style="border-top: 1px solid var(--border)">
        <CodeBlock :code="code" lang="vue" />
      </div>

      <div class="preview-foot">
        <UiIcon name="mouse" small />
        {{
          meta.controls.length
            ? '修改参数，预览与示例代码会同步更新；代码可直接复制运行。'
            : '此处展示组件的实际交互，全部由真实组件渲染。'
        }}
      </div>
    </div>

    <!-- 安装与引入 -->
    <h2 id="section-install" class="h2">安装与引入</h2>
    <p class="prose">
      在你的 Vue 3 项目里安装组件库并引入样式。样式为编译后的自包含 CSS，使用方无需安装 Tailwind。
    </p>
    <CodeBlock :code="`pnpm add ${PACKAGE_NAME}`" lang="bash" />
    <CodeBlock :code="code" lang="vue" />
    <div v-if="meta.note" class="hint"><strong>提示</strong>：{{ meta.note }}</div>

    <!-- API -->
    <h2 id="section-api" class="h2">API 属性</h2>
    <p class="prose">以下属性、类型与默认值均来自组件源码的真实定义（packages/inspira-ui/src）。</p>
    <div style="overflow-x: auto">
      <table class="api-table">
        <thead>
          <tr>
            <th style="width: 20%">属性</th>
            <th>说明</th>
            <th style="width: 30%">类型</th>
            <th style="width: 12%">默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in meta.apiRows" :key="row.prop">
            <td><code>{{ row.prop }}</code></td>
            <td>{{ row.desc }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.def }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <template v-if="meta.eventRows?.length">
      <h3 class="h3">事件</h3>
      <div style="overflow-x: auto">
        <table class="api-table">
          <thead>
            <tr>
              <th style="width: 20%">事件</th>
              <th>说明</th>
              <th style="width: 30%">签名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in meta.eventRows" :key="row.prop">
              <td><code>{{ row.prop }}</code></td>
              <td>{{ row.desc }}</td>
              <td>{{ row.type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-if="meta.slotRows?.length">
      <h3 class="h3">插槽</h3>
      <div style="overflow-x: auto">
        <table class="api-table">
          <thead>
            <tr>
              <th style="width: 20%">插槽</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in meta.slotRows" :key="row.prop">
              <td><code>{{ row.prop }}</code></td>
              <td>{{ row.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- 交互与无障碍 -->
    <h2 id="section-accessibility" class="h2">交互与无障碍</h2>
    <div class="hint">
      <strong>已内置：</strong>键盘焦点可见、禁用态抑制交互、深浅主题令牌映射、
      <code style="font-size: 11px">prefers-reduced-motion</code> 尊重（动效组件支持 reducedMotion），
      以及不同尺寸下的边界适配。组件不依赖 Hover 才可用，也不产生文本裁切或横向滚动。
    </div>

    <div style="display: flex; justify-content: space-between; gap: 10px; margin-top: 35px">
      <router-link class="btn sm" to="/components">
        <UiIcon name="grid" small /> 返回组件总览
      </router-link>
      <router-link class="btn sm primary" :to="`/component/${nextComponent.slug}`">
        下一个组件 <UiIcon name="arrow" small />
      </router-link>
    </div>
  </DocsShell>
</template>
