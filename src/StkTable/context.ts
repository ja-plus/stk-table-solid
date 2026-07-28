import { createContext, useContext, type Accessor } from 'solid-js';
import type { UniqKey } from './types/index';
import type { FilterStatus } from './custom-cells/FilterCell/types';

/**
 * StkTable 上下文
 *
 * SolidJS 没有 Vue 的 getCurrentInstance 机制，
 * custom-cells（FilterCell / CheckboxCell 等）通过此 Context 获取表格实例信息。
 */
export interface StkTableContextValue {
    /** 当前表格数据源（响应式，已排序/筛选后的展示数据） */
    dataSource: Accessor<any[]>;
    /** 原始数据源（响应式，即 props.dataSource，未经排序/筛选），供筛选选项提取等场景使用 */
    rawDataSource: Accessor<any[]>;
    /** 主题（响应式） */
    theme: Accessor<'light' | 'dark'>;
    /** 设置筛选状态 */
    setFilter: (status: Record<UniqKey, FilterStatus> | null, option?: { remote?: boolean; silent?: boolean }) => void;
    /**
     * 行数据版本号（响应式）。
     * 由于 SolidJS 普通对象不具备深层响应式，行内字段被修改后，
     * custom-cells 读取此版本号以触发重新计算（对齐 Vue 深层响应式行为）。
     */
    rowVersion: Accessor<number>;
    /** 行数据被修改后调用，使依赖 rowVersion 的计算失效重算 */
    bumpRowVersion: () => void;
}

export const StkTableContext = createContext<StkTableContextValue | undefined>(undefined);

/** 获取最近的 StkTable 上下文（供 custom-cells 使用） */
export function useStkTableContext() {
    return useContext(StkTableContext);
}
