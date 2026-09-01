<script setup lang="ts">
import { IuGlareCard } from 'inspira-ui-components'
</script>

<template>
  <IuGlareCard>
    <div class="glare-art">
      <span style="position: absolute; left: 16px; bottom: 14px; color: #fff; font-size: 14px; font-weight: 600">
        Glare Card
      </span>
    </div>
  </IuGlareCard>
</template>

<style scoped>
.glare-art {
  position: relative;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(80% 60% at 20% 10%, #60a5fa 0%, transparent 60%),
    radial-gradient(70% 70% at 85% 30%, #c084fc 0%, transparent 55%),
    radial-gradient(90% 90% at 50% 100%, #34d399 0%, transparent 60%),
    #0f172a;
}
</style>
