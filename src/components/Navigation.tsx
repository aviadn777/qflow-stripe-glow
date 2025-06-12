
import React, { useState, useEffect } from 'react';
import { Heart, User, Settings, BarChart3, HelpCircle, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './auth/AuthModal';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { user, profile, business, logout } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = {
    hebrew: ['דף הבית', 'גלה סלונים', 'תמחור', 'עזרה'],
    english: ['Home', 'Discover Salons', 'Pricing', 'Help']
  };

  const userMenuItems = {
    hebrew: [
      { icon: BarChart3, label: 'לוח הבקרה', href: '/dashboard' },
      { icon: User, label: 'הגדרות פרופיל', href: '/settings/profile' },
      { icon: Settings, label: 'הגדרות עסק', href: '/settings/business' },
      { icon: HelpCircle, label: 'עזרה', href: '/help' },
    ],
    english: [
      { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
      { icon: User, label: 'Profile Settings', href: '/settings/profile' },
      { icon: Settings, label: 'Business Settings', href: '/settings/business' },
      { icon: HelpCircle, label: 'Help', href: '/help' },
    ]
  };

  const currentItems = navigationItems[currentLanguage];
  const currentUserItems = userMenuItems[currentLanguage];

  const handleAuthAction = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  const getDisplayName = () => {
    if (business?.name) {
      return currentLanguage === 'hebrew' ? (business.name_he || business.name) : business.name;
    }
    return profile?.name || user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-2xl font-bold" style={{ color: 'var(--stripe-purple)' }}>
                  Q
                </span>
                <div className="relative">
                  <span className="text-2xl font-bold" style={{ color: 'var(--stripe-purple)' }}>
                    FLOW
                  </span>
                  <Heart 
                    className="absolute -top-1 -right-6 w-4 h-4 text-red-500 animate-pulse" 
                    fill="currentColor"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className={`text-xs ${currentLanguage === 'hebrew' ? 'hebrew-text' : ''}`}>
                  {currentLanguage === 'hebrew' 
                    ? 'מערכת ניהול תורים מתקדמת' 
                    : 'Advanced Queue Management'
                  }
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {currentItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-sm font-medium transition-colors duration-200 hover:text-purple-600 ${
                    currentLanguage === 'hebrew' ? 'hebrew-text' : ''
                  } ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Authentication Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(currentLanguage === 'hebrew' ? 'english' : 'hebrew')}
                className={`relative w-16 h-8 rounded-full transition-colors duration-200 ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/20 backdrop-blur-md'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-purple-600 rounded-full transition-transform duration-200 flex items-center justify-center ${
                  currentLanguage === 'hebrew' ? 'transform translate-x-1' : 'transform translate-x-9'
                }`}>
                  <span className="text-xs font-bold text-white">
                    {currentLanguage === 'hebrew' ? 'ע' : 'EN'}
                  </span>
                </div>
              </button>

              {user ? (
                /* Logged In State */
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isScrolled 
                        ? 'bg-white shadow-md hover:shadow-lg' 
                        : 'bg-white/10 backdrop-blur-md hover:bg-white/20'
                    } ${currentLanguage === 'hebrew' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div className={`text-sm ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
                      <div className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                        {getDisplayName()}
                      </div>
                      {business && (
                        <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>
                          {business.subscription_status === 'trial' 
                            ? (currentLanguage === 'hebrew' ? 'תקופת ניסיון' : 'Trial')
                            : (currentLanguage === 'hebrew' ? 'פעיל' : 'Active')
                          }
                        </div>
                      )}
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className={`absolute top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 ${
                      currentLanguage === 'hebrew' ? 'right-0' : 'left-0'
                    }`}>
                      {currentUserItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <a
                            key={index}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${
                              currentLanguage === 'hebrew' ? 'flex-row-reverse text-right' : ''
                            }`}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <IconComponent className="w-5 h-5 text-gray-400" />
                            <span className={`${currentLanguage === 'hebrew' ? 'mr-3' : 'ml-3'} font-medium`}>
                              {item.label}
                            </span>
                          </a>
                        );
                      })}
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors ${
                          currentLanguage === 'hebrew' ? 'flex-row-reverse text-right' : ''
                        }`}
                      >
                        <LogOut className="w-5 h-5" />
                        <span className={`${currentLanguage === 'hebrew' ? 'mr-3' : 'ml-3'} font-medium`}>
                          {currentLanguage === 'hebrew' ? 'התנתק' : 'Logout'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Logged Out State */
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthAction('login')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isScrolled 
                        ? 'text-gray-700 bg-white/80 hover:bg-white shadow-md hover:shadow-lg' 
                        : 'text-white bg-white/10 backdrop-blur-md hover:bg-white/20'
                    }`}
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {currentLanguage === 'hebrew' ? 'כניסה לעסק' : 'Business Login'}
                  </button>
                  
                  <button
                    onClick={() => handleAuthAction('register')}
                    className="auth-button-primary text-sm font-medium"
                    style={{
                      fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                    }}
                  >
                    {currentLanguage === 'hebrew' ? 'התחל תקופת ניסיון' : 'Start Free Trial'}
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t">
              <div className="px-6 py-4 space-y-4">
                {currentItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`block text-lg font-medium text-gray-900 hover:text-purple-600 transition-colors ${
                      currentLanguage === 'hebrew' ? 'hebrew-text text-right' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t space-y-3">
                    <button
                      onClick={() => {
                        handleAuthAction('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-center text-gray-700 bg-gray-100 rounded-lg font-medium"
                    >
                      {currentLanguage === 'hebrew' ? 'כניסה לעסק' : 'Business Login'}
                    </button>
                    <button
                      onClick={() => {
                        handleAuthAction('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full auth-button-primary"
                    >
                      {currentLanguage === 'hebrew' ? 'התחל תקופת ניסיון' : 'Start Free Trial'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
