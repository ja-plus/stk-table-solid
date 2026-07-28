# リアルタイムセル結合

`areaSelection`（範囲選択）機能で複数のセルを選択し、右クリックでメニューを開いてセルをリアルタイムに結合/分割できます。

## 実装アプローチ

1. `areaSelection` 範囲選択機能を有効にし、`onareaselectionchange` イベントを監視して選択範囲を取得
2. `onrowmenu` イベント（右クリック）を監視し、[ja-contextmenu](https://www.npmjs.com/package/ja-contextmenu) でコンテキストメニューを表示
3. 「セル結合」クリック時に選択範囲を `rowspan`/`colspan` 情報に変換して Map に保存
4. 列設定の `mergeCells` コールバックが Map から結合情報を読み取って返す
5. 「セル分割」クリック時に選択範囲内の結合情報を削除

<demo solid="demos/RealtimeMergeCells/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/RealtimeMergeCells/index.tsx"></demo>

## コアロジック

```typescript
// 合并状态存储 key: `${rowId}__${colIndex}` value: { rowspan, colspan }
const mergeMap = new Map<string, { rowspan: number; colspan: number }>();

// 列配置中的 mergeCells 回调
function mergeCells({ row, col }) {
  const colIndex = columns.findIndex(c => c.dataIndex === col.dataIndex);
  return mergeMap.get(`${row.id}__${colIndex}`);
}

// 合并选中的单元格
function mergeSelectedCells() {
  const range = selectionRanges().at(-1);
  const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
  const startRow = dataSource()[minRow];

  // 清除范围内已有的合并信息，避免冲突
  for (let r = minRow; r <= maxRow; r++)
    for (let c = minCol; c <= maxCol; c++)
      mergeMap.delete(`${dataSource()[r].id}__${c}`);

  // 在左上角单元格设置合并信息
  mergeMap.set(`${startRow.id}__${minCol}`, {
    rowspan: maxRow - minRow + 1,
    colspan: maxCol - minCol + 1,
  });

  // 强制表格重新渲染
  setDataSource(ds => ds.slice());
}

// 拆分选中的单元格
function splitSelectedCells() {
  for (const range of selectionRanges()) {
    const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
    for (let r = minRow; r <= maxRow; r++)
      for (let c = minCol; c <= maxCol; c++)
        mergeMap.delete(`${dataSource()[r].id}__${c}`);
  }
  setDataSource(ds => ds.slice());
}
```

::: tip ヒント
1. 結合後は左上のセルの内容のみ表示されます。覆われたセルのデータはデータソースに保持され、分割後に復元されます
2. 新しい結合操作は選択範囲内の既存の結合情報を自動的にクリアし、競合を回避します
3. この方法は仮想スクロールモードでも使用できます
:::
