import { createSignal, onMount, onCleanup } from 'solid-js';
import mockjs from 'mockjs';
import StkTable from '../../StkTable';
import type { StkTableColumn, Order, SortConfig, SortState } from '../../../src/StkTable/index';
import { insertToOrderedArray, tableSort } from '../../../src/StkTable/index';
import CheckItem from '../../components/CheckItem';
import RadioGroup from '../../components/RadioGroup';
import RangeInput from '../../components/RangeInput';
import { useI18n } from '../../hooks/useI18n/index';
import { columns as columnsRaw } from './columns';
import { emitter } from './event';
import { mockData } from './mockData';
import type { DataType } from './types';

const { Random } = mockjs;

const RATING_OPTIONS = ['AAA', 'AA+', 'AA-', 'AA', 'B+', 'B'];
const CODE_BASE = 10_000_000;
const createData = (i: number) => {
    return {
        code: CODE_BASE + i,
        bestBuyVol: Random.integer(1, 6) * 1000,
        bestSellVol: Random.integer(1, 6) * 1000,
        source: Random.integer(1, 6),
        lastPrice: (Math.random() * 15 + 5).toFixed(4),
        cbOfrBp: (Math.random() * 10).toFixed(4),
        bestBuyPrice: (Math.random() * 10).toFixed(4),
        bestSellPrice: (Math.random() * 10).toFixed(4),
        orgDebtRating: RATING_OPTIONS[Math.floor(Math.random() * RATING_OPTIONS.length)],
    };
};

