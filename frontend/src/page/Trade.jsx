import TradeCard from '../component/TradeCard';
import './Trade.css';
import { useState, useEffect, useRef } from 'react';

export default function Trade() {
    const [currentPage, setCurrentPage] = useState("Incoming");
    const incomeRef = useRef();
    const sentRef = useRef();

    const income_trade = [
        {type: 'incoming', user: 'bob', itemCount1: '3', itemCount2:'2'},
        {type: 'incoming', user: 'John', itemCount1: '3', itemCount2:'2'},
        {type: 'incoming', user: 'Dave', itemCount2:'3', decide: 'Trade Accepted'},
        {type: 'incoming', user: 'Bob', itemCount1: '3', decide:'Trade Declined'}
    ]

    const sent_trade = [
        {user: 'bob', itemCount1: '3', itemCount2:'2'},
        {user: 'John', itemCount1: '3', itemCount2:'2'},
        {user: 'Dave', itemCount2:'3', decide: 'Counter Offer Made'},
        {user: 'Bob', itemCount1: '3', decide:'Trade Offer Canceled'}
    ]
    useEffect(() => {
        if(currentPage == 'Incoming'){
            incomeRef.current.style.fontWeight = 'bold';
            sentRef.current.style.fontWeight = '300';
        } else{
            sentRef.current.style.fontWeight = 'bold';
            incomeRef.current.style.fontWeight = '300';
        }
    }, [currentPage]);


    return (
        <main className="trade-page">
            <h1 style={{ fontSize: '36px', color: 'var(--text-primary)' }}>My Trade</h1>
            <div className="trade-page-content">
                <div className="trade-navi">
                    <p ref={incomeRef} onClick={() => setCurrentPage("Incoming")}>Incoming Offer {currentPage == 'Incoming' ? '>' : ''}</p>
                    <p ref={sentRef} onClick={() => setCurrentPage("Sent")}>Sent Offer {currentPage == 'Sent' ? '>' : ''}</p>
                </div>
                <div className="trades">
                    {currentPage == 'Incoming' ? income_trade.map(v => {
                        return(<TradeCard type={v.type} user={v.user} itemCount1={v.itemCount1} itemCount2={v.itemCount2} decide={v.decide}/>);
                    }) : sent_trade.map(v => {
                        return(<TradeCard user={v.user} itemCount1={v.itemCount1} itemCount2={v.itemCount2} decide={v.decide}/>);
                    })}
                    {/* <TradeCard user="Bob" itemCount1="3" itemCount2="2"/>
                    <TradeCard type="incoming" user="Bob" itemCount2="2" decide="Declined"/>
                    <TradeCard user="Bob" itemCount1="3" itemCount2="2" decide="Accepted"/> */}
                </div>
            </div>
        </main>
    );
}