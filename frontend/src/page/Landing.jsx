import shapePath from "../assets/path.png";
import barterIll from '../assets/barter.png';
import nomoney from "../assets/nomoney.png";
import help from '../assets/help.png';
import recycle from '../assets/recycle.png';
import inventory from '../assets/inventory.png';
import browneye from '../assets/brownEye.png';
import trade from '../assets/trade.png';
import "./Landing.css";
import { Link } from "react-router";

export default function Landing() {

    const benInfos = [
        { src: nomoney, h3: "Waste less money", p: 'Save up money by not using money as payment, and instead use what you own.' },
        { src: help, h3: "Help those in need", p: 'Help those who are low on money, by giving them a way to pay for items' },
        { src: recycle, h3: "Recycle", p: 'Reuse and recycle items' }
    ]

    return (
        <>
            <section className="definition">
                <h1>What's Barter?</h1>
                <p><span style={{ fontWeight: 'bold' }}>Barter [ˈbɑːtə]:</span> trading goods or services between two or more parties without the use of money.</p>
                <Link to='/home'>See what others are trading --&gt;</Link>
                <img className="barterIll" src={barterIll} alt="" />
                <img className="shapeBg" src={shapePath} alt="" />
            </section>
            <section className="benefit">
                <h1>Benefits of Bartering</h1>
                <div className="bens">
                    {benInfos.map((v, i) => {
                        return (
                            <div className="ben-info" key={i}>
                                <img src={v.src} alt="" style={{ marginBottom: '25px', filter: 'invert(23%) sepia(99%) saturate(1744%) hue-rotate(16deg) brightness(92%) contrast(94%)' }} />
                                <h3 style={{ fontSize: '32px', fontWeight: 600 }}>{v.h3}</h3>
                                <p style={{ fontSize: '16px', fontWeight: 400 }}>{v.p}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <h1 className="how-head">How it works?</h1>
            <section className="how">
                <div className="step1">
                    <img src={inventory} alt="" style={{ filter: 'invert(23%) sepia(99%) saturate(1744%) hue-rotate(16deg) brightness(92%) contrast(94%)' }} />
                    <span>
                        <h2>1. Upload item</h2>
                        <p>Upload item you are trading in and detail what you are looking for</p>
                    </span>
                </div>
                <div className="step2">
                    <span>
                        <h2>2. Browse</h2>
                        <p>Browse others inventory to see what they offer, what they want</p>
                    </span>
                    <img src={browneye} alt="" />
                </div>
                <div className="step3">
                    <img src={trade} alt="" style={{ filter: 'invert(23%) sepia(99%) saturate(1744%) hue-rotate(16deg) brightness(92%) contrast(94%)' }} />
                    <span>
                        <h2>3. Trade</h2>
                        <p>Offer your trade with what you have in your inventory </p>
                    </span>
                </div>
            </section>
        </>
    );
}