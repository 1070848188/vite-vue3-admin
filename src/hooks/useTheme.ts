import { DEFAULT_PRIMARY_COLOR } from '@/config/constant';
import { getLightColor } from '@/utils/theme/tool';
import { GlobalStore } from '@/store';
import { ElMessage } from 'element-plus';

/**
 * @description 全局设置主题样式相关hooks
 * @returns
 */
export const useTheme = () => {
  const store = GlobalStore();

  // 修改主题颜色
  const changePrimaryColor = (color: string | null) => {
    // 1. 若没有传入颜色，则给默认颜色
    if (!color) {
      color = DEFAULT_PRIMARY_COLOR;
      ElMessage({ type: 'info', message: `颜色已重置为${DEFAULT_PRIMARY_COLOR}` });
    }
    // w. 修改全局store下的默认颜色
    store.setThemeConfig({ ...store.themeConfig, primary: color });
    // 3. 获取全局dom元素
    const el = document.documentElement;

    // 4. 设置--el--color-primarycss变量
    el.style.setProperty('--el-color-primary', color);

    // 5. 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(color, i / 10)}`);
    }
  };

  const initTheme = () => {
    changePrimaryColor(DEFAULT_PRIMARY_COLOR);
  };

  return {
    changePrimaryColor,
    initTheme
  };
};
