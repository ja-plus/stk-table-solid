# Expose

## API
### initVirtualScroll
仮想リストの可視領域の行数と列数を初期化します。`initVirtualScrollX` と `initVirtualScrollY` の両方を呼び出すことと同等です。

テーブルの `props.autoResize` はデフォルトで `true` なので、幅または高さが変更的时候会自動でこの関数が呼び出されます。

仮想リスト的可視領域を手動で再計算する場合にもこの関数を呼び出すことができます。例如：ユーザーが手動でドラッグして幅または高さを調整した後のマウスアップイベントで呼び出します。

高さパラメータが提供されていない場合、テーブルコンテナの高さがデフォルトになります。更多くの行をレンダリングしたい場合は、コンテナ高さを取得した後にいくつかの行の高さを追加します。


```ts
/**
 * 初始化虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScroll(height?: number)
```

### initVirtualScrollX
横方向仮想スクロールの列数を初期化します。

```ts
/**
 * 初始化横向虚拟滚动参数
 */
initVirtualScrollX()
```

### initVirtualScrollY
縦方向仮想スクロールの行数を初期化します。

```ts
/**
 * 初始化纵向虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScrollY(height?: number)
```

### setCurrentRow
現在選択されている行を設定します。

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
現在選択されているセルを設定します（props.cellActive=trueの場合に効果的）。

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

ハイライトされ、薄暗くなったセルを設定します。

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
ハイライトされ、薄暗くなった行を設定します。

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
テーブル排序列dataIndex

### sortStates
複数列の排序状態配列。

```ts
/**
 * 排序状态数组
 * @see SortState[]
 */
sortStates: SortState[];
```

### getSortColumns
排序列情報を取得 `{key:string,order:Order}[]`

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

* `option.force` が true の場合、`props.sortRemote` が true でも排序がトリガーされます。
* `option.silent` が true の場合、`onSortChange` コールバックはトリガーされません。
* `option.sortOption` の役割は、渡された `colKey` が `columns` にない場合に排序パラメータを指定できることです。列を非表示にしているがその列のフィールドで排序仍然したい場合は便利です。
    - 最高優先順位；これが設定されている場合、`colKey` を使用して対応する列を検索して排序することはしません。

### resetSorter
排序状態をリセット

### scrollTo
指定位置までスクロール

```ts
/**
 * 设置滚动条位置
 * @param top 设置null则不改变位置
 * @param left 设置null则不改变位置
 */
function scrollTo(top: number | null = 0, left: number | null = 0)
```

### getTableData
テーブルデータを取得、現在のテーブル排序順序の配列を返します

### getRowIndex
rowKeyに基づいて行インデックスを取得

```ts
/**
 * 获取行索引
 * @param row rowKey 或 row 数据
 * @returns 行索引，未找到返回 -1
 */
function getRowIndex(row: UniqKey | DT): number
```

### getColumnIndex
colKeyに基づいて列インデックスを取得

```ts
/**
 * 获取列索引
 * @param col colKey 或列对象
 * @returns 列索引，未找到返回 -1
 */
function getColumnIndex(col: string | StkTableColumn<DT>): number
```

### setRowExpand
展開行を設定

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
可変行高仮想リストで、指定された行のauto-row-heightに保存された高さを設定します。行高が変更された場合、このメソッドを呼び出して行の高さをクリアまたは変更できます
```ts
function setAutoHeight(rowKey: UniqKey, height?: number | null)
```

### clearAllAutoHeight
auto-row-heightに保存されたすべての高さをクリア

### setTreeExpand
ツリー構造展開行を設定
```ts
/**
 * @param row rowKey / row / またはその配列
 * @param option.expand 展開するかどうか、未指定の場合は現在の状態に基づいて切り替え
 * @param option.all 全ての子ノードを展開するかどうか、デフォルト false
 * @param option.level n 番目のレベルまで展開
 * @param option.parents 渡された row を対象の子ノードとみなし、そのすべての親ノードを展開/折りたたみする。展開時に対象行自身が子ノードを持つ場合は合わせて展開される。単一の rowKey / row のみサポート
 */
function setTreeExpand(row: (UniqKey | DT) | (UniqKey | DT)[], option?: { expand?: boolean; all?: boolean; level?: number; parents?: boolean })
```
::: tip
`option.parents` が `true` の場合、深い階層の子ノードの rowKey を渡すだけで、そのすべての親ノードが自動的に展開され、対象行が表示されます。対象行自身が子ノードを持つ場合は合わせて展開されます（行への位置移動など）。フィルタによってある親ノードが除外されている場合、展開はそこで中断されます。
:::

- `option.all` <Badge type="tip" text="^1.0.4" />
- `option.level` <Badge type="tip" text="^1.0.4" />
- `option.parents` <Badge type="tip" text="^1.0.5" />

### getSelectedArea
選択されたセル情報を取得

```ts
function getSelectedArea(): {
    rows: DT[];
    cols: StkTableColumn<DT>[];
    ranges: AreaSelectionRange[]
}
```

### setAreaSelection
ドラッグ選択範囲を設定

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
選択されたセルをクリア

### copySelectedArea
選択されたエリアコンテンツをクリップボードにコピー。コピーされたテキストコンテンツ（TSV形式）を返します。

```ts
function copySelectedArea(): string
```

### setFilter(Beta)
フィルター状態を設定(Beta)。設定後に `onFilterChange` イベントをトリガーします。

```ts
/**
 * 设置筛选状态
 * @param status 筛选状态对象，传 null 清除所有筛选
 * @param option.remote 设置 true 则不会自动触发数据过滤，适用于远程筛选场景
 * @param option.silent 设置 true 则不会触发 `onFilterChange` 事件，默认 false
 */
function setFilter(status: Record<UniqKey, FilterStatus> | null, option?: { remote?: boolean; silent?: boolean })
```

