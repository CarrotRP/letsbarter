export default function ChatTile() {
    return (
        <div className="chat-tile">
            <img src="/favicon.png" alt="user" style={{width: '45px', borderRadius: '50%', border: '1px solid black', alignSelf: 'center'}} loading="lazy"/>
            <div className="chat-info">
                <span>
                    <p style={{fontWeight: '500'}}>Bob Krackin</p>
                    <p style={{fontWeight: '300', color: 'rgba(0, 0, 0, 0.65)'}}>10:12 AM</p>
                </span>
                <p style={{fontWeight: '300'}}>hello</p>
            </div>
        </div>
    );
}