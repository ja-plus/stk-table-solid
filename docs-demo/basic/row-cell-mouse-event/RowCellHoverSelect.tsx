import { createSignal } from 'solid-js';
import StkTable from '../../StkTable';
import type { StkTableColumn } from '../../../src/StkTable/index';
import CheckItem from '../../components/CheckItem';
import { useI18n } from '../../hooks/useI18n/index';

const dataSource = [
    { name: `Jack`, age: 18, address: `Beijing Forbidden City `, gender: 'male' },
    { name: `Tom`, age: 20, address: `Shanghai`, gender: 'male' },
    { name: `Lucy`, age: 22, address: `Guangzhou`, gender: 'female' },
    { name: `Lily`, age: 24, address: `Shenzhen`, gender: 'female' },
    { name: `Disabled`, age: 0, address: `Unknown`, gender: 'male' },
];

export default function RowCellHoverSelect() {
    const { t } = useI18n();
    let stkTableRef: any;

    const [stripe, setStripe] = createSignal(true);
    const [rowActiveEnabled, setRowActiveEnabled] = createSignal(true);
    const [rowActiveRevokable, setRowActiveRevokable] = createSignal(true);
    const [cellActive, setCellActive] = createSignal(true);
    const [rowHover, setRowHover] = createSignal(true);
    const [cellHover, setCellHover] = createSignal(true);
    const [selectedCellRevokable, setSelectedCellRevokable] = createSignal(true);

    const columns: StkTableColumn<any>[] = [
        { title: t('name'), dataIndex: 'name' },
        { title: t('age'), dataIndex: 'age' },
        { title: t('address'), dataIndex: 'address' },
        { title: t('gender'), dataIndex: 'gender' },
    ];

    const rowActive = {
        get enabled() {
            return rowActiveEnabled();
        },
        disabled: (row: any) => row.name === 'Disabled',
        get revokable() {
            return rowActiveRevokable();
        },
    };

    function setCurrentRow(rowKeyOrRow: string | undefined | any) {
        stkTableRef?.setCurrentRow(rowKeyOrRow);
    }

    function setSelectedCell(row: any, col: StkTableColumn<any>) {
        stkTableRef?.setSelectedCell(row, col);
    }

    return (
        <div>
            <CheckItem checked={stripe()} onChange={setStripe} text={'stripe' + '(' + t('zebraStripes') + ')'} />
            <br />
            <CheckItem checked={rowActiveEnabled()} onChange={setRowActiveEnabled} text={'rowActive' + '(' + t('rowSelectedState') + ')'} />
            <CheckItem checked={cellActive()} onChange={setCellActive} text={'cellActive' + '(' + t('cellSelectedState') + ')'} />
            <br />
            <CheckItem checked={rowHover()} onChange={setRowHover} text={'rowHover' + '(' + t('rowHoverState') + ')'} />
            <CheckItem checked={cellHover()} onChange={setCellHover} text={'cellHover' + '(' + t('cellHoverState') + ')'} />
            <br />
            <CheckItem
                checked={rowActiveRevokable()}
                onChange={setRowActiveRevokable}
                text={'rowActive.revokable(' + t('rowSelectedStateCancellable') + ')'}
            />
            <br />
            <CheckItem
                checked={selectedCellRevokable()}
                onChange={setSelectedCellRevokable}
                text={'selectedCellRevokable' + '(' + t('cellSelectedStateCancellable') + ')'}
            />
            <hr />
            <button class="btn" onClick={() => setCurrentRow('Jack')}>
                setCurrentRow('Jack')
            </button>
            <button class="btn" onClick={() => setSelectedCell(dataSource[0], columns[1])}>
                setSelectedCell('Jack-age')
            </button>
            <button class="btn" onClick={() => setCurrentRow('Disabled')}>
                setCurrentRow('Disabled')
            </button>

            <StkTable
                ref={(i: any) => (stkTableRef = i)}
                rowKey="name"
                stripe={stripe()}
                rowActive={rowActive}
                cellActive={cellActive()}
                rowHover={rowHover()}
                cellHover={cellHover()}
                selectedCellRevokable={selectedCellRevokable()}
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    );
}
