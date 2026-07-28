import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import type { AreaSelectionRange, StkTableColumn } from '../../../src/StkTable/index';
import StkTable from '../../StkTable';
import { useI18n } from '../../hooks/useI18n/index';

type Row = { id: number; name: string; age: number; city: string; score: number };

export default function RealtimeMergeCells() {
    const { t } = useI18n();

    // 监听 html class 获取暗色主题
    const [isDark, setIsDark] = createSignal(false);
    onMount(() => {
        const html = document.documentElement;
        const update = () => setIsDark(html.classList.contains('dark'));
        update();
        const observer = new MutationObserver(update);
        observer.observe(html, { attributes: true, attributeFilter: ['class'] });
        onCleanup(() => observer.disconnect());
    });

    const columns: StkTableColumn<Row>[] = [
        { title: 'ID', dataIndex: 'id', width: 60, mergeCells },
        { title: t('name'), dataIndex: 'name', width: 120, mergeCells },
        { title: t('age'), dataIndex: 'age', width: 100, mergeCells },
        { title: t('city'), dataIndex: 'city', width: 120, mergeCells },
        { title: t('score'), dataIndex: 'score', width: 100, mergeCells },
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

    // ============ Context Menu ============
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

    const [menuVisible, setMenuVisible] = createSignal(false);
    const [menuPos, setMenuPos] = createSignal({ x: 0, y: 0 });

    function onRowMenu(e: MouseEvent) {
        e.preventDefault();
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuVisible(true);
    }

    function hideMenu() {
        setMenuVisible(false);
    }

    // 点击其他位置/滚动时隐藏菜单；右键表格外部时隐藏（右键表格内部由 onRowMenu 重新定位）
    onMount(() => {
        const onClickHide = () => hideMenu();
        const onScrollHide = () => hideMenu();
        const onCtxHide = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest?.('.stk-table')) hideMenu();
        };
        document.addEventListener('click', onClickHide);
        document.addEventListener('contextmenu', onCtxHide);
        document.addEventListener('scroll', onScrollHide, true);
        onCleanup(() => {
            document.removeEventListener('click', onClickHide);
            document.removeEventListener('contextmenu', onCtxHide);
            document.removeEventListener('scroll', onScrollHide, true);
        });
    });

    return (
        <div class="realtime-merge-cells-demo">
            <p class="demo-tip">{t('realtimeMergeTip')}</p>
            <StkTable
                style={{ height: '400px' }}
                rowKey="id"
                virtual
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
            <Show when={menuVisible()}>
                <div class="custom-context-menu" classList={{ dark: isDark() }} style={{ left: `${menuPos().x}px`, top: `${menuPos().y}px` }}>
                    <div
                        class="menu-item"
                        classList={{ disabled: !canMerge() }}
                        onClick={() => {
                            if (!canMerge()) return;
                            mergeSelectedCells();
                            hideMenu();
                        }}
                    >
                        {t('mergeCells')}
                    </div>
                    <div
                        class="menu-item"
                        classList={{ disabled: !canSplit() }}
                        onClick={() => {
                            if (!canSplit()) return;
                            splitSelectedCells();
                            hideMenu();
                        }}
                    >
                        {t('splitCells')}
                    </div>
                </div>
            </Show>
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
                .custom-context-menu {
                    position: fixed;
                    z-index: 9999;
                    min-width: 120px;
                    padding: 4px 0;
                    background: #fff;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }
                .custom-context-menu.dark {
                    background: #2c2c34;
                    border-color: #3f3f49;
                }
                .custom-context-menu .menu-item {
                    padding: 6px 16px;
                    font-size: 13px;
                    cursor: pointer;
                    color: #333;
                }
                .custom-context-menu.dark .menu-item {
                    color: #ddd;
                }
                .custom-context-menu .menu-item:hover {
                    background: #f0f0f0;
                }
                .custom-context-menu.dark .menu-item:hover {
                    background: #3a3a44;
                }
                .custom-context-menu .menu-item.disabled {
                    color: #bbb;
                    cursor: not-allowed;
                }
                .custom-context-menu.dark .menu-item.disabled {
                    color: #666;
                }
                .custom-context-menu .menu-item.disabled:hover {
                    background: transparent;
                }
            `}</style>
        </div>
    );
}
