
## Configuration
* `props.colResizable` to enable column width adjustment.
* `props.columns` needs to be used together with the `onupdatecolumns` callback. After adjusting column width, the value of `StkTableColumn['width']` will change directly.
* `columns` needs to be wrapped with `$state` to support reactivity.

```js
<StkTable
    colResizable // [!code ++]
    columns={columns}
    onUpdateColumns={newCols => setColumns(newCols)} // [!code ++]
/>
```

::: warning
After enabling column width adjustment, columns will not fill the container by default.
:::

<demo solid="advanced/column-resize/ColResizable.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/column-resize/ColResizable.tsx"></demo>


## Change Column Width via Event
```ts
/**
 * 列宽变动时触发
 *
 *  ```(col: StkTableColumn<DT>)```
 */
onColResize?: (col: StkTableColumn<DT>) => void;
```

This way, you don't need to configure the `onupdatecolumns` callback; you can manually update the value of `StkTableColumn['width']`.

## Hack to Make Columns Fill Container
If you want columns to fill the container, you can manually set `.stk-table-main` to `flex: 1`, so the table will fill the container.

Then replace `width` with `minWidth` for a column, and this column will automatically occupy the remaining width, while other columns remain at their set widths.

Disable width adjustment for the last column via `props.colResizable.disabled`.

The demo below sets minWidth for the last column.
<demo solid="advanced/column-resize/ColResizableFullHack.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/column-resize/ColResizableFullHack.tsx"></demo>


## API
### props.colResizable:
| type | Description |
| --- | --- | 
| boolean | Whether to enable column width adjustment |
| ColResizableConfig | Configuration |

### ColResizableConfig
| Property | Type | Default | Description |
| --- | --- | ---- | --- |
| disabled | `(col:StkTableColumn) => boolean` | -- | Whether to enable column width adjustment for specific columns |


