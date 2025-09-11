import inventory from '../assets/inventory.png';
import userIcon from '../assets/user.png';
import setting from '../assets/setting.png';
import logout from '../assets/logout.png';
import ProductCard from '../component/ProductCard';
import FormComponent from '../component/FormComponent';
import { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate, Link, useOutletContext } from 'react-router';

export default function Profile() {
    const [currentPage, setCurrentPage] = useState('inventory');
    const {user, dispatch} = useOutletContext();
    const [username, setUsername] = useState('');
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const selectedStyle = {
        backgroundColor: 'var(--primary)',
        borderRadius: '10px',
    }

    useEffect(() => {
        if(user){
            setUsername(user.username || '');
            setOccupation(user.occupation || '');
            setEmail(user.email || '');
        } else{
            console.log('noone')
            navigate('/');
        }
    }, [user]);

    const handleLogout = () => {
        fetch('http://localhost:3000/user/logout', {
            credentials: 'include',
            method: 'POST'
        }).then(res => res.json())
        .then(data => {
            navigate(data.redirect);
            dispatch({type: 'LOGOUT_USER'});
        })
    }

    return (
        <main className="profile-page">
            <div className="profile-page-content">
                <section className="profile-display">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                        <img src="/favicon.png" style={{ width: '60px', height: '60px' }} alt="user-image" />
                        <span>
                            <h1>{user?.username}</h1>
                            <p style={{ fontSize: '20px', fontWeight: 300 }}>{user?.occupation}</p>
                        </span>
                    </div>
                    <span className='nav inventory-nav' onClick={() => {setCurrentPage('inventory'); setUsername(user?.username); setOccupation(user?.occupation); setEmail(user?.email)}} style={currentPage == 'inventory' ? selectedStyle : null}>
                        <img src={inventory} alt="" />
                        <p style={{ fontWeight: currentPage == 'inventory' ? 'bold' : '' }}>Inventory</p>
                    </span>
                    <span className='nav personal-nav' onClick={() => setCurrentPage('personal')} style={currentPage == 'personal' ? selectedStyle : null}>
                        <img src={userIcon} alt="" />
                        <p style={{ fontWeight: currentPage == 'personal' ? 'bold' : '' }}>Personal Info</p>
                    </span>
                    <span className='nav setting-nav' onClick={() => {setCurrentPage('setting'); setUsername(user?.username); setOccupation(user?.occupation); setEmail(user?.email)}} style={currentPage == 'setting' ? selectedStyle : null}>
                        <img src={setting} alt="" />
                        <p style={{ fontWeight: currentPage == 'setting' ? 'bold' : '' }}>Setting</p>
                    </span>
                    <span className='nav logout' style={{ marginTop: 'auto', }} onClick={handleLogout}>
                        <img src={logout} alt="" />
                        <p>Log out</p>
                    </span>
                </section>
                <section className="profile-page-right">
                    {currentPage == 'inventory' ?
                        <div className="inventory">
                            {[...new Array(8)].map(_ => {
                                return (
                                    <Link to={`/product/${1}`} style={{ color: 'var(--text-secondary)' }}>
                                        <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" />
                                    </Link>
                                );
                            })}
                        </div> : currentPage == 'personal' ?
                            <div className="personal">
                                <div className="photo">
                                    <img src="/favicon.png" alt="" style={{ width: '120px', height: '120px', border: '1px solid black', borderRadius: '50%' }} />
                                    <p>Change Photo</p>
                                </div>
                                <div className="profile-form-input">
                                    <FormComponent htmlFor="name" label="Full Name" type="text" value={username} setter={setUsername}/>
                                    <FormComponent htmlFor="occupation" label="Occupation" type="text" value={occupation} setter={setOccupation}/>
                                    <FormComponent htmlFor="email" label="Email Address" type="email" value={email} setter={setEmail}/>
                                    <FormComponent htmlFor="oldPassword" label="Old Password" type="password" />
                                    <FormComponent htmlFor="newPassword" label="New Password" type="password" />
                                    <FormComponent htmlFor="confirmPassword" label="Confirm Password" type="password" />
                                </div>
                                <button className='update'>Update</button>
                            </div> :
                            <div className="setting">
                                <section className="setting-sect">
                                    <h1>Account</h1>
                                    <p>Delete Account</p>
                                </section>
                                <section className="setting-sect">
                                    <h1>Preferences</h1>
                                    <p>Language</p>
                                </section>
                                <section className="setting-sect">
                                    <h1>Help & Legal</h1>
                                    <p>Contact Support</p>
                                    <p>Term of Service</p>
                                    <p>Privacy Policy</p>
                                </section>
                            </div>}
                </section>
            </div>
        </main>
    );
}