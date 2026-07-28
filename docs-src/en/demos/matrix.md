# Matrix
<demo solid="demos/Matrix/index.tsx"  github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/Matrix/index.tsx"></demo>

::: tip
Disable the first column hover event using CSS `pointer-event:none`.
:::

## Notes
The table must have a height set, otherwise setting height on the root element in customCell will not work.
```css
:deep(.stk-table .stk-table-main) {
    height: 100%; // 重要，这里必须加高度
}
```
