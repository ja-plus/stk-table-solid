import { createSignal, For } from 'solid-js';
import {
    StkTable,
    registerFeature,
    useAreaSelection,
    createNumberCell,
    createChangeCell,
    createCheckboxCell,
    createEditableCell,
    createFilterCell,
    type StkTableColumn,
    type StkTableInstance,
} from '../src/StkTable';

// 注册按需功能（区域选择）
registerFeature(useAreaSelection);

// ---- 数据生成 ----
function genData(count: number) {
    const arr: any[] = [];
    for (let i = 0; i < count; i++) {
        arr.push({
            id: i,
            name: `名称${i}`,
            code: `CODE${String(i).padStart(6, '0')}`,
            price: +(Math.random() * 100).toFixed(2),
            change: +((Math.random() - 0.5) * 10).toFixed(2),
            volume: Math.floor(Math.random() * 1e8),
            category: ['A类', 'B类', 'C类'][i % 3],
            status: i % 2 === 0 ? '启用' : '禁用',
            remark: `这是第 ${i} 行的备注信息`,
        });
    }
    return arr;
}

// ---- 1. 基础表格 ----
function BasicDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '序号', type: 'seq', dataIndex: 'id', width: 60 },
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '代码', dataIndex: 'code', width: 120 },
        { title: '分类', dataIndex: 'category', width: 100 },
        { title: '状态', dataIndex: 'status', width: 100 },
        { title: '备注', dataIndex: 'remark' },
    ];
    const [dataSource] = createSignal(genData(50));
    return (
        <div class="demo-block">
            <h3>1. 基础表格（斑马纹 + 行悬停）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" stripe bordered />
        </div>
    );
}

// ---- 2. 虚拟滚动（大数据量）----
function VirtualDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '序号', type: 'seq', dataIndex: 'id', width: 70 },
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '代码', dataIndex: 'code', width: 120 },
        { title: '价格', dataIndex: 'price', width: 100, align: 'right' },
        { title: '成交量', dataIndex: 'volume', width: 120, align: 'right' },
        { title: '备注', dataIndex: 'remark' },
    ];
    const [dataSource] = createSignal(genData(100000));
    return (
        <div class="demo-block">
            <h3>2. 虚拟滚动（10万行）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" virtual />
        </div>
    );
}

// ---- 3. 排序 ----
function SortDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120, sorter: true, sortType: 'string' },
        { title: '价格', dataIndex: 'price', width: 120, sorter: true, sortType: 'number', align: 'right' },
        { title: '涨跌', dataIndex: 'change', width: 120, sorter: true, sortType: 'number', align: 'right' },
        { title: '成交量', dataIndex: 'volume', width: 140, sorter: true, sortType: 'number', align: 'right' },
    ];
    const [dataSource] = createSignal(genData(100));
    return (
        <div class="demo-block">
            <h3>3. 排序（点击表头）</h3>
            <StkTable
                style="height: 300px"
                columns={columns}
                dataSource={dataSource()}
                rowKey="id"
                virtual
                onSortChange={(col, order) => console.log('sort:', col?.dataIndex, order)}
            />
        </div>
    );
}

// ---- 4. 固定列 ----
function FixedDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120, fixed: 'left' },
        { title: '代码', dataIndex: 'code', width: 120, fixed: 'left' },
        { title: '价格', dataIndex: 'price', width: 100, align: 'right' },
        { title: '涨跌', dataIndex: 'change', width: 100, align: 'right' },
        { title: '成交量', dataIndex: 'volume', width: 120, align: 'right' },
        { title: '分类', dataIndex: 'category', width: 100 },
        { title: '状态', dataIndex: 'status', width: 100 },
        { title: '备注1', dataIndex: 'remark', width: 200 },
        { title: '备注2', dataIndex: 'remark', width: 200 },
        { title: '操作', dataIndex: 'id', width: 100, fixed: 'right' },
    ];
    const [dataSource] = createSignal(genData(200));
    return (
        <div class="demo-block">
            <h3>4. 固定列（左右固定 + 虚拟滚动）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" virtual />
        </div>
    );
}

// ---- 5. 数字/涨跌单元格 ----
const { NumberCell } = createNumberCell({ decimals: 2, thousands: true });
const { ChangeCell } = createChangeCell({ decimals: 2, showSign: true, arrow: true });
const { NumberCell: VolumeCell } = createNumberCell({ abbr: 'cn' });

