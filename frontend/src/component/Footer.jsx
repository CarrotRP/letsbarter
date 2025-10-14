import TextLogo from "./TextLogo";
import './Footer.css';
import { Link } from "react-router";
import fbIcon from "../assets/facebook.png"
import igIcon from "../assets/instagram.png"
import dono from '../assets/dono.jpg'
import { useTranslation } from "react-i18next";
import Ads from "./Ads";

export default function Footer(props) {
    const { langRef, language, setLanguage, donoRef, donoBgRef} = props;
    const { t } = useTranslation();

    const handleLangDropdown = (e) => {
        e.stopPropagation();
        langRef.current.classList.toggle('lang-dropdown-active');
    }

    const handleDonoClick = (e) => {
        e.stopPropagation();
        donoBgRef.current?.classList?.toggle('dono-popup-active');
        document.body.style.overflow = 'hidden';
    }

    return (
        // change a tag to Link later
        <footer>
            <div className="ads" style={{ position: 'relative' }}>
                <Ads />
            </div>
            <div className="dono-popup" ref={donoBgRef}>
                <div ref={donoRef} style={{userSelect: 'none'}}>
                    <img src={dono} alt="" />
                    <h2 style={{ color: 'white', fontWeight: 600, fontSize: '32px' }}>Thank you for the support!</h2>
                </div>
            </div>
            <div className="top">
                <div className="logo-desc">
                    <TextLogo />
                    <p style={{ color: 'var(--text-primary)', fontWeight: '200' }}>{t('trade items without short')}</p>
                    <span style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '15px', position: 'relative' }}>
                        <Link to="#"><img src={fbIcon} alt="facebookIcon" loading="lazy" /></Link>
                        <Link to="#"><img src={igIcon} alt="instagramIcon" loading="lazy" /></Link>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={handleLangDropdown}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                            </svg>
                            <p style={{ userSelect: 'none' }}>{language == 'kh' ? t('khmer') : t('english')}</p>
                        </span>
                        <div className="lang-dropdown" ref={langRef}>
                            <li onClick={() => { setLanguage('kh'); langRef.current.classList.remove('lang-dropdown-active'); }}>{t('khmer')}</li>
                            <li onClick={() => { setLanguage('en'); langRef.current.classList.remove('lang-dropdown-active'); }}>{t('english')}</li>
                        </div>
                    </span>
                </div>
                <div className="info">
                    <h4>{t('information')}</h4>
                    <li><Link to="">{t('about')}</Link></li>
                    <li><Link to="">{t('features')}</Link></li>
                    <li><Link to="">{t('career')}</Link></li>
                </div>
                <div className="customer-s">
                    <h4>{t('customer service')}</h4>
                    <li><Link to="">{t('customer support')}</Link></li>
                    <li><Link to="">{t('term')}</Link></li>
                    <li><Link to="">{t('privacy')}</Link></li>
                </div>
                <div className="useful-info">
                    <h4>{t('useful')}</h4>
                    <li><Link to="">{t('safety')}</Link></li>
                    <li><Link to="">{t('feedback')}</Link></li>
                </div>
                <div className="dono-link" style={{ position: 'relative' }}>
                    <div className="dono" style={{ position: 'absolute', bottom: '-55px', left: 0, padding: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }} onClick={handleDonoClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cup-hot" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175" />
                            <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8" />
                        </svg>
                        <h4 style={{ color: 'var(--secondary)' }}>Support the site</h4>
                    </div>
                </div>
            </div>
            <div className="bot" style={{ padding: '0 20px' }}>
                <hr style={{ height: '1px', backgroundColor: 'var(--text-secondary)', border: 'none' }} />
                <p style={{ padding: '30px 130px', fontWeight: '600' }}>&copy;2025 LETSBARTER. All rights reserved</p>
            </div>
        </footer>
    );
}