/**
 * StkTable SolidJS 版本
 * @author japlus (ported from stk-table-vue)
 */
import {
    createSignal,
    createMemo,
    createEffect,
    on,
    onMount,
    mergeProps,
    Show,
    For,
    type JSX,
    type Accessor,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import DragHandle from './components/DragHandle';
import SortIcon from './components/SortIcon';
import TreeNodeCell from './components/TreeNodeCell';
import TriangleIcon from './components/TriangleIcon';
import { StkTableContext } from './context';
import {
    CELL_KEY_SEPARATE,
    DEFAULT_ROW_ACTIVE_CONFIG,
    DEFAULT_ROW_HEIGHT,
    DEFAULT_SMOOTH_SCROLL,
    DEFAULT_SORT_CONFIG,
    IS_LEGACY_MODE,
} from './const';
import type { FilterStatus } from './custom-cells/FilterCell/types';
import { useAreaSelectionName } from './features';
import { ON_DEMAND_FEATURE } from './registerFeature';
import {
    AreaSelectionConfig,
    AreaSelectionRange,
    AutoRowHeightConfig,
    ColResizableConfig,
    DragRowConfig,
    ExpandConfig,
    ExperimentalConfig,
    FooterConfig,
    HeaderDragConfig,
    HighlightConfig,
    Order,
    PrivateRowDT,
    PrivateStkTableColumn,
    RowActiveOption,
    SeqConfig,
    SortConfig,
    StkTableColumn,
    TagType,
    TreeConfig,
    UniqKey,
    UniqKeyProp,
} from './types/index';
import { useAutoResize } from './hooks/useAutoResize';
import { useColResize } from './hooks/useColResize';
import { useFixedCol } from './hooks/useFixedCol';
import { useFixedStyle } from './hooks/useFixedStyle';
import { useGetFixedColPosition } from './hooks/useGetFixedColPosition';
import { useHighlight } from './hooks/useHighlight';
import { useKeyboardArrowScroll } from './hooks/useKeyboardArrowScroll';
import { useMaxRowSpan } from './hooks/useMaxRowSpan';
import { useMergeCells } from './hooks/useMergeCells';
import { useRowExpand } from './hooks/useRowExpand';
import { useScrollbar, type ScrollbarOptions } from './hooks/useScrollbar';
import { useScrollRowByRow } from './hooks/useScrollRowByRow';
import { useSorter } from './hooks/useSorter';
import { useTableColumns } from './hooks/useTableColumns';
import { useThDrag } from './hooks/useThDrag';
import { useTrDrag } from './hooks/useTrDrag';
import { useTree } from './hooks/useTree';
import { useVirtualScroll } from './hooks/useVirtualScroll';
import { useWheeling } from './hooks/useWheeling';
import { createStkTableId, getCalculatedColWidth } from './utils/constRefUtils';
import { getClosestColKey, getClosestTd, getClosestTr, getClosestTrIndex, rafThrottle, transformWidthToStr } from './utils/index';

/** Generic stands for DataType */
type DT = any & PrivateRowDT;

/** SolidJS 版本的 emits 映射为 callback props */
export type StkTableEmits = {
    onSortChange?: (col: StkTableColumn<DT> | null, order: Order, data: DT[], sortConfig: SortConfig<DT>) => void;
    onRowClick?: (ev: MouseEvent, row: DT, data: { rowIndex: number }) => void;
    onCurrentChange?: (ev: MouseEvent | null, row: DT | undefined, data: { select: boolean }) => void;
    onCellSelected?: (ev: MouseEvent | null, data: { select: boolean; row: DT | undefined; col: StkTableColumn<DT> | undefined }) => void;
    onRowDblclick?: (ev: MouseEvent, row: DT, data: { rowIndex: number }) => void;
    onHeaderRowMenu?: (ev: MouseEvent) => void;
    onRowMenu?: (ev: MouseEvent, row: DT, data: { rowIndex: number }) => void;
    onCellClick?: (ev: MouseEvent, row: DT, col: StkTableColumn<DT>, data: { rowIndex: number }) => void;
    onCellMouseenter?: (ev: MouseEvent, row: DT, col: StkTableColumn<DT>) => void;
    onCellMouseleave?: (ev: MouseEvent, row: DT, col: StkTableColumn<DT>) => void;
    onCellMouseover?: (ev: MouseEvent, row: DT, col: StkTableColumn<DT>) => void;
    onCellMousedown?: (ev: MouseEvent, row: DT, col: StkTableColumn<DT>, data: { rowIndex: number }) => void;
    onHeaderCellClick?: (ev: MouseEvent, col: StkTableColumn<DT>) => void;
    onScroll?: (ev: Event, data: { startIndex: number; endIndex: number }) => void;
    onScrollX?: (ev: Event) => void;
    onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
    onThDragStart?: (dragStartKey: string) => void;
    onThDrop?: (targetColKey: string) => void;
    onRowOrderChange?: (dragStartKey: string, targetRowKey: string) => void;
    onColResize?: (col: StkTableColumn<DT>) => void;
    onToggleRowExpand?: (data: { expanded: boolean; row: DT; col: StkTableColumn<DT> | null }) => void;
    onToggleTreeExpand?: (data: { expanded: boolean; row: DT; col: StkTableColumn<DT> | null }) => void;
    onAreaSelectionChange?: (ranges: AreaSelectionRange[]) => void;
    onFilterChange?: (status: Record<UniqKey, FilterStatus>) => void;
    'onUpdate:columns'?: (cols: StkTableColumn<DT>[]) => void;
};

export type StkTableProps = StkTableEmits & {
    /** 根元素类名（对齐 Vue attribute fallthrough） */
    class?: string;
    /** 根元素样式（对齐 Vue attribute fallthrough） */
    style?: string | Record<string, string | number | undefined>;
    /** 表格宽度*/
    width?: string;
    /** 最小表格宽度 @deprecated*/
    minWidth?: string;
    /** 表格最大宽度 @deprecated*/
    maxWidth?: string;
    /** 斑马线条纹 */
    stripe?: boolean;
    /** 是否使用 table-layout:fixed(低版本浏览器需要设置table) */
    fixedMode?: boolean;
    /** 是否隐藏表头 */
    headless?: boolean;
    /** 主题，亮、暗 */
    theme?: 'light' | 'dark';
    rowHeight?: number;
    autoRowHeight?: boolean | AutoRowHeightConfig<DT>;
    rowHover?: boolean;
    rowActive?: boolean | RowActiveOption<DT>;
    /** @deprecated */
    rowCurrentRevokable?: boolean;
    headerRowHeight?: number | string;
    footerRowHeight?: number | string;
    virtual?: boolean;
    virtualX?: boolean;
    columns?: StkTableColumn<DT>[];
    dataSource?: DT[];
    rowKey?: UniqKeyProp;
    colKey?: UniqKeyProp;
    emptyCellText?: string | ((option: { row: DT; col: StkTableColumn<DT> }) => string);
    noDataFull?: boolean;
    showNoData?: boolean;
    sortRemote?: boolean;
    showHeaderOverflow?: boolean;
    showOverflow?: boolean;
    showTrHoverClass?: boolean;
    cellHover?: boolean;
    cellActive?: boolean;
    selectedCellRevokable?: boolean;
    areaSelection?: boolean | AreaSelectionConfig;
    headerDrag?: boolean | HeaderDragConfig<DT>;
    rowClassName?: (row: DT, i: number) => string | undefined;
    colResizable?: boolean | ColResizableConfig<DT>;
    colMinWidth?: number;
    bordered?: boolean | 'h' | 'v' | 'body-v' | 'body-h';
    autoResize?: boolean | (() => void);
    fixedColShadow?: boolean;
    optimizeVue2Scroll?: boolean;
    sortConfig?: SortConfig<DT>;
    hideHeaderTitle?: boolean | string[];
    highlightConfig?: HighlightConfig;
    seqConfig?: SeqConfig;
    expandConfig?: ExpandConfig;
    dragRowConfig?: DragRowConfig;
    treeConfig?: TreeConfig;
    cellFixedMode?: 'sticky' | 'relative';
    smoothScroll?: boolean;
    scrollRowByRow?: boolean | 'scrollbar';
    scrollbar?: boolean | ScrollbarOptions;
    experimental?: ExperimentalConfig;
    footerData?: DT[];
    footerConfig?: FooterConfig;
    /** 实例引用，用于获取暴露的方法 */
    ref?: (instance: StkTableInstance) => void;
    /** 表头插槽 */
    tableHeaderSlot?: (col: StkTableColumn<DT>) => JSX.Element;
    /** 空状态插槽 */
    emptySlot?: JSX.Element;
    /** 展开行插槽 */
    expandSlot?: (row: DT, col: StkTableColumn<DT>) => JSX.Element;
    /** 自定义底部插槽 */
    customBottomSlot?: JSX.Element;
};

/** 组件实例暴露的方法 */
export type StkTableInstance = {
    initVirtualScroll: (height?: number) => void;
    initVirtualScrollX: () => void;
    initVirtualScrollY: (height?: number) => void;
    setCurrentRow: (rowKeyOrRow: string | undefined | DT, option?: { silent?: boolean; deep?: boolean }) => void;
    setSelectedCell: (row?: DT, col?: StkTableColumn<DT>, option?: { silent?: boolean }) => void;
    setHighlightDimCell: (rowKeyValue: UniqKey, colKeyValue: string, option?: any) => void;
    setHighlightDimRow: (rowKeyValues: UniqKey[], option?: any) => void;
    sortCol: Accessor<UniqKey | null>;
    sortStates: Accessor<any[]>;
    getSortColumns: () => any[];
    setSorter: (...args: any[]) => void;
    resetSorter: () => void;
    scrollTo: (top?: number | null, left?: number | null) => void;
    getTableData: () => DT[];
    getRowIndex: (row: DT) => number;
    getColumnIndex: (column: PrivateStkTableColumn<DT>) => number;
    setRowExpand: (...args: any[]) => void;
    setAutoHeight: (rowKey: UniqKey, height?: number | null) => void;
    clearAllAutoHeight: () => void;
    setTreeExpand: (...args: any[]) => void;
    getSelectedArea: () => any;
    setAreaSelection: (...args: any[]) => any;
    clearSelectedArea: () => void;
    copySelectedArea: () => string;
    setFilter: (status: Record<UniqKey, FilterStatus> | null, option?: { remote?: boolean; silent?: boolean }) => void;
};

const defaultProps = {
    width: '',
    fixedMode: false,
    stripe: false,
    minWidth: '',
    maxWidth: '',
    headless: false,
    theme: 'light' as const,
    rowHeight: DEFAULT_ROW_HEIGHT,
    autoRowHeight: false as boolean | AutoRowHeightConfig<DT>,
    footerData: [] as DT[],
    rowHover: true,
    rowActive: DEFAULT_ROW_ACTIVE_CONFIG as boolean | RowActiveOption<DT>,
    rowCurrentRevokable: true,
    headerRowHeight: DEFAULT_ROW_HEIGHT,
    footerRowHeight: DEFAULT_ROW_HEIGHT,
    virtual: false,
    virtualX: false,
    columns: [] as StkTableColumn<DT>[],
    dataSource: [] as DT[],
    rowKey: '' as UniqKeyProp,
    colKey: void 0 as UniqKeyProp | undefined,
    emptyCellText: '--',
    noDataFull: false,
    showNoData: true,
    sortRemote: false,
    showHeaderOverflow: false,
    showOverflow: false,
    showTrHoverClass: false,
    cellHover: false,
    cellActive: false,
    selectedCellRevokable: true,
    areaSelection: false as boolean | AreaSelectionConfig,
    headerDrag: false as boolean | HeaderDragConfig<DT>,
    rowClassName: () => '' as string | undefined,
    colResizable: false as boolean | ColResizableConfig<DT>,
    colMinWidth: 10,
    bordered: true as boolean | 'h' | 'v' | 'body-v' | 'body-h',
    autoResize: true as boolean | (() => void),
    fixedColShadow: false,
    optimizeVue2Scroll: false,
    sortConfig: DEFAULT_SORT_CONFIG as SortConfig<DT>,
    hideHeaderTitle: false as boolean | string[],
    highlightConfig: {} as HighlightConfig,
    seqConfig: {} as SeqConfig,
    expandConfig: {} as ExpandConfig,
    dragRowConfig: {} as DragRowConfig,
    treeConfig: {} as TreeConfig,
    cellFixedMode: 'sticky' as const,
    smoothScroll: DEFAULT_SMOOTH_SCROLL,
    scrollRowByRow: false as boolean | 'scrollbar',
    scrollbar: false as boolean | ScrollbarOptions,
    experimental: {} as ExperimentalConfig,
    footerConfig: { position: 'bottom' } as FooterConfig,
};

export default function StkTable(rawProps: StkTableProps) {
    // 使用 mergeProps 保持 props  getter 惰性（响应式）；若用 { ...defaultProps, ...rawProps } 展开会立即求值 getter 导致 props 失去响应式
    const props = mergeProps(defaultProps, rawProps) as StkTableProps;

    /** generate table instance id */
    const stkTableId = createStkTableId();

    // ---- DOM refs ----
    const [tableContainerAccessor, setTableContainerAccessor] = createSignal<HTMLDivElement | undefined>();
    const [colResizeIndicatorAccessor, setColResizeIndicatorAccessor] = createSignal<HTMLDivElement | undefined>();
    /** trRef: 实时查询 tbody 中的 tr 元素，用于 autoRowHeight 测量 */
    const trListAccessor = (): HTMLTableRowElement[] | undefined => {
        const tbody = tableContainerAccessor()?.querySelector('tbody.stk-tbody-main');
        if (!tbody) return undefined;
        return Array.from(tbody.querySelectorAll('tr[data-row-key]')) as HTMLTableRowElement[];
    };

    /** 是否使用 relative 固定头和列 */
    const [isRelativeMode] = createSignal(IS_LEGACY_MODE ? true : props.cellFixedMode === 'relative');

    /** 表格底部是否吸附在顶部 */
    const isFooterTop = createMemo(() => props.footerConfig?.position === 'top');

    /** 表格底部标签名：顶部吸附用 tbody，底部吸附用 tfoot */
    const footerTagName = createMemo(() => (isFooterTop() ? 'tbody' : 'tfoot'));

    /** 当前选中的一行 */
    const [currentRow, setCurrentRowState] = createSignal<DT | undefined>();
    /** 保存当前选中行的key */
    const [currentRowKey, setCurrentRowKey] = createSignal<UniqKey | undefined>();
    /** 当前选中的单元格key  */
    const [currentSelectedCellKey, setCurrentSelectedCellKey] = createSignal<string | undefined>();
    /** 当前hover行 */
    let currentHoverRow: DT | null = null;
    /** 当前hover的行的key */
    const [currentHoverRowKey, setCurrentHoverRowKey] = createSignal<UniqKey | null>(null);

    const [tableHeaders, tableHeadersForCalc, dealColumns] = useTableColumns<DT>(() => props.virtualX, isRelativeMode);

    const [filterStatus, setFilterStatus] = createSignal<Record<UniqKey, FilterStatus>>({});

    /** 最后一行的tableHeaders.内容是 props.columns 的引用集合  */
    const tableHeaderLast = createMemo(() => tableHeadersForCalc().slice(-1)[0] || []);

    const isTreeData = createMemo(() => {
        return props.columns.some(col => col.type === 'tree-node');
    });

    const rowActiveProp = createMemo<Required<RowActiveOption<DT>>>(() => {
        const { rowActive } = props;
        if (typeof rowActive === 'boolean') {
            return {
                ...DEFAULT_ROW_ACTIVE_CONFIG,
                enabled: rowActive ?? true,
                revokable: Boolean(props.rowCurrentRevokable),
            };
        } else {
            return { ...DEFAULT_ROW_ACTIVE_CONFIG, ...rowActive };
        }
    });

    const [dataSourceCopy, setDataSourceCopy] = createSignal<DT[]>([]);

    /** 行数据版本号：行内字段被修改后 bump，使依赖它的 custom-cell 计算重算（对齐 Vue 深层响应式） */
    const [rowVersion, setRowVersion] = createSignal(0);
    function bumpRowVersion() {
        setRowVersion(v => v + 1);
    }

    const rowKeyGenComputed = createMemo(() => {
        const { rowKey } = props;
        if (typeof rowKey === 'function') {
            return (row: DT) => (rowKey as (row: DT) => string)(row);
        } else {
            return (row: DT) => row[rowKey];
        }
    });

    const colKeyGen = createMemo<(col: StkTableColumn<DT>) => string>(() => {
        const { colKey } = props;
        if (colKey === void 0) {
            return col => col.key || col.dataIndex;
        } else if (typeof colKey === 'function') {
            return col => (colKey as (col: StkTableColumn<DT>) => string)(col);
        } else {
            return col => (col as any)[colKey];
        }
    });

    const getEmptyCellText = createMemo(() => {
        const { emptyCellText } = props;
        if (typeof emptyCellText === 'string') {
            return () => emptyCellText;
        } else {
            return (col: StkTableColumn<DT>, row: DT) => emptyCellText({ row, col });
        }
    });

    const rowKeyGenCache = new WeakMap();

    /** tr key */
    function rowKeyGen(row: DT | null | undefined) {
        if (!row) return row;

        let key = rowKeyGenCache.get(row);
        if (key !== undefined) return key;

        // Check for cached key in row object
        const cachedRowKey = (row as PrivateRowDT).__R_K__;
        if (cachedRowKey !== undefined) {
            rowKeyGenCache.set(row, cachedRowKey);
            return cachedRowKey;
        }

        key = rowKeyGenComputed()(row);

        if (key === void 0) {
            // key为undefined时，不应该高亮行。因此重新生成key
            key = Math.random().toString(36).slice(2);
        }
        rowKeyGenCache.set(row, key);
        return key;
    }

    /** td key */
    function cellKeyGen(row: DT | null | undefined, col: StkTableColumn<DT>) {
        return rowKeyGen(row) + CELL_KEY_SEPARATE + colKeyGen()(col);
    }

    // 使用 useSorter hook 管理排序逻辑
    const [sortStates, sortCol, onColumnSort, setSorter, resetSorter, getSortColumns, dealDefaultSorter, getColumnSortState, sortData] =
        useSorter<DT>(props, props, colKeyGen, tableHeaderLast, dataSourceCopy, initDataSource);

    const [isSRBRActive] = useScrollRowByRow(props, tableContainerAccessor);

    const [onThDragStart, onThDragOver, onThDrop, isHeaderDraggable] = useThDrag(props, props, colKeyGen);

    const [onTrDragStart, onTrDragEnter, onTrDragOver, onTrDrop, onTrDragEnd] = useTrDrag(props, props, dataSourceCopy, setDataSourceCopy);

    const [maxRowSpan, updateMaxRowSpan] = useMaxRowSpan(props, tableHeaderLast, rowKeyGen, dataSourceCopy);

    function scrollbarOptionsValue(): Required<ScrollbarOptions> {
        return {
            enabled: true,
            minHeight: 20,
            minWidth: 20,
            width: 8,
            height: 8,
            ...(typeof props.scrollbar === 'boolean' ? { enabled: props.scrollbar } : props.scrollbar),
        };
    }
    const scrollbarOptions = createMemo(scrollbarOptionsValue);

    const isExperimentalScrollY = createMemo(() => {
        if (scrollbarOptions()?.enabled && props.scrollRowByRow) {
            return true;
        }
        return props.experimental?.scrollY;
    });

    const [
        virtualScroll,
        virtualScrollX,
        virtual_on,
        virtual_dataSourcePart,
        virtual_offsetBottom,
        virtualX_on,
        virtualX_offsetRight,
        tableHeaderHeight,
        initVirtualScroll,
        initVirtualScrollY,
        initVirtualScrollX,
        updateVirtualScrollY,
        updateVirtualScrollX,
        setAutoHeight,
        clearAllAutoHeight,
        clearColWidthCache,
        virtualX_tableHeaders,
        expandRowColspan,
        theadVirtualX,
        virtualX_columnPart,
    ] = useVirtualScroll(
        props,
        tableContainerAccessor,
        trListAccessor,
        dataSourceCopy,
        tableHeaderLast,
        tableHeaders,
        rowKeyGen,
        maxRowSpan,
        scrollbarOptions,
        isExperimentalScrollY,
    );

    /** requestAnimationFrame throttled version of updateVirtualScrollY for smoother wheel scrolling */
    const rafUpdateVirtualScrollYForWheel = rafThrottle(updateVirtualScrollY);

    const [scrollbar, showScrollbar, onVerticalScrollbarMouseDown, onHorizontalScrollbarMouseDown, updateCustomScrollbar] = useScrollbar(
        props,
        tableContainerAccessor as any,
        virtualScroll,
        virtualScrollX,
        updateVirtualScrollY,
        scrollbarOptions,
        isExperimentalScrollY,
    );

    const [hiddenCellMap, mergeCellsWrapper, hoverMergedCells, updateHoverMergedCells, activeMergedCells, updateActiveMergedCells] =
        useMergeCells(rowActiveProp, tableHeaderLast, rowKeyGen, colKeyGen, virtual_dataSourcePart);

    const getFixedColPosition = useGetFixedColPosition(tableHeadersForCalc, colKeyGen);

    const getFixedStyle = useFixedStyle<DT>(props, isRelativeMode, getFixedColPosition, virtualScroll, virtualScrollX, virtualX_on, virtualX_offsetRight);

    const [highlightSteps, setHighlightDimRow, setHighlightDimCell] = useHighlight(props, stkTableId, tableContainerAccessor as any);

    function getRowIndex(row: DT): number {
        const targetKey = rowKeyGen(row);
        return dataSourceCopy().findIndex(item => rowKeyGen(item) === targetKey);
    }

    function getColumnIndex(column: PrivateStkTableColumn<DT>): number {
        const targetKey = colKeyGen()(column);
        return tableHeaderLast().findIndex(item => colKeyGen()(item) === targetKey);
    }

    const {
        config: areaSelectionConfig,
        isSelecting: isAreaSelecting,
        onMD: onSelectionMouseDown,
        get: getSelectedArea,
        set: setAreaSelection,
        clear: clearSelectedArea,
        copy: copySelectedArea,
    } = ON_DEMAND_FEATURE[useAreaSelectionName](
        props,
        props,
        tableContainerAccessor,
        dataSourceCopy,
        tableHeaderLast,
        colKeyGen,
        cellKeyGen,
        scrollTo,
        virtualScroll,
        virtualScrollX,
        getRowIndex,
        getColumnIndex,
    );

    /** 键盘箭头滚动 */
    useKeyboardArrowScroll(tableContainerAccessor, props, scrollTo, virtualScroll, virtualScrollX, tableHeaders, virtual_on, areaSelectionConfig);

    /** 固定列处理 */
    const [fixedCols, fixedColClassMap, updateFixedShadow] = useFixedCol(
        props,
        colKeyGen,
        getFixedColPosition,
        tableHeaders,
        tableHeadersForCalc,
        tableContainerAccessor,
    );

    if (props.autoResize) {
        useAutoResize(
            tableContainerAccessor,
            () => {
                initVirtualScroll();
                // 容器宽度变化后，需重新计算固定列状态
                updateFixedShadow();
            },
            props,
            200,
        );
    }

    const [colResizeOn, isColResizing, onThResizeMouseDown] = useColResize(
        props,
        props,
        tableContainerAccessor,
        tableHeaderLast,
        colResizeIndicatorAccessor,
        colKeyGen,
        fixedCols,
        clearColWidthCache,
    );

    const [toggleExpandRow, setRowExpand] = useRowExpand(props, dataSourceCopy, setDataSourceCopy, rowKeyGen, onDataSourceChange);

    const [toggleTreeNode, setTreeExpand, flatTreeData] = useTree(props, dataSourceCopy, setDataSourceCopy, rowKeyGen, props, onDataSourceChange);

    /** style cache */
    const paddingTopStyle = createMemo(() => `height:${virtualScroll().offsetTop}px`);
    const offsetBottomStyle = createMemo(() => `height:${virtual_offsetBottom()}px`);

    /** scroll-row-by-row total-height */
    const SRBRTotalHeight = createMemo(() => {
        if (!isSRBRActive() || !props.virtual) return 0;
        return dataSourceCopy().length * virtualScroll().rowHeight + tableHeaderHeight();
    });
    const SRBRBottomHeight = createMemo(() => {
        if (!isSRBRActive() || !props.virtual) return 0;
        const { containerHeight, rowHeight } = virtualScroll();
        return (containerHeight - tableHeaderHeight()) % rowHeight;
    });
    const SRBRBottomStyle = createMemo(() => `height:${SRBRBottomHeight()}px`);

    // ---- watchers ----
    createEffect(
        on(
            () => props.columns,
            () => {
                handleDealColumns();
                updateMaxRowSpan();
                queueMicrotask(() => {
                    initVirtualScrollX();
                    updateFixedShadow();
                    updateCustomScrollbar();
                });
            },
        ),
    );

    createEffect(
        on(
            () => props.virtual,
            () => {
                queueMicrotask(initVirtualScrollY);
            },
        ),
    );

    createEffect(
        on(
            () => props.rowHeight,
            () => initVirtualScrollY(),
        ),
    );

    createEffect(
        on(
            () => props.virtualX,
            () => {
                handleDealColumns();
                queueMicrotask(() => {
                    initVirtualScrollX();
                    updateFixedShadow();
                });
            },
        ),
    );

    createEffect(
        on(
            () => props.dataSource,
            val => {
                updateDataSource(val);
            },
        ),
    );

    createEffect(
        on(
            () => props.fixedColShadow,
            () => updateFixedShadow(),
        ),
    );

    handleDealColumns();
    initDataSource();
    updateMaxRowSpan();

    onMount(() => {
        initVirtualScroll();
        updateFixedShadow();
        dealDefaultSorter();
    });

    async function onDataSourceChange() {
        await Promise.resolve();
        initVirtualScrollY();
        updateCustomScrollbar();
    }

    function initDataSource(v = props.dataSource, option?: { forceSort?: boolean }) {
        let dataSourceTemp = v.slice(); // shallow copy

        // 排序（tableSort 内部会根据 sortChildren 自动处理树形递归排序）
        if (!props.sortRemote || option?.forceSort) {
            dataSourceTemp = sortData(dataSourceTemp);
        }

        if (isTreeData()) {
            dataSourceTemp = flatTreeData(dataSourceTemp);
        }
        dataSourceTemp = filterDataSource(dataSourceTemp);
        setDataSourceCopy(dataSourceTemp);
    }

    function setFilter(
        status: Record<UniqKey, FilterStatus> | null,
        option?: {
            remote?: boolean;
            silent?: boolean;
        },
    ) {
        status = status || {};
        setFilterStatus(status);
        if (!option?.remote) {
            initDataSource();
        }
        if (!option?.silent) {
            props.onFilterChange?.(status);
        }
    }

    function filterDataSource(dataSource: DT[]) {
        const filterKeys = Object.keys(filterStatus());
        if (!filterKeys?.length) return dataSource;
        let result = dataSource;
        for (const key of filterKeys) {
            const { value, filter } = filterStatus()[key];
            if (!value?.length) continue;
            result = result.filter(row => {
                const cellValue = row[key];
                if (filter) {
                    return filter({ row, cellValue, filterValues: value });
                }
                return value.some(v => cellValue == v);
            });
        }
        return result;
    }

    /**
     * Wrapper for dealColumns to pass props.columns
     */
    function handleDealColumns() {
        dealColumns(props.columns);
    }

    function updateDataSource(val: DT[]) {
        if (!Array.isArray(val)) {
            console.warn('invalid dataSource');
            return;
        }

        let needInitVirtualScrollY = false;
        if (dataSourceCopy().length !== val.length) {
            needInitVirtualScrollY = true;
        }
        initDataSource(val);
        updateMaxRowSpan();

        // #47
        if (!val.length) {
            clearSelectedArea();
        }

        // if data length is not change, not init virtual scroll
        if (needInitVirtualScrollY) {
            queueMicrotask(() => initVirtualScrollY());
        }
        queueMicrotask(updateCustomScrollbar);
    }

    const cellStyleMap = createMemo(() => {
        const thMap = new Map();
        const tdMap = new Map();
        const tfMap = new Map();
        const { virtualX } = props;
        const headers = tableHeaders();
        const colKeyGenValue = colKeyGen();

        for (let depth = 0, depthLen = headers.length; depth < depthLen; depth++) {
            const cols = headers[depth];
            for (let i = 0, colsLen = cols.length; i < colsLen; i++) {
                const col = cols[i];
                const width = virtualX ? getCalculatedColWidth(col) + 'px' : transformWidthToStr(col.width);
                const minWidthStr = transformWidthToStr(col.minWidth);
                const maxWidthStr = transformWidthToStr(col.maxWidth);
                // en: Use string instead of object to reduce patchStyle overhead
                let styleStr = '';
                if (width) styleStr += `--cw:${width}`;
                if (minWidthStr) styleStr += `;min-width:${minWidthStr}`;
                if (maxWidthStr) styleStr += `;max-width:${maxWidthStr}`;
                const colKey = colKeyGenValue(col);
                thMap.set(colKey, styleStr + ';' + getFixedStyle(TagType.TH, col, depth));
                tdMap.set(colKey, styleStr + ';' + getFixedStyle(TagType.TD, col, depth));
                tfMap.set(colKey, 'position:sticky;' + styleStr + ';' + getFixedStyle(TagType.TF, col, depth));
            }
        }
        return {
            [TagType.TH]: thMap,
            [TagType.TD]: tdMap,
            [TagType.TF]: tfMap,
        };
    });

    /**
     * fixed 模式下 colgroup 中单个 col 的样式。
     * 仅取叶子列的 width（与 cellStyleMap 中 --cw 保持一致）；未设置 width 的列不声明宽度，
     * 由 table-layout:fixed 将剩余空间平分，符合"一列固定、其余列平分"的预期。
     */
    function getColGroupColStyle(col: PrivateStkTableColumn<DT>): string | undefined {
        const width = transformWidthToStr(col.width);
        return width ? `width:${width}` : undefined;
    }

    function getAbsoluteRowIndex(rowIndex: number) {
        return rowIndex + virtualScroll().startIndex;
    }

    function shouldHideCell(row: PrivateRowDT | null | undefined, col: StkTableColumn<any>): boolean | undefined {
        if (!hiddenCellMap() || !row) return;
        return hiddenCellMap()[rowKeyGen(row)]?.has(colKeyGen()(col));
    }

    /** th title */
    function getHeaderTitle(col: StkTableColumn<DT>): string {
        const colKey = colKeyGen()(col);
        // hide title
        if (props.hideHeaderTitle === true || (Array.isArray(props.hideHeaderTitle) && props.hideHeaderTitle.includes(colKey))) {
            return '';
        }
        return col.title || '';
    }

    function getTRProps(row: PrivateRowDT | null | undefined, index: Accessor<number>) {
        const rowKey = rowKeyGen(row);
        const needRowHeight = row?.__EXP_R__ && props.virtual && props.expandConfig?.height;

        return {
            id: stkTableId + '-' + rowKey,
            'data-row-key': rowKey,
            // 使用 getter 保持响应式：<For> 复用行 DOM 后 index 会变化（树展开/折叠、虚拟滚动），data-row-i 必须跟随更新，
            // 否则事件委托（onCellClick 等）会按过期索引取行导致取不到行
            get 'data-row-i'() {
                return getAbsoluteRowIndex(index());
            },
            // 使用 getter 保持响应式：SolidJS spread 包裹在 createRenderEffect 中，getter 读取的信号变化时会重新赋值 class/style
            get class() {
                const rowIndex = getAbsoluteRowIndex(index());
                const classList = [props.rowClassName(row, rowIndex), row?.__EXP__ ? 'expanded' : '', row?.__EXP_R__ ? 'expanded-row' : ''];
                if (currentRowKey() === rowKey || row === currentRow()) {
                    classList.push('active');
                }
                if (props.showTrHoverClass && (rowKey === currentHoverRowKey() || row === currentHoverRow)) {
                    classList.push('hover');
                }
                return classList.filter(Boolean).join(' ');
            },
            get style() {
                return needRowHeight ? `--row-height: ${props.expandConfig?.height}px` : null;
            },
        };
    }

    function getTHProps(col: PrivateStkTableColumn<DT>) {
        const colKey = colKeyGen()(col);

        return {
            'data-col-key': colKey,
            draggable: Boolean(isHeaderDraggable(col)),
            rowspan: col.__R_SP__,
            colspan: col.__C_SP__,
            title: getHeaderTitle(col),
            // 使用 getter 保持响应式（排序状态/固定列激活状态/列宽变化时更新）
            get style() {
                return cellStyleMap()[TagType.TH].get(colKey);
            },
            get class() {
                const sortState = getColumnSortState(colKey);
                const isSorted = !!sortState && sortState.order !== null;
                return [
                    col.sorter ? 'sortable' : '',
                    isSorted && 'sorter-' + sortState?.order,
                    col.headerClassName,
                    fixedColClassMap().get(colKey),
                    col.headerAlign &&
                        (col.headerAlign === 'left' ? 'text-l' : col.headerAlign === 'right' ? 'text-r' : col.headerAlign === 'center' ? 'text-c' : null),
                ]
                    .filter(Boolean)
                    .join(' ');
            },
        };
    }

    function getTFProps(col: StkTableColumn<DT>) {
        const colKey = colKeyGen()(col);
        return {
            'data-col-key': colKey,
            // 使用 getter 保持响应式（固定列激活状态/列宽变化时更新）
            get style() {
                return cellStyleMap()[TagType.TF].get(colKey);
            },
            get class() {
                return [col.className, fixedColClassMap().get(colKey), col.type === 'seq' ? 'seq-column' : '', col.align === 'center' ? 'text-c' : col.align === 'right' ? 'text-r' : '']
                    .filter(Boolean)
                    .join(' ');
            },
        };
    }

    function getTDProps(row: PrivateRowDT | null | undefined, col: StkTableColumn<any>, rowIndex: number, colIndex: number) {
        const colKey = colKeyGen()(col);
        if (!row) {
            return {
                get style() {
                    return cellStyleMap()[TagType.TD].get(colKey);
                },
            };
        }

        const cellKey = cellKeyGen(row, col);

        return {
            'data-col-key': colKey,
            // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
            get style() {
                return cellStyleMap()[TagType.TD].get(colKey);
            },
            get class() {
                const classList = [col.className, fixedColClassMap().get(colKey)];

                if (col.align === 'center') {
                    classList.push('text-c');
                } else if (col.align === 'right') {
                    classList.push('text-r');
                }
                if (col.mergeCells) {
                    if (hoverMergedCells().has(cellKey)) {
                        classList.push('cell-hover');
                    }
                    if (activeMergedCells().has(cellKey)) {
                        classList.push('cell-active');
                    }
                }

                if (props.cellActive && currentSelectedCellKey() === cellKey) {
                    classList.push('active');
                }
                if (col.type === 'seq') {
                    classList.push('seq-column');
                } else if (col.type === 'expand' && (row.__EXP__ ? colKeyGen()(row.__EXP__) === colKey : false)) {
                    classList.push('expanded');
                } else if (row.__T_EXP__ && col.type === 'tree-node') {
                    classList.push('tree-expanded');
                } else if (col.type === 'dragRow') {
                    classList.push('drag-row-cell');
                }
                return classList.filter(Boolean).join(' ');
            },
            // 合并单元格 rowspan/colspan：getter 保持响应式（虚拟滚动窗口变化时合并布局会重新计算）
            get rowspan() {
                return mergeCellsWrapper(row, col)?.rowspan;
            },
            get colspan() {
                return mergeCellsWrapper(row, col)?.colspan;
            },
        };
    }

    function onRowClick(e: MouseEvent) {
        const rowIndex = getClosestTrIndex(e.target as HTMLElement);
        const row = dataSourceCopy()[rowIndex];
        if (!row) return;
        props.onRowClick?.(e, row, { rowIndex });
        if (rowActiveProp().disabled?.(row)) return;
        const isCurrentRow = props.rowKey ? currentRowKey() === rowKeyGen(row) : currentRow() === row;
        if (isCurrentRow) {
            if (!rowActiveProp().revokable) {
                return;
            }
            setCurrentRow(void 0, { silent: true });
        } else {
            setCurrentRow(row, { silent: true });
        }
        props.onCurrentChange?.(e, row, { select: !isCurrentRow });
    }

    function onRowDblclick(e: MouseEvent) {
        const rowIndex = getClosestTrIndex(e.target as HTMLElement);
        const row = dataSourceCopy()[rowIndex];
        if (!row) return;
        props.onRowDblclick?.(e, row, { rowIndex });
    }

    function onHeaderMenu(e: MouseEvent) {
        props.onHeaderRowMenu?.(e);
    }

    function onRowMenu(e: MouseEvent) {
        const rowIndex = getClosestTrIndex(e.target as HTMLElement);
        const row = dataSourceCopy()[rowIndex];
        if (!row) return;
        props.onRowMenu?.(e, row, { rowIndex });
    }

    function triangleClick(e: MouseEvent, row: DT, col: StkTableColumn<DT>) {
        if (col.type === 'expand') {
            toggleExpandRow(row, col);
        } else if (col.type === 'tree-node') {
            toggleTreeNode(row, col);
        }
    }

    function onCellClick(e: MouseEvent) {
        const rowIndex = getClosestTrIndex(e.target as HTMLElement);
        const row = dataSourceCopy()[rowIndex];
        if (!row) return;
        const colKey = getClosestColKey(e.target as HTMLElement);
        const col = tableHeaderLast().find(item => colKeyGen()(item) === colKey);
        if (!col) return;
        // Delegated triangle/fold icon click
        if ((e.target as HTMLElement)?.closest('.stk-fold-icon')) {
            triangleClick(e, row, col);
            return;
        }
        if (props.cellActive) {
            const cellKey = cellKeyGen(row, col);
            const result = { row, col, select: false, rowIndex };
            if (props.selectedCellRevokable && currentSelectedCellKey() === cellKey) {
                setCurrentSelectedCellKey(void 0);
            } else {
                setCurrentSelectedCellKey(cellKey);
                result.select = true;
            }
            props.onCellSelected?.(e, result);
        }
        props.onCellClick?.(e, row, col, { rowIndex });
    }

    function getCellEventData(e: MouseEvent) {
        const rowIndex = getClosestTrIndex(e.target as HTMLElement) || 0;
        const row = dataSourceCopy()[rowIndex];
        const colKey = getClosestColKey(e.target as HTMLElement);
        const col = tableHeaderLast().find(item => colKeyGen()(item) === colKey) as any;
        return { row, col, rowIndex };
    }

    /** th click */
    function onHeaderCellClick(e: MouseEvent, col: StkTableColumn<DT>) {
        onColumnSort(col);
        props.onHeaderCellClick?.(e, col);
    }

    function onCellMouseOver(e: MouseEvent) {
        const td = getClosestTd(e.target as HTMLElement);
        if (!td) return;
        const { row, col } = getCellEventData(e);
        props.onCellMouseover?.(e, row, col);
        // Simulate cell-mouseenter: relatedTarget is outside this td
        const related = e.relatedTarget as Node | null;
        if (!related || !td.contains(related)) {
            props.onCellMouseenter?.(e, row, col);
        }
    }

    function onTbodyMouseOut(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const related = e.relatedTarget as Node | null;

        // Cell mouseleave
        const td = getClosestTd(target);
        if (td && (!related || !td.contains(related))) {
            const { row, col } = getCellEventData(e);
            props.onCellMouseleave?.(e, row, col);
        }

        // Tr mouseleave
        const tr = getClosestTr(target);
        if (tr && (!related || !tr.contains(related))) {
            currentHoverRow = null;
            if (props.showTrHoverClass) {
                setCurrentHoverRowKey(null);
            }
            if (props.rowHover) {
                updateHoverMergedCells(void 0);
            }
        }
    }

    /** Delegated drop on tbody: extracts rowIndex from the closest tr and calls onTrDrop. */
    function onBodyDrop(e: DragEvent) {
        const trIndex = getClosestTrIndex(e.target as HTMLElement);
        if (trIndex < 0) return;
        onTrDrop(e, getAbsoluteRowIndex(trIndex));
    }

    function onCellMouseDown(e: MouseEvent) {
        const { row, col, rowIndex } = getCellEventData(e);
        props.onCellMousedown?.(e, row, col, { rowIndex });

        if (areaSelectionConfig().enabled) {
            onSelectionMouseDown(e);
        }
    }

    // isWheeling: true when wheel event is triggered, auto reset to false after delay
    const [isWheeling, setIsWheeling] = useWheeling();

    function onTableWheel(e: WheelEvent) {
        if (props.smoothScroll) return;
        // if is resizing, not allow scroll
        if (isColResizing()) {
            e.stopPropagation();
            return;
        }
        const dom = tableContainerAccessor() as HTMLElement;

        const { deltaY, deltaX, shiftKey } = e;

        if (virtual_on() && deltaY && !shiftKey) {
            const { containerHeight, scrollTop, scrollHeight } = virtualScroll();
            const canScrollDown = scrollTop < scrollHeight - containerHeight - 1;
            const canScrollUp = scrollTop > 1;

            if ((deltaY > 0 && canScrollDown) || (deltaY < 0 && canScrollUp)) {
                setIsWheeling(true);
                e.preventDefault();
            } else if (isWheeling()) {
                e.preventDefault();
            }

            if (isExperimentalScrollY()) {
                rafUpdateVirtualScrollYForWheel(scrollTop + deltaY);
                updateCustomScrollbar();
            } else {
                dom.scrollTop += deltaY;
            }
        }
        if (virtualX_on()) {
            const { containerWidth, scrollLeft, scrollWidth } = virtualScrollX();
            let distance = deltaX;
            if (shiftKey && deltaY) {
                distance = deltaY;
            }
            const canScrollRight = scrollLeft < scrollWidth - containerWidth - 1;
            const canScrollLeft = scrollLeft > 1;

            if ((distance > 0 && canScrollRight) || (distance < 0 && canScrollLeft)) {
                setIsWheeling(true);
                e.preventDefault();
            } else if (isWheeling()) {
                e.preventDefault();
            }
            dom.scrollLeft += distance;
        }
    }

    /** Prevent re-entrant requestAnimationFrame in onTableScroll */
    let scrollRAFScheduled = false;

    function onTableScroll(e: Event) {
        if (!e?.target || scrollRAFScheduled) return;
        scrollRAFScheduled = true;
        requestAnimationFrame(() => {
            scrollRAFScheduled = false;
            const { scrollTop, scrollLeft } = e.target as HTMLElement;
            const { scrollTop: vScrollTop } = virtualScroll();
            const { scrollLeft: vScrollLeft } = virtualScrollX();
            const isYScroll = isExperimentalScrollY() ? false : scrollTop !== vScrollTop;
            const isXScroll = scrollLeft !== vScrollLeft;

            if (isYScroll) {
                updateVirtualScrollY(scrollTop);
            }

            if (isXScroll) {
                if (virtualX_on()) {
                    updateVirtualScrollX(scrollLeft);
                } else {
                    // en: Record the scroll position. Used to determine isXScroll
                    virtualScrollX().scrollLeft = scrollLeft;
                }
                updateFixedShadow(virtualScrollX);
            }

            if (isYScroll) {
                const { startIndex, endIndex } = virtualScroll();
                props.onScroll?.(e, { startIndex, endIndex });
            }
            if (isXScroll) {
                props.onScrollX?.(e);
            }

            updateCustomScrollbar();
        });
    }

    /** tr hover */
    function onTrMouseOver(e: MouseEvent) {
        const tr = getClosestTr(e.target as HTMLElement);
        if (!tr) return;
        const rowIndex = Number(tr.dataset.rowI);
        const row = dataSourceCopy()[rowIndex];
        if (currentHoverRow === row) return;
        currentHoverRow = row;
        const rowKey = tr.dataset.rowKey;
        if (props.showTrHoverClass) {
            setCurrentHoverRowKey(rowKey || null);
        }
        if (props.rowHover) {
            updateHoverMergedCells(rowKey);
        }
    }

    /**
     * 选中一行
     */
    function setCurrentRow(rowKeyOrRow: string | undefined | DT, option: { silent?: boolean; deep?: boolean } = { silent: false, deep: false }) {
        const select = rowKeyOrRow !== void 0;
        const currentRowTemp = currentRow();
        if (!select) {
            setCurrentRowState(void 0);
            setCurrentRowKey(void 0);
            updateActiveMergedCells(true);
        } else if (typeof rowKeyOrRow === 'string') {
            const findRowByKey = (data: DT[], key: string): DT | null => {
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (rowKeyGen(item) === key) {
                        return item;
                    }
                    if (option.deep && item.children?.length) {
                        const found = findRowByKey(item.children, key);
                        if (found) {
                            return found;
                        }
                    }
                }
                return null;
            };

            setCurrentRowKey(rowKeyOrRow);
            updateActiveMergedCells(false, currentRowKey());
            const row = findRowByKey(dataSourceCopy() || [], rowKeyOrRow);
            if (!row) {
                console.warn('setCurrentRow failed.rowKey:', rowKeyOrRow);
                return;
            }
            setCurrentRowState(row);
        } else {
            setCurrentRowState(rowKeyOrRow);
            setCurrentRowKey(rowKeyGen(rowKeyOrRow));
            updateActiveMergedCells(false, currentRowKey());
        }
        if (!option.silent) {
            props.onCurrentChange?.(/** no Event */ null, select ? currentRow() : currentRowTemp, { select });
        }
    }

    /**
     * set highlight active cell (props.cellActive=true)
     */
    function setSelectedCell(row?: DT, col?: StkTableColumn<DT>, option = { silent: false }) {
        if (!dataSourceCopy().length) return;
        const select = row !== void 0 && col !== void 0;
        setCurrentSelectedCellKey(select ? cellKeyGen(row, col) : void 0);
        if (!option.silent) {
            props.onCellSelected?.(/** no Event */ null, { row, col, select });
        }
    }

    /**
     * set scroll bar position
     */
    function scrollTo(top: number | null = 0, left: number | null = 0) {
        if (!tableContainerAccessor()) return;
        if (top !== null) {
            if (isExperimentalScrollY()) {
                updateVirtualScrollY(top);
                updateCustomScrollbar();
            } else {
                tableContainerAccessor()!.scrollTop = top;
            }
        }
        if (left !== null) tableContainerAccessor()!.scrollLeft = left;
    }

    /** get current table data */
    function getTableData() {
        return dataSourceCopy();
    }

    // ---- 暴露实例方法 ----
    const instance: StkTableInstance = {
        initVirtualScroll,
        initVirtualScrollX,
        initVirtualScrollY,
        setCurrentRow,
        setSelectedCell,
        setHighlightDimCell,
        setHighlightDimRow,
        sortCol: sortCol as unknown as Accessor<UniqKey | null>,
        sortStates,
        getSortColumns,
        setSorter,
        resetSorter,
        scrollTo,
        getTableData,
        getRowIndex,
        getColumnIndex,
        setRowExpand,
        setAutoHeight,
        clearAllAutoHeight,
        setTreeExpand,
        getSelectedArea,
        setAreaSelection,
        clearSelectedArea,
        copySelectedArea,
        setFilter,
    };

    if (typeof props.ref === 'function') {
        props.ref(instance);
    }

    // ---- 容器 class 计算 ----
    const containerClass = createMemo(() => {
        const cls: Record<string, boolean | undefined> = {
            'stk-table': true,
            virtual: props.virtual,
            'virtual-x': props.virtualX,
            'vt-on': virtual_on(),
            light: props.theme === 'light',
            dark: props.theme === 'dark',
            headless: props.headless,
            'is-col-resizing': isColResizing(),
            'col-resizable': !!props.colResizable,
            bordered: !!props.bordered,
            stripe: props.stripe,
            'cell-hover': props.cellHover,
            'cell-active': props.cellActive,
            'row-hover': props.rowHover,
            'row-active': rowActiveProp().enabled,
            'text-overflow': props.showOverflow,
            'header-text-overflow': props.showHeaderOverflow,
            'fixed-relative-mode': isRelativeMode(),
            'auto-row-height': !!props.autoRowHeight,
            'scroll-row-by-row': !!isSRBRActive(),
            'scrollbar-on': scrollbarOptions().enabled,
            'area-selection': areaSelectionConfig().enabled,
            'is-area-selecting': isAreaSelecting(),
            'exp-scroll-y': !!isExperimentalScrollY(),
        };
        if (typeof props.bordered === 'string') {
            cls[`bordered-${props.bordered}`] = true;
        }
        const base = Object.keys(cls)
            .filter(k => cls[k])
            .join(' ');
        return props.class ? base + ' ' + props.class : base;
    });

    const containerStyle = createMemo(() => {
        const s: Record<string, string | undefined> = {
            '--row-height': props.autoRowHeight ? void 0 : virtualScroll().rowHeight + 'px',
            '--header-row-height': props.headerRowHeight + 'px',
            '--footer-row-height': props.footerRowHeight + 'px',
            '--highlight-duration': props.highlightConfig.duration && props.highlightConfig.duration + 's',
            '--highlight-timing-function': highlightSteps() ? `steps(${highlightSteps()})` : void 0,
            '--sb-width': `${scrollbarOptions().width}px`,
            '--sb-height': `${scrollbarOptions().height}px`,
        };
        let css = Object.entries(s)
            .filter(([, v]) => v !== void 0 && v !== null && v !== '')
            .map(([k, v]) => `${k}:${v}`)
            .join(';');
        const userStyle = props.style;
        if (userStyle) {
            const userCss =
                typeof userStyle === 'string'
                    ? userStyle
                    : Object.entries(userStyle)
                          .filter(([, v]) => v !== void 0 && v !== null && v !== '')
                          .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${v}`)
                          .join(';');
            if (userCss) css = css ? css + ';' + userCss : userCss;
        }
        return css;
    });

    // ---- Context（供 custom-cells 访问表格实例信息）----
    const stkTableContextValue = {
        dataSource: dataSourceCopy as Accessor<any[]>,
        rawDataSource: () => props.dataSource,
        theme: () => props.theme,
        setFilter,
        rowVersion,
        bumpRowVersion,
    };

    // ---- JSX 渲染 ----
    return (
        <StkTableContext.Provider value={stkTableContextValue}>
        <div
            ref={el => {
                setTableContainerAccessor(el);
            }}
            class={containerClass()}
            tabindex={areaSelectionConfig().enabled ? 0 : undefined}
            style={containerStyle()}
            onScroll={onTableScroll}
            onWheel={onTableWheel}
        >
            <Show when={!isExperimentalScrollY() && SRBRTotalHeight()}>
                <div class="row-by-row-table-height" style={`height: ${SRBRTotalHeight()}px`}></div>
            </Show>

            <Show when={props.colResizable}>
                <div ref={el => setColResizeIndicatorAccessor(el)} class="column-resize-indicator"></div>
            </Show>

            <div class="stk-table-scroll-container">
                <table
                    class="stk-table-main"
                    classList={{ 'fixed-mode': props.fixedMode }}
                    style={{ width: props.width, 'min-width': props.minWidth, 'max-width': props.maxWidth }}
                    onDragOver={onTrDragOver}
                    onDragEnter={onTrDragEnter}
                    onDragEnd={onTrDragEnd}
                    onClick={onRowClick}
                    onDblClick={onRowDblclick}
                    onContextMenu={onRowMenu}
                    onMouseOver={onTrMouseOver}
                >
                    {/* table-layout:fixed 下浏览器仅依据首行/colgroup 决定列宽，
                        多级表头时子列宽度位于非首行会被忽略。
                        故固定模式下通过 colgroup 显式声明每个叶子列宽度，保证子列 width 生效。 */}
                    <Show when={props.fixedMode && !virtualX_on()}>
                        <colgroup>
                            <For each={tableHeaderLast()}>
                                {col => <col style={getColGroupColStyle(col)} />}
                            </For>
                        </colgroup>
                    </Show>
                    <Show when={!props.headless}>
                        <thead>
                            <For each={virtualX_on() ? virtualX_tableHeaders() : tableHeaders()}>
                                {(row, rowIndex) => (
                                    <tr onContextMenu={e => onHeaderMenu(e)}>
                                        <Show when={virtualX_on()}>
                                            <th
                                                class="vt-x-left"
                                                style={`min-width:${theadVirtualX().offsetLeft}px;width:${theadVirtualX().offsetLeft}px`}
                                            ></th>
                                        </Show>
                                        <For each={row}>
                                            {(col, colIndex) => {
                                                const thProps = getTHProps(col as PrivateStkTableColumn<DT>);
                                                return (
                                                    <th
                                                        {...thProps}
                                                        onClick={e => onHeaderCellClick(e, col)}
                                                        onDragStart={onThDragStart}
                                                        onDrop={onThDrop}
                                                        onDragOver={onThDragOver}
                                                    >
                                                        <Show when={colResizeOn()(col) && colIndex() > 0}>
                                                            <div
                                                                class="table-header-resizer left"
                                                                onMouseDown={e => onThResizeMouseDown(e, col, true)}
                                                            ></div>
                                                        </Show>
                                                        <div
                                                            class="table-header-cell-wrapper"
                                                            style={(col as PrivateStkTableColumn<DT>).__R_SP__ ? `--row-span:${(col as PrivateStkTableColumn<DT>).__R_SP__}` : undefined}
                                                        >
                                                            <Show
                                                                when={col.customHeaderCell}
                                                                fallback={
                                                                    props.tableHeaderSlot ? (
                                                                        props.tableHeaderSlot(col)
                                                                    ) : (
                                                                        <span class="table-header-title">{col.title}</span>
                                                                    )
                                                                }
                                                            >
                                                                {renderCustomCell(col.customHeaderCell, {
                                                                    col,
                                                                    colIndex: colIndex(),
                                                                    rowIndex: rowIndex(),
                                                                })}
                                                            </Show>
                                                            <Show when={col.sorter}>
                                                                <span class="table-header-sorter">
                                                                    <SortIcon />
                                                                </span>
                                                            </Show>
                                                        </div>
                                                        <Show when={colResizeOn()(col)}>
                                                            <div class="table-header-resizer right" onMouseDown={e => onThResizeMouseDown(e, col)}></div>
                                                        </Show>
                                                    </th>
                                                );
                                            }}
                                        </For>
                                        <Show when={virtualX_on()}>
                                            <th
                                                class="vt-x-right"
                                                style={`min-width:${virtualX_offsetRight()}px;width:${virtualX_offsetRight()}px`}
                                            ></th>
                                        </Show>
                                    </tr>
                                )}
                            </For>
                        </thead>
                    </Show>

                    <Show when={props.footerData && props.footerData.length > 0}>
                        {renderFooter()}
                    </Show>

                    <tbody
                        class="stk-tbody-main"
                        style={isExperimentalScrollY() ? `transform:translateY(${virtualScroll().translateY}px)` : ''}
                        onClick={onCellClick}
                        onMouseDown={onCellMouseDown}
                        onMouseOver={onCellMouseOver}
                        onMouseOut={onTbodyMouseOut}
                        onDrop={onBodyDrop}
                    >
                        <Show when={!isExperimentalScrollY() && virtual_on() && !isSRBRActive()}>
                            <tr style={paddingTopStyle()} class="padding-top-tr">
                                <Show when={props.fixedMode && props.headless}>
                                    <Show when={virtualX_on()}>
                                        <td
                                            class="vt-x-left"
                                            style={`min-width:${theadVirtualX().offsetLeft}px;width:${theadVirtualX().offsetLeft}px`}
                                        ></td>
                                    </Show>
                                    <For each={virtualX_columnPart()}>
                                        {(col, _colIdx) => (
                                            <Show
                                                when={!(col as PrivateStkTableColumn<DT>).__VT_C_SP__}
                                                fallback={<td class="vt-x-spacer" colspan={(col as PrivateStkTableColumn<DT>).__VT_C_SP__}></td>}
                                            >
                                                <td style={cellStyleMap()[TagType.TD].get(colKeyGen()(col))}></td>
                                            </Show>
                                        )}
                                    </For>
                                    <Show when={virtualX_on()}>
                                        <td
                                            class="vt-x-right"
                                            style={`min-width:${virtualX_offsetRight()}px;width:${virtualX_offsetRight()}px`}
                                        ></td>
                                    </Show>
                                </Show>
                            </tr>
                        </Show>
                        <For each={virtual_dataSourcePart()}>
                            {(row, rowIndex) => renderBodyRow(row, rowIndex)}
                        </For>
                        <Show when={!isExperimentalScrollY()}>
                            <Show when={virtual_on() && !isSRBRActive()}>
                                <tr style={offsetBottomStyle()}></tr>
                            </Show>
                            <Show when={SRBRBottomHeight()}>
                                <tr style={SRBRBottomStyle()}></tr>
                            </Show>
                        </Show>
                    </tbody>
                </table>
                <Show when={scrollbarOptions().enabled && showScrollbar().y}>
                    <div
                        class="stk-sb-thumb vertical"
                        style={`height:${scrollbar().h}px;transform:translateY(${scrollbar().t}px)`}
                        onMouseDown={onVerticalScrollbarMouseDown}
                        onTouchStart={onVerticalScrollbarMouseDown}
                    ></div>
                </Show>
            </div>
            <Show when={(!dataSourceCopy() || !dataSourceCopy().length) && props.showNoData}>
                <div class="stk-table-no-data" classList={{ 'no-data-full': props.noDataFull }}>
                    {props.emptySlot ?? '暂无数据'}
                </div>
            </Show>
            {props.customBottomSlot}
            <Show when={scrollbarOptions().enabled && showScrollbar().x}>
                <div
                    class="stk-sb-thumb horizontal"
                    style={`width:${scrollbar().w}px;transform:translateX(${scrollbar().l}px)`}
                    onMouseDown={onHorizontalScrollbarMouseDown}
                    onTouchStart={onHorizontalScrollbarMouseDown}
                ></div>
            </Show>
        </div>
        </StkTableContext.Provider>
    );

    function renderFooter() {
        // tfoot/tbody 动态标签需用 Dynamic 渲染（Solid JSX 中大写变量会被编译为组件调用）
        return (
            <Dynamic component={footerTagName()} class="stk-footer" style={isFooterTop() ? `top:${tableHeaderHeight()}px` : ''}>
                <For each={props.footerData}>
                    {(footRow, footRowIndex) => (
                        <tr>
                            <Show when={virtualX_on()}>
                                <td
                                    class="vt-x-left"
                                    style={`min-width:${theadVirtualX().offsetLeft}px;width:${theadVirtualX().offsetLeft}px`}
                                ></td>
                            </Show>
                            <For each={virtualX_columnPart()}>
                                {(col, _colIdx) => (
                                    <Show
                                        when={!(col as PrivateStkTableColumn<DT>).__VT_C_SP__}
                                        fallback={<td class="vt-x-spacer" colspan={(col as PrivateStkTableColumn<DT>).__VT_C_SP__}></td>}
                                    >
                                        <td {...getTFProps(col)}>
                                            <Show when={col.customFooterCell}>
                                                {renderCustomCell(col.customFooterCell, {
                                                    class: 'table-cell-wrapper',
                                                    tabindex: '-1',
                                                    col,
                                                    row: footRow,
                                                    rowIndex: footRowIndex(),
                                                    cellValue: footRow[col.dataIndex],
                                                })}
                                            </Show>
                                            <div class="table-cell-wrapper" tabindex="-1" title={footRow[col.dataIndex] || ''}>
                                                <Show when={footRow[col.dataIndex] != null}>
                                                    <span>{footRow[col.dataIndex]}</span>
                                                </Show>
                                            </div>
                                        </td>
                                    </Show>
                                )}
                            </For>
                            <Show when={virtualX_on()}>
                                <td
                                    class="vt-x-right"
                                    style={`min-width:${virtualX_offsetRight()}px;width:${virtualX_offsetRight()}px`}
                                ></td>
                            </Show>
                        </tr>
                    )}
                </For>
            </Dynamic>
        );
    }

    function renderBodyRow(row: DT, rowIndex: Accessor<number>) {
        const trProps = getTRProps(row, rowIndex);
        return (
            <tr {...trProps}>
                <Show
                    when={!(row && row.__EXP_R__)}
                    fallback={
                        <td colspan={expandRowColspan()}>
                            <div class="table-cell-wrapper" tabindex="-1">
                                {props.expandSlot
                                    ? props.expandSlot(row.__EXP_R__, row.__EXP_C__)
                                    : (row.__EXP_R__ && row.__EXP_C__ && row.__EXP_R__[row.__EXP_C__.dataIndex]) || ''}
                            </div>
                        </td>
                    }
                >
                    <Show when={virtualX_on()}>
                        <td class="vt-x-left"></td>
                    </Show>
                    <For each={virtualX_columnPart()}>
                        {(col, _colIdx) => renderBodyCell(row, col as PrivateStkTableColumn<DT>, rowIndex)}
                    </For>
                    <Show when={virtualX_on()}>
                        <td class="vt-x-right"></td>
                    </Show>
                </Show>
            </tr>
        );
    }

    function renderBodyCell(row: DT, col: PrivateStkTableColumn<DT>, rowIndex: Accessor<number>) {
        if (col.__VT_C_SP__) {
            return <td class="vt-x-spacer" colspan={col.__VT_C_SP__}></td>;
        }
        const tdProps = getTDProps(row, col, rowIndex(), col.__LF_S__ ?? 0);
        // shouldHideCell 需响应式：虚拟滚动窗口变化时被合并覆盖的单元格要随之隐藏/恢复
        return (
            <Show when={!shouldHideCell(row, col)}>
                <td {...tdProps}>
                    <Show
                        when={col.customCell}
                        fallback={renderDefaultCell(row, col, rowIndex)}
                    >
                        {renderCustomCell(col.customCell, {
                            class: 'table-cell-wrapper',
                            tabindex: '-1',
                            col,
                            row,
                            // 使用 getter 保持响应式：<For> 复用行后 index 会变化
                            get rowIndex() {
                                return getAbsoluteRowIndex(rowIndex());
                            },
                            colIndex: col.__LF_S__ ?? 0,
                            // 使用 getter 保持响应式（对齐 Vue render 函数重新求值行为）
                            get cellValue() {
                                return row && row[col.dataIndex];
                            },
                            get expanded() {
                                return row && row.__EXP__;
                            },
                            get 'tree-expanded'() {
                                return row && row.__T_EXP__;
                            },
                            // 对齐 Vue：stkFoldIcon 点击由 tbody 委托的 onCellClick 统一处理（避免与直接处理器双重 toggle）
                            stkFoldIcon: <TriangleIcon />,
                            stkDragIcon: <DragHandle onDragStart={e => onTrDragStart(e, getAbsoluteRowIndex(rowIndex()))} />,
                        })}
                    </Show>
                </td>
            </Show>
        );
    }

    function renderDefaultCell(row: DT, col: PrivateStkTableColumn<DT>, rowIndex: Accessor<number>) {
        if (!col.type) {
            return (
                <div class="table-cell-wrapper" tabindex="-1" title={row[col.dataIndex] || ''}>
                    {(row && row[col.dataIndex]) != null ? row && row[col.dataIndex] : getEmptyCellText()(col, row)}
                </div>
            );
        }
        if (col.type === 'seq') {
            return (
                <div class="table-cell-wrapper" tabindex="-1">
                    {(props.seqConfig.startIndex || 0) + getAbsoluteRowIndex(rowIndex()) + 1}
                </div>
            );
        }
        if (col.type === 'tree-node') {
            // 对齐 Vue：默认 tree-node 渲染不绑定直接点击器，折叠图标点击由 tbody 委托的 onCellClick 统一处理（避免双重 toggle）
            return (
                <div class="table-cell-wrapper" tabindex="-1">
                    <TreeNodeCell col={col} row={row} />
                </div>
            );
        }
        return (
            <div class="table-cell-wrapper" tabindex="-1" title={row[col.dataIndex] || ''}>
                <Show when={col.type === 'dragRow'}>
                    <DragHandle onDragStart={e => onTrDragStart(e, getAbsoluteRowIndex(rowIndex()))} />
                </Show>
                <Show when={col.type === 'expand'}>
                    <TriangleIcon />
                </Show>
                <Show when={row[col.dataIndex] != null}>
                    <span>{row[col.dataIndex]}</span>
                </Show>
            </div>
        );
    }
}

/** 渲染自定义单元格组件 */
function renderCustomCell(customCell: any, cellProps: any): JSX.Element {
    if (typeof customCell === 'string') {
        return customCell;
    }
    if (typeof customCell === 'function') {
        return customCell(cellProps);
    }
    return null;
}
