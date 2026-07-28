# Table Props テーブル設定
```ts
<StkTable
  ...[props]
/>
```
## API

### width

テーブル幅

```ts
width?: string;
```

### minWidth

最小テーブル幅 @deprecated cssセレクター`.stk-table-main`で設定

```ts
minWidth?: string;
```

### maxWidth

テーブル最大幅 @deprecated cssセレクター`.stk-table-main`で設定

```ts
maxWidth?: string;
```

### stripe

シマシマ条纹

```ts
stripe?: boolean;
```

### fixedMode

table-layout:fixedを使用するか

```ts
fixedMode?: boolean;
```

### headless

ヘッダーを非表示にするか

```ts
headless?: boolean;
```

### theme

テーマ、ライト、ダーク

```ts
theme?: 'light' | 'dark';
```

### rowHeight

行の高さ
- `props.autoRowHeight` が `true` の場合、期待値として計算に使用されます。実際の行の高さには影響しません。

```ts
rowHeight?: number;
```

### autoRowHeight

可変行の高さにするか
- `true`に設定すると、`props.rowHeight` は期待値として計算に使用されます。実際の行の高さには影響しません。

```ts
autoRowHeight?: boolean | {
  /** 预估行高(优先级高于rowHeight) */
  expectedHeight?: number | ((row: DT) => number);
};
```

### rowHover

マウスホバー時の行をハイライトするか

```ts
rowHover?: boolean;
```

### rowActive

選択した行をハイライトするか

```ts
rowActive?: boolean | {
  /** 是否启用行选中功能 default: true */
  enabled?: boolean;
  /** 是否禁用行选中 default: () => false */
  disabled?: (row: DT) => boolean;
  /** 是否可以取消选中 default: true */
  revokable?: boolean;
};
```

### headerRowHeight

ヘッダー行の高さ。default = rowHeight

```ts
headerRowHeight?: number | null;
```

### footerRowHeight

フッター行の高さ。default = rowHeight

```ts
footerRowHeight?: number | string | null;
```

### virtual

仮想スクロール

```ts
virtual?: boolean;
```

### virtualX

横方向仮想スクロール（列幅を設定する必要があります）

```ts
virtualX?: boolean;
```

### columns

テーブル列設定

浅い監視、変更時は参照を修正してください

```ts
columns?: StkTableColumn<any>[];
```

### dataSource

データソース

浅い監視、変更時は参照を修正してください

```ts
dataSource?: any[];
```

### rowKey

行の一意キー（行の一意値はundefinedにできません）

```ts
rowKey?: UniqKeyProp;
```

### colKey

列の一意キー。デフォルト`dataIndex`

```ts
colKey?: UniqKeyProp;
```

### emptyCellText

空値の表示テキスト

```ts
emptyCellText?: string | ((option: { row: DT; col: StkTableColumn<DT> }) => string);
```

### noDataFull

データなしの高さがいっぱいになるか

```ts
noDataFull?: boolean;
```

### showNoData

データなしを表示するか

```ts
showNoData?: boolean;
```

### sortRemote

サーバーサイドソートかどうか、trueの場合はデータをソートしません

```ts
sortRemote?: boolean;
```

### showHeaderOverflow

ヘッダーがオーバーフロー時に...を表示するか

```ts
showHeaderOverflow?: boolean;
```

### showOverflow

ボディがオーバーフロー時に...を表示するか

```ts
showOverflow?: boolean;
```

### showTrHoverClass

行hover classを追加するか

```ts
showTrHoverClass?: boolean;
```

### cellHover

マウスホバー時のセルをハイライトするか

```ts
cellHover?: boolean;
```

### cellActive

選択したセルをハイライトするか

```ts
cellActive?: boolean;
```

### selectedCellRevokable

セルをもう一度クリックして選択を解除できるか (cellActive=true)

```ts
selectedCellRevokable?: boolean;
```

### areaSelection

セル範囲選択（ドラッグ選択）を有効にするか

```ts
areaSelection?: boolean | {
    /** 是否启用区域选择，默认: true */
    enabled?: boolean;
    /** 复制时的单元格文本格式化回调 */
    formatCellForClipboard?: (row, col, rawValue) => string;
    /** 是否启用键盘控制选区移动，默认: true */
    keyboard?: boolean;
    /** 是否启用 Ctrl 多选功能，默认: true */
    ctrl?: boolean;
    /** 是否启用 Shift 扩选功能，默认: true */
    shift?: boolean;
};
```

### headerDrag

ヘッダーをドラッグできるか。コールバック関数をサポート。

