# CheckboxCell <Badge type="warning" text="Beta" />

CheckboxCell is a built-in checkbox cell component that supports select-all and indeterminate states at the cell level.

### Basic Usage

Create `CheckboxCell` and `CheckboxAllCell` components via the `createCheckboxCell` factory function, and use them as `customCell` and `customHeaderCell` respectively.

<demo solid="advanced/custom-cells/CheckboxCell/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/CheckboxCell/index.tsx"></demo>

### Using Third-party Components

You can pass a UI library's Checkbox component via `checkboxComponent` to maintain consistent styling.

<demo solid="advanced/custom-cells/CheckboxCell/CheckboxComponentCell.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/CheckboxCell/CheckboxComponentCell.tsx"></demo>

### createCheckboxCell Options

The `createCheckboxCell` factory function accepts a configuration object:

```ts
interface createCheckboxCellOptions<T = any> {
    /** 行数据中表示选中状态的字段名，默认 '_isChecked' */
    field?: string;
    /** 自定义 checkbox 组件（如 Ant Design / Material UI 的 Checkbox） */
    checkboxComponent?: any;
    /** 单元格 checkbox 状态变更回调 */
    onChange?: (checked: boolean, row: T) => void;
    /** 全选 checkbox 状态变更回调 */
    onSelectAll?: (checked: boolean) => void;
}
```

| Property | Type | Default | Description |
|---|---|---|---|
| field | `string` | `'_isChecked'` | Field name in row data for checked state |
| checkboxComponent | `Component` | - | Custom checkbox component, uses native input[type=checkbox] if not provided |
| onChange | `(checked, row) => void` | - | Callback when cell checkbox state changes |
| onSelectAll | `(checked) => void` | - | Callback when select all checkbox state changes |
