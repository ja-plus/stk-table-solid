# スクロールバー

## スタイル
コンポーネントはデフォルトで**ネイティブスクロールバー**を使用し、ブラウザのスクロールバースタイルに完全に依存します。

スクロールバースタイルをカスタマイズする必要がある場合は、CSS介して行うことができます。`class` を `StkTable` ノードに追加します。

```tsx
<StkTable className="scrollbar" />
```
```css
.scrollbar::-webkit-scrollbar {
    /* ..... */
}
```

以下の例では `::-webkit-scrollbar` を使用してスクロールバーのスタイルを設定しています。

<demo solid="basic/scrollbar-style/ScrollbarStyle.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/scrollbar-style/ScrollbarStyle.tsx"></demo>

`Blink` または `webkit` エンジンを使用するブラウザ（Chrome、Safari、Opera）で効果的です（[::-webkit-scrollbar | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar) を参照）。

## 組み込みスクロールバー

DOM実装の組み込みスクロールバー、`props.scrollbar` を介して有効にします。

<span style="color: #ff9800;">スクロール時の白屏問題を解決できます。</span>

```ts 
<StkTable 
  virtual
  scrollbar //[!code ++]
></StkTable>
<StkTable
  virtual
  :scrollbar="{ width: 10, height: 10 }" // [!code ++]
></StkTable>
```
::: tip 注意
* 仮想スクロール（`virtual`）を使用している場合にのみ効果的です。
* モバイル端末では効果ありません。
:::

<demo solid="basic/scrollbar-style/CustomScrollbar.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/scrollbar-style/CustomScrollbar.tsx"></demo>

### APIリファレンス

#### ScrollbarOptions 型

```typescript
interface ScrollbarOptions {
  /** 是否启用滚动条 */
  enabled?: boolean;
  /** 垂直滚动条宽度 default: 8 */
  width?: number;
  /** 水平滚动条高度 default: 8 */
  height?: number;
  /** 滚动条滑块最小宽度 default: 20 */
  minWidth?: number;
  /** 滚动条滑块最小高度 default: 20 */
  minHeight?: number;
}
```

### スタイルカスタマイズ

CSS変数を使用してスクロールバーの外観をカスタマイズできます：

```css
.stk-table {
  --scrollbar-thumb-color: #c1c1d7;
  --scrollbar-thumb-hover-color: #a8a8c1;
  --scrollbar-track-color: transparent;
}

/* 深色主题 */
.stk-table.dark {
  --scrollbar-thumb-color: rgba(93, 96, 100, .9);
  --scrollbar-thumb-hover-color: #727782;
}
```

## キースクロール

| キー | 説明 | 機能 |
| --- | --- | --- |
| `ArrowUp` | 上矢印キー | 1行上にスクロール |
| `ArrowDown`| 下矢印キー | 1行下にスクロール |
| `ArrowLeft`| 左矢印キー | 50px左にスクロール |
| `ArrowRight`| 右矢印キー | 50px右にスクロール |
| `PageUp`| -- | 1ページ上にスクロール |
| `PageDown`| -- | 1ページ下にスクロール |
| `Home`| -- | 先頭までスクロール |
| `End`| -- | 末尾までスクロール |
