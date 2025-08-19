import SidePanel from "../component/SidePanel";
import TextLogo from "../component/TextLogo";
import eyeIcon from "../assets/eye.png";
import googleIcon from "../assets/google.png";
import './Login.css';

export default function Login() {
    return (
        <main className="login-page">
            <SidePanel />
            <section className="right-panel">
                <TextLogo />
                <section className="form">
                    <p style={{ fontSize: '48px', color: 'var(--text-primary)', justifySelf: 'center' }}>Welcome Back</p>
                    <section className="form-input">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter your email" />
                        <label htmlFor="" style={{marginTop: '25px'}}>Password</label>
                        <input type="password" placeholder="Enter your password" /><img src={eyeIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute' }} />
                    </section>
                    <span className="options">
                        <span className="remember">
                            <input type="checkbox" id="rememberMe"/>
                            <label htmlFor="rememberMe" style={{fontSize: '14px'}}>Remember me</label>
                        </span>
                        <a href="" style={{fontSize: '14px'}}>Forgot Password</a>
                    </span>
                    <button className="login-btn">Login</button>
                    <button className="sign-with-google"><img src={googleIcon} alt="" className="googleIcon" style={{width: '24px'}}/>Sign in with Google</button>
                </section>
                <a href="" style={{ justifySelf: 'center' }}>Don't have an account? <span style={{ fontWeight: 'bold' }}>Sign Up</span></a>
            </section>
        </main>
    );
}