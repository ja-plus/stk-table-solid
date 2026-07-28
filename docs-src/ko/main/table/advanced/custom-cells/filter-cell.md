# Filter 필터 <Badge type="warning" text="Beta" />

Filter는 내장된 열 헤더 필터 컴포넌트입니다. 열 헤더의 필터 아이콘을 클릭하면 필터 패널이 열리며, 수동으로 옵션을 지정하거나 데이터에서 자동으로 옵션을 추출하는 것을 지원합니다.

### 기본 사용법

`createFilterCell` 팩토리 함수로 Filter 컴포넌트를 생성하고 `customHeaderCell`로 사용합니다.

<demo solid="advanced/custom-cells/FilterCell/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/FilterCell/index.tsx"></demo>

### 옵션 자동 추출

`autoOptions: true`를 설정하면, Filter가 현재 열의 데이터에서 중복을 제거한 값을 자동으로 추출하여 필터 옵션으로 사용합니다.

```ts
{
    title: t('city'),
    dataIndex: 'city',
    customHeaderCell: Filter({
        autoOptions: true, // 自动从数据提取选项
    }),
}
```

::: tip 한계점
* `autoOptions`는 소량 데이터에서 개발 편의성을 위해 사용됩니다. **대량 데이터**의 경우 전체 순회가 필요하여 성능 문제가 발생할 수 있습니다.
* 옵션 순서가 고정되지 않습니다.
:::

### 필터 로직 커스터마이징

`filter` 매개변수를 통해 필터 로직을 커스터마이징할 수 있습니다:

```ts
{
    title: t('age'),
    dataIndex: 'age',
    customHeaderCell: Filter({
        options: [
            { label: '30岁以下', value: 'young' },
            { label: '30岁以上', value: 'old' },
        ],
        filter: ({ row, cellValue, filterValues }) => {
            return filterValues.some(v => {
                if (v === 'young') return cellValue < 30;
                if (v === 'old') return cellValue >= 30;
                return false;
            });
        },
    }),
}
```

<demo solid="advanced/custom-cells/FilterCell/CustomFilter.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/custom-cells/FilterCell/CustomFilter.tsx"></demo>

### createFilterCell 옵션

`createFilterCell` 팩토리 함수는 설정 객체를 받습니다:

```ts
interface CreateFilterCellOption {
    /** 是否远程筛选，默认 false */
    remote?: boolean;
    /** 筛选状态改变时触发 */
    onChange?: (data: { colKey: UniqKey; status: FilterStatus }) => void;
}
```

| 속성 | 타입 | 기본값 | 설명 |
|---|---|---|---|
| remote | `boolean` | `false` | 원격 필터링 사용 여부, true 설정 시 자동 데이터 필터링이 트리거되지 않습니다 |
| onChange | `(data) => void` | - | 필터 상태 변경 시 콜백, 매개변수에 `colKey`(열 키)와 `status`(현재 열 필터 상태)가 포함됩니다 |

### 설정 옵션

`FilterComponent`는 설정 객체를 받습니다:

```ts
interface FilterComponentConfig {
    options?: FilterOption[];       // 筛选选项列表
    filter?: (args) => boolean;     // 自定义筛选函数
    autoOptions?: boolean;          // 是否自动从数据提取选项，默认 false
}

interface FilterOption {
    label: string;     // 显示文本
    value: any;        // 筛选值
    selected?: boolean; // 是否默认选中
}
```

### FilterStatus 타입

```ts
interface FilterStatus {
    /** 当前选中的筛选值数组 */
    value: any[];
    /** 自定义筛选逻辑函数 */
    filter?: (args: { row: any; cellValue: any; filterValues: any[] }) => boolean;
}
```
