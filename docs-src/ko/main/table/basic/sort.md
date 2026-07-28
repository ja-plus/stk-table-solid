# 정렬


## 기본 정렬
열 설정에서 `StkTableColumn['sorter']`를 `true`로 설정하면 정렬이 활성화됩니다.

테이블 헤더를 클릭하면 정렬이 트리거됩니다.
<demo solid="basic/sort/Sort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/Sort.tsx"></demo>

## 커스텀 정렬
열 설정에서 `StkTableColumn['sorter']`를 함수로 설정할 수 있습니다.

`sorter(data, { column, order })`를 통해 커스텀 정렬 규칙을 정의합니다.

이 함수는 정렬 시에 트리거되며, 테이블은 함수의 **반환값**을 사용하여 표시합니다.

| 매개변수 | 타입 | 설명 |
| ---- | ---- | ---- |
| data| DataType[] | 테이블의 데이터. |
| column | StkTableColumn | 현재 정렬 중인 열. |
| order | `'desc'` \| `'asc'` \| `null` | 현재 정렬 순서. |

다음 표에서 `Rate` 열 필드의 커스텀 크기 정렬 규칙을 정의합니다.
<demo solid="basic/sort/CustomSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/CustomSort.tsx"></demo>

더 많은 정렬 사용법은 [커스텀 정렬](/ko/main/table/advanced/custom-sort)을 참고하세요.

## sortField 정렬 필드
일부 필드는 독립적인 필드로 정렬될 수 있습니다, 예를 들어 년, 월, 일 필드의 경우. 이 경우 정렬 전용 필드를 제공할 수 있으며, 년과 월을 최소 단위인 일로 변환하여 정렬을 용이하게 합니다. 이때 `sortField` 를 통해 해당 정렬 필드를 지정합니다.

다음 표에서 `period` 열은 `periodNumber`를 정렬 필드로 지정했습니다.
<demo solid="basic/sort/SortField.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortField.tsx"></demo>

## 빈 필드 정렬 제외
`props.sortConfig.emptyToBottom`를 설정하면 빈 필드가 항상 리스트 하단에 배치됩니다
```tsx
<StkTable sortConfig={{ emptyToBottom: true }} />
```
<demo solid="basic/sort/SortEmptyValue.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortEmptyValue.tsx"></demo>

## 기본 정렬 열 지정
`props.sortConfig.defaultSort`를 설정하여 기본 정렬을 제어합니다.
::: warning
기본 정렬을 설정하면, **정렬되지 않은 경우** **기본 정렬** 필드가 정렬됩니다.

아래 표의 `이름` 열을 클릭하여 정렬 동작을 관찰하세요.
:::
<demo solid="basic/sort/DefaultSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/DefaultSort.tsx"></demo>

## localCompare 를 사용한 문자열 정렬
`props.sortConfig.stringLocaleCompare = true`를 설정하면 [`String.prototype.localeCompare`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) 를 사용하여 문자열을 정렬합니다.

작용: 중국어는 병음 첫 글자순으로 정렬됩니다.

## 서버측 정렬

`props.sortRemote`를 `true`로 설정하면 컴포넌트 내부의 정렬 로직이 트리거되지 않습니다.

테이블 헤더를 클릭하면 `onsortchange` 콜백이 트리거되며, 콜백에서 ajax 요청을 보내고 `props.dataSource` 를 다시 할당하여 정렬을 완료할 수 있습니다.

```tsx
<StkTable sortRemote />
```
<demo solid="basic/sort/SortRemote.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortRemote.tsx"></demo>

## 트리 노드 깊이 정렬
`props.sortConfig.sortChildren = true`를 설정하면 테이블 헤더를 클릭하여 정렬할 때 `children` 하위 노드도 정렬됩니다.

<demo solid="basic/sort/SortChildren.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/SortChildren.tsx"></demo>

## 다중 열 정렬

`props.sortConfig.multiSort = true`를 설정하면 다중 열 정렬 모드가 활성화됩니다.

다중 열 정렬 모드에서:
- 다른 열을 클릭하면 여러 정렬 조건이 동시에 유지됩니다
- 먼저 클릭한 열이 더 높은 우선순위를 가집니다 (정렬 시 해당 열 먼저 정렬)
- 동일한 열을 다시 클릭하면 정렬 방향이 전환됩니다 (desc → asc → null)
- 세 번째 클릭하면 해당 열 정렬이 취소됩니다
- `props.sortConfig.multiSortLimit`으로 최대 정렬 열 수를 제한할 수 있습니다 (기본값 3)

<demo solid="basic/sort/MultiSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/sort/MultiSort.tsx"></demo>

## API
### StkTableColumn 열 설정

`StkTableColumn` 열 설정에서 정렬 관련 매개변수.

