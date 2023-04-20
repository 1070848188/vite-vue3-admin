import { createApp } from 'vue';
import App from '@/App.vue';
// * 项目css样式重置
import 'normalize.css';
import '@/styles/index.scss';
import router from '@/router/index';
import store from './store';

// icon注册
import initGlobalIcons from './config/registIcons';

// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css';

// 路由权限控制
import '@/router/permission';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(initGlobalIcons);
app.mount('#app');
