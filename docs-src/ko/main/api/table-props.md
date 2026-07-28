# Table Props 테이블 설정
```ts
<StkTable
  ...[props]
/>
```
## API

### width

테이블 너비

```ts
width?: string;
```

### minWidth

최소 테이블 너비 @deprecated CSS 선택자 `.stk-table-main`로 설정

```ts
minWidth?: string;
```

### maxWidth

테이블 최대 너비 @deprecated CSS 선택자 `.stk-table-main`로 설정

```ts
maxWidth?: string;
```

### stripe

얼룩말 줄무늬

```ts
stripe?: boolean;
```

### fixedMode

table-layout:fixed 사용 여부

```ts
fixedMode?: boolean;
```

### headless

헤더 숨김 여부

```ts
headless?: boolean;
```

### theme

테마, 라이트/다크

```ts
theme?: 'light' | 'dark';
```

### rowHeight

행 높이
- `props.autoRowHeight` 가 `true` 일 때, 기대 행 높이로 사용됩니다. 실제 행 높이에는 영향을 주지 않습니다.

```ts
rowHeight?: number;
```

### autoRowHeight

가변 행 높이 여부
- `true` 로 설정하면, `props.rowHeight` 는 기대 행 높이로 사용됩니다. 실제 행 높이에는 영향을 주지 않습니다.

```ts
autoRowHeight?: boolean | {
  /** 预估行高(优先级高于rowHeight) */
  expectedHeight?: number | ((row: DT) => number);
};
```

### rowHover

마우스 호버 시 행 강조 여부

```ts
rowHover?: boolean;
```

### rowActive

선택된 행 강조 여부

```ts
rowActive?: boolean | {
  /** 是否启用行选中功能 default: true */
  enabled?: boolean;
  /** 是否禁用行选中 default: () => false */
  disabled?: (row: DT) => boolean;
  /** 是否可以取消选中 default: true */
  revokable?: boolean;
};
```

### headerRowHeight

헤더 행 높이. 기본값 = rowHeight

```ts
headerRowHeight?: number | null;
```

### footerRowHeight

푸터 행 높이. 기본값 = rowHeight

```ts
footerRowHeight?: number | string | null;
```

### virtual

가상 스크롤

```ts
virtual?: boolean;
```

### virtualX

x축 가상 스크롤 (열 너비 설정 필요)

```ts
virtualX?: boolean;
```

### columns

테이블 열 설정

얕은 감시, 변경 시 참조를 수정하세요

```ts
columns?: StkTableColumn<any>[];
```

### dataSource

데이터 소스

얕은 감시, 변경 시 참조를 수정하세요

```ts
dataSource?: any[];
```

### rowKey

행 고유 키 (행 고유 값은 undefined일 수 없음)

```ts
rowKey?: UniqKeyProp;
```

### colKey

열 고유 키. 기본값 `dataIndex`

```ts
colKey?: UniqKeyProp;
```

### emptyCellText

빈 값 표시 텍스트

```ts
emptyCellText?: string | ((option: { row: DT; col: StkTableColumn<DT> }) => string);
```

### noDataFull

데이터 없음 높이 꽉 채우기 여부

```ts
noDataFull?: boolean;
```

### showNoData

데이터 없음 표시 여부

```ts
showNoData?: boolean;
```

### sortRemote

서버 측 정렬 여부, true면 데이터 정렬 안함

```ts
sortRemote?: boolean;
```

### showHeaderOverflow

헤더 오버플로우 표시 여부

```ts
showHeaderOverflow?: boolean;
```

### showOverflow

본문 overflow 시 ... 표시 여부

```ts
showOverflow?: boolean;
```

### showTrHoverClass

행 호버 class 추가 여부

```ts
showTrHoverClass?: boolean;
```

### cellHover

마우스 호버 시 셀 강조 여부

```ts
cellHover?: boolean;
```

### cellActive

선택된 셀 강조 여부

```ts
cellActive?: boolean;
```

### selectedCellRevokable

셀 다시 클릭 시 선택 취소 가능 여부 (cellActive=true)

```ts
selectedCellRevokable?: boolean;
```

### areaSelection

셀 범위 선택 활성화 여부 (드래그 선택 영역)

```ts
areaSelection?: boolean | {
    /** 是否启用区域选择，默认: true */
    enabled?: boolean;
    /** 复制时的单元格文本格式化回调 */
    formatCellForClipboard?: (row, col, rawValue) => string;
    /** 是否启用键盘控制选区移动，默认: true */
    keyboard?: boolean;
    /** 是否启用 Ctrl 多选功能，默认: true */
    ctrl?: boolean;
    /** 是否启用 Shift 扩选功能，默认: true */
    shift?: boolean;
};
```

### headerDrag

헤더 드래그 가능 여부. 콜백 함수 지원.

