# Sorting

## Basic Sorting
Set `StkTableColumn['sorter']` to `true` in column configuration to enable sorting.

Click the table header to trigger sorting.
<demo solid="basic/sort/Sort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/Sort.tsx"></demo>

## Custom Sorting
`StkTableColumn['sorter']` can be set to a function in column configuration.

Customize sorting rules through `sorter(data, { column, order })`.

This function will be triggered during sorting, and the table will display using the **return value** of the function.

| Parameter | Type | Description |
| ---- | ---- | ---- |
| data| DataType[] | Table data. |
| column | StkTableColumn | Currently sorted column.
| order | `'desc'` \| `'asc'` \| `null` | Current sorting order.

The following table customizes the size sorting rules for the `Rate` column field.
<demo solid="basic/sort/CustomSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/CustomSort.tsx"></demo>

For more sorting methods, please refer to [Custom Sorting](/en/main/table/advanced/custom-sort)

## sortField Sorting Field
Some fields may use independent fields for sorting, such as year, month, and day fields. In this case, you can provide a special sorting field where year and month are converted to the smallest unit (day) for easy sorting. Specify this sorting field through `sortField`.

The `period` column in the following table specifies `periodNumber` as the sorting field.
<demo solid="basic/sort/SortField.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortField.tsx"></demo>

## Empty Fields Excluded from Sorting
Configure `props.sortConfig.emptyToBottom` to always place empty fields at the bottom of the list
```tsx
<StkTable sortConfig={{ emptyToBottom: true }} />
```
<demo solid="basic/sort/SortEmptyValue.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortEmptyValue.tsx"></demo>

## Specify Default Sort Column
Configure `props.sortConfig.defaultSort` to control the default sorting.
::: warning
When default sorting is set, if **no sorting is applied**, it will sort by the **default sort** field.

Click on the `Name` column in the table below to observe its behavior.
:::
<demo solid="basic/sort/DefaultSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/DefaultSort.tsx"></demo>

