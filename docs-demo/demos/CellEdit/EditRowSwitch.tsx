import { useContext } from 'solid-js';
import type { CustomCellProps } from '../../../src/StkTable/index';
import { useStkTableContext } from '../../../src/StkTable/index';
import type { RowDataType } from './type';
import { CellEditRefreshContext } from './context';

export default function EditRowSwitch(props: CustomCellProps<RowDataType>) {
    const refresh = useContext(CellEditRefreshContext);
    const ctx = useStkTableContext();
    const { row } = props;

    /** 依赖 rowVersion，行字段被修改后重新读取 */
    const isChecked = () => {
        ctx?.rowVersion();
        return !!row._isEditing;
    };

    function handleChange(e: Event) {
        const checked = (e.currentTarget as HTMLInputElement).checked;
        row._isEditing = checked;
        ctx?.bumpRowVersion();
        refresh();
    }

    return (
        <div class="editable-status-cell">
            <input type="checkbox" checked={isChecked()} onChange={handleChange} />
        </div>
    );
}
