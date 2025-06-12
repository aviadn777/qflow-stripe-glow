
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hebrew' | 'english';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hebrew');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('qflow-language') as Language;
    if (savedLanguage && (savedLanguage === 'hebrew' || savedLanguage === 'english')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('qflow-language', language);
  };

  const value = {
    currentLanguage,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
