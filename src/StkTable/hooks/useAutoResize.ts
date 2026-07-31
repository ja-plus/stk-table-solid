import { createEffect, createRoot, onMount, onCleanup, type Accessor } from 'solid-js';

/**
 * 窗口变化自动重置虚拟滚动
 * @param tableContainerRef
 * @param onResize 容器尺寸变化后的重算逻辑（虚拟滚动、固定列等）
 * @param props
 * @param debounceMs
 */
export function useAutoResize(tableContainerRef: Accessor<HTMLElement | undefined>, onResize: () => void, props: any, debounceMs: number) {
    let resizeObserver: ResizeObserver | null = null;
    let isObserved = false;

    createEffect(() => {
        const v = props.virtual;
        if (v) initResizeObserver();
        else removeResizeObserver();
    });

    createEffect(() => {
        const v = props.virtualX;
        if (v) initResizeObserver();
        else removeResizeObserver();
    });

    onMount(() => {
        if (props.virtual || props.virtualX) {
            initResizeObserver();
        }
    });

    onCleanup(() => {
        removeResizeObserver();
    });

    function initResizeObserver() {
        if (isObserved) {
            removeResizeObserver();
        }
        if (window.ResizeObserver) {
            if (!tableContainerRef()) {
                // 等待 tableContainerRef 出现后再初始化
                createRoot(dispose => {
                    createEffect(() => {
                        if (tableContainerRef()) {
                            dispose();
                            initResizeObserver();
                        }
                    });
                });
                return;
            }
            resizeObserver = new ResizeObserver(resizeCallback);
            resizeObserver.observe(tableContainerRef()!);
        } else {
            window.addEventListener('resize', resizeCallback);
        }
        isObserved = true;
    }

    function removeResizeObserver() {
        if (!isObserved) return;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        } else {
            window.removeEventListener('resize', resizeCallback);
        }
        isObserved = false;
    }

    let debounceTime = 0;
    function resizeCallback() {
        if (debounceTime) {
            window.clearTimeout(debounceTime);
        }
        debounceTime = window.setTimeout(() => {
            if (props.autoResize) {
                onResize();
                if (typeof props.autoResize === 'function') {
                    props.autoResize();
                }
            }
            debounceTime = 0;
        }, debounceMs);
    }
}
