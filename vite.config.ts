import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 按需引入element-plus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import vitePluginVueSetupExtend from 'vite-plugin-vue-setup-extend-plus';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginVueSetupExtend(), // 可以将组件name写在script上
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name: string) => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/lapp': {
        target: 'https://open.ys7.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/lapp/, '/api/lapp')
      }
    }
  }
});
