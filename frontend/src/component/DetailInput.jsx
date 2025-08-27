export default function DetailInput(props) {
    const { type, data, placeholder, setter, getter, p } = props;

    return (
        <span style={{ position: 'relative' }}>
            <input type={type} id={data} placeholder={placeholder} onChange={e => setter(e.target.value)} />
            <label htmlFor={data}>{type == 'date' ? placeholder : getter == '' ? "" : placeholder}</label>
            {p ? <p style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '14px', fontWeight: 'bold' }}>{p}</p> : <></>}

        </span>
    );
}