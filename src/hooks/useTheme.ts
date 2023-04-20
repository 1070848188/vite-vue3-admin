import { DEFAULT_PRIMARY_COLOR } from '@/config/constant';
import { getLightColor, getDarkColor } from '@/utils/theme/tool';
import { GlobalStore } from '@/store';
import { ElMessage } from 'element-plus';
import { computed } from 'vue';

/**
 * @description 全局设置主题样式相关hooks
 * @returns
 */
export const useTheme = () => {
  const store = GlobalStore();
  const themeConfig = computed(() => store.themeConfig);

  // 切换暗黑模式
  const swithDark = () => {
    const el = document.documentElement;
    el.setAttribute('class', themeConfig.value.isDark ? 'dark' : '');
    changePrimaryColor(themeConfig.value.primary);
  };

  // 修改主题颜色
  const changePrimaryColor = (color: string | null) => {
    // 1. 若没有传入颜色，则给默认颜色
    if (!color) {
      color = DEFAULT_PRIMARY_COLOR;
      ElMessage({ type: 'info', message: `颜色已重置为${DEFAULT_PRIMARY_COLOR}` });
    }
    // 2. 修改全局store下的默认颜色
    store.setThemeConfig({ ...themeConfig.value, primary: color });
    // 3. 获取全局dom元素
    const el = document.documentElement;

    // 4. 设置--el--color-primarycss变量
    el.style.setProperty('--el-color-primary', themeConfig.value.primary);

    // 5. 暗黑模式兼容
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      themeConfig.value.isDark
        ? `${getLightColor(themeConfig.value.primary, 0.2)}`
        : `${getDarkColor(themeConfig.value.primary, 0.3)}`
    );

    // 6. 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      el.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(color, i / 10)}`);
    }
  };

  const initTheme = () => {
    changePrimaryColor(themeConfig.value.primary);
    swithDark();
  };

  return {
    changePrimaryColor,
    initTheme,
    swithDark
  };
};
