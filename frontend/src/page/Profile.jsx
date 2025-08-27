import inventory from '../assets/inventory.png';
import user from '../assets/user.png';
import setting from '../assets/setting.png';
import logout from '../assets/logout.png';
import ProductCard from '../component/ProductCard';
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
                    <span className='nav inventory-nav' onClick={() => setCurrentPage('inventory')} style={ currentPage == 'inventory' ? selectedStyle : null}>
                        <img src={inventory} alt="" />
                        <p style={{fontWeight: currentPage == 'inventory' ? 'bold' : ''}}>Inventory</p>
                    </span>
                    <span className='nav personal-nav' onClick={() => setCurrentPage('personal')} style={ currentPage == 'personal' ? selectedStyle : null}>
                        <img src={user} alt="" />
                        <p style={{fontWeight: currentPage == 'personal' ? 'bold' : ''}}>Personal Info</p>
                    </span>
                    <span className='nav setting-nav' onClick={() => setCurrentPage('setting')} style={ currentPage == 'setting' ? selectedStyle : null}>
                        <img src={setting} alt="" />
                        <p style={{fontWeight: currentPage == 'setting' ? 'bold' : ''}}>Setting</p>
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
                                <Link to={`/product/${1}`} style={{color: 'var(--text-secondary)'}}>
                                    <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" />
                                </Link>
                            );
                        })}
                    </div> : currentPage == 'personal' ?
                    <div className="personal">
                        <h1>this personal</h1>
                    </div> :
                    <div className="setting">
                        <h1>this setting</h1>
                    </div>}
                </section>
            </div>
        </main>
    );
}