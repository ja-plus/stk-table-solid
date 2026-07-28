# Filter <Badge type="warning" text="Beta" />

Filter is a built-in column header filter component. Click the filter icon in the column header to open the filter panel. It supports manually specified options and automatically extracting options from data.

### Basic Usage

Create a Filter component via the `createFilterCell` factory function and use it as `customHeaderCell`.

<demo solid="advanced/custom-cells/FilterCell/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/FilterCell/index.tsx"></demo>

### Auto Extract Options

Set `autoOptions: true`, and Filter will automatically extract unique values from the current column's data as filter options.

```ts
{
    title: t('city'),
    dataIndex: 'city',
    customHeaderCell: Filter({
        autoOptions: true, // 自动从数据提取选项
    }),
}
```

::: tip Limitations
* `autoOptions` is convenient for small datasets. For **large datasets**, a full traversal may cause performance issues.
* Option order is not guaranteed.
:::

### Custom Filter Logic

You can customize the filter logic via the `filter` parameter:

```ts
{
    title: t('age'),
    dataIndex: 'age',
    customHeaderCell: Filter({
        options: [
            { label: '30岁以下', value: 'young' },
            { label: '30岁以上', value: 'old' },
        ],
        filter: ({ row, cellValue, filterValues }) => {
            return filterValues.some(v => {
                if (v === 'young') return cellValue < 30;
                if (v === 'old') return cellValue >= 30;
                return false;
            });
        },
    }),
}
```

<demo solid="advanced/custom-cells/FilterCell/CustomFilter.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/FilterCell/CustomFilter.tsx"></demo>

### createFilterCell Options

The `createFilterCell` factory function accepts a configuration object:

```ts
interface CreateFilterCellOption {
    /** 是否远程筛选，默认 false */
    remote?: boolean;
    /** 筛选状态改变时触发 */
    onChange?: (data: { colKey: UniqKey; status: FilterStatus }) => void;
}
```

| Property | Type | Default | Description |
|---|---|---|---|
| remote | `boolean` | `false` | Whether to use remote filtering, when set to true, automatic data filtering will not be triggered |
| onChange | `(data) => void` | - | Callback when filter status changes, parameters include `colKey` (column key) and `status` (current column filter status) |

### Configuration Options

`FilterComponent` accepts a configuration object:

```ts
interface FilterComponentConfig {
    options?: FilterOption[];       // 筛选选项列表
    filter?: (args) => boolean;     // 自定义筛选函数
    autoOptions?: boolean;          // 是否自动从数据提取选项，默认 false
}

interface FilterOption {
    label: string;     // 显示文本
    value: any;        // 筛选值
    selected?: boolean; // 是否默认选中
}
```

### FilterStatus Type

```ts
interface FilterStatus {
    /** 当前选中的筛选值数组 */
    value: any[];
    /** 自定义筛选逻辑函数 */
    filter?: (args: { row: any; cellValue: any; filterValues: any[] }) => boolean;
}
```
