import close from '../assets/close.png';
import ChatTile from './ChatTile';
import ChatDetail from './ChatDetail';
import './Chat.css'
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SocketContext } from '../context/SocketContext';

export default function Chat(props) {
    const { chatRef, chat, setChat, user, handleViewImg, chatList, setChatList } = props
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [debounceQ, setDebounceQ] = useState(query);
    const { socket, setSocket } = useContext(SocketContext);

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
        if (!user) return;

        const fetchChatList = () => {
            fetch(`http://localhost:3000/message?search=${debounceQ}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => { console.log(data); setChatList(data) });
        };

        // fetch immediately when user logs in or search changes
        fetchChatList();

        // listen for new messages via socket
        if (socket) {
            socket.on('sendMessage', fetchChatList);
        }

        // cleanup
        return () => {
            if (socket) socket.off('sendMessage', fetchChatList);
        };
    }, [user, debounceQ, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleReadMessage = ({ messageIds, receiverId }) => {
            // update chatList (for unread count & chat tiles)
            setChatList(prev =>
                prev.map(chat => {
                    const otherUserId = chat.receiver._id === user._id ? chat.sender._id : chat.receiver._id;
                    if (otherUserId === receiverId) {
                        return { ...chat, isRead: true };
                    }
                    return chat;
                })
            );
        };

        socket.on('readMessage', handleReadMessage);
        return () => socket.off('readMessage', handleReadMessage);
    }, [socket, user]);

    return (
        <div className='chat' ref={chatRef}>
            {!chat &&
                <>
                    <span>
                        <h1 style={{ color: 'var(--text-primary)' }} onClick={() => console.log(chatList)}>{t('chat')}</h1>
                        <img src={close} alt="" onClick={handleCloseClick} style={{ cursor: 'pointer' }} />
                    </span>
                    <input type="text" placeholder={t('search')} id='chat-search' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <div className="chat-list">
                        {chatList?.map(v => {
                            return (<div onClick={async (e) => {
                                e.stopPropagation(); setChat(v.receiver?._id == user?._id ? v.sender : v.receiver);
                                console.log(v);
                                await fetch(`http://localhost:3000/message/${v.receiver?._id == user?._id ? v.sender?._id : v.receiver?._id}`, {
                                    method: 'PATCH',
                                    credentials: 'include'
                                });
                                setChatList(prev =>
                                    prev.map(chat => {
                                        // Determine the other user in this chat
                                        const otherUserId = chat.receiver._id === user._id ? chat.sender._id : chat.receiver._id;

                                        // Determine the ID we just marked as read
                                        const clickedUserId = v.receiver?._id === user?._id ? v.sender?._id : v.receiver?._id;

                                        // If it matches, mark as read
                                        if (otherUserId === clickedUserId) {
                                            return { ...chat, isRead: true };
                                        }
                                        return chat;
                                    })
                                );

                            }}
                                style={{ cursor: 'pointer' }} key={v._id}>
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
                                    status={
                                        v.receiver?._id == user?._id
                                            ? v.isRead
                                                ? ''
                                                : t('new')
                                            : v.isRead
                                                ? t('seen')
                                                : t('delivered')}
                                    date={v.createdAt} />
                            </div>);
                        }
                        )}
                    </div>
                </>}
            {chat && <ChatDetail chat={chat} setChat={setChat} user={user} handleViewImg={handleViewImg} socket={socket} setSocket={setSocket} />}
        </div>
    );
}