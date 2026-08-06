# 1.0.0

* Feature
  - feat: `setTreeExpand` add `parents` option, pass a child node's rowKey to expand/collapse all its ancestors (the target node itself is also expanded when expanding if it has children), making the target row visible/hidden (e.g. locating a row).
  - feat: `mergeCells` colspan now works with `virtualX` (horizontal virtual list). When the anchor column of a merged cell scrolls out of the viewport, the visible column range is automatically expanded so that the merged cell is fully rendered (also works with multi-level headers and vertical virtual list).

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
  - docs: sync tree documentation from `stk-table-vue`, add `TreeSetExpand` demo and `setTreeExpand` API docs.
