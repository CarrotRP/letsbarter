import TextLogo from './TextLogo';
import create from '../assets/create.png';
import trade from '../assets/trade.png';
import chat from '../assets/chat.png';
import './Header.css';
import { Link, useSearchParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import Chat from './Chat';

export default function Header(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [value, setValue] = useState(query || "");
    const { chatRef, user } = props;

    // todo: make this works properly(navigate to search page if not on search page and search the query)
    const handleSearch = (e) => {
        console.log(value)
        e.preventDefault();
        setSearchParams(prev => ({ ...prev, q: value }));
    }
    const handleChatClick = (e) => {
        e.stopPropagation();
        chatRef.current.classList.toggle('chat-active');
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (chatRef && !chatRef.current.contains(e.target)) {
                chatRef.current.classList.remove('chat-active');
            }
        }

        document.addEventListener('click', handleOutsideClick);
        window.addEventListener('scroll', () => {
            chatRef.current.classList.remove('chat-active');
        })

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);


    return (
        <header>
            <Link to="/"><TextLogo /></Link>
            {/* <form onSubmit={handleSearch}>
                <input type="text" id='search' placeholder='Search' onChange={(e) => setValue(e.target.value)} /> */}
            {/* <input type="submit" value="Search" /> */}
            {/* </form> */}
            <span className="right-head">
                {/* TODO: implement login function, check to whether add these 3 below */}
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