import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

const STORAGE_KEY = 'jhar_language';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (keyPath, fallback = '') => ''
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    const valid = lang === 'hi' ? 'hi' : 'en';
    localStorage.setItem(STORAGE_KEY, valid);
    setLanguageState(valid);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  };

  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let obj = TRANSLATIONS[language] || TRANSLATIONS.en;
    
    for (const k of keys) {
      if (!obj || obj[k] === undefined) {
        let enObj = TRANSLATIONS.en;
        for (const ek of keys) {
          if (!enObj || enObj[ek] === undefined) return fallback || keyPath;
          enObj = enObj[ek];
        }
        return enObj || fallback || keyPath;
      }
      obj = obj[k];
    }
    return obj || fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
