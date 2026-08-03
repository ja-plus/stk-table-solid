# 1.0.0

## 1.0.4
* Feature
  - feat: `setTreeExpand` add `all` option, expand/collapse all descendants of a node.
  - feat: `setTreeExpand` add `level` option, expand/collapse descendants to a specific level.
* Bugfix:
  - fix: `setTreeExpand` & `setRowExpand` not working when `rowKey` is a `number`, now correctly handles both `string` and `number` types.
* Feature
  - transform `stk-table-vue` to `solid` version
* Bugfix:
  - fix: `autoResize` now recalculates fixed columns state (active/shadow) on container resize, not only virtual scroll.
  - fix: right fixed column not work properly.
  - fix: right fixed column missing left border in `bordered` mode. A cell's left border is provided by the `border-right` of its left sibling, which gets covered once the right fixed column sticks, so the column now draws its own left border via the `fixed-cell--border-left` class.
  - fix: `props.fixedMode` in multi-header.
* Docs:
  - docs: update tree demos to demonstrate `setTreeExpand` method with toggle buttons.
  - docs: update PanelTree demo to show multi-level tree with level-based logic and column resizing.
