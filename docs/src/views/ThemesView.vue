<script setup lang="ts">
import UiIcon from '../components/UiIcon.vue'
import DocsShell from '../components/DocsShell.vue'
import CodeBlock from '../components/CodeBlock.vue'
import { setTheme, useTheme } from '../composables/theme'
import { toast } from '../composables/toast'

const theme = useTheme()

const tocLinks: Array<[string, string]> = [
  ['theme-preview', '主题预览'],
  ['theme-tokens', '设计变量'],
  ['theme-a11y', '动效与可访问性'],
]

function apply(mode: 'light' | 'dark') {
  setTheme(mode)
  toast(mode === 'dark' ? '已应用深色主题' : '已应用浅色主题')
}

const tokensCode = `/* 组件库设计令牌（--iu-* 命名空间，覆盖即换肤） */
:root {
  --iu-primary: #18181b;        /* 文档站强调色：#6558e8 */
  --iu-background: #ffffff;
  --iu-foreground: #09090b;
  --iu-border: #e4e4e7;
}

.dark {
  --iu-background: #09090b;
  --iu-primary: #fafafa;
}`

const a11yCode = `@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`
</script>

<template>
  <DocsShell active="themes" :toc-links="tocLinks">
    <div class="crumbs">
      <router-link to="/home">首页</router-link>
      <UiIcon name="chevron" small />
      <span>指南</span>
    </div>
    <div class="page-heading">
      <h1>主题定制</h1>
      <p>遵循「内容优先、动效克制、交互清晰」的设计原则。所有示例均支持亮色与暗色模式，并遵守系统减少动效偏好。</p>
    </div>

    <h2 id="theme-preview" class="h2">主题预览</h2>
    <div class="theme-card">
      <div>
        <div class="theme-visual light-sample">
          <div style="font-size: 10px; color: #8d8fa4">LIGHT MODE</div>
          <div style="font-size: 17px; font-weight: 800; margin-top: 10px">简洁、清晰、好阅读</div>
          <div class="theme-line"></div>
          <button class="btn primary sm" type="button" @click="apply('light')">
            按钮示例 <UiIcon name="arrow" small />
          </button>
        </div>
        <div class="theme-choose">
          浅色主题
          <button class="btn sm" type="button" @click="apply('light')">应用浅色</button>
        </div>
      </div>
      <div>
        <div class="theme-visual dark-sample">
          <div style="font-size: 10px; color: #9e9ebc">DARK MODE</div>
          <div style="font-size: 17px; font-weight: 800; margin-top: 10px">沉稳、聚焦、舒适</div>
          <div class="theme-line"></div>
          <button
            class="btn sm"
            type="button"
            style="background: #8d82ef; border-color: #8d82ef; color: white"
            @click="apply('dark')"
          >
            按钮示例 <UiIcon name="arrow" small />
          </button>
        </div>
        <div class="theme-choose">
          深色主题
          <button class="btn sm" type="button" @click="apply('dark')">应用深色</button>
        </div>
      </div>
    </div>
    <p class="prose" style="margin-top: 14px">
      当前主题：<b>{{ theme === 'dark' ? '深色' : '浅色' }}</b>
      。选择会写入 localStorage 并在整个站点持久生效；顶栏的主题按钮与之等效。
    </p>

    <h2 id="theme-tokens" class="h2">设计变量</h2>
    <p class="prose">
      组件库将设计令牌收敛为 <code style="font-size: 12px; color: var(--primary)">--iu-*</code> CSS 变量，覆盖变量即可换肤，无需重新编译；
      文档站的界面令牌（--bg / --surface 等）与组件库令牌互不污染。
    </p>
    <CodeBlock :code="tokensCode" lang="css" />

    <h2 id="theme-a11y" class="h2">动效与可访问性</h2>
    <p class="prose">
      动效组件均支持 <code style="font-size: 12px; color: var(--primary)">reducedMotion</code> 属性并尊重系统
      prefers-reduced-motion；键盘可达、焦点可见，响应式页面无非预期横向滚动。
    </p>
    <CodeBlock :code="a11yCode" lang="css" />
  </DocsShell>
</template>
