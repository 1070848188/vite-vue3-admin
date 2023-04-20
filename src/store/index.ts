import { createPinia, defineStore } from 'pinia';
import type { GlobalState, ThemeConfigState } from './interface/index';
// pinia实现永久化储存插件
import piniaPersistedstate from 'pinia-plugin-persistedstate';
import { DEFAULT_PRIMARY_COLOR } from '@/config/constant';

// Global中的内容涉及全局需要使用到的变量，所以需要持久缓存
export const GlobalStore = defineStore('GlobalState', {
  state: (): GlobalState => {
    return {
      token: '',
      userInfo: {},
      themeConfig: {
        isCollapse: false,
        isCollapseIcon: true,
        title: 'Panda Admin',
        isNeedBreadcrumb: true,
        isNeedBreadcrumbIcon: true,
        isNeedTabs: true,
        isNeedTabsIcon: true,
        primary: DEFAULT_PRIMARY_COLOR,
        isDark: false
      }
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setThemeConfig(themeConfig: ThemeConfigState) {
      this.themeConfig = themeConfig;
    },
    // 退出登录
    signOut() {
      // 1. 清除token
      this.token = '';
      // 2. 清除用户信息
      this.userInfo = {};
    }
  },
  persist: {
    key: 'GlobalState',
    storage: localStorage
  }
});

const pinia = createPinia();

pinia.use(piniaPersistedstate); // 插件注册

export default pinia;
