import type { CustomCellProps, CustomHeaderCellProps } from '../../types/index';
import { useStkTableContext } from '../../context';
import CheckboxCell from './CheckboxCell';

/** createCheckboxCell 配置选项 */
export interface createCheckboxCellOptions<T = any> {
    /**
     * 行数据中表示选中状态的字段名
     * @default '_isChecked'
     */
    field?: string;
    /**
     * 自定义 checkbox 组件（SolidJS 组件）
     * 不传则使用原生 input[type=checkbox]
     */
    checkboxComponent?: any;
    /**
     * 单元格 checkbox 状态变更回调
     * @param checked 是否选中
     * @param row 当前行数据
     */
    onChange?: (checked: boolean, row: T) => void;
    /**
     * 全选 checkbox 状态变更回调
     * @param checked 是否全选
     */
    onSelectAll?: (checked: boolean) => void;
}

/**
 * Checkbox 工厂函数
 *
 * 用于快速创建多选框单元格和表头单元格组件。
 * SolidJS 版本通过 Context（useStkTableContext）获取表格数据源，
 * 替代 Vue 版本的 getCurrentInstance 向上查找机制。
 *
 * @param options 配置选项
 * @returns 包含 CheckboxCell 和 CheckboxAllCell 组件的对象
 *
 * @example
 * ```ts
 * const { CheckboxCell, CheckboxAllCell } = createCheckboxCell({
 *   field: '_isChecked',
 *   onChange: (checked, row) => { row._isChecked = checked },
 * });
 *
 * const columns = [
 *   {
 *     dataIndex: 'checkbox',
 *     width: 50,
 *     customCell: CheckboxCell,
 *     customHeaderCell: CheckboxAllCell,
 *   },
 *   // ...other columns
 * ];
 * ```
 */
export function createCheckboxCell<T extends Record<string, any> = any>(options?: createCheckboxCellOptions<T>) {
    const field = options?.field ?? '_isChecked';
    const customComponent = options?.checkboxComponent;

    /** 单元格 Checkbox 组件 - 用于 customCell */
    function CheckboxCellComponent() {
        return (props: CustomCellProps<any>) => {
            const ctx = useStkTableContext();
            // 读取 rowVersion 建立依赖：行字段被修改后 bump 会触发重算（对齐 Vue 深层响应式）
            const isChecked = () => {
                ctx?.rowVersion();
                return !!props.row[field];
            };

            function handleChange(checked: boolean) {
                props.row[field] = checked;
                ctx?.bumpRowVersion();
                options?.onChange?.(checked, props.row);
            }

            return <CheckboxCell checked={isChecked()} customComponent={customComponent} onChange={handleChange} />;
        };
    }

    /** 表头 Checkbox 组件 - 用于 customHeaderCell（全选/半选） */
    function CheckboxAllCellComponent() {
        return (_props: CustomHeaderCellProps<any>) => {
            const ctx = useStkTableContext();

            const dataSource = () => ctx?.dataSource() || [];

            const isCheckAll = () => {
                ctx?.rowVersion();
                const data = dataSource();
                return data.length > 0 && data.every((item: any) => !!item[field]);
            };

            const isIndeterminate = () => {
                ctx?.rowVersion();
                const data = dataSource();
                const checkedCount = data.filter((item: any) => !!item[field]).length;
                return checkedCount > 0 && checkedCount < data.length;
            };

            function handleChange(checked: boolean) {
                dataSource().forEach((item: any) => {
                    item[field] = checked;
                });
                ctx?.bumpRowVersion();
                options?.onSelectAll?.(checked);
            }

            return (
                <CheckboxCell
                    checked={isCheckAll()}
                    indeterminate={isIndeterminate()}
                    customComponent={customComponent}
                    onChange={handleChange}
                />
            );
        };
    }

    return {
        CheckboxCell: CheckboxCellComponent,
        CheckboxAllCell: CheckboxAllCellComponent,
    };
}
