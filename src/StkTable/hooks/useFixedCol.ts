import { createSignal, createMemo, type Accessor } from 'solid-js';
import { StkTableColumn, UniqKey } from '../types';
import { VirtualScrollXStore } from './useVirtualScroll';
import { getCalculatedColWidth } from '../utils/constRefUtils';

/**
 * 固定列处理
 */
export function useFixedCol<DT extends Record<string, any>>(
    props: any,
    colKeyGen: Accessor<(col: StkTableColumn<DT>) => UniqKey>,
    getFixedColPosition: Accessor<(col: StkTableColumn<DT>) => number>,
    tableHeaders: Accessor<StkTableColumn<DT>[][]>,
    tableHeadersForCalc: Accessor<StkTableColumn<DT>[][]>,
    tableContainerRef: Accessor<HTMLDivElement | undefined>,
) {
    /** 保存需要出现阴影的列 */
    const [fixedShadowCols, setFixedShadowCols] = createSignal<StkTableColumn<DT>[]>([]);

    /** 正在被固定的列 */
    const [fixedCols, setFixedCols] = createSignal<StkTableColumn<DT>[]>([]);

    /** 固定列的class */
    const fixedColClassMap = createMemo(() => {
        const colMap = new Map();
        const fixedShadowColsValue = fixedShadowCols();
        const fixedColsValue = fixedCols();
        const colKeyFn = colKeyGen();
        const fixedColShadow = props.fixedColShadow;
        const headers = tableHeaders();

        for (let i = 0, len = headers.length; i < len; i++) {
            const cols = headers[i];
            for (let j = 0, colLen = cols.length; j < colLen; j++) {
                const col = cols[j];
                const fixed = col.fixed;
                const showShadow = fixed && fixedColShadow && fixedShadowColsValue.includes(col);
                const classList = [];

                if (fixedColsValue.includes(col)) {
                    classList.push('fixed-cell--active');
                }
                if (fixed) {
                    classList.push('fixed-cell');
                    classList.push('fixed-cell--' + fixed);
                }
                if (showShadow) {
                    classList.push('fixed-cell--shadow');
                }
                // SolidJS 的 class 必须是字符串（不像 Vue 会自动展平数组），这里用空格连接
                colMap.set(colKeyFn(col), classList.join(' '));
            }
        }
        return colMap;
    });

    /** 滚动条变化时，更新需要展示阴影的列 */
    function updateFixedShadow(virtualScrollX?: Accessor<VirtualScrollXStore>) {
        const fixedColsTemp: StkTableColumn<DT>[] = [];
        const getFixedColPositionValue = getFixedColPosition();
        let clientWidth, scrollLeft;

        if (virtualScrollX?.()) {
            const { containerWidth: cw, scrollLeft: sl } = virtualScrollX();
            clientWidth = cw;
            scrollLeft = sl;
        } else {
            const { clientWidth: cw, scrollLeft: sl } = tableContainerRef() as HTMLDivElement;
            clientWidth = cw;
            scrollLeft = sl;
        }

        /** 左侧需要展示阴影的列 */
        const leftShadowCol: StkTableColumn<DT>[] = [];
        /** 右侧展示阴影的列 */
        const rightShadowCol: StkTableColumn<DT>[] = [];
        const len = tableHeadersForCalc().length;
        for (let level = 0; level < len; level++) {
            const row = tableHeadersForCalc()[level];
            /**
             * 最右侧连续 fixed:right 列的起始下标。
             * 这些列的固定偏移只由其右侧固定列宽度决定，不依赖中间列的声明宽度，
             * 且 sticky/relative 在无横向溢出时偏移为0无副作用，因此无需判断滚动位置，始终固定。
             */
            let rightSuffixStart = row.length;
            while (rightSuffixStart > 0 && row[rightSuffixStart - 1].fixed === 'right') {
                rightSuffixStart--;
            }
            let left = 0;
            for (let i = 0, rowLen = row.length; i < rowLen; i++) {
                const col = row[i];
                const position = getFixedColPositionValue(col);
                const isFixedLeft = col.fixed === 'left';
                const isFixedRight = col.fixed === 'right';

                if (isFixedLeft && position + scrollLeft > left) {
                    fixedColsTemp.push(col);
                    leftShadowCol[level] = col;
                }

                left += getCalculatedColWidth(col);

                if (isFixedRight) {
                    /** 是否需要固定。依赖列声明宽度累加，声明宽度与实际渲染宽度不一致时会失真 */
                    const needFix = scrollLeft + clientWidth - left < position;
                    if (i >= rightSuffixStart || needFix) {
                        fixedColsTemp.push(col);
                    }
                    // 右固定列阴影，只要第一列。阴影仍按滚动位置判断，避免未遮挡时也显示阴影
                    if (needFix && !rightShadowCol[level]) {
                        rightShadowCol[level] = col;
                    }
                }
            }
        }

        if (props.fixedColShadow) {
            setFixedShadowCols(leftShadowCol.concat(rightShadowCol).filter(Boolean) as StkTableColumn<DT>[]);
        }

        setFixedCols(fixedColsTemp);
    }

    return [fixedCols, fixedColClassMap, updateFixedShadow] as const;
}
