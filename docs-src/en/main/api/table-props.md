# Table Props
```ts
<StkTable
  ...[props]
/>
```
## API

### width

Table width

```ts
width?: string;
```

### minWidth

Minimum table width @deprecated Use css selector `.stk-table-main` to set

```ts
minWidth?: string;
```

### maxWidth

Maximum table width @deprecated Use css selector `.stk-table-main` to set

```ts
maxWidth?: string;
```

### stripe

Zebra stripes

```ts
stripe?: boolean;
```

### fixedMode

Whether to use table-layout:fixed

```ts
fixedMode?: boolean;
```

### headless

Whether to hide table header

```ts
headless?: boolean;
```

### theme

Theme, light or dark

```ts
theme?: 'light' | 'dark';
```

### rowHeight

Row height
- When `props.autoRowHeight` is `true`, this represents the expected row height for calculation. It no longer affects the actual row height.

```ts
rowHeight?: number;
```

### autoRowHeight

Whether to use variable row height
- When set to `true`, `props.rowHeight` represents the expected row height for calculation. It no longer affects the actual row height.

```ts
autoRowHeight?: boolean | {
  /** 预估行高(优先级高于rowHeight) */
  expectedHeight?: number | ((row: DT) => number);
};
```

### rowHover

Whether to highlight the row on mouse hover

```ts
rowHover?: boolean;
```

### rowActive

Whether to highlight the selected row

```ts
rowActive?: boolean | {
  /** 是否启用行选中功能 default: true */
  enabled?: boolean;
  /** 是否禁用行选中 default: () => false */
  disabled?: (row: DT) => boolean;
  /** 是否可以取消选中 default: true */
  revokable?: boolean;
};
```

### headerRowHeight

Header row height. default = rowHeight

```ts
headerRowHeight?: number | null;
```

### footerRowHeight

Footer row height. default = rowHeight

```ts
footerRowHeight?: number | string | null;
```

### virtual

Virtual scrolling

```ts
virtual?: boolean;
```

### virtualX

Horizontal virtual scrolling (must set column width)

```ts
virtualX?: boolean;
```

### columns

Table column configuration

Shallow listen, please modify the reference when changed

```ts
columns?: StkTableColumn<any>[];
```

### dataSource

Data source

Shallow listen, please modify the reference when changed

```ts
dataSource?: any[];
```

### rowKey

Row unique key (row unique value cannot be undefined)

```ts
rowKey?: UniqKeyProp;
```

### colKey

Column unique key. Default is `dataIndex`

```ts
colKey?: UniqKeyProp;
```

### emptyCellText

Empty cell display text

```ts
emptyCellText?: string | ((option: { row: DT; col: StkTableColumn<DT> }) => string);
```

### noDataFull

Whether the fallback height for no data fills the container

```ts
noDataFull?: boolean;
```

### showNoData

Whether to show no data message

```ts
showNoData?: boolean;
```

### sortRemote

Whether to use server-side sorting, true means not sorting data

```ts
sortRemote?: boolean;
```

### showHeaderOverflow

Whether header content overflows with ellipsis

```ts
showHeaderOverflow?: boolean;
```

### showOverflow

Whether body content overflows with ellipsis

```ts
showOverflow?: boolean;
```

### showTrHoverClass

Whether to add row hover class

```ts
showTrHoverClass?: boolean;
```

### cellHover

Whether to highlight the cell on mouse hover

```ts
cellHover?: boolean;
```

### cellActive

Whether to highlight the selected cell

```ts
cellActive?: boolean;
```

### selectedCellRevokable

Whether clicking the cell again can deselect it (cellActive=true)

```ts
selectedCellRevokable?: boolean;
```

### areaSelection

Whether to enable cell range selection (drag selection)

```ts
areaSelection?: boolean | {
    /** 是否启用区域选择，默认: true */
    enabled?: boolean;
    /** 复制时的单元格文本格式化回调 */
    formatCellForClipboard?: (row, col, rawValue) => string;
    /** 是否启用键盘控制选区移动，默认: true */
    keyboard?: boolean;
    /** 是否启用 Ctrl 多选功能，默认: true */
    ctrl?: boolean;
    /** 是否启用 Shift 扩选功能，默认: true */
    shift?: boolean;
};
```

### headerDrag

Whether header can be dragged. Supports callback function.

```ts
headerDrag?:
  | boolean
  | {
      /**
       * 列交换模式
       * - none - 不做任何事
       * - insert - 插入(默认值)
       * - swap - 交换
       */
      mode?: 'none' | 'insert' | 'swap';
      /** 禁用拖动的列 */
      disabled?: (col: StkTableColumn<DT>) => boolean;
    };
```

