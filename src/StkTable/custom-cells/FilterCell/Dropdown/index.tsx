import { createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import { render } from 'solid-js/web';
import type { FilterOption } from '../types';

const DROPDOWN_DEFAULT_WIDTH = 300;
const DROPDOWN_DEFAULT_HEIGHT = 400;
const PADDING = 6;

export interface DropdownInstance {
    visible: boolean;
    show: (pos: { x: number; y: number; height?: number }, options: FilterOption[], onConfirm: (values: FilterOption['value'][]) => void) => void;
    hide: () => void;
    setTheme: (t: 'light' | 'dark') => void;
}

/**
 * 筛选下拉面板（单例，挂载到 body）
 *
 * SolidJS 版本不依赖 StkTable 渲染选项列表（避免循环依赖），
 * 直接使用原生 checkbox 列表实现，功能与 Vue 版本对齐。
 */
function createDropdown(): DropdownInstance {
    const [visible, setVisible] = createSignal(false);
    const [theme, setThemeSignal] = createSignal<'light' | 'dark'>('light');
    const [options, setOptions] = createSignal<FilterOption[]>([]);
    const [position, setPosition] = createSignal<{ x: number; y: number }>({ x: 0, y: 0 });
    const [checkedSet, setCheckedSet] = createSignal<Set<FilterOption['value']>>(new Set());

    let dropdownEl: HTMLDivElement | undefined;
    let onConfirmFn: ((values: FilterOption['value'][]) => void) | null = null;
    let dispose: (() => void) | null = null;

    function getDropdownSize(): [number, number] {
        if (!dropdownEl) {
            return [DROPDOWN_DEFAULT_WIDTH, DROPDOWN_DEFAULT_HEIGHT];
        }
        const rect = dropdownEl.getBoundingClientRect();
        return [rect.width || DROPDOWN_DEFAULT_WIDTH, rect.height || DROPDOWN_DEFAULT_HEIGHT];
    }

    function calculatePosition(docPos: { x: number; y: number; height?: number }) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;

        const [dropdownWidth, dropdownHeight] = getDropdownSize();

        let finalX = docPos.x;
        let finalY = docPos.y;

        const relativeX = docPos.x - scrollLeft;
        if (relativeX + dropdownWidth > viewportWidth - PADDING) {
            finalX = viewportWidth - dropdownWidth - PADDING + scrollLeft;
        }

        const relativeY = docPos.y - scrollTop;
        if (relativeY + dropdownHeight > viewportHeight - PADDING) {
            const triggerHeight = docPos.height || 30;
            if (relativeY - triggerHeight >= dropdownHeight + PADDING) {
                finalY = docPos.y - triggerHeight - dropdownHeight - PADDING;
            } else {
                finalY = PADDING + scrollTop;
            }
        }

        finalX = Math.max(PADDING + scrollLeft, finalX);
        finalY = Math.max(PADDING + scrollTop, finalY);

        return { x: finalX, y: finalY };
    }

    function initChecked() {
        const set = new Set<FilterOption['value']>();
        options().forEach(opt => {
            if (opt.selected) {
                set.add(opt.value);
            }
        });
        setCheckedSet(set);
    }

    function updateChecked(checked: boolean, row: FilterOption) {
        const set = new Set(checkedSet());
        if (checked) {
            set.add(row.value);
        } else {
            set.delete(row.value);
        }
        setCheckedSet(set);
    }

    function confirm() {
        const set = checkedSet();
        options().forEach(opt => (opt.selected = set.has(opt.value)));
        onConfirmFn?.(Array.from(set));
        hide();
    }

    function hide() {
        setVisible(false);
        setOptions([]);
        setCheckedSet(new Set());
    }

    function handleClear() {
        setCheckedSet(new Set());
        // 直接确认清空
        options().forEach(opt => (opt.selected = false));
        onConfirmFn?.([]);
        hide();
    }

    function handleClickOutside(e: MouseEvent) {
        if (!visible() || dropdownEl?.contains(e.target as Node)) return;
        hide();
    }

    function show(
        pos: { x: number; y: number; height?: number },
        opt: FilterOption[],
        onConfirm: (values: FilterOption['value'][]) => void,
    ) {
        if (dropdownEl) {
            dropdownEl.style.visibility = 'hidden';
        }
        setOptions(opt || []);
        onConfirmFn = onConfirm;
        initChecked();
        setVisible(true);
        // 等待 DOM 渲染后计算位置
        queueMicrotask(() => {
            setPosition(calculatePosition(pos));
            if (dropdownEl) {
                dropdownEl.style.visibility = 'visible';
            }
        });
    }

    function setTheme(t: 'light' | 'dark') {
        setThemeSignal(t);
    }

    // 挂载到 body
    const container = document.createElement('div');
    container.classList.add('stk-filter-dropdown-wrapper');
    document.body.appendChild(container);

    dispose = render(
        () => (
            <div
                ref={el => (dropdownEl = el)}
                class={`stk-filter-dropdown stk-filter-dropdown--${theme()}`}
                style={{
                    top: position().y + 'px',
                    left: position().x + 'px',
                    display: visible() ? undefined : 'none',
                }}
                onClick={e => e.stopPropagation()}
            >
                <div class="stk-filter-dropdown-list">
                    <For each={options()}>
                        {opt => (
                            <label class="stk-filter-dropdown-item" onClick={() => updateChecked(!checkedSet().has(opt.value), opt)}>
                                <input
                                    type="checkbox"
                                    checked={checkedSet().has(opt.value)}
                                    onChange={e => updateChecked(e.currentTarget.checked, opt)}
                                    onClick={e => e.stopPropagation()}
                                />
                                <span class="stk-filter-dropdown-label">{opt.label}</span>
                            </label>
                        )}
                    </For>
                    <Show when={!options().length}>
                        <div class="stk-filter-dropdown-empty">暂无数据</div>
                    </Show>
                </div>
                <footer>
                    <button onClick={handleClear}>↺</button>
                    <button onClick={confirm}>✓</button>
                </footer>
            </div>
        ),
        container,
    );

    document.addEventListener('click', handleClickOutside);

    onCleanup(() => {
        document.removeEventListener('click', handleClickOutside);
        dispose?.();
    });

    return {
        get visible() {
            return visible();
        },
        show,
        hide,
        setTheme,
    };
}

let dropdownIns: DropdownInstance | null = null;

/** 获取下拉面板单例（懒创建） */
export async function getDropdownIns(): Promise<DropdownInstance> {
    if (!dropdownIns) {
        dropdownIns = createDropdown();
    }
    return dropdownIns;
}
