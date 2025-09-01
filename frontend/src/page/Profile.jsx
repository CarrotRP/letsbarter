import inventory from '../assets/inventory.png';
import user from '../assets/user.png';
import setting from '../assets/setting.png';
import logout from '../assets/logout.png';
import ProductCard from '../component/ProductCard';
import FormComponent from '../component/FormComponent';
import { useState } from 'react';
import './Profile.css';
import { Link } from 'react-router';

export default function Profile() {
    const [currentPage, setCurrentPage] = useState('inventory');

    const selectedStyle = {
        backgroundColor: 'var(--primary)',
        borderRadius: '10px',
    }

    return (
        <main className="profile-page">
            <div className="profile-page-content">
                <section className="profile-display">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                        <img src="/favicon.png" style={{ width: '60px', height: '60px' }} alt="user-image" />
                        <span>
                            <h1>Bob Krackin</h1>
                            <p style={{ fontSize: '20px', fontWeight: 300 }}>University Student</p>
                        </span>
                    </div>
                    <span className='nav inventory-nav' onClick={() => setCurrentPage('inventory')} style={currentPage == 'inventory' ? selectedStyle : null}>
                        <img src={inventory} alt="" />
                        <p style={{ fontWeight: currentPage == 'inventory' ? 'bold' : '' }}>Inventory</p>
                    </span>
                    <span className='nav personal-nav' onClick={() => setCurrentPage('personal')} style={currentPage == 'personal' ? selectedStyle : null}>
                        <img src={user} alt="" />
                        <p style={{ fontWeight: currentPage == 'personal' ? 'bold' : '' }}>Personal Info</p>
                    </span>
                    <span className='nav setting-nav' onClick={() => setCurrentPage('setting')} style={currentPage == 'setting' ? selectedStyle : null}>
                        <img src={setting} alt="" />
                        <p style={{ fontWeight: currentPage == 'setting' ? 'bold' : '' }}>Setting</p>
                    </span>
                    <span className='nav logout' style={{ marginTop: 'auto', }}>
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
                                    <FormComponent htmlFor="name" label="Full Name" type="text" value="Potato" />
                                    <FormComponent htmlFor="occupation" label="Occupation" type="text" value="University Student" />
                                    <FormComponent htmlFor="email" label="Email Address" type="email" value='potato@gmail.com' />
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