import AreaInput from "./AreaInput";
import './ReviewPopup.css';
import close from '../assets/close.png'
import star from '../assets/star.png'
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../config/apiConfig";

export default function ReviewPopup(props) {
    const { reviewBgRef, reviewRef, reviewerId, otherUserId, otherUser, rating, setRating, comment, setComment, fetchReviews} = props;
    const { t } = useTranslation();

    const handleReviewClose = () => {
        document.body.style.overflow = null;
        reviewBgRef.current.classList.remove('review-popup-active');
        setRating(0)
        setComment('')
    }

    const handleSubmit = () => {
        fetch(`${BASE_URL}/review/${otherUserId}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ revieweeId: otherUserId, reviewerId, rating: rating + 1, comment })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                handleReviewClose();
                fetchReviews();
            })
    }

    return (
        <>
            <div className="review-popup" ref={reviewBgRef}>
                <div className="review-popup-content" ref={reviewRef}>
                    <span>
                        <h2>{t('reviewing', { user: otherUser })}</h2>
                        <img src={close} alt="" style={{ width: '25px', cursor: 'pointer' }} onClick={handleReviewClose} />
                    </span>
                    <div className="stars">
                        {[...new Array(5)].map((_, i) => <img key={i} src={star} alt="" style={{ filter: rating >= i ? 'invert(59%) sepia(27%) saturate(359%) hue-rotate(43deg) brightness(98%) contrast(93%)' : 'invert(93%) sepia(2%) saturate(24%) hue-rotate(331deg) brightness(84%) contrast(89%)' }} onClick={() => { console.log(i); setRating(i) }} />)}
                    </div>
                    <div className="cmts">
                        <label htmlFor="comments">{t('comment')}</label>
                        <textarea name="comments" id="comments" maxLength={250} placeholder={t('share', { user: otherUser })} value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>
                    <button onClick={handleSubmit}>{t('submit')}</button>
                </div>
            </div>
        </>
    );
}