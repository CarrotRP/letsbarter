export default function FormComponent(props) {
    const {htmlFor, label, type, placeholder} = props;

    return (
        <>
            <label htmlFor={htmlFor} style={{ marginTop: '25px', marginBottom: '5px', display: 'block' }}>{label}</label>
            <input type={type} placeholder={placeholder} />
        </>
    );
}