import { useEffect } from "react";
import { Link, useLocation, useOutletContext } from "react-router";
import filterIcon from '../assets/filter.png';
import ProductCard from "../component/ProductCard";
import { useState } from "react";
import Filter from "../component/Filter";

export default function Query() {
    const location = useLocation();
    const [item, setItem] = useState([]);
    const {filterRef, handleFilterDropdown} = useOutletContext();
    const [filter, setFilter] = useState({condition: null, sort: null});

    useEffect(() => {
        const url = new URL(`http://localhost:3000/item/category${location.search}`);

        for(const key in filter){
            if(filter[key]) url.searchParams.append(key, filter[key]);
        }
        
        fetch(url)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [filter]);

    return (
        <main className="search-page">
            <span className='title'>
                <h1>Category: {location.state[0].toUpperCase() + location.state.slice(1)}</h1>
                <span className="filter" onClick={handleFilterDropdown}>
                    <img src={filterIcon} alt="" style={{ width: '30px' }} />
                    <h3>Filter</h3>
                </span>
                <Filter filterRef={filterRef} setFilter={setFilter}/>
            </span>
            <div className="search-result">
                {item.map(v => {
                    return (
                        <Link  to={`/product/${v._id}`} style={{color: 'var(--text-secondary)'}} key={v.id}>
                            <ProductCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} />
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}