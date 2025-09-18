import message from '../assets/message.png'
import flag from '../assets/flag.png';
import location from '../assets/location.png';
import inventory from '../assets/inventory.png'
import ProductCard from '../component/ProductCard';
import './OtherProfile.css';
import { useOutletContext, useParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import ReviewCard from '../component/ReviewCard';
import Report from '../component/Report';

export default function OtherProfile() {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState('inventory');
    const chatRef = useOutletContext();
    const reportBgRef = useRef();
    const reportRef = useRef();
    const [otherUser, setOtherUser] = useState();

    const selectedTxtStyle = {
        fontSize: '32px',
        fontWeight: 'bold'
    }
    const unselectedImgStyle = {
        width: '24px'
    }

    const handleMessageClick = (e) => {
        e.stopPropagation();
        chatRef.current.classList.toggle('chat-active');
    }
    const handleReportClick = (e) => {
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
        reportBgRef.current.style.display = 'block';
        reportRef.current.style.display = 'block';
    }
    const handleReportClose = () => {
        document.body.style.overflow = null;
        reportBgRef.current.style.display = 'none';
        reportRef.current.style.display = 'none';
    }

    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`)
        .then(res => res.json())
        .then(data => {
            setOtherUser(data);
            console.log(data)});

        const handleOutsideClick = (e) => {
            if (reportRef && !reportRef.current.contains(e.target)) {
                document.body.style.overflow = null;
                reportBgRef.current.style.display = 'none';
                reportRef.current.style.display = 'none';
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, []);

    return (
        <main className="other-profile">
            <div className='other-detail'>
                <img src="/favicon.png" style={{ width: '120px', height: '120px' }} alt="user-image" />
                <span>
                    <h1>{otherUser?.username}</h1>
                    <p style={{ fontSize: '20px', fontWeight: 300 }}>{otherUser?.occupation}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={location} alt="" style={{ width: '14px' }} />
                        <p style={{ fontSize: '20px', fontWeight: 300 }}>Phnom Penh</p>
                    </span>
                </span>
                <span className="buttons">
                    <button onClick={handleMessageClick}><img src={message} alt="" />Message</button>
                    <button onClick={handleReportClick}><img src={flag} alt="" />Report</button>
                    <button>Review</button>
                </span>
            </div>
            <section className="other-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '50px', color: 'var(--text-primary)' }}>
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
                            return (
                                <ReviewCard />
                            );
                        })}
                    </div>}
            </section>
            <Report reportBgRef={reportBgRef} reportRef={reportRef} handleReportClose={handleReportClose}/>
        </main>
    );
}