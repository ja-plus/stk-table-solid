# Snippets

| snippet | props | 説明 |
| ---- | ---- | ---- |
| `tableHeader` | `{col}` | テーブルヘッダー、カスタムHeaderCellを使用することをお勧めします。バッチで複数のテーブルヘッダーをカスタマイズするときはこのsnippetの方が便利です。 |
| `empty` | -- | 空データ状態 |
| `expand` |  `{col, row}` | 展開行 |
| `customBottom` | -- | テーブル下部 |

::: info
セルをカスタマイズしたい場合は、`StkTableColumn['customCell']` プロパティを使用してください。
:::


## customBottom

<demo solid="api/slots/CustomBottom.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/api/slots/CustomBottom.tsx"></demo>

::: tip
`customBottom` を使用してテーブル下部に要素を追加でき、`IntersectionObserver` を使用してテーブル下部にスクロールされたかどうかを監視できます。
:::
