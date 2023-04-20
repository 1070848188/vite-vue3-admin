<template>
  <div class="header">
    <div class="header-left">
      <!-- 左侧菜单收缩 -->
      <CollapseIcon v-if="themeConfig.isCollapseIcon" />
      <!-- 面包屑导航 -->
      <Breadcrumb v-if="themeConfig.isNeedBreadcrumb" />
    </div>
    <div class="header-right">
      <!-- 主题配置 -->
      <Theme />
      <!-- 是否全屏 -->
      <Fullscreen />
      <!-- 用户操作 -->
      <User />
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import User from './components/User.vue';
import Fullscreen from './components/Fullscreen.vue';
import Theme from './components/Theme.vue';
import { computed } from 'vue';
import { GlobalStore } from '@/store';
import type { ThemeConfigState } from '@/store/interface';

const store = GlobalStore();

const themeConfig = computed<ThemeConfigState>(() => store.themeConfig);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 100%;
  padding: 5px 0;
  overflow: hidden;
  justify-content: space-between;

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }
}
</style>
