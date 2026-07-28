import StkTable from '../../StkTable';
import { getDataSource, columns } from '../tree/config';

export default function SortChildren() {
    const dataSource = getDataSource();
    return (
        <StkTable
            style="max-height:300px"
            treeConfig={{ defaultExpandAll: true }}
            sortConfig={{ sortChildren: true }}
            columns={columns}
            dataSource={dataSource}
        />
    );
}
