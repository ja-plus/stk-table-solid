import { createSignal } from 'solid-js';
import StkTable from '../../StkTable';
import type { StkTableColumn } from '../../../src/StkTable/index';
import { useI18n } from '../../hooks/useI18n/index';

export default function NoDataFull() {
    const { t } = useI18n();
    const [noDataFull, setNoDataFull] = createSignal(true);
    const columns: StkTableColumn<any>[] = [
        { title: t('name'), dataIndex: 'name' },
        { title: t('age'), dataIndex: 'age' },
        { title: t('address'), dataIndex: 'address' },
        { title: t('gender'), dataIndex: 'gender' },
    ];
    return (
        <div>
            <label>
                <input type="checkbox" checked={noDataFull()} onChange={e => setNoDataFull(e.currentTarget.checked)} />
                <span>{t('noDataFull')}</span>
            </label>
            <StkTable style={{ height: '200px' }} noDataFull={noDataFull()} columns={columns} dataSource={[]} />
        </div>
    );
}
