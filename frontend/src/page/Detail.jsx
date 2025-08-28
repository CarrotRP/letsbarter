import HomeComponent from "../component/HomeComponent";
import { useParams } from "react-router";
import placeholder from '../assets/placeholder.jpg';
import placeholder2 from '../assets/placeholder2.png';
import placeholder3 from '../assets/placeholder3.png';
import { Link } from "react-router";
import './Detail.css';

export default function Detail() {
    const { id } = useParams();

    return (
        <main className="detail-page">
            <section className="product-detail">
                <aside>
                    <img src={placeholder} alt="" />
                    <img src={placeholder} alt="" />
                    <img src={placeholder} alt="" />
                    <img src={placeholder} alt="" />
                </aside>
                <img id="main-img" src={placeholder} alt="" />
                <section className="product-info">
                    <h1>Steel Water Bottle</h1>
                    <p><b style={{ color: 'var(--primary)' }}>Looking for</b></p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--secondary)' }}>Food . Education . Books . Nvidia Geforce 5090</p>
                    <p style={{ margin: '35px 0 10px' }}>Steel water bottle for drinking and storing water, duh!</p>
                    <hr style={{ border: '1px solid rgba(163, 68, 7, 0.3)' }} />
                    <div className="other-info">
                        <p>Orignal price</p>
                        <p>20$</p>
                        <p>Brand</p>
                        <p>Stanley</p>
                        <p>Conditions</p>
                        <p>8 / 10</p>
                        <p>Bought on</p>
                        <p>02/June/2019</p>
                    </div>
                    <Link to={`/user/1`} className="user" style={{color: 'var(--text-secondary)'}}>
                        <img src="/favicon.png" style={{ width: '40px' }} alt="user-image" />
                        <span>
                            <p style={{ fontWeight: 500 }}>Bob Krackin</p>
                            <p style={{ fontSize: '13px', fontWeight: 300 }}>College Student</p>
                        </span>
                    </Link>
                    <button>Offer Trade</button>
                </section>
            </section>
            <HomeComponent sectionName="Other items in Bob's inventory" />
            <HomeComponent sectionName="You might also like" />
        </main>
    );
}