import { createSignal, createEffect, type Accessor } from 'solid-js';
import { ColKeyGen, MergeCellsParam, PrivateStkTableColumn, RowActiveOption, RowKeyGen, UniqKey } from '../types';
import { pureCellKeyGen } from '../utils';

export function useMergeCells(
    rowActiveProp: Accessor<RowActiveOption<any>>,
    tableHeaderLast: Accessor<PrivateStkTableColumn<any>[]>,
    rowKeyGen: RowKeyGen,
    colKeyGen: ColKeyGen,
    virtual_dataSourcePart: Accessor<any[]>,
) {
    /**
     * which cell need be hidden
     * - key: rowKey
     * - value: colKey Set
     */
    const [hiddenCellMap, setHiddenCellMap] = createSignal<Record<UniqKey, Set<UniqKey>> | null>(null);
    /**
     * hover other row and rowspan cell should be highlighted
     * - key: rowKey
     * - value: cellKey Set
     */
    const [hoverRowMap, setHoverRowMap] = createSignal<Record<UniqKey, Set<string>>>({});

    /** hover current row , which rowspan cells should be highlight */
    const [hoverMergedCells, setHoverMergedCells] = createSignal(new Set<string>());
    /** click current row , which rowspan cells should be highlight */
    const [activeMergedCells, setActiveMergedCells] = createSignal(new Set<string>());

    /** column index cache */
    let colIndexCache: Map<UniqKey, number> | null = null;

    createEffect(() => {
        // depend on virtual_dataSourcePart and tableHeaderLast
        virtual_dataSourcePart();
        tableHeaderLast();
        setHiddenCellMap(null);
        setHoverRowMap({});
        colIndexCache = null;
    });

    /**
     * abstract the logic of hiding cells
     */
    function hideCells(rowKey: UniqKey, colKey: UniqKey, colspan: number, isSelfRow = false, mergeCellKey: string) {
        const headers = tableHeaderLast();
        const colKeyGenValue = colKeyGen();

        // use columns cache to avoid repeat findIndex
        let startIndex = colIndexCache?.get(colKey);
        if (startIndex === void 0) {
            startIndex = headers.findIndex(item => colKeyGenValue(item) === colKey);
            if (startIndex < 0) return;

            if (!colIndexCache) colIndexCache = new Map();
            colIndexCache.set(colKey, startIndex);
        }

        // Initialize maps if needed
        const hoverRowMapValue = hoverRowMap();
        const hiddenCellMapValue = hiddenCellMap();
        if (!hoverRowMapValue[rowKey]) {
            hoverRowMapValue[rowKey] = new Set();
        }
        let hiddenMap = hiddenCellMapValue;
        if (!hiddenMap) {
            hiddenMap = {};
            setHiddenCellMap(hiddenMap);
        }
        if (!hiddenMap[rowKey]) {
            hiddenMap[rowKey] = new Set();
        }

        const hoverSet = hoverRowMapValue[rowKey];
        const hiddenSet = hiddenMap[rowKey];
        const endIndex = Math.min(startIndex + colspan, headers.length);

        for (let i = startIndex; i < endIndex; i++) {
            hoverSet.add(mergeCellKey);

            if (isSelfRow && i === startIndex) {
                // self row start cell does not need to be hidden
                continue;
            }

            const nextCol = headers[i];
            if (!nextCol) break;

            const nextColKey = colKeyGenValue(nextCol);
            hiddenSet.add(nextColKey);
        }
    }

    /**
     * calculate colspan and rowspan
     */
    function mergeCellsWrapper(
        row: MergeCellsParam<any>['row'],
        col: MergeCellsParam<any>['col'],
        rowIndex: MergeCellsParam<any>['rowIndex'],
        colIndex: MergeCellsParam<any>['colIndex'],
    ): { colspan?: number; rowspan?: number } | undefined {
        if (!col.mergeCells) return;

        let { colspan, rowspan } = col.mergeCells({ row, col, rowIndex, colIndex }) || {};

        // default colspan and rowspan is 1
        colspan = colspan || 1;
        rowspan = rowspan || 1;

        if (colspan === 1 && rowspan === 1) return;

        const rowKey = rowKeyGen(row);
        const colKey = colKeyGen()(col);
        const mergedCellKey = pureCellKeyGen(rowKey, colKey);

        for (let i = rowIndex; i < rowIndex + rowspan; i++) {
            const targetRow = virtual_dataSourcePart()[i];
            if (!targetRow) break;
            hideCells(rowKeyGen(targetRow), colKey, colspan, i === rowIndex, mergedCellKey);
        }

        return { colspan, rowspan };
    }

    const emptySet = new Set<string>();
    function updateHoverMergedCells(rowKey: UniqKey | undefined) {
        setHoverMergedCells(rowKey === void 0 ? emptySet : hoverRowMap()[rowKey] || emptySet);
    }

    function updateActiveMergedCells(clear?: boolean, rowKey?: UniqKey) {
        if (!rowActiveProp().enabled) return;
        if (clear) {
            setActiveMergedCells(new Set<string>());
            return;
        }
        setActiveMergedCells((rowKey !== void 0 && hoverRowMap()[rowKey]) || new Set<string>(hoverMergedCells()));
    }

    return [hiddenCellMap, mergeCellsWrapper, hoverMergedCells, updateHoverMergedCells, activeMergedCells, updateActiveMergedCells] as const;
}
