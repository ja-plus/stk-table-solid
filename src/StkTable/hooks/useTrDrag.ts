import { createMemo, type Accessor, type Setter } from 'solid-js';
import { DragRowConfig } from '../types';
import { getClosestTr } from '../utils';

const TR_DRAGGING_CLASS = 'tr-dragging';
const TR_DRAG_OVER_CLASS = 'tr-dragging-over';
const DATA_TRANSFER_FORMAT = 'text/plain';

export type TrDragEmits = {
    onRowOrderChange?: (dragStartKey: string, targetRowKey: string) => void;
};

/**
 * 拖拽行
 */
export function useTrDrag(props: any, emits: TrDragEmits, dataSourceCopy: Accessor<any[]>, setDataSourceCopy: Setter<any[]>) {
    let trDragFlag = false;

    const dragRowConfig = createMemo<DragRowConfig>(() => {
        return { mode: 'insert', ...props.dragRowConfig };
    });

    function onTrDragStart(e: DragEvent, rowIndex: number) {
        const tr = getClosestTr(e.target as HTMLElement);
        if (tr) {
            const trRect = tr.getBoundingClientRect();
            const x = e.clientX - (trRect.left ?? 0);
            e.dataTransfer?.setDragImage(tr, x, trRect.height / 2);
            tr.classList.add(TR_DRAGGING_CLASS);
        }
        const dt = e.dataTransfer;
        if (dt) {
            dt.effectAllowed = 'move';
            dt.setData(DATA_TRANSFER_FORMAT, String(rowIndex));
        }
        trDragFlag = true;
    }

    function onTrDragOver(e: DragEvent) {
        if (!trDragFlag) return;
        e.preventDefault(); // 阻止默认行为，否则不会触发 drop 事件

        const dt = e.dataTransfer;
        if (dt) {
            dt.dropEffect = 'move';
        }
    }

    let oldTr: HTMLElement | null = null;
    function onTrDragEnter(e: DragEvent) {
        if (!trDragFlag) return;
        e.preventDefault();
        const tr = getClosestTr(e.target as HTMLElement);
        if (oldTr && oldTr !== tr) {
            // 两个tr不一样说明移动到了另一个tr中
            oldTr.classList.remove(TR_DRAG_OVER_CLASS);
        }
        if (tr) {
            oldTr = tr;
            tr.classList.add(TR_DRAG_OVER_CLASS);
        }
    }

    function onTrDragEnd(e: DragEvent) {
        if (!trDragFlag) return;
        const tr = getClosestTr(e.target as HTMLElement);
        if (tr) {
            tr.classList.remove(TR_DRAGGING_CLASS);
        }
        if (oldTr) {
            oldTr.classList.remove(TR_DRAG_OVER_CLASS);
            oldTr = null;
        }
        trDragFlag = false;
    }

    function onTrDrop(e: DragEvent, rowIndex: number) {
        if (!trDragFlag) return;
        const dt = e.dataTransfer;
        if (!dt) return;
        const mode = dragRowConfig().mode;
        const sourceIndex = Number(dt.getData(DATA_TRANSFER_FORMAT));
        const endIndex = rowIndex;
        if (sourceIndex === endIndex) return;

        if (mode !== 'none') {
            const dataSourceTemp = dataSourceCopy().slice();
            const sourceRow = dataSourceTemp[sourceIndex];
            if (mode === 'swap') {
                dataSourceTemp[sourceIndex] = dataSourceTemp[endIndex];
                dataSourceTemp[endIndex] = sourceRow;
            } else {
                dataSourceTemp.splice(sourceIndex, 1);
                dataSourceTemp.splice(endIndex, 0, sourceRow);
            }
            setDataSourceCopy(dataSourceTemp);
        }
        emits.onRowOrderChange?.(sourceIndex as any, endIndex as any);
    }

    return [onTrDragStart, onTrDragEnter, onTrDragOver, onTrDrop, onTrDragEnd] as const;
}
