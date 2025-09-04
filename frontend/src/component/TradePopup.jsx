import HorizontalCard from "./HorizontalCard";
import ProductCard from "./ProductCard";
import { useState } from "react";
import close from '../assets/close.png'
import tradeIcon from '../assets/trade.png';
import './TradePopup.css'

export default function TradePopup(props) {
    const { tradePopupRef, tradePopupContentRef, tradeType, setTradeType, currentTradePage, setCurrentTradePage} = props;

    const unselectedStyle = {
        backgroundColor: '#d7d7d7',
        fontWeight: 300
    }
    const handleClose = () => {
        document.body.style.overflow = null;
        tradePopupContentRef.current.style.display = 'none';
        tradePopupRef.current.style.display = 'none';
        setTradeType('incoming');
        setCurrentTradePage('your');
    }

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
                            <h3 onClick={() => setCurrentTradePage('your')} style={currentTradePage == 'your' ? null : unselectedStyle}>Your Inventory</h3>
                            <h3 onClick={() => setCurrentTradePage('their')} style={currentTradePage == 'their' ? null : unselectedStyle}>Their Inventory</h3>
                        </span>
                        <div className="user-inventory" style={{ position: 'relative', overflow: 'hidden' }}>
                            {tradeType == 'offer' ? <></> :
                                <div className="bg-overlay">
                                    <h2>Change Offer to adjust items</h2>
                                </div>}
                            <input type="text" placeholder="Search" />
                            <div className="item-display">
                                {currentTradePage == 'your' ?
                                    <>
                                        {[...new Array(6)].map(_ => {
                                            return (
                                                <div style={{ cursor: 'pointer' }}>
                                                    <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' />
                                                </div>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {[...new Array(6)].map(_ => {
                                            return (
                                                <ProductCard pname={'Bob shit'} condition={6} lookfor="concain . book . idk" imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' />
                                            );
                                        })}
                                    </>
                                }
                            </div>
                            {/* for pagination  */}
                            <h1 style={{ textAlign: 'center' }}>1</h1>
                        </div>
                    </section>
                    <section className="item-trading">
                        <div className="other-user-table">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="/favicon.png" alt="" style={{ width: '50px', border: '1px solid black', borderRadius: '50%' }} />
                                <h3 style={{ fontSize: '20px' }}><span style={{ fontWeight: 500 }}>For </span>Bob's</h3>
                            </span>
                            <div className="their-stuff">
                                {[...new Array(3)].map(_ => {
                                    return (
                                        <HorizontalCard imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
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
                                {[...new Array(3)].map(_ => {
                                    return (
                                        <HorizontalCard imgSize='90' fontSize1='14' fontSize2='12' fontSize3='13' />
                                    );
                                })}
                            </div>
                        </div>
                        {tradeType == 'offer' ?
                            <button className="do-offer">Make Offer</button>
                            :
                            <span style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '0 auto' }}>
                                <button className="accept-trade respond-btn">Accept Trade</button>
                                <button className="decline-trade respond-btn">Decline Trade</button>
                            </span>
                        }
                        {tradeType == 'offer' ?
                            <p className='other-option'>Cancel</p>
                            : <p className="other-option" onClick={() => setTradeType('offer')}>Change Offer</p>}
                    </section>
                </div>
            </div>
        </>
    );
}