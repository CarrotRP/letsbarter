import TradePopup from "../component/TradePopup";
import HomeComponent from "../component/HomeComponent";
import { useParams, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import placeholder from '../assets/placeholder.jpg';
import placeholder2 from '../assets/placeholder2.png';
import placeholder3 from '../assets/placeholder3.png';
import './Detail.css';

export default function Detail() {
    const { id } = useParams();
    const tradePopupRef = useRef();
    const tradePopupContentRef = useRef();
    const [itemDetail, setItemDetail] = useState();
    const [currentTradePage, setCurrentTradePage] = useState('your');
    const [image, setImage] = useState([]);
    const [currentImg, setCurrentImg] = useState(0);

    const handleOfferClick = (e) => {
        e.stopPropagation();
        tradePopupRef.current.style.display = 'block'
        tradePopupContentRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    const handleImgClick = (e) => {
        setCurrentImg(e.target.id);
    }

    useEffect(() => {
        //fetch item detail
        fetch(`http://localhost:3000/item/${id}`).then(res => res.json())
            .then(data => {
                setItemDetail(data);
                setImage([data.main_img]);
                setImage(prev => [...prev, ...data.imgs])
                console.log(data)
            });

        //handle click outside
        const handleOutsideClick = (e) => {
            if (tradePopupContentRef && !tradePopupContentRef.current.contains(e.target)) {
                document.body.style.overflow = null;
                tradePopupContentRef.current.style.display = 'none';
                tradePopupRef.current.style.display = 'none';

                setCurrentTradePage('your');
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }


    }, []);

    return (
        <main className="detail-page">
            <section className="product-detail">
                <aside onClick={handleImgClick}>
                    {image.map((v, i) => {
                    return <img key={i} id={i} src={`http://localhost:3000/${v}`} alt="" style={{cursor: 'pointer', border: i == currentImg ? '3.5px solid var(--secondary)' : ''}}/>
                    })}
                </aside>
                <img id="main-img" src={`http://localhost:3000/${image[currentImg]}`} alt="" />
                <section className="product-info">
                    <h1>{itemDetail?.name}</h1>
                    <p><b style={{ color: 'var(--primary)' }}>Looking for</b></p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)' }}>{itemDetail?.looking_for}</p>
                    <p style={{ margin: '15px 0 10px' }}>{itemDetail?.description}</p>
                    <hr style={{ border: '1px solid rgba(163, 68, 7, 0.3)' }} />
                    <div className="other-info">
                        <p>Orignal price</p>
                        <p>{itemDetail?.original_price}$</p>
                        <p>Brand</p>
                        <p>{itemDetail?.brand}</p>
                        <p>Conditions</p>
                        <p>{itemDetail?.item_condition} / 10</p>
                        <p>Bought on</p>
                        <p>{`${new Date(itemDetail?.bought_on).getDate().toString().padStart(2, '0')}/${new Date(itemDetail?.bought_on).toLocaleString('en-GB', { month: 'long' })}/${new Date(itemDetail?.bought_on).getFullYear()}`}</p>
                    </div>
                    <Link to={`/user/${itemDetail?.owner_id._id}`} className="user" style={{ color: 'var(--text-secondary)' }}>
                        <img src="/favicon.png" style={{ width: '40px' }} alt="user-image" />
                        <span>
                            <p style={{ fontWeight: 500 }}>{itemDetail?.owner_id.username}</p>
                            <p style={{ fontSize: '13px', fontWeight: 300 }}>{itemDetail?.owner_id.occupation}</p>
                        </span>
                    </Link>
                    <button onClick={handleOfferClick}>Offer Trade</button>
                </section>
            </section>
            <HomeComponent sectionName="Other items in Bob's inventory" />
            <HomeComponent sectionName="You might also like" />
            <TradePopup tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} tradeType='offer' currentTradePage={currentTradePage} setCurrentTradePage={setCurrentTradePage}/>
        </main>
    );
}