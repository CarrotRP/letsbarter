import { useOutletContext } from 'react-router';
import TradeCard from '../component/TradeCard';
import TradePopup from '../component/TradePopup';
import './Trade.css';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Trade() {
    const { user } = useOutletContext();
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState("Incoming");
    const tradePopupRef = useRef();
    const tradePopupContentRef = useRef();
    const [tradeType, setTradeType] = useState('incoming');
    const [currentTradePage, setCurrentTradePage] = useState('your');

    const [receivedTrade, setReceivedTrade] = useState();
    const [sentTrade, setSentTrade] = useState();
    const [isPopup, setIsPopup] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();

    const [selectedTrade, setSelectedTrade] = useState();

    const handleTradeUpdate = async (userId, id, decide) => {
        const updateData = {};
        let text = ''
        //"pending", "countered", "accepted", "declined", "cancelled"
        switch (decide) {
            case 'cancel':
                text = `[system] ${user?.username} system cancel`
                updateData.status = 'cancelled'
                break;
            case 'decline':
                text = `[system] ${user?.username} system decline`
                updateData.status = 'declined'
                break;
            case 'accept':
                text = `[system] ${user?.username} system accept`
                updateData.status = 'accepted'
                break;
            case 'counter':
                text = `[system] ${user?.username} system counter`
                updateData.status = 'countered'
                break;
            default:
                text = `[system] ${user?.username} system offer`
                break;

        }

        const res = await fetch(`http://localhost:3000/trade/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        const data = await res.json();
        if (decide == 'cancel') {
            setSentTrade(prev => prev.map(p => p._id == data._id ? { ...p, status: data.status } : p));
        } else if (decide == 'decline' || decide == 'counter' || decide == 'accept') {
            setReceivedTrade(prev => prev.map(p => p._id == data._id ? { ...p, status: data.status } : p));
        }

        if (text) {
            fetch(`http://localhost:3000/message/send/${userId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }

        return data;
    }

    useEffect(() => {
        if (user) {
            if (currentPage == 'Incoming') {
                window.scrollTo(0, 0);
                //fetch received trade
                fetch(`http://localhost:3000/trade/received/${user?._id}?page=${page}`, {
                    credentials: 'include'
                }).then(res => res.json())
                    .then(data => {
                        setReceivedTrade(data.formatted);
                        setTotalPage(data.totalPage);
                    });
            } else {
                window.scrollTo(0, 0);
                //fetch sent trade
                fetch(`http://localhost:3000/trade/sent/${user?._id}?page=${page}`, {
                    credentials: 'include'
                }).then(res => res.json())
                    .then(data => {
                        setSentTrade(data.formatted);
                        setTotalPage(data.totalPage);
                    });
            }
        }

    }, [currentPage, isPopup, page, user]);

    useEffect(() => {
        //handle click outside
        const handleOutsideClick = (e) => {
            if (tradePopupContentRef && !tradePopupContentRef.current.contains(e.target)) {
                document.body.style.overflow = null;
                tradePopupContentRef.current.style.display = 'none';
                tradePopupRef.current.style.display = 'none';
                setTradeType('incoming');
                setCurrentTradePage('your');
                setIsPopup(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <main className="trade-page">
            <h1 style={{ fontSize: '36px', color: 'var(--text-primary)' }}>{t('my trade')}</h1>
            <div className="trade-page-content">
                <div className="trade-navi">
                    <p onClick={() => { setCurrentPage("Incoming"); setPage(1) }} style={{ fontWeight: currentPage == 'Incoming' ? 'bold' : 300, userSelect: 'none' }}>{t('incoming')} {currentPage == 'Incoming' ? '>' : ''}</p>
                    <p onClick={() => { setCurrentPage("Sent"); setPage(1) }} style={{ fontWeight: currentPage == 'Sent' ? 'bold' : 300, userSelect: 'none' }}>{t('sent')} {currentPage == 'Sent' ? '>' : ''}</p>
                </div>
                <div className="trades">
                    {currentPage === 'Incoming'
                        ? receivedTrade?.map(v => (
                            <TradeCard
                                key={v._id}
                                tradeId={v._id}
                                type="incoming"
                                user={v.senderName}
                                userId={v.senderId}
                                userImg={v.senderImg}
                                leftItem={v.senderFirstItem}
                                leftCount={v.senderItemCount}
                                leftItems={v.senderItems}
                                rightItem={v.receiverFirstItem}
                                rightCount={v.receiverItemCount}
                                rightItems={v.receiverItems}
                                status={v.status}
                                updatedAt={v.updatedAt}
                                tradePopupRef={tradePopupRef}
                                tradePopupContentRef={tradePopupContentRef}
                                handleTradeUpdate={handleTradeUpdate}
                                setSelectedTrade={setSelectedTrade}
                                setIsPopup={setIsPopup}
                            />
                        ))
                        : sentTrade?.map(v => (
                            <TradeCard
                                key={v._id}
                                tradeId={v._id}
                                type="sent"
                                user={v.receiverName}
                                userId={v.receiverId}
                                userImg={v.receiverImg}
                                leftItem={v.receiverFirstItem}
                                leftCount={v.receiverItemCount}
                                leftItems={v.receiverItems}
                                rightItem={v.senderFirstItem}
                                rightCount={v.senderItemCount}
                                rightItems={v.senderItems}
                                status={v.status}
                                updatedAt={v.updatedAt}
                                handleTradeUpdate={handleTradeUpdate}
                                setSelectedTrade={setSelectedTrade}
                            />
                        ))}
                </div>
                {totalPage > 1 && totalPage &&
                    <div className="trade-page-navi">
                        {page == 1 ? <div></div> :
                            <p className='prev-page' onClick={() => setPage(prev => prev - 1)}>{page - 1}</p>}
                        <p className='current-page'>{page}</p>
                        {page >= totalPage ? <div></div> :
                            <p className='next-page' onClick={() => setPage(prev => prev + 1)}>{page + 1}</p>}
                    </div>
                }
            </div>
            <TradePopup tradePopupRef={tradePopupRef} tradePopupContentRef={tradePopupContentRef} tradeType={tradeType} setTradeType={setTradeType} currentTradePage={currentTradePage} setCurrentTradePage={setCurrentTradePage} user={user} isPopup={isPopup} setIsPopup={setIsPopup} handleTradeUpdate={handleTradeUpdate} selectedTrade={selectedTrade} />
        </main>
    );
}