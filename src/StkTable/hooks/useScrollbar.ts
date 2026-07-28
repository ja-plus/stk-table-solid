import { createSignal, onMount, onCleanup, type Accessor } from 'solid-js';
import type { VirtualScrollStore, VirtualScrollXStore } from './useVirtualScroll';
import { rafThrottle, throttle } from '../utils/index';

/** Detect if the primary pointer is a touch device (mobile/tablet). */
function isTouchPrimaryDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export type ScrollbarOptions = {
    enabled?: boolean;
    /** scroll-y width */
    width?: number;
    /** scroll-x height */
    height?: number;
    /** min scroll-y width */
    minWidth?: number;
    /** min scroll-x height */
    minHeight?: number;
};

/**
 * 自定义滚动条hooks
 * @param containerRef 滚动容器的ref
 * @param options 滚动条配置选项
 * @returns 滚动条相关状态和方法
 */
export function useScrollbar(
    props: any,
    containerRef: Accessor<HTMLDivElement | undefined>,
    virtualScroll: Accessor<VirtualScrollStore>,
    virtualScrollX: Accessor<VirtualScrollXStore>,
    updateVirtualScrollY: (sTop?: number) => void,
    scrollbarOptions: Accessor<Required<ScrollbarOptions>>,
    isExperimentalScrollY: Accessor<boolean | undefined>,
) {
    const [showScrollbar, setShowScrollbar] = createSignal({ x: false, y: false });
    const [scrollbar, setScrollbar] = createSignal({ h: 0, w: 0, t: 0, l: 0 });

    let isDraggingVertical = false;
    let isDraggingHorizontal = false;
    let dragStartY = 0;
    let dragStartX = 0;
    let dragStartTop = 0;
    let dragStartLeft = 0;

    let resizeObserver: ResizeObserver | null = null;
    let currentDragHandler: ((e: MouseEvent | TouchEvent) => void) | undefined;
    let isMobileDevice = false;

    const throttledUpdateScrollbar = throttle(() => updateCustomScrollbar(), 200);
    // Use requestAnimationFrame for smoother scrollbar dragging performance
    const rafUpdateVirtualScrollY = rafThrottle((scrollTop: number) => updateVirtualScrollY(scrollTop));

    onMount(() => {
        isMobileDevice = isTouchPrimaryDevice();
        if (scrollbarOptions().enabled && !isMobileDevice) {
            resizeObserver = new ResizeObserver(throttledUpdateScrollbar);
            resizeObserver.observe(containerRef()!);
        }
        initScrollbar();
    });

    onCleanup(() => {
        // en: Clean up all event listeners to prevent memory leaks
        onDragEnd();
        resizeObserver?.disconnect();
        resizeObserver = null;
    });

    function updateCustomScrollbar() {
        if (!scrollbarOptions().enabled || isMobileDevice) return;
        const { scrollHeight, scrollTop, containerHeight } = virtualScroll();
        const { scrollWidth, scrollLeft, containerWidth } = virtualScrollX();

        const needVertical = scrollHeight > containerHeight;
        const needHorizontal = scrollWidth > containerWidth;
        setShowScrollbar({ x: needHorizontal, y: needVertical });

        if (needVertical) {
            const ratio = containerHeight / scrollHeight;
            setScrollbar(prev => {
                const h = Math.max(scrollbarOptions().minHeight, ratio * containerHeight);
                const t = Math.round((scrollTop / (scrollHeight - containerHeight)) * (containerHeight - h));
                return { ...prev, h, t };
            });
        }

        if (needHorizontal) {
            const ratio = containerWidth / scrollWidth;
            setScrollbar(prev => {
                const w = Math.max(scrollbarOptions().minWidth, ratio * containerWidth);
                const l = Math.round((scrollLeft / (scrollWidth - containerWidth)) * (containerWidth - w));
                return { ...prev, w, l };
            });
        }
    }

    function onVerticalScrollbarMouseDown(e: MouseEvent | TouchEvent) {
        if (e instanceof MouseEvent) e.preventDefault();
        isDraggingVertical = true;
        const { scrollTop } = virtualScroll();
        dragStartTop = scrollTop;
        dragStartY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        addDragListeners(onVerticalDrag);
    }

    function onHorizontalScrollbarMouseDown(e: MouseEvent | TouchEvent) {
        if (e instanceof MouseEvent) e.preventDefault();
        isDraggingHorizontal = true;
        const { scrollLeft } = virtualScrollX();
        dragStartLeft = scrollLeft;
        dragStartX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        addDragListeners(onHorizontalDrag);
    }

    function addDragListeners(dragHandler: (e: MouseEvent | TouchEvent) => void) {
        removeCurrentDragHandlerListeners();
        currentDragHandler = dragHandler;
        document.addEventListener('mousemove', dragHandler);
        document.addEventListener('mouseup', onDragEnd);
        document.addEventListener('touchmove', dragHandler, { passive: false });
        document.addEventListener('touchend', onDragEnd);
    }

    function onVerticalDrag(e: MouseEvent | TouchEvent) {
        if (!isDraggingVertical) return;
        e.preventDefault();
        const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
        const deltaY = clientY - dragStartY;
        const { scrollHeight, containerHeight } = virtualScroll();
        const scrollRange = scrollHeight - containerHeight;
        const trackRange = containerHeight - scrollbar().h;
        const scrollDelta = (deltaY / trackRange) * scrollRange;

        if (isExperimentalScrollY()) {
            const ratio = containerHeight / scrollHeight;
            const top = Math.round((dragStartTop + scrollDelta) * ratio);
            const maxTop = containerHeight - scrollbar().h;
            setScrollbar(prev => ({ ...prev, t: top < 0 ? 0 : top > maxTop ? maxTop : top }));
            rafUpdateVirtualScrollY(dragStartTop + scrollDelta);
        } else {
            containerRef()!.scrollTop = dragStartTop + scrollDelta;
        }
    }

    function onHorizontalDrag(e: MouseEvent | TouchEvent) {
        if (!isDraggingHorizontal) return;
        e.preventDefault();

        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
        const deltaX = clientX - dragStartX;
        const { scrollWidth, containerWidth } = virtualScrollX();

        const scrollRange = scrollWidth - containerWidth;
        const trackRange = containerWidth - scrollbar().w;
        const scrollDelta = (deltaX / trackRange) * scrollRange;
        containerRef()!.scrollLeft = dragStartLeft + scrollDelta;
    }

    function onDragEnd() {
        isDraggingVertical = false;
        isDraggingHorizontal = false;
        removeCurrentDragHandlerListeners();
        document.removeEventListener('mouseup', onDragEnd);
        document.removeEventListener('touchend', onDragEnd);
    }

    function removeCurrentDragHandlerListeners() {
        if (currentDragHandler) {
            document.removeEventListener('mousemove', currentDragHandler);
            document.removeEventListener('touchmove', currentDragHandler);
            currentDragHandler = void 0;
        }
    }

    function initScrollbar() {
        queueMicrotask(updateCustomScrollbar);
    }

    return [scrollbar, showScrollbar, onVerticalScrollbarMouseDown, onHorizontalScrollbarMouseDown, updateCustomScrollbar] as const;
}
