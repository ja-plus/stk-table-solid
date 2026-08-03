import StkTable from '../../StkTable';
import { getDataSource, columns } from './config';

const dataSource = getDataSource();

export default function TreeDefaultExpandKeys() {
    let tableRef: any;

    function handleToggleChina() {
        tableRef?.setTreeExpand(['China']);
    }

    return (
        <>
            <div style={{ 'margin-bottom': '12px' }}>
                <button class="btn" onClick={handleToggleChina}>
                    Toggle China
                </button>
            </div>
            <StkTable
                ref={(i: any) => (tableRef = i)}
                style={{ 'max-height': '250px' }}
                rowKey="area"
                treeConfig={{ defaultExpandKeys: ['Asia', 'China', 'Zhejiang'] }}
                columns={columns}
                dataSource={dataSource}
            />
        </>
    );
}
