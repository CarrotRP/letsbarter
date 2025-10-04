import { useTranslation } from 'react-i18next';
import './HorizontalCard.css';

export default function HorizontalCard(props) {
    const {mainImg, pname, condition, lookfor, imgSize, fontSize1, fontSize2, fontSize3} = props;
    const {t} = useTranslation();

    return (
        <div className="horizontal-card">
            <img src={`http://localhost:3000/${mainImg}`} loading='lazy' alt="" className='item-img' style={{width: imgSize ? `${imgSize}px` : null, height: imgSize ? `${imgSize}px` : null, border: '1px solid var(--secondary)'}}/>
            <div className="horizontal-card-detail">
                <h3 style={{ fontWeight: 600, fontSize: fontSize1 ? `${fontSize1}px` : null }}>{pname}</h3>
                <p style={{fontSize: fontSize2 ? `${fontSize2}px` : null}}>{t('condition')} {condition} / 10</p>
                <h3 style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: fontSize3 ? `${fontSize3}px` : null}}>{t('looking')} <br></br><span style={{ color: 'var(--secondary)' }}>{lookfor}</span></h3>
            </div>
        </div>
    );
}