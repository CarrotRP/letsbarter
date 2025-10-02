import tradeIcon from '../assets/trade.png';
import HorizontalCard from '../component/HorizontalCard';
import './TradeCard.css'

export default function TradeCard(props) {
    const {
        type,
        user,
        leftItem,
        leftCount,
        rightItem,
        rightCount,
        tradePopupRef,
        tradePopupContentRef
    } = props;

    const handleRespondClick = (e) => {
        e.stopPropagation();
        tradePopupRef.current.style.display = 'block'
        tradePopupContentRef.current.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }


    return (
        <>
            <div className='trade-card-container' style={{ position: 'relative' }}>
                <div className="trade-card">
                    <section className="left-side">
                        <img src="/favicon.png" alt="" />
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
                                <p className="decline">Decline Trade</p>
                            </>
                        ) : (
                            <p className="cancel">Cancel Trade Offer</p>
                        )}
                    </span>
                </div>
                {/* {decide ?
                    <div className="overlay" >
                        <p>{decide}</p>
                    </div> : <></>} */}
            </div>
        </>
    );
}