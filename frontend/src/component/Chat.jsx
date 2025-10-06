import close from '../assets/close.png';
import ChatTile from './ChatTile';
import ChatDetail from './ChatDetail';
import './Chat.css'
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../context/SocketContext';

export default function Chat(props) {
    const { chatRef, chat, setChat, user, handleViewImg} = props
    const { t } = useTranslation();
    const [chatList, setChatList] = useState();
    const [query, setQuery] = useState('');
    const [debounceQ, setDebounceQ] = useState(query);
    const {socket, setSocket} = useContext(SocketContext);

    const handleCloseClick = () => {
        chatRef.current.classList.remove('chat-active');
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceQ(query);
        }, 500);

        return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3000/message?search=${debounceQ}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setChatList(data);
                })
        }
    }, [debounceQ]);

    return (
        <div className='chat' ref={chatRef}>
            {!chat &&
                <>
                    <span>
                        <h1 style={{ color: 'var(--text-primary)' }}>{t('chat')}</h1>
                        <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
                    </span>
                    <input type="text" placeholder={t('search')} id='chat-search' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <div className="chat-list">
                        {chatList?.map(v => {
                            return (<div onClick={(e) => { e.stopPropagation(); setChat(v.receiver?._id == user?._id ? v.sender : v.receiver) }} style={{ cursor: 'pointer' }}>
                                <ChatTile
                                    username={v.receiver?._id == user?._id ? v.sender?.username : v.receiver?.username}
                                    profile={v.receiver?._id == user?._id ? v.sender?.profile_img : v.receiver?.profile_img}
                                    text={
                                        v.receiver?._id === user?._id
                                            ? v.image
                                                ? t('they sent', { user: v.sender?.username })
                                                : v.text
                                            : v.image
                                                ? t('you sent')
                                                : t('you', { text: v.text })
                                    }
                                    date={v.createdAt} />
                            </div>);
                        }
                        )}
                    </div>
                </>}
            {chat && <ChatDetail chat={chat} setChat={setChat} user={user} handleViewImg={handleViewImg} socket={socket} setSocket={setSocket}/>}
        </div>
    );
}