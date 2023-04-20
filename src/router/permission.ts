import router from './index';
// import useLoginStore from '@/store/modules/auth';
import { GlobalStore } from '@/store/index';
import { initGlobalMenus } from './asyncLoadRouter';
import AuthStore from '@/store/modules/auth';
import Nprogress from '@/config/nprogress';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/constant';

router.beforeEach(async (to, from, next) => {
  const globalStore = GlobalStore();

  // 1. Nprogress开始
  Nprogress.start();

  // 2. 判断访问登陆页，有Token停留当前页面，无Token放行
  if (to.path === LOGIN_URL) {
    if (globalStore.token) return next(from.fullPath);
    return next();
  }

  // 3. 白名单内路由放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 4. 没有Token访问其他路由，重定向到Login
  if (!globalStore.token)
    return next({
      ...to,
      path: '/login',
      query: { redirect: to.path, ...to.query },
      replace: true
    });

  // 5. 没有菜单，重新初始化菜单，添加动态路由
  const authStore = AuthStore();
  if (!authStore.getMapMenus.length) {
    await initGlobalMenus();
    return next({ ...to, replace: true });
  }

  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  Nprogress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  Nprogress.done();
  console.warn('路由错误', error.message);
});
