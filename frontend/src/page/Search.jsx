import { Link, useOutletContext, useSearchParams } from 'react-router';
import filterIcon from '../assets/filter.png'
import ProductCard from '../component/ProductCard';
import './Search.css';
import { useEffect, useState } from 'react';
import Filter from '../component/Filter';

export default function Search() {
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [searchResult, setSearchResult] = useState();
    const query = searchParams.get('query');
    const [filter, setFilter] = useState({ condition: null, sortOpt: null });
    const { filterRef, handleFilterDropdown } = useOutletContext();

    useEffect(() => {
        if (query || filter) {
            //keeping this, cuz might use in future eventho this is kinda redundant than using URL obj;
            const params = new URLSearchParams();

            if (query) {
                params.append("query", query);
            }

            for (const key in filter) {
                if (filter[key]) params.append(key, filter[key]);
            }

            //set page
            params.append("page", page);

            const url = `http://localhost:3000/item/search?${params.toString()}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setSearchResult(data.items);
                    setTotalPage(data.totalPage);
                });
        }
    }, [page, query, filter]);

    return (
        <main className="search-page">
            <span className='title'>
                <h1>Search for: {query}</h1>
                <span className="filter" onClick={handleFilterDropdown}>
                    <img src={filterIcon} alt="" style={{ width: '30px' }} />
                    <h3>Filter</h3>
                </span>
                <Filter filterRef={filterRef} filter={filter} setFilter={setFilter} />
            </span>
            <div className="search-result">
                {searchResult?.map(v => {
                    return (
                        <Link to={`/product/${v._id}`} style={{ color: 'var(--text-secondary)' }} key={v.id}>
                            <ProductCard pname={v.name} condition={v.item_condition} lookfor={v.looking_for} mainImg={v.main_img} />
                        </Link>
                    );
                })}
            </div>
            {totalPage > 1 && totalPage &&
                <div className="navigator">
                    {page == 1 ? <div></div> :
                        <p className='prev-page' onClick={() => setPage(prev => prev - 1)}>{page - 1}</p>}
                    <p className='current-page'>{page}</p>
                    {page >= totalPage ? <div></div> :
                        <p className='next-page' onClick={() => setPage(prev => prev + 1)}>{page + 1}</p>}
                </div>
            }
        </main>
    );
}