export default function HugeData() {
    const { t, isZH } = useI18n();
    let stkTableRef: any;

    const sortConfig: SortConfig<DataType> = {
        defaultSort: {
            dataIndex: 'bestTime' as keyof DataType,
            order: 'desc' as Order,
            sortType: 'string' as 'string' | 'number' | undefined,
        },
    };

    const currentSort: SortState<DataType> = {
        dataIndex: 'bestTime',
        order: 'desc',
        sortType: 'string',
    };

    // ---- render state ----
    const [dataSize, setDataSize] = createSignal(50000);
    const [rowByRow, setRowByRow] = createSignal(false);
    const [optimizeDragScroll, setOptimizeDragScroll] = createSignal<'scrollbar' | undefined>();
    const [translateZ, setTranslateZ] = createSignal(false);
    const [updateFreq, setUpdateFreq] = createSignal(1000);
    const [scrollbar, setScrollbar] = createSignal(true);
    const [areaSelection, setAreaSelection] = createSignal(true);
    const [experimentalScrollY, setExperimentalScrollY] = createSignal(false);
    const [showFooter, setShowFooter] = createSignal(false);
    const [rowSpanOn, setRowSpanOn] = createSignal(false);
    const [colSpanOn, setColSpanOn] = createSignal(false);
    const [isRunning, setIsRunning] = createSignal(false);
    const [columns, setColumns] = createSignal<StkTableColumn<DataType>[]>(columnsRaw(t));
    const [dataSource, setDataSource] = createSignal<DataType[]>([]);
    const [footerData, setFooterData] = createSignal<Record<string, any>[]>([]);

    let timeoutId = 0;

    // computed once with the initial language
    const mockDataResult = mockData(isZH);

    function commitDataSource(newArr: DataType[]) {
        setDataSource(newArr);
    }

    function calculateFootData() {
        const ds = dataSource();
        if (ds.length === 0 || !showFooter()) {
            setFooterData([]);
            return;
        }
        const totals: Record<string, any> = {};
        const numericFields = ['bestBuyVol', 'bestSellVol', 'lastPrice', 'cbOfrBp', 'bestBuyPrice', 'bestSellPrice'];
        numericFields.forEach(field => {
            const sum = ds.reduce((acc, row) => {
                const value = parseFloat(row[field as keyof DataType] as string) || 0;
                return acc + value;
            }, 0);
            totals[field] = sum.toFixed(2);
        });
        totals.seq = t('Summary');
        totals.bestTime = `${t('Total')} ${ds.length} ${t('records')}`;
        setFooterData([totals]);
    }

    function initDataSource() {
        const curDate = new Date();
        const curHour = curDate.getHours();
        const curMinute = curDate.getMinutes();
        const dataSourceTemp = Array.from({ length: dataSize() }).map((_, index) => {
            const data = Object.assign({}, mockDataResult, createData(index)) as any;
            data.bestTime =
                String(Random.integer(0, curHour)).padStart(2, '0') +
                ':' +
                String(Random.integer(0, Math.max(curMinute - 1, 0))).padStart(2, '0') +
                ':' +
                String(Random.integer(0, 59)).padStart(2, '0') +
                '.' +
                String(Random.integer(0, 999)).padStart(3, '0');
            return data;
        });

        const sorted = tableSort({ dataIndex: 'bestTime', sorter: true }, 'desc', dataSourceTemp, sortConfig);
        commitDataSource(sorted);
        calculateFootData();
    }

    function highlightRow(row: DataType) {
        setTimeout(() => {
            const key = row.code;
            stkTableRef?.setHighlightDimRow([key]);
        }, 0);
    }

    function simulateUpdateData(): void {
        timeoutId = window.setTimeout(() => {
            simulateUpdateData();
            const curDate = new Date();
            const curHour = curDate.getHours();
            const curMinute = curDate.getMinutes();
            const curSeconds = curDate.getSeconds();
            const curMilliseconds = curDate.getMilliseconds();
            const newData: any = {
                ...mockDataResult,
                ...createData(Random.integer(0, dataSource().length - 1)),
                bestTime:
                    String(curHour).padStart(2, '0') +
                    ':' +
                    String(curMinute).padStart(2, '0') +
                    ':' +
                    String(curSeconds).padStart(2, '0') +
                    '.' +
                    String(curMilliseconds).padStart(3, '0'),
            };
            const rowIndex = dataSource().findIndex(item => item.code === newData.code);
            if (rowIndex === -1) return;
            const ds = dataSource().slice();
            ds.splice(rowIndex, 1); // delete old data
            // binary insert
            const newArr = insertToOrderedArray(currentSort, newData, ds);
            commitDataSource(newArr);
            highlightRow(newData);
            calculateFootData();
        }, updateFreq());
    }

    function stopSimulateUpdateData() {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = 0;
        }
        setIsRunning(false);
    }

    function handleToggleExpand(row: DataType) {
        const ds = dataSource();
        const expand = !row._isExpand;
        const rowIndex = ds.findIndex(item => item.code === row.code);
        if (rowIndex === -1) {
            console.error('can not expand:', row);
            return;
        }
        const newDs = ds.slice();
        if (expand) {
            const insertRows: DataType[] = [...new Array(6).fill(null)].map((_, index) => {
                return {
                    _isChildren: true, // mark as child node
                    code: Random.guid(),
                    source: index + 1,
                    bestBuyVol: Random.integer(1, 6) * 1000,
                    bestSellVol: Random.integer(1, 6) * 1000,
                    lastPrice: Random.float(1, 20, 4, 4),
                    cbOfrBp: Random.float(0, 10, 4, 4),
                    bestBuyPrice: Random.float(0, 10, 4, 4),
                    bestSellPrice: Random.float(0, 10, 4, 4),
                } as any;
            });
            newDs.splice(rowIndex + 1, 0, ...insertRows);
        } else {
            newDs.splice(rowIndex + 1, 6);
        }
        newDs[rowIndex] = { ...newDs[rowIndex], _isExpand: expand }; // trigger row update
        commitDataSource(newDs); // trigger table update
        calculateFootData();
    }

    // register emitter
    onMount(() => {
        emitter.on('toggle-expand', handleToggleExpand);
    });
    onCleanup(() => {
        emitter.off('toggle-expand', handleToggleExpand);
    });

    // init on mount
    onMount(() => {
        initDataSource();
        simulateUpdateData();
        setIsRunning(true);
    });
    onCleanup(() => {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = 0;
        }
    });

    function handleToggleSimulate() {
        if (timeoutId) {
            stopSimulateUpdateData();
        } else {
            simulateUpdateData();
            setIsRunning(true);
        }
    }

    function handleSortChange(
        col: StkTableColumn<DataType> | null,
        order: Order,
        data: DataType[],
        sortConfigArg: SortConfig<DataType>,
    ) {
        if (col) {
            currentSort.dataIndex = col.dataIndex;
            currentSort.sortType = col.sortType;
        }
        currentSort.order = order;
        const sorted = tableSort(col ?? { dataIndex: currentSort.dataIndex }, order, data, sortConfigArg);
        commitDataSource(sorted);
        calculateFootData();
    }

    function handleDataSizeChange(e: InputEvent) {
        const value = Number((e.currentTarget as HTMLInputElement).value);
        if (isNaN(value)) return;
        setDataSize(value);
        initDataSource();
    }

    function handleDataSizeRadio(value: number | undefined) {
        if (value === undefined) return;
        setDataSize(value);
        initDataSource();
    }

    function handleOptimizeScrollChange(v: boolean) {
        if (v) {
            setOptimizeDragScroll('scrollbar');
            setRowByRow(false);
        } else {
            setOptimizeDragScroll(void 0);
        }
    }

    function handleRowSpan(v: boolean) {
        setRowSpanOn(v);
        setColumns(prev =>
            prev.map(col => {
                if (col.dataIndex !== 'code') return col;
                return {
                    ...col,
                    mergeCells: v ? ({ rowIndex }: any) => ({ rowspan: rowIndex % 2 ? 1 : 2 }) : void 0,
                };
            }),
        );
    }

    function handleColSpan(v: boolean) {
        setColSpanOn(v);
        setColumns(prev =>
            prev.map(col => {
                if (col.dataIndex !== 'bondAbbreviation') return col;
                return {
                    ...col,
                    mergeCells: v ? ({ rowIndex }: any) => ({ colspan: rowIndex % 2 ? 1 : 2 }) : void 0,
                };
            }),
        );
    }

    function handleShowFooterChange(v: boolean) {
        setShowFooter(v);
        calculateFootData();
    }

    return (
        <>
            <div class="row">
                <RadioGroup
                    value={dataSize()}
                    text={t('dataAmount')}
                    options={[
                        { label: '1k', value: 1000 },
                        { label: '5k', value: 5000 },
                        { label: isZH ? '1w' : '10k', value: 10000 },
                        { label: isZH ? '5w' : '50k', value: 50000 },
                        { label: isZH ? '10w' : '100k', value: 100_000 },
                        { label: isZH ? '50w' : '500k', value: 500_000 },
                        { label: isZH ? '100w' : '1mln', value: 1_000_000 },
                    ]}
                    onChange={handleDataSizeRadio}
                ></RadioGroup>
                <input
                    class="input"
                    value={dataSize()}
                    type="number"
                    style={{ width: '70px', 'margin-left': '6px' }}
                    onInput={handleDataSizeChange}
                />
            </div>
            <button class="btn" onClick={handleToggleSimulate}>
                {t('simulateUpdateData')}({isRunning() ? t('stop') : t('start')})
            </button>
            <label style={{ 'margin-left': '16px' }}>
                <RangeInput value={updateFreq()} onChange={setUpdateFreq} min={16} max={1000} label={t('freq')} suffix="ms" />
            </label>
            <CheckItem checked={rowByRow()} onChange={setRowByRow} text={t('rowByRowScroll')} />
            <CheckItem checked={translateZ()} onChange={setTranslateZ} text={t('translateZ')} />
            <CheckItem checked={optimizeDragScroll() === 'scrollbar'} text={t('optimizeDragScroll')} onChange={handleOptimizeScrollChange} />
            <CheckItem checked={rowSpanOn()} text={t('rowspanTest')} onChange={handleRowSpan} />
            <CheckItem checked={colSpanOn()} text={t('colspanTest')} onChange={handleColSpan} />
            <CheckItem checked={scrollbar()} onChange={setScrollbar} text="scrollbar" />
            <CheckItem checked={areaSelection()} onChange={setAreaSelection} text="areaSelection" />
            <CheckItem checked={experimentalScrollY()} onChange={setExperimentalScrollY} text="experimentalScrollY" />
            <CheckItem checked={showFooter()} text={t('showFooter')} onChange={handleShowFooterChange} />
            <StkTable
                ref={(i: any) => (stkTableRef = i)}
                columns={columns()}
                class={translateZ() ? 'stack' : ''}
                style={{ height: '700px' }}
                rowKey="code"
                noDataFull
                fixedColShadow
                virtual
                virtualX
                showOverflow
                showHeaderOverflow
                stripe
                colResizable
                sortRemote
                areaSelection={{
                    get enabled() {
                        return areaSelection();
                    },
                    get keyboard() {
                        return areaSelection();
                    },
                }}
                scrollbar={scrollbar()}
                experimental={{
                    get scrollY() {
                        return experimentalScrollY();
                    },
                }}
                scrollRowByRow={rowByRow() || optimizeDragScroll()}
                sortConfig={sortConfig}
                emptyCellText={({ row }: any) => (row._isChildren ? '' : '--')}
                rowClassName={(row: DataType) => (row._isChildren ? 'child-row' : '')}
                dataSource={dataSource()}
                footerData={showFooter() ? (footerData() as any) : undefined}
                onSortChange={handleSortChange}
            ></StkTable>
            <style>{`
                .row { display: flex; }
                .stack .stk-tbody-main tr { transform: translateZ(0); }
                .blue-cell { color: #4f8df4; }
                .red-cell { color: #ff2b48; }
                .green-cell { color: #2fc87b; }
                .source-cell {
                    border-radius: 4px;
                    background-color: #777;
                    display: inline-block;
                    padding: 0 8px;
                    font-size: 14px;
                    line-height: 20px;
                }
                .source-cell.source-1 { background-color: rgba(39, 69, 159, 0.4); }
                .source-cell.source-2 { background-color: rgba(171, 99, 0, 0.4); }
                .source-cell.source-3 { background-color: rgba(0, 119, 143, 0.4); }
                .source-cell.source-4 { background-color: rgba(171, 28, 0, 0.4); }
                .source-cell.source-5 { background-color: rgba(199, 166, 0, 0.4); }
                .source-cell.source-6 { background-color: rgba(113, 23, 204, 0.4); }
                .stk-table { --child-bgc: #f6f6f6; }
                .stk-table.dark { --child-bgc: #303039; }
                .stk-table.stripe.vt-on .stk-tbody-main .child-row { background-color: var(--child-bgc); }
                .stk-table.stripe.vt-on .stk-tbody-main .child-row.active { background-color: var(--tr-active-bgc); }
                .stk-table.stripe.vt-on .stk-tbody-main .child-row:hover { background-color: var(--tr-hover-bgc); }
            `}</style>
        </>
    );
}
