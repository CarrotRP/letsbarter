import { useTranslation } from 'react-i18next';
import close from '../assets/close.png'
import './Report.css';

export default function Report(props) {
    const { reportBgRef, reportRef, handleReportClose, report, setReport} = props;
    const { t } = useTranslation();

    return (
        <>
            {/* <div className="popup-bg" ref={reportBgRef}></div> */}
            <div className="report" ref={reportBgRef}>
                <div className="report-content" ref={reportRef}>
                    <span>
                        <h1>{t('report user')}</h1>
                        <img src={close} alt="" style={{ cursor: 'pointer' }} onClick={handleReportClose} />
                    </span>
                    <ul>
                        <li>
                            <input type="radio" id='deceptive' name='report' value='deceptive' checked={report == 'deceptive'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="deceptive">{t('deceptive')}</label>
                        </li>
                        <li>
                            <input type="radio" id='fraud' name='report' value='fraud' checked={report == 'fraud'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="fraud">{t('fraud')}</label>
                        </li>
                        <li>
                            <input type="radio" id='misinfo' name='report' value='misinfo' checked={report == 'misinfo'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="misinfo">{t('misinformation')}</label>
                        </li>
                        <li>
                            <input type="radio" id='shocking' name='report' value='shocking' checked={report == 'shocking'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="shocking">{t('shocking')}</label>
                        </li>
                        <li>
                            <input type="radio" id='nudity' name='report' value='nudity' checked={report == 'nudity'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="nudity">{t('nudity')}</label>
                        </li>

                        <li>
                            <input type="radio" id='impersonation' name='report' value='impersonation' checked={report == 'impersonation'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="impersonation">{t('impersonation')}</label>
                        </li>
                        <li>
                            <input type="radio" id='other' name='report' value='other' checked={report == 'other'} onChange={(e) => setReport(e.target.value)}/>
                            <label htmlFor="other">{t('other')}</label>
                        </li>
                    </ul>
                    <button className='report-submit' onClick={handleReportClose}>{t('submit')}</button>
                </div>
            </div>
        </>
    );
}