import HorizontalCard from "./HorizontalCard";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import close from '../assets/close.png'
import tradeIcon from '../assets/trade.png';
import './TradePopup.css'

export default function TradePopup(props) {
    const {
        tradePopupRef, tradePopupContentRef, tradeType, setTradeType, currentTradePage, setCurrentTradePage,
        user, otherUserId, itemId, isLoading, isPopup, setIsPopup, otherName,
    } = props;

    //current user inventory
    const [userInvent, setUserInvent] = useState();
    const [userTrade, setUserTrade] = useState([]);
    const [userEstimate, setUserEstimate] = useState();
    const [userPage, setUserPage] = useState(1);
    const [userTotalPage, setUserTotalPage] = useState();

    //other user inventory
    const [otherInvent, setOtherInvent] = useState();
    const [otherTrade, setOtherTrade] = useState([]);
    const [otherEstimate, setOtherEstimate] = useState();
    const [otherPage, setOtherPage] = useState(1);
    const [otherTotalPage, setOtherTotalPage] = useState();

    const [query, setQuery] = useState('');
    const [debounceQ, setDebounceQ] = useState(query);

    const unselectedStyle = {
        backgroundColor: '#d7d7d7',
        fontWeight: 300
    }
    const handleClose = () => {
        document.body.style.overflow = null;
        tradePopupContentRef.current.style.display = 'none';
        tradePopupRef.current.style.display = 'none';
        if (setTradeType) {
            setTradeType('incoming');
        }
        setCurrentTradePage('your');
        setIsPopup(false);
    }

    //add item to trade
    const handleAddClick = (id, owner) => {
        if (owner == 'user') {
            setUserTrade(prev => [...prev, ...userInvent.filter(item => item._id == id)])
        } else {
            setOtherTrade(prev => [...prev, ...otherInvent.filter(item => item._id == id)]);
        }
    }

    //remove item from trade
    const handleRemoveClick = (e, id, owner) => {
        e.stopPropagation();
        if (owner == 'user') {
            setUserTrade(prev => prev.filter(v => v._id != id));
        } else {
            setOtherTrade(prev => prev.filter(v => v._id != id));
        }
    }

    //send offer senderItems, receiverItems, senderId, receiverId
    const handleOfferClick = () => {

        fetch(`http://localhost:3000/trade/offer`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            //if its offer, then the currentUser(userTrade, user) is the sender
            //if its not offer(incoming), then the otheruser(otherTrade, otherUserId) is the sender
            body: JSON.stringify({
                senderItems: tradeType == 'offer' ? userTrade : otherTrade,
                senderId: tradeType == 'offer' ? user._id : otherUserId,
                receiverItems: tradeType == 'offer' ? otherTrade: userTrade,
                receiverId: tradeType == 'offer' ? otherUserId : user._id
            })
        }).then(res => res.json())
        .then(data => console.log(data));
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceQ(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (isLoading) return;

        if (isPopup && user) {
            fetch(`http://localhost:3000/item/user-item/${user?._id}?limit=6&page=${userPage}&query=${debounceQ}`)
                .then(res => res.json())
                .then(data => {
                    setUserTotalPage(data.count);
                    setUserInvent(data.items);
                });
            fetch(`http://localhost:3000/item/user-item/${otherUserId}?limit=6&page=${otherPage}&query=${debounceQ}`)
                .then(res => res.json())
                .then(data => {
                    setOtherTotalPage(data.count);
                    setOtherInvent(data.items);
                    if (!otherTrade.some(a => a._id == itemId)) {
                        setOtherTrade(prev => [...prev, ...data.items.filter(item => item._id == itemId)]);
                    }
                })
        }

    }, [isPopup, userPage, otherPage, debounceQ]);

    return (
        <>
            <div className="popup-bg" ref={tradePopupRef}></div>
            <div className="trade-popup" ref={tradePopupContentRef}>
                <span className="popup-head">
                    <h1>{tradeType == 'offer' ? 'Offer Trade' : 'Respond to Trade'}</h1>
                    <img src={close} alt="" onClick={handleClose} />
                </span>
                <div className="trade-popup-content">
                    <section className="item-selection">
                        <span className="user-inventory-nav">
                            <h3 onClick={() => {setQuery(''); setCurrentTradePage('your')}} style={currentTradePage == 'your' ? null : unselectedStyle}>Your Inventory</h3>
                            <h3 onClick={() => {setQuery(''); setCurrentTradePage('their')}} style={currentTradePage == 'their' ? null : unselectedStyle}>Their Inventory</h3>
                        </span>
                        <div className="user-inventory" style={{ position: 'relative', overflow: 'hidden' }}>
                            {tradeType == 'offer' ? <></> :
                                <div className="bg-overlay">
                                    <h2>Change Offer to adjust items</h2>
                                </div>}
                            <span style={{ display: 'flex', alignItems: 'start' }}>
                                <input className="search" type="text" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
                                <button className='search-btn'>Search</button>
                            </span>
                            <div className="item-display">
                                {currentTradePage == 'your' ?
                                    <>
                                        {userInvent?.length == 0 ? <p className="no-item">You got no item in your inventory</p> : userInvent?.map(v => {
                                            const isSelected = userTrade.some(a => a._id === v._id);
                                            const isDisabled = isSelected || v.status === 'in-trade';
                                            return (
                                                <div style={{ cursor: isDisabled ? 'default' : 'pointer', position: 'relative', pointerEvents: isDisabled ? 'none' : 'auto', userSelect: 'none' }} onClick={() => handleAddClick(v._id, 'user')}>
                                                    {isDisabled && <div className="selected-overlay"></div>}
                                                    <ProductCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' mainImg={v.main_img} />
                                                </div>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {otherInvent?.map(v => {
                                            const isSelected = otherTrade.some(a => a._id === v._id);
                                            const isDisabled = isSelected || v.status === 'in-trade';
                                            return (
                                                <div style={{ cursor: isDisabled ? 'default' : 'pointer', position: 'relative', pointerEvents: isDisabled ? 'none' : 'auto', userSelect: 'none' }} onClick={() => handleAddClick(v._id, 'other')}>
                                                    {isDisabled && <div className="selected-overlay"></div>}
                                                    <ProductCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' mainImg={v.main_img} />
                                                </div>
                                            );
                                        })}
                                    </>
                                }
                            </div>
                            {/* for pagination  */}
                            {/* <h1 style={{ textAlign: 'center' }}>1</h1> */}
                            <div className="popup-navigate">
                                {currentTradePage == 'your' ?
                                    userTotalPage > 1 && userTotalPage &&
                                    <>
                                        {userPage == 1 ? <div></div> :
                                            <p className='prev-page' onClick={(e) => { e.stopPropagation(); setUserPage(prev => prev - 1) }}>{userPage - 1}</p>}
                                        <p className='current-page'>{userPage}</p>
                                        {userPage >= userTotalPage ? <div></div> :
                                            <p className='next-page' onClick={(e) => { e.stopPropagation(); setUserPage(prev => prev + 1) }}>{userPage + 1}</p>}
                                    </> :
                                    otherTotalPage > 1 && otherTotalPage &&
                                    <>
                                        {otherPage == 1 ? <div></div> :
                                            <p className='prev-page' onClick={(e) => { e.stopPropagation(); setOtherPage(prev => prev - 1) }}>{otherPage - 1}</p>}
                                        <p className='current-page'>{otherPage}</p>
                                        {otherPage >= otherTotalPage ? <div></div> :
                                            <p className='next-page' onClick={(e) => { e.stopPropagation(); setOtherPage(prev => prev + 1) }}>{otherPage + 1}</p>}
                                    </>
                                }
                            </div>
                        </div>
                    </section>
                    <section className="item-trading">
                        <div className="other-user-table">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="/favicon.png" alt="" style={{ width: '50px', border: '1px solid black', borderRadius: '50%' }} />
                                <h3 style={{ fontSize: '20px' }}><span style={{ fontWeight: 500 }}>For </span>{otherName}'s</h3>
                            </span>
                            <div className="their-stuff">
                                {otherTrade == '' ? 'No Item Added Yet' :
                                    otherTrade?.map(v => {
                                        return (
                                            <div style={{ cursor: 'pointer' }} onClick={(e) => handleRemoveClick(e, v._id, 'other')}>
                                                <HorizontalCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        <span className="middle-section" style={{ position: 'relative', margin: '30px 0', display: 'block', width: '100%' }}>
                            <hr style={{ border: '1px solid var(--text-primary)' }} />
                            <img src={tradeIcon} alt="" />
                        </span>
                        <div className="your-table">
                            <h3 style={{ fontWeight: 300, fontSize: '20px' }}>You offered</h3>
                            <div className="your-stuff">
                                {userTrade == '' ? "No Item Added Yet" :
                                    userTrade?.map(v => {
                                        return (
                                            <div style={{ cursor: 'pointer', width: '230px', height: '90px' }} onClick={(e) => handleRemoveClick(e, v._id, 'user')}>
                                                <HorizontalCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        {tradeType == 'offer' ?
                            <button className="do-offer" onClick={handleOfferClick}>Make Offer</button>
                            :
                            <span style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '0 auto' }}>
                                <button className="accept-trade respond-btn">Accept Trade</button>
                                <button className="decline-trade respond-btn">Decline Trade</button>
                            </span>
                        }
                        {tradeType == 'offer' ?
                            <p className='other-option' onClick={handleClose}>Cancel</p>
                            : <p className="other-option" onClick={() => setTradeType('offer')}>Change Offer</p>}
                    </section>
                </div>
            </div>
        </>
    );
}