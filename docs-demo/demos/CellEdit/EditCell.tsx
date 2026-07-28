import { createSignal, createEffect, useContext } from 'solid-js';
import type { CustomCellProps } from '../../../src/StkTable/index';
import { useStkTableContext } from '../../../src/StkTable/index';
import { CellEditRefreshContext } from './context';

export default function EditCell(props: CustomCellProps<any>) {
    const refresh = useContext(CellEditRefreshContext);
    const ctx = useStkTableContext();
    const { row, col } = props;

    const [editValue, setEditValue] = createSignal<any>(props.cellValue);
    const [isEditing, setIsEditing] = createSignal(false);
    let inputRef: HTMLInputElement | undefined;

    // cellValue 变化时同步 editValue（行字段被修改后通过 rowVersion 触发）
    createEffect(() => {
        ctx?.rowVersion();
        setEditValue(props.cellValue);
    });

    /** 是否在行编辑模式（依赖 rowVersion，行字段被修改后重新读取） */
    const isEditMode = () => {
        ctx?.rowVersion();
        return !!row._isEditing;
    };
    const editing = () => isEditMode() || isEditing();

    /** 展示值（依赖 rowVersion，行字段被修改后重新读取） */
    const displayValue = () => {
        ctx?.rowVersion();
        return props.cellValue;
    };

    function startEditing() {
        setIsEditing(true);
        // 延迟设置焦点，确保输入框已经渲染
        setTimeout(() => {
            inputRef?.focus();
        }, 0);
    }

    function setCellValue(v: string) {
        (row[col.dataIndex] as any) = v;
    }

    function finishEditing(v: string) {
        setIsEditing(false);
        setCellValue(v);
        ctx?.bumpRowVersion();
        refresh();
    }

    function cancelEditing() {
        // 行编辑模式不用取消
        if (isEditMode()) return;
        if (!isEditing()) return;
        setIsEditing(false);
        setEditValue(props.cellValue);
    }

    /** 如果在行编辑模式，则实时更新 */
    function handleChange(e: Event) {
        const v = (e.currentTarget as HTMLInputElement).value;
        setEditValue(v);
        if (isEditMode()) {
            setCellValue(v);
            ctx?.bumpRowVersion();
            refresh();
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            finishEditing((e.currentTarget as HTMLInputElement).value);
        } else if (e.key === 'Escape' || e.key === 'Esc') {
            cancelEditing();
        }
    }

    return (
        <div class="edit-cell" title={editing() ? '回车保存' : '双击编辑'} onDblClick={startEditing}>
            {!editing() ? (
                displayValue()
            ) : (
                <input
                    ref={inputRef}
                    class="edit-input"
                    value={editValue() ?? ''}
                    onBlur={cancelEditing}
                    onInput={handleChange}
                    onKeyUp={handleKeyUp}
                />
            )}
        </div>
    );
}
