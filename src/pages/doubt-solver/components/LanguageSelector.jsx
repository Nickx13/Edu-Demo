import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ onLanguageChange, currentLanguage = 'en' }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' }
  ];

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('edumitra-language');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setSelectedLanguage(savedLanguage);
      onLanguageChange?.(savedLanguage);
    }
  }, []);

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowDropdown(false);
    
    // Save to localStorage
    localStorage.setItem('edumitra-language', langCode);
    
    // Notify parent component
    onLanguageChange?.(langCode);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  const getTranslatedText = (key) => {
    const translations = {
      en: {
        selectLanguage: 'Select Language',
        translateSolution: 'Translate Solution',
        translating: 'Translating...',
        translated: 'Translated to'
      },
      hi: {
        selectLanguage: 'भाषा चुनें',
        translateSolution: 'समाधान का अनुवाद करें',
        translating: 'अनुवाद हो रहा है...',
        translated: 'में अनुवादित'
      },
      bn: {
        selectLanguage: 'ভাষা নির্বাচন করুন',
        translateSolution: 'সমাধান অনুবাদ করুন',
        translating: 'অনুবাদ হচ্ছে...',
        translated: 'এ অনুবাদিত'
      },
      te: {
        selectLanguage: 'భాషను ఎంచుకోండి',
        translateSolution: 'పరిష్కారాన్ని అనువదించండి',
        translating: 'అనువదిస్తోంది...',
        translated: 'లో అనువదించబడింది'
      },
      ta: {
        selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        translateSolution: 'தீர்வை மொழிபெயர்க்கவும்',
        translating: 'மொழிபெயர்க்கிறது...',
        translated: 'இல் மொழிபெயர்க்கப்பட்டது'
      }
    };

    return translations[selectedLanguage]?.[key] || translations.en[key];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-150"
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span className="text-sm font-medium text-foreground hidden sm:block">
          {getCurrentLanguage().nativeName}
        </span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`text-muted-foreground transition-transform duration-150 ${
            showDropdown ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-elevated z-50 min-w-[200px]">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">
                {getTranslatedText('selectLanguage')}
              </div>
              
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm transition-colors duration-150 ${
                    selectedLanguage === language.code
                      ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-base">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-muted-foreground">{language.name}</div>
                  </div>
                  {selectedLanguage === language.code && (
                    <Icon name="Check" size={14} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Translation Status */}
            <div className="border-t border-border p-2">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Globe" size={12} />
                <span>Mathematical accuracy preserved</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;