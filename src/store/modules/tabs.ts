import { defineStore } from 'pinia';
import type { TabsState, tabMenuOptions } from '../interface';
import router from '@/router';

const TabsStore = defineStore('TabsState', {
  state: (): TabsState => {
    return {
      tabMenuList: []
    };
  },
  actions: {
    /**
     * @description 添加选项卡
     * @param newTabItem 当前路由项
     */
    addTabItem(newTabItem: tabMenuOptions) {
      if (this.tabMenuList.every((tab) => tab.path !== newTabItem.path)) {
        this.tabMenuList.push(newTabItem);
      }
    },
    /**
     * @description 删除选项卡
     * @param fullPath 当前需要删除的选项卡name
     * @param isCurrent 当前删除的是否是正在展示的选项卡
     */
    removeTabItem(fullPath: string, isCurrent: boolean) {
      // 1. 删除的是正在展示的选项卡
      if (isCurrent) {
        const tabMenus = this.tabMenuList;
        tabMenus.forEach((tabItem, index) => {
          if (tabItem.path !== fullPath) return;
          // 选出最近的选项卡
          const nextTab = tabMenus[index + 1] || tabMenus[index - 1];
          if (!nextTab.path) return;
          // 删除后自动跳转最近的选项卡
          router.push(nextTab.path);
        });
      }
      // 2. 与展示选项卡无关直接过滤掉
      this.tabMenuList = this.tabMenuList.filter((tabItem) => tabItem.path !== fullPath);
    },
    /**
     * @description 重置选项卡
     * @param newTabList 需要展示的选项卡
     */
    setTabMenuList(newTabList: tabMenuOptions[]) {
      this.tabMenuList = newTabList || [];
    }
  },
  persist: {
    key: 'TabsState',
    storage: localStorage
  }
});

export default TabsStore;
