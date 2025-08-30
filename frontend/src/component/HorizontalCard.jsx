import placeholder from '../assets/placeholder.jpg';
import './HorizontalCard.css';

export default function HorizontalCard(props) {
    const {imgSize, fontSize1, fontSize2, fontSize3} = props;

    return (
        <div className="horizontal-card">
            <img src={placeholder} alt="" className='item-img' style={{width: imgSize ? `${imgSize}px` : null, height: imgSize ? `${imgSize}px` : null,}}/>
            <div className="horizontal-card-detail">
                <h3 style={{ fontWeight: 600, fontSize: fontSize1 ? `${fontSize1}px` : null }}>Steel Water Bottle</h3>
                <p style={{fontSize: fontSize2 ? `${fontSize2}px` : null}}>Condition: 6 / 10</p>
                <h3 style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: fontSize3 ? `${fontSize3}px` : null}}>Looking for <br></br><span style={{ color: 'var(--secondary)' }}>Bag . Foods . Soap</span></h3>
            </div>
        </div>
    );
}