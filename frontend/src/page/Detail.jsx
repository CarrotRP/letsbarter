import TradePopup from "../component/TradePopup";
import HomeComponent from "../component/HomeComponent";
import { useParams, Link, useOutletContext, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import Toaster from "../component/Toaster";
import './Detail.css';
import { useTranslation } from "react-i18next";

export default function Detail() {
    const {t} = useTranslation();
    const { id } = useParams();
    const { user, isLoading } = useOutletContext();
    const navigate = useNavigate();
    const tradePopupRef = useRef();
    const tradePopupContentRef = useRef();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [itemDetail, setItemDetail] = useState();
    const [currentTradePage, setCurrentTradePage] = useState('your');
    const [image, setImage] = useState([]);
    const [currentImg, setCurrentImg] = useState(0);
    //other items in inventory
    const [otherItem, setOtherItem] = useState();
    const [limit, setLimit] = useState(5);
    const [itemCount, setItemCount] = useState();

    //item by category (item user might like)
    const [mightLike, setMightLike] = useState();
    const [mightLimit, setMightLimit] = useState(5);
    const [mightCount, setMightCount] = useState();

    //for doing fetch only when popup is true
    const [isPopup, setIsPopup] = useState(false);

    const handleOfferClick = (e) => {
        if (user) {
            e.stopPropagation();
            tradePopupRef.current.style.display = 'block'
            tradePopupContentRef.current.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setIsPopup(true);
        } else {
            //show this toast when user not log in
            toast(Toaster, { autoClose: 5000, toastId: 'no-dupe' });
        }
    }

    const handleItemDelete = () => {
        fetch(`http://localhost:3000/item/${itemDetail?._id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                navigate(-1);
            })
    }

    const handleImgClick = (e) => {
        setCurrentImg(e.target.id);
    }

    useEffect(() => {
        //fetch item detail
        fetch(`http://localhost:3000/item/${id}`).then(res => res.json())
            .then(data => {
                setCurrentImg(0);
                setItemDetail(data);
                setImage([data.main_img]);
                setImage(prev => [...prev, ...data.imgs]);
                //fetch other user inventory
                fetch(`http://localhost:3000/item/user-item/${data.owner_id?._id}?limit=${limit}&filterOpt=${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setOtherItem(data.items);
                        setItemCount(data.count);
                    });
                //fetch item by category(item user might like)
                const params = new URLSearchParams();

                if (mightLimit) { params.append("limitOpt", mightLimit) }
                if (data.category_id) { params.append("category", data.category_id) }
                if (id) { params.append("filterOpt", id) }

                fetch(`http://localhost:3000/item/category?${params.toString()}`)
                    .then(res => res.json())
                    .then(data => {
                        setMightLike(data.items);
                        setMightCount(data.totalPage); //the var name is totalPage, but its actually itemcounts here
                    });
            }
            ).finally(() => setIsPageLoading(false));


        //handle click outside
        const handleOutsideClick = (e) => {
            if (tradePopupContentRef && !tradePopupContentRef.current?.contains(e.target)) {
                document.body.style.overflow = null;
                tradePopupContentRef.current.style.display = 'none';
                tradePopupRef.current.style.display = 'none';

                setCurrentTradePage('your');
                setIsPopup(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }


    }, [id, user, limit, mightLimit, isPopup]);

    return (
        <main className="detail-page">
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
            <section className="product-detail">
                <aside onClick={handleImgClick}>
                    {image.map((v, i) => {
                        return <img key={i} id={i} src={`http://localhost:3000/${v}`} alt="" style={{ cursor: 'pointer', border: i == currentImg ? '3.5px solid var(--secondary)' : '' }} />
                    })}
                </aside>
                <img id="main-img" src={`http://localhost:3000/${image[currentImg]}`} alt="" />
                {!isPageLoading &&
                    <section className="product-info">
                        <h1>{itemDetail?.name}</h1>
                        <p><b style={{ color: 'var(--primary)' }}>{t('looking')}</b></p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)' }}>{itemDetail?.looking_for}</p>
                        <p style={{ margin: '15px 0 10px' }}>{itemDetail?.description}</p>
                        <hr style={{ border: '1px solid rgba(163, 68, 7, 0.3)' }} />
                        <div className="other-info">
                            <p>{t('original price')}</p>
                            <p>{itemDetail?.original_price}$</p>
                            <p>{t('brand')}</p>
                            <p>{itemDetail?.brand}</p>
                            <p>{t('condition')}</p>
                            <p>{itemDetail?.item_condition} / 10</p>
                            <p>{t('bought on')}</p>
                            <p>{`${new Date(itemDetail?.bought_on).getDate().toString().padStart(2, '0')}/${new Date(itemDetail?.bought_on).toLocaleString('en-GB', { month: 'long' })}/${new Date(itemDetail?.bought_on).getFullYear()}`}</p>
                        </div>

                        {user?._id == itemDetail?.owner_id._id ?
                            <span style={{ display: 'flex', gap: '20px' }}>
                                {itemDetail?.status == 'in-trade' || itemDetail?.status == 'traded' ?
                                    <button style={{cursor: 'disable', pointerEvents: 'none', backgroundColor: 'var(--darken-background)', color: 'var(--text-secondary)'}}>{itemDetail?.status == 'in-trade' ? t('in trade') : t('traded')}</button> :
                                    <>
                                        <button onClick={() => navigate(`/edit/${itemDetail?._id}`)} style={{}}>{t('edit')}</button>
                                        <button onClick={handleItemDelete} style={{ backgroundColor: 'transparent', border: '1px solid var(--text-primary)', color: 'var(--text-primary)' }}>{t('delete')}</button>
                                    </>
                                }
                            </span> :
                            <>
                                <Link to={`/user/${itemDetail?.owner_id._id}`} className="user" style={{ color: 'var(--text-secondary)' }}>
                                    <img src={itemDetail?.owner_id.profile_img.startsWith('http') ? itemDetail?.owner_id.profile_img : `http://localhost:3000/${itemDetail?.owner_id.profile_img}`} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}} alt="user-image" />
                                    <span>
                                        <p style={{ fontWeight: 500 }}>{itemDetail?.owner_id.username}</p>
                                        <p style={{ fontSize: '13px', fontWeight: 300 }}>{itemDetail?.owner_id.occupation}</p>
                                    </span>
                                </Link>
                                <button onClick={handleOfferClick} 
                                style={{ backgroundColor: itemDetail?.status == 'in-trade' || itemDetail?.status == 'traded' ? 'var(--darken-background)' : 'var(--secondary)', 
                                cursor: itemDetail?.status == 'in-trade' || itemDetail?.status == 'traded' ? 'not-allowed' : 'pointer', 
                                color: itemDetail?.status == 'in-trade' || itemDetail?.status == 'traded' ? 'var(--text-secondary)' : 'white' }} 
                                disabled={itemDetail?.status == 'in-trade' || itemDetail?.status == 'traded'}> {itemDetail?.status == 'in-trade' ? t('in trade') : itemDetail?.status == 'traded' ? t('traded') : t('offer trade')}</button>
                            </>}
                    </section>}
            </section>
            {user?._id !== itemDetail?.owner_id._id &&
                <div className="detail-more">
                    {itemCount > 0 && <HomeComponent sectionName={t('other items', {name: itemDetail?.owner_id.username})} items={otherItem} limit={limit} setLimit={setLimit} itemCount={itemCount} />}
                    {!mightLike || mightCount > 0 ? <HomeComponent sectionName={t('might like')} items={mightLike} limit={mightLimit} setLimit={setMightLimit} itemCount={mightCount} /> : <></>}
                    <TradePopup tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} tradeType='offer' currentTradePage={currentTradePage} setCurrentTradePage={setCurrentTradePage} user={user} otherUserId={itemDetail?.owner_id._id} itemId={id} isLoading={isLoading} isPopup={isPopup} setIsPopup={setIsPopup} otherName={itemDetail?.owner_id.username} otherImg={itemDetail?.owner_id.profile_img}/>
                </div>
            }
        </main>
    );
}