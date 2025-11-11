'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LocalizationContext = createContext();

// Translation dictionaries
const translations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    welcome: 'Welcome to our site',
    login: 'Login',
    signup: 'Sign Up',
    search: 'Search...',
  },
  es: {
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    contact: 'Contacto',
    welcome: 'Bienvenido a nuestro sitio',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    search: 'Buscar...',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    contact: 'Contact',
    welcome: 'Bienvenue sur notre site',
    login: 'Connexion',
    signup: "S'inscrire",
    search: 'Rechercher...',
  },
};

export function LocalizationProvider({ children }) {
  const [language, setLanguage] = useState('en');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('preferred-language', newLanguage);
    }
  };

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}