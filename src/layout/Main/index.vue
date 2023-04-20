<template>
  <div class="main">
    <Tabs class="main-tab" />
    <div
      class="main-content"
      :style="{ height: themeConfig.isNeedTabs ? 'calc(100% - 40px)' : '100%' }"
    >
      <router-view v-slot="{ Component, route }">
        <el-scrollbar>
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive :include="keepStore.keepAliveName">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </el-scrollbar>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { GlobalStore } from '@/store';
import Tabs from './components/Tabs.vue';
import keepAliveStore from '@/store/modules/keepAlive';
import type { ThemeConfigState } from '@/store/interface/index';
const keepStore = keepAliveStore();

const globalStore = GlobalStore();
const themeConfig = computed<ThemeConfigState>(() => globalStore.themeConfig);
</script>

<style lang="scss" scoped>
.main {
  height: 100%;

  &-content {
    background-color: var(--el-bg-color-page);
    padding: 10px 20px;
  }
}
</style>
