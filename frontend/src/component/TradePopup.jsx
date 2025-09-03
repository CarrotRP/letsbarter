import HorizontalCard from "./HorizontalCard";
import ProductCard from "./ProductCard";
import './TradePopup.css'
import { useState } from "react";
import tradeIcon from '../assets/trade.png';

export default function TradePopup(props) {
    const { tradePopupRef, tradePopupContentRef } = props;
    const [currentPage, setCurrentPage] = useState('your');

    const unselectedStyle = {
        backgroundColor: '#d7d7d7',
        fontWeight: 300
    }

    return (
        <>
            <div className="popup-bg" ref={tradePopupRef}></div>
            <div className="trade-popup" ref={tradePopupContentRef}>
                <h1>Offer Trade</h1>
                <div className="trade-popup-content">
                    <section className="item-selection">
                        <span className="user-inventory-nav">
                            <h3 onClick={() => setCurrentPage('your')} style={currentPage == 'your' ? null : unselectedStyle}>Your Inventory</h3>
                            <h3 onClick={() => setCurrentPage('their')} style={currentPage == 'their' ? null : unselectedStyle}>Their Inventory</h3>
                        </span>
                        <div className="user-inventory">
                            <input type="text" placeholder="Search" />
                            <div className="item-display">
                                {currentPage == 'your' ?
                                    <>
                                        {[...new Array(6)].map(_ => {
                                            return (
                                                <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" imgSize='150' fontSize1='16' fontSize2='14' fontSize3='13' />
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
                        <button className="do-offer">Make Offer</button>
                        <p style={{ fontWeight: 300, textAlign: 'center' }}>Cancel</p>
                    </section>
                </div>
            </div>
        </>
    );
}