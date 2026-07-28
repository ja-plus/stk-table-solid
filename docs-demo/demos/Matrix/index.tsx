import { createSignal, onMount, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import StkTable from '../../StkTable';
import type { StkTableColumn } from '../../../src/StkTable/index';
import MatrixCell from './MatrixCell';
import type { CellDataType, RowDataType } from './type';
import { useI18n } from '../../hooks/useI18n/index';

const columns: StkTableColumn<RowDataType>[] = [
    { title: '', dataIndex: 'rowTitle', className: 'col-title', width: 100 } as any,
    { title: '1M', dataIndex: 'm1', className: 'no-padding', customCell: MatrixCell },
    { title: '3M', dataIndex: 'm3', className: 'no-padding', customCell: MatrixCell },
    { title: '6M', dataIndex: 'm6', className: 'no-padding', customCell: MatrixCell },
    { title: '1Y', dataIndex: 'y1', className: 'no-padding', customCell: MatrixCell },
];

const colTitle = ['AAA+', 'AAA', 'AA+', 'AA', '<=AA-'];

function createCellData(): CellDataType {
    return {
        code: Math.floor(Math.random() * 1000000) + '.IB',
        value: (Math.random() * 100).toFixed(4),
        count: Math.floor(Math.random() * 100),
        percent: Math.random() * 100,
        // 随机正负数
        bp: (Math.random() * 4 - 2).toFixed(2),
    };
}

function initTableData(): RowDataType[] {
    return colTitle.map(title => {
        const row: any = {
            rowTitle: title,
        };
        columns.forEach((col, colIndex) => {
            if (colIndex === 0) return;
            row[col.dataIndex] = createCellData();
        });
        return row as RowDataType;
    });
}

export default function MatrixDemo() {
    const { t } = useI18n();
    let stkTableRef: any;

    // 使用 createStore 而非 createSignal + 不可变更新：
    // Solid 的 <For> 按行对象引用复用 DOM，若每次都 map 出新行对象，所有 <tr> 会整行重建。
    // store 保持行引用稳定，只修改叶子字段，DOM 仅精准更新被修改的绑定。
    const [tableData, setTableData] = createStore<RowDataType[]>(initTableData());
    const [running, setRunning] = createSignal(false);
    let intervalId = 0;

    function updateCell() {
        // 只替换第一行的 m1 单元格数据，其它单元格不会重新渲染
        setTableData(0, 'm1', createCellData());
        stkTableRef?.setHighlightDimCell('AAA+', 'm1');
    }

    function updateLastColPercent() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = 0;
            setRunning(false);
            return;
        }

        intervalId = self.setInterval(() => {
            // 精准更新：只修改每行 y1.percent 叶子字段，仅触发对应单元格的 --percent 样式更新
            setTableData({ from: 0, to: tableData.length - 1 }, 'y1', 'percent', percent => (percent + 1 > 100 ? 0 : percent + 1));
        }, 100);
        setRunning(true);
    }

    onMount(() => {
        updateLastColPercent();
    });

    onCleanup(() => {
        self.clearInterval(intervalId);
    });

    return (
        <div class="matrix-demo">
            <button class="btn" onClick={updateCell}>
                {t('tryUpdate')}
            </button>
            <button class="btn" onClick={updateLastColPercent}>
                {running() ? t('stop') : t('start')} {t('updateLastColumn')}
            </button>
            <StkTable
                ref={(i: any) => (stkTableRef = i)}
                rowKey="rowTitle"
                rowHeight={60}
                cellHover
                cellActive
                rowHover={false}
                rowActive={false}
                columns={columns}
                dataSource={tableData}
                onCellClick={e => console.log('cell-click', e)}
            />
            <style>{`
.matrix-demo .col-title {
    color: var(--th-color);
    background-color: var(--th-bgc);
    font-weight: bold;
    pointer-events: none;
}
.matrix-demo .stk-table .stk-table-main {
    height: 100%;
}
.matrix-demo .stk-table .no-padding {
    padding: 0;
}
.matrix-demo .matrix-cell {
    --percent: 50;
    --bg-color: #f0f0f0;
    height: calc(100% - 1px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 8px;
    cursor: default;
    background-image: linear-gradient(
        90deg,
        var(--bg-color-from),
        var(--bg-color-to) calc(var(--percent) * 1%),
        transparent calc(var(--percent) * 1%)
    );
}
.matrix-demo .matrix-cell.up {
    --font-color: #ff2b48;
    --bg-color-from: rgba(255, 43, 72, 0.15);
    --bg-color-to: rgba(255, 43, 72, 0.3);
}
.matrix-demo .matrix-cell.down {
    --font-color: #2fc87b;
    --bg-color-from: rgba(47, 200, 123, 0.15);
    --bg-color-to: rgba(47, 200, 123, 0.3);
}
.matrix-demo .matrix-cell.down .triangle {
    transform: rotate(180deg);
}
.matrix-demo .matrix-cell .row {
    display: flex;
    justify-content: space-between;
}
.matrix-demo .matrix-cell .code {
    font-size: 12px;
}
.matrix-demo .matrix-cell .bp {
    font-size: 12px;
    color: var(--font-color);
}
.matrix-demo .matrix-cell .value {
    font-size: 16px;
    font-weight: bold;
    color: var(--font-color);
}
.matrix-demo .matrix-cell .count {
    font-size: 12px;
}
.matrix-demo .matrix-cell .triangle {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 5px solid var(--font-color);
    margin-right: 4px;
}
`}</style>
        </div>
    );
}
