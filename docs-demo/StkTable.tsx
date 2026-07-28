import { createSignal, onMount, onCleanup, splitProps } from 'solid-js';
import { StkTable as StkTableBase, registerFeature, useAreaSelection } from '../src/StkTable/index';

/**
 * support vitepress env
 * - 跟随 vitepress 明暗主题
 * - 注册 areaSelection feature
 * - 透传 ref 以便 demo 获取组件实例
 */
registerFeature([useAreaSelection]);

export default function StkTable(props: any) {
    const [local, others] = splitProps(props, ['theme', 'class', 'ref']);

    const [isDark, setIsDark] = createSignal(false);

    onMount(() => {
        const html = document.documentElement;
        const update = () => setIsDark(html.classList.contains('dark'));
        update();
        const observer = new MutationObserver(update);
        observer.observe(html, { attributes: true, attributeFilter: ['class'] });
        onCleanup(() => observer.disconnect());
    });

    return (
        <StkTableBase
            {...others}
            ref={local.ref}
            class={`vp-raw ${local.class || ''}`}
            {...{
                get theme() {
                    return local.theme ?? (isDark() ? 'dark' : 'light');
                },
            }}
        />
    );
}
