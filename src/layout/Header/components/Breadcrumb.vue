<template>
  <div :class="['breadcrumb-box']">
    <el-breadcrumb class="bread" :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.to" :to="item.to">
          <div class="el-breadcrumb__inner is-link">
            <el-icon class="breadcrumb-icon" v-if="item.icon && themeConfig.isNeedBreadcrumbIcon"
              ><component :is="item.icon"
            /></el-icon>
            <span class="breadcrumb-title">{{ item.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { HOME_URL } from '@/config/constant';
import { ArrowRight } from '@element-plus/icons-vue';
import AuthStore from '@/store/modules/auth';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { GlobalStore } from '@/store';
import type { ThemeConfigState } from '@/store/interface';

const store = AuthStore(),
  route = useRoute(),
  globalStore = GlobalStore();

// 根据路由自动生成面包屑列表
const breadcrumbList = computed(() => {
  let breadcrumbData = store.getBreadcrumbList[route.fullPath] ?? [];
  // 若当前点击的不是首页，则添加首页
  if (breadcrumbData[0].title !== route.meta.title) {
    breadcrumbData = [{ to: HOME_URL, title: '首页', icon: 'HomeFilled' }, ...breadcrumbData];
  }
  return breadcrumbData;
});

// 全局主题配置
const themeConfig = computed<ThemeConfigState>(() => globalStore.themeConfig);
</script>

<style lang="scss" scoped>
.bread {
  margin-left: 15px;
}

.breadcrumb-box {
  display: flex;
  align-items: center;
  padding-right: 50px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .el-breadcrumb__inner {
        display: inline-flex;
        .breadcrumb-icon {
          margin-top: 2px;
          margin-right: 6px;
          font-size: 16px;
        }
        .breadcrumb-title {
          margin-top: 3px;
        }
      }
      :deep(.el-breadcrumb__separator) {
        position: relative;
        top: -1px;
      }
    }
  }
}
.no-icon {
  .el-breadcrumb {
    .el-breadcrumb__item {
      top: -2px;
      :deep(.el-breadcrumb__separator) {
        top: 2px;
      }
    }
  }
}
</style>
