import TextLogo from "./TextLogo";
import './Footer.css';
import { Link } from "react-router";
import fbIcon from "../assets/facebook.png"
import igIcon from "../assets/instagram.png"

export default function Footer() {

    return (
        // change a tag to Link later
        <footer>
            <div className="top">
                <div className="logo-desc">
                    <TextLogo />
                    <p style={{ color: 'var(--text-primary)', fontWeight: '200' }}>Trade items without using your money. Save up your money!</p>
                    <Link to="#"><img src={fbIcon} alt="facebookIcon" style={{ marginRight: '10px' }} /></Link>
                    <Link to="#"><img src={igIcon} alt="instagramIcon" /></Link>
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
            <div className="bot" style={{padding: '0 20px'}}>
                <hr style={{height: '1px', backgroundColor: 'var(--text-secondary)', border: 'none'}}/>
                <p style={{padding: '30px 130px', fontWeight: '600'}}>&copy;2025 LETSBARTER. All rights reserved</p>
            </div>
        </footer>
    );
}