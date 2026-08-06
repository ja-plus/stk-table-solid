# Expose 인스턴스 메서드
## API
### initVirtualScroll
가상 리스트 가시 영역의 행 수와 열 수를 초기화합니다. `initVirtualScrollX`와 `initVirtualScrollY`를 동시에 호출하는 것과 동일합니다.

테이블의 `props.autoResize`는 기본값이 `true`이므로, 크기 변경 시 이 함수가 자동으로 호출됩니다.

사용자가 수동으로 크기 조절 시, 마우스 업 이벤트 후 이 함수를 호출하여 가상 리스트 가시 영역을 다시 계산할 수 있습니다.

매개변수 height를 전달하지 않으면 테이블 컨테이너 높이가 기본값으로 사용됩니다. 더 많은 행을 렌더링하려면 컨테이너 높이를 가져온 후 몇 행 높이를 더하면 됩니다.


```ts
/**
 * 初始化虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScroll(height?: number)
```

### initVirtualScrollX
가로 방향 가상 스크롤 열 수를 초기화합니다.

```ts
/**
 * 初始化横向虚拟滚动参数
 */
initVirtualScrollX()
```

### initVirtualScrollY
세로 방향 가상 스크롤 행 수를 초기화합니다.

```ts
/**
 * 初始化纵向虚拟滚动参数
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScrollY(height?: number)
```

### setCurrentRow
현재 선택된 행을 설정합니다.

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
현재 선택된 셀을 설정합니다 (props.cellActive=true 시生效).

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

강조 흐림 셀을 설정합니다.

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
강조 흐림 행을 설정합니다.

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
테이블 정렬 열 dataIndex

### sortStates
다중 열 정렬 상태 배열.

```ts
/**
 * 排序状态数组
 * @see SortState[]
 */
sortStates: SortState[];
```

### getSortColumns
정렬 열 정보 가져오기 `{key:string,order:Order}[]`

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

* `option.force`가 true이면 `props.sortRemote`가 true라도 정렬 트리거.
* `option.silent`가 true이면 `onSortChange` 콜백 트리거 안함.
* `option.sortOption`의 역할은 전달된 `colKey`가 `columns`에 없을 때 정렬 매개변수를 지정할 수 있습니다.某一 열을 숨겼지만 여전히 해당 열 필드로 정렬해야 하는 경우에有用.
    - 가장 높은 우선순위, 이것을 설정하면 `colKey`로 해당 열을 찾아 정렬하지 않습니다.

### resetSorter
정렬 상태 초기화

### scrollTo
지정 위치로 스크롤

```ts
/**
 * 设置滚动条位置
 * @param top 设置null则不改变位置
 * @param left 设置null则不改变位置
 */
function scrollTo(top: number | null = 0, left: number | null = 0)
```

### getTableData
테이블 데이터 가져오기, 현재 테이블 정렬 순서의 배열 반환

### getRowIndex
rowKey를 기반으로 행 인덱스 가져오기

```ts
/**
 * 获取行索引
 * @param row rowKey 或 row 数据
 * @returns 行索引，未找到返回 -1
 */
function getRowIndex(row: UniqKey | DT): number
```

### getColumnIndex
colKey를 기반으로 열 인덱스 가져오기

```ts
/**
 * 获取列索引
 * @param col colKey 或列对象
 * @returns 列索引，未找到返回 -1
 */
function getColumnIndex(col: string | StkTableColumn<DT>): number
```

### setRowExpand
확장 행 설정

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
가변 행 높이 가상 리스트에서, 지정 행의 auto-row-height 저장 높이를 설정. 행 높이가 변경되면 이 메서드를 호출하여 행 높이 지우기 또는 변경 가능
```ts
function setAutoHeight(rowKey: UniqKey, height?: number | null)
```

### clearAllAutoHeight
모든 auto-row-height 저장 높이 지우기

### setTreeExpand
트리 구조 확장 행 설정
```ts
/**
 * @param row rowKey / row / 또는 그들의 배열
 * @param option.expand 확장 여부, 미지정 시 현재 상태에 따라 토글
 * @param option.all 모든 하위 노드를 확장할지 여부, 기본값 false
 * @param option.level n번째 레벨까지 확장
 * @param option.parents 전달된 row를 대상 자식 노드로 간주하여 그 모든 부모 노드를 확장/축소한다. 확장 시 대상 행 자체가 자식 노드를 가지면 함께 확장된다. 단일 rowKey / row만 지원
 */
function setTreeExpand(row: (UniqKey | DT) | (UniqKey | DT)[], option?: { expand?: boolean; all?: boolean; level?: number; parents?: boolean })
```
::: tip
`option.parents`가 `true`이면 깊은 자식 노드의 rowKey를 전달하는 것만으로 그 모든 부모 노드가 자동으로 확장되어 해당 행이 표시되며, 해당 행 자체가 자식 노드를 가지면 함께 확장됩니다(행 위치 지정 등). 필터에 의해 어떤 부모 노드가 제외된 경우, 확장은 거기서 중단됩니다.
:::

- `option.all` <Badge type="tip" text="^1.0.4" />
- `option.level` <Badge type="tip" text="^1.0.4" />
- `option.parents` <Badge type="tip" text="^1.1.0" />

### getSelectedArea
선택된 셀 정보 가져오기

```ts
function getSelectedArea(): {
    rows: DT[];
    cols: StkTableColumn<DT>[];
    ranges: AreaSelectionRange[]
}
```

### setAreaSelection
드래그 선택 영역 설정

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
선택된 셀 지우기

### copySelectedArea
선택 영역 내용을 클립보드에 복사. 복사된 텍스트 내용 반환 (TSV 형식).

```ts
function copySelectedArea(): string
```

### setFilter(Beta)
필터 상태 설정(Beta). 설정 후 `onFilterChange` 이벤트가 트리거됩니다.

```ts
/**
 * 设置筛选状态
 * @param status 筛选状态对象，传 null 清除所有筛选
 * @param option.remote 设置 true 则不会自动触发数据过滤，适用于远程筛选场景
 * @param option.silent 设置 true 则不会触发 `onFilterChange` 事件，默认 false
 */
function setFilter(status: Record<UniqKey, FilterStatus> | null, option?: { remote?: boolean; silent?: boolean })
```

