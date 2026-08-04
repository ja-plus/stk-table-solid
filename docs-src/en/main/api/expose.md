# Expose

## API
### initVirtualScroll
Initializes the number of rows and columns in the visible area of the virtual list. Equivalent to calling both `initVirtualScrollX` and `initVirtualScrollY`.

The table's `props.autoResize` is `true` by default, so this function is automatically called when the width or height changes.

You can also call this function to recalculate the visible area of the virtual list manually. For example, call it after the mouse up event when the user manually drags to adjust the width or height.

If the height parameter is not provided, it defaults to the height of the table container. If you want to render more rows, you can add the height of several rows after obtaining the container height.


```ts
/**
 * 初始化虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScroll(height?: number)
```

### initVirtualScrollX
Initializes the number of columns for horizontal virtual scrolling.

```ts
/**
 * 初始化横向虚拟滚动参数
 */
initVirtualScrollX()
```

### initVirtualScrollY
Initializes the number of rows for vertical virtual scrolling.

```ts
/**
 * 初始化纵向虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScrollY(height?: number)
```

### setCurrentRow
Sets the currently selected row.

```ts
/**
 * 选中一行
 * @param {string} rowKeyOrRow selected rowKey, undefined 为取消选中
 * @param {boolean} option.silent 设置 true 则不会触发 `onCurrentChange`. 默认:false
 * @param {boolean} option.deep 设置 true 则会递归选中子行。默认:false
 */
function setCurrentRow(rowKeyOrRow: string | undefined | DT, option = { silent: false, deep: false })
```

### setSelectedCell
Sets the currently selected cell (effective when props.cellActive=true).

```ts
/**
 * 设置当前选中单元格 (props.cellActive=true)
 * @param row  设置高亮单元格, undefined  则为清除选中
 * @param col 列对象
 * @param option.silent 设置 true 则不会触发 `onCurrentChange`. 默认:false
 */
function setSelectedCell(row?: DT, col?: StkTableColumn<DT>, option = { silent: false })
```

### setHighlightDimCell

Sets a highlighted and dimmed cell.

```ts
/**
 * 高亮一个单元格。暂不支持虚拟滚动高亮状态记忆。
 * @param rowKeyValue 一行的key
 * @param colKeyValue 列key
 * @param options.method css-使用css渲染，animation-使用animation api。默认animation;
 * @param option.className 自定义css动画的class。
 * @param option.keyframe 如果自定义keyframe，则 highlightConfig.fps 将会失效。Keyframe：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API/Keyframe_Formats
 * @param option.duration 动画时长。method='css'状态下，用于移除class，如果传入了className则需要与自定义的动画时间一致。
 */
function setHighlightDimCell(rowKeyValue: UniqKey, colKeyValue: string, option: HighlightDimCellOption = {})
```

### setHighlightDimRow
Sets highlighted and dimmed rows.

```ts
/**
 * 高亮一行
 * @param rowKeyValues 行唯一键的数组
 * @param option.method css-使用css渲染，animation-使用animation api，js-使用js计算颜色。默认animation
 * @param option.className 自定义css动画的class。
 * @param option.keyframe 如果自定义keyframe，则 highlightConfig.fps 将会失效。Keyframe：https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API/Keyframe_Formats
 * @param option.duration 动画时长。method='css'状态下，用于移除class，如果传入了className则需要与自定义的动画时间一致。
 */
function setHighlightDimRow(rowKeyValues: UniqKey[], option: HighlightDimRowOption = {})
```

### sortCol
Table sort column dataIndex

### sortStates
Multi-column sort states array.

```ts
/**
 * 排序状态数组
 * @see SortState[]
 */
sortStates: SortState[];
```

### getSortColumns
Get sort column information `{key:string,order:Order}[]`

### setSorter
```ts
/**
 * 设置表头排序状态。
 * @param colKey 列唯一键字段。如果你想要取消排序状态，请使用`resetSorter`
 * @param order 正序倒序 'asc'|'desc'|null
 * @param option.sortOption 指定排序参数。同 StkTableColumn 中排序相关字段。建议从columns中find得到。
 * @param option.sort 是否触发排序-默认true
 * @param option.silent 是否禁止触发回调-默认true
 * @param option.force 是否触发排序-默认true
 * @returns 返回当前表格数据
 */
function setSorter(
    colKey: string,
    order: Order,
    option: {
        sortOption?: SortOption<DT>;
        force?: boolean;
        silent?: boolean;
        sort?: boolean
    } = {}
): DT[];
```

