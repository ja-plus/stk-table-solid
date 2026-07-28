let radioGroupSeed = 0;

export default function RadioGroup<T>(props: {
    text: string;
    options: { label: string; value: T }[];
    name?: string;
    value?: T;
    onChange?: (value: T | undefined) => void;
}) {
    const name = props.name || `radio-group-${++radioGroupSeed}`;
    return (
        <div class="radio-group">
            <span class="main-label" style={{ 'font-weight': 'bold' }}>
                {props.text}:
            </span>
            {(props.options || []).map((option, i) => (
                <label>
                    <input
                        type="radio"
                        name={name}
                        value={String(option.value)}
                        checked={props.value === option.value}
                        onChange={() => props.onChange?.(option.value)}
                    />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    );
}
