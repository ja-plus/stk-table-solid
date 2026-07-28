import { createContext, useContext, createSignal, createEffect, createMemo } from 'solid-js';
import StkTable from '../../StkTable';
import type { StkTableColumn, CustomCellProps } from '../../../src/StkTable/index';
import { useI18n } from '../../hooks/useI18n/index';
import { useVitepressData } from '../../hooks/useVitepress';

const lightDefaults: Record<string, string> = {
    '--row-height': '28px',
    '--header-row-height': 'var(--row-height)',
    '--footer-row-height': 'var(--row-height)',
    '--cell-padding-y': '0',
    '--cell-padding-x': '8px',
    '--resize-handle-width': '4px',
    '--border-color': '#e8e8f4',
    '--border-width': '1px',
    '--td-bgc': '#ffffff',
    '--td-hover-color': 'hsl(207, 90%, 70%)',
    '--td-active-color': 'hsl(207, 90%, 54%)',
    '--th-bgc': '#f1f1f9',
    '--tf-bgc': '#f1f1f9',
    '--th-color': '#272841',
    '--tr-active-bgc': 'rgb(230, 247, 255)',
    '--tr-hover-bgc': '#e6f7ff',
    '--stripe-bgc': '#fafafc',
    '--sort-arrow-color': '#757699',
    '--sort-arrow-hover-color': '#8f90b5',
    '--sort-arrow-active-color': '#1b63d9',
    '--sort-arrow-active-sub-color': '#cbcbe1',
    '--fold-icon-color': '#757699',
    '--fold-icon-hover-color': '#8f90b5',
    '--col-resize-indicator-color': '#87879c',
    '--fixed-col-shadow-color-from': 'rgba(0, 0, 0, 0.1)',
    '--fixed-col-shadow-color-to': 'rgba(0, 0, 0, 0)',
    '--drag-handle-hover-color': '#d0d1e0',
    '--sb-thumb-color': '#c1c1d7',
    '--sb-thumb-hover-color': '#a8a8c1',
    '--cs-bgc': '#d3eafd',
    '--cs-bc': '#2196f3',
};

const darkDefaults: Record<string, string> = {
    '--row-height': '28px',
    '--header-row-height': 'var(--row-height)',
    '--footer-row-height': 'var(--row-height)',
    '--cell-padding-y': '0',
    '--cell-padding-x': '8px',
    '--resize-handle-width': '4px',
    '--border-color': '#292933',
    '--border-width': '1px',
    '--td-bgc': '#1b1b24',
    '--td-hover-color': 'hsl(219, 59%, 60%)',
    '--td-active-color': 'hsl(219, 59%, 51%)',
    '--th-bgc': '#202029',
    '--tf-bgc': '#202029',
    '--th-color': '#c0c0d1',
    '--tr-active-bgc': '#283f63',
    '--tr-hover-bgc': '#1a2b46',
    '--stripe-bgc': '#202029',
    '--sort-arrow-color': '#5d6064',
    '--sort-arrow-hover-color': '#727782',
    '--sort-arrow-active-color': '#d0d1d2',
    '--sort-arrow-active-sub-color': '#5d6064',
    '--fold-icon-color': '#5d6064',
    '--fold-icon-hover-color': '#727782',
    '--col-resize-indicator-color': '#5d6064',
    '--fixed-col-shadow-color-from': 'rgba(135, 135, 156, 0.1)',
    '--fixed-col-shadow-color-to': 'rgba(135, 135, 156, 0)',
    '--drag-handle-hover-color': '#5d6064',
    '--sb-thumb-color': 'rgba(93, 96, 100, 0.9)',
    '--sb-thumb-hover-color': 'rgb(114, 119, 130)',
    '--cs-bgc': '#2a3f6b',
    '--cs-bc': '#386ccc',
};

type CssVarsCtxType = {
    cssVars: () => Record<string, string>;
    setVar: (key: string, value: string) => void;
    resetAll: () => void;
    resetVar: (key: string) => void;
    isModified: (key: string) => boolean;
    t: (key: string, defaultValue?: string) => string;
};

const CssVarsCtx = createContext<CssVarsCtxType>();

