import HorizontalCard from "./HorizontalCard";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import close from '../assets/close.png'
import tradeIcon from '../assets/trade.png';
import './TradePopup.css'
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../config/apiConfig";

export default function TradePopup(props) {
    const {
        tradePopupRef, tradePopupContentRef, tradeType, setTradeType, currentTradePage, setCurrentTradePage,
        user, otherUserId, itemId, isLoading, isPopup, setIsPopup, otherName, handleTradeUpdate, selectedTrade,
        otherImg
    } = props;
    const { t } = useTranslation();

    //current user inventory
    const [userInvent, setUserInvent] = useState();
    const [userTrade, setUserTrade] = useState([]);
    const [userEstimate, setUserEstimate] = useState(0);
    const [userPage, setUserPage] = useState(1);
    const [userTotalPage, setUserTotalPage] = useState();

    //other user inventory
    const [otherInvent, setOtherInvent] = useState();
    const [otherTrade, setOtherTrade] = useState([]);
    const [otherEstimate, setOtherEstimate] = useState(0);
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
    const handleAddClick = (id, owner, estimate) => {
        if (owner == 'user') {
            setUserTrade(prev => [...prev, ...userInvent.filter(item => item._id == id)]);
            setUserEstimate(prev => prev + estimate);
        } else {
            setOtherTrade(prev => [...prev, ...otherInvent.filter(item => item._id == id)]);
            setOtherEstimate(prev => prev + estimate);
        }
    }

    //remove item from trade
    const handleRemoveClick = (e, id, owner, estimate) => {
        e.stopPropagation();
        if (owner == 'user') {
            setUserTrade(prev => prev.filter(v => v._id != id));
            setUserEstimate(prev => parseFloat((prev - Number(estimate || 0)).toFixed(1)));
        } else {
            setOtherTrade(prev => prev.filter(v => v._id != id));
            setOtherEstimate(prev => parseFloat((prev - Number(estimate || 0)).toFixed(1)));
        }
    }

    const sendOfferMessage = () => {
        fetch(`${BASE_URL}/message/send/${otherUserId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: `[system] ${user?.username} system offer` })
        }).then(res => res.json())
            .then(data => {
                
            })
    }
    //send offer senderItems, receiverItems, senderId, receiverId
    const handleOfferClick = async () => {
        const res = await fetch(`${BASE_URL}/trade/offer`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            //if its offer, then the currentUser(userTrade, user) is the sender
            //if its not offer(incoming), then the otheruser(otherTrade, otherUserId) is the sender
            body: JSON.stringify({
                senderItems: tradeType == 'offer' ? userTrade : otherTrade,
                senderId: user._id,
                receiverItems: tradeType == 'offer' ? otherTrade : userTrade,
                receiverId: selectedTrade ? selectedTrade.userId : otherUserId
            })
        });
        const data = await res.json();
        handleClose();
    }
    //for query debounce(delay search until user stop typing)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceQ(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (!isPopup || isLoading) return;

        if (isPopup && user) {
            setUserTrade([])
            setUserEstimate(0);
            //in detail page, initial offering
            if (selectedTrade) {
                fetch(`${BASE_URL}/trade/${selectedTrade.tradeId}`)
                    .then(res => res.json())
                    .then(trade => {

                        //get the user inventories
                        fetch(`${BASE_URL}/item/user-item/${user?._id}?limit=6&page=${userPage}&query=${debounceQ}`)
                            .then(res => res.json())
                            .then(data => {
                                setUserTotalPage(data.count);
                                setUserInvent(data.items);
                                const newUserTrade = data.items.filter(d => trade.receiverItems.includes(d._id));
                                setUserTrade(newUserTrade);
                                setUserEstimate(newUserTrade.reduce((sum, item) => sum + (item.estimate_value || 0), 0));
                            });
                        fetch(`${BASE_URL}/item/user-item/${trade.senderId}?limit=6&page=${otherPage}&query=${debounceQ}`)
                            .then(res => res.json())
                            .then(data => {
                                setOtherTotalPage(data.count);
                                setOtherInvent(data.items);

                                setOtherTrade([]);

                                const newOtherTrade = data.items.filter(d => trade.senderItems.includes(d._id));
                                setOtherTrade(newOtherTrade);
                                setOtherEstimate(newOtherTrade.reduce((sum, item) => sum + (item.estimate_value || 0), 0));
                            })
                    });
            } else {
                fetch(`${BASE_URL}/item/user-item/${user?._id}?limit=6&page=${userPage}&query=${debounceQ}`)
                    .then(res => res.json())
                    .then(data => {
                        setUserTotalPage(data.count);
                        setUserInvent(data.items);
                    });
                fetch(`${BASE_URL}/item/user-item/${otherUserId}?limit=6&page=${otherPage}&query=${debounceQ}`)
                    .then(res => res.json())
                    .then(data => {
                        setOtherTotalPage(data.count);
                        setOtherInvent(data.items);
                        const newItem = data.items.find(item => item._id == itemId);
                        setOtherTrade(newItem ? [newItem] : []);
                        setOtherEstimate(newItem ? newItem.estimate_value : 0);
                    })
            }
        }

    }, [isPopup, userPage, otherPage, debounceQ]);

    return (
        <>
            <div className="popup-bg" ref={tradePopupRef}></div>
            <div className="trade-popup" ref={tradePopupContentRef}>
                <span className="popup-head">
                    <h1>{tradeType == 'offer' ? t('offer trade') : t('respond trade')}</h1>
                    <img src={close} alt="" onClick={handleClose} />
                </span>
                <div className="trade-popup-content">
                    <section className="item-selection">
                        <span className="user-inventory-nav">
                            <h3 onClick={() => { setQuery(''); setCurrentTradePage('your') }} style={currentTradePage == 'your' ? null : unselectedStyle}>{t('your invent')}</h3>
                            <h3 onClick={() => { setQuery(''); setCurrentTradePage('their') }} style={currentTradePage == 'their' ? null : unselectedStyle}>{t('their invent')}</h3>
                        </span>
                        <div className="user-inventory" style={{ position: 'relative', overflow: 'hidden' }}>
                            {tradeType == 'offer' ? <></> :
                                <div className="bg-overlay">
                                    <h2>{t('change offer to')}</h2>
                                </div>}
                            <span style={{ display: 'flex', alignItems: 'start', zIndex: 10 }}>
                                <input className="search" type="text" placeholder="Search" value={query} onChange={e => setQuery(e.target.value)} />
                                <button className='search-btn'>{t('search')}</button>
                            </span>
                            <div className="item-display">
                                {currentTradePage == 'your' ?
                                    <>
                                        {userInvent?.length == 0 ? <p className="no-item">{t('you got no item')}</p> : userInvent?.map(v => {
                                            const isSelected = userTrade.some(a => a._id === v._id);
                                            let isDisabled;

                                            if (selectedTrade) {
                                                // check if this item is part of the current trade
                                                const inCurrentTrade =
                                                    selectedTrade.leftItems?.some(item => item._id === v._id) ||
                                                    selectedTrade.rightItems?.some(item => item._id === v._id);

                                                // Counter offer: disable if already selected OR not in current trade but in-trade/traded
                                                isDisabled = isSelected || (!inCurrentTrade && (v.status === 'in-trade' || v.status === 'traded'));
                                            } else {
                                                // New offer: disable if already selected or in-trade/traded
                                                isDisabled = isSelected || v.status === 'in-trade' || v.status === 'traded';
                                            }
                                            return (
                                                <div style={{ cursor: isDisabled ? 'default' : 'pointer', position: 'relative', pointerEvents: isDisabled ? 'none' : 'auto', userSelect: 'none' }} onClick={() => handleAddClick(v._id, 'user', v.estimate_value)}>
                                                    {isDisabled && <div className="selected-overlay"></div>}
                                                    <ProductCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' mainImg={v.main_img} />
                                                </div>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {otherInvent?.map(v => {
                                            const isSelected = otherTrade.some(a => a._id === v._id);
                                            let isDisabled;

                                            if (selectedTrade) {
                                                // check if this item is part of the current trade
                                                const inCurrentTrade =
                                                    selectedTrade.leftItems?.some(item => item._id === v._id) ||
                                                    selectedTrade.rightItems?.some(item => item._id === v._id);

                                                // Counter offer: disable if already selected OR not in current trade but in-trade/traded
                                                isDisabled = isSelected || (!inCurrentTrade && (v.status === 'in-trade' || v.status === 'traded'));
                                            } else {
                                                // New offer: disable if already selected or in-trade/traded
                                                isDisabled = isSelected || v.status === 'in-trade' || v.status === 'traded';
                                            }
                                            return (
                                                <div style={{ cursor: isDisabled ? 'default' : 'pointer', position: 'relative', pointerEvents: isDisabled ? 'none' : 'auto', userSelect: 'none' }} onClick={() => handleAddClick(v._id, 'other', v.estimate_value)}>
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
                                <img src={
                                    selectedTrade ?
                                    selectedTrade?.userImg.startsWith('http') ? selectedTrade?.userImg : `${BASE_URL}/${selectedTrade?.userImg}` :
                                    otherImg?.startsWith('http') ? otherImg : `${BASE_URL}/${otherImg}`
                                    } alt="" style={{ width: '50px', height: '50px', border: '1px solid black', borderRadius: '50%' }} />
                                {tradeType == 'incoming' ? <h3 style={{ fontSize: '20px' }}>{selectedTrade?.user} <span style={{ fontWeight: 300 }}>{t('offer')}</span></h3> :
                                    <h3 style={{ fontSize: '20px' }}><span style={{ fontWeight: 300 }}>{t('for')} </span>{selectedTrade ? selectedTrade?.user : otherName}'s</h3>}
                            </span>
                            <div className="their-stuff">
                                {otherTrade == '' ? 'No Item Added Yet' :
                                    otherTrade?.map(v => {
                                        return (
                                            <div style={{ cursor: selectedTrade && tradeType == 'incoming' ? 'default' : 'pointer' }} onClick={(e) => { if (!(selectedTrade && tradeType == 'incoming')) handleRemoveClick(e, v._id, 'other', v.estimate_value) }}>
                                                <HorizontalCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
                                            </div>
                                        );
                                    })}
                            </div>
                            <p className="estimate-value">{t('their estimate', { name: selectedTrade ? selectedTrade?.user : otherName })} {otherEstimate}</p>
                        </div>
                        <span className="middle-section" style={{ position: 'relative', margin: '30px 0', display: 'block', width: '100%' }}>
                            <hr style={{ border: '1px solid var(--text-primary)' }} />
                            <img src={tradeIcon} alt="" />
                        </span>
                        <div className="your-table" style={{ position: 'relative' }}>
                            <p className="estimate-value" style={{ top: '-20px' }}>{t('your estimate')} {userEstimate}</p>
                            {tradeType == 'incoming' ? <h3 style={{ fontSize: '20px', fontWeight: 300 }}>{t('for your')}</h3> :
                                <h3 className="you-offered" style={{ fontSize: '20px', fontWeight: 300 }}>{t('you offered')}</h3>}
                            <div className="your-stuff">
                                {userTrade == '' ? "No Item Added Yet" :
                                    userTrade?.map(v => {
                                        return (
                                            <div style={{ cursor: selectedTrade && tradeType == 'incoming' ? 'default' : 'pointer' }} onClick={(e) => { if (!(selectedTrade && tradeType == 'incoming')) { handleRemoveClick(e, v._id, 'user', v.estimate_value) } }}>
                                                <HorizontalCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        {tradeType == 'offer' ?
                            <button className="do-offer" onClick={async () => {
                                if (selectedTrade) {
                                    //if theres selectedTrade(doing counter offer); update the old trade to countered status and send a new offer
                                    await handleTradeUpdate(selectedTrade ? selectedTrade?.userId?._id : otherUserId, selectedTrade.tradeId, 'counter');
                                    handleOfferClick();
                                } else {
                                    await handleOfferClick();
                                    sendOfferMessage();
                                }
                            }}>{t('make offer')}</button>
                            :
                            <span style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '0 auto' }}>
                                <button className="accept-trade respond-btn" onClick={() => { handleTradeUpdate(selectedTrade ? selectedTrade?.userId?._id : otherUserId, selectedTrade.tradeId, 'accept'); handleClose(); }}>{t('accept trade')}</button>
                                <button className="decline-trade respond-btn" onClick={() => { handleTradeUpdate(selectedTrade ? selectedTrade?.userId?._id : otherUserId, selectedTrade.tradeId, 'decline'); handleClose(); }}>{t('decline trade')}</button>
                            </span>
                        }
                        {tradeType == 'offer' ?
                            <p className='other-option' onClick={handleClose}>{t('cancel')}</p>
                            : <p className="other-option" onClick={() => setTradeType('offer')}>{t('change offer')}</p>}
                    </section>
                </div>
            </div>
        </>
    );
}