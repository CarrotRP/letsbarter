import close from '../assets/close.png';
import ChatTile from './ChatTile';
import ChatDetail from './ChatDetail';
import './Chat.css'
import { useState } from 'react';

export default function Chat() {
    //NOTE: this is just prototype chat transition click
    const [chat, setChat] = useState("");

    const handleChatclick = () => {
        setChat("hello");
    }

    return (
        <div className='chat'>
            {chat == "" ?
                <>
                    <span>
                        <h1 style={{ color: 'var(--text-primary)' }}>Chat</h1>
                        <img src={close} alt="" />
                    </span><input type="text" placeholder='Search' id='chat-search' /><div className="chat-list">
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