/** 稳定的单元格组件（模块级），通过 Context 订阅 cssVars 变化 */
function KeyCell(props: CustomCellProps<any>) {
    if (!props.row || props.row.children) return null;
    return <>{props.cellValue}</>;
}

function ValueCell(props: CustomCellProps<any>) {
    const ctx = useContext(CssVarsCtx)!;
    const row = props.row;
    if (!row || row.children) return null;
    const key = row.key as string;
    if (row.type === 'color') {
        return (
            <div class="control-cell">
                <input type="color" class="color-input" value={ctx.cssVars()[key]} onInput={e => ctx.setVar(key, e.currentTarget.value)} />
            </div>
        );
    }
    if (row.type === 'number') {
        return (
            <div class="control-cell">
                <input
                    type="number"
                    class="number-input"
                    value={(() => {
                        const match = (ctx.cssVars()[key] as string)?.match(/^([\d.]+)/);
                        return match ? parseFloat(match[1]) : 0;
                    })()}
                    onInput={e => ctx.setVar(key, `${e.currentTarget.value}${row.unit}`)}
                />
                <span class="unit-label"> {row.unit}</span>
            </div>
        );
    }
    return (
        <div class="control-cell">
            <input type="text" class="text-input" value={ctx.cssVars()[key]} onInput={e => ctx.setVar(key, e.currentTarget.value)} />
        </div>
    );
}

function ActionCell(props: CustomCellProps<any>) {
    const ctx = useContext(CssVarsCtx)!;
    const row = props.row;
    if (!row || row.children) return null;
    const key = row.key as string;
    return (
        <button class="row-reset-btn" disabled={!ctx.isModified(key)} onClick={() => ctx.resetVar(key)}>
            ↺
        </button>
    );
}

function ResetAllHeader() {
    const ctx = useContext(CssVarsCtx)!;
    return (
        <button class="row-reset-btn" title={ctx.t('cssVars.resetAll')} onClick={ctx.resetAll}>
            ↺
        </button>
    );
}

