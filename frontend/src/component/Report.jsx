import { useTranslation } from 'react-i18next';
import close from '../assets/close.png'
import './Report.css';

export default function Report(props) {
    const {reportBgRef, reportRef, handleReportClose} = props;
    const {t} = useTranslation();

    return (
        <>
            <div className="popup-bg" ref={reportBgRef}></div>
            <div className="report" ref={reportRef}>
                <span>
                    <h1>{t('report user')}</h1>
                    <img src={close} alt="" style={{cursor: 'pointer'}} onClick={handleReportClose}/>
                </span>
                <ul>
                    <li>
                        <input type="radio" id='deceptive' name='report' />
                        <label htmlFor="deceptive">{t('deceptive')}</label>
                    </li>
                    <li>
                        <input type="radio" id='fraud' name='report' />
                        <label htmlFor="fraud">{t('fraud')}</label>
                    </li>
                    <li>
                        <input type="radio" id='misinfo' name='report' />
                        <label htmlFor="misinfo">{t('misinformation')}</label>
                    </li>
                    <li>
                        <input type="radio" id='shocking' name='report' />
                        <label htmlFor="shocking">{t('shocking')}</label>
                    </li>
                    <li>
                        <input type="radio" id='nudity' name='report' />
                        <label htmlFor="nudity">{t('nudity')}</label>
                    </li>

                    <li>
                        <input type="radio" id='impersonation' name='report' />
                        <label htmlFor="impersonation">{t('impersonation')}</label>
                    </li>
                    <li>
                        <input type="radio" id='other' name='report' />
                        <label htmlFor="other">{t('other')}</label>
                    </li>
                </ul>
                <button className='report-submit'>{t('submit')}</button>
            </div>
        </>
    );
}