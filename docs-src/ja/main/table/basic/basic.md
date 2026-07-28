# 基本

* `props.columns` で列を設定します。
* `props.dataSource` でデータソースを設定します。
* `props.rowKey` で一意の行識別子を設定します。
* css スタイルでテーブル高さを設定します。

```tsx
import { StkTable } from 'stk-table-solid';
import type { StkTableColumn } from 'stk-table-solid';

type Data = {
    name: string;
    age: number;
    address: string;
    gender: 'male' | 'female';
};

const columns: StkTableColumn<Data>[] = [
    { type: 'seq', title: 'No.', dataIndex: '' as any, width: 50 },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Age', dataIndex: 'age', headerAlign: 'right', align: 'right' },
    { title: 'Gender', dataIndex: 'gender', align: 'center' },
    { title: 'Address', dataIndex: 'address' },
];

const dataSource: Data[] = [
    { name: `Jack`, age: 18, address: `Beijing Forbidden City `, gender: 'male' },
    { name: `Tom`, age: 20, address: `Shanghai`, gender: 'male' },
    { name: `Lucy`, age: 22, address: `Guangzhou`, gender: 'female' },
    { name: `Lily`, age: 24, address: `Shenzhen`, gender: 'female' },
];

<StkTable style="height: 200px" rowKey="name" columns={columns} dataSource={dataSource} />;
```

<demo solid="basic/Basic.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/Basic.tsx"></demo>