export default function CssVarsDemo() {
    const { t } = useI18n();
    const { isDark } = useVitepressData();

    const [cssVars, setCssVars] = createSignal<Record<string, string>>({ ...lightDefaults });
    const [copyMessage, setCopyMessage] = createSignal('');

    const getDefaults = () => (isDark() ? darkDefaults : lightDefaults);

    // 主题切换时重置为对应默认值
    createEffect(() => {
        setCssVars({ ...(isDark() ? darkDefaults : lightDefaults) });
    });

    const setVar = (key: string, value: string) => {
        setCssVars(prev => ({ ...prev, [key]: value }));
    };

    const resetAll = () => {
        setCssVars({ ...(isDark() ? darkDefaults : lightDefaults) });
    };

    const resetVar = (key: string) => {
        const defaults = getDefaults();
        setCssVars(prev => ({ ...prev, [key]: defaults[key] }));
    };

    const isModified = (key: string) => {
        const defaults = getDefaults();
        return cssVars()[key] !== defaults[key];
    };

    const modifiedVars = createMemo(() => {
        const defaults = getDefaults();
        const modified: Record<string, string> = {};
        for (const [key, value] of Object.entries(cssVars())) {
            if (value !== defaults[key]) {
                modified[key] = value;
            }
        }
        return modified;
    });

    const copyModifiedStyles = async () => {
        const vars = modifiedVars();
        if (Object.keys(vars).length === 0) {
            setCopyMessage(t('cssVars.noModifications'));
            setTimeout(() => setCopyMessage(''), 1500);
            return;
        }
        const cssString = Object.entries(vars)
            .map(([key, value]) => `    ${key}: ${value};`)
            .join('\n');
        const fullCss = `.stk-table {\n${cssString}\n}`;
        try {
            await navigator.clipboard.writeText(fullCss);
            setCopyMessage(t('cssVars.copied'));
        } catch {
            setCopyMessage(t('cssVars.failed'));
        }
        setTimeout(() => setCopyMessage(''), 1500);
    };

    const tableStyle = createMemo(() => {
        const style: Record<string, string> = {};
        for (const [key, value] of Object.entries(cssVars())) {
            style[key] = value;
        }
        return style;
    });

    const varList = [
        {
            label: t('cssVars.size'),
            key: '1',
            children: [
                { label: t('cssVars.rowHeight'), key: '--row-height', type: 'number', unit: 'px' },
                { label: t('cssVars.headerRowHeight'), key: '--header-row-height', type: 'text' },
                { label: t('cssVars.footerRowHeight'), key: '--footer-row-height', type: 'text' },
                { label: t('cssVars.cellPaddingY'), key: '--cell-padding-y', type: 'number', unit: 'px' },
                { label: t('cssVars.cellPaddingX'), key: '--cell-padding-x', type: 'number', unit: 'px' },
                { label: t('cssVars.resizeHandleWidth'), key: '--resize-handle-width', type: 'number', unit: 'px' },
            ],
        },
        {
            label: t('cssVars.border'),
            key: '2',
            children: [
                { label: t('cssVars.borderColor'), key: '--border-color', type: 'color' },
                { label: t('cssVars.borderWidth'), key: '--border-width', type: 'number', unit: 'px' },
            ],
        },
        {
            label: t('cssVars.cell'),
            key: '3',
            children: [
                { label: t('cssVars.tdBgc'), key: '--td-bgc', type: 'color' },
                { label: t('cssVars.tdHoverColor'), key: '--td-hover-color', type: 'color' },
                { label: t('cssVars.tdActiveColor'), key: '--td-active-color', type: 'color' },
            ],
        },
        {
            label: t('cssVars.headerFooter'),
            key: '4',
            children: [
                { label: t('cssVars.thBgc'), key: '--th-bgc', type: 'color' },
                { label: t('cssVars.tfBgc'), key: '--tf-bgc', type: 'color' },
                { label: t('cssVars.thColor'), key: '--th-color', type: 'color' },
            ],
        },
        {
            label: t('cssVars.rowState'),
            key: '5',
            children: [
                { label: t('cssVars.trHoverBgc'), key: '--tr-hover-bgc', type: 'color' },
                { label: t('cssVars.trActiveBgc'), key: '--tr-active-bgc', type: 'color' },
                { label: t('cssVars.stripeBgc'), key: '--stripe-bgc', type: 'color' },
            ],
        },
        {
            label: t('cssVars.sort'),
            key: '6',
            children: [
                { label: t('cssVars.sortArrowColor'), key: '--sort-arrow-color', type: 'color' },
                { label: t('cssVars.sortArrowHoverColor'), key: '--sort-arrow-hover-color', type: 'color' },
                { label: t('cssVars.sortArrowActiveColor'), key: '--sort-arrow-active-color', type: 'color' },
                { label: t('cssVars.sortArrowActiveSubColor'), key: '--sort-arrow-active-sub-color', type: 'color' },
            ],
        },
        {
            label: t('cssVars.icon'),
            key: '7',
            children: [
                { label: t('cssVars.foldIconColor'), key: '--fold-icon-color', type: 'color' },
                { label: t('cssVars.foldIconHoverColor'), key: '--fold-icon-hover-color', type: 'color' },
            ],
        },
        {
            label: t('cssVars.colResize'),
            key: '8',
            children: [{ label: t('cssVars.colResizeIndicatorColor'), key: '--col-resize-indicator-color', type: 'color' }],
        },
        {
            label: t('cssVars.fixedCol'),
            key: '9',
            children: [
                { label: t('cssVars.fixedColShadowColorFrom'), key: '--fixed-col-shadow-color-from', type: 'color' },
                { label: t('cssVars.fixedColShadowColorTo'), key: '--fixed-col-shadow-color-to', type: 'color' },
            ],
        },
        {
            label: t('cssVars.dragRow'),
            key: '10',
            children: [{ label: t('cssVars.dragHandleHoverColor'), key: '--drag-handle-hover-color', type: 'color' }],
        },
        {
            label: t('cssVars.scrollbar'),
            key: '11',
            children: [
                { label: t('cssVars.sbThumbColor'), key: '--sb-thumb-color', type: 'color' },
                { label: t('cssVars.sbThumbHoverColor'), key: '--sb-thumb-hover-color', type: 'color' },
            ],
        },
        {
            label: t('cssVars.selection'),
            key: '12',
            children: [
                { label: t('cssVars.csBgc'), key: '--cs-bgc', type: 'color' },
                { label: t('cssVars.csBc'), key: '--cs-bc', type: 'color' },
            ],
        },
    ];

    const controlColumns: StkTableColumn<any>[] = [
        { type: 'tree-node', title: t('cssVars.description'), dataIndex: 'label', sorter: true },
        { title: t('cssVars.cssVar'), dataIndex: 'key', sorter: true, width: 240, customCell: KeyCell },
        { title: t('cssVars.value'), dataIndex: 'value', align: 'right', width: 150, customCell: ValueCell },
        { title: '', dataIndex: 'action' as any, width: 40, align: 'center', customHeaderCell: ResetAllHeader, customCell: ActionCell },
    ];

    const ctxValue: CssVarsCtxType = {
        cssVars,
        setVar,
        resetAll,
        resetVar,
        isModified,
        t,
    };

    return (
        <CssVarsCtx.Provider value={ctxValue}>
            <div class="css-vars-demo">
                <style>{`
                    .css-vars-demo { border-radius: 8px; overflow: hidden; }
                    .css-vars-demo .demo-header { display: flex; justify-content: flex-end; gap: 8px; padding: 8px 12px; }
                    .css-vars-demo .reset-btn, .css-vars-demo .copy-btn { padding: 3px 12px; border: 1px solid var(--vp-c-divider); border-radius: 4px; background: var(--vp-button-alt-bg); color: var(--vp-button-alt-text); cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; }
                    .css-vars-demo .reset-btn:hover, .css-vars-demo .copy-btn:hover { background: var(--vp-button-alt-hover-bg); color: var(--vp-button-alt-hover-text); border-color: var(--vp-c-divider); }
                    .css-vars-demo .control-cell { display: flex; align-items: center; justify-content: flex-end; gap: 4px; }
                    .css-vars-demo .number-input { width: 50px; height: 24px; padding: 2px 6px; border: 1px solid var(--border-color, #e8e8f4); border-radius: 3px; font-size: 12px; font-family: 'Courier New', monospace; text-align: right; -moz-appearance: textfield; }
                    .css-vars-demo .number-input::-webkit-outer-spin-button, .css-vars-demo .number-input::-webkit-inner-spin-button { -webkit-appearance: inner-spin-button; margin: 0; }
                    .css-vars-demo .number-input:focus { outline: none; border-color: var(--vp-c-brand); }
                    .css-vars-demo .unit-label { font-size: 12px; color: var(--vp-c-text-2); font-family: 'Courier New', monospace; }
                    .css-vars-demo .color-input { width: 60px; height: 24px; cursor: pointer; }
                    .css-vars-demo .text-input { width: 100%; height: 24px; padding: 2px 6px; border: 1px solid var(--border-color, #e8e8f4); border-radius: 3px; font-size: 12px; font-family: 'Courier New', monospace; text-align: right; }
                    .css-vars-demo .text-input:focus { outline: none; border-color: var(--vp-c-brand); }
                    .css-vars-demo .row-reset-btn { width: 24px; height: 24px; padding: 0; border: 1px solid var(--border-color, #e8e8f4); border-radius: 3px; background: transparent; color: var(--vp-c-text-2); cursor: pointer; font-size: 14px; line-height: 1; transition: all 0.2s; }
                    .css-vars-demo .row-reset-btn:hover { background: var(--vp-button-alt-hover-bg); color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
                `}</style>
                <div class="demo-header">
                    <button class="copy-btn" onClick={copyModifiedStyles}>
                        {copyMessage() || t('cssVars.copyModified')}
                    </button>
                </div>
                <StkTable
                    rowKey="key"
                    class="control-table"
                    style={{ height: '600px', ...tableStyle() } as any}
                    virtual
                    stripe
                    bordered
                    cellActive
                    cellHover
                    scrollbar
                    treeConfig={{ defaultExpandAll: true }}
                    columns={controlColumns}
                    dataSource={varList}
                />
            </div>
        </CssVarsCtx.Provider>
    );
}
