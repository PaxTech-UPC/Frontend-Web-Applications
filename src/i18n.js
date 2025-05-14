import es from './locales/es.json';
import en from './locales/en.json';
import {createI18n} from 'vue-i18n';


const i18n = createI18n({
<<<<<<< HEAD
    legacy: false,
    locale: 'en',
=======
    legacy:false, locale: 'en',
>>>>>>> feature/Favorites
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {es, en
    }
})

export default i18n;

