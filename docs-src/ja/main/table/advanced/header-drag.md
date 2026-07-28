# ヘッダードラッグ

* `headerDrag` プロパティを設定して、列ドラッグ並べ替えを有効にします。
* `columns` は `onupdatecolumns` コールバックで書き戻すように設定する必要があります。

```js
<StkTable
    headerDrag // [!code ++]
    columns={columns}
    onUpdateColumns={newCols => setColumns(newCols)} // [!code ++]
/>
```

ヘッダーをドラッグしてみてください

<demo solid="advanced/header-drag/HeaderDrag.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/header-drag/HeaderDrag.tsx"></demo>

## イベントで順序を変更
```ts
/**
 * 表头列拖动事件
 * ```(dragStartKey: string, targetColKey: string)```
 */
onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
```

この方法では、`onupdatecolumns` コールバックを設定する必要はありません。`columns` 配列の順序を手動で更新できます。

## API

### props.headerDrag

```ts
/** header drag config */
export type HeaderDragConfig<DT extends Record<string, any> = any> =
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

### emit
```ts
/**
 * 表头列拖动事件
 * ```(dragStartKey: string, targetColKey: string)```
 */
onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
/**
 * 表头列拖动开始
 * ```(dragStartKey: string)```
 */
onThDragStart?: (dragStartKey: string) => void;
/**
 * 表头列拖动drop
 * ```(targetColKey: string)```
 */
onThDrop?: (targetColKey: string) => void;
```
