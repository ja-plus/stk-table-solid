import { createSignal, onMount, onCleanup } from 'solid-js';
import StkTable from '../../StkTable';
import { columns, dataSource as dataSourceRaw } from './const';

export default function HighlightAnimation() {
    let stkTableRef: any;
    const [dataSource, setDataSource] = createSignal<any[]>([...dataSourceRaw]);

    onMount(() => {
        const interval1 = window.setInterval(() => {
            stkTableRef?.setHighlightDimCell('id1', 'age', {
                keyframe: {
                    color: ['#fff', '#C70000', '#fff'],
                    transform: ['scale(1)', 'scale(1.1)', 'scale(1)'],
                    boxShadow: ['unset', '0 0 10px #aaa', 'unset'],
                    easing: 'cubic-bezier(.11,.1,.03,.98)',
                },
                duration: 1000,
            });
        }, 1790);
        onCleanup(() => {
            window.clearInterval(interval1);
        });
    });

    function addRowAnimation(id: string) {
        stkTableRef?.setHighlightDimRow([id], {
            keyframe: [
                {
                    backgroundColor: '#1e4c99',
                    transform: 'translateY(-30px) scale(0.6)',
                    opacity: 0,
                    easing: 'cubic-bezier(.11,.1,.03,.98)',
                },
                { backgroundColor: '#1B1B24', transform: 'translateY(0) scale(1)', opacity: 1 },
            ],
            duration: 1000,
        });
    }

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
            addRowAnimation(id);
        }, 0);
    }

    return (
        <div>
            <button class="btn" onClick={addData}>
                Add data
            </button>
            <StkTable ref={(i: any) => (stkTableRef = i)} style={{ height: '200px' }} rowKey="id" columns={columns} dataSource={dataSource()} />
        </div>
    );
}