```ts
headerDrag?:
  | boolean
  | {
      /**
       * 列交换模式
       * - none - 不做任何事
       * - insert - 插入(默认值)
       * - swap - 交换
       */
      mode?: 'none' | 'insert' | 'swap';
      /** 禁用拖动的列 */
      disabled?: (col: StkTableColumn<DT>) => boolean;
    };
```

### rowClassName

行にclassNameを追加

```ts
rowClassName?: (row: any, i: number) => string;
```

### colResizable

列幅をドラッグできるか（`columns` を設定し、`onupdatecolumns` コールバックと組み合わせる必要があります）
**設定しない** 列のminWidth、**必ず** widthを設定してください
列幅ドラッグ時、各列にはwidthが必要で、minWidth/maxWidthは効果がありません。table widthは"fit-content"になります。
- props.columnsのwidth属性が自動更新されます

```ts
colResizable?: boolean | {
  /** 禁用拖动的列 */
  disabled?: (col: StkTableColumn<DT>) => boolean;
};
```

### colMinWidth

ドラッグ可能な最小列幅

```ts
colMinWidth?: number;
```

### bordered

セル分割線。
デフォルトは横縦両方あり
"h" - 横線のみ
"v" - 縦線のみ
"body-v" - ボディのみ縦線
"body-h" - ボディのみ横線

```ts
bordered?: boolean | 'h' | 'v' | 'body-v' | 'body-h';
```

### autoResize

仮想スクロールの高さと幅を自動再計算。デフォルトtrue
[非反応式]
関数を渡すとリサイズ後のコールバックになります

```ts
autoResize?: boolean | (() => void);
```

### fixedColShadow

固定列の影を表示するか。パフォーマンス節約のため、デフォルトはfalse。

```ts
fixedColShadow?: boolean;
```

### sortConfig

ソート設定

```ts
sortConfig?: {
  /** 空值是否排最下面 */
  emptyToBottom: boolean,
  /** 默认排序（1.初始化时触发 2.排序方向为null时触发) */
  defaultSort?: {
      dataIndex: keyof T;
      order: Order;
  };
  /**
   * string排序是否使用 String.prototype.localCompare
   * 默认true (历史设计问题，为了兼容，默认true)
   */
  stringLocaleCompare?: boolean;
},
```

### hideHeaderTitle

ヘッダーマウスホバーのタイトルを非表示。dataIndex配列を渡せます

```ts
hideHeaderTitle?: boolean | string[];
```

### highlightConfig

ハイライト設定

```ts
highlightConfig?: {
  /** 高亮持续时间(s) */
  duration?: number;
  /** 高亮帧率*/
  fps?: number;
};
```

### seqConfig

番号列設定

```ts
seqConfig?: {
  /** 序号列起始下标 用于适配分页 */
  startIndex?: number;
};
```

### expandConfig

展開行設定

```ts
expandConfig?: {
  height?: number;
};
```

### dragRowConfig

行ドラッグ設定

```ts
dragRowConfig?: {
  mode?: 'none' | 'insert' | 'swap';
};
```

### cellFixedMode

固定ヘッダー、固定列の実装方式。
[非反応式]
relative：固定列はprops.columnsの両端に配置する必要があります。
- 列幅が変更される可能性がある場合は慎重に使用してください。
- 複数レベルヘッダーの固定列は慎重に使用してください

低バージョンブラウザーでは只能是'relative'、

```ts
cellFixedMode?: 'sticky' | 'relative';
```

### smoothScroll

スムーズスクロールするか
- default: chrome < 85 || chrome > 120 ? true : false
- false: wheelイベントでスクロール。スクロール过快による白画面を防止。
- true: wheelイベントを使用しないスクロール。マウスホイールスクロールがよりスムーズに。白画面が発生する可能性あり。

```ts
smoothScroll?: boolean;
```

### scrollRowByRow

整数行単位の縦スクロール
- scrollbar：スクロールバードラッグのみ有効、白画面問題の処理に使用可能

```ts
scrollRowByRow?: boolean | 'scrollbar';
```

### scrollbar

カスタムスクロールバー設定
- false: カスタムスクロールバーを無効化
- true: デフォルト設定のカスタムスクロールバーを有効化
- ScrollbarOptions: カスタムスクロールバーを有効化して設定

```ts
scrollbar?: boolean | {
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
};
```

### treeConfig

ツリー設定

```ts
treeConfig?: {
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点key */
  defaultExpandKeys?: UniqKey[];
  /** 默认展开到第几层 */
  defaultExpandLevel?: number;
};
```

### experimental

実験的機能設定

```ts
experimental?: {
  /** 使用 transform 模拟滚动 */
  scrollY?: boolean;
};
```

### footerData

テーブルフッター合計行データ

```ts
footerData?: DT[];
```
