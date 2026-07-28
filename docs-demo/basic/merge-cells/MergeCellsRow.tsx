import { createSignal } from 'solid-js';
import StkTable from '../../StkTable';
import type { StkTableColumn } from '../../../src/StkTable/index';
import { useI18n } from '../../hooks/useI18n/index';

export default function MergeCellsRow() {
    const { t } = useI18n();

    let stkTableRef: any;

    const rowSpanCount = {
        asia: 5,
        china: 3,
    };

    const [dataSource, setDataSource] = createSignal([
        { id: '1-1-1', continent: 'Asia', country: 'China', province: 'Beijing' },
        { id: '1-1-2', continent: 'Asia', country: 'China', province: 'Shanghai' },
        { id: '1-1-3', continent: 'Asia', country: 'China', province: 'Guangzhou' },
        { id: '1-2-1', continent: 'Asia', country: 'Japan', province: 'Tokyo' },
        { id: '1-3-1', continent: 'Asia', country: 'Korea', province: 'Seoul' },
        { id: '2-1-1', continent: 'Europe', country: 'France', province: 'Paris' },
        { id: '2-2-1', continent: 'Europe', country: 'England', province: 'England' },
    ]);

    const columns: StkTableColumn<any>[] = [
        {
            title: t('continent'),
            dataIndex: 'continent',
            mergeCells({ row }) {
                if (row.id === '1-1-1') {
                    return { rowspan: rowSpanCount.asia };
                } else if (row.id === '2-1-1') {
                    return { rowspan: 2 };
                }
            },
        },
        {
            title: t('country'),
            dataIndex: 'country',
            mergeCells({ row }) {
                if (row.id === '1-1-1') {
                    return { rowspan: rowSpanCount.china };
                }
            },
        },
        { title: t('province'), dataIndex: 'province' },
    ];

    function deleteARow() {
        const temp: any = JSON.parse(JSON.stringify(dataSource()));
        const i = temp.findIndex((it: any) => it.id === '1-1-3');
        if (i < 0) return;
        temp.splice(i, 1);
        rowSpanCount.asia = 4;
        rowSpanCount.china = 2;
        setDataSource(temp);
    }

    function setCurrentRow() {
        stkTableRef?.setCurrentRow('1-1-3');
    }

    return (
        <div>
            <button class="btn" onClick={deleteARow}>
                {t('deleteGuangzhouRow')}
            </button>
            <button class="btn" onClick={setCurrentRow}>
                {t('setCurrentRowGuangzhou')}
            </button>
            <StkTable ref={(i: any) => (stkTableRef = i)} style={{ maxHeight: '300px' }} cellHover rowKey="id" columns={columns} dataSource={dataSource()} />
        </div>
    );
}
