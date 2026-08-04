import StkTable from '../../StkTable';
import { getDataSource, columns } from './config';

const dataSource = getDataSource();

export default function TreeSetExpand() {
    let tableRef: any;

    function handleToggleAll() {
        tableRef?.setTreeExpand(dataSource, { all: true });
    }
    function handleCollapseAll() {
        tableRef?.setTreeExpand(dataSource, { all: true, expand: false });
    }

    function handleToggleAsia() {
        tableRef?.setTreeExpand(['Asia']);
    }
    function handleExpandAllAsia() {
        tableRef?.setTreeExpand(['Asia'], { expand: true, all: true });
    }
    function handleCollapseAllAsia() {
        tableRef?.setTreeExpand(['Asia'], { expand: false, all: true });
    }
    function handleExpandToLevel2() {
        tableRef?.setTreeExpand(['Asia'], { expand: true, level: 2 });
    }
    function handleCollapseToLevel1() {
        tableRef?.setTreeExpand(['Asia'], { expand: false, level: 1 });
    }
    function handleExpandZhejiangParents() {
        tableRef?.setTreeExpand(['Zhejiang'], { expand: true, parents: true });
    }
    function handleCollapseZhejiangParents() {
        tableRef?.setTreeExpand(['Zhejiang'], { expand: false, parents: true });
    }

    return (
        <>
            <div style={{ 'margin-bottom': '12px', display: 'flex', 'flex-wrap': 'wrap', gap: '8px' }}>
                <button class="btn" onClick={handleToggleAll}>
                    Toggle All
                </button>
                <button class="btn" onClick={handleCollapseAll}>
                    Collapse All
                </button>
                <button class="btn" onClick={handleToggleAsia}>
                    Toggle Asia
                </button>
                <button class="btn" onClick={handleExpandAllAsia}>
                    Expand All Asia
                </button>
                <button class="btn" onClick={handleCollapseAllAsia}>
                    Collapse All Asia
                </button>
                <button class="btn" onClick={handleExpandToLevel2}>
                    Expand Asia to Level 2
                </button>
                <button class="btn" onClick={handleCollapseToLevel1}>
                    Collapse Asia to Level 1
                </button>
                <button class="btn" onClick={handleExpandZhejiangParents}>
                    Expand Parents of Zhejiang
                </button>
                <button class="btn" onClick={handleCollapseZhejiangParents}>
                    Collapse Parents of Zhejiang
                </button>
            </div>
            <StkTable
                ref={(i: any) => (tableRef = i)}
                style={{ 'max-height': '300px' }}
                rowKey="area"
                columns={columns}
                dataSource={dataSource}
            />
        </>
    );
}
