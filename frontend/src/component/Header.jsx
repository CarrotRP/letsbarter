import TextLogo from './TextLogo';
import create from '../assets/create.png';
import trade from '../assets/trade.png';
import chatIcon from '../assets/chat.png';
import closeIcon from '../assets/close.png';
import './Header.css';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import Chat from './Chat';
import { useTranslation } from 'react-i18next';

export default function Header(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = searchParams.get("query");
    const [value, setValue] = useState(query || ""); //search value
    const { chatRef, user, chat, setChat, viewImgRef, viewImgBgRef, viewImg, setViewImg } = props;
    const { t } = useTranslation();
    const [chatList, setChatList] = useState();

    // todo: make this works properly(navigate to search page if not on search page and search the query)
    const handleSearch = () => {
        if (location.pathname != '/search') {
            navigate(`/search?query=${value}`);
        } else {
            setSearchParams({ query: value });
        }
    }

    const handleViewImg = (e, currentImg) => {
        e.stopPropagation();
        document.body.style.overflow = 'hidden';
        setViewImg(currentImg);
        viewImgBgRef.current?.classList.toggle('view-img-active');
        console.log(currentImg)
    }

    const handleViewClose = (e) => {
        e.stopPropagation();
        setViewImg(null);
        viewImgBgRef.current?.classList.remove('view-img-active');
        document.body.style.overflow = null;
    }

    const handleChatClick = (e) => {
        e.stopPropagation();
        chatRef.current.classList.toggle('chat-active');
    }

    const unreadCount = chatList?.reduce((acc, chat) => {
        // Only count messages sent to me that I haven't read
        if (chat.receiver._id === user._id && !chat.isRead) {
            return acc + 1;
        }
        return acc;
    }, 0);

    return (
        <header>
            <Link to="/home"><TextLogo /></Link>
            <span>
                <input type="text" id='search' placeholder={t('search place')} value={value} onChange={(e) => setValue(e.target.value)} />
                <button id='search-btn' onClick={handleSearch}>{t('search')}</button>
            </span>
            <span className="right-head">
                {user ?
                    <>
                        <Link to='/add' style={{ height: '27px' }}><img src={create} alt="" style={{ width: '27px' }} /></Link>
                        <Link to='/trade' id='trade'><img src={trade} alt="" style={{ width: '24px', filter: 'invert(100%) sepia(100%) saturate(0%) hue-rotate(353deg) brightness(102%) contrast(105%)' }} />{t('my trade')}</Link>
                        <span style={{ display: 'flex', position: 'relative'}}>
                            <button id='chat' onClick={handleChatClick}><img src={chatIcon} alt="" style={{ width: '30px', cursor: 'pointer' }} /></button>
                            {unreadCount > 0 && <span className="badge"></span>}
                        </span>
                        <Link to='/profile'><img src={user?.profile_img?.startsWith('http') ? user?.profile_img : `http://localhost:3000/${user?.profile_img}`} alt="" style={{ width: '70px', height: '70px', border: '1px solid black', borderRadius: '50%', objectFit: 'contain', backgroundColor: 'white' }} /></Link>
                        <Chat chatRef={chatRef} chat={chat} setChat={setChat} user={user} handleViewImg={handleViewImg} chatList={chatList} setChatList={setChatList} />
                        <div className="view-img" ref={viewImgBgRef}>
                            <div className='view-close'>
                                <img src={closeIcon} alt="" onClick={handleViewClose} />
                            </div>
                            <div className="view-img-content" ref={viewImgRef}>
                                <img src={`http://localhost:3000/${viewImg}`} alt=""/>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <Link to='/signup'><button className='signup auth'>{t('signup')}</button></Link>
                        <Link to='/login'><button className='login auth'>{t('login')}</button></Link>
                    </>
                }
            </span>
        </header>
    );
}