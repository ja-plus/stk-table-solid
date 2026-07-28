# Header Drag

* Configure the `headerDrag` property to enable column dragging for reordering.
* `columns` needs to be configured with the `onupdatecolumns` callback to write back.

```js
<StkTable
    headerDrag // [!code ++]
    columns={columns}
    onUpdateColumns={newCols => setColumns(newCols)} // [!code ++]
/>
```

Try dragging the headers

<demo solid="advanced/header-drag/HeaderDrag.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/header-drag/HeaderDrag.tsx"></demo>

## Change Order via Event
```ts
/**
 * 表头列拖动事件
 * ```(dragStartKey: string, targetColKey: string)```
 */
onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
```

This way, you don't need to configure the `onupdatecolumns` callback; you can manually update the order of the `columns` array.

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
