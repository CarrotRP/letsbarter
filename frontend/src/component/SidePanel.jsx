import { useTranslation } from "react-i18next";

export default function SidePanel() {
    const {t} = useTranslation();

    return (
        <section className="left-panel">
            <h1 style={{ fontSize: '72px' }}>
                LetsBarter
            </h1>
            <p style={{ fontWeight: '400', fontSize: '20px', width: '400px'}}>{t('trade items without')}</p>
        </section>
    );
}