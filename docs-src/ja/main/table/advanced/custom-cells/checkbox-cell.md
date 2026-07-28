# CheckboxCell  チェックボックス <Badge type="warning" text="Beta" />

CheckboxCell は、セルレベルで全選択/半選択機能をサポートする組み込みのチェックボックスセルコンポーネントです。

### 基本的な使い方

`createCheckboxCell` ファクトリ関数を使用して `CheckboxCell` と `CheckboxAllCell` コンポーネントを作成し、それぞれ `customCell` と `customHeaderCell` として使用します。

<demo solid="advanced/custom-cells/CheckboxCell/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/CheckboxCell/index.tsx"></demo>

### サードパーティコンポーネントの使用

`checkboxComponent` にUIライブラリの Checkbox コンポーネントを渡して、プロジェクト全体のスタイルを統一することができます。

<demo solid="advanced/custom-cells/CheckboxCell/CheckboxComponentCell.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/CheckboxCell/CheckboxComponentCell.tsx"></demo>

### createCheckboxCell オプション

`createCheckboxCell` ファクトリ関数は設定オブジェクトを受け取ります：

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

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| field | `string` | `'_isChecked'` | 行データ内の選択状態を表すフィールド名 |
| checkboxComponent | `Component` | - | カスタムチェックボックスコンポーネント、未指定時はネイティブ input[type=checkbox] を使用 |
| onChange | `(checked, row) => void` | - | セルチェックボックス状態変更時のコールバック |
| onSelectAll | `(checked) => void` | - | 全選択チェックボックス状態変更時のコールバック |
