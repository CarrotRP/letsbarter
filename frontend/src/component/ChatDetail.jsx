import attachment from '../assets/attachment.png';
import send from '../assets/send.png';
import back from '../assets/back.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ChatDetail(props) {
    const { chat, setChat, user } = props;
    const { t } = useTranslation();
    const [img, setImg] = useState();
    const [text, setText] = useState();

    const handleBackClick = (e) => {
        e.stopPropagation();
        setChat(null);
    }

    const handleSetImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg({ file, preview: URL.createObjectURL(file), isMain: true });
        }
    }

    const handleSendMessage = () => {
        if (text || img) {
            const formData = new FormData();

            formData.append('senderId', user._id);

            if (text) formData.append('text', text);
            if (img) formData.append('image', img);

            fetch(`http://localhost:3000/message/send/${chat?._id}`, {
                credentials: 'include',
                body: formData
            })
        }

    }

    return (
        <>
            <div className='chat-title' style={{ display: 'flex', alignItems: 'center', padding: '0 0 10px', borderBottom: '1px solid rgba(163, 68, 7, 0.45)' }}>
                <img src={back} alt="" style={{ width: '10px' }} onClick={handleBackClick} />
                <img src={chat?.profile_img.startsWith('http') ? chat?.profile_img : `http://localhost:3000/${chat?.profile_img}`} alt="" style={{ width: '50px', margin: '0 15px', border: '1px solid var(--darken-background)', borderRadius: '50%' }} />
                <span className="chat-user" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <p style={{ fontWeight: '500' }} onClick={() => console.log(chat)}>{chat?.username}</p>
                    <p style={{ fontWeight: '300' }}>{chat?.occupation}</p>
                </span>
            </div>
            <div className="chat-msg">

            </div>
            <div className="chat-input">
                {img &&
                    <div className='chat-img-preview'>
                        <img src={img.preview} alt=""/>
                    </div>}
                <input type="file" id='msg-image' accept='image/*' onChange={handleSetImg} />
                <label htmlFor="msg-image">
                    <img src={attachment} alt="" />
                </label>
                <input type="text" placeholder={t('message')} value={text} onChange={(e) => setText(e.target.value)} />
                <img src={send} className='chat-send' alt="" />
            </div>
        </>
    );
}