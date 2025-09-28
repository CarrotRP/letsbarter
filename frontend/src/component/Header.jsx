import TextLogo from './TextLogo';
import create from '../assets/create.png';
import trade from '../assets/trade.png';
import chat from '../assets/chat.png';
import './Header.css';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import Chat from './Chat';

export default function Header(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = searchParams.get("query");
    const [value, setValue] = useState(query || ""); //search value
    const { chatRef, user } = props;
    // const 

    // todo: make this works properly(navigate to search page if not on search page and search the query)
    const handleSearch = () => {
        if (location.pathname != '/search') {
            navigate(`/search?query=${value}`);
        } else {
            setSearchParams({query: value});
        }
    }

    const handleChatClick = (e) => {
        e.stopPropagation();
        chatRef.current.classList.toggle('chat-active');
    }

    return (
        <header>
            <Link to="/"><TextLogo /></Link>
            <span>
                <input type="text" id='search' placeholder='Books, Category...' value={value}  onChange={(e) => setValue(e.target.value)} />
                <button id='search-btn' onClick={handleSearch}>Search</button>
            </span>
            <span className="right-head">
                {user ?
                    <>
                        <Link to='/add' style={{ height: '27px' }}><img src={create} alt="" style={{ width: '27px' }} /></Link>
                        <Link to='/trade' id='trade'><img src={trade} alt="" style={{ width: '24px', filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(353deg) brightness(102%) contrast(105%)' }} />My Trade</Link>
                        <button id='chat' onClick={handleChatClick}><img src={chat} alt="" style={{ width: '30px', cursor: 'pointer' }} /></button>
                        <Link to='/profile'><img src="/favicon.png" alt="" style={{ width: '70px', border: '1px solid black', borderRadius: '50%' }} /></Link>
                    </>
                    :
                    <>
                        <Link to='/signup'><button className='signup auth'>SIGN UP</button></Link>
                        <Link to='/login'><button className='login auth'>LOGIN</button></Link>
                    </>
                }
                <Chat chatRef={chatRef} />
            </span>
        </header>
    );
}