import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import en from '../resources/en.json';
import kh from '../resources/kh.json';

const resources = {
    kh: {
        translation: kh
    },
    en: {
        translation: en
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'kh',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;