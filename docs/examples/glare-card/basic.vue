<script setup lang="ts">
import { IuGlareCard } from 'inspira-ui-components'
</script>

<template>
  <IuGlareCard :width="280" :radius="36">
    <div class="demo-content">
      <div class="demo-art" />
      <span class="demo-label">Glare Card</span>
    </div>
  </IuGlareCard>
</template>

<style scoped>
.demo-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.demo-art {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}

.demo-label {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
</style>
