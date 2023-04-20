<template>
  <template v-if="!menu.meta.isHide">
    <!-- 有子菜单，递归处理数据 -->
    <el-sub-menu :index="menu.path" v-if="!isSingleShow">
      <template #title>
        <el-icon v-show="menu.meta.icon"><component :is="menu.meta.icon" /></el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <SideBarItem v-for="menuItem in menu.children" :key="menuItem.path" :menu="menuItem" />
    </el-sub-menu>

    <!-- 没有子菜单，或只展示父级菜单 -->
    <el-menu-item :index="menu.path" v-else @click="handleClickMenu(menu)">
      <el-icon v-show="menu.meta.icon"><component :is="menu.meta.icon" /></el-icon>
      <span>{{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isExternal } from '@/utils/validate';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  // eslint-disable-next-line no-undef
  menu: Menu.MenuOptions;
}>();

// 是否单独展示
const isSingleShow = computed<boolean>(function () {
  // 过滤出需要展示的子菜单
  const showChilrenMenus = props.menu.children?.filter((item) => !item.meta.isHide);

  // 没有子菜单或没有可展示的子菜单
  if (!props.menu.children || showChilrenMenus?.length === 0) {
    return true;
  }

  return false;
});

// eslint-disable-next-line no-undef
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  const linkHref = subItem.meta.isLink;
  // 如果本路由是网络地址
  if (linkHref && isExternal(linkHref)) return window.open(subItem.meta.isLink, '_blank');
  router.push(subItem.path);
};
</script>

<style scoped></style>
