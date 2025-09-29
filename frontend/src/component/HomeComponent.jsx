import { Link } from "react-router";
import ProductCard from "../component/ProductCard";
import { useEffect } from "react";

export default function HomeComponent(props) {
    const {items, setter, limit, setLimit, itemCount} = props;

    return (
        <section>
            <h1 style={{ color: 'var(--text-primary)', fontSize: '36px', margin: '10px 0' }}>{props.sectionName}</h1>
            <section className="products">
                {items?.map((v, _) => {
                    return (
                        <Link to={`/product/${v._id}`} style={{color: 'var(--text-secondary)'}} key={v.id}>
                            <ProductCard pname={v?.name} condition={v?.item_condition} lookfor={v?.looking_for} mainImg={v?.main_img}/>
                        </Link>
                    );
                })}
            </section>
            <p style={{ textAlign: 'center', margin: '50px 0px', display: limit >= itemCount ? 'none' : 'block', cursor: 'pointer'}} onClick={() => setLimit(prev => prev + 5)}>See more</p>
        </section>
    );
}