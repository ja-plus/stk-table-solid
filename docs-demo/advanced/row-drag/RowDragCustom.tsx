import { createContext, useContext, createSignal } from 'solid-js';
import StkTable from '../../StkTable';
import type { StkTableColumn, CustomCellProps } from '../../../src/StkTable/index';
import CheckItem from '../../components/CheckItem';

type Row = { id: number; name: string; email: string; phone: string };

const DragCtx = createContext<{ reorder: (src: number, end: number) => void; getRowIndex: (row: Row) => number }>();

function addHoverStyle(target: HTMLElement) {
    const tr = target.closest('tr');
    if (tr) {
        tr.style.boxShadow = 'inset 0 -2px 0 0 #1d63d9';
    }
}
function removeHoverStyle(target: HTMLElement) {
    const tr = target.closest('tr');
    if (tr) {
        tr.style.removeProperty('box-shadow');
    }
}

function handleDragStart(e: DragEvent, startIndex: number) {
    const target = e.currentTarget as HTMLElement;
    const tr = target.closest('tr');
    if (tr) {
        e.dataTransfer?.setDragImage(tr, 50, 10);
        tr.style.opacity = '0.5';
    }
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('sourceIndex', String(startIndex)); // 保存拖动开始的位置
    }
}

function handleDragEnd(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    const tr = target.closest('tr');
    if (tr) {
        tr.style.opacity = '1';
    }
}
function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
    }
}
function handleDragEnter(e: DragEvent) {
    addHoverStyle(e.currentTarget as HTMLElement);
}

function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    if (target.classList.contains('custom-drag-handle')) {
        removeHoverStyle(target);
    }
}

function CustomDragHandle(props: CustomCellProps<any>) {
    const { reorder, getRowIndex } = useContext(DragCtx)!;

    const handleDrop = (e: DragEvent) => {
        removeHoverStyle(e.currentTarget as HTMLElement);
        const sourceIndex = Number(e.dataTransfer?.getData('sourceIndex'));
        const rowIndex = getRowIndex(props.row);
        if (isNaN(sourceIndex) || sourceIndex === rowIndex) return;
        reorder(sourceIndex, rowIndex);
    };

    return (
        <div
            draggable
            class="custom-drag-handle"
            onDragStart={e => handleDragStart(e, getRowIndex(props.row))}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
        >
            <div class="point-wrapper">
                <div class="point" />
                <div class="point" />
                <div class="point" />
                <div class="point" />
            </div>
        </div>
    );
}

const columns: StkTableColumn<any>[] = [
    { dataIndex: 'id', title: 'id' },
    {
        dataIndex: '',
        width: 200,
        title: 'Custom',
        align: 'center',
        customCell: CustomDragHandle,
    },
    { dataIndex: 'email', title: 'email' },
    { dataIndex: 'phone', title: 'phone' },
];

export default function RowDragCustom() {
    const [virtual, setVirtual] = createSignal(false);
    const [data, setData] = createSignal<Row[]>(
        new Array(100).fill(0).map((_, index) => {
            return {
                id: index,
                name: 'name' + index,
                email: 'email' + index + '@example.com',
                phone: '123-456-7890',
            };
        }),
    );

    // Solid 的 <For> 按行对象引用复用单元格，捕获的 rowIndex 不会随排序刷新，因此通过 row.id 实时查询当前索引
    const getRowIndex = (row: Row) => data().findIndex(r => r.id === row.id);

    const reorder = (src: number, end: number) => {
        setData(prev => {
            const d = prev.slice();
            const sourceData = d[src];
            d.splice(src, 1);
            d.splice(end, 0, sourceData);
            return d;
        });
    };

    return (
        <div class="row-drag-custom">
            <style>{`
                .row-drag-custom .custom-drag-handle { padding: 2px; cursor: grab; border-radius: 4px; display: flex; justify-content: center; }
                .row-drag-custom .custom-drag-handle:hover { background-color: var(--vp-c-border); }
                .row-drag-custom .custom-drag-handle .point-wrapper { height: 14px; width: 16px; position: relative; pointer-events: none; }
                .row-drag-custom .custom-drag-handle .point { width: 4px; height: 4px; border-radius: 50%; background-color: #888; position: absolute; }
                .row-drag-custom .custom-drag-handle .point:nth-child(2) { left: 8px; }
                .row-drag-custom .custom-drag-handle .point:nth-child(3) { top: 8px; }
                .row-drag-custom .custom-drag-handle .point:nth-child(4) { left: 8px; top: 8px; }
            `}</style>
            <CheckItem checked={virtual()} onChange={setVirtual} text="virtual" />
            <DragCtx.Provider value={{ reorder, getRowIndex }}>
                <StkTable columns={columns} style={{ height: '300px' }} rowKey="id" virtual={virtual()} dataSource={data()} />
            </DragCtx.Provider>
        </div>
    );
}
