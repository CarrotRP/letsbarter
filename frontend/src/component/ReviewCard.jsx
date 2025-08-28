import './ReviewCard.css';

export default function ReviewCard() {
    return (
        <div className="review-card">
            <img src="/favicon.png" alt="" />
            <div className="whonwhat">
                <h1>Bob Krackin</h1>
                <p style={{ fontSize: '20px', fontWeight: 300 }}>lorem ipsum something something, វ៉ាវ なんかすごいこいつ　本当におすすめやる</p>
            </div>
            <p style={{ fontWeight: 300, color: 'rgba(0,0,0,0.65)', position: 'absolute', top: 0, right: 0, padding: 'inherit' }}>25/08/2025</p>
            <h1 style={{ color: 'var(--primary)', position: 'absolute', bottom: 0, right: 0, padding: 'inherit', fontSize: '32px'}}>4/5</h1>
        </div>
    );
}