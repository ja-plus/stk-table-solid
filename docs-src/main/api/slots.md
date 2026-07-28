# Slots 插槽

Solid 中通过 `xxxSlot` prop 传入插槽内容。

| slots | props | describe |
| ---- | ---- | ---- |
| `tableHeaderSlot` | `(col)` | 表头，一般推荐使用 customHeaderCell 。这个插槽，在批量自定义表头的时候会更方便。 |
| `emptySlot` | -- | 空数据状态 |
| `expandSlot` | `(row, col)` | 展开行 |
| `customBottomSlot` | -- | 表格底部。 |

::: info
如果您想自定义单元格，请使用 `StkTableColumn['customCell']` 属性。
:::


## customBottomSlot

<demo solid="api/slots/CustomBottom.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/api/slots/CustomBottom.tsx"></demo>

::: tip
`customBottomSlot` 可用于在表格底部加一个元素，使用 `IntersectionObserver` 监听是否滚动到表格底部。
:::
