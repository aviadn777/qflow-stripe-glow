
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { UserType, Language, WizardFormData, wizardText } from './types';

interface WizardStep2Props {
  language: Language;
  userType: UserType;
  onFormComplete: (data: WizardFormData) => void;
  onBack: () => void;
}

const WizardStep2: React.FC<WizardStep2Props> = ({ 
  language, 
  userType, 
  onFormComplete,
  onBack 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    businessName: '',
    phone: '',
    city: '',
    businessType: 'hair_salon'
  });
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();
  
  const text = wizardText.step2;
  const isRTL = language === 'he';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle(userType);
      if (error) {
        toast({
          title: language === 'he' ? "שגיאה בהרשמה עם Google" : "Google signup error",
          description: language === 'he' ? "אירעה שגיאה. נסה שוב" : "An error occurred. Please try again",
          variant: "destructive",
        });
      } else {
        // Google auth successful - this will be handled by the auth state change
        onFormComplete({
          ...formData,
          isGoogleAuth: true
        });
      }
    } catch (error) {
      toast({
        title: language === 'he' ? "שגיאה" : "Error",
        description: language === 'he' ? "אירעה שגיאה בהרשמה עם Google" : "Google signup failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      toast({
        title: language === 'he' ? "שגיאה" : "Error",
        description: language === 'he' ? "הסיסמה חייבת להכיל לפחות 6 תווים" : "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: language === 'he' ? "כתובת האימייל כבר רשומה" : "Email already registered",
            description: language === 'he' ? "נסה להתחבר או השתמש בכתובת אימייל אחרת" : "Try signing in or use a different email",
            variant: "destructive",
          });
        } else {
          toast({
            title: language === 'he' ? "שגיאה בהרשמה" : "Signup error",
            description: language === 'he' ? "אירעה שגיאה. נסה שוב" : "An error occurred. Please try again",
            variant: "destructive",
          });
        }
      } else {
        onFormComplete({
          ...formData,
          isGoogleAuth: false
        });
      }
    } catch (error) {
      toast({
        title: language === 'he' ? "שגיאה" : "Error",
        description: language === 'he' ? "אירעה שגיאה בהרשמה" : "Signup failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`wizard-step p-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className={`p-2 hover:bg-gray-100 ${isRTL ? 'ml-3' : 'mr-3'}`}
        >
          <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
        </Button>
        <div className="flex-1 text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
            {userType === 'business_owner' 
              ? text.businessTitle[language]
              : text.customerTitle[language]
            }
          </h2>
        </div>
      </div>

      {/* Google OAuth Button */}
      <div className="space-y-4 mb-6">
        <Button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          variant="outline"
          className="w-full h-12 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] text-sm"
        >
          <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {userType === 'business_owner' 
            ? text.googleBusiness[language]
            : text.googleCustomer[language]
          }
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500 font-medium">
              {text.or[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Manual Form */}
      <form onSubmit={handleManualSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {text.fields.email[language]}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
            dir="ltr"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            {text.fields.password[language]}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={language === 'he' ? "לפחות 6 תווים" : "At least 6 characters"}
            required
            className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
          />
        </div>

        {userType === 'business_owner' ? (
          <div className="space-y-2">
            <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
              {text.fields.businessName[language]}
            </label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              placeholder={language === 'he' ? "סלון יופי רבקה" : "Rebecca Beauty Salon"}
              required
              className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              {text.fields.fullName[language]}
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={language === 'he' ? "יוסי כהן" : "Yossi Cohen"}
              required
              className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            {text.fields.phone[language]}
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="050-123-4567"
            required
            className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
            dir="ltr"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5248e6] hover:to-[#0052cc] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-sm"
        >
          {loading 
            ? (language === 'he' ? "נרשם..." : "Signing up...")
            : userType === 'business_owner' 
              ? text.businessCTA[language]
              : text.customerCTA[language]
          }
        </Button>
      </form>
    </div>
  );
};

export default WizardStep2;
