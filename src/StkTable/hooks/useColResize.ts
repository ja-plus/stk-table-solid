import { createSignal, createMemo, onMount, onCleanup, type Accessor } from 'solid-js';
import { StkTableColumn, UniqKey } from '../types';
import { getCalculatedColWidth } from '../utils/constRefUtils';

type ColResizeState<DT extends Record<string, any>> = {
    /** 当前被拖动的列*/
    currentCol: StkTableColumn<DT> | null;
    /** 最后一个叶子列 */
    lastCol: StkTableColumn<DT> | null;
    /** 鼠标按下开始位置 */
    startX: number;
    /** 鼠标按下时鼠标对于表格的偏移量 */
    startOffsetTableX: 0;
    /** 是否反向计算，true:左增右减。false:左减右增 */
    revertMoveX: boolean;
};

export type ColResizeEmits = {
    'onUpdate:columns'?: (cols: StkTableColumn<any>[]) => void;
    onColResize?: (col: StkTableColumn<any>) => void;
};

/** 列宽拖动 */
export function useColResize<DT extends Record<string, any>>(
    props: any,
    emits: ColResizeEmits,
    tableContainerRef: Accessor<HTMLElement | undefined>,
    tableHeaderLast: Accessor<StkTableColumn<DT>[]>,
    colResizeIndicatorRef: Accessor<HTMLElement | undefined>,
    colKeyGen: Accessor<(p: any) => UniqKey>,
    fixedCols: Accessor<StkTableColumn<DT>[]>,
    onColWidthChange?: () => void,
) {
    /** 列宽是否在拖动 */
    const [isColResizing, setIsColResizing] = createSignal(false);

    /** 列宽调整状态 */
    let colResizeState: ColResizeState<DT> = {
        currentCol: null,
        lastCol: null,
        startX: 0,
        startOffsetTableX: 0,
        revertMoveX: false,
    };

    /** 是否可拖动 */
    const colResizeOn = createMemo(() => {
        if (Object.prototype.toString.call(props.colResizable) === '[object Object]') {
            return (col: StkTableColumn<DT>) => !props.colResizable.disabled(col);
        }
        return (_col?: StkTableColumn<DT>) => !!props.colResizable;
    });

    onMount(() => {
        initColResizeEvent();
    });

    onCleanup(() => {
        clearColResizeEvent();
    });

    /** 初始化列宽拖动事件 */
    function initColResizeEvent() {
        window.addEventListener('mousemove', onThResizeMouseMove);
        window.addEventListener('mouseup', onThResizeMouseUp);
    }

    /** 清除列宽拖动事件 */
    function clearColResizeEvent() {
        window.removeEventListener('mousemove', onThResizeMouseMove);
        window.removeEventListener('mouseup', onThResizeMouseUp);
    }

    /**
     * 拖动开始
     */
    function onThResizeMouseDown(e: MouseEvent, col: StkTableColumn<DT>, leftHandle = false) {
        if (!tableContainerRef()) return;
        e.stopPropagation();
        e.preventDefault();
        const { clientX } = e;
        const { scrollLeft, scrollTop } = tableContainerRef()!;
        const { left } = tableContainerRef()!.getBoundingClientRect();
        const tableHeaderLastValue = tableHeaderLast();
        let revertMoveX = false;
        const colKey = colKeyGen();
        const colKeyValue = colKey(col);
        const colIndex = tableHeaderLastValue.findIndex(it => colKey(it) === colKeyValue);
        const fixedIndex = fixedCols().indexOf(col);
        const isColFixed = fixedIndex !== -1;

        if (leftHandle) {
            // 左侧拖动条
            if (isColFixed && col.fixed === 'right') {
                revertMoveX = true;
            } else {
                if (colIndex - 1 >= 0) {
                    col = tableHeaderLastValue[colIndex - 1];
                }
            }
        } else {
            // 右侧拖动条
            if (isColFixed && col.fixed === 'right') {
                col = fixedCols()[fixedIndex + 1] || col;
            }
        }

        const offsetTableX = clientX - left + scrollLeft;

        // 记录拖动状态
        setIsColResizing(true);
        Object.assign(colResizeState, {
            currentCol: col,
            lastCol: findLastChildCol(col),
            startX: clientX,
            startOffsetTableX: offsetTableX,
            revertMoveX,
        });

        // 展示指示线，更新其位置
        if (colResizeIndicatorRef()) {
            const style = colResizeIndicatorRef()!.style;
            style.display = 'block';
            style.left = offsetTableX + 'px';
            style.top = scrollTop + 'px';
        }
    }

    function onThResizeMouseMove(e: MouseEvent) {
        if (!isColResizing()) return;
        e.stopPropagation();
        e.preventDefault();
        const { lastCol, startX, startOffsetTableX } = colResizeState;
        const { clientX } = e;
        let moveX = clientX - startX;
        const currentColWidth = getCalculatedColWidth(lastCol);
        const minWidth = lastCol?.minWidth ?? props.colMinWidth;
        // 移动量不小于最小列宽
        if (currentColWidth + moveX < minWidth) {
            moveX = -currentColWidth;
        }

        const offsetTableX = startOffsetTableX + moveX;
        if (!colResizeIndicatorRef()) return;
        colResizeIndicatorRef()!.style.left = offsetTableX + 'px';
    }

    function onThResizeMouseUp(e: MouseEvent) {
        if (!isColResizing()) return;
        const { startX, lastCol, revertMoveX } = colResizeState;
        const { clientX } = e;
        const moveX = revertMoveX ? startX - clientX : clientX - startX;

        // 移动量不小于最小列宽
        let width = getCalculatedColWidth(lastCol) + moveX;
        if (width < props.colMinWidth) width = props.colMinWidth;

        const colKey = colKeyGen();

        const curCol = tableHeaderLast().find(it => colKey(it) === colKey(lastCol));
        if (curCol) {
            curCol.width = width + 'px';
            onColWidthChange?.();
            emits['onUpdate:columns']?.(props.columns.slice());
            emits.onColResize?.({ ...curCol });
        }

        // 隐藏指示线
        if (colResizeIndicatorRef()) {
            const style = colResizeIndicatorRef()!.style;
            style.display = 'none';
            style.left = '0';
            style.top = '0';
        }
        // 清除拖动状态
        setIsColResizing(false);
        colResizeState = {
            currentCol: null,
            lastCol: null,
            startX: 0,
            startOffsetTableX: 0,
            revertMoveX: false,
        };
    }

    /**获取最后一个叶子 */
    function findLastChildCol(column: StkTableColumn<DT> | null) {
        if (column?.children?.length) {
            const lastChild = column.children.slice(-1)[0] as StkTableColumn<DT>;
            return findLastChildCol(lastChild);
        }
        return column;
    }

    return [colResizeOn, isColResizing, onThResizeMouseDown] as const;
}
