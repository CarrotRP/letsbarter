import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from '../assets/eye-slash.svg';
import './Login.css';
import FormComponent from "../component/FormComponent";
import { useState } from "react";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);

    const handleEyeClick = () => {
        setIsVisible(!isVisible);
    }

    return (
        <>
            <section className="form-input">
                <FormComponent htmlFor="email" label="Email" type="email" placeholder="Enter your email"/>
                <FormComponent htmlFor="password" label="Password" type={isVisible ? 'text' : 'password'} placeholder="Enter your password"/>
                <img onClick={handleEyeClick} src={isVisible ? eyeIcon : eyeCloseIcon} alt="" className="eyeIcon" style={{ cursor: 'pointer', width: '20px', position: 'absolute', bottom: '10px', right: '10px'}} />
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