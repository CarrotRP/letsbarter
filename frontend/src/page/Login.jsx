import eyeIcon from "../assets/eye.png";
import './Login.css';
import FormComponent from "../component/FormComponent";

export default function Login() {
    return (
        <>
            <section className="form-input">
                <FormComponent htmlFor="email" label="Email" type="email" placeholder="Enter your email"/>
                <FormComponent htmlFor="password" label="Password" type="password" placeholder="Enter your password"/>
                <img src={eyeIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute' }} />
            </section>
            <span className="options">
                <span className="remember">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" style={{ fontSize: '14px' }}>Remember me</label>
                </span>
                <a href="" style={{ fontSize: '14px' }}>Forgot Password</a>
            </span>
        </>
    );
}