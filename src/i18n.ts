import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import ar from "./translations/ar.json";
import fr from "./translations/fr.json";
import es from "./translations/es.json";
import pt from "./translations/pt.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt }
    },
    lng: localStorage.getItem('i18nextLng') || "en", // use saved language or default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    }
  });

// Set document direction based on language and ensure persistence
i18n.on('languageChanged', (lng) => {
  console.log('i18n language changed to:', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  
  // Ensure language is saved to localStorage
  localStorage.setItem('i18nextLng', lng);
  console.log('Language saved to localStorage:', lng);
  
  // Dispatch a custom event to notify all components of language change
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
  console.log('Custom event dispatched for language:', lng);
});

// Force language from localStorage on initialization
i18n.on('initialized', () => {
  const savedLanguage = localStorage.getItem('i18nextLng');
  console.log('i18n initialized, checking localStorage:', savedLanguage);
  if (savedLanguage && savedLanguage !== i18n.language) {
    console.log('Forcing language change from', i18n.language, 'to', savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }
});

export default i18n;