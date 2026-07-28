# 排序

## 基本排序
列設定で `StkTableColumn['sorter']` を `true` に設定して排序を有効にします。

テーブルヘッダーをクリックして排序をトリガーします。
<demo solid="basic/sort/Sort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/Sort.tsx"></demo>

## カスタム排序
列設定で `StkTableColumn['sorter']` を関数に設定できます。

`sorter(data, { column, order })` を通じて排序ルールをカスタマイズします。

この関数は排序 중에トリガーされ、テーブルは関数の**戻り値**を使用して表示します。

| パラメータ | 型 | 説明 |
| ---- | ---- | ---- |
| data| DataType[] | テーブルデータ。 |
| column | StkTableColumn |  현재 정렬된 열。|
| order | `'desc'` \| `'asc'` \| `null` | 現在の排序方向。|

以下の表では、`レート` 列フィールドのサイズ排序ルールをカスタマイズしています。
<demo solid="basic/sort/CustomSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/CustomSort.tsx"></demo>

より詳細な排序方法については、[カスタム排序](/ja/main/table/advanced/custom-sort) を参照してください。

## sortField 排序フィールド
一部のフィールドでは、年、月、日フィールドなど、独立したフィールドを排序に使用場合があります。この場合、最小単位（日）に変換されたフィールド（例如：年*12+月）を提供できるため、排序が容易になります。`sortField` を通じてこの排序フィールドを指定します。

以下の表の `期間` 列では `期間番号` を排序フィールドとして指定しています。
<demo solid="basic/sort/SortField.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortField.tsx"></demo>

## 空フィールドを排序から除外
`props.sortConfig.emptyToBottom` を設定すると、空のフィールドは常にリストの下部に配置されます
```tsx
<StkTable sortConfig={{ emptyToBottom: true }} />
```
<demo solid="basic/sort/SortEmptyValue.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortEmptyValue.tsx"></demo>

## デフォルト排序列を指定
`props.sortConfig.defaultSort` を設定してデフォルト排序を制御します。
::: warning
デフォルト排序が設定されている場合、**排序が適用されていない**と、**デフォルト排序**フィールドで排序されます。

以下の表の `名前` 列をクリックして、その動作を確認してください。
:::
<demo solid="basic/sort/DefaultSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/DefaultSort.tsx"></demo>

## String.prototype.localCompare を使用した文字列排序
`props.sortConfig.stringLocaleCompare = true` を設定すると、文字列は [`String.prototype.localeCompare`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) を使用して排序されます。

効果：中国語文字はピンインの頭文字に従って排序されます。

## サーバーサイド排序

`props.sortRemote` を `true` に設定すると、コンポーネントの内部排序ロジックがトリガーされません。

テーブルヘッダーをクリックすると、`onsortchange` コールバックがトリガーされます。コールバックでajaxリクエストを開始し、`props.dataSource` を再代入して排序を完了できます。

```tsx
<StkTable sortRemote />
```
<demo solid="basic/sort/SortRemote.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortRemote.tsx"></demo>

## ツリーノードの深い排序
`props.sortConfig.sortChildren = true` を設定すると、テーブルヘッダーをクリックして排序”时に、`children` サブノードも排序されます。

<demo solid="basic/sort/SortChildren.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortChildren.tsx"></demo>

## 複数列排序

`props.sortConfig.multiSort = true` を設定して複数列排序モードを有効にします。

複数列排序モードでは：
- 異なる列をクリックすると、複数の排序条件が同時に維持されます
- 先にクリックされた列が優先順位が高くなります（排序”时先にその列で排序されます）
- 同じ列を再度クリックすると排序方向が切り替わります（降順 → 昇順 → null）
- 3回目のクリックでその列の排序がキャンセルされます
- `props.sortConfig.multiSortLimit` で最大排序列数を制限できます（デフォルト3）

<demo solid="basic/sort/MultiSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/MultiSort.tsx"></demo>

## API
### StkTableColumn 設定

`StkTableColumn` 列設定内の排序関連パラメータ。

```ts
const columns: StkTableColumn[] = [{
    sorter: true,
    sortField: 'xxx',
    sortType: 'number',
    sortConfig: Omit<SortConfig<T>, 'defaultSort'>;
}]
```

| パラメータ | 型 | デフォルト | 説明 |
| ---- | ---- | ---- | ---- |
| sorter | `boolean` \| `((data: T[], option: { order: Order; column: any }) => T[])` | `false` | 排序を有効にするかどうかを指定。`true` の場合は基本排序、関数の場合はカスタム排序ルール。 |
| sortField | `string` | `dataIndex` と同じ | 排序フィールドを指定。表示フィールドとは異なるフィールドで排序する必要がある場合に使用。 |
| sortType | `'string'` \| `'number'` | 自動検出 | 排序タイプを指定。デフォルトで最初の行のデータタイプを自動検出。 |
| sortConfig | `Omit<SortConfig<T>, 'defaultSort'>` | - | 列レベルで排序ルールを設定。グローバルな `props.sortConfig` より優先順位が高い。 |

### props.sortConfig

グローバル排序設定。

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

| パラメータ | 型 | デフォルト | 説明 |
| ---- | ---- | ---- | ---- |
| defaultSort | `object` | - | デフォルト排序設定。初期化時および排序方向がnullの場合にトリガーされます。 |
| defaultSort.key | `string` | - | 列の一意キー。 |
| defaultSort.dataIndex | `string` | - | 排序フィールド、**必須**。 |
| defaultSort.order | `Order` | - | 排序方向: `'asc'` \| `'desc'` \| `null`、**必須**。 |
| defaultSort.silent | `boolean` | `false` | `onsortchange` コールバックのトリガーを無効にするかどうか。 |
| emptyToBottom | `boolean` | `false` | 空の値を常にリストの下部に配置するかどうか。 |
| stringLocaleCompare | `boolean` | `false` | 文字列排序に `localeCompare` を使用するかどうか（中国語文字はピンインに従って排序）。 |
| sortChildren | `boolean` | `false` | ツリーデータの場合、子ノードも排序するかどうか。 |
| multiSort | `boolean` | `false` | 複数列排序モードを有効にするかどうか。 |
| multiSortLimit | `number` | `3` | 複数列排序で許可される最大列数。 |

### onsortchange (sort-change)
コールバック prop 型：
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
`bind:this` でコンポーネントインスタンスを取得してから呼び出します：
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
詳細については、[Expose インスタンスメソッド](/ja/main/api/expose) を参照してください。
