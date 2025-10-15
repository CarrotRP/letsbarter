import { useNavigate, Link, Outlet, useLocation } from "react-router";
import SidePanel from "../component/SidePanel";
import TextLogo from "../component/TextLogo";
import "./AuthLayout.css";
import googleIcon from "../assets/google.png";
import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { BASE_URL } from "../config/apiConfig";

export default function AuthLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const headTextStyle = {
        fontSize: '48px',
        color: 'var(--text-primary)',
        justifySelf: 'center',
        letterSpacing: '-1px'
    };

    useEffect(() => {
        fetch(`${BASE_URL}/user/check-auth`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.authenticated){
                navigate(data.redirect);
            }
        })
    }, []);

    const handleGoogleClick = () => {
        const width = 500, height = 500;

        const popup = window.open(
            `${BASE_URL}/user/oauth`, //url
            'Google Login', //popup window name
            `width=${width},height=${height}`
        );

        window.addEventListener('message', (e) => {
            if (e.origin !== BASE_URL && e.origin !== window.location.origin) return; //security check
            if (e.data.type === 'google-auth-success') {
            }
            navigate(e.data.redirect);
        });
    }

    return (
        <main className="auth-page">
            {/* TODO: add min width to side panel */}
            <SidePanel />
            <section className="right-panel">
                <Link to="/">
                    <TextLogo />
                </Link>
                <section className="form">
                    <p style={headTextStyle} className="auth-greet">
                        {location.pathname == '/login' ? t('welcome') : t('create account')}
                    </p>
                    <Outlet />
                    <button className="sign-with-google" onClick={handleGoogleClick}><img src={googleIcon} alt="" className="googleIcon" style={{ width: '24px' }} />{t('google sign')}</button>
                </section>
                {location.pathname == "/login" ?
                    <Link to="/signup"><Trans i18nKey='no account' components={{bold: <b></b>}}/></Link> :
                    <Link to="/login"><Trans i18nKey='have account' components={{bold: <b></b>}}/></Link>
                }
            </section>
        </main>
    );
}