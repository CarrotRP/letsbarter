import close from '../assets/close.png';
import './Filter.css';

export default function Filter(props) {
    const { filterRef, setFilter } = props;

    const handleCloseClick = () => {
        filterRef.current.classList.remove('filter-popup-active');
    }

    const handleFilterClick = () => {

    }

    return (
        <div className="filter-popup" ref={filterRef}>
            <span className='filter-popup-head'>
                <h2>Filter</h2>
                <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
            </span>

            <div className="filter-option">
                <p>Condition</p>
                <div className="checks">
                    <label htmlFor="less5" onClick={() => setFilter(prev => ({...prev, condition: 'lt'}))}>Less than 5</label>
                    <label htmlFor="more5" onClick={() => setFilter(prev => ({...prev, condition: 'gt'}))}>More than 5</label>
                </div>
            </div>
            <div className="filter-option">
                <p>Looking for</p>
                <div className="checks">
                    <label htmlFor="valueAsc" onClick={() => setFilter(prev => ({...prev, sort: 'asc'}))}>Estimate value (Ascending)</label>
                    <label htmlFor="valueDesc" onClick={() => setFilter(prev => ({...prev, sort: 'desc'}))}>More than 5 (Descending)</label>
                </div>
            </div>
        </div>
    );
}