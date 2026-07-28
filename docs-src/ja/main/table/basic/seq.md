# シーケンス列

`StkTableColumn['type']` を `seq` に設定して、コンポーネントの組み込みシーケンス列を使用します。

::: tip
シーケンス列は排序の影響を受けず、`props.dataSource` の配列インデックスに基づいて表示されます。
:::

```ts
const columns: StkTableColumn<any>[] = [
    { type: 'seq', width: 50, dataIndex: '', title: '序号' }, // [!code ++]
    { title: 'Name', dataIndex: 'name', sorter: true },
    { title: 'Age', dataIndex: 'age', sorter: true },
    { title: 'Address', dataIndex: 'address', sorter: true },
    { title: 'Gender', dataIndex: 'gender', sorter: true },
];
```

ここでは、`seq` 列の `dataIndex` が空であることがわかります。这是因为 `dataIndex` は値フィールドだけでなく、{#each}レンダリングのキーとしても使用されるからです。シーケンス列にはキーが必要ないため、空のままにしています。**重複しないように注意してください**。

<demo solid="basic/seq/Seq.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/seq/Seq.tsx"></demo>


## カスタムシーケンス
`props.seqConfig.startIndex` を設定して、シーケンスの開始値を指定できます。

これは特にページネーションに便利です。

<demo solid="basic/seq/SeqStartIndex.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/seq/SeqStartIndex.tsx"></demo>