* When `option.force` is true, sorting will be triggered even if `props.sortRemote` is true.
* When `option.silent` is true, the `onSortChange` callback will not be triggered.
* The role of `option.sortOption` is that if the passed `colKey` is not in `columns`, you can specify sorting parameters. This is useful when hiding a column but still wanting to sort by that column's field.
    - Highest priority; if this is configured, it will not use `colKey` to find the corresponding column for sorting.

### resetSorter
Reset sort state

### scrollTo
Scroll to specified position

```ts
/**
 * 设置滚动条位置
 * @param top 设置null则不改变位置
 * @param left 设置null则不改变位置
 */
function scrollTo(top: number | null = 0, left: number | null = 0)
```

### getTableData
Get table data, returns array in current table sort order

### getRowIndex
Get row index based on rowKey

```ts
/**
 * 获取行索引
 * @param row rowKey 或 row 数据
 * @returns 行索引，未找到返回 -1
 */
function getRowIndex(row: UniqKey | DT): number
```

### getColumnIndex
Get column index based on colKey

```ts
/**
 * 获取列索引
 * @param col colKey 或列对象
 * @returns 列索引，未找到返回 -1
 */
function getColumnIndex(col: string | StkTableColumn<DT>): number
```

### setRowExpand
Set expanded row

```ts
/**
 *
 * @param rowKeyOrRow rowKey or row
 * @param expand 是否展开
 * @param data { col?: StkTableColumn<DT> }
 * @param data.silent 设置 true 则不会触发 `onToggleRowExpand`. 默认:false
 */
function setRowExpand(rowKeyOrRow: string | undefined | DT, expand?: boolean, data?: { col?: StkTableColumn<DT>; silent?: boolean })
```

### setAutoHeight
In variable row height virtual list, sets the height saved by auto-row-height for specified rows. If row height changes, you can call this method to clear or change the row height
```ts
function setAutoHeight(rowKey: UniqKey, height?: number | null)
```

### clearAllAutoHeight
Clear all heights saved by auto-row-height

### setTreeExpand
Set tree structure expanded row
```ts
/**
 * @param row rowKey / row / or an array of them
 * @param option.expand Whether to expand, if not provided, it will toggle based on current state
 * @param option.all Whether to expand all descendants, default false
 * @param option.level Expand to the nth level
 */
function setTreeExpand(row: (UniqKey | DT) | (UniqKey | DT)[], option?: { expand?: boolean; all?: boolean; level?: number })
```

- `option.all` <Badge type="tip" text="^1.0.4" />
- `option.level` <Badge type="tip" text="^1.0.4" />

### getSelectedArea
Get selected cells information

```ts
function getSelectedArea(): {
    rows: DT[];
    cols: StkTableColumn<DT>[];
    ranges: AreaSelectionRange[]
}
```

### setAreaSelection
Set drag selection range

```ts
/**
 * 设置拖选选区
 * @param ranges 选区范围数组
 * @param option.silent 设置 true 则不会触发 `onAreaSelectionChange`. 默认:false
 * @param option.scrollToView 设置 true 则会自动滚动到选区位置. 默认:false
 */
function setAreaSelection(ranges: AreaSelectionRange[], option?: { silent?: boolean; scrollToView?: boolean })
```

### clearSelectedArea
Clear selected cells

### copySelectedArea
Copy selected area content to clipboard. Returns the copied text content (TSV format).

```ts
function copySelectedArea(): string
```

### setFilter(Beta)
Set filter status(Beta). Triggers the `onFilterChange` event after setting.

```ts
/**
 * 设置筛选状态
 * @param status 筛选状态对象，传 null 清除所有筛选
 * @param option.remote 设置 true 则不会自动触发数据过滤，适用于远程筛选场景
 * @param option.silent 设置 true 则不会触发 `onFilterChange` 事件，默认 false
 */
function setFilter(status: Record<UniqKey, FilterStatus> | null, option?: { remote?: boolean; silent?: boolean })
```