### rowClassName

Add className to rows

```ts
rowClassName?: (row: any, i: number) => string;
```

### colResizable

Whether column width is resizable (requires setting `columns` and using together with the `onupdatecolumns` callback)
**Do not set** column minWidth, **must** set width
When resizing column width, each column must have a width, and minWidth/maxWidth will not take effect. Table width will become "fit-content".
- Will automatically update the width property in props.columns

```ts
colResizable?: boolean | {
  /** 禁用拖动的列 */
  disabled?: (col: StkTableColumn<DT>) => boolean;
};
```

### colMinWidth

Minimum column width when resizing

```ts
colMinWidth?: number;
```

### bordered

Cell border.
Default has both horizontal and vertical borders
"h" - Only show horizontal lines
"v" - Only show vertical lines
"body-v" - Only show vertical lines in body
"body-h" - Only show horizontal lines in body

```ts
bordered?: boolean | 'h' | 'v' | 'body-v' | 'body-h';
```

### autoResize

Automatically recalculate virtual scroll height and width. Default true
[Non-reactive]
Passing a method represents a callback after resize

```ts
autoResize?: boolean | (() => void);
```

### fixedColShadow

Whether to show fixed column shadow. For performance, default false.

```ts
fixedColShadow?: boolean;
```

### sortConfig

Sort configuration

```ts
sortConfig?: {
  /** 空值是否排最下面 */
  emptyToBottom: boolean,
  /** 默认排序（1.初始化时触发 2.排序方向为null时触发) */
  defaultSort?: {
      dataIndex: keyof T;
      order: Order;
  };
  /**
   * string排序是否使用 String.prototype.localCompare
   * 默认true (历史设计问题，为了兼容，默认true)
   */
  stringLocaleCompare?: boolean;
},
```

### hideHeaderTitle

Hide header mouse hover title. Can pass dataIndex array

```ts
hideHeaderTitle?: boolean | string[];
```

### highlightConfig

Highlight configuration

```ts
highlightConfig?: {
  /** 高亮持续时间(s) */
  duration?: number;
  /** 高亮帧率*/
  fps?: number;
};
```

### seqConfig

Sequence column configuration

```ts
seqConfig?: {
  /** 序号列起始下标 用于适配分页 */
  startIndex?: number;
};
```

### expandConfig

Expand row configuration

```ts
expandConfig?: {
  height?: number;
};
```

### dragRowConfig

Row drag configuration

```ts
dragRowConfig?: {
  mode?: 'none' | 'insert' | 'swap';
};
```

### cellFixedMode

Fixed header and column implementation method.
[Non-reactive]
relative: Fixed columns can only be placed on both sides of props.columns.
- Use with caution if column width may change.
- Use with caution for fixed columns in multi-level headers

Older browsers can only use 'relative',

```ts
cellFixedMode?: 'sticky' | 'relative';
```

### smoothScroll

Whether to enable smooth scrolling
- default: chrome < 85 || chrome > 120 ? true : false
- false: Use wheel event for scrolling. To prevent white screen caused by scrolling too fast.
- true: Do not use wheel event for scrolling. Smoother scrolling with mouse wheel. May cause white screen when scrolling too fast.

```ts
smoothScroll?: boolean;
```

### scrollRowByRow

Scroll vertically by integer rows
- scrollbar: Only effective when dragging the scrollbar, can be used to solve the white screen problem when dragging

```ts
scrollRowByRow?: boolean | 'scrollbar';
```

### scrollbar

Custom scrollbar configuration
- false: Disable custom scrollbar
- true: Enable custom scrollbar with default configuration
- ScrollbarOptions: Enable and configure custom scrollbar

```ts
scrollbar?: boolean | {
  /** 是否启用滚动条 */
  enabled?: boolean;
  /** 垂直滚动条宽度 default: 8 */
  width?: number;
  /** 水平滚动条高度 default: 8 */
  height?: number;
  /** 滚动条滑块最小宽度 default: 20 */
  minWidth?: number;
  /** 滚动条滑块最小高度 default: 20 */
  minHeight?: number;
};
```

### treeConfig

Tree configuration

```ts
treeConfig?: {
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点key */
  defaultExpandKeys?: UniqKey[];
  /** 默认展开到第几层 */
  defaultExpandLevel?: number;
};
```

### experimental

Experimental configuration

```ts
experimental?: {
  /** 使用 transform 模拟滚动 */
  scrollY?: boolean;
};
```

### footerData

Footer summary row data

```ts
footerData?: DT[];
```
