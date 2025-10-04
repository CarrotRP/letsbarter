import { useTranslation } from 'react-i18next';
import close from '../assets/close.png';
import './Filter.css';

export default function Filter(props) {
    const { filterRef, filter, setFilter } = props;
    const {t} = useTranslation();

    const handleCloseClick = () => {
        filterRef.current.classList.remove('filter-popup-active');
    }

    return (
        <div className="filter-popup" ref={filterRef}>
            <span className='filter-popup-head'>
                <h2>{t('filter')}</h2>
                <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
            </span>

            <div className="filter-option">
                <p>{t('condition')}</p>
                <div className="checks">
                    <span>
                        <label htmlFor="less5" onClick={() => setFilter(prev => (filter.condition == 'lt' ? { ...prev, condition: null } : { ...prev, condition: 'lt' }))} style={{ fontWeight: filter.condition == 'lt' ? 800 : 300 }}>{t('less than 5')}</label>
                        <img src={close} alt="" style={{ width: '10px', display: filter.condition == 'lt' ? 'block' : 'none' }} />
                    </span>
                    <span>
                        <label htmlFor="more5" onClick={() => setFilter(prev => (filter.condition == 'gt' ? { ...prev, condition: null } : { ...prev, condition: 'gt' }))} style={{ fontWeight: filter.condition == 'gt' ? 800 : 300 }}>{t('more than 5')}</label>
                        <img src={close} alt="" style={{ width: '10px', display: filter.condition == 'gt' ? 'block' : 'none' }} />
                    </span>
                </div>
            </div>
            <div className="filter-option">
                <p>{t('looking')}</p>
                <div className="checks">
                    <span>
                        <label htmlFor="valueAsc" onClick={() => setFilter(prev => (filter.sortOpt == 'asc' ? {...prev, sortOpt: null} : { ...prev, sortOpt: 'asc' }))} style={{ fontWeight: filter.sortOpt == 'asc' ? 800 : 300 }}>{t('estimate asc')}</label>
                        <img src={close} alt="" style={{ width: '10px', display: filter.sortOpt == 'asc' ? 'block' : 'none' }} />
                    </span>
                    <span>
                        <label htmlFor="valueDesc" onClick={() => setFilter(prev => (filter.sortOpt == 'desc' ? {...prev, sortOpt: null} : { ...prev, sortOpt: 'desc' }))} style={{ fontWeight: filter.sortOpt == 'desc' ? 800 : 300 }}>{t('estimate desc')}</label>
                        <img src={close} alt="" style={{ width: '10px', display: filter.sortOpt == 'desc' ? 'block' : 'none' }} />
                    </span>
                </div>
            </div>
        </div>
    );
}