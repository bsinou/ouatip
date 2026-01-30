import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./locales/en.json"
import fr from "./locales/fr.json"
import de from "./locales/de.json"
import es from "./locales/es.json"

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
}

// Detect browser language, fallback to French
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0]
  return ['en', 'fr', 'de', 'es'].includes(browserLang) ? browserLang : 'fr'
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || getBrowserLanguage(),
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
