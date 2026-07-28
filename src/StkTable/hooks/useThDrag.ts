import { createMemo, type Accessor } from 'solid-js';
import { ColKeyGen, StkTableColumn } from '../types';
import { getClosestTh, isEmptyValue } from '../utils';

export type ThDragEmits = {
    onThDragStart?: (dragStartKey: string) => void;
    onThDrop?: (targetColKey: string) => void;
    onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
    'onUpdate:columns'?: (cols: StkTableColumn<any>[]) => void;
};

/**
 * 列顺序拖动
 */
export function useThDrag(props: any, emits: ThDragEmits, colKeyGen: ColKeyGen) {
    const dragConfig = createMemo(() => {
        const headerDrag = props.headerDrag;
        const draggable = headerDrag !== false; // true or object
        return {
            draggable,
            mode: 'insert',
            disabled: () => false,
            ...headerDrag,
        };
    });

    /** 开始拖动记录th位置 */
    function onThDragStart(e: DragEvent) {
        const th = getClosestTh(e.target as HTMLElement);
        if (!th) return;
        const dragStartKey = th.dataset.colKey || '';
        const dt = e.dataTransfer;
        if (dt) {
            dt.effectAllowed = 'move';
            dt.setData('text/plain', dragStartKey);
        }

        emits.onThDragStart?.(dragStartKey);
    }

    function onThDragOver(e: DragEvent) {
        const th = getClosestTh(e.target as HTMLElement);
        if (!th) return;

        const isHeaderDraggable = th.getAttribute('draggable') === 'true';
        if (!isHeaderDraggable) return;

        const dt = e.dataTransfer;
        if (dt) {
            dt.dropEffect = 'move';
        }
        e.preventDefault();
    }

    /** th拖动释放时 */
    function onThDrop(e: DragEvent) {
        const th = getClosestTh(e.target as HTMLElement);
        if (!th) return;
        const dragStartKey = e.dataTransfer?.getData('text');
        if (dragStartKey !== th.dataset.colKey) {
            handleColOrderChange(dragStartKey, th.dataset.colKey);
        }
        emits.onThDrop?.(th.dataset.colKey);
    }

    /** 列拖动交换顺序 */
    function handleColOrderChange(dragStartKey: string | undefined, dragEndKey: string | undefined) {
        if (isEmptyValue(dragStartKey) || isEmptyValue(dragEndKey)) return;

        if (dragConfig().mode !== 'none') {
            const columns: StkTableColumn<any>[] = props.columns.slice();

            const dragStartIndex = columns.findIndex(col => colKeyGen()(col) === dragStartKey);
            const dragEndIndex = columns.findIndex(col => colKeyGen()(col) === dragEndKey);

            if (dragStartIndex === -1 || dragEndIndex === -1) return;

            const dragStartCol = columns[dragStartIndex];
            if (dragConfig().mode === 'swap') {
                columns[dragStartIndex] = columns[dragEndIndex];
                columns[dragEndIndex] = dragStartCol;
            } else {
                // default is insert
                columns.splice(dragStartIndex, 1);
                columns.splice(dragEndIndex, 0, dragStartCol);
            }
            emits['onUpdate:columns']?.(columns);
        }

        emits.onColOrderChange?.(dragStartKey, dragEndKey);
    }

    /** 是否可拖拽 */
    function isHeaderDraggable(col: StkTableColumn<any>) {
        return dragConfig().draggable && !dragConfig().disabled(col);
    }

    return [onThDragStart, onThDragOver, onThDrop, isHeaderDraggable] as const;
}
