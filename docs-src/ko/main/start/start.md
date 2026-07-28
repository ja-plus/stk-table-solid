# 빠른 시작

## npm 설치

```sh
$ npm install stk-table-solid
```

## 가져오기

main
```ts
import 'stk-table-solid/lib/style.css';
```

컴포넌트에서 가져와서 사용합니다.
```tsx
import { StkTable } from 'stk-table-solid';

<StkTable />
```

## 간단한 데모
```tsx
import { onMount, onCleanup } from 'solid-js';
import { StkTable } from 'stk-table-solid';
import type { StkTableColumn, StkTableInstance } from 'stk-table-solid/src/StkTable/index';

type DataType = {
    id: string;
    name: string;
    age: number;
    address: string;
};
const columns: StkTableColumn<DataType>[] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age', align: 'right' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
];
const dataSource: DataType[] = [
    { id: 'k1', name: 'Tom', age: 18, address: 'Beijing' },
    { id: 'k2', name: 'Jerry', age: 19, address: 'Shanghai' },
    { id: 'k3', name: 'Jack', age: 20, address: 'London' },
    { id: 'k4', name: 'Rose', age: 22, address: 'New York' },
];

export default () => {
    let stkTableRef: StkTableInstance | undefined;
    onMount(() => {
        const interval = window.setInterval(() => {
            stkTableRef?.setHighlightDimRow(['k1']);
        }, 2000);
        onCleanup(() => window.clearInterval(interval));
    });
    return <StkTable ref={i => (stkTableRef = i)} rowKey="id" columns={columns} dataSource={dataSource} />;
};
```

실행 결과
<demo solid="start/Start.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/start/Start.tsx"></demo>
