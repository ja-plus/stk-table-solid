import StkTable from '../../StkTable';
import { getDataSource, columns } from './config';

const dataSource = getDataSource();

export default function TreeDefaultExpandAll() {
    return (
        <StkTable
            style={{ 'max-height': '250px' }}
            treeConfig={{ defaultExpandAll: true }}
            scrollbar
            columns={columns}
            dataSource={dataSource}
        />
    );
}
