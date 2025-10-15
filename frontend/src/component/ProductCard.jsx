import { useTranslation } from "react-i18next";
import placeholder from "../assets/placeholder.jpg";
import './ProductCard.css';
import { BASE_URL } from "../config/apiConfig";

export default function ProductCard(props){
    const {pname, condition, lookfor, imgSize, fontSize1, fontSize2, fontSize3, mainImg} = props;
    const {t} = useTranslation();

    return(
        <div className="card">
            <img src={`${BASE_URL}/${mainImg}`} loading="lazy" alt="" style={{width: imgSize ? `${imgSize}px` : null, height: imgSize ? `${imgSize}px` : null,}}/>
            <h4 id="product-card-name" style={{fontSize: fontSize1 ? `${fontSize1}px` : null}}>{pname}</h4>
            <p id="product-card-condition" style={{fontSize: fontSize2 ? `${fontSize2}px` : null}}>{t('condition')} {condition} / 10</p>
            <h4 id="product-card-looking" style={{fontSize: fontSize3 ? `${fontSize3}px` : null}}>{t('looking')} <br /><span id="product-card-for">{lookfor}</span></h4>
        </div>
    );
}