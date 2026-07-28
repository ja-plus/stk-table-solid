export default function CheckItem(props: {
    text?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
}) {
    return (
        <label>
            <input
                type="checkbox"
                checked={!!props.checked}
                onChange={e => props.onChange?.(e.currentTarget.checked)}
            />
            <span>{props.text ?? '--'}</span>
        </label>
    );
}
