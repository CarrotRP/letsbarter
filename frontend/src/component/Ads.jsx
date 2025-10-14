import { useState, useEffect } from "react";
//horizontal ads
import banner1 from '../assets/bannerAds.jpg';
import banner2 from '../assets/bannerAds2.jpg';
import banner3 from '../assets/bannerAds3.jpg';
import banner4 from '../assets/bannerAds4.jpg';

export default function Ads(props) {
    const { atTop } = props;
    const horizontalAds = [
        banner1,
        banner2,
        banner3,
        banner4
    ]

    const [isFade, setIsFade] = useState(false);
    const [currentHAds, setCurrentHAds] = useState(horizontalAds[Math.floor(Math.random() * horizontalAds.length)]);

    useEffect(() => {
        const horizontalAdsInterval = setInterval(() => {
            setIsFade(true)

            setTimeout(() => {
                setCurrentHAds(horizontalAds[Math.floor(Math.random() * horizontalAds.length)])
                setIsFade(false);
            }, 500);
        }, 12000);

        return () => {
            clearInterval(horizontalAdsInterval);
        }
    }, []);

    return (
        <div style={{ position: 'absolute', top: atTop ? '' : '-160px' ,display: 'flex', justifyContent: 'center', width: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <img src={currentHAds} alt="" style={{ height: '150px', width: '1000px', opacity: isFade ? 0 : 1, transition: 'opacity 500ms' }} />
        </div>
    );
}