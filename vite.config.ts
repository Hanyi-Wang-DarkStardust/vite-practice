import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';

const scssVariablePath = normalizePath(
  path.resolve(__dirname, './src/variable.scss'),
);

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname, 'src'),
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          'babel-plugin-styled-components',
          // 适配 emotion
          '@emotion/babel-plugin',
        ],
      },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      jsxImportSource: '@emotion/react',
    }),
    viteEslint(),
    windi(),
  ],
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${scssVariablePath}";`,
      },
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
      ],
    },
  },
});
