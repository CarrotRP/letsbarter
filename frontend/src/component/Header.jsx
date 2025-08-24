import TextLogo from './TextLogo';
import create from '../assets/create.png';
import trade from '../assets/trade.png';
import chat from '../assets/chat.png';
import './Header.css';
import { Link, useSearchParams } from 'react-router';
import { useState } from 'react';

export default function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [value, setValue] = useState(query || "");

    // todo: make this works properly(navigate to search page if not on search page and search the query)
    const handleSearch = (e) => {
        console.log(value)
        e.preventDefault();
        setSearchParams(prev => ({ ...prev, q: value }));
    }

    return (
        <header>
            <Link to="/"><TextLogo /></Link>
            <form onSubmit={handleSearch}>
                <input type="text" id='search' placeholder='Search' onChange={(e) => setValue(e.target.value)} />
                {/* <input type="submit" value="Search" /> */}
            </form>
            <span className="right-head">
                {/* TODO: implement login function, check to whether add these 3 below */}
                <Link to='/add' style={{height: '27px'}}><img src={create} alt="" style={{width: '27px'}}/></Link>
                <Link to='/trade' id='trade'><img src={trade} alt="" style={{width: '24px', filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(353deg) brightness(102%) contrast(105%)'}}/>My Trade</Link>
                <button id='chat'><img src={chat} alt="" style={{width: '30px'}}/></button>
                <Link to='/signup'><button className='signup auth'>SIGN UP</button></Link>
                <Link to='/login'><button className='login auth'>LOGIN</button></Link>
            </span>
        </header>
    );
}