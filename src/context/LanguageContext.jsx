// src/context/LanguageContext.jsx
import { createContext, useState, useEffect } from 'react';
import translations from '../translations';

// Create the context
export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Available languages
  const availableLanguages = {
    ba: 'Башҡортса',
    en: 'English',
    ru: 'Русский',
    tt: 'Татарча',
    tr: 'Türkçe'
  };
  
  // Default to English, but check localStorage first
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('capy_language');
    if (savedLanguage && Object.keys(availableLanguages).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);
  
  // Change language function
  const changeLanguage = (languageCode) => {
    if (Object.keys(availableLanguages).includes(languageCode)) {
      setCurrentLanguage(languageCode);
      // Save to localStorage
      localStorage.setItem('capy_language', languageCode);
    }
  };
  
  // Get translation function
  const t = (key) => {
    // Split the key by dots to access nested objects
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    // Navigate through the nested objects
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to English if translation doesn't exist
        translation = getEnglishFallback(key);
        break;
      }
    }
    
    return translation;
  };
  
  // Fallback to English translation if the key doesn't exist in current language
  const getEnglishFallback = (key) => {
    const keys = key.split('.');
    let fallback = translations['en'];
    
    for (const k of keys) {
      if (fallback && fallback[k]) {
        fallback = fallback[k];
      } else {
        // If even English doesn't have it, return the key
        return key;
      }
    }
    
    return fallback;
  };
  
  // Value object to be provided to context consumers
  const value = {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    t
  };
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}