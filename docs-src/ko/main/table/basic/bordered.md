# 테두리
`bordered` 를 설정하여 테이블 테두리를 구현합니다. 값은 `true` | `false` | `h` | `v` | `body-v` | `body-h` 입니다.

| 값 | 설명 |
| --- | --- |
| `true` | 테이블의 모든 테두리 |
| `false` | 테두리 없음 |
| `h` | 가로선만 |
| `v` | 세로선만 |
| `body-v` | 헤더는 가로/세로선, 본문은 세로선만 |
| `body-h` | 헤더는 가로/세로선, 본문은 가로선만 |

::: tip
스크롤바의 영향으로 테이블 오른쪽과 하단의 테두리는 셀의 `border-right` 와 `border-bottom` 으로 구현됩니다. 따라서 사라질 수 있습니다. 실제 상황에 맞게 CSS 를 직접 추가할 수 있습니다.
:::
<demo solid="basic/border/Default.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/basic/border/Default.tsx"></demo>