function NumberChangeDemo() {
    const numberCell = NumberCell();
    const changeCell = ChangeCell();
    const volumeCell = VolumeCell();
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '现价', dataIndex: 'price', width: 120, align: 'right', customCell: numberCell },
        { title: '涨跌额', dataIndex: 'change', width: 140, align: 'right', customCell: changeCell },
        { title: '成交量', dataIndex: 'volume', width: 140, align: 'right', customCell: volumeCell },
    ];
    const [dataSource] = createSignal(genData(50));
    return (
        <div class="demo-block">
            <h3>5. 数字格式化 / 涨跌单元格</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" />
        </div>
    );
}

// ---- 6. 复选框 ----
const { CheckboxCell, CheckboxAllCell } = createCheckboxCell({
    field: '_isChecked',
    onChange: (checked, row) => console.log('checkbox:', checked, row.id),
    onSelectAll: checked => console.log('select all:', checked),
});

function CheckboxDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '', dataIndex: '_isChecked', width: 50, customCell: CheckboxCell(), customHeaderCell: CheckboxAllCell() },
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '代码', dataIndex: 'code', width: 120 },
        { title: '分类', dataIndex: 'category', width: 100 },
    ];
    const [dataSource] = createSignal(genData(30));
    return (
        <div class="demo-block">
            <h3>6. 复选框（表头全选）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" />
        </div>
    );
}

// ---- 7. 可编辑单元格 ----
const { EditableCell } = createEditableCell({
    trigger: 'dblclick',
    onChange: (v, row, key) => console.log('edit:', v, row.id, key),
});

function EditableDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '代码(双击编辑)', dataIndex: 'code', width: 160, customCell: EditableCell() },
        { title: '分类', dataIndex: 'category', width: 100 },
    ];
    const [dataSource] = createSignal(genData(30));
    return (
        <div class="demo-block">
            <h3>7. 可编辑单元格（双击编辑）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" />
        </div>
    );
}

// ---- 8. 筛选 ----
const { Filter } = createFilterCell({
    onChange: ({ colKey, status }) => console.log('filter:', colKey, status),
});

function FilterDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '分类', dataIndex: 'category', width: 120, customHeaderCell: Filter({ autoOptions: true }) },
        { title: '状态', dataIndex: 'status', width: 120, customHeaderCell: Filter({ autoOptions: true }) },
    ];
    const [dataSource] = createSignal(genData(60));
    return (
        <div class="demo-block">
            <h3>8. 筛选（自动提取选项）</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={dataSource()} rowKey="id" />
        </div>
    );
}

// ---- 9. 区域选择 ----
function AreaSelectionDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', width: 120 },
        { title: '代码', dataIndex: 'code', width: 120 },
        { title: '价格', dataIndex: 'price', width: 100, align: 'right' },
        { title: '涨跌', dataIndex: 'change', width: 100, align: 'right' },
        { title: '分类', dataIndex: 'category', width: 100 },
    ];
    const [dataSource] = createSignal(genData(100));
    return (
        <div class="demo-block">
            <h3>9. 区域选择（拖拽选择，Ctrl+C 复制）</h3>
            <StkTable
                style="height: 300px"
                columns={columns}
                dataSource={dataSource()}
                rowKey="id"
                virtual
                areaSelection={true}
                onAreaSelectionChange={ranges => console.log('area:', ranges)}
            />
        </div>
    );
}

// ---- 10. 树形数据 ----
function TreeDemo() {
    const columns: StkTableColumn<any>[] = [
        { title: '名称', dataIndex: 'name', type: 'tree-node', width: 200 },
        { title: '代码', dataIndex: 'code', width: 120 },
        { title: '价格', dataIndex: 'price', width: 100, align: 'right' },
    ];
    const treeData = [
        {
            id: 1,
            name: '父节点1',
            code: 'P1',
            price: 10,
            children: [
                { id: 11, name: '子节点1-1', code: 'C11', price: 11 },
                { id: 12, name: '子节点1-2', code: 'C12', price: 12 },
            ],
        },
        {
            id: 2,
            name: '父节点2',
            code: 'P2',
            price: 20,
            children: [{ id: 21, name: '子节点2-1', code: 'C21', price: 21 }],
        },
        { id: 3, name: '叶子节点3', code: 'L3', price: 30 },
    ];
    return (
        <div class="demo-block">
            <h3>10. 树形数据</h3>
            <StkTable style="height: 300px" columns={columns} dataSource={treeData} rowKey="id" />
        </div>
    );
}

// ---- App ----
export default function App() {
    return (
        <div style={{ padding: '16px', 'max-width': '1000px' }}>
            <h2>StkTable SolidJS Demo</h2>
            <BasicDemo />
            <VirtualDemo />
            <SortDemo />
            <FixedDemo />
            <NumberChangeDemo />
            <CheckboxDemo />
            <EditableDemo />
            <FilterDemo />
            <AreaSelectionDemo />
            <TreeDemo />
        </div>
    );
}
