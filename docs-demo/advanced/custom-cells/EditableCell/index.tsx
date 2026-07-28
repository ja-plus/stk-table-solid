import { createSignal } from 'solid-js';
import StkTable from '../../../StkTable';
import { createEditableCell } from '../../../../src/StkTable/index';
import type { StkTableColumn } from '../../../../src/StkTable/index';
import { useI18n } from '../../../hooks/useI18n/index';

interface RowData {
    id: number;
    name: string;
    age: number;
    address: string;
}

export default function EditableCellDemo() {
    const { t } = useI18n();

    const [dataSource] = createSignal<RowData[]>([
        { id: 1, name: t('zhangSan'), age: 28, address: t('haidian') },
        { id: 2, name: t('liSi'), age: 32, address: t('pudong') },
        { id: 3, name: t('wangWu'), age: 25, address: t('tianhe') },
    ]);

    const { EditableCell } = createEditableCell({
        onChange: (newValue, row, dataIndex) => {
            console.log(t('valueChange'), { newValue, row, dataIndex });
        },
    });

    const editableCell = EditableCell();

    const columns: StkTableColumn<RowData>[] = [
        { title: 'ID', dataIndex: 'id', width: 60 },
        { title: t('name'), dataIndex: 'name', width: 100, customCell: editableCell },
        { title: t('age'), dataIndex: 'age', width: 80, customCell: editableCell },
        { title: t('address'), dataIndex: 'address', customCell: editableCell },
    ];

    return (
        <StkTable
            rowKey="id"
            cellHover
            cellActive
            selectedCellRevokable={false}
            rowActive={false}
            rowHover={false}
            columns={columns}
            dataSource={dataSource()}
        />
    );
}
