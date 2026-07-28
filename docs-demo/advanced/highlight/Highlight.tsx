import { createSignal, onMount, onCleanup } from 'solid-js';
import RangeInput from '../../components/RangeInput';
import StkTable from '../../StkTable';
import type { HighlightConfig } from '../../../src/StkTable/types/index';
import { columns, dataSource as dataSourceRaw } from './const';

export default function Highlight() {
    let stkTableRef: any;
    const [dataSource, setDataSource] = createSignal<any[]>([...dataSourceRaw]);
    const [duration, setDuration] = createSignal(2);
    const [fps, setFps] = createSignal(0);

    const highlightConfig: HighlightConfig = {
        get duration() {
            return duration();
        },
        get fps() {
            return fps();
        },
    };

    onMount(() => {
        const interval1 = window.setInterval(() => {
            stkTableRef?.setHighlightDimCell('id1', 'age');
        }, 2500);
        const interval2 = window.setInterval(() => {
            stkTableRef?.setHighlightDimCell('id2', 'gender');
        }, 1200);
        const interval3 = window.setInterval(() => {
            stkTableRef?.setHighlightDimRow(['id0']);
        }, 3000);
        onCleanup(() => {
            window.clearInterval(interval1);
            window.clearInterval(interval2);
            window.clearInterval(interval3);
        });
    });

    function addData() {
        const id = 'id' + dataSource().length;
        const newRow = {
            id,
            name: 'name' + dataSource().length,
            age: dataSource().length,
            gender: dataSource().length % 2 === 0 ? 'male' : 'female',
        };
        setDataSource([newRow, ...dataSource()]);
        setTimeout(() => {
            stkTableRef?.setHighlightDimRow([id]);
        }, 0);
    }

    return (
        <div>
            <button class="btn" style={{ 'margin-right': '20px' }} onClick={addData}>
                Add data
            </button>
            <RangeInput value={duration()} onChange={setDuration} min={0.1} max={5} step={0.1} label="Duration" suffix="s" />
            <RangeInput value={fps()} onChange={setFps} min={0} max={30} label="FPS" suffix="fps" />
            <StkTable
                ref={(i: any) => (stkTableRef = i)}
                rowKey="id"
                style={{ height: '200px' }}
                highlightConfig={highlightConfig}
                columns={columns}
                dataSource={dataSource()}
            />
        </div>
    );
}
