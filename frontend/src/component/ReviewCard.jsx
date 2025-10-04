import './ReviewCard.css';
import star from '../assets/star.png';

export default function ReviewCard(props) {
    const {profile, username, comment, date, rating} = props

    return (
        <div className="review-card">
            <img className='reviewer-img' src={profile?.startsWith('http') ? profile : `http://localhost:3000/${profile}`} alt="" />
            <div className="whonwhat">
                <h1>{username}</h1>
                <p style={{ fontSize: '16px', fontWeight: 300 }}>{comment}</p>
            </div>
            <p style={{ fontWeight: 300, color: 'rgba(0,0,0,0.65)', position: 'absolute', top: 0, right: 0, padding: 'inherit' }}>{new Date(date).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            {/* <h1 style={{ color: 'var(--primary)', position: 'absolute', bottom: 0, right: 0, padding: 'inherit', fontSize: '32px'}}>4/5</h1> */}
            <div className="card-stars">
            {[...new Array(5)].map((_, i) => <img key={i} src={star} alt="" className='star' style={{ filter: (rating - 1) >= i ? 'invert(59%) sepia(27%) saturate(359%) hue-rotate(43deg) brightness(98%) contrast(93%)' : 'invert(93%) sepia(2%) saturate(24%) hue-rotate(331deg) brightness(84%) contrast(89%)' }}/>)}
            </div>
        </div>
    );
}