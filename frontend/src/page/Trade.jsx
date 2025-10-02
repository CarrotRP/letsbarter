import { useOutletContext } from 'react-router';
import TradeCard from '../component/TradeCard';
import TradePopup from '../component/TradePopup';
import './Trade.css';
import { useState, useEffect, useRef } from 'react';

export default function Trade() {
    const { user } = useOutletContext();
    const [currentPage, setCurrentPage] = useState("Incoming");
    const tradePopupRef = useRef();
    const tradePopupContentRef = useRef();
    const [tradeType, setTradeType] = useState('incoming');
    const [currentTradePage, setCurrentTradePage] = useState('your');

    const [receivedTrade, setReceivedTrade] = useState();
    const [sentTrade, setSentTrade] = useState();

    useEffect(() => {
        if (user) {
            if (currentPage == 'Incoming') {
                //fetch received trade
                fetch(`http://localhost:3000/trade/received/${user?._id}`, {
                    credentials: 'include'
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setReceivedTrade(data)
                    });
            } else {
                //fetch sent trade
                fetch(`http://localhost:3000/trade/sent/${user?._id}`, {
                    credentials: 'include'
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setSentTrade(data);
                    });
            }
        }

    }, [currentPage]);

    useEffect(() => {
        //handle click outside
        const handleOutsideClick = (e) => {
            if (tradePopupContentRef && !tradePopupContentRef.current.contains(e.target)) {
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
                    <p onClick={() => setCurrentPage("Incoming")} style={{ fontWeight: currentPage == 'Incoming' ? 'bold' : 300, userSelect: 'none' }}>Incoming Offer {currentPage == 'Incoming' ? '>' : ''}</p>
                    <p onClick={() => setCurrentPage("Sent")} style={{ fontWeight: currentPage == 'Sent' ? 'bold' : 300, userSelect: 'none' }}>Sent Offer {currentPage == 'Sent' ? '>' : ''}</p>
                </div>
                <div className="trades">
                    {currentPage === 'Incoming'
                        ? receivedTrade?.map(v => (
                            <TradeCard
                                key={v._id}
                                type="incoming"
                                user={v.senderName}
                                leftItem={v.senderFirstItem}
                                leftCount={v.senderItemCount}
                                rightItem={v.receiverFirstItem}
                                rightCount={v.receiverItemCount}
                                tradePopupRef={tradePopupRef}
                                tradePopupContentRef={tradePopupContentRef}
                            />
                        ))
                        : sentTrade?.map(v => (
                            <TradeCard
                                key={v._id}
                                type="sent"
                                user={v.receiverName}
                                leftItem={v.senderFirstItem}
                                leftCount={v.senderItemCount}
                                rightItem={v.receiverFirstItem}
                                rightCount={v.receiverItemCount}
                                tradePopupRef={tradePopupRef}
                                tradePopupContentRef={tradePopupContentRef}
                            />
                        ))}
                </div>
            </div>
            <TradePopup tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} tradeType={tradeType} setTradeType={setTradeType} currentTradePage={currentTradePage} setCurrentTradePage={setCurrentTradePage} />
        </main>
    );
}