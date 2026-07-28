# Lazy Load Implementation

When dealing with very large datasets (e.g., millions of records), rendering all data at once can cause performance issues. Although `StkTable` has built-in virtual scrolling optimization, loading all data into memory at once still consumes significant resources.

By listening to the table's `scroll` event, you can get the `startIndex` and `endIndex` of the current visible area, enabling a lazy loading solution that loads data on demand.

## Implementation Approach

1. Create a large placeholder array and pass it to `dataSource`
2. Listen to the `scroll` event to get `startIndex` and `endIndex`
3. Calculate which data pages need to be loaded based on scroll position
4. Fetch data from the API on demand and fill it into the corresponding positions

<demo solid="demos/LazyLoad/index.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/demos/LazyLoad/index.tsx"></demo>

## Implementation Details

### Core Logic

```typescript
// 假设总数据量为 100000 条，每页 100 条
const totalCount = 100000;
const pageSize = 100;

// 创建占位数组
const tableDataRef = useRef<Array<Record<string, any>>>(
  Array(totalCount).fill(null).map((_, i) => ({ id: i + 1, __placeholder: true }))
);

// 监听滚动事件
function onScroll(ev: Event, data: { startIndex: number; endIndex: number }) {
  const { startIndex, endIndex } = data;
  
  // 计算需要加载的页码范围
  const startPage = Math.floor(startIndex / pageSize);
  const endPage = Math.floor(endIndex / pageSize);
  
  // 加载范围内的数据页
  for (let page = startPage; page <= endPage; page++) {
    loadDataPage(page);
  }
}

// 加载指定页的数据
async function loadDataPage(page: number) {
  // 检查是否已加载
  const startIndex = page * pageSize;
  if (!tableDataRef.current[startIndex]?.__placeholder) return;
  
  // 从接口获取数据
  const response = await fetchData(page, pageSize);
  
  // 填充到对应位置
  response.forEach((item, index) => {
    tableDataRef.current[startIndex + index] = item;
  });
}
```

::: tip Boundary Case Handling
When the scroll position is exactly between two pages (e.g., `startIndex=95, endIndex=105`), you need to load both pages simultaneously (page 0 and page 1) to ensure complete data display in the visible area.
:::

::: warning Important Notes
1. The placeholder array must be pre-allocated to ensure virtual scrolling can correctly calculate scroll height
2. Loaded data should be cached properly to avoid duplicate requests
3. Consider adding loading state indicators to improve user experience
:::
