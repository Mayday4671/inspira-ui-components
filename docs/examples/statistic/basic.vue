<script setup lang="ts">
import { IuStatistic } from 'inspira-ui-components'
</script>

<template>
  <IuStatistic label="今日营收" :value="32850.6" prefix="¥" :trend="12.5" trend-label="较昨日" />
  <IuStatistic label="新增用户" :value="1284" :trend="-3.2" trend-label="较上周" />
  <IuStatistic label="转化率" :value="98.7" suffix="%" :decimals="1" :duration="800" />
</template>
