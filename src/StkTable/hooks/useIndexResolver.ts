import type { Accessor } from 'solid-js';
import type { StkTableColumn, UniqKey } from '../types';

export function useIndexResolver<DT extends Record<string, any>>(
    dataSourceRef: Accessor<DT[]>,
    columnsRef: Accessor<StkTableColumn<DT>[]>,
    rowKeyGen: (row: DT | null | undefined) => UniqKey,
) {
    function getRowIndex(row: DT): number {
        const targetKey = rowKeyGen(row);
        const data = dataSourceRef();
        for (let i = 0; i < data.length; i++) {
            if (rowKeyGen(data[i]) === targetKey) return i;
        }
        return -1;
    }

    function getColumnIndex(column: StkTableColumn<DT>): number {
        const targetDataIndex = column?.dataIndex;
        if (targetDataIndex === void 0 || targetDataIndex === null) return -1;
        const columns = columnsRef();
        for (let i = 0; i < columns.length; i++) {
            if (columns[i]?.dataIndex === targetDataIndex) return i;
        }
        return -1;
    }

    return [getRowIndex, getColumnIndex] as const;
}
