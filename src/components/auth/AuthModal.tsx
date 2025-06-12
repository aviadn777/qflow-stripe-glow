
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Building, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
  initialContext?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onModeChange,
  initialContext 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { currentLanguage } = useLanguage();

  const content = {
    hebrew: {
      login: {
        title: 'ברוכים השבים ל-QFLOW',
        subtitle: 'התחברו כדי להמשיך לנהל את הסלון שלכם',
        googleButton: 'התחבר עם Google',
        emailLabel: 'כתובת אימייל',
        passwordLabel: 'סיסמה',
        submitButton: 'התחבר',
        switchText: 'עדיין אין לכם חשבון?',
        switchAction: 'הירשמו עכשיו',
        forgotPassword: 'שכחתם סיסמה?'
      },
      register: {
        title: 'הצטרפו למהפכת הסלונים',
        subtitle: 'התחילו תקופת ניסיון של 14 יום בחינם',
        googleButton: 'הירשמו עם Google',
        nameLabel: 'שם מלא',
        businessLabel: 'שם הסלון',
        phoneLabel: 'טלפון',
        emailLabel: 'כתובת אימייל',
        passwordLabel: 'סיסמה',
        confirmPasswordLabel: 'אישור סיסמה',
        submitButton: 'התחילו תקופת ניסיון בחינם',
        switchText: 'כבר יש לכם חשבון?',
        switchAction: 'התחברו כאן',
        terms: 'בהמשך אתם מסכימים לתנאי השימוש ולמדיניות הפרטיות'
      },
      errors: {
        emailRequired: 'נדרש להזין כתובת אימייל',
        emailInvalid: 'כתובת אימייל לא תקינה',
        passwordRequired: 'נדרש להזין סיסמה',
        passwordTooShort: 'הסיסמה חייבת להכיל לפחות 6 תווים',
        passwordMismatch: 'הסיסמאות אינן תואמות',
        nameRequired: 'נדרש להזין שם מלא',
        businessRequired: 'נדרש להזין שם סלון',
        phoneInvalid: 'מספר טלפון לא תקין (050-123-4567)',
        invalidCredentials: 'אימייל או סיסמה שגויים',
        userExists: 'משתמש עם אימייל זה כבר קיים',
        networkError: 'שגיאת רשת - אנא נסו שוב'
      },
      placeholders: {
        email: 'salon@example.com',
        password: 'לפחות 6 תווים',
        name: 'יוסי כהן',
        business: 'סלון יוסי',
        phone: '050-123-4567'
      },
      contextMessages: {
        feature: 'התחילו עכשיו כדי לנסות את התכונה המדהימה הזו!'
      }
    },
    english: {
      login: {
        title: 'Welcome Back to QFLOW',
        subtitle: 'Sign in to continue managing your salon',
        googleButton: 'Sign in with Google',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        submitButton: 'Sign In',
        switchText: 'Don\'t have an account?',
        switchAction: 'Sign up now',
        forgotPassword: 'Forgot password?'
      },
      register: {
        title: 'Join the Salon Revolution',
        subtitle: 'Start your 14-day free trial today',
        googleButton: 'Sign up with Google',
        nameLabel: 'Full Name',
        businessLabel: 'Salon Name',
        phoneLabel: 'Phone',
        emailLabel: 'Email Address',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        submitButton: 'Start Free Trial',
        switchText: 'Already have an account?',
        switchAction: 'Sign in here',
        terms: 'By continuing, you agree to our Terms of Service and Privacy Policy'
      },
      errors: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordTooShort: 'Password must be at least 6 characters',
        passwordMismatch: 'Passwords do not match',
        nameRequired: 'Full name is required',
        businessRequired: 'Salon name is required',
        phoneInvalid: 'Invalid phone number (050-123-4567)',
        invalidCredentials: 'Invalid email or password',
        userExists: 'User with this email already exists',
        networkError: 'Network error - please try again'
      },
      placeholders: {
        email: 'salon@example.com',
        password: 'At least 6 characters',
        name: 'John Doe',
        business: 'John\'s Salon',
        phone: '050-123-4567'
      },
      contextMessages: {
        feature: 'Get started now to try this amazing feature!'
      }
    }
  };

  const currentContent = content[currentLanguage];
  const modeContent = currentContent[mode];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setBusinessName('');
      setPhone('');
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    setError('');

    if (!email) {
      setError(currentContent.errors.emailRequired);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(currentContent.errors.emailInvalid);
      return false;
    }

    if (!password) {
      setError(currentContent.errors.passwordRequired);
      return false;
    }

    if (password.length < 6) {
      setError(currentContent.errors.passwordTooShort);
      return false;
    }

    if (mode === 'register') {
      if (!name) {
        setError(currentContent.errors.nameRequired);
        return false;
      }

      if (!businessName) {
        setError(currentContent.errors.businessRequired);
        return false;
      }

      if (phone && !/^05[0-9]-\d{3}-\d{4}$/.test(phone)) {
        setError(currentContent.errors.phoneInvalid);
        return false;
      }

      if (password !== confirmPassword) {
        setError(currentContent.errors.passwordMismatch);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password, {
          name,
          businessName,
          phone: phone || undefined,
          preferredLanguage: currentLanguage
        });
      }
      onClose();
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.message?.includes('Invalid login credentials')) {
        setError(currentContent.errors.invalidCredentials);
      } else if (err.message?.includes('User already registered')) {
        setError(currentContent.errors.userExists);
      } else {
        setError(currentContent.errors.networkError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(currentContent.errors.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20"
        dir={currentLanguage === 'hebrew' ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className={`text-center mb-8 ${currentLanguage === 'hebrew' ? 'text-right' : 'text-left'}`}>
            <h2 
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {modeContent.title}
            </h2>
            <p 
              className="text-gray-600"
              style={{
                fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
              }}
            >
              {modeContent.subtitle}
            </p>
            
            {/* Context Message */}
            {initialContext?.startsWith('feature:') && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-purple-700 text-sm font-medium">
                  {currentContent.contextMessages.feature}
                </p>
              </div>
            )}
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 rounded-lg py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{
              fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
            }}>
              {modeContent.googleButton}
            </span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {currentLanguage === 'hebrew' ? 'או' : 'or'}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modeContent.nameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={currentContent.placeholders.name}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    />
                  </div>
                </div>

                {/* Business Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modeContent.businessLabel}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={currentContent.placeholders.business}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      style={{
                        fontFamily: currentLanguage === 'hebrew' ? '"Noto Sans Hebrew", system-ui' : '"Inter", system-ui'
                      }}
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modeContent.phoneLabel}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={currentContent.placeholders.phone}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {modeContent.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={currentContent.placeholders.email}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {modeContent.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={currentContent.placeholders.password}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Registration */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {modeContent.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={currentContent.placeholders.password}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full auth-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {currentLanguage === 'hebrew' ? 'טוען...' : 'Loading...'}
                </div>
              ) : (
                modeContent.submitButton
              )}
            </button>

            {/* Terms for Registration */}
            {mode === 'register' && (
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                {modeContent.terms}
              </p>
            )}

            {/* Mode Switch */}
            <div className="text-center pt-4">
              <span className="text-gray-600 text-sm">
                {modeContent.switchText}{' '}
              </span>
              <button
                type="button"
                onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm underline"
              >
                {modeContent.switchAction}
              </button>
            </div>

            {/* Forgot Password for Login */}
            {mode === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-700 text-sm underline"
                >
                  {modeContent.forgotPassword}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
