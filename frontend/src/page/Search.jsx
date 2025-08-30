import filter from '../assets/filter.png'
import ProductCard from '../component/ProductCard';
import './Search.css';

export default function Search(){
    return(
        <main className="search-page">
            <span className='title'>
                <h1>Search for: Books</h1>
                <span className="filter">
                    <img src={filter} alt="" style={{width: '30px'}}/>
                    <h3>Filter</h3>
                </span>
            </span>
            <div className="search-result">
                {[...new Array(8)].map(_ => {
                    return(
                        <ProductCard pname={'Bottle wo er'} condition={6} lookfor="concain . book . idk" />
                    ); 
                })}
            </div>
        </main>
    );
}