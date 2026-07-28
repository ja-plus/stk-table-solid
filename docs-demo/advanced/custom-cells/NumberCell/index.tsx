import { createSignal } from 'solid-js';
import StkTable from '../../../StkTable';
// 开发中功能：此处从源码导入；发布后可改为 import { createNumberCell } from 'stk-table-solid'
import { createNumberCell } from '../../../../src/StkTable/index';
import type { StkTableColumn } from '../../../../src/StkTable/index';
import { useI18n } from '../../../hooks/useI18n/index';

interface RowData {
    code: string;
    price: number;
    volume: number;
    turnover: number;
}

export default function NumberCellDemo() {
    const { t, isZH } = useI18n();

    // 现价：2 位小数 + 千分位
    const { NumberCell: priceCell } = createNumberCell({ decimals: 2 });

    // 成交量：万/亿 单位缩放
    const { NumberCell: volumeCell } = createNumberCell({ abbr: isZH ? 'cn' : 'en' });

    // 成交额：万/亿 缩放 + 货币前缀
    const { NumberCell: amountCell } = createNumberCell({
        abbr: isZH ? 'cn' : 'en',
        prefix: '¥',
    });

    const columns: StkTableColumn<RowData>[] = [
        { title: t('code'), dataIndex: 'code', width: 100 },
        { title: t('price'), dataIndex: 'price', width: 110, align: 'right', customCell: priceCell() },
        { title: t('volume'), dataIndex: 'volume', width: 120, align: 'right', customCell: volumeCell() },
        {
            title: t('turnover'),
            dataIndex: 'turnover',
            width: 140,
            align: 'right',
            customCell: amountCell(),
        },
    ];

    const [dataSource] = createSignal<RowData[]>([
        { code: '600519', price: 1685.32, volume: 3456789, turnover: 5823456789 },
        { code: '000858', price: 152.18, volume: 12345678, turnover: 1878123456 },
        { code: '300750', price: 198.65, volume: 23456789, turnover: 4623456789 },
        { code: '601318', price: 48.76, volume: 45678901, turnover: 2223456789 },
        { code: '600036', price: 36.42, volume: 34567890, turnover: 1258765432 },
    ]);

    return <StkTable rowKey="code" columns={columns} dataSource={dataSource()} />;
}
