# Custom Sorting

`StkTableColumn['sorter']` allows custom sorting rules. This was already mentioned in the [Sorting section](/en/main/table/basic/sort#Custom Sorting).

This chapter introduces the built-in sorting functions provided by the component.

## setSorter Method
The component instance provides a `setSorter` method for users to manually trigger sorting. For example, clicking an external button to trigger table sorting.

```ts
stkTableRef?.setSorter('rate', 'desc');
```
<demo solid="advanced/custom-sort/CustomSort/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/CustomSort/index.tsx"></demo>

### Parameter Description

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
* When `option.silent` is true, the `onsortchange` callback will not be triggered.
* The purpose of `option.sortOption` is to specify sorting parameters if the passed `colKey` is not in `columns`. Useful when hiding a column but still wanting to sort by that column's field.
    - Highest priority: if configured, it won't use `colKey` to find the corresponding column for sorting.

## Built-in Sorting Functions
You can import sorting functions exported from the source code to align with the table's built-in sorting behavior.
```ts
import { tableSort, insertToOrderedArray } from 'stk-table-solid';
```
### tableSort
#### Usage Scenario
For better data update performance, you can set `props.sortRemote` to disable the table's built-in sorting. When updating data, use the `insertToOrderedArray` function provided below to insert new data.

When clicking the header to trigger sorting, if you still want to use the built-in sorting, you can use this function in the `onsortchange` callback.

#### Code Example
```ts
// onSortChange={handleSortChange}
function handleSortChange(col: StkTableColumn<any>, order: Order, data: any[], sortConfig: SortConfig<any>) {
    // 可以做其他操作
    setDataSource(tableSort(col, order, data, sortConfig));
}
```

#### Parameter Description
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

### insertToOrderedArray
In scenarios where real-time data is constantly updating, binary insertion can effectively reduce sorting time and improve performance.
#### Code Example
```ts
setDataSource(insertToOrderedArray(tableSortStore.current, item, dataSource));
```
#### Parameter Description
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

### Example
The following example demonstrates the use of `tableSort` and `insertToOrderedArray`. Click to insert a row and observe the insertion sort effect.

<demo solid="advanced/custom-sort/InsertSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/InsertSort.tsx"></demo>

