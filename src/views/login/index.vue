<template>
  <div class="container">
    <!-- 登录区域 -->
    <div class="login">
      <!-- 左侧图片 -->
      <img
        class="login-img"
        src="https://template.qszone.com/assets/login_banner-6e96327c.webp"
        alt=""
      />

      <!-- 右侧登录 -->
      <div class="login-form">
        <!-- 顶部密码/扫码切换 -->
        <div class="header">
          <i :class="`iconfont fa-lg iconcolor icon-${toggle ? 'saomadenglu1' : 'mimadenglu'}`" />
          <i
            :class="`iconfont cursor el-icon--right fa-lg pointer icon-${
              toggle ? 'saomadenglu' : 'diannaodenglu'
            }`"
            @click="toggle = !toggle"
          />
        </div>
        <!-- 顶部密码/扫码切换 -->

        <div class="content">
          <div class="content-form">
            <loginUser ref="userLogin" v-if="toggle" @login="userLoginFrom" />
            <loginPhone v-else />
          </div>
          <el-button
            size="large"
            type="primary"
            style="width: 100%"
            :loading="loginLoading"
            @click="handleLogin"
            >登录</el-button
          >
        </div>
      </div>
      <!-- 右侧登录 -->
    </div>
    <!-- 登录区域 -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import useStore from '@/store/modules/layout';
import { loginApi } from '@/api/modules/layout';
import loginUser from './components/loginUser.vue';
import loginPhone from './components/loginPhone.vue';
import type { Login } from '@/api/interface/index';
import { ElMessage, ElNotification } from 'element-plus';
import { GlobalStore } from '@/store';
import { initGlobalMenus } from '@/router/asyncLoadRouter';
import { getTimeState } from '@/utils/utils';

const router = useRouter(),
  route = useRoute(), // 路由对象
  store = GlobalStore();

const toggle = ref(true); // 切换tabs
const loginLoading = ref(false); // 登录Loading
const userLogin = ref<InstanceType<typeof loginUser>>(); // 密码登录组件实例

// 根据当前登录方式不同，调用组件内部不同的校验逻辑
function handleLogin() {
  userLogin.value?.handleLogin();
}

// 实际登录方法
async function userLoginFrom(loginForm: Login.ReqLoginForm) {
  loginLoading.value = true;
  try {
    const { code, msg, data } = await loginApi(loginForm);
    if (code === 200) {
      // 1. 存储token
      store.setToken(data.access_token);

      // 2. 初始化菜单
      await initGlobalMenus();

      // 3. 跳转路由
      router.push(redirectInfo);

      ElNotification({
        title: getTimeState(),
        message: h('i', { style: 'color: teal' }, '欢迎登录后台管理系统'),
        type: 'success',
        duration: 3000
      });
    } else {
      ElMessage.error(msg);
    }
  } finally {
    loginLoading.value = false;
  }
}

// 路由监听 ----------
const redirectInfo = reactive({
  // 路由重定向的值
  path: '/',
  query: {}
});

// 监听路由变化，登录完成后跳转用户重定向页面
watch(
  () => route,
  (newVal) => {
    const { query } = newVal;
    redirectInfo.path = (query.redirect as string) || '/';
    redirectInfo.query = getQueryFilter(query);
  },
  { immediate: true }
);

// 过滤query参数
function getQueryFilter(query: any) {
  return Object.keys(query).reduce((pre: { [key: string]: any }, cur) => {
    if (cur !== 'redirect') {
      pre[cur] = query[cur];
    }
    return pre;
  }, {});
}

// ------
</script>

<style lang="scss" scoped>
.container {
  background-image: url('https://template.qszone.com/assets/login_bg.ed2739b3.webp');
  overflow: hidden;
  height: 100%;
}

.login {
  width: 700px;
  height: 400px;
  box-sizing: border-box;
  margin: 15vh auto;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;

  &-img {
    width: 320px;
    height: 290px;
    margin-left: 20px;
  }

  &-form {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.header {
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 15px;
  box-sizing: border-box;
  height: 65px;
}

.content {
  padding: 0 5%;

  &-form {
    height: 200px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
</style>
