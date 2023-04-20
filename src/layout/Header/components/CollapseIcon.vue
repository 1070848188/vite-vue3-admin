<template>
  <el-icon class="collapse-icon" @click="collapse">
    <component :is="themeConfig.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { GlobalStore } from '@/store';
import type { ThemeConfigState } from '@/store/interface';

const store = GlobalStore();

// 全局样式及布局
const themeConfig = computed<ThemeConfigState>(() => {
  return store.themeConfig;
});

function collapse() {
  store.setThemeConfig({ ...store.themeConfig, isCollapse: !store.themeConfig.isCollapse });
}
</script>

<style lang="scss" scoped>
.collapse-icon {
  font-size: 25px;
  &:hover {
    cursor: pointer;
  }
}
</style>
