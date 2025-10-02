import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from '../assets/eye-slash.svg'
import FormComponent from "../component/FormComponent";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState('');

    const handleEyeClick = () => {
        setIsVisible(!isVisible);
    }

    const handleSignupClick = () => {
        if (fullname && email && occupation && password && conpassword) {
            if (password == conpassword) {
                fetch('http://localhost:3000/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: fullname, email, occupation, password, profile: 'uploads/default.png' })
                }).then(res => res.json())
                    .then(data => {
                        navigate(data.redirect);
                    });
            } else {
                console.log('password must match');
            }
        }
    }

    return (
        <>
            <section className="form-input">
                <FormComponent htmlFor="fullname" label="Full Name" type="text" placeholder="Enter your name" value={fullname} setter={setFullname} />
                <FormComponent htmlFor="email" label="Email" type="email" placeholder="Enter your email" value={email} setter={setEmail} />
                <FormComponent htmlFor="occupation" label="Occupation" type="text" placeholder="Enter your occupation" value={occupation} setter={setOccupation} />
                <FormComponent htmlFor="password" label="Password" type={isVisible ? 'text' : "password"} placeholder="Enter your password" value={password} setter={setPassword} />
                <FormComponent htmlFor="password" label="Confirm Password" type={isVisible ? 'text' : "password"} placeholder="Enter confirm password" value={conpassword} setter={setConPassword} />
                <img onClick={handleEyeClick} src={isVisible ? eyeIcon : eyeCloseIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute', bottom: '95px', right: '10px', cursor: 'pointer' }} />
            </section>
            <button className="submit-btn" onClick={handleSignupClick}>Sign Up</button>
        </>

    );
}