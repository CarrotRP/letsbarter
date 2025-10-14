import { useTranslation } from "react-i18next";

export default function ChatTile(props) {
    const { username, profile, text, date, status } = props
    const { t } = useTranslation();

    return (
        <div className="chat-tile">
            <img src={profile?.startsWith('http') ? profile : `http://localhost:3000/${profile}`} alt="user" style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid black', alignSelf: 'center' }} loading="lazy" />
            <div className="chat-info">
                <span>
                    <p style={{ fontWeight: '500' }}>{username}</p>
                    <p style={{ fontWeight: '300', color: 'rgba(0, 0, 0, 0.65)' }}>  {(() => {
                        const msgDate = new Date(date);
                        const now = new Date();

                        const isToday =
                            msgDate.getDate() === now.getDate() &&
                            msgDate.getMonth() === now.getMonth() &&
                            msgDate.getFullYear() === now.getFullYear();

                        const yesterday = new Date();
                        yesterday.setDate(now.getDate() - 1);
                        const isYesterday =
                            msgDate.getDate() === yesterday.getDate() &&
                            msgDate.getMonth() === yesterday.getMonth() &&
                            msgDate.getFullYear() === yesterday.getFullYear();

                        if (isToday) {
                            return msgDate
                                .toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
                                .replace(/am|pm/i, match => match.toUpperCase());
                        } else if (isYesterday) {
                            return 'Yesterday';
                        } else {
                            return msgDate.toLocaleDateString('en-GB', { weekday: 'long' }); // Monday, Tuesday...
                        }
                    })()}</p>
                </span>
                <span>
                    <p style={{ fontWeight: '300' }}>
                        {
                            text?.startsWith('You: [system]')
                                ? `${t(text.split(' ')[2]?.trim())} ${t(text.split(']')[1]?.trim().split(' ').slice(-2).join(' '))}`
                                : text?.startsWith('[system]')
                                    ? `${text.split(']')[1]?.trim().split(' ')[0]} ${t(text.split(']')[1]?.trim().split(' ').slice(-2).join(' '))}`
                                    : t(text)
                        }
                    </p>
                    <p style={{ fontWeight: status == 'new' ? '700' : '200', color: 'var(--secondary)', fontSize: '14px' }}>{status}</p>
                </span>
            </div>
        </div>
    );
}