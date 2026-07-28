# 실시간 셀 병합

`areaSelection`(영역 선택) 기능으로 여러 셀을 선택한 후 우클릭하여 메뉴를 열고 셀을 실시간으로 병합/분할할 수 있습니다.

## 구현 방법

1. `areaSelection` 영역 선택 기능을 활성화하고 `onareaselectionchange` 이벤트를 감지하여 선택 범위를 가져옵니다
2. `onrowmenu` 이벤트(우클릭)를 감지하여 [ja-contextmenu](https://www.npmjs.com/package/ja-contextmenu)로 컨텍스트 메뉴를 표시합니다
3. "셀 병합" 클릭 시 선택 범위를 `rowspan`/`colspan` 정보로 변환하여 Map에 저장합니다
4. 열 설정의 `mergeCells` 콜백이 Map에서 병합 정보를 읽어 반환합니다
5. "셀 분할" 클릭 시 선택 범위 내의 병합 정보를 삭제합니다

<demo solid="demos/RealtimeMergeCells/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/RealtimeMergeCells/index.tsx"></demo>

## 핵심 로직

```typescript
// 合并状态存储 key: `${rowId}__${colIndex}` value: { rowspan, colspan }
const mergeMap = new Map<string, { rowspan: number; colspan: number }>();

// 列配置中的 mergeCells 回调
function mergeCells({ row, col }) {
  const colIndex = columns.findIndex(c => c.dataIndex === col.dataIndex);
  return mergeMap.get(`${row.id}__${colIndex}`);
}

// 合并选中的单元格
function mergeSelectedCells() {
  const range = selectionRanges().at(-1);
  const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
  const startRow = dataSource()[minRow];

  // 清除范围内已有的合并信息，避免冲突
  for (let r = minRow; r <= maxRow; r++)
    for (let c = minCol; c <= maxCol; c++)
      mergeMap.delete(`${dataSource()[r].id}__${c}`);

  // 在左上角单元格设置合并信息
  mergeMap.set(`${startRow.id}__${minCol}`, {
    rowspan: maxRow - minRow + 1,
    colspan: maxCol - minCol + 1,
  });

  // 强制表格重新渲染
  setDataSource(ds => ds.slice());
}

// 拆分选中的单元格
function splitSelectedCells() {
  for (const range of selectionRanges()) {
    const { minRow, maxRow, minCol, maxCol } = normalizeRange(range);
    for (let r = minRow; r <= maxRow; r++)
      for (let c = minCol; c <= maxCol; c++)
        mergeMap.delete(`${dataSource()[r].id}__${c}`);
  }
  setDataSource(ds => ds.slice());
}
```

::: tip 참고
1. 병합 후 왼쪽 상단 셀의 내용만 표시됩니다. 덮인 셀의 데이터는 데이터 소스에 유지되며 분할 후 복원됩니다
2. 새 병합 작업은 선택 범위 내 기존 병합 정보를 자동으로 제거하여 충돌을 방지합니다
3. 이 방식은 가상 스크롤 모드에서도 작동합니다
:::
