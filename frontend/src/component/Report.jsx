import close from '../assets/close.png'
import './Report.css';

export default function Report(props) {
    const {reportBgRef, reportRef, handleReportClose} = props;

    

    return (
        <>
            <div className="popup-bg" ref={reportBgRef}></div>
            <div className="report" ref={reportRef}>
                <span>
                    <h1>Report User</h1>
                    <img src={close} alt="" style={{cursor: 'pointer'}} onClick={handleReportClose}/>
                </span>
                <ul>
                    <li>
                        <input type="radio" id='deceptive' name='report' />
                        <label htmlFor="deceptive">Deceptive behavior and Spam</label>
                    </li>
                    <li>
                        <input type="radio" id='fraud' name='report' />
                        <label htmlFor="fraud">Fraud and scams</label>
                    </li>
                    <li>
                        <input type="radio" id='misinfo' name='report' />
                        <label htmlFor="misinfo">Misinformation</label>
                    </li>
                    <li>
                        <input type="radio" id='shocking' name='report' />
                        <label htmlFor="shocking">Shocking and graphic content</label>
                    </li>
                    <li>
                        <input type="radio" id='nudity' name='report' />
                        <label htmlFor="nudity">Nudity and sexual content</label>
                    </li>

                    <li>
                        <input type="radio" id='impersonation' name='report' />
                        <label htmlFor="impersonation">Impersonation</label>
                    </li>
                    <li>
                        <input type="radio" id='other' name='report' />
                        <label htmlFor="other">Other</label>
                    </li>
                </ul>
                <button className='report-submit'>Submit</button>
            </div>
        </>
    );
}