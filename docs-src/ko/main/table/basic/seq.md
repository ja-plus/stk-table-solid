# 시퀀스 열

`StkTableColumn['type']` 을 `seq` 로 설정하여 컴포넌트의 내장 시퀀스 열을 사용할 수 있습니다.

::: tip
시퀀스 열은 정렬의 영향을 받지 않으며, `props.dataSource` 배열의 인덱스를 기반으로 표시됩니다.
:::

```ts
const columns: StkTableColumn<any>[] = [
    { type: 'seq', width: 50, dataIndex: '', title: '序号' }, // [!code ++]
    { title: 'Name', dataIndex: 'name', sorter: true },
    { title: 'Age', dataIndex: 'age', sorter: true },
    { title: 'Address', dataIndex: 'address', sorter: true },
    { title: 'Gender', dataIndex: 'gender', sorter: true },
];
```

여기서 `seq` 열의 `dataIndex` 가 비어 있는 것을 볼 수 있습니다. `dataIndex` 는 값 추출 필드로 사용될 뿐만 아니라 {#each} 렌더링의 key 로도 사용되는데, 시퀀스 열은 key 가 필요 없기 때문에 비워 둡니다. **중복하지 않도록 주의하세요**.

<demo solid="basic/seq/Seq.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/seq/Seq.tsx"></demo>


## 사용자 정의 시퀀스
`props.seqConfig.startIndex` 를 구성하여 시퀀스 시작 값을 지정할 수 있습니다.

페이지네이션 상황에서 유용합니다.

<demo solid="basic/seq/SeqStartIndex.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/seq/SeqStartIndex.tsx"></demo>
