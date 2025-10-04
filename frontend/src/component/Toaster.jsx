import { useTranslation } from "react-i18next";

export default function Toaster() {
    const {t} = useTranslation();

    return (
        <div>
            <p style={{ color: 'var(--text-secondary)' }}>{t('please login')}</p>
        </div>
    );
}