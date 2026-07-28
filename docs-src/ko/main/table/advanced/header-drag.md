# 열 드래그 순서 변경

* `headerDrag` 속성을 설정하면 열 드래그 순서 변경 기능이 활성화됩니다.
* `columns` 설정은 `onupdatecolumns` 콜백으로 회수해야 합니다.

```js
<StkTable
    headerDrag // [!code ++]
    columns={columns}
    onUpdateColumns={newCols => setColumns(newCols)} // [!code ++]
/>
```

테이블 헤더를 드래그해 보세요

<demo solid="advanced/header-drag/HeaderDrag.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/header-drag/HeaderDrag.tsx"></demo>

## 이벤트를 통해 순서 변경
```ts
/**
 * 表头列拖动事件
 * ```(dragStartKey: string, targetColKey: string)```
 */
onColOrderChange?: (dragStartKey: string, targetColKey: string) => void;
```

이렇게 하면 `onupdatecolumns` 콜백을 설정할 필요 없이, 수동으로 `columns` 배열의 순서만 업데이트하면 됩니다.

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
