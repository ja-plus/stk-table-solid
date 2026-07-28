import { createSignal, createMemo, createEffect, on, onMount, onCleanup, type Accessor } from 'solid-js';

/**
 * 创建一个带防抖的 signal：值从 true 变为 false 时延迟 300ms 生效。
 * 对应 Vue 版本的 customRef 实现。
 */
function createDebouncedFalseSignal(initialValue: boolean) {
    const [value, setValue] = createSignal(initialValue);
    let debounceTimer = 0;

    function set(newValue: boolean) {
        // Add debounce when change from true to false
        if (value() && !newValue) {
            if (debounceTimer) {
                window.clearTimeout(debounceTimer);
            }
            debounceTimer = window.setTimeout(() => {
                setValue(newValue);
                debounceTimer = 0;
            }, 300);
        } else {
            if (debounceTimer) {
                window.clearTimeout(debounceTimer);
                debounceTimer = 0;
            }
            setValue(newValue);
        }
    }

    return [value, set] as const;
}

export function useScrollRowByRow(props: any, tableContainerRef: Accessor<HTMLElement | undefined>) {
    // let isMouseDown = false;
    let isAddListeners = false;
    /** record the last scroll bar position */
    // let lastScrollTop = 0;

    /** record is the scroll bar is dragging.debounce true to false */
    const [isDragScroll, setIsDragScroll] = createDebouncedFalseSignal(false);

    const onlyDragScroll = createMemo(() => props.scrollRowByRow === 'scrollbar');

    /** is ScrollRowByRow active */
    const isSRBRActive = createMemo(() => {
        if (onlyDragScroll()) {
            return isDragScroll();
        }
        return props.scrollRowByRow;
    });

    createEffect(
        on(onlyDragScroll, v => {
            if (v) {
                addEventListener();
            } else {
                removeEventListener();
            }
        }),
    );

    onMount(() => {
        addEventListener();
    });

    onCleanup(() => {
        removeEventListener();
    });

    function addEventListener() {
        if (isAddListeners || !onlyDragScroll()) return;
        const container = tableContainerRef();
        if (!container) return;
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        isAddListeners = true;
    }

    function removeEventListener() {
        const container = tableContainerRef();
        if (!container) return;
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        isAddListeners = false;
    }

    function handleMouseDown(e: Event) {
        const el = e.target as HTMLElement;
        if (el.classList.contains('stk-table')) {
            setIsDragScroll(true);
        }
    }

    function handleMouseUp() {
        setIsDragScroll(false);
    }

    return [isSRBRActive] as const;
}
