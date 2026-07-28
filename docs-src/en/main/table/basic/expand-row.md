# Row Expansion

Add `type: 'expand'` to column configuration to set the column as a built-in expandable cell.
Then configure snippet `expand({ row, col })` to set the expanded content.

::: warning
Currently, if expandable rows are configured, the virtual list calculates the top distance by accumulating row heights starting from the first data item, which may cause performance issues when there is a large amount of data.
:::
## Example

### Basic Expansion
<demo solid="basic/expand-row/ExpandRow.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/expand-row/ExpandRow.tsx"></demo>

### Custom Expansion Cell
<demo solid="basic/expand-row/CustomExpandRow.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/expand-row/CustomExpandRow.tsx"></demo>

## API
### StkTableColumn Configuration
`StkTableColumn['type'] = 'expand'` to set the column as expandable.

```ts
const columns = [
    { type: 'expand', dataIndex: '', title: '' }
]

```

### snippet 
`{#snippet expand({ row, col })}` Set the content of the expanded row.

```html
<StkTable>
    <template #expand="{ row, col }">
        {{ row[col.dataIndex]}}
    </template>
</StkTable>
```

| snippet prop | Description |
| ---- | ---- |
| row | Data of the expanded row |
| col | Column that triggers row expansion |


### props
`props.expandConfig`
| Property | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| height | number | Table row height | Height of the expanded row |

### expose
You can call the example method to expand or collapse a row.
```ts
/**
 * 展开或收起某一行
 * @param rowKeyOrRow 行唯一键或行对象
 * @param expand 是否展开
 * @param data.col 列配置
 * @param data.silent 设为true则不触发 `onToggleRowExpand`, 默认:false
 */
setRowExpand(
    rowKeyOrRow: string | undefined | DT,
    expand?: boolean,
    data?: { 
        col?: StkTableColumn<DT>; 
        silent?: boolean 
    }
):void
```
