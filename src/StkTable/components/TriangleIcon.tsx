/** 折叠图标 */
export default function TriangleIcon(props: { onClick?: (e: MouseEvent) => void }) {
    return <div class="stk-fold-icon" onClick={e => props.onClick?.(e)}></div>;
}
