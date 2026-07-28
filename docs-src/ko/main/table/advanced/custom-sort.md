# 커스텀 정렬

`StkTableColumn['sorter']`에 커스텀 정렬 규칙을 전달할 수 있습니다. 이는 이미 [정렬 챕터](/ko/main/table/basic/sort#커스텀-정렬)에서 언급되었습니다.

이번 챕터에서는 컴포넌트가 제공하는 내장 정렬 함수를 소개합니다.

## setSorter 메서드
인스턴스는 `setSorter` 메서드를 제공하여 사용자가 직접 정렬을 트리거할 수 있습니다. 예를 들어 외부 버튼을 클릭하여 테이블 정렬을 트리거합니다.

```ts
stkTableRef?.setSorter('rate', 'desc');
```
<demo solid="advanced/custom-sort/CustomSort/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/CustomSort/index.tsx"></demo>

### 매개변수 설명

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

* `option.force`가 true이면 `props.sortRemote`가 true라도 정렬을 트리거합니다.
* `option.silent`가 true이면 `onsortchange` 콜백을 트리거하지 않습니다.
* `option.sortOption`의 역할은 전달된 `colKey`가 `columns`에 없을 때 정렬 매개변수를 지정할 수 있습니다.某一 열을 숨겼지만 여전히 해당 열 필드로 정렬해야 하는 경우에有用.
    - 가장 높은 우선순위, 이것을 설정하면 `colKey`로 해당 열을 찾아 정렬하지 않습니다.

## 내장 정렬 함수
소스 코드에서导出하는 정렬 함수를 가져와 테이블 내장 정렬 동작에 맞출 수 있습니다.
```ts
import { tableSort, insertToOrderedArray } from 'stk-table-solid';
```

### tableSort 테이블 정렬
#### 사용 시나리오
더 나은 데이터 업데이트 성능을 위해 `props.sortRemote`를 설정하여 테이블 내장 정렬을 취소할 수 있습니다. 데이터 업데이트 시 아래에서 제공하는 `insertToOrderedArray` 함수를 사용하여 새 데이터를 삽입합니다.

테이블 헤더를 클릭하여 정렬을 트리거할 때도 여전히 내장 정렬을 사용하려면 `onsortchange` 콜백에서 이 함수를 사용하여 정렬할 수 있습니다.

#### 코드 예시
```ts
// onSortChange={handleSortChange}
function handleSortChange(col: StkTableColumn<any>, order: Order, data: any[], sortConfig: SortConfig<any>) {
    // 可以做其他操作
    setDataSource(tableSort(col, order, data, sortConfig));
}
```

#### 매개변수 설명
```ts
/**
 * 表格排序抽离
 * 可以在组件外部自己实现表格排序，组件配置remote，使表格不排序。
 * 使用者在onSortChange事件中自行更改table props 'dataSource'完成排序。
 *
 * sortConfig.defaultSort 会在order为null时生效
 * @param sortOption 列配置
 * @param order 排序方式
 * @param dataSource 排序的数组
 */
export function tableSort<T extends Record<string, any>>(
    sortOption: SortOption<T>,
    order: Order,
    dataSource: T[],
    sortConfig: SortConfig<T> = {},
): T[] 
```

### insertToOrderedArray 이분 삽입
실시간 데이터가 지속적으로 업데이트되는 시나리오에서 이분 삽입은 정렬 시간을 효과적으로 줄여 성능을 향상시킬 수 있습니다.

#### 코드 예시
```ts
setDataSource(insertToOrderedArray(tableSortStore.current, item, dataSource));
```

#### 매개변수 설명
```ts
/**
 * 对有序数组插入新数据
 *
 * 注意：不会改变原数组，返回新数组
 * @param sortState 排序状态
 * @param sortState.dataIndex 排序的字段
 * @param sortState.order 排序顺序
 * @param sortState.sortType 排序方式
 * @param newItem 要插入的数据
 * @param targetArray 表格数据
 * @param sortConfig SortConfig参考 https://github.com/ja-plus/stk-table-solid/blob/master/src/StkTable/types/index.ts
 * @param sortConfig.customCompare 自定义比较规则
 * @return targetArray 的浅拷贝
 */
export function insertToOrderedArray<T extends object>(
    sortState: SortState<T>,
    newItem: T,
    targetArray: T[],
    sortConfig: SortConfig<T> & { customCompare?: (a: T, b: T) => number } = {}
): T[] 

```

### 예시
다음 예시는 `tableSort`와 `insertToOrderedArray`의 사용을 포함합니다. 삽입 버튼을 클릭하여 삽입 정렬 효과를 관찰합니다.

<demo solid="advanced/custom-sort/InsertSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/InsertSort.tsx"></demo>
