import type { Accessor } from 'solid-js';
import { PrivateStkTableColumn, RowKeyGen, UniqKey } from '../types';

export function useMaxRowSpan(
    props: any,
    tableHeaderLast: Accessor<PrivateStkTableColumn<any>[]>,
    rowKeyGen: RowKeyGen,
    dataSourceCopy: Accessor<any[]>,
) {
    /** max rowspan of each row */
    const maxRowSpan = new Map<UniqKey, number>();

    /**
     * Use dataSourceCopy and tableHeaderLast to calculate maxRowSpan
     */
    function updateMaxRowSpan() {
        if (!props.virtual) {
            if (maxRowSpan.size) maxRowSpan.clear();
            return;
        }
        maxRowSpan.clear();

        const data = dataSourceCopy();
        const columns = tableHeaderLast();

        const columnsWithMerge = columns.filter(col => col.mergeCells);
        if (!columnsWithMerge.length) return;

        const dataLength = data.length;
        const mergeColumnsLength = columnsWithMerge.length;

        for (let rowIndex = 0; rowIndex < dataLength; rowIndex++) {
            const row = data[rowIndex];
            const rowKey = rowKeyGen(row);
            let currentMax = maxRowSpan.get(rowKey) || 0;

            for (let colIndex = 0; colIndex < mergeColumnsLength; colIndex++) {
                const col = columnsWithMerge[colIndex];
                const { rowspan = 1 } = col.mergeCells!({ row, col, rowIndex, colIndex }) || {};

                if (rowspan > 1 && rowspan > currentMax) {
                    currentMax = rowspan;
                    maxRowSpan.set(rowKey, currentMax);
                }
            }
        }
    }
    return [maxRowSpan, updateMaxRowSpan] as const;
}
