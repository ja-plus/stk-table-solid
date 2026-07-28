import StkTable from '../../StkTable';
import type { StkTableColumn } from '../../../src/StkTable/index';
import NoData from '../../assets/svg-components/NoData';
import { useI18n } from '../../hooks/useI18n/index';

export default function EmptySlot() {
    const { t } = useI18n();
    const columns: StkTableColumn<any>[] = [
        { title: t('name'), dataIndex: 'name' },
        { title: t('age'), dataIndex: 'age' },
        { title: t('address'), dataIndex: 'address' },
        { title: t('gender'), dataIndex: 'gender' },
    ];
    return (
        <StkTable
            columns={columns}
            dataSource={[]}
            emptySlot={
                <div style={{ padding: '20px', display: 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
                    <NoData />
                    <p>
                        {t('noData')}{' '}
                        <a href="#" style={{ color: '#1890ff' }}>
                            {t('clickHere')}
                        </a>
                    </p>
                </div>
            }
        />
    );
}
