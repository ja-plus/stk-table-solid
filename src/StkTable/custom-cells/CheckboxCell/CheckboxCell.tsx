import { createEffect, Show } from 'solid-js';
import { Dynamic } from 'solid-js/web';

export interface CheckboxCellProps {
    /** 当前是否选中 */
    checked?: boolean;
    /** 是否半选状态 */
    indeterminate?: boolean;
    /** 自定义 checkbox 组件（SolidJS 组件） */
    customComponent?: any;
    /** 状态变更回调 */
    onChange?: (checked: boolean) => void;
}

/**
 * Checkbox 展示组件
 *
 * 不传 customComponent 时使用原生 input[type=checkbox]，
 * 传入时渲染自定义组件（透传 checked / indeterminate / onChange）。
 */
export default function CheckboxCell(props: CheckboxCellProps) {
    /** 防重保护：部分 UI 库会同时触发多个事件 */
    let _lastValue: boolean | undefined;
    let inputEl: HTMLInputElement | undefined;

    // indeterminate 是 DOM property（非 attribute），需手动同步
    createEffect(() => {
        if (inputEl) inputEl.indeterminate = !!props.indeterminate;
    });

    function handleChange(e: any) {
        let checked: boolean;
        if (typeof e === 'boolean') {
            checked = e;
        } else if (e?.target?.checked !== undefined) {
            checked = e.target.checked;
        } else {
            checked = !!e;
        }
        if (checked === _lastValue) return;
        _lastValue = checked;
        props.onChange?.(checked);
    }

    return (
        <div class="stk-checkbox-cell">
            <Show
                when={props.customComponent}
                fallback={
                    <input
                        ref={inputEl}
                        type="checkbox"
                        checked={!!props.checked}
                        class="stk-checkbox-native"
                        onChange={handleChange}
                        onClick={e => e.stopPropagation()}
                    />
                }
            >
                <Dynamic
                    component={props.customComponent}
                    checked={props.checked}
                    indeterminate={props.indeterminate}
                    onChange={handleChange}
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                />
            </Show>
        </div>
    );
}
