<template>
  <!-- 用户菜单下拉 -->
  <el-dropdown trigger="click">
    <div class="flex-item-center">
      <el-avatar :src="getAssetsFile('avatar.png')" />
      <!-- 用户名展示 -->
      <div class="username">{{ globalStore.userInfo.username || '匿名用户' }}</div>
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="jumpRoutes('userInfo')"
          ><el-icon><User /></el-icon>用户信息</el-dropdown-item
        >
        <el-dropdown-item @click="jumpRoutes('editPass')"
          ><el-icon><Edit /></el-icon>修改密码</el-dropdown-item
        >
        <el-dropdown-item divided @click="signOut"
          ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { LOGIN_URL } from '@/config/constant';
import { GlobalStore } from '@/store';
import TabsStore from '@/store/modules/tabs';
import { getAssetsFile } from '@/utils/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
const globalStore = GlobalStore(),
  router = useRouter(),
  tabsStore = TabsStore();

function jumpRoutes(type: string) {
  console.log(type);
}

/**
 * @description 退出登录
 */
const signOut = () => {
  ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning'
  }).then(() => {
    // 1. 清除缓存信息
    globalStore.signOut();
    // 2. 清除选项卡
    tabsStore.setTabMenuList([]);
    // 3. 重定向到首页
    router.replace(LOGIN_URL);
    // 4. 提示信息
    ElMessage.info('退出成功');
  });
};
</script>

<style lang="scss" scoped>
.username {
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}
.flex-item-center {
  cursor: pointer;
}
</style>
