<template>
  <i
    :class="`iconfont theme-icon icon-${isFullscreen ? 'tuichuquanping' : 'quanping'}`"
    @click="toggle"
  ></i>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();
</script>

<style lang="scss" scoped>
.full {
  height: 100%;
  overflow: hidden;
}
</style>
