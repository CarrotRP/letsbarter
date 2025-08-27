import tradeIcon from '../assets/trade.png';
import HorizontalCard from '../component/HorizontalCard';
import './TradeCard.css'

export default function TradeCard(props) {
    const { type, user, itemCount1, itemCount2, decide } = props;

    return (
        <div className='trade-card-container' style={{ position: 'relative' }}>
            <div className="trade-card">
                <section className="left-side">
                    <img src="/favicon.png" alt="" />
                    <div className="trade-detail">
                        <h2>{type == 'incoming' ? <>{user} <span style={{ fontWeight: 300 }}>offered</span></> : <><span style={{ fontWeight: 300 }}>For</span> {user}</>}</h2>
                        <HorizontalCard />
                        {itemCount1 > 1 ? <p className='item-count'>+ {itemCount1} more items</p> : <></>}
                    </div>
                </section>
                <img src={tradeIcon} alt="" style={{ width: '35px', height: '25px', alignSelf: 'center' }} />
                <section className="right-side">
                    <div className="trade-detail">
                        <h2 style={{ fontWeight: 300 }}>{type == 'incoming' ? "For your" : "You offered"}</h2>
                        <HorizontalCard />
                        {itemCount2 > 1 ? <p className='item-count'>+ {itemCount2} more items</p> : <></>}
                    </div>
                </section>
                {decide ? <></> :
                    <span className='decision'>
                        {type == 'incoming' ? <>
                            <p className='respond' style={{ marginRight: '30px' }}>Respond to Offer</p>
                            <p className='decline'>Decline Trade</p>
                        </> : <p className='cancel'>Cancel Trade Offer</p>}
                    </span>}
            </div>
            {decide ?
                <div className="overlay" >
                    <p>{decide}</p>
                </div> : <></>}
        </div>
    );
}