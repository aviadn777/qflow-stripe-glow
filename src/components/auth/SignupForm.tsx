
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeClosed, User, Building2 } from "lucide-react";

type UserType = 'business_owner' | 'customer';

const SignupForm = () => {
  const [userType, setUserType] = useState<UserType>('business_owner');
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    businessType: 'hair_salon'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signInWithGoogle, closeModal } = useAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "שגיאה",
        description: "הסיסמאות אינן זהות",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "שגיאה",
        description: "הסיסמה חייבת להכיל לפחות 6 תווים",
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
            title: "כתובת האימייל כבר רשומה",
            description: "נסה להתחבר או השתמש בכתובת אימייל אחרת",
            variant: "destructive",
          });
        } else {
          toast({
            title: "שגיאה בהרשמה",
            description: "אירעה שגיאה. נסה שוב",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "הרשמה בוצעה בהצלחה!",
          description: userType === 'business_owner' 
            ? "ברוך הבא! תתחיל את תקופת הניסיון שלך"
            : "ברוך הבא! תוכל לחפש ולהזמין תורים",
        });
        closeModal();
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהרשמה",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle(userType);
      if (error) {
        toast({
          title: "שגיאה בהרשמה עם Google",
          description: "אירעה שגיאה. נסה שוב",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בהרשמה עם Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {/* User Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          איך תרצה להשתמש ב-QFLOW?
        </h3>
        
        <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)} className="flex gap-4">
          <div 
            className={`flex-1 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              userType === 'business_owner' 
                ? 'border-[#635bff] bg-[#635bff]/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setUserType('business_owner')}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="business_owner" id="business_owner" />
              <Building2 className="h-5 w-5 text-[#635bff]" />
              <div className="flex-1">
                <label htmlFor="business_owner" className="text-sm font-medium text-gray-900 cursor-pointer">
                  בעל עסק
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  אני מנהל סלון יופי/עסק ורוצה לנהל תורים
                </p>
                <p className="text-xs text-[#635bff] font-medium mt-1">
                  ₪89/חודש אחרי 14 יום ניסיון
                </p>
              </div>
            </div>
          </div>

          <div 
            className={`flex-1 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              userType === 'customer' 
                ? 'border-[#635bff] bg-[#635bff]/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setUserType('customer')}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="customer" id="customer" />
              <User className="h-5 w-5 text-[#635bff]" />
              <div className="flex-1">
                <label htmlFor="customer" className="text-sm font-medium text-gray-900 cursor-pointer">
                  לקוח
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  אני רוצה לחפש ולהזמין תורים בסלונים
                </p>
                <p className="text-xs text-green-600 font-medium mt-1">
                  חינם לחלוטין
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Google OAuth Buttons */}
      <div className="space-y-4">
        <Button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          variant="outline"
          className="w-full h-12 bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] text-base"
        >
          <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {userType === 'business_owner' 
            ? 'הרשמה עם Google - בעל עסק' 
            : 'הרשמה עם Google - לקוח'
          }
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500 font-medium">או הרשמה עם אימייל</span>
          </div>
        </div>
      </div>

      {/* Regular Form Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            שם מלא
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="יוסי כהן"
            required
            className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
          />
        </div>

        {userType === 'business_owner' && (
          <>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                שם העסק
              </label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="סלון יופי רבקה"
                required
                className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                סוג העסק
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="h-12 w-full bg-white border border-gray-200 rounded-md px-3 text-gray-900 focus:border-[#635bff] focus:ring-[#635bff] transition-colors"
              >
                <option value="hair_salon">סלון שיער</option>
                <option value="beauty_salon">סלון יופי</option>
                <option value="nail_studio">סטודיו ציפורניים</option>
                <option value="barbershop">ברבר שופ</option>
              </select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            {userType === 'business_owner' ? 'טלפון העסק' : 'טלפון נייד'}
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

        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-gray-700">
            {userType === 'business_owner' ? 'עיר מיקום העסק' : 'עיר מועדפת לחיפוש'}
          </label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="תל אביב"
            required
            className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            כתובת אימייל
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
            סיסמה
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="לפחות 6 תווים"
              required
              className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900 pl-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            אימות סיסמה
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="הזן שוב את הסיסמה"
              required
              className="h-12 bg-white border-gray-200 focus:border-[#635bff] focus:ring-[#635bff] transition-colors text-gray-900 pl-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5248e6] hover:to-[#0052cc] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-base"
      >
        {loading 
          ? "נרשם..." 
          : userType === 'business_owner' 
            ? "התחל ניהול העסק - 14 יום בחינם" 
            : "התחל לחפש סלונים"
        }
      </Button>

      {userType === 'business_owner' && (
        <div className="bg-gradient-to-r from-[#635bff]/10 to-[#0066ff]/10 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600 font-medium">
            💎 תקופת ניסיון 14 יום בחינם
          </p>
          <p className="text-xs text-gray-500 mt-1">
            לאחר מכן רק ₪89 לחודש לניהול מלא של העסק
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        בהרשמה אתה מסכים ל
        <span className="text-[#635bff] hover:underline cursor-pointer"> תנאי השימוש </span>
        ול
        <span className="text-[#635bff] hover:underline cursor-pointer"> מדיניות הפרטיות </span>
        שלנו
      </p>
    </form>
  );
};

export default SignupForm;
