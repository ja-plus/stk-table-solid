# 固定列

`StkTableColumn['fixed'] = 'left'` または `'right'` を設定して、左または右の固定列を実現します。

::: info 新しい固定列インタラクション
テーブルは `sticky` を使用して固定列を実装しているため、**列吸着**機能をサポートしています。任意列を固定列に設定でき、列が可視領域を超えると初めて固定されます。
:::

## 基本

列設定デモ
```typescript{2,6,10}
const columns: StkTableColumn<any>[] = [
    { title: 'Name', dataIndex: 'name', fixed: 'left', width: 100 },
    { title: 'Age', dataIndex: 'age', width: 100 }, 
    { title: 'Address', dataIndex: 'address', width: 200 }, 
    // Gender 列前面的列都必须指定列宽
    { title: 'Gender', dataIndex: 'gender', width: 50, fixed: 'left' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Company', dataIndex: 'company'  },
    { title: 'Operation', dataIndex: 'operation', fixed: 'right', width: 100 },
];

```
::: warning
**固定列**の吸着位置を列幅で計算するために、左固定列より前のすべての列は**widthを指定する必要があります**。

上記のテーブルのように、`性別` 列より前のすべての列はwidthが設定されている必要があります。右固定列也同样です。
:::

<demo solid="basic/fixed/Fixed.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/fixed/Fixed.tsx"></demo>

横スクロールすると、`性別` 列が自動的に左に吸着するのがわかります。

::: tip
すべての左固定列を一番左に配置したい場合は、`columns` 配列の先頭に配置します。同様に、すべての右固定列を `columns` 配列の末尾に配置します。
:::

## 固定列シャドウ

デフォルトでは、固定列にはシャドウ効果はありません。シャドウ効果が必要な場合は、`fixedColShadow` プロパティを `true` に設定できます。

```html
<StkTable fixed-col-shadow></StkTable>
```

## 仮想リスト列固定


<demo solid="basic/fixed/FixedVirtual.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/fixed/FixedVirtual.tsx"></demo>

::: warning
`props.virtualX`（横方向仮想リスト）が設定されている場合、widthが指定されていない列は強制的に100pxになります
:::
