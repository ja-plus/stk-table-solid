import type { CustomCellProps } from '../../../../src/StkTable/index';
import type { DataType } from './types';

export default function YieldCell(props: CustomCellProps<DataType>) {
    const cellValue = () => props.cellValue as number;
    const colorClass = () => {
        if (cellValue() > 0) {
            return 'color-up';
        } else if (cellValue() < 0) {
            return 'color-down';
        }
        return '';
    };
    return (
        <span class={colorClass()}>
            {cellValue() > 0 ? '+' : ''}
            {(cellValue() * 100).toFixed(4)}%
        </span>
    );
}
