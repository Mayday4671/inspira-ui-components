<script setup lang="ts">
import { IuCardSpotlight } from 'inspira-ui-components'
</script>

<template>
  <IuCardSpotlight
    class="spotlight-demo"
    :gradient-size="240"
    :gradient-color="'#262626'"
    :gradient-opacity="0.8"
  >
    <h4 style="margin: 0; font-size: 18px; font-weight: 700">Spotlight 卡片</h4>
    <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.65">
      鼠标在卡片上移动，会有一道聚光灯跟随光斑。
    </p>
  </IuCardSpotlight>
</template>

<style scoped>
.spotlight-demo {
  width: 100%;
  max-width: 420px;
  min-height: 220px;
  padding: 24px;
}
</style>
