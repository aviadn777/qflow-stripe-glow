
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserType, Language, wizardText } from './types';

interface FormPreviewProps {
  userType: UserType | null;
  language: Language;
}

const FormPreview: React.FC<FormPreviewProps> = ({ userType, language }) => {
  const text = wizardText.step2;
  const isRTL = language === 'he';

  if (!userType) {
    return (
      <div className={`text-center py-8 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-gray-400 text-sm">
          {wizardText.step1.preview.placeholder[language]}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Google OAuth Button Preview */}
      <Button
        disabled
        variant="outline"
        className="w-full h-10 bg-white border-gray-200 text-gray-600 font-medium rounded-lg text-sm opacity-75"
      >
        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
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

      {/* Or Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-50 px-2 text-gray-500">
            {text.or[language]}
          </span>
        </div>
      </div>

      {/* Form Fields Preview */}
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            {text.fields.email[language]}
          </label>
          <Input
            disabled
            placeholder="your@email.com"
            className="h-9 bg-white border-gray-200 text-sm opacity-75"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            {text.fields.password[language]}
          </label>
          <Input
            disabled
            type="password"
            placeholder="••••••••"
            className="h-9 bg-white border-gray-200 text-sm opacity-75"
          />
        </div>

        {userType === 'business_owner' ? (
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              {text.fields.businessName[language]}
            </label>
            <Input
              disabled
              placeholder={language === 'he' ? 'סלון יופי רבקה' : 'Rebecca Beauty Salon'}
              className="h-9 bg-white border-gray-200 text-sm opacity-75"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              {text.fields.fullName[language]}
            </label>
            <Input
              disabled
              placeholder={language === 'he' ? 'יוסי כהן' : 'Yossi Cohen'}
              className="h-9 bg-white border-gray-200 text-sm opacity-75"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600">
            {text.fields.phone[language]}
          </label>
          <Input
            disabled
            placeholder="050-123-4567"
            className="h-9 bg-white border-gray-200 text-sm opacity-75"
            dir="ltr"
          />
        </div>
      </div>

      {/* Submit Button Preview */}
      <Button
        disabled
        className="w-full h-10 bg-gradient-to-r from-[#635bff] to-[#0066ff] text-white font-medium rounded-lg text-sm opacity-75"
      >
        {userType === 'business_owner' 
          ? text.businessCTA[language]
          : text.customerCTA[language]
        }
      </Button>
    </div>
  );
};

export default FormPreview;
