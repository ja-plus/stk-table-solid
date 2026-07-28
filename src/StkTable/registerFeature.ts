import { createMemo, createSignal } from 'solid-js';
import { useAreaSelection, useAreaSelectionName } from './features';
import { MY_FN_NAME } from './features/const';

type OnDemandFeature = {
    [useAreaSelectionName]: typeof useAreaSelection<any>;
};

export const ON_DEMAND_FEATURE: OnDemandFeature = {
    [useAreaSelectionName]: (props => {
        if ('areaSelection' in props) {
            console.warn('useAreaSelection is not registered');
        }
        return {
            config: createMemo(() => ({ enabled: false })),
            isSelecting: createSignal(false)[0],
            onMD: () => {},
            // getClass: () => [],
            // getRowClass: () => [],
            get: () => ({ rows: [], cols: [], ranges: [] }),
            set: () => [],
            clear: () => {},
            copy: () => '',
        };
    }) as typeof useAreaSelection<any>,
};

type Feature = OnDemandFeature[keyof OnDemandFeature];

export function registerFeature(feature: Feature | Feature[]) {
    const features = Array.isArray(feature) ? feature : [feature];
    features.forEach(f => {
        const fnName = (f as any)[MY_FN_NAME];
        if (!fnName) {
            console.warn('invalid feature');
            return;
        }
        (ON_DEMAND_FEATURE as any)[fnName] = f as any;
    });
}
