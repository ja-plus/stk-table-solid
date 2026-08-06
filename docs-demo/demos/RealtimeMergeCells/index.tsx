import { createSignal } from 'solid-js';
import ContextMenu from 'ja-contextmenu';
import type { MenuOption } from 'ja-contextmenu/lib/types/MenuOption';
import type { AreaSelectionRange, StkTableColumn } from '../../../src/StkTable/index';
import StkTable from '../../StkTable';
import { useI18n } from '../../hooks/useI18n/index';

import 'ja-contextmenu/styles/dark.css';

type Row = { id: number; name: string; age: number; city: string; score: number };

export default function RealtimeMergeCells() {
    const { t } = useI18n();

    const columns: StkTableColumn<Row>[] = [
        { title: 'ID', dataIndex: 'id', width: 60, mergeCells },
        { title: t('name'), dataIndex: 'name', width: 120, mergeCells },
        { title: t('age'), dataIndex: 'age', width: 100, mergeCells },
        { title: t('city'), dataIndex: 'city', width: 120, mergeCells },
        { title: t('score'), dataIndex: 'score', width: 100, mergeCells },
        ...new Array(20).fill(0).map(
            (_, i) =>
                ({
                    title: `Column ${i}`,
                    dataIndex: `column-${i}` as any,
                    width: 100,
                    mergeCells,
                }) as StkTableColumn<Row>,
        ),
    ];

    const [dataSource, setDataSource] = createSignal<Row[]>(
        Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `User${i + 1}`,
            age: 20 + (i % 30),
            city: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'][i % 4],
            score: 60 + (i % 40),
        })),
    );

    /**
     * Merge state storage
     * key: `${rowId}__${colIndex}`
     * value: { rowspan, colspan }
     */
    const mergeMap = new Map<string, { rowspan: number; colspan: number }>();
    const [mergedCount, setMergedCount] = createSignal(0);

    function getMergeKey(rowId: number, colIndex: number) {
        return `${rowId}__${colIndex}`;
    }

    /** mergeCells callback for each column */
    function mergeCells({ row, col }: { row: Row; col: StkTableColumn<Row> }) {
        const colIndex = columns.findIndex(c => c.dataIndex === col.dataIndex);
        const info = mergeMap.get(getMergeKey(row.id, colIndex));
        if (info) return info;
    }

    // ============ Area Selection ============
    const [selectionRanges, setSelectionRanges] = createSignal<AreaSelectionRange[]>([]);

    function onSelectionChange(ranges: AreaSelectionRange[]) {
        setSelectionRanges(ranges);
    }

    /** Normalize range to min/max */
    function normalizeRange(range: AreaSelectionRange) {
        const { begin, end } = range.index;
        return {
            minRow: Math.min(begin.row, end.row),
            maxRow: Math.max(begin.row, end.row),
            minCol: Math.min(begin.col, end.col),
            maxCol: Math.max(begin.col, end.col),
        };
    }

    // ============ Merge / Split ============
    function mergeSelectedCells() {
        const ranges = selectionRanges();
        if (!ranges.length) return;
        const range = ranges[ranges.length - 1];
        const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);

        const rowspan = maxRow - minRow + 1;
        const colspan = maxCol - minCol + 1;
        if (rowspan <= 1 && colspan <= 1) return;

        const ds = dataSource();
        const startRow = ds[minRow];
        if (!startRow) return;

        // Remove conflicting merge info within the range
        for (let r = minRow; r <= maxRow; r++) {
            const row = ds[r];
            if (!row) continue;
            for (let c = minCol; c <= maxCol; c++) {
                mergeMap.delete(getMergeKey(row.id, c));
            }
        }

        // Set merge info on the top-left cell
        mergeMap.set(getMergeKey(startRow.id, minCol), { rowspan, colspan });
        setMergedCount(mergeMap.size);

        // Force table re-render（替换行对象引用，Solid <For> 按引用追踪，slice 数组不足以触发重渲染）
        setDataSource(ds.map(r => ({ ...r })));
    }

    function splitSelectedCells() {
        const ranges = selectionRanges();
        if (!ranges.length) return;

        const ds = dataSource();
        for (const range of ranges) {
            const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
            for (let r = minRow; r <= maxRow; r++) {
                const row = ds[r];
                if (!row) continue;
                for (let c = minCol; c <= maxCol; c++) {
                    mergeMap.delete(getMergeKey(row.id, c));
                }
            }
        }
        setMergedCount(mergeMap.size);

        // Force table re-render（替换行对象引用，Solid <For> 按引用追踪，slice 数组不足以触发重渲染）
        setDataSource(ds.map(r => ({ ...r })));
    }

    // ============ Context Menu (ja-contextmenu) ============
    function canMerge() {
        const ranges = selectionRanges();
        if (!ranges.length) return false;
        const range = ranges[ranges.length - 1];
        const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
        return maxRow - minRow + 1 > 1 || maxCol - minCol + 1 > 1;
    }

    function canSplit() {
        const ranges = selectionRanges();
        if (!ranges.length) return false;
        const ds = dataSource();
        for (const range of ranges) {
            const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
            for (let r = minRow; r <= maxRow; r++) {
                const row = ds[r];
                if (!row) continue;
                for (let c = minCol; c <= maxCol; c++) {
                    if (mergeMap.has(getMergeKey(row.id, c))) return true;
                }
            }
        }
        return false;
    }

    const contextMenu = new ContextMenu({
        theme: () => (document.documentElement.classList.contains('dark') ? 'dark' : ('' as any)),
    });
    const menuOption: MenuOption<void> = {
        items: [
            {
                label: () => t('mergeCells'),
                disabled: () => !canMerge(),
                onclick: () => mergeSelectedCells(),
            },
            {
                label: () => t('splitCells'),
                disabled: () => !canSplit(),
                onclick: () => splitSelectedCells(),
            },
        ],
    };
    const menu = contextMenu.create(menuOption);

    function onRowMenu(event: MouseEvent) {
        menu.show(event);
    }

    return (
        <div class="realtime-merge-cells-demo">
            <p class="demo-tip">{t('realtimeMergeTip')}</p>
            <StkTable
                style={{ height: '400px' }}
                rowKey="id"
                virtual
                virtualX
                columns={columns}
                dataSource={dataSource()}
                areaSelection={{ enabled: true }}
                onAreaSelectionChange={onSelectionChange}
                onRowMenu={onRowMenu}
            />
            <div class="demo-status">
                <span>
                    {t('mergedRegions')}: {mergedCount()}
                </span>
            </div>
            <style>{`
                .realtime-merge-cells-demo .demo-tip {
                    margin: 0 0 8px;
                    font-size: 13px;
                    color: var(--vp-c-text-2, #888);
                }
                .realtime-merge-cells-demo .demo-status {
                    margin-top: 8px;
                    font-size: 13px;
                    color: var(--vp-c-text-2, #888);
                }
            `}</style>
        </div>
    );
}
