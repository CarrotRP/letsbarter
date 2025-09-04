import TradeCard from '../component/TradeCard';
import TradePopup from '../component/TradePopup';
import './Trade.css';
import { useState, useEffect, useRef } from 'react';

export default function Trade() {
    const [currentPage, setCurrentPage] = useState("Incoming");
    const tradePopupRef = useRef();
    const tradePopupContentRef = useRef();
    const [tradeType, setTradeType] = useState('incoming');
    const [currentTradePage, setCurrentTradePage] = useState('your');

    const income_trade = [
        { type: 'incoming', user: 'bob', itemCount1: '3', itemCount2: '2' },
        { type: 'incoming', user: 'John', itemCount1: '3', itemCount2: '2' },
        { type: 'incoming', user: 'Dave', itemCount2: '3', decide: 'Trade Accepted' },
        { type: 'incoming', user: 'Bob', itemCount1: '3', decide: 'Trade Declined' }
    ]

    const sent_trade = [
        { user: 'bob', itemCount1: '3', itemCount2: '2' },
        { user: 'John', itemCount1: '3', itemCount2: '2' },
        { user: 'Dave', itemCount2: '3', decide: 'Counter Offer Made' },
        { user: 'Bob', itemCount1: '3', decide: 'Trade Offer Canceled' }
    ]
    useEffect(() => {
        //handle click outside
        const handleOutsideClick = (e) => {
            if(tradePopupContentRef && !tradePopupContentRef.current.contains(e.target)){
                document.body.style.overflow = null;
                tradePopupContentRef.current.style.display = 'none';
                tradePopupRef.current.style.display = 'none';
                setTradeType('incoming');
                setCurrentTradePage('your');
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <main className="trade-page">
            <h1 style={{ fontSize: '36px', color: 'var(--text-primary)' }}>My Trade</h1>
            <div className="trade-page-content">
                <div className="trade-navi">
                    <p onClick={() => setCurrentPage("Incoming")} style={{fontWeight: currentPage == 'Incoming' ? 'bold' : 300}}>Incoming Offer {currentPage == 'Incoming' ? '>' : ''}</p>
                    <p onClick={() => setCurrentPage("Sent")} style={{fontWeight: currentPage == 'Sent' ? 'bold' : 300}}>Sent Offer {currentPage == 'Sent' ? '>' : ''}</p>
                </div>
                <div className="trades">
                    {currentPage == 'Incoming' ? income_trade.map(v => {
                        return (<TradeCard type={v.type} user={v.user} itemCount1={v.itemCount1} itemCount2={v.itemCount2} decide={v.decide} tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} />);
                    }) : sent_trade.map(v => {
                        return (<TradeCard user={v.user} itemCount1={v.itemCount1} itemCount2={v.itemCount2} decide={v.decide}/>);
                    })}
                </div>
            </div>
            <TradePopup tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} tradeType={tradeType} setTradeType={setTradeType} currentTradePage={currentTradePage} setCurrentTradePage={setCurrentTradePage}/>
        </main>
    );
}