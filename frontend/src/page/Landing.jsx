import shapePath from "../assets/path.png";
import barterIll from '../assets/barter.png';
import nomoney from "../assets/nomoney.png";
import help from '../assets/help.png';
import recycle from '../assets/recycle.png';
import inventory from '../assets/inventory150.png';
import browneye from '../assets/brownEye.png';
import trade from '../assets/trade150.png';
import arrow1 from '..//assets/arrow1.png';
import arrow2 from '../assets/arrow2.png';
import arrow3 from '../assets/arrow3.png';
import path2 from '../assets/path2.png';
import "./Landing.css";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

export default function Landing() {
    const {t} = useTranslation();

    const benInfos = [
        { src: nomoney, h3: t('waste less'), p: t('save up') },
        { src: help, h3: t('help those'), p: t('help those who') },
        { src: recycle, h3: t('recycle'), p: t('reuse') }
    ]

    return (
        <>
            <section className="definition">
                <h1>{t("what's barter")}</h1>
                <p><Trans i18nKey='barter' components={{bold: <span style={{fontWeight: 'bold'}}></span>}}/></p>
                <Link to='/home'>{t("see what")} --&gt;</Link>
                <img className="barterIll" src={barterIll} alt="" />
                <img className="shapeBg" src={shapePath} alt="" />
            </section>
            <section className="benefit">
                <h1>{t('benefits')}</h1>
                <div className="bens">
                    {benInfos.map((v, i) => {
                        return (
                            <div className="ben-info" key={i}>
                                <img src={v.src} alt="" style={{ marginBottom: '25px', filter: 'invert(23%) sepia(99%) saturate(1744%) hue-rotate(16deg) brightness(92%) contrast(94%)' }} />
                                <h3 style={{ fontSize: '32px', fontWeight: 600 }}>{v.h3}</h3>
                                <p style={{ fontSize: '16px', fontWeight: 400 }}>{v.p}</p>
                            </div>
                        );
                    })}
                </div>
            </section>
            <h1 className="how-head">{t('how')}</h1>
            <section className="how">
                <img src={path2} alt="" className="bgPath2"/>
                <div className="step1">
                    <img src={inventory} alt="" />
                    <span>
                        <h2>{t('1. upload')}</h2>
                        <p>{t('upload item you')}</p>
                    </span>
                    <img src={arrow1} alt="" className="arrow1"/>
                </div>
                <div className="step2">
                    <img src={arrow2} alt="" className="arrow2"/>
                    <span>
                        <h2>{t('2. browse')}</h2>
                        <p>{t('browser')}</p>
                    </span>
                    <img src={browneye} alt="" />
                </div>
                <div className="step3">
                    <img src={trade} alt="" />
                    <span>
                        <h2>{t('3. trade')}</h2>
                        <p>{t('offer your trade')}</p>
                    </span>
                    <img src={arrow3} alt="" className="arrow3"/>
                </div>
                <div className="step4">
                    <img src={nomoney} alt="" style={{ marginBottom: '25px', filter: 'invert(23%) sepia(99%) saturate(1744%) hue-rotate(16deg) brightness(92%) contrast(94%)' }}/>
                    <h2>{t('waste less')}</h2>
                </div>
            </section>
        </>
    );
}