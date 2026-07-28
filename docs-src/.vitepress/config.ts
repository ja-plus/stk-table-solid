import path from 'path';
import { defineConfig } from 'vitepress';
import solidPlugin from 'vite-plugin-solid';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin/markdown';
import { enConfig } from './src/config/en';
import { jaConfig } from './src/config/ja';
import { koConfig } from './src/config/ko';
import { zhConfig } from './src/config/zh';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/stk-table-solid/',
    title: 'StkTableSolid',
    description: '一个基于SolidJS的高性能虚拟列表',
    lastUpdated: true,
    appearance: 'dark',
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/stk-table-solid/assets/logo.svg' }]],
    locales: {
        root: {
            label: '中文',
            ...zhConfig,
        },
        en: {
            label: 'English',
            ...enConfig,
        },
        ja: {
            label: '日本語',
            ...jaConfig,
        },
        ko: {
            label: '한국어',
            ...koConfig,
        },
    },
    themeConfig: {
        logo: '/assets/logo.svg',
        search: {
            provider: 'local',
        },
    },
    markdown: {
        config(md) {
            md.use(vitepressDemoPlugin, {
                demoDir: path.resolve(__dirname, '../../docs-demo'),
            });
        },
    },
    vite: {
        plugins: [
            solidPlugin({
                // 允许对 node_modules 之外的所有 tsx/jsx 进行 solid 转换
                include: /\.(tsx|jsx)$/,
            }),
        ],
        resolve: {
            // solid-js 需要单一实例，避免 demo 与库使用不同副本导致响应式失效
            dedupe: ['solid-js', 'solid-js/web', 'solid-js/store'],
        },
    },
});
