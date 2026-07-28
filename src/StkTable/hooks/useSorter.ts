import { createSignal, createMemo, type Accessor } from 'solid-js';
import { DEFAULT_SORT_CONFIG } from '../const';
import type { Order, SortConfig, SortOption, SortState, StkTableColumn, UniqKey } from '../types/index';
import { tableSort } from '../utils/index';

/**
 * 排序切换顺序
 * 循环顺序：null → desc → asc → null → ...
 */
const SORT_SWITCH_ORDER: Order[] = [null, 'desc', 'asc'] as const;

export type SorterEmits = {
    onSortChange?: (col: StkTableColumn<any> | null, order: Order, data: any[], sortConfig: SortConfig<any>) => void;
};

/**
 * 排序 Hook
 * 管理表格排序状态和相关操作
 */
export function useSorter<DT extends Record<string, any>>(
    props: any,
    emits: SorterEmits,
    colKeyGen: Accessor<(col: StkTableColumn<DT>) => string>,
    tableHeaderLast: Accessor<StkTableColumn<DT>[]>,
    dataSourceCopy: Accessor<DT[]>,
    initDataSource: (data?: DT[], option?: { forceSort?: boolean }) => void,
) {
    /** 多列排序状态数组 */
    const [sortStates, setSortStates] = createSignal<SortState<DT>[]>([]);

    /** 是否启用多列排序 */
    const isMultiSort = createMemo(() => props.sortConfig.multiSort ?? false);

    /** 多列排序限制 */
    const multiSortLimit = createMemo(() => props.sortConfig.multiSortLimit ?? 3);

    /** 对外暴露：当前排序的列 key（只读计算属性） */
    const sortCol = createMemo<keyof DT | undefined>(() => sortStates()[0]?.dataIndex);

    /**
     * 获取列的排序状态
     */
    function getColumnSortState(colKey: UniqKey): SortState<DT> | undefined {
        return sortStates()[getSortStateIndex(colKey)] as SortState<DT> | undefined;
    }

    /**
     * 获取列的排序状态索引
     */
    function getSortStateIndex(colKey: UniqKey): number {
        return sortStates().findIndex(s => s.key === colKey || s.dataIndex === colKey);
    }

    function getTableCol(state: { key?: SortState<DT>['key']; dataIndex: SortState<DT>['dataIndex'] }) {
        return tableHeaderLast().find(c => (state.key && colKeyGen()(c) === state.key) || c.dataIndex === state.dataIndex);
    }

    /**
     * 获取排序列信息
     */
    function getSortColumns(): { key: keyof DT | undefined; order: Order }[] {
        return sortStates().map(s => ({ key: s.key || s.dataIndex, order: s.order }));
    }

    /**
     * 添加或更新排序状态到 sortStates
     * @param newState 新的排序状态
     * @param mode '1' - 追加模式（多列排序），0 - 替换模式（单列排序）
     */
    function addOrUpdateSortState(newState: SortState<DT>, mode?: 1 | 0) {
        const states = sortStates().slice();
        const existingIndex = states.findIndex(s => s.key === (newState.key || newState.dataIndex) || s.dataIndex === (newState.key || newState.dataIndex));

        if (existingIndex >= 0) {
            states.splice(existingIndex, 1);
        }

        if (mode && isMultiSort()) {
            if (states.length >= multiSortLimit()) {
                states.pop();
            }
            states.unshift(newState as any);
            setSortStates(states);
        } else {
            setSortStates([newState as any]);
        }
    }

    /**
     * 更新排序状态（点击表头时调用）
     */
    function updateSortState(col: StkTableColumn<DT>, sortConfig: SortConfig<DT>): Order {
        const colKey = colKeyGen()(col);
        const existingIndex = getSortStateIndex(colKey);
        let newOrder: Order;

        const defaultSort = sortConfig.defaultSort;

        if (existingIndex >= 0) {
            const currentOrder = sortStates()[existingIndex].order;
            if (currentOrder && defaultSort && (defaultSort.key === colKey || defaultSort.dataIndex === col.dataIndex)) {
                const defaultSwitchOrder = SORT_SWITCH_ORDER.filter(order => order !== null);
                const currentIndex = defaultSwitchOrder.indexOf(currentOrder);
                newOrder = defaultSwitchOrder[(currentIndex + 1) % defaultSwitchOrder.length];
            } else {
                const currentIndex = SORT_SWITCH_ORDER.indexOf(currentOrder);
                newOrder = SORT_SWITCH_ORDER[(currentIndex + 1) % 3];
            }

            if (newOrder) {
                const updatedState = { ...sortStates()[existingIndex], order: newOrder };
                addOrUpdateSortState(updatedState as any, 1);
            } else {
                const states = sortStates().slice();
                states.splice(existingIndex, 1);
                setSortStates(states);
                if (defaultSort?.order) {
                    const defaultSortCol = getTableCol(defaultSort);
                    const { key, sortField, sortType } = defaultSortCol || {};
                    addOrUpdateSortState({ key, sortField, sortType, ...defaultSort } as any, 1);
                }
            }
        } else {
            newOrder = SORT_SWITCH_ORDER[1];

            const newState: SortState<DT> = {
                key: colKey,
                dataIndex: col.dataIndex,
                sortField: col.sortField,
                sortType: col.sortType,
                order: newOrder,
            };

            addOrUpdateSortState(newState, 1);
        }

        return newOrder;
    }

    /**
     * 对数据源执行排序
     */
    function sortData(dataSource: DT[]): DT[] {
        if (!sortStates().length) return dataSource;

        const sortConfig = { ...DEFAULT_SORT_CONFIG, ...props.sortConfig };
        let result = dataSource.slice();

        // 从后往前排序，这样前面的排序优先级更高
        const states = sortStates();
        for (let i = states.length - 1; i >= 0; i--) {
            const state = states[i];
            const col = getTableCol(state);
            if (col && state.order) {
                const colSortConfig = { ...sortConfig, ...col.sortConfig };
                result = tableSort(col, state.order, result, colSortConfig);
            }
        }

        return result;
    }

    /**
     * 表头点击排序
     */
    function onColumnSort(col: StkTableColumn<DT> | undefined | null) {
        if (!col) {
            console.warn('onColumnSort: not found col:', col);
            return;
        }
        if (!col.sorter) {
            return;
        }

        const sortConfig: SortConfig<DT> = { ...DEFAULT_SORT_CONFIG, ...props.sortConfig, ...col.sortConfig };
        const order = updateSortState(col, sortConfig);

        if (!props.sortRemote) {
            initDataSource();
        }

        emits.onSortChange?.(col, order, dataSourceCopy(), sortConfig);
    }

    /**
     * 设置表头排序状态
     */
    function setSorter(
        colKey: string,
        order: Order,
        option: { sortOption?: SortOption<DT>; force?: boolean; silent?: boolean; sort?: boolean; append?: boolean } = {},
    ): DT[] {
        const newOption = { silent: true, sortOption: null, sort: true, append: false, ...option };
        const colKeyGenValue = colKeyGen();
        let column: StkTableColumn<DT> | undefined;

        if (order) {
            column = newOption.sortOption || tableHeaderLast().find(it => colKeyGenValue(it) === colKey);
            if (column) {
                const newState: SortState<DT> = {
                    key: colKey,
                    dataIndex: column.dataIndex,
                    sortField: column.sortField,
                    sortType: column.sortType,
                    order,
                };

                const mode = newOption.append && isMultiSort() ? 1 : 0;
                addOrUpdateSortState(newState, mode);
            }
        } else {
            setSortStates([]);
        }

        if (newOption.sort && dataSourceCopy()?.length) {
            if (!props.sortRemote || newOption.force) {
                initDataSource(props.dataSource, { forceSort: newOption.force });
            }
        }

        if (!newOption.silent) {
            if (!column) {
                column = newOption.sortOption || tableHeaderLast().find(it => colKeyGenValue(it) === colKey);
            }
            if (column) {
                emits.onSortChange?.(column, order, dataSourceCopy(), props.sortConfig);
            } else {
                console.warn('Can not find column by key:', colKey);
            }
        }

        return dataSourceCopy();
    }

    /**
     * 重置排序器
     */
    function resetSorter() {
        setSortStates([]);
        initDataSource();
    }

    /**
     * 处理默认排序
     */
    function dealDefaultSorter() {
        if (!props.sortConfig.defaultSort) return;
        const { key, dataIndex, order, silent } = { silent: true, ...props.sortConfig.defaultSort };
        setSorter((key || dataIndex) as string, order, { force: false, silent });
    }

    return [sortStates, sortCol, onColumnSort, setSorter, resetSorter, getSortColumns, dealDefaultSorter, getColumnSortState, sortData] as const;
}
