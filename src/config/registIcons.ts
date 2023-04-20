// 引入iconfont
import '@/assets/iconfont/iconfont.css';
// 引入element-plus的图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import type { App } from 'vue';

// 全局注册element-plus的icon
const initGlobalIcons = (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};

export default initGlobalIcons;
