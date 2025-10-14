import { useTranslation } from "react-i18next";

export default function Toaster({text}) {
    const {t} = useTranslation();

    return (
        <div>
            <p style={{ color: 'var(--text-secondary)' }}>{text ? t(text) : t('please login')}</p>
        </div>
    );
}