```ts
const columns: StkTableColumn[] = [{
    sorter: true,
    sortField: 'xxx',
    sortType: 'number',
    sortConfig: Omit<SortConfig<T>, 'defaultSort'>;
}]
```

| 매개변수 | 타입 | 기본값 | 설명 |
| ---- | ---- | ---- | ---- |
| sorter | `boolean` \| `((data: T[], option: { order: Order; column: any }) => T[])` | `false` | 정렬 활성화 여부를 지정합니다. `true`이면 기본 정렬이 활성화됩니다; 함수이면 커스텀 정렬 규칙을 사용합니다. |
| sortField | `string` | `dataIndex`와 동일 | 정렬 필드를 지정합니다. 표시 필드와 다른 데이터로 정렬해야 할 때 사용합니다. |
| sortType | `'string'` \| `'number'` | 자동 감지 | 정렬 타입을 지정합니다. 기본적으로 해당 열 첫 번째 행의 데이터 타입을 자동 감지합니다. |
| sortConfig | `Omit<SortConfig<T>, 'defaultSort'>` | - | 현재 열의 정렬 규칙을 설정하며, 전역 `props.sortConfig`보다 우선순위가 높습니다. |

### props.sortConfig

전역 정렬 설정.

```ts
type SortConfig<T extends Record<string, any>> = {
    /**
     * 默认排序（1.初始化时触发 2.排序方向为null时触发）
     * 类似 onMounted 时调用 setSorter 点了下表头
     */
    defaultSort?: {
        /** 列唯一键，如果配置了 props.colKey 则这里表示列唯一键的值 */
        key?: StkTableColumn<T>['key'];
        /** 排序字段 */
        dataIndex: StkTableColumn<T>['dataIndex'];
        /** 排序方向 */
        order: Order;
        /** 指定排序字段 */
        sortField?: StkTableColumn<T>['sortField'];
        /** 排序类型 */
        sortType?: StkTableColumn<T>['sortType'];
        /** 自定义排序函数 */
        sorter?: StkTableColumn<T>['sorter'];
        /** 是否禁止触发 onSortChange 事件，默认 false */
        silent?: boolean;
    };
    /** 空值始终排在列表末尾 */
    emptyToBottom?: boolean;
    /** 使用 String.prototype.localeCompare 对字符串排序，默认 false */
    stringLocaleCompare?: boolean;
    /** 是否对子节点也进行排序，默认 false */
    sortChildren?: boolean;
    /** 是否启用多列排序，默认 false */
    multiSort?: boolean;
    /** 多列排序时的最大列数限制，默认 3 */
    multiSortLimit?: number;
};
```

| 매개변수 | 타입 | 기본값 | 설명 |
| ---- | ---- | ---- | ---- |
| defaultSort | `object` | - | 기본 정렬 설정. 초기화 시와 정렬 방향이 null일 때 트리거됩니다. |
| defaultSort.key | `string` | - | 열 고유 키. |
| defaultSort.dataIndex | `string` | - | 정렬 필드, **필수**. |
| defaultSort.order | `Order` | - | 정렬 방향: `'asc'` \| `'desc'` \| `null`, **필수**. |
| defaultSort.silent | `boolean` | `false` | `onsortchange` 콜백 트리거 금지 여부. |
| emptyToBottom | `boolean` | `false` | 빈 값이 항상 리스트 하단에 배치되는지 여부. |
| stringLocaleCompare | `boolean` | `false` | `localeCompare`를 사용하여 문자열 정렬 여부 (중국어 병음 정렬). |
| sortChildren | `boolean` | `false` | 트리 데이터에서 하위 노드도 정렬할지 여부. |
| multiSort | `boolean` | `false` | 다중 열 정렬 모드를 활성화할지 여부. |
| multiSortLimit | `number` | `3` | 다중 열 정렬 시 최대 열 수 제한. |

### onsortchange (sort-change)
콜백 prop 타입:
```ts
/**
 * 排序变更触发。defaultSort.dataIndex 找不到时，col 将返回null。
 *
 * ```(col: StkTableColumn<DT> | null, order: Order, data: DT[], sortConfig: SortConfig<DT>)```
 */
onSortChange?: (
    /** 排序的列 */
    col: StkTableColumn<DT> | null, 
    /** 正序/倒序 */
    order: Order,
    /** 排序后的值 */
    data: DT[], 
    sortConfig: SortConfig<DT>
) => void;

```

### Expose
`bind:this`로 컴포넌트 인스턴스를 가져온 후 호출:
```ts
{
    /**
     * 设置表头排序状态
     */
    setSorter,
    /**
     * 重置 sorter 状态
     */
    resetSorter,
    /**
     * 表格排序列顺序
     */
    getSortColumns,
    /**
     * 多列排序状态数组（多列排序模式时使用）
     */
    sortStates,
}
```
세부 사항은 [Expose 인스턴스 메서드](/ko/main/api/expose)를 참고하세요.
