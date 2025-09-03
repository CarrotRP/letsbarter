import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from '../assets/eye-slash.svg'
import FormComponent from "../component/FormComponent";
import { useState } from "react";

export default function Signup() {
    const [isVisible, setIsVisible] = useState(false);

    const handleEyeClick = () => {
        setIsVisible(!isVisible);
    }

    return (
        <section className="form-input">
            <FormComponent htmlFor="fullname" label="Full Name" type="text" placeholder="Enter your name"/>
            <FormComponent htmlFor="email" label="Email" type="email" placeholder="Enter your email"/>
            <FormComponent htmlFor="password" label="Password" type={isVisible ? 'text' : "password"} placeholder="Enter your password"/>
            <FormComponent htmlFor="password" label="Confirm Password" type={isVisible ? 'text' : "password"} placeholder="Enter confirm password"/>
            <img onClick={handleEyeClick} src={isVisible ? eyeIcon : eyeCloseIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute', bottom: '95px', right: '10px', cursor: 'pointer'}} />
        </section>
    );
}