<template>
  <div class="side-bar">
    <el-scrollbar style="height: calc(100vh - 60px)">
      <el-menu
        :router="false"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="routePath"
        background-color="#191a23"
        active-text-color="#ffd04b"
        text-color="#f5f7f9"
        class="menu"
      >
        <SideBarItem v-for="menuItem in menus" :key="menuItem.path" :menu="menuItem" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SideBarItem from './sideBarItem.vue';
import useStore from '@/store/modules/auth';
import { GlobalStore } from '@/store';
import { useRoute } from 'vue-router';

const store = useStore();
const globalStore = GlobalStore();
const route = useRoute();

// eslint-disable-next-line no-undef
const menus = computed<Menu.MenuOptions[]>(() => store.getMapMenus);

const isCollapse = computed<boolean>(() => globalStore.themeConfig.isCollapse);

const routePath = computed(() => route.fullPath);
</script>

<style lang="scss" scoped>
.side-bar {
  width: 100%;
  height: calc(100vh - 60px);
}
.menu {
  border: none;
}
</style>
