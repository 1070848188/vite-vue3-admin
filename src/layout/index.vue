<template>
  <div class="layout">
    <el-container>
      <el-aside :width="!themeConfig.isCollapse ? '210px' : '60px'" class="side">
        <div class="side-logo">
          <img
            :style="{ width: !themeConfig.isCollapse ? '32px' : '28px' }"
            :src="getAssetsFile('logo.png')"
          />
          <span v-show="!themeConfig.isCollapse">{{ themeConfig.title }}</span>
        </div>
        <SideBar />
      </el-aside>

      <el-container>
        <el-header> <Header /> </el-header>
        <el-main> <Main /> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar/index.vue';
import Header from './Header/index.vue';
import Main from './Main/index.vue';
import { getAssetsFile } from '@/utils/utils';
import { computed } from 'vue';
import { GlobalStore } from '@/store';
import type { ThemeConfigState } from '@/store/interface/index';

const globalStore = GlobalStore();

const themeConfig = computed<ThemeConfigState>(() => globalStore.themeConfig);
</script>

<style lang="scss" scoped>
.layout,
.el-container {
  width: 100%;
  height: 100%;
}

.el-header {
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.content {
  background-color: #f5f7f9;
}

.scrollbar-wrapper {
  height: 100%;
  overflow-x: hidden !important;
}

.side {
  display: flex;
  flex-direction: column;
  background: #191a23;
  transition: width 0.28s;
  color: #f5f7f9;

  &-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    span {
      margin-left: 5px;
      font-size: 21px;
      font-weight: 700;
      color: #dadada;
    }
  }

  &-menu {
    flex: 1;
  }
}

.el-main {
  padding: 0;
}
</style>
