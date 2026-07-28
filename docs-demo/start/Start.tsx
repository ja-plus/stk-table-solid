import { onMount, onCleanup } from 'solid-js';
import StkTable from '../StkTable';
import type { StkTableColumn } from '../../src/StkTable/index';
import { useI18n } from '../hooks/useI18n/index';

type DataType = {
    id: string;
    name: string;
    age: number;
    address: string;
};

export default function Start() {
    const { t } = useI18n();

    let stkTableRef: any;

    const columns: StkTableColumn<DataType>[] = [
        { title: t('name'), dataIndex: 'name', key: 'name' },
        { title: t('age'), dataIndex: 'age', key: 'age', align: 'right' },
        { title: t('address'), dataIndex: 'address', key: 'address' },
    ];
    const dataSource: DataType[] = [
        { id: 'k1', name: 'Tom', age: 18, address: 'Beijing' },
        { id: 'k2', name: 'Jerry', age: 19, address: 'Shanghai' },
        { id: 'k3', name: 'Jack', age: 20, address: 'London' },
        { id: 'k4', name: 'Rose', age: 22, address: 'New York' },
    ];

    onMount(() => {
        const interval = window.setInterval(() => {
            stkTableRef?.setHighlightDimRow(['k1']); // highlight row
        }, 2000);
        onCleanup(() => {
            window.clearInterval(interval);
        });
    });

    return <StkTable ref={(i: any) => (stkTableRef = i)} rowKey="id" columns={columns} dataSource={dataSource}></StkTable>;
}
