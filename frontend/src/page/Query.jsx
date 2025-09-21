import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import filter from '../assets/filter.png';
import ProductCard from "../component/ProductCard";
import { useState } from "react";

export default function Query() {
    const location = useLocation();
    // const {}
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/item/category${location.search}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, []);

    return (
        <main className="search-page">
            <span className='title'>
                <h1>Category: {location.state[0].toUpperCase() + location.state.slice(1)}</h1>
                <span className="filter">
                    <img src={filter} alt="" style={{ width: '30px' }} />
                    <h3>Filter</h3>
                </span>
            </span>
            <div className="search-result">
                {item.map(v => {
                    return (
                        <Link  to={`/product/${v._id}`} style={{color: 'var(--text-secondary)'}} key={v.id}>
                            <ProductCard pname={v.name} condition={v.condition} lookfor={v.looking_for} mainImg={v.main_img} />
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}