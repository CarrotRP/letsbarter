import eyeIcon from "../assets/eye.svg";
import eyeCloseIcon from '../assets/eye-slash.svg';
import './Login.css';
import FormComponent from "../component/FormComponent";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../config/apiConfig";

export default function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {user, dispatch} = useContext(UserContext);
    const {t} = useTranslation();

    const handleEyeClick = () => {
        setIsVisible(!isVisible);
    }

    const handleLoginClick = () => {
        if(email && password){
            fetch(`${BASE_URL}/user/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: email, password})
            }).then(res => res.json())
            .then(data => {
                dispatch({type: 'SET_USER', payload: data.user});
                navigate(data.redirect);
            });
        }
    }

    return (
        <>
            <section className="form-input">
                <FormComponent htmlFor="email" label={t('email')} type="email" placeholder={t('enter email')} value={email} setter={setEmail}/>
                <FormComponent htmlFor="password" label={t('password')} type={isVisible ? 'text' : 'password'} placeholder={t('enter password')} value={password} setter={setPassword}/>
                <img onClick={handleEyeClick} src={isVisible ? eyeIcon : eyeCloseIcon} alt="" className="eyeIcon" style={{ cursor: 'pointer', width: '20px', position: 'absolute', bottom: '10px', right: '10px' }} />
            </section>
            <span className="options">
                <span className="remember">
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" style={{ fontSize: '14px' }}>{t('remember')}</label>
                </span>
                <a href="" style={{ fontSize: '14px' }}>{t('forget')}</a>
            </span>
            <button className="submit-btn" onClick={handleLoginClick}>{t('login')}</button>
        </>
    );
}