# マトリックス
<demo solid="demos/Matrix/index.tsx"  github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/Matrix/index.tsx"></demo>

::: tip
CSS `pointer-event:none` を使用して最初の列ホバーイベントを無効化します。
:::

## 注意事項
テーブルには高さが設定されている必要があります。そうしないと、customCellでルート要素に高さを設定しても機能しません。
```css
.stk-table .stk-table-main {
    height: 100%; /* 重要、ここで高さを設定する必要があります */
}
```
