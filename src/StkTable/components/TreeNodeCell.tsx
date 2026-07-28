import { PrivateStkTableColumn } from '../types';
import TriangleIcon from './TriangleIcon';

type TreeNodeCellProps = {
    col: PrivateStkTableColumn<any>;
    row: any;
    onClick?: (e: MouseEvent) => void;
};

/** 树形节点单元格 */
export default function TreeNodeCell(props: TreeNodeCellProps) {
    return (
        <div
            title={props.row[props.col.dataIndex] || ''}
            style={props.row.__T_LV__ ? `padding-left:${props.row.__T_LV__ * 16}px` : ''}
        >
            {props.row.children !== void 0 && <TriangleIcon onClick={e => props.onClick?.(e as any)} />}
            <span style={!props.row.children ? 'padding-left: 16px;' : undefined}>
                {props.row[props.col.dataIndex] ?? ''}
            </span>
        </div>
    );
}
