import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from '../assets/eye-slash.svg'
import FormComponent from "../component/FormComponent";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../config/apiConfig";

export default function Signup() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [conpassword, setConPassword] = useState('');
    const {t} = useTranslation();

    const handleEyeClick = () => {
        setIsVisible(!isVisible);
    }

    const handleSignupClick = () => {
        if (fullname && email && occupation && password && conpassword) {
            if (password == conpassword) {
                fetch(`${BASE_URL}/user/signup`, {
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
            <section className="form-input l-signup-form">
                <FormComponent htmlFor="fullname" label={t('fullname')} type="text" placeholder={t('enter name')} value={fullname} setter={setFullname} />
                <FormComponent htmlFor="email" label={t('email')} type="email" placeholder={t('enter email')} value={email} setter={setEmail} />
                <FormComponent htmlFor="occupation" label={t('occupation')} type="text" placeholder={t('enter occupation')} value={occupation} setter={setOccupation} />
                <FormComponent htmlFor="password" label={t('password')} type={isVisible ? 'text' : "password"} placeholder={t('enter password')} value={password} setter={setPassword} />
                <FormComponent htmlFor="password" label={t('confirm password')} type={isVisible ? 'text' : "password"} placeholder={t('enter confirm')} value={conpassword} setter={setConPassword} />
                <img onClick={handleEyeClick} src={isVisible ? eyeIcon : eyeCloseIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute', bottom: '95px', right: '10px', cursor: 'pointer' }} />
            </section>
            <button className="submit-btn" onClick={handleSignupClick}>{t('signup')}</button>
        </>

    );
}