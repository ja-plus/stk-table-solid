import type { CustomCellProps } from '../../../src/StkTable/index';

export default function MatrixCell(props: CustomCellProps<any>) {
    const data = props.cellValue;
    return (
        <div
            class={'matrix-cell up' + (data.bp < 0 ? ' down' : '')}
            style={{ '--percent': data.percent } as any}
        >
            <div class="row">
                <span class="code">{data.code}</span>
                <span class="bp">
                    <i class="triangle"></i>
                    {data.bp}
                </span>
            </div>
            <div class="row">
                <span class="value">{data.value}</span>
                <span class="count">{data.count}</span>
            </div>
        </div>
    );
}
