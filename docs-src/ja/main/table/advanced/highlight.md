# 行、セルをハイライト

これはテーブルの特徴的な機能で、リアルタイムデータ更新後にユーザーに警告するためにハイライトを設定するために使用されます。

インスタンスメソッド `setHighlightDimRow` & `setHighlightDimCell` を呼び出すことで、行またはセルをハイライトできます。

::: tip 
* ハイライトされた行とセルはデフォルトで `animation`（el.animate()メソッドを使用してアニメーションをトリガー）を使用します。アニメーションをカスタマイズするには、`option` パラメータを渡すことができます。[Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) の詳細と互換性については [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate#browser_compatibility) を参照してください。
* ハイライト色はテーマとともにリアルタイムで変更されません。
* ハイライトが動作しませんか？`props.rowKey` が指定されているかどうかを確認してください。
:::


## 組み込みハイライトアニメーション

```ts
// 高亮行，可传入key数组，一次性高亮多行，利于性能
stkTableRef.current?.setHighlightDimRow(['id0']); 
// 高亮单元格
stkTableRef.current?.setHighlightDimCell('id1', 'age');
```
<demo solid="advanced/highlight/Highlight.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/highlight/Highlight.tsx"></demo>

## グローバルハイライト設定
`props.highlightConfig`

```ts
type HighlightConfig = {
    /** 持续时间 */
    duration?: number;
    /** 高亮动画帧率 */
    fps?: number;
}

```
::: tip
- ハイライトフレームレートを下げるとパフォーマンスに有利です。
- アニメーショーフレームレートを指定したい場合は、Animation API の `easing: 'step(xx)'` 実装を参照してください。（CSS animation-timing-function: step と同じ）
:::

::: warning
キーフレームをカスタマイズすると、`HighlightConfig.fps` **は無効になります**！
:::


## Animation API を通じたカスタムハイライトアニメーション
```ts
stkTableRef.current?.setHighlightDimRow([id], {
    keyframe: [
        { backgroundColor: '#1e4c99', transform: 'translateY(-30px) scale(0.6)', opacity: 0, easing: 'cubic-bezier(.11,.1,.03,.98)' },
        { backgroundColor: '#1B1B24', transform: 'translateY(0) scale(1)', opacity: 1 },
    ],
    duration: 1000,
});

stkTableRef.current?.setHighlightDimCell('id1', 'age', {
    keyframe: {
        color: ['#fff', '#C70000', '#fff'],
        transform: ['scale(1)', 'scale(1.1)', 'scale(1)'],
        boxShadow: ['unset', '0 0 10px #aaa', 'unset'],
        easing: 'cubic-bezier(.11,.1,.03,.98)',
    },
});
```

<demo solid="advanced/highlight/HighlightAnimation.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/highlight/HighlightAnimation.tsx"></demo>

## CSS を通じたカスタムハイライトアニメーション
このAPIは古いアニメーション実装方法です。**便利さ**、**良い互換性**、**理解のしやすさ**などの利点があり、まだ保持されています。

```ts
stkTableRef.current?.setHighlightDimRow(['id1'], { 
    method: 'css',
    className: 'special-highlight-row',
    duration: 2000
});
```
:::warning
ここで `duration` を `2000` に設定して、アニメーション終了後に要素から `class` をクリアします。これはCSSアニメーション継続時間と**一致する必要があります**。
:::
```css
@keyframes my-highlight-row {
    from { background-color: #bd7201; }
}
.special-highlight-row {
    animation: my-highlight-row 2s linear;
}

```
<demo solid="advanced/highlight/HighlightCss.tsx" github="https://github.com/ja-plus/stk-table-solid/tree/master/docs-demo/advanced/highlight/HighlightCss.tsx"></demo>

## ~~JS を通じたカスタムハイライトアニメーション~~（非推奨）
<details>
<summary>
    クリックして表示
</summary>
<pre>
stkTableRef?.setHighlightDimRow(['id1'], { 
    method: 'js',
    duration: 2000
});
</pre>
手動で色を計算する必要があり、パフォーマンスが悪いため推奨されません。`d3-interpolate` に依存します。
</details>


## API

### 行ハイライト  setHighlightDimRow
```ts
/**
 * 高亮一行
 * @param rowKeyValues 行唯一键的数组
 * @param option.method css-使用css渲染，animation-使用animation api。默认animation
 * @param option.className 自定义css动画的class。
 * @param option.keyframe 如果自定义keyframe，则 highlightConfig.fps 将会失效。
 * @param option.duration 动画时长。method='css'状态下，用于移除class，如果传入了className则需要与自定义的动画时间一致。。
 */
setHighlightDimRow(rowKeyValues: UniqKey[], option: HighlightDimRowOption = {}): void;
```

### セルハイライト setHighlightDimCell
```ts
/**
 * 高亮一个单元格。暂不支持虚拟滚动高亮状态记忆。
 * @param rowKeyValue 一行的key
 * @param colKeyValue 列key
 * @param options.method css-使用css渲染，animation-使用animation api。默认animation;
 * @param option.className 自定义css动画的class。
 * @param option.keyframe 如果自定义keyframe，则 highlightConfig.fps 将会失效。
 * @param option.duration 动画时长。method='css'状态下，用于移除class，如果传入了className则需要与自定义的动画时间一致。
 */
setHighlightDimCell(rowKeyValue: UniqKey, colKeyValue: string, option: HighlightDimCellOption = {}): void;
```
### パラメータ型

```ts
type HighlightDimBaseOption = {
    duration?: number;
    /**
     * 忽略不可见元素。为 true 时：
     * - 调用 setHighlightDimRow 时，若获取不到对应 DOM 则直接丢弃，不放入 store 循环计算；
     * - 若 store 中已存在该 key，也会被删除。
     * - 在循环计算过程中，若某行 DOM 已不存在，也会从 store 中删除，不再继续计算。
     */
    ignoreInvisible?: boolean;
};

type HighlightDimAnimationOption = HighlightDimBaseOption & {
    /** use Animation API */
    method: 'animation';
    /**
     * same as https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
     */
    keyframe?: Parameters<Animatable['animate']>['0'];
};
type HighlightDimCssOption = HighlightDimBaseOption & {
    method: 'css';
    /** class name with css animation */
    className?: string;
    /** control delay time to remove className */
    duration?: number;
};

export type HighlightDimCellOption = HighlightDimBaseOption | HighlightDimAnimationOption | HighlightDimCssOption;
export type HighlightDimRowOption = HighlightDimBaseOption | HighlightDimAnimationOption | HighlightDimCssOption;

```
