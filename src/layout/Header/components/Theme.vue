<template>
  <!-- 主题图标 -->
  <i class="iconfont icon-pifu theme-icon" @click="themeDrawer = !themeDrawer"></i>

  <!-- 主题配置 -->
  <el-drawer v-model="themeDrawer" title="布局设置" size="300px">
    <!-- 全局主题开始 -->
    <div>
      <el-divider class="divider" content-position="center">
        <el-icon><Setting /></el-icon>
        全局主题
      </el-divider>
      <!-- 菜单折叠 -->
      <div class="drawer-item">
        <span>主题颜色</span>
        <el-color-picker v-model="themeConfig.primary" @change="changePrimaryColor" />
      </div>
    </div>
    <!-- 全局主题结束 -->

    <!-- 界面设置开始 -->
    <div>
      <el-divider class="divider" content-position="center">
        <el-icon><Setting /></el-icon>
        界面设置
      </el-divider>
      <!-- 菜单折叠 -->
      <div class="drawer-item">
        <span>折叠菜单</span>
        <el-switch v-model="themeConfig.isCollapse" />
      </div>
      <div class="drawer-item">
        <span>折叠菜单图标</span>
        <el-switch v-model="themeConfig.isCollapseIcon" />
      </div>
      <!-- 面包屑 -->
      <div class="drawer-item">
        <span>面包屑</span>
        <el-switch v-model="themeConfig.isNeedBreadcrumb" />
      </div>
      <div class="drawer-item">
        <span>面包屑图标</span>
        <el-switch v-model="themeConfig.isNeedBreadcrumbIcon" />
      </div>
      <!-- 面包屑 -->
      <div class="drawer-item">
        <span>标签栏</span>
        <el-switch v-model="themeConfig.isNeedTabs" />
      </div>
      <div class="drawer-item">
        <span>标签栏图标</span>
        <el-switch v-model="themeConfig.isNeedTabsIcon" />
      </div>
    </div>

    <!-- 界面设置结束 -->
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { GlobalStore } from '@/store';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeConfigState } from '@/store/interface';

// 全局配置导出
const themeDrawer = ref(false);
const store = GlobalStore();
const themeConfig = computed<ThemeConfigState>(() => store.themeConfig);

// hooks方法引入
const { changePrimaryColor } = useTheme();
</script>

<style lang="scss" scoped>
.drawer-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  align-items: center;

  span {
    font-size: 14px;
  }
}
</style>
