<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';

const { initTheme } = useTheme();
initTheme();
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
