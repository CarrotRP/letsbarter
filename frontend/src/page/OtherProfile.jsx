import message from '../assets/message.png'
import flag from '../assets/flag.png';
import location from '../assets/location.png';
import inventory from '../assets/inventory.png'
import ProductCard from '../component/ProductCard';
import './OtherProfile.css';
import { Link, useOutletContext, useParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import ReviewCard from '../component/ReviewCard';
import Report from '../component/Report';
import Toaster from '../component/Toaster';
import { useTranslation } from 'react-i18next';
import ReviewPopup from '../component/ReviewPopup';

export default function OtherProfile() {
    const { id } = useParams();
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState('inventory');
    const { chatRef, user } = useOutletContext();
    const reportBgRef = useRef();
    const reportRef = useRef();
    const reviewBgRef = useRef();
    const reviewRef = useRef();
    const [otherUser, setOtherUser] = useState();
    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    //report state
    const [report, setReport] = useState('deceptive');

    //review state
    const [review, setReview] = useState();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewPage, setReviewPage] = useState(1);
    const [reviewTotal, setReviewTotal] = useState();

    const selectedTxtStyle = {
        fontSize: '32px',
        fontWeight: 'bold'
    }
    const unselectedImgStyle = {
        width: '24px'
    }

    const handleMessageClick = (e) => {
        if (user) {
            e.stopPropagation();
            chatRef.current.classList.toggle('chat-active');
        } else {
            toast(Toaster, { autoClose: 5000, toastId: 'no-dupe' })
        }
    }
    const handleReportClick = (e) => {
        if (user) {
            e.stopPropagation();
            document.body.style.overflow = 'hidden';
            reportBgRef.current.classList.add('report-active');
        } else {
            toast(Toaster, { autoClose: 5000, toastId: 'no-dupe' });
        }
    }
    const handleReportClose = () => {
        document.body.style.overflow = null;
        reportBgRef.current.classList.remove('report-active');
        setReport('deceptive')
    }
    const handleReviewClick = (e) => {
        if(user){
            e.stopPropagation();
            document.body.style.overflow = 'hidden';
            reviewBgRef.current.classList.add('review-popup-active')
        } else{
            toast(Toaster, { autoClose: 5000, toastId: 'no-dupe' });
        }
    }

    const fetchReviews = () => {
        fetch(`http://localhost:3000/review/${id}?limit=6&page=${reviewPage}`, {
                credentials: 'include'
            }).then(res => res.json())
                .then(data => {
                    console.log('data');
                    console.log(data);
                    setReview(data.result);
                    setReviewTotal(data.totalPage)
                })
    }

    useEffect(() => {
        //fetch other user data
        fetch(`http://localhost:3000/user/${id}`)
            .then(res => res.json())
            .then(data => {
                setOtherUser(data);
            });

        fetch(`http://localhost:3000/item/user-item/${id}?limit=10&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setItem(data.items);
                setTotalPage(data.count);
            })

        //fetch review
        if (currentPage !== 'inventory') {
            fetchReviews();
        }

        const handleOutsideClick = (e) => {
            if (reportBgRef.current && !reportRef.current.contains(e.target) && reportBgRef.current.classList.contains('report-active')) {
                document.body.style.overflow = null;
                reportBgRef.current.classList.remove('report-active');
                setReport('deceptive')
            }
            if (reviewBgRef.current && !reviewRef.current.contains(e.target) && reviewBgRef.current.classList.contains('review-popup-active')) {
                document.body.style.overflow = null;
                reviewBgRef.current.classList.remove('review-popup-active');
                setRating(0)
                setComment('')
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [page, currentPage, reviewPage]);

    return (
        <main className="other-profile">
            <ToastContainer
                position="top-right"
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
            <div className='other-detail'>
                <img src={otherUser?.profile_img.startsWith('http') ? otherUser?.profile_img : `http://localhost:3000/${otherUser?.profile_img}`} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'contain', backgroundColor: 'white' }} alt="user-image" />
                <span>
                    <h1>{otherUser?.username}</h1>
                    <p style={{ fontSize: '20px', fontWeight: 300 }}>{otherUser?.occupation}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={location} alt="" style={{ width: '14px' }} />
                        <p style={{ fontSize: '20px', fontWeight: 300 }}>Phnom Penh</p>
                    </span>
                </span>
                <span className="buttons">
                    <button onClick={handleMessageClick}><img src={message} alt="" />{t('message')}</button>
                    <button onClick={handleReportClick}><img src={flag} alt="" />{t('report')}</button>
                    <button onClick={handleReviewClick}>{t('review')}</button>
                </span>
            </div>
            <section className="other-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '50px', color: 'var(--text-primary)' }}>
                <span className='other-inventory-nav' onClick={() => setCurrentPage('inventory')} style={currentPage == 'inventory' ? selectedTxtStyle : null}>
                    <img src={inventory} alt="" style={currentPage == 'inventory' ? null : unselectedImgStyle} />
                    <p>{t('inventory')}</p>
                </span>
                <p className='other-review-nav' onClick={() => setCurrentPage('review')} style={currentPage == 'review' ? selectedTxtStyle : null}>・{t('review')}</p>
            </section>
            <section className="other-content">
                {currentPage == 'inventory' ?
                    <div className="other-inventory">
                        {item.length == 0 ? <p style={{ position: 'absolute' }}>{t('they got no item', { name: otherUser?.username })}</p> : item.map(v => {
                            return (
                                <Link to={`/product/${v._id}`} style={{ color: 'var(--text-secondary)' }} key={v._id}>
                                    <ProductCard pname={v.name} condition={v.condition} lookfor={v.looking_for} mainImg={v.main_img} />
                                </Link>
                            );
                        })}
                        {totalPage > 1 && totalPage &&
                            <div className="other-total">
                                {page == 1 ? <div></div> :
                                    <p className='prev-page' onClick={() => setPage(prev => prev - 1)}>{page - 1}</p>}
                                <p className='current-page'>{page}</p>
                                {page >= totalPage ? <div></div> :
                                    <p className='next-page' onClick={() => setPage(prev => prev + 1)}>{page + 1}</p>}
                            </div>
                        }
                    </div> :
                    <div className="reviews">
                        {review?.length == 0 ? "No review yet" : review?.map(v => {
                            return (
                                <ReviewCard profile={v.reviewerId.profile_img} username={v.reviewerId.username} rating={v.rating} comment={v.comment} date={v.createdAt} />
                            );
                        })}
                        {reviewTotal > 1 && reviewTotal &&
                            <div className="other-total">
                                {reviewPage == 1 ? <div></div> :
                                    <p className='prev-page' onClick={() => setReviewPage(prev => prev - 1)}>{reviewPage - 1}</p>}
                                <p className='current-page'>{reviewPage}</p>
                                {reviewPage >= reviewTotal ? <div></div> :
                                    <p className='next-page' onClick={() => setReviewPage(prev => prev + 1)}>{reviewPage + 1}</p>}
                            </div>
                        }
                    </div>}
            </section>
            <Report reportBgRef={reportBgRef} reportRef={reportRef} handleReportClose={handleReportClose} report={report} setReport={setReport} />
            <ReviewPopup reviewBgRef={reviewBgRef} reviewRef={reviewRef} reviewerId={user?._id} otherUserId={id} otherUser={otherUser?.username} rating={rating} setRating={setRating} comment={comment} setComment={setComment} fetchReviews={fetchReviews}/>
        </main>
    );
}