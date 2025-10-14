import attachment from '../assets/attachment.png';
import send from '../assets/send.png';
import back from '../assets/back.png';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

export default function ChatDetail(props) {
    const { chat, setChat, user, handleViewImg, socket, setSocket, setChatList } = props;
    const { t } = useTranslation();
    const [img, setImg] = useState();
    const [text, setText] = useState();
    const [message, setMessage] = useState();
    const scrollRef = useRef(); //TODO: scroll to updated scrollHeight

    const handleBackClick = (e) => {
        e.stopPropagation();
        setChat(null);
    }

    const handleSetImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg({ file, preview: URL.createObjectURL(file) });
            e.target.value = null;
        }
    }

    const handleSendMessage = () => {
        if (text || img) {
            const formData = new FormData();

            formData.append('senderId', user._id);

            if (text) formData.append('text', text);
            if (img) formData.append('image', img.file);

            fetch(`http://localhost:3000/message/send/${chat?._id}`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            }).then(res => res.json())
                .then(data => {
                    setText('');
                    setImg(null);
                })
        }
    }


    //get messages
    useEffect(() => {
        fetch(`http://localhost:3000/message/${chat?._id}`, {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setMessage(data);
            })
    }, []);

    //for scrolling to bottom after sending msg or get messages
    useEffect(() => {
        if (message?.length > 0) {
            scrollRef?.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'auto'
            });
        }
    }, [message]);

    useEffect(() => {
        if (!socket || !chat) return;

        const handleReceiveMessage = (incomingMessage) => {
            if (
                incomingMessage.senderId === chat._id ||
                incomingMessage.receiverId === chat._id
            ) {
                setMessage(prev => [...prev, incomingMessage]);

                // mark messages from this chat as read immediately
                if (incomingMessage.senderId === chat._id) {
                    fetch(`http://localhost:3000/message/${chat._id}`, {
                        method: 'PATCH',
                        credentials: 'include'
                    }).then(() => {
                        setChatList(prev => prev.map(c => {
                            const otherUserId = c.receiver._id === user._id ? c.sender._id : c.receiver._id;
                            if (otherUserId === chat._id) {
                                return { ...c, isRead: true };
                            }
                            return c;
                        }))
                    });
                }
            }
        };

        const handleReadMessage = ({ messageIds, receiverId }) => {
            setMessage(prev =>
                prev?.map(msg => messageIds.includes(msg._id) ? { ...msg, isRead: true } : msg)
            );
        };

        socket.on('sendMessage', handleReceiveMessage);
        socket.on('readMessage', handleReadMessage);

        return () => {
            socket.off('sendMessage', handleReceiveMessage);
            socket.off('readMessage', handleReadMessage);
        };
    }, [socket, chat]);



    return (
        <>
            <div className='chat-title' style={{ display: 'flex', alignItems: 'center', padding: '0 0 10px', borderBottom: '1px solid rgba(163, 68, 7, 0.45)' }}>
                <img src={back} alt="" style={{ width: '10px', cursor: 'pointer' }} onClick={handleBackClick} />
                <img src={chat?.profile_img?.startsWith('http') ? chat?.profile_img : `http://localhost:3000/${chat?.profile_img}`} alt="" style={{ width: '50px', height: '50px', margin: '0 15px', border: '1px solid var(--darken-background)', borderRadius: '50%' }} />
                <span className="chat-user" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <p style={{ fontWeight: '500' }}>{chat?.username}</p>
                    <p style={{ fontWeight: '300' }}>{chat?.occupation}</p>
                </span>
            </div>
            <div className="chat-msg" ref={scrollRef}>
                {message?.map((m, idx) => {
                    const isLast = idx === message.length - 1; // last message in the array
                    const isSentByMe = m.senderId === user?._id;

                    return (
                        <div
                            className='chat-bubble'
                            style={{
                                alignSelf: m.text?.startsWith('[system]') ? 'center' : (m.receiverId === user?._id ? 'start' : 'end'),
                                position: 'relative', backgroundColor: m.text?.startsWith('[system]') ? 'transparent' : 'var(--darken-background)'
                            }}
                            key={m._id}
                        >
                            {m.image && <img src={`http://localhost:3000/${m.image}`} onClick={(e) => handleViewImg(e, m.image)} />}
                            {m.text && <p style={{ padding: '5px 10px' }}>{m.text?.startsWith('[system]')
                                ? (() => {
                                    const content = m.text.split(']')[1]?.trim();
                                    const name = content?.split(' ')[0];
                                    const message = content?.split(' ').slice(-2).join(' ');
                                    console.log('message', name)
                                    return (
                                        <>
                                            <strong>{name}</strong> {t(message)}
                                        </>
                                    );
                                })()
                                : m.text
                            }
                            </p>}

                            {/* show status only for last message sent by me */}
                            {isLast && isSentByMe && (
                                <p style={{ fontSize: '12px', position: 'absolute', bottom: '-20px', right: 0, whiteSpace: 'nowrap' }}>
                                    {m.isRead ? t('seen') : t('delivered')}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="chat-input">
                <input type="file" id='msg-image' accept='image/*' onChange={handleSetImg} />
                <label htmlFor="msg-image" className='msg-attachment-label'>
                    <img src={attachment} alt="" className='msg-attachment' />
                </label>
                <div className="text-input-wrapper" style={{ paddingTop: img ? '10px' : '5px' }}>
                    {img && (
                        <div className="chat-img-preview">
                            <img src={img.preview} alt="" />
                            <button onClick={(e) => { e.stopPropagation(); setImg(null); }} className="chat-img-remove">×</button>
                        </div>
                    )}
                    <textarea
                        name="text"
                        id="text"
                        placeholder={t('message')}
                        value={text}
                        onChange={(e) => {
                            const el = e.target;
                            setText(el.value);

                            el.style.height = "27px";
                            const newHeight = Math.min(el.scrollHeight, 150);
                            el.style.height = `${newHeight}px`;

                            el.style.overflowY = el.scrollHeight > 150 ? "auto" : "hidden";
                        }}
                        maxLength={500}
                        className="text-input"
                    />
                </div>
                <img src={send} className='chat-send' alt="" onClick={handleSendMessage} />
            </div>

        </>
    );
}