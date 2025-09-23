import { Link, useSearchParams } from 'react-router';
import filter from '../assets/filter.png'
import ProductCard from '../component/ProductCard';
import './Search.css';
import { useEffect, useState } from 'react';

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [searchResult, setSearchResult] = useState();

    useEffect(() => {
        if (query) {
            console.log(query);
            fetch(`http://localhost:3000/item/search?query=${query}`)
                .then(res => res.json())
                .then(data => {
                    setSearchResult(data);
                    console.log(data)
                });
        }
    }, [query]);

    return (
        <main className="search-page">
            <span className='title'>
                <h1>Search for: {query}</h1>
                <span className="filter">
                    <img src={filter} alt="" style={{ width: '30px' }} />
                    <h3>Filter</h3>
                </span>
            </span>
            <div className="search-result">
                {searchResult?.map(v => {
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