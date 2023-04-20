import { HOME_URL, LOGIN_URL } from '@/config/constant';
import type { RouteRecordRaw } from 'vue-router';

/**
 * @description 全局静态路由展示
 * @param {String} path ===> 请求路径
 * @param {String} name ===> 路由别名
 * @param {String} redirect ===> 重定向
 * @param {Component} component ===> 对应组件懒加载地址
 * @param {Object} meta ===> 路由详情信息
 * @param {String} meta.icon ===> 图标
 * @param {Boolean} meta.isHide ===> 是否在菜单中展示
 * @param {String} meta.title ===> 菜单名称
 * @param {Boolean} meta.isKeepAlive ===> 组件是否需要缓存
 * @param {String} meta.isLink ===> 外部链接地址-不是所有菜单都是项目内组件
 * @param {Boolean} meta.isFull ===> 是否需要全屏展示
 * @param {Boolean} meta.isAffix ===> 是否需要固定在tabs，不可以删除
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: []
  }
];

// 错误路由
export const errorRouter: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/notFound/index.vue')
  }
];
