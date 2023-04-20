<template>
  <el-tabs
    v-if="themeConfig.isNeedTabs"
    v-model="tabValue"
    class="tabs"
    @tab-change="changeTabItem"
    @tab-remove="removeTabItem"
  >
    <el-tab-pane
      v-for="item in tabMenuList"
      :key="item.path"
      :name="item.path"
      :closable="item.close"
    >
      <template #label>
        <div class="tabs-content">
          <el-icon v-if="item.icon && themeConfig.isNeedTabsIcon"
            ><component :is="item.icon"
          /></el-icon>
          <span class="tabs-title">{{ item.title }}</span>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
/**
 * Tabs
 * 1. 根据tabs仓库中所展示的tabs列表渲染所有tab
 * 2. 根据路由对象判断当前所在tab页，初始化绑定tabValue
 * 3. 删除列表
 *   3-1. 删除tabs仓库中列表
 *   3-2. 删除keepalive列表
 *   3-3. 删除当前tab, 切换前一个tab
 */
import AuthStore from '@/store/modules/auth';
import TabsStore from '@/store/modules/tabs';
import type { TabPaneName } from 'element-plus';
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import keepAliveStore from '@/store/modules/keepAlive';
import { GlobalStore } from '@/store';
import type { ThemeConfigState } from '@/store/interface';

const keepStore = keepAliveStore();
const tabValue = ref();
const store = TabsStore();
const authStore = AuthStore();
const globalStore = GlobalStore();
const route = useRoute();
const router = useRouter();

const tabMenuList = computed(() => store.tabMenuList);

// 当前路由变更，需要将新的路由添加到tabs中
watch(
  () => route.fullPath,
  (newVal) => {
    nextTick(() => {
      // 1. 重置当前选中路由
      tabValue.value = newVal as string;
      // 2. 跳转路由对象添加到tabs中
      store.addTabItem({
        path: route.fullPath,
        name: route.name as string,
        title: route.meta.title as string,
        icon: route.meta.icon as string,
        close: !route.meta.isAffix as boolean
      });
      console.log(keepStore.keepAliveName);

      // 3. 判断是否需要缓存组件
      route.meta.isKeepAlive && keepStore.addKeepAliveItem(route.name as string);
    });
  },
  { immediate: true }
);

// 初始化当前tabs列表
const initTabs = () => {
  // 从所有菜单中过滤出需要固定在tabs的路由
  authStore.getFlatMenus
    .filter((menu) => menu.meta.isAffix && !menu.meta.isFull && !menu.meta.isHide) // 需要固定在tabs的菜单
    .forEach((menu) => {
      store.addTabItem({
        // 添加到tabs列表
        path: menu.path,
        name: menu.name,
        icon: menu.meta.icon,
        close: !menu.meta.isAffix,
        title: menu.meta.title
      });
    });
  // 根据路由初始化当前默认选中tab
  tabValue.value = route.name as string;
};

// 选项卡发生改变
const changeTabItem = (fullPath: TabPaneName) => {
  router.push(fullPath as string);
};

// 删除菜单
const removeTabItem = (fullPath: TabPaneName) => {
  // 1. 从选项卡中删除
  store.removeTabItem(fullPath as string, fullPath === route.fullPath);
  // 2. 从缓存路由中删除
  const fullName = authStore.getFlatMenus.find((menu) => menu.path === fullPath)?.name || '';
  keepStore.removeKeepAliveItem(fullName);
};

// 全局主题配置
const themeConfig = computed<ThemeConfigState>(() => globalStore.themeConfig);

onMounted(() => {
  initTabs();
});
</script>

<style lang="scss" scoped>
.tabs {
  &-content {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  &-title {
    margin-left: 8px;
  }
  &:deep(.el-tabs__item) {
    padding: 0;
  }
  &:deep(.el-tabs__header) {
    margin: 0;
  }
}
</style>
