import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [xpPoints, setXpPoints] = useState(1250);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleParentAccess = () => {
    setShowProfileMenu(false);
    // Navigate to parent dashboard
    window.location.href = '/parent-dashboard';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="flex items-center justify-between h-14 px-4 md:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                <path d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z" />
                <path d="M5 15L6.09 18.26L10 19L6.09 19.74L5 23L3.91 19.74L0 19L3.91 18.26L5 15Z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">EduMitra AI</h1>
            </div>
          </div>
        </div>

        {/* Center Stats - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-lg">
            <Icon name="Flame" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{currentStreak} day streak</span>
          </div>
          <div className="flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-lg">
            <Icon name="Star" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">{xpPoints.toLocaleString()} XP</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Mobile Stats */}
          <div className="flex md:hidden items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Flame" size={14} className="text-accent" />
              <span className="text-xs font-medium text-foreground">{currentStreak}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning" />
              <span className="text-xs font-medium text-foreground">{Math.floor(xpPoints / 100)}k</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-1 px-2 py-1.5 rounded-md hover:bg-muted transition-colors duration-150"
            >
              <span className="text-sm">
                {languages.find(lang => lang.code === selectedLanguage)?.flag}
              </span>
              <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg ${
                      selectedLanguage === lang.code ? 'bg-muted text-primary' : 'text-popover-foreground'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors duration-150"
            >
              <Icon name="User" size={16} className="text-primary-foreground" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 min-w-[160px]">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">Student Profile</p>
                  <p className="text-xs text-muted-foreground">Level 12 Learner</p>
                </div>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                >
                  <Icon name="Settings" size={14} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleParentAccess}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                >
                  <Icon name="Shield" size={14} />
                  <span>Parent Access</span>
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150 rounded-b-lg"
                >
                  <Icon name="LogOut" size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showLanguageMenu || showProfileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLanguageMenu(false);
            setShowProfileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;