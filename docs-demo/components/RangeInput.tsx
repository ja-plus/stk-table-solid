export default function RangeInput(props: {
    label: string;
    suffix?: string;
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}) {
    return (
        <div style={{ display: 'inline-flex', 'align-items': 'center', 'margin-right': '10px' }}>
            <span>{props.label}</span>
            <input
                type="range"
                min={props.min}
                max={props.max}
                step={props.step}
                value={props.value}
                onInput={e => props.onChange?.(Number(e.currentTarget.value))}
            />
            <span>
                {props.value} {props.suffix}
            </span>
        </div>
    );
}
