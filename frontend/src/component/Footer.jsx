import TextLogo from "./TextLogo";
import './Footer.css';
import { Link } from "react-router";
import fbIcon from "../assets/facebook.png"
import igIcon from "../assets/instagram.png"

export default function Footer(props) {
    const { langRef } = props;
    
    const handleLangDropdown = (e) => {
        e.stopPropagation();
        langRef.current.classList.toggle('lang-dropdown-active');
    }

    return (
        // change a tag to Link later
        <footer>
            <div className="top">
                <div className="logo-desc">
                    <TextLogo />
                    <p style={{ color: 'var(--text-primary)', fontWeight: '200' }}>Trade items without using your money. Save up your money!</p>
                    <span style={{ display: 'flex', alignItems: 'center', marginTop: '20px', gap: '15px', position: 'relative' }}>
                        <Link to="#"><img src={fbIcon} alt="facebookIcon" loading="lazy" /></Link>
                        <Link to="#"><img src={igIcon} alt="instagramIcon" loading="lazy" /></Link>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}} onClick={handleLangDropdown}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                            </svg>
                            <p style={{userSelect: 'none'}}>ខ្មែរ</p>
                        </span>
                        <div className="lang-dropdown" ref={langRef}>
                            <li>ខ្មែរ</li>
                            <li>English</li>
                        </div>
                    </span>
                </div>
                <div className="info">
                    <h4>INFORMATION</h4>
                    <li><Link to="">About</Link></li>
                    <li><Link to="">Features</Link></li>
                    <li><Link to="">Career</Link></li>
                </div>
                <div className="customer-s">
                    <h4>CUSTOMER SERVICE</h4>
                    <li><Link to="">Customer Support</Link></li>
                    <li><Link to="">Terms & Conditions</Link></li>
                    <li><Link to="">Privacy Policy</Link></li>
                </div>
                <div className="useful-info">
                    <h4>USEFUL INFORMATION</h4>
                    <li><Link to="">Safety Tips</Link></li>
                    <li><Link to="">Feedback</Link></li>
                </div>
            </div>
            <div className="bot" style={{ padding: '0 20px' }}>
                <hr style={{ height: '1px', backgroundColor: 'var(--text-secondary)', border: 'none' }} />
                <p style={{ padding: '30px 130px', fontWeight: '600' }}>&copy;2025 LETSBARTER. All rights reserved</p>
            </div>
        </footer>
    );
}