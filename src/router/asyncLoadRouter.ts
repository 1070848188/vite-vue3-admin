import { LOGIN_URL } from './../config/constant';
import router from '@/router/index';
import { GlobalStore } from '@/store/index';
import useAuthStore from '@/store/modules/auth';
import { ElNotification } from 'element-plus';

const modules = import.meta.glob('@/views/**/*.vue');
const notComponent = () => import('@/views/notComponent/index.vue');

/**
 * @description 初始化菜单
 */
export async function initGlobalMenus() {
  const authStore = useAuthStore();
  const globalStore = GlobalStore();
  try {
    // 1. 获取菜单
    await authStore.getMenuList();

    // 2.判断是否有权限
    if (!authStore.getMapMenus.length) {
      ElNotification({
        title: '无权限',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000
      });
      globalStore.setToken(''); // 清空token
      router.replace(LOGIN_URL); // 跳转登录页面
      return Promise.reject('no permission');
    }

    // 3. 添加动态路由
    authStore.getFlatMenus.forEach((menu: any) => {
      menu.children && delete menu.children; // 删除chilren属性

      // 3-1. 根据component属性注册组件
      if (menu.component && typeof menu.component === 'string') {
        menu.component = modules['/src/views' + menu.component + '.vue'] || notComponent;
      }

      // 3-2. 全屏路由需要添加到一级路由下
      if (menu.meta.isFull) {
        router.addRoute(menu);
      } else {
        router.addRoute('layout', menu);
      }
    });
  } catch {
    // 若获取菜单有错误，直接跳转登录页面
    globalStore.setToken(''); // 清空token
    router.replace(LOGIN_URL); // 跳转登录页面
    return Promise.reject('no permission');
  }
}
