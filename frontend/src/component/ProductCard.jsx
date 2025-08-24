import placeholder from "../assets/placeholder.jpg";
import './ProductCard.css';

export default function ProductCard(props){
    const {pname, condition, lookfor} = props;

    return(
        <div className="card">
            <img src={placeholder} alt=""/>
            <h4 id="product-card-name">{pname}</h4>
            <p id="product-card-condition">Condition: {condition} / 10</p>
            <h4 id="product-card-looking">Looking for <br /><span id="product-card-for">{lookfor}</span></h4>
        </div>
    );
}