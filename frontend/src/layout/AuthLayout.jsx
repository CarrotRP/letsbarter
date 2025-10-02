import { useNavigate, Link, Outlet, useLocation } from "react-router";
import SidePanel from "../component/SidePanel";
import TextLogo from "../component/TextLogo";
import "./AuthLayout.css";
import googleIcon from "../assets/google.png";
import { useEffect } from "react";

export default function AuthLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const headTextStyle = {
        fontSize: '48px',
        color: 'var(--text-primary)',
        justifySelf: 'center',
        letterSpacing: '-1px'
    };

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
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
            'http://localhost:3000/user/oauth', //url
            'Google Login', //popup window name
            `width=${width},height=${height}`
        );

        window.addEventListener('message', (e) => {
            if (e.origin !== 'http://localhost:3000' && e.origin !== 'http://localhost:5173') return; //security check
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
                    <p style={headTextStyle}>
                        {location.pathname == '/login' ? "Welcome Back" : "Create an Account"}
                    </p>
                    <Outlet />
                    <button className="sign-with-google" onClick={handleGoogleClick}><img src={googleIcon} alt="" className="googleIcon" style={{ width: '24px' }} />Sign in with Google</button>
                </section>
                {location.pathname == "/login" ?
                    <Link to="/signup">Don't have an account? <b>Sign Up</b></Link> :
                    <Link to="/login">Have an account? <b>Sign In</b></Link>
                }
            </section>
        </main>
    );
}