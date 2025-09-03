import { Link, Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import SidePanel from "../component/SidePanel";
import TextLogo from "../component/TextLogo";
import "./AuthLayout.css";
import googleIcon from "../assets/google.png";

export default function AuthLayout() {
    const location = useLocation();

    const headTextStyle = {
        fontSize: '48px',
        color: 'var(--text-primary)',
        justifySelf: 'center',
        letterSpacing: '-1px'
    };

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
                    <button className="submit-btn">
                        {location.pathname == '/login' ? "Login" : "Sign Up"}
                    </button>
                    <button className="sign-with-google"><img src={googleIcon} alt="" className="googleIcon" style={{ width: '24px' }} />Sign in with Google</button>
                </section>
                {location.pathname == "/login" ?
                    <Link to="/signup">Don't have an account? <b>Sign Up</b></Link> :
                    <Link to="/login">Have an account? <b>Sign In</b></Link>
                }
            </section>
        </main>
    );
}