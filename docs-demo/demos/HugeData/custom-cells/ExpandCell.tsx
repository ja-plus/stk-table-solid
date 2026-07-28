import type { CustomCellProps } from '../../../../src/StkTable/index';
import { emitter } from '../event';
import type { DataType } from '../types';
import { useI18n } from '../../../hooks/useI18n/index';

export default function ExpandCell(props: CustomCellProps<DataType>) {
    const { t } = useI18n();
    function handleClick() {
        emitter.emit('toggle-expand', props.row);
    }
    const BestText = t('Best');
    return (
        <div class="expand-cell" onClick={handleClick}>
            <span class={'triangle-arrow' + (props.row._isExpand ? ' expand' : '')}></span>
            <span class="text">{BestText}</span>
        </div>
    );
}
