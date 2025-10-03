import tradeIcon from '../assets/trade.png';
import HorizontalCard from '../component/HorizontalCard';
import './TradeCard.css'

export default function TradeCard(props) {
    const {
        tradeId,
        type,
        user,
        userId,
        userImg,
        leftItem,
        leftCount,
        leftItems,
        rightItem,
        rightCount,
        rightItems,
        status,
        updatedAt,
        tradePopupRef,
        tradePopupContentRef,
        handleTradeUpdate,
        setSelectedTrade,
        setIsPopup,
    } = props;

    const handleRespondClick = (e) => {
        e.stopPropagation();
        setSelectedTrade({
            tradeId, user, userId, leftItem, rightItem, leftItems, rightItems
        })
        tradePopupRef.current.style.display = 'block'
        tradePopupContentRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setIsPopup(true);
    }

    return (
        <>
            <div className='trade-card-container' style={{ position: 'relative' }}>
                <div className="trade-card">
                    <section className="left-side">
                        <img src={userImg?.startsWith('http') ? userImg : `http://localhost:3000/${userImg}`} alt="" style={{ objectFit: 'contain', backgroundColor: 'white'}}/>
                        <div className="trade-detail">
                            <h2>{type == 'incoming' ? <>{user} <span style={{ fontWeight: 300 }}>offered</span></> : <><span style={{ fontWeight: 300 }}>For</span> {user}</>}</h2>
                            <HorizontalCard
                                pname={leftItem?.name}
                                condition={leftItem?.item_condition}
                                lookfor={leftItem?.looking_for}
                                mainImg={leftItem?.main_img}
                            />
                            {leftCount > 1 && <p className="item-count">+ {leftCount - 1} more items</p>}
                        </div>
                    </section>
                    <img src={tradeIcon} alt="" style={{ width: '35px', height: '25px', alignSelf: 'center' }} />
                    <section className="right-side">
                        <div className="trade-detail">
                            <h2 style={{ fontWeight: 300 }}>{type == 'incoming' ? "For your" : "You offered"}</h2>
                            <HorizontalCard
                                pname={rightItem?.name}
                                condition={rightItem?.item_condition}
                                lookfor={rightItem?.looking_for}
                                mainImg={rightItem?.main_img}
                            />
                            {rightCount > 1 && <p className="item-count">+ {rightCount - 1} more items</p>}
                        </div>
                    </section>
                    {status == 'pending' &&
                        <span className="decision">
                            {type === 'incoming' ? (
                                <>
                                    <p
                                        onClick={handleRespondClick}
                                        className="respond"
                                        style={{ marginRight: '30px' }}
                                    >
                                        Respond to Offer
                                    </p>
                                    <p className="decline" onClick={() => handleTradeUpdate(tradeId, 'decline')}>Decline Trade</p>
                                </>
                            ) : (
                                <p className="cancel" onClick={() => handleTradeUpdate(tradeId, 'cancel')}>Cancel Trade Offer</p>
                            )}
                        </span>
                    }
                <p style={{position: 'absolute', bottom: '-10px', left: '0px', padding: 'inherit', zIndex: 1, color: status != 'pending' ? 'white' : 'black'}}>{new Date(updatedAt).toLocaleString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
                </div>
                {status != 'pending' ?
                    <div className="overlay" >
                        <p>{status == 'cancelled' ? 'Trade Offer Cancelled' : status == "countered" ? 'Counter Offer Made' : status == 'accepted' ? 'Trade Accepted' : 'Trade Declined'}</p>
                    </div> : <></>}
            </div>
        </>
    );
}