import { getMenuApi } from '@/api/modules/layout';
import { getFlatMenus, getAllBreadcrumbList } from '@/utils/utils';
import { defineStore } from 'pinia';
import type { AuthState } from '../interface';

const AuthStore = defineStore('AuthState', {
  state: (): AuthState => {
    return {
      menus: []
    };
  },
  getters: {
    // 后端返回的菜单列表，未经任何处理
    getMapMenus: (state) => state.menus,
    // 扁平化数组，将数组打平为一维数组，便于添加动态路由
    getFlatMenus: (state) => getFlatMenus(state.menus),
    // 初始化面包屑导航，给每个路由都添加父子关系
    getBreadcrumbList: (state) => getAllBreadcrumbList(state.menus)
  },
  actions: {
    async getMenuList() {
      const { data } = await getMenuApi();
      this.menus = data || [];
    }
  }
});

export default AuthStore;
