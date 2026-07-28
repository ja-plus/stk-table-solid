import type { JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import type { CustomHeaderCellProps, UniqKey } from '../../types/index';
import { useStkTableContext } from '../../context';
import Filter from './Filter';
import type { CreateFilterCellOption, FilterComponentConfig, FilterOption, FilterStatus } from './types';

/**
 * 从数据源提取筛选选项
 *
 * @param dataSource 数据源
 * @param columnKey 列名
 * @returns 筛选选项数组
 */
function extractFilterOptions(dataSource: any[], columnKey: string): FilterOption[] {
    const uniqueValues = new Set<any>();

    dataSource.forEach(row => {
        const val = row[columnKey];
        if (val !== undefined && val !== null) {
            uniqueValues.add(val);
        }
    });

    return Array.from(uniqueValues).map(value => ({
        label: String(value),
        value,
    }));
}

/**
 * 表格筛选功能工厂函数 (BETA)
 *
 * SolidJS 版本通过 Context（useStkTableContext）获取表格实例信息，
 * 替代 Vue 版本的 getCurrentInstance 向上查找机制。
 * @beta
 */
export function createFilterCell(option?: CreateFilterCellOption) {
    const [filterStatus, setFilterStatus] = createSignal<Record<UniqKey, FilterStatus>>({});

    function FilterComponent(
        config?: FilterComponentConfig,
        component?: (props: CustomHeaderCellProps<any>) => JSX.Element,
    ) {
        // 返回 SolidJS 函数组件，供 customHeaderCell 使用
        return (props: CustomHeaderCellProps<any>) => {
            const colKey = props.col.dataIndex;
            const ctx = useStkTableContext();

            const filterNumber = () => filterStatus()[colKey]?.value.length || 0;

            // 自动从数据中提取筛选选项（懒计算，仅在下拉打开时触发）
            // 注意：需从原始数据源（rawDataSource）提取，而非已筛选的展示数据（dataSource），
            // 否则在已有筛选生效时首次打开会导致选项提取不全（对齐 Vue 版 props.dataSource 行为）。
            let cachedAutoOptions: FilterOption[] | null = null;
            // 记录提取时使用的数据源引用，数据源变化时使缓存失效重新计算
            let cachedDataSourceRef: any[] | null = null;
            function getAutoOptions(): FilterOption[] {
                if (!config?.autoOptions) return [];
                const dataSource: any[] = ctx?.rawDataSource?.() || ctx?.dataSource() || [];
                if (cachedAutoOptions && cachedDataSourceRef === dataSource) return cachedAutoOptions;
                cachedDataSourceRef = dataSource;
                cachedAutoOptions = extractFilterOptions(dataSource, colKey);
                return cachedAutoOptions;
            }

            // 优先使用 FilterComponent 传入的 options，其次使用自动提取的选项
            function getResolvedOptions(): FilterOption[] {
                return config?.options ?? getAutoOptions();
            }

            function handleChange(value: FilterOption['value'][]) {
                const status: FilterStatus = {
                    value,
                    filter: config?.filter ?? filterStatus()[colKey]?.filter,
                };
                const next = { ...filterStatus(), [colKey]: status };
                setFilterStatus(next);
                option?.onChange?.({ colKey, status });
                ctx?.setFilter(next, option);
            }

            return (
                <Filter
                    col={props.col}
                    colIndex={props.colIndex}
                    rowIndex={props.rowIndex}
                    theme={() => ctx?.theme() || 'light'}
                    active={() => filterNumber() > 0}
                    getOptions={getResolvedOptions}
                    onChange={handleChange}
                >
                    {component ? component(props) : undefined}
                </Filter>
            );
        };
    }

    return {
        Filter: FilterComponent,
        filterStatus,
    };
}
