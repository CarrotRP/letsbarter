import placeholder from '../assets/placeholder.jpg';
import './HorizontalCard.css';

export default function HorizontalCard() {
    return (
        <div className="horizontal-card">
            <img src={placeholder} alt="" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px'}} />
            <div className="horizontal-card-detail">
                <h3 style={{ fontWeight: 600 }}>Steel Water Bottle</h3>
                <p>Condition: 6 / 10</p>
                <h3 style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Looking for <br></br><span style={{ color: 'var(--secondary)' }}>Bag . Foods . Soap</span></h3>
            </div>
        </div>
    );
}