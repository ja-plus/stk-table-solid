import { createSignal, createMemo, createEffect, onMount, onCleanup, type Accessor } from 'solid-js';
import {
    AreaSelectionConfig,
    AreaSelectionRange,
    CellKeyGen,
    ColKeyGen,
    StkTableColumn,
    UniqKey,
    AreaSelectionSetterRange,
    AreaSelectionSetterOption,
} from '../types';
import { VirtualScrollStore, VirtualScrollXStore } from '../hooks/useVirtualScroll';
import { getClosestColKey, getClosestTd, getClosestTr, getClosestTrIndex } from '../utils';
import { getCalculatedColWidth } from '../utils/constRefUtils';
import { MY_FN_NAME } from './const';

/**
 * 单元格区域选择功能
 * 支持鼠标拖拽选择、键盘导航、复制粘贴等功能
 * en: Cell area selection feature with mouse drag, keyboard navigation, copy-paste, etc.
 */
export function useAreaSelection<DT extends Record<string, any>>(
    props: any,
    emits: any,
    tableContainerRef: Accessor<HTMLDivElement | undefined>,
    dataSourceCopy: Accessor<DT[]>,
    tableHeaderLast: Accessor<StkTableColumn<DT>[]>,
    colKeyGen: ColKeyGen,
    cellKeyGen: CellKeyGen,
    scrollTo: (top: number | null, left: number | null) => void,
    virtualScroll: Accessor<VirtualScrollStore>,
    virtualScrollX: Accessor<VirtualScrollXStore>,
    getRowIndex: (row: DT) => number,
    getColumnIndex: (col: StkTableColumn<DT>) => number,
) {
    const EDGE_ZONE = 40;
    const SCROLL_SPEED_MAX = 15;
    const POINT_EDGE_OFFSET = 2;

    const KEY_ARROW_UP = 'ArrowUp';
    const KEY_ARROW_DOWN = 'ArrowDown';
    const KEY_ARROW_LEFT = 'ArrowLeft';
    const KEY_ARROW_RIGHT = 'ArrowRight';
    const KEY_TAB = 'Tab';
    const KEY_ESCAPE = 'Escape';
    const KEY_ESC = 'Esc';
    const KEY_C = 'c';

    const ATTR_CELL_SELECTED = 'data-cs-s';
    const ATTR_CELL_TOP = 'data-cs-t';
    const ATTR_CELL_BOTTOM = 'data-cs-b';
    const ATTR_CELL_LEFT = 'data-cs-l';
    const ATTR_CELL_RIGHT = 'data-cs-r';
    const ATTR_ROW_SELECTED = 'data-rs-s';

    const [selectionRanges, setSelectionRanges] = createSignal<AreaSelectionRange[]>([]);
    const [isSelecting, setIsSelecting] = createSignal(false);
    /** start cell */
    let anchorCell: { rowIndex: number; colIndex: number } | null = null;

    /** auto scroll rAF id */
    let autoScrollRafId = 0;
    let lastMouseClientX = 0;
    let lastMouseClientY = 0;

    const config = createMemo<AreaSelectionConfig>(() => {
        if (typeof props.areaSelection === 'boolean') {
            const b = props.areaSelection;
            return { enabled: b, keyboard: b, ctrl: b, shift: b, highlight: { cell: b, row: false } };
        }
        const { highlight: userHighlight, ...restConfig } = props.areaSelection || {};
        return {
            enabled: true,
            ctrl: true,
            shift: true,
            highlight: {
                cell: true,
                row: false,
                ...userHighlight,
            },
            ...restConfig,
        };
    });

    /** 是否启用键盘控制选区移动 */
    const keyboardEnabled = createMemo(() => config().keyboard);

    /** 是否启用 Ctrl 多选 */
    const ctrlEnabled = createMemo(() => config().ctrl);

    /** 是否启用 Shift 扩选 */
    const shiftEnabled = createMemo(() => config().shift);

    /** 是否启用单元格高亮 */
    const highlightCellEnabled = createMemo(() => config().highlight?.cell);

    /** 是否启用行高亮 */
    const highlightRowEnabled = createMemo(() => config().highlight?.row);

    /** colKey → absolute index 映射 */
    const colKeyToIndexMap = createMemo(() => {
        const headers = tableHeaderLast();
        const map = new Map<UniqKey, number>();
        for (let i = 0; i < headers.length; i++) {
            map.set(colKeyGen()(headers[i]), i);
        }
        return map;
    });

    const getFixedColWidths = createMemo(() => {
        const cols = tableHeaderLast();
        const leftWidths: number[] = new Array(cols.length + 1).fill(0);
        const rightWidths: number[] = new Array(cols.length + 1).fill(0);

        let leftSum = 0;
        for (let i = 0; i < cols.length; i++) {
            leftWidths[i] = leftSum;
            if (cols[i]?.fixed === 'left') {
                leftSum += getCalculatedColWidth(cols[i]);
            }
        }
        leftWidths[cols.length] = leftSum;

        let rightSum = 0;
        for (let i = cols.length - 1; i >= 0; i--) {
            rightWidths[i] = rightSum;
            if (cols[i]?.fixed === 'right') {
                rightSum += getCalculatedColWidth(cols[i]);
            }
        }

        return (colIndex: number) => {
            return [leftWidths[colIndex] ?? 0, rightWidths[colIndex + 1] ?? 0] as const;
        };
    });

    /** 根据 selectionRanges 计算所有选区内 cellKey 的并集（非响应式，用于 DOM 操作） */
    let selectedCellKeys: Set<string> = new Set();

    /** 重新计算 selectedCellKeys */
    function recomputeSelectedCellKeys() {
        const ranges = selectionRanges();
        if (!ranges.length) {
            selectedCellKeys = new Set();
            return;
        }
        const keys = new Set<string>();
        const cols = tableHeaderLast();
        const data = dataSourceCopy();
        for (const range of ranges) {
            const {
                begin: { row: r1, col: c1 },
                end: { row: r2, col: c2 },
            } = range.index;
            const [rStart, rEnd] = r1 < r2 ? [r1, r2] : [r2, r1];
            const [cStart, cEnd] = c1 < c2 ? [c1, c2] : [c2, c1];
            for (let r = rStart; r <= rEnd; r++) {
                const row = data[r];
                if (!row) continue;
                for (let c = cStart; c <= cEnd; c++) {
                    const col = cols[c];
                    if (col) keys.add(cellKeyGen(row, col));
                }
            }
        }
        selectedCellKeys = keys;
    }

    /**
     * 直接操作 DOM 更新选区样式（不触发重渲染）
     */
    function updateSelectionDOM() {
        const container = tableContainerRef();
        if (!container) return;

        const cellHighlight = highlightCellEnabled();
        const rowHighlight = highlightRowEnabled();

        // 1. 清除所有旧的选区属性
        const oldSelectedCells = container.querySelectorAll(`[${ATTR_CELL_SELECTED}]`);
        for (let i = 0; i < oldSelectedCells.length; i++) {
            const el = oldSelectedCells[i] as HTMLElement;
            el.removeAttribute(ATTR_CELL_SELECTED);
            el.removeAttribute(ATTR_CELL_TOP);
            el.removeAttribute(ATTR_CELL_BOTTOM);
            el.removeAttribute(ATTR_CELL_LEFT);
            el.removeAttribute(ATTR_CELL_RIGHT);
        }
        const oldSelectedRows = container.querySelectorAll(`[${ATTR_ROW_SELECTED}]`);
        for (let i = 0; i < oldSelectedRows.length; i++) {
            (oldSelectedRows[i] as HTMLElement).removeAttribute(ATTR_ROW_SELECTED);
        }

        // 2. 重算 selectedCellKeys
        recomputeSelectedCellKeys();

        const ranges = selectionRanges();
        if (!ranges.length) return;

        const tbody = container.querySelector('.stk-tbody-main');
        if (!tbody) return;

        // 3. 应用行高亮 class
        if (rowHighlight) {
            for (const range of ranges) {
                const { minRow, maxRow } = normalizeRange(range);
                for (let r = minRow; r <= maxRow; r++) {
                    const tr = tbody.querySelector(`tr[data-row-i="${r}"]`) as HTMLElement | null;
                    if (tr) tr.setAttribute(ATTR_ROW_SELECTED, '');
                }
            }
        }

        // 4. 应用单元格高亮 class
        if (cellHighlight) {
            const lastRange = ranges[ranges.length - 1];
            const { minRow: lrMinRow, maxRow: lrMaxRow, minCol: lrMinCol, maxCol: lrMaxCol } = normalizeRange(lastRange);

            // 遍历所有可见行
            const trs = tbody.querySelectorAll('tr[data-row-i]');
            for (let t = 0; t < trs.length; t++) {
                const tr = trs[t] as HTMLElement;
                const rowIndex = parseInt(tr.getAttribute('data-row-i')!, 10);

                // 检查此行是否在任何选区内
                let inAnyRange = false;
                for (const range of ranges) {
                    const { minRow, maxRow } = normalizeRange(range);
                    if (rowIndex >= minRow && rowIndex <= maxRow) {
                        inAnyRange = true;
                        break;
                    }
                }
                if (!inAnyRange) continue;

                // 遍历此行中的单元格
                const tds = tr.querySelectorAll('td[data-col-key]');
                for (let d = 0; d < tds.length; d++) {
                    const td = tds[d] as HTMLElement;
                    const colKey = td.getAttribute('data-col-key')!;
                    const colIndex = colKeyToIndexMap().get(colKey);
                    if (colIndex === void 0 || colIndex < 0) continue;

                    // 生成 cellKey 检查是否在选区内
                    const data = dataSourceCopy();
                    const row = data[rowIndex];
                    const cols = tableHeaderLast();
                    if (!row || !cols[colIndex]) continue;
                    const ck = cellKeyGen(row, cols[colIndex]);
                    if (!selectedCellKeys.has(ck)) continue;

                    td.setAttribute(ATTR_CELL_SELECTED, '');

                    // 判断是否在最后一个区域的边界（考虑合并单元格的 rowspan/colspan）
                    const isInLastRange = rowIndex >= lrMinRow && rowIndex <= lrMaxRow && colIndex >= lrMinCol && colIndex <= lrMaxCol;
                    if (isInLastRange) {
                        // 合并单元格的实际结束行/列
                        const effEndRow = rowIndex + (parseInt(td.getAttribute('rowspan') || '1', 10) || 1) - 1;
                        const effEndCol = colIndex + (parseInt(td.getAttribute('colspan') || '1', 10) || 1) - 1;
                        if (rowIndex === lrMinRow) td.setAttribute(ATTR_CELL_TOP, '');
                        if (effEndRow === lrMaxRow) td.setAttribute(ATTR_CELL_BOTTOM, '');
                        if (colIndex === lrMinCol) td.setAttribute(ATTR_CELL_LEFT, '');
                        if (effEndCol === lrMaxCol) td.setAttribute(ATTR_CELL_RIGHT, '');
                    }
                }
            }
        }
    }

    /**
     * 监听 selectionRanges 变化，在 DOM 更新后直接操作选区 class
     */
    createEffect(() => {
        // 组合依赖：选区变化 或 虚拟滚动可见范围变化 都触发
        const ranges = selectionRanges();
        const vs = virtualScroll();
        const vsx = virtualScrollX();
        // 读取依赖以建立追踪
        void [
            ranges.length,
            ranges.length > 0 ? JSON.stringify(ranges.map(r => r.index)) : '',
            vsx.scrollLeft,
            vs.startIndex,
            vs.endIndex,
            vsx.startIndex,
            vsx.endIndex,
            dataSourceCopy().length,
            tableHeaderLast().length,
        ];
        queueMicrotask(updateSelectionDOM);
    });

    onMount(() => {
        addListener();
    });
    onCleanup(() => {
        removeListener();
    });

    /**
     * 监听数据行数/列数变化，当行列变少时钳制选区与锚点，避免越界
     */
    createEffect(() => {
        const rowCount = dataSourceCopy().length;
        const colCount = tableHeaderLast().length;
        if (!config().enabled) return;

        // 钳制锚点
        if (anchorCell) {
            if (rowCount === 0 || colCount === 0) {
                anchorCell = null;
            } else {
                anchorCell.rowIndex = clamp(anchorCell.rowIndex, 0, rowCount - 1);
                anchorCell.colIndex = clamp(anchorCell.colIndex, 0, colCount - 1);
            }
        }

        if (!selectionRanges().length) return;

        // 行或列为 0 时清空选区
        if (rowCount === 0 || colCount === 0) {
            clearSelectedArea();
            emitSelectionChange();
            return;
        }

        const maxRow = rowCount - 1;
        const maxCol = colCount - 1;
        let changed = false;
        const newRanges: AreaSelectionRange[] = [];
        for (const range of selectionRanges()) {
            const { begin, end } = range.index;
            const nbRow = clamp(begin.row, 0, maxRow);
            const nbCol = clamp(begin.col, 0, maxCol);
            const neRow = clamp(end.row, 0, maxRow);
            const neCol = clamp(end.col, 0, maxCol);
            if (nbRow !== begin.row || nbCol !== begin.col || neRow !== end.row || neCol !== end.col) {
                changed = true;
                newRanges.push(makeRange(nbRow, nbCol, neRow, neCol));
            } else {
                newRanges.push(range);
            }
        }

        if (changed) {
            setSelectionRanges(newRanges);
            emitSelectionChange();
        }
    });

    function addListener() {
        removeListener();
        tableContainerRef()?.addEventListener('keydown', onKeydown);
    }

    function removeListener() {
        tableContainerRef()?.removeEventListener('keydown', onKeydown);
        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
        stopAutoScroll();
    }

    /** 获取归一化（min/max）后的选区范围 */
    function normalizeRange(range: AreaSelectionRange) {
        const { begin, end } = range.index;
        return {
            minRow: Math.min(begin.row, end.row),
            maxRow: Math.max(begin.row, end.row),
            minCol: Math.min(begin.col, end.col),
            maxCol: Math.max(begin.col, end.col),
        };
    }

    function makeRange(beginRow: number, beginCol: number, endRow: number, endCol: number): AreaSelectionRange {
        return {
            index: {
                x: [beginCol, endCol],
                y: [beginRow, endRow],
                begin: { row: beginRow, col: beginCol },
                end: { row: endRow, col: endCol },
            },
        };
    }

    /** 根据colKey获取列的绝对索引 */
    function getColIndexByKey(colKey: string | undefined): number {
        if (!colKey) return -1;
        return colKeyToIndexMap().get(colKey) ?? -1;
    }

    // ---- 合并单元格支持 ----

    /** 获取指定单元格的合并信息 [rowspan, colspan]，无合并返回 [1, 1] */
    function getMergeSpan(rowIndex: number, colIndex: number): [number, number] {
        const data = dataSourceCopy();
        const cols = tableHeaderLast();
        const row = data[rowIndex];
        const col = cols[colIndex];
        if (!row || !col || !col.mergeCells) return [1, 1];
        const { rowspan = 1, colspan = 1 } = col.mergeCells({ row, col, rowIndex, colIndex }) || {};
        return [rowspan || 1, colspan || 1];
    }

    function expandRangeToCoverMergedCells(range: AreaSelectionRange): AreaSelectionRange {
        const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
        const data = dataSourceCopy();
        const cols = tableHeaderLast();
        const rowCount = data.length;
        const colCount = cols.length;

        // 预计算含 mergeCells 的列索引
        const mergeColIndices: number[] = [];
        for (let c = 0; c < colCount; c++) {
            if (cols[c]?.mergeCells) mergeColIndices.push(c);
        }
        if (!mergeColIndices.length) return range;

        let [eMinRow, eMaxRow, eMinCol, eMaxCol] = [minRow, maxRow, minCol, maxCol];

        // 迭代扩展直到稳定（级联合并需要多轮）
        let changed = true;
        let guard = 0;
        while (changed && guard++ < 100) {
            changed = false;

            // 下边界：最后一行中的单元格 rowspan 是否超出边界
            for (const c of mergeColIndices) {
                if (c < eMinCol || c > eMaxCol) continue;
                const [rs] = getMergeSpan(eMaxRow, c);
                if (rs > 1 && eMaxRow + rs - 1 < rowCount && eMaxRow + rs - 1 > eMaxRow) {
                    eMaxRow = eMaxRow + rs - 1;
                    changed = true;
                }
            }

            // 右边界：最后一列中的单元格 colspan 是否超出边界
            for (let r = eMinRow; r <= eMaxRow; r++) {
                const [, cs] = getMergeSpan(r, eMaxCol);
                if (cs > 1 && eMaxCol + cs - 1 < colCount && eMaxCol + cs - 1 > eMaxCol) {
                    eMaxCol = eMaxCol + cs - 1;
                    changed = true;
                }
            }

            // 上边界：检查 minRow 上方的单元格是否延伸进选区
            for (const c of mergeColIndices) {
                if (c < eMinCol || c > eMaxCol) continue;
                for (let r = eMinRow - 1; r >= 0 && r > eMinRow - 500; r--) {
                    const [rs] = getMergeSpan(r, c);
                    if (rs <= 1) continue;
                    const endRow = r + rs - 1;
                    if (endRow >= eMinRow) {
                        if (r < eMinRow) {
                            eMinRow = r;
                            changed = true;
                        }
                    } else {
                        break;
                    }
                }
            }

            // 左边界：检查 minCol 左侧的单元格是否延伸进选区
            for (let r = eMinRow; r <= eMaxRow; r++) {
                for (let c = eMinCol - 1; c >= 0 && c > eMinCol - 500; c--) {
                    const [, cs] = getMergeSpan(r, c);
                    if (cs <= 1) continue;
                    const endCol = c + cs - 1;
                    if (endCol >= eMinCol) {
                        if (c < eMinCol) {
                            eMinCol = c;
                            changed = true;
                        }
                    } else {
                        break;
                    }
                }
            }
        }

        if (eMinRow === minRow && eMaxRow === maxRow && eMinCol === minCol && eMaxCol === maxCol) {
            return range;
        }

        // 保持 begin/end 的原始方向
        const { begin, end } = range.index;
        const newBeginRow = begin.row < end.row || begin.row === end.row ? eMinRow : eMaxRow;
        const newEndRow = begin.row < end.row || begin.row === end.row ? eMaxRow : eMinRow;
        const newBeginCol = begin.col <= end.col ? eMinCol : eMaxCol;
        const newEndCol = begin.col <= end.col ? eMaxCol : eMinCol;
        return makeRange(newBeginRow, newBeginCol, newEndRow, newEndCol);
    }

    /** 获取列的左边距和宽度 */
    function getColPosition(colIndex: number): [number, number] {
        let left = 0;
        const cols = tableHeaderLast();
        for (let i = 0; i < cols.length; i++) {
            const colWidth = getCalculatedColWidth(cols[i]);
            if (i === colIndex) return [left, colWidth];
            left += colWidth;
        }
        return [left, 0];
    }

    /** 根据按键计算移动方向 */
    function getMovementDelta(key: string, shiftKey: boolean): [number, number] {
        let rowDelta = 0;
        let colDelta = 0;

        switch (key) {
            case KEY_ARROW_UP:
                rowDelta = -1;
                break;
            case KEY_ARROW_DOWN:
                rowDelta = 1;
                break;
            case KEY_ARROW_LEFT:
                colDelta = -1;
                break;
            case KEY_ARROW_RIGHT:
                colDelta = 1;
                break;
            case KEY_TAB:
                // Tab: right; Shift+Tab: left
                colDelta = shiftKey ? -1 : 1;
                break;
        }

        return [rowDelta, colDelta];
    }

    /** 钳制值到指定范围内 */
    function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    /** 处理Tab键的换行逻辑 */
    function handleTabWrap(row: number, col: number, rawCol: number, rowCount: number, colCount: number): [number, number] {
        if (rawCol >= colCount) return [Math.min(row + 1, rowCount - 1), 0];
        if (rawCol < 0) return [Math.max(row - 1, 0), colCount - 1];
        return [row, col];
    }

    /** 计算自动滚动的增量 */
    function calculateAutoScrollDelta(mouseX: number, mouseY: number, rect: DOMRect): { deltaX: number; deltaY: number } {
        const { top, bottom, left, right } = rect;
        let deltaX = 0;
        let deltaY = 0;

        // Y方向
        if (mouseY < top + EDGE_ZONE) {
            const dist = Math.max(0, top + EDGE_ZONE - mouseY);
            deltaY = -Math.ceil((dist / EDGE_ZONE) * SCROLL_SPEED_MAX);
        } else if (mouseY > bottom - EDGE_ZONE) {
            const dist = Math.max(0, mouseY - (bottom - EDGE_ZONE));
            deltaY = Math.ceil((dist / EDGE_ZONE) * SCROLL_SPEED_MAX);
        }

        // X方向
        if (mouseX < left + EDGE_ZONE) {
            const dist = Math.max(0, left + EDGE_ZONE - mouseX);
            deltaX = -Math.ceil((dist / EDGE_ZONE) * SCROLL_SPEED_MAX);
        } else if (mouseX > right - EDGE_ZONE) {
            const dist = Math.max(0, mouseX - (right - EDGE_ZONE));
            deltaX = Math.ceil((dist / EDGE_ZONE) * SCROLL_SPEED_MAX);
        }

        return { deltaX, deltaY };
    }

    /** mousedown 处理：设置锚点，开始拖选 */
    function onSelectionMouseDown(e: MouseEvent) {
        if (!config().enabled || e.button !== 0) return;

        const rowIndex = getClosestTrIndex(e.target as HTMLElement);
        const colKey = getClosestColKey(e.target as HTMLElement);
        const colIndex = getColIndexByKey(colKey);

        if (rowIndex < 0 || colIndex < 0) return;

        const ctrlKey = e.ctrlKey || e.metaKey;

        // 立即扩展以完整覆盖合并单元格
        const range: AreaSelectionRange = expandRangeToCoverMergedCells(makeRange(rowIndex, colIndex, rowIndex, colIndex));
        // Shift 扩选：从锚点扩展到当前位置，更新最后一个区域
        if (e.shiftKey && anchorCell && shiftEnabled()) {
            const ranges = selectionRanges().slice();
            const shiftRange: AreaSelectionRange = expandRangeToCoverMergedCells(
                makeRange(anchorCell.rowIndex, anchorCell.colIndex, rowIndex, colIndex),
            );
            if (ranges.length) {
                ranges[ranges.length - 1] = shiftRange;
            } else {
                ranges.push(shiftRange);
            }
            setSelectionRanges(ranges);
        } else {
            anchorCell = { rowIndex, colIndex };
            if (ctrlKey && ctrlEnabled()) {
                // Ctrl multiple
                setSelectionRanges(selectionRanges().concat([range]));
            } else {
                // normal click
                setSelectionRanges([range]);
            }
        }

        setIsSelecting(true);
        lastMouseClientX = e.clientX;
        lastMouseClientY = e.clientY;

        // 防止拖选时选中文字
        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
    }

    /** document mousemove 处理：更新选区终点 + 检测边界自动滚动 */
    function onDocumentMouseMove(e: MouseEvent) {
        if (!isSelecting()) return;

        lastMouseClientX = e.clientX;
        lastMouseClientY = e.clientY;

        // 尝试从当前鼠标位置更新选区
        updateSelectionFromEvent(e);

        // 检测是否需要边界自动滚动
        checkAutoScroll();
    }

    /** 从 MouseEvent 目标元素更新选区 */
    function updateSelectionFromEvent(e: MouseEvent) {
        const target = e.target as HTMLElement;
        if (!target) return;

        const rowIndex = getClosestTrIndex(target);
        if (Number.isNaN(rowIndex) || rowIndex < 0) return;

        const colKey = getClosestColKey(target);
        const colIndex = getColIndexByKey(colKey);
        if (colIndex < 0) return;

        updateSelectionEnd(rowIndex, colIndex);
    }

    /** 更新最后一个选区的终点（拖拽过程中） */
    function updateSelectionEnd(endRowIndex: number, endColIndex: number) {
        if (!anchorCell) return;
        const newRange: AreaSelectionRange = expandRangeToCoverMergedCells(
            makeRange(anchorCell.rowIndex, anchorCell.colIndex, endRowIndex, endColIndex),
        );
        const ranges = [...selectionRanges()];
        if (ranges.length > 0) {
            ranges[ranges.length - 1] = newRange;
        } else {
            ranges.push(newRange);
        }
        setSelectionRanges(ranges);
    }

    // ---- 边界自动滚动 ----

    /** 检查鼠标是否在容器边缘附近，启动或停止自动滚动 */
    function checkAutoScroll() {
        const container = tableContainerRef();
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const { top, bottom, left, right } = rect;

        const nearEdge =
            lastMouseClientY < top + EDGE_ZONE ||
            lastMouseClientY > bottom - EDGE_ZONE ||
            lastMouseClientX < left + EDGE_ZONE ||
            lastMouseClientX > right - EDGE_ZONE;

        if (nearEdge && !autoScrollRafId) {
            autoScrollLoop();
        } else if (!nearEdge && autoScrollRafId) {
            stopAutoScroll();
        }
    }

    /** rAF 循环：边界自动滚动 + 更新选区 */
    function autoScrollLoop() {
        const container = tableContainerRef();
        if (!container || !isSelecting()) {
            stopAutoScroll();
            return;
        }

        const rect = container.getBoundingClientRect();
        const { deltaX, deltaY } = calculateAutoScrollDelta(lastMouseClientX, lastMouseClientY, rect);

        if (deltaX !== 0 || deltaY !== 0) {
            container.scrollTop += deltaY;
            container.scrollLeft += deltaX;

            // 滚动后，在容器内边缘处用 elementFromPoint 找到当前单元格更新选区
            updateSelectionFromPoint(container, rect);
        }

        // 如果还在拖选且仍需滚动，继续循环
        if (isSelecting() && (deltaX !== 0 || deltaY !== 0)) {
            autoScrollRafId = requestAnimationFrame(autoScrollLoop);
        } else {
            autoScrollRafId = 0;
        }
    }

    /** 将鼠标位置钳制到容器内部，用 elementFromPoint 找到边缘单元格并更新选区 */
    function updateSelectionFromPoint(container: HTMLElement, containerRect: DOMRect) {
        // 获取表头高度，钳制 Y 时跳过表头区域
        const thead = container.querySelector('thead');
        const { top, bottom, left, right } = containerRect;

        const headerBottom = thead ? top + (thead as HTMLElement).offsetHeight : top;

        const x = Math.max(left + POINT_EDGE_OFFSET, Math.min(lastMouseClientX, right - POINT_EDGE_OFFSET));
        const y = Math.max(headerBottom + POINT_EDGE_OFFSET, Math.min(lastMouseClientY, bottom - POINT_EDGE_OFFSET));

        const el = document.elementFromPoint(x, y);
        if (!el) return;

        const td = getClosestTd(el as HTMLElement);
        const tr = getClosestTr(el as HTMLElement);
        if (!td || !tr) return;

        const rowIndex = getClosestTrIndex(tr);
        const colKey = getClosestColKey(td);
        const colIndex = getColIndexByKey(colKey);

        if (Number.isNaN(rowIndex) || rowIndex < 0 || colIndex < 0) return;

        updateSelectionEnd(rowIndex, colIndex);
    }

    /** 停止自动滚动 */
    function stopAutoScroll() {
        if (autoScrollRafId) {
            cancelAnimationFrame(autoScrollRafId);
            autoScrollRafId = 0;
        }
    }

    /** document mouseup 处理：结束拖选 */
    function onDocumentMouseUp() {
        if (!isSelecting()) return;
        setIsSelecting(false);
        stopAutoScroll();

        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);

        // 扩展最后一个选区，使其完整覆盖合并单元格
        const ranges = selectionRanges();
        if (ranges.length) {
            const expanded = expandRangeToCoverMergedCells(ranges[ranges.length - 1]);
            if (expanded !== ranges[ranges.length - 1]) {
                const newRanges = [...ranges];
                newRanges[newRanges.length - 1] = expanded;
                setSelectionRanges(newRanges);
            }
        }

        // 发出事件
        emitSelectionChange();
    }

    function emitSelectionChange() {
        emits.onAreaSelectionChange?.(selectionRanges());
    }

    /** 获取 areaSelection 配置中的格式化回调 */
    function getFormatCellFn() {
        const cfg = config();
        return typeof cfg.formatCellForClipboard === 'function' ? cfg.formatCellForClipboard : null;
    }

    function copySelectedArea(): string {
        const ranges = selectionRanges();
        if (!ranges.length) return '';

        const range = ranges[ranges.length - 1];
        const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
        const data = dataSourceCopy();
        const cols = tableHeaderLast();
        const formatCell = getFormatCellFn();

        const lines: string[] = [];
        for (let r = minRow; r <= maxRow; r++) {
            const row = data[r];
            if (!row) continue;

            const cells: string[] = [];
            for (let c = minCol; c <= maxCol; c++) {
                const col = cols[c];
                if (!col) {
                    cells.push('');
                    continue;
                }
                const rawValue = row[col.dataIndex];
                cells.push(formatCell ? formatCell(row, col, rawValue) : !rawValue ? '' : String(rawValue));
            }
            lines.push(cells.join('\t'));
        }
        const text = lines.join('\n');

        navigator.clipboard.writeText(text).catch(() => {
            console.warn('Failed to copy to clipboard');
        });

        return text;
    }

    function blurCellElement() {
        const container = tableContainerRef();
        const activeEl = document.activeElement as HTMLElement | null;
        if (container && activeEl && container.contains(activeEl) && activeEl !== container) {
            container.focus({ preventScroll: true });
        }
    }

    function onKeydown(e: KeyboardEvent) {
        if (!config().enabled) return;

        const key = e.key;

        // Esc ：cancel
        if (key === KEY_ESCAPE || key === KEY_ESC) {
            blurCellElement();
            if (selectionRanges().length) {
                e.preventDefault();
            }
            return;
        }

        // Ctrl/Cmd+C  copy
        if ((e.ctrlKey || e.metaKey) && key === KEY_C && selectionRanges().length) {
            copySelectedArea();
            e.preventDefault();
            return;
        }

        if (!keyboardEnabled()) return;

        const isArrowKey = [KEY_ARROW_UP, KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT].includes(key);
        const isTabKey = key === KEY_TAB;
        const isNavigationKey = isArrowKey || isTabKey;

        if (!isNavigationKey) return;

        e.preventDefault();

        const rowCount = dataSourceCopy().length;
        const colCount = tableHeaderLast().length;
        if (rowCount === 0 || colCount === 0) return;

        // 如果没有选区，默认从第一个单元格开始
        if (!selectionRanges().length) {
            anchorCell = { rowIndex: 0, colIndex: 0 };
            setSelectionRanges([makeRange(0, 0, 0, 0)]);
            emitSelectionChange();
            scrollToCell(0, 0);
            return;
        }

        // 计算移动方向
        const [rowDelta, colDelta] = getMovementDelta(key, e.shiftKey);

        // Shift 扩展选区，否则移动单格选区
        if (e.shiftKey && isArrowKey && shiftEnabled()) {
            blurCellElement();
            // 扩展选区：保留 begin，更新最后一个区域的 end
            const ranges = [...selectionRanges()];
            const range = ranges.length > 0 ? ranges[ranges.length - 1] : null;
            if (!range) return;
            const { begin, end } = range.index;
            let newEndRow = end.row + rowDelta;
            let newEndCol = end.col + colDelta;

            // 边界检查
            newEndRow = clamp(newEndRow, 0, rowCount - 1);
            newEndCol = clamp(newEndCol, 0, colCount - 1);

            ranges[ranges.length - 1] = makeRange(begin.row, begin.col, newEndRow, newEndCol);
            setSelectionRanges(ranges);

            scrollToCell(newEndRow, newEndCol);
        } else {
            blurCellElement();
            // 移动单格选区
            const ranges = selectionRanges();
            const range = ranges.length > 0 ? ranges[ranges.length - 1] : null;
            const baseRow = range ? normalizeRange(range).minRow : 0;
            const baseCol = range ? normalizeRange(range).minCol : 0;
            let newRow = baseRow + rowDelta;
            let newCol = baseCol + colDelta;

            // 边界检查（先检查，避免越界）
            newRow = clamp(newRow, 0, rowCount - 1);
            newCol = clamp(newCol, 0, colCount - 1);

            // Tab 换行逻辑：如果到达行尾/行首，换行
            if (isTabKey) {
                // 计算原始未 clamp 的值
                const rawCol = baseCol + colDelta;
                const [tabRow, tabCol] = handleTabWrap(baseRow, newCol, rawCol, rowCount, colCount);
                newRow = tabRow;
                newCol = tabCol;
            }

            // 更新锚点和选区（移动单格时清空其他区域，仅保留新位置）
            anchorCell = { rowIndex: newRow, colIndex: newCol };
            setSelectionRanges([makeRange(newRow, newCol, newRow, newCol)]);

            scrollToCell(newRow, newCol);
        }

        emitSelectionChange();
    }

    function scrollToCell(rowIndex: number, colIndex: number) {
        const container = tableContainerRef();
        if (!container) return;

        const row = dataSourceCopy()[rowIndex];
        const col = tableHeaderLast()[colIndex];
        if (!row || !col) return;

        const thead = container.querySelector('thead');
        const headerHeight = thead ? (thead as HTMLElement).offsetHeight : 0;
        const tfoot = container.querySelector('tfoot');
        const footerHeight = tfoot ? (tfoot as HTMLElement).offsetHeight : 0;

        const vs = virtualScroll();
        const vsx = virtualScrollX();

        // 是否开启按行滚动模式（experimental.scrollY 模式）
        const isScrollRowByRow = props.scrollRowByRow;

        // 计算目标行的位置（基于虚拟滚动数据）
        const rowHeight = vs.rowHeight;
        const targetRowTop = rowIndex * rowHeight;
        const targetRowBottom = targetRowTop + rowHeight;

        // 计算可视区域
        const visibleTop = isScrollRowByRow ? vs.scrollTop : container.scrollTop;
        const visibleBottom = visibleTop + vs.containerHeight - headerHeight - footerHeight;

        // 计算需要的垂直滚动位置
        let newScrollTop: number | null = null;
        if (targetRowTop < visibleTop) {
            newScrollTop = targetRowTop;
        } else if (targetRowBottom > visibleBottom) {
            newScrollTop = targetRowBottom - (vs.containerHeight - headerHeight - footerHeight);
        }

        // 计算目标列的位置
        const [targetColLeft, targetColWidth] = getColPosition(colIndex);
        const targetColRight = targetColLeft + targetColWidth;

        // 计算可视区域（水平）
        const visibleLeft = container.scrollLeft;
        const visibleRight = visibleLeft + vsx.containerWidth;

        // 计算固定列的宽度（用于检测遮挡）
        const [leftFixedWidth, rightFixedWidth] = getFixedColWidths()(colIndex);
        let newScrollLeft: number | null = null;
        if (targetColLeft < visibleLeft + leftFixedWidth) {
            newScrollLeft = targetColLeft - leftFixedWidth;
        } else if (targetColRight > visibleRight - rightFixedWidth) {
            newScrollLeft = targetColRight - vsx.containerWidth + rightFixedWidth;
        }

        if (newScrollTop !== null || newScrollLeft !== null) {
            scrollTo(newScrollTop, newScrollLeft);
        }
    }

    // expose function

    /** 获取选中的单元格信息 */
    function getSelectedArea() {
        const ranges = selectionRanges();
        if (!ranges.length) return { rows: [] as DT[], cols: [] as StkTableColumn<DT>[], ranges: [] as AreaSelectionRange[] };
        const data = dataSourceCopy();
        const cols = tableHeaderLast();
        // 收集所有区域的行和列
        const rowSet = new Set<number>();
        const colSet = new Set<number>();
        for (const range of ranges) {
            const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
            for (let r = minRow; r <= maxRow; r++) rowSet.add(r);
            for (let c = minCol; c <= maxCol; c++) colSet.add(c);
        }
        const sortedRows = [...rowSet].sort((a, b) => a - b);
        const sortedCols = [...colSet].sort((a, b) => a - b);
        return {
            rows: sortedRows.map(i => data[i]).filter(Boolean),
            cols: sortedCols.map(i => cols[i]).filter(Boolean),
            ranges: ranges.map(r => ({ ...r })),
        };
    }

    function clearSelectedArea() {
        setSelectionRanges([]);
        setIsSelecting(false);
    }

    function setAreaSelection(ranges?: AreaSelectionSetterRange<DT>, option: AreaSelectionSetterOption = {}): AreaSelectionRange[] {
        if (!config().enabled) return selectionRanges();

        const { silent = false, scrollToView = false } = option;
        const rowCount = dataSourceCopy().length;
        const colCount = tableHeaderLast().length;

        if (rowCount <= 0 || colCount <= 0) {
            clearSelectedArea();
            if (!silent) emitSelectionChange();
            return selectionRanges();
        }

        const maxRow = rowCount - 1;
        const maxCol = colCount - 1;

        let beginRow = 0;
        let endRow = maxRow;
        let beginCol = 0;
        let endCol = maxCol;

        if (ranges) {
            const begin = ranges.begin;
            const end = ranges.end ?? begin;

            beginRow = typeof begin.row === 'number' ? begin.row : getRowIndex(begin.row);
            endRow = typeof end.row === 'number' ? end.row : getRowIndex(end.row);

            const beginColInput = typeof begin.col === 'number' ? begin.col : begin.col ? getColumnIndex(begin.col) : void 0;
            const endColInput = typeof end.col === 'number' ? end.col : end.col ? getColumnIndex(end.col) : void 0;

            if (beginColInput !== void 0) {
                beginCol = beginColInput;
                endCol = endColInput !== void 0 ? endColInput : beginColInput;
            } else if (endColInput !== void 0) {
                beginCol = 0;
                endCol = endColInput;
            }
        }

        beginRow = clamp(beginRow, 0, maxRow);
        endRow = clamp(endRow, 0, maxRow);
        beginCol = clamp(beginCol, 0, maxCol);
        endCol = clamp(endCol, 0, maxCol);

        setSelectionRanges([makeRange(beginRow, beginCol, endRow, endCol)]);
        anchorCell = { rowIndex: beginRow, colIndex: beginCol };
        setIsSelecting(false);

        if (scrollToView) {
            scrollToCell(endRow, endCol);
        }

        if (!silent) emitSelectionChange();
        return selectionRanges();
    }

    return {
        config,
        isSelecting,
        get: getSelectedArea,
        set: setAreaSelection,
        clear: clearSelectedArea,
        copy: copySelectedArea,
        onMD: onSelectionMouseDown,
    };
}
export const useAreaSelectionName = 'useAreaSelection';

(useAreaSelection as any)[MY_FN_NAME] = useAreaSelectionName;
