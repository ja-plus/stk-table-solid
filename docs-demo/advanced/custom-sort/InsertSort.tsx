import { createSignal } from 'solid-js';
import StkTable from '../../StkTable';
import { insertToOrderedArray, tableSort } from '../../../src/StkTable/index';
import type { Order, SortConfig, SortState, StkTableColumn } from '../../../src/StkTable/index';

type DataType = {
    id: number;
    name: string | null;
    age: number | null;
    gender: number;
};

const columns: StkTableColumn<DataType>[] = [
    { title: 'ID', dataIndex: 'id', width: '50px', sorter: true },
    { title: 'Name', dataIndex: 'name', width: '200px', sorter: true },
    {
        title: 'Age(default desc)',
        dataIndex: 'age',
        width: '200px',
        sorter: true,
        sortType: 'number',
    },
    { title: 'Gender', dataIndex: 'gender' },
];

const initialData: DataType[] = new Array(5).fill(null).map((it, i) => {
    return {
        id: i,
        name: i % 2 === 0 ? null : 'name' + i,
        age: i % 2 === 0 ? null : i,
        gender: i + 1,
    };
});

const defaultSort: SortState<DataType> = {
    dataIndex: 'age',
    order: 'desc',
};

export default function InsertSortDemo() {
    let stkTableRef: any;
    const [dataSource, setDataSource] = createSignal<DataType[]>(initialData);
    const tableSortStore: SortState<DataType> = { ...defaultSort };
    const sortConfig: SortConfig<DataType> = {
        emptyToBottom: true,
        defaultSort,
    };
    let count = initialData.length;

    function handleSortChange(col: StkTableColumn<DataType> | null, order: Order, data: DataType[], sortConfig: SortConfig<DataType>) {
        if (!col) return;
        setDataSource(tableSort(col, order, data, sortConfig));
        // order 为 null 时回退到 defaultSort，确保 tableSortStore 与实际排序状态一致
        const effectiveOrder = order || sortConfig.defaultSort?.order;
        const effectiveIndex = order ? (col.dataIndex as keyof DataType) : sortConfig.defaultSort?.dataIndex;
        tableSortStore.dataIndex = effectiveIndex || (col.dataIndex as keyof DataType);
        tableSortStore.order = effectiveOrder || null;
    }

    function addRow() {
        const random = Math.random() * 10;
        const item: DataType = {
            id: count++,
            name: 'name' + random,
            age: random,
            gender: random,
        };
        setDataSource(insertToOrderedArray(tableSortStore, item, dataSource(), sortConfig));
        setTimeout(() => {
            stkTableRef?.setHighlightDimRow([item.id]);
        }, 0);
    }

    function clear() {
        setDataSource([]);
    }

    return (
        <div>
            <button class="btn" onClick={addRow}>
                Insert
            </button>
            <button class="btn" onClick={clear}>
                Clear
            </button>
            <StkTable
                ref={(i: any) => (stkTableRef = i)}
                rowKey="id"
                style="height:200px"
                maxWidth="max-content"
                sortRemote
                columns={columns}
                dataSource={dataSource()}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
            />
        </div>
    );
}
