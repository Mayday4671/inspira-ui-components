<script setup lang="ts">
import { IuShimmerButton } from 'inspira-ui-components'
import { useRouter } from 'vue-router'
import UiIcon from '../components/UiIcon.vue'
import LazyPreview from '../components/LazyPreview.vue'
import { COMPONENTS, getComponent } from '../data/registry'

const router = useRouter()

/** 与原型一致的精选顺序：Shimmer / Gradient / CardSpotlight / NumberTicker / Rainbow / Dialog */
const featured = ['shimmer-button', 'gradient-button', 'card-spotlight', 'number-ticker', 'rainbow-button', 'dialog']
  .map((slug) => getComponent(slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))

void COMPONENTS

function goShimmer() {
  router.push('/component/shimmer-button')
}
</script>

<template>
  <div class="home-container">
    <!-- Hero -->
    <section class="hero">
      <div>
        <span class="eyebrow">VUE 3 · TYPESCRIPT · NPM READY</span>
        <h1 class="hero-title">让动效组件，<br /><span class="soft-gradient">开箱即用。</span></h1>
        <div class="hero-actions">
          <router-link to="/guide" class="btn primary large">快速开始</router-link>
          <router-link to="/components" class="btn large">浏览组件 <UiIcon name="grid" small /></router-link>
        </div>
        <div class="hero-metadata">
          <span><UiIcon name="check" small /> Vue 3 原生</span>
          <span><UiIcon name="check" small /> TypeScript 类型</span>
          <span><UiIcon name="check" small /> 按需导入</span>
        </div>
      </div>

      <div class="hero-art">
        <div class="art-grid"></div>
        <div class="floating-chip one"><UiIcon name="spark" small /> 动效细节</div>
        <div class="floating-chip two"><UiIcon name="code" small /> 一行即用</div>
        <div class="art-card">
          <div class="art-bar"><span></span><span></span><span></span></div>
          <div class="art-row">
            <div class="art-line"></div>
            <span class="tag">Live Preview</span>
          </div>
          <div class="art-line short"></div>
          <div class="art-preview">
            <span class="art-badge">SHIMMER BUTTON</span>
            <!-- 真实组件：IuShimmerButton -->
            <IuShimmerButton @click="goShimmer">立即体验</IuShimmerButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 三项价值 -->
    <section class="metrics">
      <div class="metric">
        <div class="metric-ico"><UiIcon name="package" /></div>
        <div>
          <strong>开箱即用</strong>
        </div>
      </div>
      <div class="metric">
        <div class="metric-ico"><UiIcon name="bolt" /></div>
        <div>
          <strong>灵动且克制</strong>
        </div>
      </div>
      <div class="metric">
        <div class="metric-ico"><UiIcon name="code" /></div>
        <div>
          <strong>类型友好</strong>
        </div>
      </div>
    </section>

    <!-- 精选组件（真实动效预览） -->
    <section id="home-components">
      <div class="section-h">
        <div>
          <h2>精选组件</h2>
        </div>
        <router-link to="/components">查看全部组件</router-link>
      </div>
      <div class="feature-grid">
        <router-link v-for="c in featured" :key="c.slug" class="feature-card" :to="`/component/${c.slug}`">
          <div class="feature-preview">
            <LazyPreview :kind="c.preview" />
          </div>
          <div class="feature-meta">
            <h3>{{ c.name }}</h3>
            <p>{{ c.zh }} · {{ c.desc }}</p>
          </div>
        </router-link>
      </div>
    </section>

    <footer class="site-footer">
      <span>© Inspira UI Components · 组件文档站</span>
      <span>Vue 3 · TypeScript · 可复用动效体验</span>
    </footer>
  </div>
</template>
