import StkTable from '../../../StkTable';
import type { StkTableColumn } from '../../../../src/StkTable/index';
import { useI18n } from '../../../hooks/useI18n/index';

// 从数据中直接读取 rowspan / colspan
function mergeCells({ row, col }: { row: any; col: StkTableColumn<any> }) {
    const rowspan = row.rowspan?.[col.dataIndex];
    const colspan = row.colspan?.[col.dataIndex];
    if (!rowspan && !colspan) return;
    return { rowspan: rowspan || 1, colspan: colspan || 1 };
}

// 20 组 x 每组 6 行，continent 行合并、country 行合并、province 列合并
const dataSource = (() => {
    const rows: any[] = [];
    let id = 0;
    for (let g = 0; g < 20; g++) {
        const groupSize = 6;
        for (let i = 0; i < groupSize; i++) {
            const row: any = {
                id: id++,
                continent: `Continent ${g}`,
                country: `Country ${g}-${Math.floor(i / 2)}`,
                province: `Province ${g}-${i}`,
            };
            for (let c = 0; c < 30; c++) row[`column-${c}`] = `${g}-${i}-${c}`;
            if (i === 0) {
                row.rowspan = { continent: groupSize }; // 行合并
                row.colspan = { province: 3 }; // 列合并：province 向右合并 2 列
            } else if (i % 2 === 0) {
                row.rowspan = { country: 2 };
            }
            rows.push(row);
        }
    }
    return rows;
})();

export default function MergeCellsRowColVirtual() {
    const { t } = useI18n();

    const columns: StkTableColumn<any>[] = [
        { title: t('id'), dataIndex: 'id', width: 80 },
        { title: t('continent'), dataIndex: 'continent', width: 100, mergeCells },
        { title: t('country'), dataIndex: 'country', width: 120, mergeCells },
        { title: t('province'), dataIndex: 'province', width: 120, mergeCells },
        // 30 个列，撑出横向滚动
        ...new Array(30).fill(0).map((_, i) => ({ title: `Column ${i}`, dataIndex: `column-${i}`, width: 100 })),
    ];

    return <StkTable style={{ maxHeight: '300px' }} virtual virtualX cellHover rowKey="id" columns={columns} dataSource={dataSource} />;
}
