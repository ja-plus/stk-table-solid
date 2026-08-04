# ツリー

2ステップでツリー機能を有効にします

1. `StkTableColumn['type']` を `tree-node` に設定して、ツリー展開ボタンの位置を指定します
```ts
const columns: StkTableColumn<any>[] = [
    { type: 'tree-node', title: 'Area', dataIndex: 'area' },
]
```

2. データソースに `children` フィールドを追加します。クリック後、データ内の `children` フィールドのコンテンツが子ノードとして表示されます。
```ts
export const getDataSource = () => [ 
    {
        area: 'Asia',
        gdp: 10000,
        population: 50000000,
        gdpPerCapita: 20000,
        children: [
            { area: 'China', gdp: 5000, population: 1400000000, gdpPerCapita: 35000, }, 
            { area: 'Japan', gdp: 4000, population: 126000000, gdpPerCapita: 33000, }
        ],
    },
];
```

## シンプルツリー

<demo solid="basic/tree/Tree.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/Tree.tsx"></demo>

## デフォルト展開ノード

::: warning 
`props.treeConfig` で設定された展開は、テーブルが最初にレンダリングされるときのみ有効です。

非同期データの場合は、[expose.setTreeExpand()](/ja/main/api/expose.html#settreeexpand) 関数を使用して制御してください。
:::

### すべて展開
`treeConfig.defaultExpandAll = true`

<demo solid="basic/tree/TreeDefaultExpandAll.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/TreeDefaultExpandAll.tsx"></demo>

### 特定レベルまで展開
`treeConfig.defaultExpandLevel = 1`

<demo solid="basic/tree/TreeDefaultExpandLevel.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/TreeDefaultExpandLevel.tsx"></demo>

### 特定ノードを展開
`treeConfig.defaultExpandedKeys = ['アジア', '中国', '浙江']`

下の `Toggle China` ボタンは、[setTreeExpand()](/ja/main/api/expose.html#settreeexpand) を使用して `China` 行の展開/折りたたみを制御します。

<demo solid="basic/tree/TreeDefaultExpandKeys.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/TreeDefaultExpandKeys.tsx"></demo>

### 手動でノードを展開

[setTreeExpand](/ja/main/api/expose.html#settreeexpand) メソッドを使用して、ノードの展開/折りたたみを手動で制御します。

以下の例は、さまざまなパラメータの使用方法を示しています：
- `Toggle All`：すべてのルートノードの展開/折りたたみ状態を切り替えます（`dataSource` 配列全体を渡す、`{ all: true }`）
- `Collapse All`：すべてのルートノードを折りたたみます（`dataSource` 配列全体を渡す、`{ all: true, expand: false }`）
- `Toggle Asia`：Asia ノードの展開/折りたたみ状態を切り替えます
- `Expand All Asia`：Asia のすべての子孫ノードを展開します（`{ expand: true, all: true }`）
- `Collapse All Asia`：Asia のすべての子孫ノードを折りたたみます（`{ expand: false, all: true }`）
- `Expand Asia to Level 2`：Asia をレベル 2 まで展開します（`{ expand: true, level: 2 }`）
- `Collapse Asia to Level 1`：Asia をレベル 1 まで折りたたみます（`{ expand: false, level: 1 }`）
- `Expand Parents of Zhejiang`：Zhejiang のすべての親ノード（Asia → China）を自動的に展開します。Zhejiang 自身は子ノード Hangzhou を持つため、合わせて展開されます（`{ parents: true }`）
- `Collapse Parents of Zhejiang`：Zhejiang のすべての親ノードを折りたたみます（`{ parents: true, expand: false }`）

<demo solid="basic/tree/TreeSetExpand.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/TreeSetExpand.tsx"></demo>


## 仮想リスト

<demo solid="basic/tree/TreeVirtualList.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/tree/TreeVirtualList.tsx"></demo>

::: warning 注意
コンポーネントは各行のdataSourceに `__T_EXP__` フィールドを注入して、展開されているかどうかを制御します。行のデータを更新するときにこのフィールドを変更しないでください。因此、例ではObject.assignを使用してデータを更新しています。
:::

::: warning パフォーマンス注意
仮想リストがあっても、`props.dataSource` の変更ごとにコンポーネントが内部でdataSourceを走査してデータをフラット化します。因此、频繁に変わるデータについては、より多くのコンピュータ計算リソースを占有します。
特定のパフォーマンス要件がある場合は、[例 - 大量データ](/ja/demos/huge-data) を参照してツリー展開ロジックを自分で実装できます。
:::

## 排序
デフォルトでは、テーブルヘッダーをクリックして排序”时、現在のレベルのデータのみが排序されます。子ノードも排序する必要がある場合は、`sortConfig.sortChildren = true` を設定する必要があります。

詳細については、[排序](/ja/main/table/basic/sort) を参照してください。
