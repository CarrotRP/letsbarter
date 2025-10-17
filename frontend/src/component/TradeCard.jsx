import { useTranslation } from 'react-i18next';
import tradeIcon from '../assets/trade.png';
import HorizontalCard from '../component/HorizontalCard';
import './TradeCard.css'
import { BASE_URL } from '../config/apiConfig';

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
    const {t} = useTranslation();

    const handleRespondClick = (e) => {
        e.stopPropagation();
        setSelectedTrade({
            tradeId, user, userId, leftItem, rightItem, leftItems, rightItems, userImg
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
                        <img src={userImg?.startsWith('http') ? userImg : `${BASE_URL}/${userImg}`} alt="" style={{ backgroundColor: 'white'}}/>
                        <div className="trade-detail">
                            <h2>{type == 'incoming' ? <>{user} <span style={{ fontWeight: 300 }}>{t('offer')}</span></> : <><span style={{ fontWeight: 300 }}>{t('for')}</span> {user}</>}</h2>
                            <HorizontalCard
                                pname={leftItem?.name}
                                condition={leftItem?.item_condition}
                                lookfor={leftItem?.looking_for}
                                mainImg={leftItem?.main_img}
                            />
                            {leftCount > 1 && <p className="item-count">{t('more items', {item: leftCount - 1})}</p>}
                        </div>
                    </section>
                    <img src={tradeIcon} alt="" style={{ width: '35px', height: '25px', alignSelf: 'center' }} />
                    <section className="right-side">
                        <div className="trade-detail">
                            <h2 style={{ fontWeight: 300 }}>{type == 'incoming' ? t('for your') : t('you offered')}</h2>
                            <HorizontalCard
                                pname={rightItem?.name}
                                condition={rightItem?.item_condition}
                                lookfor={rightItem?.looking_for}
                                mainImg={rightItem?.main_img}
                            />
                            {rightCount > 1 && <p className="item-count">{t('more items', {item: rightCount - 1})}</p>}
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
                                        {t('respond offer')}
                                    </p>
                                    <p className="decline" onClick={() => handleTradeUpdate(userId?._id, tradeId, 'decline')}>{t('decline trade')}</p>
                                </>
                            ) : (
                                <p className="cancel" onClick={() => handleTradeUpdate(userId?._id, tradeId, 'cancel')}>{t('cancel trade')}</p>
                            )}
                        </span>
                    }
                <p style={{position: 'absolute', bottom: '-10px', left: '0px', padding: 'inherit', zIndex: 1, color: status != 'pending' ? 'white' : 'black'}}>{new Date(updatedAt).toLocaleString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'})}</p>
                </div>
                {status != 'pending' ?
                    <div className="overlay" >
                        <p>{status == 'cancelled' ? t('trade cancelled') : status == "countered" ? t('trade countered') : status == 'accepted' ? t('trade accepted') : t('trade declined')}</p>
                    </div> : <></>}
            </div>
        </>
    );
}