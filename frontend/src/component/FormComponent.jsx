import './FormComponent.css';
import { useTranslation } from 'react-i18next';

export default function FormComponent(props) {
    const { htmlFor, label, type, placeholder, value, setter, disable, unchange } = props;
    const { t } = useTranslation();

    return (
        <span>
            <label htmlFor={htmlFor} style={{ marginTop: '15px', marginBottom: '5px', display: 'block', userSelect: 'none' }}>{label}
                <p style={{ display: 'inline', fontSize: '14px' }}>{unchange ? ' (' + t('unchangeable') + ')' : ''}</p></label>
            <input type={type} placeholder={placeholder} value={value} onChange={e => setter(e.target.value)} disabled={disable} />
        </span>
    );
}