```ts
headerDrag?:
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

### rowClassName

행에 className 추가

```ts
rowClassName?: (row: any, i: number) => string;
```

### colResizable

열 너비 드래그 가능 여부 (`columns` 설정 및 `onupdatecolumns` 콜백과 함께 사용 필요)
**설정하지 마세요** 열 minWidth, **반드시** width 설정 필요
열 너비 드래그 시, 각 열에는 width 가 반드시 필요하며 minWidth/maxWidth 는 무효화됩니다. 테이블 너비는 "fit-content"가 됩니다.
- props.columns 의 width 속성을 자동으로 업데이트합니다

```ts
colResizable?: boolean | {
  /** 禁用拖动的列 */
  disabled?: (col: StkTableColumn<DT>) => boolean;
};
```

### colMinWidth

드래그 가능한 최소 열 너비

```ts
colMinWidth?: number;
```

### bordered

셀 구분선.
기본값 가로 세로 모두 있음
"h" - 가로선만 표시
"v" - 세로선만 표시
"body-v" - 본문만 세로선 표시
"body-h" - 본문만 가로선 표시

```ts
bordered?: boolean | 'h' | 'v' | 'body-v' | 'body-h';
```

### autoResize

가상 스크롤 높이/너비 자동 재계산. 기본값 true
[비반응형]
메서드 전달 시 resize 후 콜백 의미

```ts
autoResize?: boolean | (() => void);
```

### fixedColShadow

고정 열 그림자 표시 여부. 성능 절약 위해 기본값 false.

```ts
fixedColShadow?: boolean;
```

### sortConfig

정렬 설정

```ts
sortConfig?: {
  /** 空值是否排最下面 */
  emptyToBottom: boolean,
  /** 默认排序（1.初始化时触发 2.排序方向为null时触发) */
  defaultSort?: {
      dataIndex: keyof T;
      order: Order;
  };
  /**
   * string排序是否使用 String.prototype.localCompare
   * 默认true (历史设计问题，为了兼容，默认true)
   */
  stringLocaleCompare?: boolean;
},
```

### hideHeaderTitle

헤더 마우스 호버 title 숨김. dataIndex 배열 전달 가능

```ts
hideHeaderTitle?: boolean | string[];
```

### highlightConfig

강조 설정

```ts
highlightConfig?: {
  /** 高亮持续时间(s) */
  duration?: number;
  /** 高亮帧率*/
  fps?: number;
};
```

### seqConfig

순번 열 설정

```ts
seqConfig?: {
  /** 序号列起始下标 用于适配分页 */
  startIndex?: number;
};
```

### expandConfig

확장 행 설정

```ts
expandConfig?: {
  height?: number;
};
```

### dragRowConfig

행 드래그 설정

```ts
dragRowConfig?: {
  mode?: 'none' | 'insert' | 'swap';
};
```

### cellFixedMode

고정 헤더, 고정 열 구현 방식.
[비반응형]
relative: 고정 열은 props.columns 양쪽에만 배치 가능.
- 열 너비가 변경되면 주의해서 사용.
- 멀티 레벨 헤더 고정 열 주의

낮은 버전 브라우저는只能是'relative',

```ts
cellFixedMode?: 'sticky' | 'relative';
```

### smoothScroll

부드러운 스크롤 여부
- 기본값: chrome < 85 || chrome > 120 ? true : false
- false: wheel 이벤트 스크롤 사용. 스크롤 너무 빠를 때 백색 화면 방지.
- true: wheel 이벤트 스크롤 미사용. 마우스휠 스크롤 시 더 부드러움. 스크롤 너무 빠르면 백색 화면이 나타납니다.

```ts
smoothScroll?: boolean;
```

### scrollRowByRow

정수 행 단위 세로 스크롤
- scrollbar: 스크롤바만 드래그 시生效, 드래그 백색 화면 문제 처리可用

```ts
scrollRowByRow?: boolean | 'scrollbar';
```

### scrollbar

커스텀 스크롤바 설정
- false: 커스텀 스크롤바 비활성화
- true: 기본 설정의 커스텀 스크롤바 활성화
- ScrollbarOptions: 커스텀 스크롤바 활성화 및 설정

```ts
scrollbar?: boolean | {
  /** 是否启用滚动条 */
  enabled?: boolean;
  /** 垂直滚动条宽度 default: 8 */
  width?: number;
  /** 水平滚动条高度 default: 8 */
  height?: number;
  /** 滚动条滑块最小宽度 default: 20 */
  minWidth?: number;
  /** 滚动条滑块最小高度 default: 20 */
  minHeight?: number;
};
```

### treeConfig

트리 설정

```ts
treeConfig?: {
  /** 默认展开所有树节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点key */
  defaultExpandKeys?: UniqKey[];
  /** 默认展开到第几层 */
  defaultExpandLevel?: number;
};
```

### experimental

실험적 기능 설정

```ts
experimental?: {
  /** 使用 transform 模拟滚动 */
  scrollY?: boolean;
};
```

### footerData

테이블 하단 합계 행 데이터

```ts
footerData?: DT[];
```
