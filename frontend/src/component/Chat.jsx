import close from '../assets/close.png';
import ChatTile from './ChatTile';
import ChatDetail from './ChatDetail';
import './Chat.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Chat(props) {
    const { chatRef } = props
    const {t} = useTranslation();

    //NOTE: this is just prototype chat transition click
    const [chat, setChat] = useState("");

    const handleChatclick = (e) => {
        e.stopPropagation();
        setChat("hello");
    }

    const handleCloseClick = () => {
        chatRef.current.classList.remove('chat-active');
    }

    return (
        <div className='chat' ref={chatRef}>
            {chat == "" ?
                <>
                    <span>
                        <h1 style={{ color: 'var(--text-primary)' }}>{t('chat')}</h1>
                        <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
                    </span>
                    <input type="text" placeholder={t('search')} id='chat-search' /><div className="chat-list">
                        {[...new Array(5)].map(v => {
                            return (<div onClick={handleChatclick}>
                                <ChatTile />
                            </div>);
                        }
                        )}
                    </div>
                </>
                : <></>}
            {chat == "" ? <></> :
                <ChatDetail chat={chat} setChat={setChat} />
            }
        </div>
    );
}