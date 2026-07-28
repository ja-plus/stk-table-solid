import { createSignal, onMount, onCleanup } from 'solid-js';

/**
 * Solid 版 vitepress 主题数据获取。
 *
 * vitepress-demo-plugin 通过独立的 Solid root 渲染 demo，
 * 与 vitepress（Vue）的 provide/inject 上下文隔离，
 * 因此无法使用 vitepress 的 useData()。
 * 这里改为直接读取 documentElement 上的 class / lang，
 * 并通过 MutationObserver 保持响应式。
 */
export function useVitepressData() {
    const [isDark, setIsDark] = createSignal(document.documentElement.classList.contains('dark'));
    const [lang, setLang] = createSignal(document.documentElement.lang || 'en');

    onMount(() => {
        const update = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
            setLang(document.documentElement.lang || 'en');
        };
        const observer = new MutationObserver(update);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'lang'],
        });
        onCleanup(() => observer.disconnect());
    });

    return { isDark, lang };
}
