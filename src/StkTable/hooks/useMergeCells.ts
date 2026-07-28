import { createMemo, createSignal, type Accessor } from 'solid-js';
import { ColKeyGen, MergeCellsParam, PrivateStkTableColumn, RowActiveOption, RowKeyGen, UniqKey } from '../types';
import { pureCellKeyGen } from '../utils';

export function useMergeCells(
    rowActiveProp: Accessor<RowActiveOption<any>>,
    tableHeaderLast: Accessor<PrivateStkTableColumn<any>[]>,
    rowKeyGen: RowKeyGen,
    colKeyGen: ColKeyGen,
    virtual_dataSourcePart: Accessor<any[]>,
) {
    /** hover current row , which rowspan cells should be highlight */
    const [hoverMergedCells, setHoverMergedCells] = createSignal(new Set<string>());
    /** click current row , which rowspan cells should be highlight */
    const [activeMergedCells, setActiveMergedCells] = createSignal(new Set<string>());

    /**
     * en: Precompute merge layout of visible rows in a memo.
     * Vue 版在 render 期间惰性填充 map，并用 pre-flush watch 清空重建；
     * Solid 细粒度渲染在虚拟滚动时不会重跑复用行的单元格，惰性填充会导致
     * hidden/rowspan/hover 状态过期。这里改为 createMemo 全量重算，
     * 使可视窗口或列变化时合并布局始终保持一致。
     */
    const mergeState = createMemo(() => {
        const rows = virtual_dataSourcePart();
        const headers = tableHeaderLast();
        const colKeyGenValue = colKeyGen();

        /**
         * which cell need be hidden
         * - key: rowKey
         * - value: colKey Set
         */
        let hiddenCellMap: Record<UniqKey, Set<UniqKey>> | null = null;
        /**
         * hover other row and rowspan cell should be highlighted
         * - key: rowKey
         * - value: cellKey Set
         */
        const hoverRowMap: Record<UniqKey, Set<string>> = {};
        /** merged cellKey -> span info */
        const spanMap = new Map<string, { rowspan: number; colspan: number }>();

        for (let colIndex = 0; colIndex < headers.length; colIndex++) {
            const col = headers[colIndex];
            if (!col.mergeCells) continue;
            const colKey = colKeyGenValue(col);

            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                const row = rows[rowIndex];
                if (!row) continue;
                let { colspan, rowspan } = col.mergeCells({ row, col, rowIndex, colIndex: col.__LF_S__ ?? 0 } as MergeCellsParam<any>) || {};

                // default colspan and rowspan is 1
                colspan = colspan || 1;
                rowspan = rowspan || 1;
                if (colspan === 1 && rowspan === 1) continue;

                const mergedCellKey = pureCellKeyGen(rowKeyGen(row), colKey);
                spanMap.set(mergedCellKey, { rowspan, colspan });

                if (!hiddenCellMap) hiddenCellMap = {};
                const colEndIndex = Math.min(colIndex + colspan, headers.length);
                const rowEndIndex = Math.min(rowIndex + rowspan, rows.length);
                for (let i = rowIndex; i < rowEndIndex; i++) {
                    const targetRow = rows[i];
                    if (!targetRow) continue;
                    const targetRowKey = rowKeyGen(targetRow);
                    const hoverSet = hoverRowMap[targetRowKey] || (hoverRowMap[targetRowKey] = new Set());
                    const hiddenSet = hiddenCellMap[targetRowKey] || (hiddenCellMap[targetRowKey] = new Set());
                    for (let j = colIndex; j < colEndIndex; j++) {
                        hoverSet.add(mergedCellKey);
                        if (i === rowIndex && j === colIndex) {
                            // merged start cell does not need to be hidden
                            continue;
                        }
                        hiddenSet.add(colKeyGenValue(headers[j]));
                    }
                }
            }
        }
        return { hiddenCellMap, hoverRowMap, spanMap };
    });

    const hiddenCellMap: Accessor<Record<UniqKey, Set<UniqKey>> | null> = () => mergeState().hiddenCellMap;

    /**
     * get colspan and rowspan of a cell (reactive: reads the precomputed merge layout)
     */
    function mergeCellsWrapper(
        row: MergeCellsParam<any>['row'],
        col: MergeCellsParam<any>['col'],
    ): { colspan?: number; rowspan?: number } | undefined {
        if (!col.mergeCells) return;
        return mergeState().spanMap.get(pureCellKeyGen(rowKeyGen(row), colKeyGen()(col)));
    }

    const emptySet = new Set<string>();
    function updateHoverMergedCells(rowKey: UniqKey | undefined) {
        setHoverMergedCells(rowKey === void 0 ? emptySet : mergeState().hoverRowMap[rowKey] || emptySet);
    }

    function updateActiveMergedCells(clear?: boolean, rowKey?: UniqKey) {
        if (!rowActiveProp().enabled) return;
        if (clear) {
            setActiveMergedCells(new Set<string>());
            return;
        }
        setActiveMergedCells((rowKey !== void 0 && mergeState().hoverRowMap[rowKey]) || new Set<string>(hoverMergedCells()));
    }

    return [hiddenCellMap, mergeCellsWrapper, hoverMergedCells, updateHoverMergedCells, activeMergedCells, updateActiveMergedCells] as const;
}
