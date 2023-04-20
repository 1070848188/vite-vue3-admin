export interface LoginType {
  username: string;
  password: string;
}

/**
 * @description 菜单相关类型定义
 */

export interface AuthState {
  menus: Menu.MenuOptions[];
}
export interface MenuItemType {
  ID: number;
  children?: MenuItemType[];
  hidden?: boolean;
  path: string;
  meta: {
    title: string;
    icon?: string;
  };
}

/**
 * @description 标签页相关类型定义
 */
export interface TabsState {
  tabMenuList: tabMenuOptions[];
}

export interface tabMenuOptions {
  path: string;
  name: string;
  icon?: string;
  close?: boolean;
  title: string;
}

/**
 * @description 全局样式及布局类型定义
 */
export interface GlobalState {
  token: string;
  userInfo: any;
  themeConfig: ThemeConfigState;
}

export interface ThemeConfigState {
  isCollapse: boolean; // 左侧菜单栏收缩
  isCollapseIcon: boolean; // 左侧菜单栏收缩图标
  title: string; // 项目名称
  isNeedBreadcrumb: boolean; // 是否需要面包屑
  isNeedBreadcrumbIcon: boolean; // 是否需要面包屑导航
  isNeedTabs: boolean; // 是否需要tabs
  isNeedTabsIcon: boolean; // 是否需要tabs图标
  primary: string; // 全局颜色风格
  isDark: boolean; // 是否进入暗黑模式
}

/**
 * @description 组件缓存相关定义
 */
export interface keepAliveState {
  keepAliveName: string[];
}
