import './FormComponent.css';

export default function FormComponent(props) {
    const {htmlFor, label, type, placeholder, value} = props;

    return (
        <span>
            <label htmlFor={htmlFor} style={{ marginTop: '15px', marginBottom: '5px', display: 'block' }}>{label}</label>
            <input type={type} placeholder={placeholder} value={value}/>
        </span>
    );
}