## Using localCompare for String Sorting
After configuring `props.sortConfig.stringLocaleCompare = true`, strings will be sorted using [`String.prototype.localeCompare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare).

Effect: Chinese characters will be sorted according to the first letter of their pinyin.

## Server-side Sorting

Set `props.sortRemote` to `true`, which will not trigger the component's internal sorting logic.

After clicking the table header, the `onsortchange` callback will be triggered. You can initiate an ajax request in the callback, then reassign `props.dataSource` to complete the sorting.

```tsx
<StkTable sortRemote />
```
<demo solid="basic/sort/SortRemote.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortRemote.tsx"></demo>

## Tree Node Deep Sorting
After configuring `props.sortConfig.sortChildren = true`, when clicking on the table header to sort, the `children` sub-nodes will also be sorted.

<demo solid="basic/sort/SortChildren.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortChildren.tsx"></demo>

## Multi-column Sorting

Configure `props.sortConfig.multiSort = true` to enable multi-column sorting mode.

In multi-column sorting mode:
- Clicking different columns will maintain multiple sorting conditions simultaneously
- Columns clicked first have higher priority (sorted by that column first during sorting)
- Click the same column again to toggle sorting direction (desc → asc → null)
- Third click cancels sorting for that column
- Can limit maximum number of sorting columns via `props.sortConfig.multiSortLimit` (default 3)

<demo solid="basic/sort/MultiSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/MultiSort.tsx"></demo>

## API
### StkTableColumn Configuration

Sorting-related parameters in `StkTableColumn` column configuration.

```ts
const columns: StkTableColumn[] = [{
    sorter: true,
    sortField: 'xxx',
    sortType: 'number',
    sortConfig: Omit<SortConfig<T>, 'defaultSort'>;
}]
```

| Parameter | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| sorter | `boolean` \| `((data: T[], option: { order: Order; column: any }) => T[])` | `false` | Specify whether to enable sorting. Set to `true` for basic sorting, or a function for custom sorting rules. |
| sortField | `string` | Same as `dataIndex` | Specify the sorting field. Use when you need to sort by a different field than the display field. |
| sortType | `'string'` \| `'number'` | Auto-detect | Specify the sorting type. Automatically detects the data type of the first row by default. |
| sortConfig | `Omit<SortConfig<T>, 'defaultSort'>` | - | Configure sorting rules at the column level. Higher priority than global `props.sortConfig`. |

### props.sortConfig

Global sorting configuration.

```ts
type SortConfig<T extends Record<string, any>> = {
    /**
     * 默认排序（1.初始化时触发 2.排序方向为null时触发）
     * 类似 onMounted 时调用 setSorter 点了下表头
     */
    defaultSort?: {
        /** 列唯一键，如果配置了 props.colKey 则这里表示列唯一键的值 */
        key?: StkTableColumn<T>['key'];
        /** 排序字段 */
        dataIndex: StkTableColumn<T>['dataIndex'];
        /** 排序方向 */
        order: Order;
        /** 指定排序字段 */
        sortField?: StkTableColumn<T>['sortField'];
        /** 排序类型 */
        sortType?: StkTableColumn<T>['sortType'];
        /** 自定义排序函数 */
        sorter?: StkTableColumn<T>['sorter'];
        /** 是否禁止触发 onSortChange 事件，默认 false */
        silent?: boolean;
    };
    /** 空值始终排在列表末尾 */
    emptyToBottom?: boolean;
    /** 使用 String.prototype.localeCompare 对字符串排序，默认 false */
    stringLocaleCompare?: boolean;
    /** 是否对子节点也进行排序，默认 false */
    sortChildren?: boolean;
    /** 是否启用多列排序，默认 false */
    multiSort?: boolean;
    /** 多列排序时的最大列数限制，默认 3 */
    multiSortLimit?: number;
};
```

| Parameter | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| defaultSort | `object` | - | Default sorting configuration. Triggered during initialization and when sorting order is null. |
| defaultSort.key | `string` | - | Column unique key. |
| defaultSort.dataIndex | `string` | - | Sorting field, **required**. |
| defaultSort.order | `Order` | - | Sorting order: `'asc'` \| `'desc'` \| `null`, **required**. |
| defaultSort.silent | `boolean` | `false` | Whether to disable triggering `onsortchange` callback. |
| emptyToBottom | `boolean` | `false` | Whether empty values are always placed at the bottom of the list. |
| stringLocaleCompare | `boolean` | `false` | Whether to use `localeCompare` for string sorting (Chinese characters sorted by pinyin). |
| sortChildren | `boolean` | `false` | For tree data, whether to also sort child nodes. |
| multiSort | `boolean` | `false` | Whether to enable multi-column sorting mode. |
| multiSortLimit | `number` | `3` | Maximum number of columns allowed in multi-column sorting. |

### onsortchange (sort-change)
Callback prop type:
```ts
/**
 * 排序变更触发。defaultSort.dataIndex 找不到时，col 将返回null。
 *
 * ```(col: StkTableColumn<DT> | null, order: Order, data: DT[], sortConfig: SortConfig<DT>)```
 */
onSortChange?: (
    /** 排序的列 */
    col: StkTableColumn<DT> | null, 
    /** 正序/倒序 */
    order: Order,
    /** 排序后的值 */
    data: DT[], 
    sortConfig: SortConfig<DT>
) => void;

```

### Expose
Obtain the component instance via `bind:this` and then call:
```ts
{
    /**
     * 设置表头排序状态
     */
    setSorter,
    /**
     * 重置 sorter 状态
     */
    resetSorter,
    /**
     * 表格排序列顺序
     */
    getSortColumns,
    /**
     * 多列排序状态数组（多列排序模式时使用）
     */
    sortStates,
}
```
For details, see [Expose Instance Methods](/en/main/api/expose)

