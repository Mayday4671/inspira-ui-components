<script setup lang="ts">
import { IuAnimatedTooltip, type AnimatedTooltipItem } from 'inspira-ui-components'

// 头像可以是任意图片地址，这里用内联 SVG data URI 演示，离线可用
function avatar(name: string, color: string): string {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='112' height='112'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='54%' dy='.35em' text-anchor='middle' font-family='system-ui' font-size='42' fill='#fff'>${initials}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const items: AnimatedTooltipItem[] = [
  { id: 1, name: '张伟', designation: '前端工程师', image: avatar('Zhang Wei', '#6366f1') },
  { id: 2, name: '李娜', designation: 'UI 设计师', image: avatar('Li Na', '#ec4899') },
  { id: 3, name: '王强', designation: '架构师', image: avatar('Wang Qiang', '#14b8a6') },
  { id: 4, name: '赵敏', designation: '产品经理', image: avatar('Zhao Min', '#f59e0b') },
]
</script>

<template>
  <div style="display: flex">
    <IuAnimatedTooltip :items="items" />
  </div>
</template>
