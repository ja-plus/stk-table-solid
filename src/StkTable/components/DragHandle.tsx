/** 行拖拽手柄 */
export default function DragHandle(props: { onDragStart?: (e: DragEvent) => void }) {
    return (
        <span class="drag-row-handle" draggable="true" onDragStart={e => props.onDragStart?.(e)}>
            <svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor">
                <path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z"></path>
            </svg>
        </span>
    );
}
