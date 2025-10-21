import inventory from '../assets/inventory.png';
import userIcon from '../assets/user.png';
import setting from '../assets/setting.png';
import logout from '../assets/logout.png';
import ProductCard from '../component/ProductCard';
import FormComponent from '../component/FormComponent';
import { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate, Link, useOutletContext } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Toaster from "../component/Toaster";
import { BASE_URL } from "../config/apiConfig";

export default function Profile() {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState('inventory');
    const { user, dispatch, isLoading } = useOutletContext();
    const [username, setUsername] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [profileImg, setProfileImg] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const navigate = useNavigate();

    const [isSending, setIsSending] = useState(false);

    const selectedStyle = {
        backgroundColor: 'var(--primary)',
        borderRadius: '10px',
    }

    //fix on refresh, even if theres user still navigate
    useEffect(() => {
        if (isLoading) return;

        if (user) {
            setUsername(user.username || '');
            setOccupation(user.occupation || '');
            setEmail(user.email || '');

            //main img display(sidebar)
            setProfileImg({ file: null, preview: user?.profile_img?.startsWith('http') ? user?.profile_img : `${BASE_URL}/${user?.profile_img}` });
            //preview img on edit profile 
            setProfilePreview({ file: null, preview: user?.profile_img?.startsWith('http') ? user?.profile_img : `${BASE_URL}/${user?.profile_img}` })
            //fetch user items
            fetch(`${BASE_URL}/item/user-item/${user?._id}?limit=10&page=${page}`)
                .then(res => res.json())
                .then(data => {
                    setTotalPage(data.count);
                    setItem(data.items);
                });
        } else {
            navigate('/');
        }

    }, [user, isLoading, page]);

    const handleLogout = () => {
        fetch(`${BASE_URL}/user/logout`, {
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
            .then(data => {
                navigate(data.redirect);
                dispatch({ type: 'LOGOUT_USER' });
            })
    }

    const handleUserUpdate = () => {
        const formData = new FormData();
        setIsSending(true);

        if (profilePreview && profilePreview.file) {
            formData.append("profile_img", profilePreview.file);
        }

        formData.append("username", username);
        formData.append("occupation", occupation);
        formData.append('email', email);
        if (newPassword) {
            formData.append('password', newPassword);
        }

        fetch(`${BASE_URL}/user/${user._id}`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        }).then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_USER', payload: data })
                setIsSending(false);
            });
    }

    const handleProfileImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['png', 'jpg', 'jpeg'].includes(file.name.toLowerCase().split('.').pop())) {
                toast(<Toaster text="invalid file type" />, { autoClose: 5000, toastId: 'no-dupe' });
            } else {
                setProfilePreview({ file, preview: URL.createObjectURL(file) });
            }
        }
    }

    return (
        <main className="profile-page">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="light"
                    transition={Slide}
                />
            <div className="profile-page-content">
                <section className="profile-display">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                        <img src={profileImg?.preview} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white' }} alt="user-image" />
                        <span className='profile-information'>
                            <h1>{user?.username}</h1>
                            <p style={{ fontSize: '20px', fontWeight: 300 }}>{user?.occupation}</p>
                        </span>
                    </div>
                    <span className='nav inventory-nav' onClick={() => { setCurrentPage('inventory'); setUsername(user?.username); setOccupation(user?.occupation); setEmail(user?.email); setProfilePreview({ file: null, preview: user?.profile_img?.startsWith('http') ? user?.profile_img : `${BASE_URL}/${user?.profile_img}` }); }} style={currentPage == 'inventory' ? selectedStyle : null}>
                        <img src={inventory} alt="" />
                        <p style={{ fontWeight: currentPage == 'inventory' ? 'bold' : '' }}>{t('inventory')}</p>
                    </span>
                    <span className='nav personal-nav' onClick={() => setCurrentPage('personal')} style={currentPage == 'personal' ? selectedStyle : null}>
                        <img src={userIcon} alt="" />
                        <p style={{ fontWeight: currentPage == 'personal' ? 'bold' : '' }}>{t('personal info')}</p>
                    </span>
                    <span className='nav setting-nav' onClick={() => { setCurrentPage('setting'); setUsername(user?.username); setOccupation(user?.occupation); setEmail(user?.email); setProfilePreview({ file: null, preview: user?.profile_img?.startsWith('http') ? user?.profile_img : `${BASE_URL}/${user?.profile_img}` }); }} style={currentPage == 'setting' ? selectedStyle : null}>
                        <img src={setting} alt="" />
                        <p style={{ fontWeight: currentPage == 'setting' ? 'bold' : '' }}>{t('setting')}</p>
                    </span>
                    <span className='nav logout' style={{ marginTop: 'auto', }} onClick={handleLogout}>
                        <img src={logout} alt="" />
                        <p>{t('logout')}</p>
                    </span>
                </section>
                <section className="profile-page-right">
                    {currentPage == 'inventory' ?
                        <div className="inventory">
                            {item.length == 0 ? <p style={{ position: 'absolute' }}>{t('you got no item')}</p> : item.map(v => {
                                return (
                                    <Link to={`/product/${v?._id}`} style={{ color: 'var(--text-secondary)' }}>
                                        <ProductCard pname={v?.name} condition={v?.item_condition} lookfor={v?.looking_for} mainImg={v?.main_img} />
                                    </Link>
                                );
                            })}
                            {totalPage > 1 && totalPage &&
                                <div className="profile-total">
                                    {page == 1 ? <div></div> :
                                        <p className='prev-page' onClick={() => setPage(prev => prev - 1)}>{page - 1}</p>}
                                    <p className='current-page'>{page}</p>
                                    {page >= totalPage ? <div></div> :
                                        <p className='next-page' onClick={() => setPage(prev => prev + 1)}>{page + 1}</p>}
                                </div>
                            }
                        </div> : currentPage == 'personal' ?
                            <div className="personal">
                                <div className="photo">
                                    <img src={profilePreview?.preview} alt="" style={{ width: '120px', height: '120px', border: '1px solid black', borderRadius: '50%'}} />
                                    <label htmlFor='choose-profile-img'>{t('change photo')}</label>
                                    <input type='file' id="choose-profile-img" accept=".png, .jpg, .jpeg" onChange={handleProfileImgChange}></input>
                                </div>
                                <div className="profile-form-input">
                                    <FormComponent htmlFor="name" label={t('fullname')} type="text" value={username} setter={setUsername} />
                                    <FormComponent htmlFor="occupation" label={t('occupation')} type="text" value={occupation} setter={setOccupation} />
                                    <FormComponent htmlFor="email" label={t('email')} type="email" value={email} setter={setEmail} disable={true} unchange={true}/>
                                    <FormComponent htmlFor="oldPassword" label={t("old password")} type="password" disable={true} />
                                    <FormComponent htmlFor="newPassword" label={t('new password')} type="password" value={newPassword} setter={setNewPassword} />
                                    <FormComponent htmlFor="confirmPassword" label={t('confirm password')} type="password" value={conPassword} setter={setConPassword} />
                                </div>
                                <button className='update' onClick={handleUserUpdate} style={{backgroundColor: isSending ? 'rgba(0,0,0,0.3)' : 'var(--secondary)', pointerEvents: isSending ? 'none' : 'auto', cursor: isSending ? 'disabled' : 'pointer'}}>{isSending ? t('updating') : t('update')}</button>
                            </div> :
                            <div className="setting">
                                <section className="setting-sect">
                                    <h1>{t('account')}</h1>
                                    <p>{t('delete account')}</p>
                                </section>
                                <section className="setting-sect">
                                    <h1>{t('preferences')}</h1>
                                    <p>{t('language')}</p>
                                </section>
                                <section className="setting-sect">
                                    <h1>{t('help')}</h1>
                                    <p>{t('contact')}</p>
                                    <p>{t('term of service')}</p>
                                    <p>{t('privacy')}</p>
                                </section>
                            </div>}
                </section>
            </div>
        </main>
    );
}