# 开始

## npm 安装

```sh
$ npm install stk-table-solid
```

## 引入

main
```ts
import 'stk-table-solid/lib/style.css';
```

在组件中引入使用。
```tsx
import { StkTable } from 'stk-table-solid';

<StkTable />
```

## 简单demo
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

运行结果
<demo solid="start/Start.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/start/Start.tsx"></demo>
