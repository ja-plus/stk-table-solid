# Virtual List
Used to improve performance when rendering large amounts of data.

## Configuration
props:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| virtual | `boolean` | `false` | Whether to enable virtual list |
| virtualX | `boolean` | `false` | Whether to enable horizontal virtual list |
| autoResize | `boolean`\| `() => void` | `true` | Whether to automatically recalculate the visible area. If a callback function is passed, it will be called after resizing |


## Vertical Virtual List
::: warning
Row height will no longer be affected by content. For details, refer to the [Row Height](/en/main/table/basic/row-height) section.
:::
```tsx
<StkTable virtual />
```
<demo solid="advanced/virtual/VirtualY.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/virtual/VirtualY.tsx"></demo>

## Horizontal Virtual List
::: warning
`StkTableColumn['width']` will have a default value of `100px`.
:::

```tsx
<StkTable virtualX />
```
<demo solid="advanced/virtual/VirtualX.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/virtual/VirtualX.tsx"></demo>

## Recalculate Visible Area autoResize
In many cases, the width and height of the virtual list area will change for various reasons, and the visible area needs to be recalculated.

The component internally uses `ResizeObserver` to monitor the size changes of `StkTable`. When the size changes, it will automatically recalculate the visible area. This function is enabled by default.


::: warning
Browsers that do not support `ResizeObserver` will use `onresize` as a fallback.
:::

In some cases, you still need to manually recalculate the visible area of the virtual list. In this case, you can call the method exposed by the component.

```ts
/**
 * 初始化纵向虚拟列表的可视区域
 * @param {number} [height] 虚拟滚动的高度
 */
initVirtualScrollY(height?: number)
/**
 * 初始化横向虚拟列表的可视区域
 */
initVirtualScrollX()
/**
 * 初始化纵向和横向虚拟列表的可视区域
 */
initVirtualScroll(height?: number)
```
`initVirtualScroll` is equivalent to `initVirtualScrollY` + `initVirtualScrollX`

### Disable Auto Calculation
```tsx
<StkTable autoResize={false} />
```

## Single Column List
Please refer to [Virtual Single List](/en/demos/virtual-list.html)

