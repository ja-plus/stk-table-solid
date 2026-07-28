# カスタム排序

`StkTableColumn['sorter']` でカスタム排序ルールを設定できます。これはすでに [排序セクション](/ja/main/table/basic/sort#Custom Sorting) で触れました。

この章では、コンポーネントが提供する組み込み排序関数を紹介します。

## setSorter メソッド
コンポーネントインスタンスは `setSorter` メソッドを提供して、ユーザーが手動で排序をトリガーできるようにします。例如：外部ボタンをクリックしてテーブル排序をトリガーします。

```ts
stkTableRef?.setSorter('rate', 'desc');
```
<demo solid="advanced/custom-sort/CustomSort/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/CustomSort/index.tsx"></demo>

### パラメータ説明

```ts
/**
 * 设置表头排序状态。
 * @param colKey 列唯一键字段。如果你想要取消排序状态，请使用`resetSorter`
 * @param order 正序倒序 'asc'|'desc'|null
 * @param option.sortOption 指定排序参数。同 StkTableColumn 中排序相关字段。建议从columns中find得到。
 * @param option.sort 是否触发排序-默认true
 * @param option.silent 是否禁止触发回调-默认true
 * @param option.force 是否触发排序-默认true
 * @returns 返回当前表格数据
 */
function setSorter(
    colKey: string, 
    order: Order,
    option: { 
        sortOption?: SortOption<DT>; 
        force?: boolean; 
        silent?: boolean; 
        sort?: boolean 
    } = {}
): DT[];
```

* `option.force` が true の場合、`props.sortRemote` が true でも排序がトリガーされます。
* `option.silent` が true の場合、`onsortchange` コールバックはトリガーされません。
* `option.sortOption` の目的は、渡された `colKey` が `columns` にない場合に排序パラメータを指定することです。列を非表示にしているがその列のフィールドで排序仍然したい場合は便利です。
    - 最高優先順位：設定されている場合、`colKey` を使用して対応する列を検索して排序することはしません。

## 組み込み排序関数
コンポーネントからエクスポートされる排序関数をインポートして、テーブルの組み込み排序動作と整合させることができます。
```ts
import { tableSort, insertToOrderedArray } from 'stk-table-solid';
```
### tableSort
#### 使用シナリオ
より適切なデータ更新パフォーマンスを得るために、`props.sortRemote` を設定してテーブルの組み込み排序を無効にできます。データを更新するときには、以下に示す `insertToOrderedArray` 関数を使用します。

ヘッダーをクリックして排序をトリガーするとき、仍然組み込み排序を使用したい場合は、`onsortchange` コールバックでこの関数を使用できます。

#### コード例
```ts
// onSortChange={handleSortChange}
function handleSortChange(col: StkTableColumn<any>, order: Order, data: any[], sortConfig: SortConfig<any>) {
    // 可以做其他操作
    setDataSource(tableSort(col, order, data, sortConfig));
}
```

#### パラメータ説明
```ts
/**
 * 表格排序抽离
 * 可以在组件外部自己实现表格排序，组件配置remote，使表格不排序。
 * 使用者在onSortChange事件中自行更改table props 'dataSource'完成排序。
 *
 * sortConfig.defaultSort 会在order为null时生效
 * @param sortOption 列配置
 * @param order 排序方式
 * @param dataSource 排序的数组
 */
export function tableSort<T extends Record<string, any>>(
    sortOption: SortOption<T>,
    order: Order,
    dataSource: T[],
    sortConfig: SortConfig<T> = {},
): T[] 
```

### insertToOrderedArray
リアルタイムでデータが絶えず更新されるシナリオでは、二分挿入を使用すると排序時間を効果的に短縮し、パフォーマンスを向上させることができます。
#### コード例
```ts
setDataSource(insertToOrderedArray(tableSortStore.current, item, dataSource));
```
#### パラメータ説明
```ts
/**
 * 对有序数组插入新数据
 *
 * 注意：不会改变原数组，返回新数组
 * @param sortState 排序状态
 * @param sortState.dataIndex 排序的字段
 * @param sortState.order 排序顺序
 * @param sortState.sortType 排序方式
 * @param newItem 要插入的数据
 * @param targetArray 表格数据
 * @param sortConfig SortConfig参考 https://github.com/ja-plus/stk-table-solid/blob/master/src/StkTable/types/index.ts
 * @param sortConfig.customCompare 自定义比较规则
 * @return targetArray 的浅拷贝
 */
export function insertToOrderedArray<T extends object>(
    sortState: SortState<T>,
    newItem: T,
    targetArray: T[],
    sortConfig: SortConfig<T> & { customCompare?: (a: T, b: T) => number } = {}
): T[] 

```

### 例
以下の例は `tableSort` と `insertToOrderedArray` の使用方法を示しています。クリックして行を挿入し、挿入排序の效果を確認してください。

<demo solid="advanced/custom-sort/InsertSort.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-sort/InsertSort.tsx"></demo>
