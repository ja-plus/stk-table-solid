import type { JSX, Accessor } from 'solid-js';
import { getDropdownIns } from './Dropdown/index';
import type { FilterOption } from './types';

export interface FilterProps {
    col: any;
    colIndex?: number;
    rowIndex?: number;
    /** 主题（响应式） */
    theme?: Accessor<'light' | 'dark'>;
    /** 是否激活筛选（响应式） */
    active?: Accessor<boolean>;
    /** 懒获取筛选选项，仅在下拉打开时调用 */
    getOptions: () => FilterOption[];
    /** 筛选值变更回调 */
    onChange?: (value: FilterOption['value'][]) => void;
    children?: JSX.Element;
}

/**
 * 筛选表头单元格组件
 *
 * 显示列标题 + 筛选图标，点击图标弹出筛选下拉面板。
 */
export default function Filter(props: FilterProps) {
    const theme = () => props.theme?.() || 'light';
    const active = () => !!props.active?.();

    function handleIconClick(e: MouseEvent) {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();

        // 计算相对于文档的位置（考虑滚动偏移）
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        getDropdownIns().then(ins => {
            if (ins.visible) {
                ins.hide();
                return;
            }
            ins.setTheme(theme());
            ins.show(
                {
                    x: rect.left + scrollLeft,
                    y: rect.bottom + scrollTop,
                    height: rect.height,
                },
                props.getOptions(),
                handleConfirm,
            );
        });
    }

    function handleConfirm(value: FilterOption['value'][]) {
        props.onChange?.(value);
    }

    return (
        <div
            class="stk-filter"
            classList={{
                'stk-filter--active': active(),
                'stk-filter--light': theme() === 'light',
                'stk-filter--dark': theme() === 'dark',
            }}
        >
            {props.children ?? <span>{props.col.title}</span>}
            <svg class="stk-filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" onClick={handleIconClick}>
                <path
                    fill="currentColor"
                    d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z"
                />
            </svg>
        </div>
    );
}
