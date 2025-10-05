import close from '../assets/close.png';
import ChatTile from './ChatTile';
import ChatDetail from './ChatDetail';
import './Chat.css'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Chat(props) {
    const { chatRef, chat, setChat, user } = props
    const { t } = useTranslation();
    const [chatList, setChatList] = useState();

    //NOTE: this is just prototype chat transition click

    const handleChatclick = (e) => {
        e.stopPropagation();
        setChat("hello");
    }

    const handleCloseClick = () => {
        chatRef.current.classList.remove('chat-active');
    }
    
    useEffect(() => {
        if(user){
            fetch(`http://localhost:3000/message/`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setChatList(data);
                })
        }
    }, [user]);

    return (
        <div className='chat' ref={chatRef}>
            {!chat &&
                <>
                    <span>
                        <h1 style={{ color: 'var(--text-primary)' }}>{t('chat')}</h1>
                        <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
                    </span>
                    <input type="text" placeholder={t('search')} id='chat-search' />
                    <div className="chat-list">
                        {chatList?.map(v => {
                            return (<div onClick={handleChatclick}>
                                <ChatTile />
                            </div>);
                        }
                        )}
                    </div>
                </>}
            {chat && <ChatDetail chat={chat} setChat={setChat} user={user}/>}
        </div>
    );
}