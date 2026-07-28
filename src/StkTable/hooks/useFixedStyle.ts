import type { Accessor } from 'solid-js';
import { StkTableColumn, TagType } from '../types';
import { VirtualScrollStore, VirtualScrollXStore } from './useVirtualScroll';

/**
 * 固定列style
 */
export function useFixedStyle<DT extends Record<string, any>>(
    props: any,
    isRelativeMode: Accessor<boolean>,
    getFixedColPosition: Accessor<(col: StkTableColumn<DT>) => number>,
    virtualScroll: Accessor<VirtualScrollStore>,
    virtualScrollX: Accessor<VirtualScrollXStore>,
    virtualX_on: Accessor<boolean>,
    virtualX_offsetRight: Accessor<number>,
) {
    /**
     * fixed columns style
     * @param tagType 1-th 2-td
     * @param col
     * @param depth tagType = 1时使用
     */
    function getFixedStyle(tagType: TagType, col: StkTableColumn<DT>, depth = 0): string {
        const { fixed } = col;
        if ((tagType === TagType.TD || tagType === TagType.TF) && !fixed) return '';

        const { headerRowHeight, rowHeight } = props;
        const isFixedLeft = fixed === 'left';
        const { scrollLeft, scrollWidth, offsetLeft, containerWidth } = virtualScrollX();
        const scrollRight = scrollWidth - containerWidth - scrollLeft;

        let style = '';

        if (tagType === TagType.TH) {
            if (!isRelativeMode()) {
                if (depth) {
                    style += `top:${depth * (headerRowHeight ?? rowHeight)}px;`;
                }
            } else {
                style += `top:${virtualScroll().scrollTop}px;`;
            }
        } else if (tagType === TagType.TF) {
            style += 'bottom:0;';
        }

        if (fixed) {
            if (!isRelativeMode()) {
                const lr = getFixedColPosition()(col) + 'px';
                if (isFixedLeft) {
                    style += `left:${lr};`;
                } else {
                    style += `right:${lr};`;
                }
            } else {
                if (isFixedLeft) {
                    style += `left:${scrollLeft - (virtualX_on() ? offsetLeft : 0)}px;`;
                } else {
                    style += `right:${Math.max(scrollRight - (virtualX_on() ? virtualX_offsetRight() : 0), 0)}px;`;
                }
            }
        }

        return style;
    }

    return getFixedStyle;
}
