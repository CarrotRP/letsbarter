import { useEffect } from "react";
import { Link, useLocation, useOutletContext } from "react-router";
import filterIcon from '../assets/filter.png';
import ProductCard from "../component/ProductCard";
import { useState } from "react";
import Filter from "../component/Filter";

export default function Query() {
    const location = useLocation();
    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const {filterRef, handleFilterDropdown} = useOutletContext();
    const [filter, setFilter] = useState({condition: null, sortOpt: null});

    useEffect(() => {
        const url = new URL(`http://localhost:3000/item/category${location.search}`);

        for(const key in filter){
            if(filter[key]) url.searchParams.append(key, filter[key]);
        }

        url.searchParams.append('page', page);
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTotalPage(data.totalPage);
                setItem(data.items)
            });
    }, [page, filter]);

    return (
        <main className="search-page">
            <span className='title'>
                <h1>Category: {location.state[0].toUpperCase() + location.state.slice(1)}</h1>
                <span className="filter" onClick={handleFilterDropdown}>
                    <img src={filterIcon} alt="" style={{ width: '30px' }} />
                    <h3>Filter</h3>
                </span>
                <Filter filterRef={filterRef} filter={filter} setFilter={setFilter}/>
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
            <div className="navigator">
                {page == 1 ? <></> :
                <p className='prev-page' onClick={() => setPage(prev => prev - 1)}>{page - 1}</p>}
                <p className='current-page'>{page}</p>
                {page >= totalPage ? <></> : 
                <p className='next-page' onClick={() => setPage(prev => prev + 1)}>{page + 1}</p>}
            </div>
        </main>
    );
}