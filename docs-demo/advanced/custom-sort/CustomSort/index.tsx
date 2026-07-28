import StkTable from '../../../StkTable';
import type { StkTableColumn } from '../../../../src/StkTable/index';

type DataType = {
    key: string;
    name: string;
    rate: string;
};

/** 用数组下表表示权重 */
const RATE_ARR = ['D', 'C', 'B-', 'B', 'B+', 'BB', 'BBB', 'A-', 'A', 'A+', 'AA', 'AA+', 'AAA'];

/** 自定义排序函数 */
const customRateSorter: StkTableColumn<DataType>['sorter'] = (data, { column, order }) => {
    const key = column.dataIndex as keyof DataType;
    if (order === 'desc') {
        data.sort((a, b) => RATE_ARR.indexOf(b[key]) - RATE_ARR.indexOf(a[key]));
    } else if (order === 'asc') {
        data.sort((a, b) => RATE_ARR.indexOf(a[key]) - RATE_ARR.indexOf(b[key]));
    }
    return data;
};

const columns: StkTableColumn<DataType>[] = [
    { title: 'No.', dataIndex: '' as any, type: 'seq', width: 50 },
    { title: 'Name', dataIndex: 'name', sorter: true },
    { title: 'Rate', dataIndex: 'rate', sorter: customRateSorter },
];

const dataSource: DataType[] = Array.from({ length: 100 }, (_, i) => ({
    key: String(i),
    name: `Name ${i}`,
    rate: RATE_ARR[Math.floor(Math.random() * RATE_ARR.length)],
}));

export default function CustomSortDemo() {
    let stkTableRef: any;

    function handleSortDesc() {
        stkTableRef?.setSorter('rate', 'desc');
    }
    function handleSortAsc() {
        stkTableRef?.setSorter('rate', 'asc');
    }

    return (
        <div>
            <button class="btn" onClick={handleSortDesc}>
                Desc
            </button>
            <button class="btn" onClick={handleSortAsc}>
                Asc
            </button>
            <StkTable ref={(i: any) => (stkTableRef = i)} style="height:200px" rowKey="key" columns={columns} dataSource={dataSource} />
        </div>
    );
}
