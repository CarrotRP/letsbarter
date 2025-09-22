export default function AreaInput(props) {
    const {data, label, setter, getter, color1, color2} = props;

    return (
        <span style={{ position: 'relative' }}>
            <label htmlFor={data} style={{ color: color1 ? color1 : getter == '' ? '#a9a9a9' : 'var(--text-secondary)' }}>{label}</label>
            <textarea name={data} id={data} style={{color: color2}} value={getter} onChange={e => setter(e.target.value)} maxLength={190}></textarea>
        </span>
    );
}