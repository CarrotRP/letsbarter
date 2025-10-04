import attachment from '../assets/attachment.png';
import send from '../assets/send.png';
import back from '../assets/back.png';
import { useTranslation } from 'react-i18next';

export default function ChatDetail(props) {
    const {chat, setChat} = props;
    const {t} = useTranslation();

    const handleBackClick = (e) => {
        e.stopPropagation();
        setChat("");
    }

    return (
        <>
            <div className='chat-title' style={{ display: 'flex', alignItems: 'center', padding: '0 0 10px', borderBottom: '1px solid rgba(163, 68, 7, 0.45)' }}>
                <img src={back} alt="" style={{ width: '15px' }} onClick={handleBackClick}/>
                <img src="/favicon.png" alt="" style={{ width: '70px', margin: '0 10px' }} />
                <span className="chat-user" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <p style={{ fontWeight: '500' }}>Bob Krackin</p>
                    <p style={{ fontWeight: '300' }}>hello</p>
                </span>
            </div>
            <div className="chat-msg">

            </div>
            <div className="chat-input">
                <img src={attachment} alt="" />
                <input type="text" placeholder={t('message')} />
                <img src={send} alt="" />
            </div>
        </>
    );
}