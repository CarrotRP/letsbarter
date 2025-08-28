import message from '../assets/message.png'
import flag from '../assets/flag.png';
import location from '../assets/location.png';
import inventory from '../assets/inventory.png'
import ProductCard from '../component/ProductCard';
import './OtherProfile.css';
import { useState } from 'react';
import ReviewCard from '../component/ReviewCard';

export default function OtherProfile() {
    const [currentPage, setCurrentPage] = useState('inventory');

    const selectedTxtStyle = {
        fontSize: '32px',
        fontWeight: 'bold'
    }
    const unselectedImgStyle = {
        width: '24px'
    }

    return (
        <main className="other-profile">
            <div className='other-detail'>
                <img src="/favicon.png" style={{ width: '120px', height: '120px' }} alt="user-image" />
                <span>
                    <h1>Bob Krackin</h1>
                    <p style={{ fontSize: '20px', fontWeight: 300 }}>University Student</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={location} alt="" style={{ width: '14px' }} />
                        <p style={{ fontSize: '20px', fontWeight: 300 }}>Phnom Penh</p>
                    </span>
                </span>
                <span className="buttons">
                    <button><img src={message} alt="" />Message</button>
                    <button><img src={flag} alt="" />Report</button>
                    <button>Review</button>
                </span>
            </div>
            <section className="other-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '50px', color: 'var(--text-primary)'}}>
                <span className='other-inventory-nav' onClick={() => setCurrentPage('inventory')} style={currentPage == 'inventory' ? selectedTxtStyle : null}>
                    <img src={inventory} alt="" style={currentPage == 'inventory' ? null : unselectedImgStyle} />
                    <p>Inventory</p>
                </span>
                <p className='other-review-nav' onClick={() => setCurrentPage('review')} style={currentPage == 'review' ? selectedTxtStyle : null}>・Review</p>
            </section>
            <section className="other-content">
                {currentPage == 'inventory' ?
                    <div className="other-inventory">
                        {[...new Array(8)].map(_ => {
                            return (
                                <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" />
                            );
                        })}
                    </div> :
                    <div className="reviews">
                        {[...new Array(4)].map(_ => {
                            return(
                                <ReviewCard/>
                            );
                        })}
                    </div>}
            </section>
        </main>
    );
}