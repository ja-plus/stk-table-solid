import { createSignal, createEffect, on, Show, type JSX } from 'solid-js';
import type { CustomCellProps } from '../../types/index';

export interface EditableCellProps extends CustomCellProps<any> {
    trigger?: 'dblclick' | 'click';
    onChange?: (newValue: any) => void;
}

/**
 * 可编辑单元格组件
 *
 * 默认展示文本，双击（或单击）进入编辑态，
 * 失焦 / Enter / Tab 提交，Escape 取消。
 */
export default function EditableCell(props: EditableCellProps) {
    const trigger = () => props.trigger || 'dblclick';

    const [editValue, setEditValue] = createSignal<any>(props.cellValue);
    const [isEditing, setIsEditing] = createSignal(false);

    let inputRef: HTMLInputElement | undefined;
    let rootRef: HTMLDivElement | undefined;

    const displayValue = () => {
        const v = props.cellValue;
        return v !== undefined && v !== null ? v : '';
    };

    // cellValue 外部变化时同步编辑值（非编辑态）
    createEffect(
        on(
            () => props.cellValue,
            v => {
                if (!isEditing()) {
                    setEditValue(v);
                }
            },
        ),
    );

    function onTrigger(e: MouseEvent) {
        if (e.type !== trigger()) return;
        startEditing();
    }

    function startEditing() {
        setEditValue(props.cellValue);
        setIsEditing(true);
        queueMicrotask(() => {
            inputRef?.focus();
        });
    }

    function finishEditing() {
        setIsEditing(false);
        const newValue = editValue();
        setCellValue(newValue);
        props.onChange?.(newValue);
        refocusContainer();
    }

    function cancelEditing() {
        setIsEditing(false);
        setEditValue(props.cellValue);
        refocusContainer();
    }

    function onBlur() {
        if (!isEditing()) return;
        finishEditing();
    }

    function onInput(e: Event) {
        setEditValue((e.target as HTMLInputElement).value);
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            finishEditing();
        } else if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            e.stopPropagation();
            cancelEditing();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.stopPropagation();
        } else if (e.key === 'Tab') {
            finishEditing();
        } else {
            e.stopPropagation();
        }
    }

    function setCellValue(v: any) {
        const { row, col } = props;
        (row[col.dataIndex] as any) = v;
    }

    function refocusContainer() {
        const el = rootRef?.closest?.('.stk-table') as HTMLElement | null;
        el?.focus();
    }

    return (
        <div ref={el => (rootRef = el)} class="stk-editable-cell" onDblClick={onTrigger} onClick={onTrigger}>
            <Show
                when={isEditing()}
                fallback={<>{editValue() ?? ''}</>}
            >
                <input
                    ref={el => (inputRef = el)}
                    class="stk-editable-cell-input"
                    value={editValue()}
                    onBlur={onBlur}
                    onInput={onInput}
                    onKeyDown={onKeydown}
                />
            </Show>
        </div>
    );
}
