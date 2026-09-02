<script setup lang="ts">
import { IuAnimatedTooltip, type AnimatedTooltipItem } from 'inspira-ui-components'

const items: AnimatedTooltipItem[] = [
  { id: 1, name: '张伟', designation: '前端工程师', image: 'https://i.pravatar.cc/112?img=12' },
  { id: 2, name: '李娜', designation: 'UI 设计师', image: 'https://i.pravatar.cc/112?img=32' },
  { id: 3, name: '王强', designation: '架构师', image: 'https://i.pravatar.cc/112?img=15' },
]
</script>

<template>
  <IuAnimatedTooltip :items="items" />
</template>
