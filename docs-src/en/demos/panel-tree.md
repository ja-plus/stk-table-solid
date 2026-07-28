# Panel Tree
## Demo
<demo solid="demos/PanelTree/index.tsx"  github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/PanelTree/index.tsx"></demo>

## Key Points
### Disable Selection for Expandable Rows
Configure the `disabled` function in `rowActive` to disable selection when a row has children.
### Remove Hover Style for Expandable Rows
1. Configure `rowClassName` to add the `panel-header-row` class name when a row has children.
2. Configure `panel-header-row` -> `--tr-hover-bgc: var(--th-bgc);` to maintain consistency with the header background color.
### Remove '--' for Expandable Rows
Configure `emptyCellText` to return an empty string when a row has children.
### Text Overflow for Expandable Rows
Remove the default text overflow style through CSS.
```css
:deep(.panel-title > div) {
    white-space: nowrap;
    overflow: initial;
}
```
