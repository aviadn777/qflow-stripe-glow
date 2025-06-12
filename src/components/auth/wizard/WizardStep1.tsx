
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";
import FormPreview from './FormPreview';
import { UserType, Language, wizardText } from './types';

interface WizardStep1Props {
  language: Language;
  userType: UserType | null;
  onUserTypeSelect: (type: UserType) => void;
}

const WizardStep1: React.FC<WizardStep1Props> = ({ 
  language, 
  userType, 
  onUserTypeSelect 
}) => {
  const text = wizardText.step1;
  const isRTL = language === 'he';

  const handleContinue = () => {
    if (userType) {
      onUserTypeSelect(userType);
    }
  };

  return (
    <div className={`wizard-step p-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center space-y-3 mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
          {text.title[language]}
        </h2>
        <p className="text-gray-600 text-sm">
          {text.subtitle[language]}
        </p>
      </div>

      {/* User Type Selection */}
      <div className="space-y-4 mb-6">
        <RadioGroup 
          value={userType || ''} 
          onValueChange={(value) => onUserTypeSelect(value as UserType)}
          className="space-y-4"
        >
          {/* Business Owner Option */}
          <div 
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              userType === 'business_owner' 
                ? 'border-[#635bff] bg-[#635bff]/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onUserTypeSelect('business_owner')}
          >
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <RadioGroupItem value="business_owner" id="business_owner" />
              <Building2 className="h-5 w-5 text-[#635bff]" />
              <div className="flex-1">
                <label htmlFor="business_owner" className="text-sm font-medium text-gray-900 cursor-pointer">
                  {text.business.title[language]}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {text.business.description[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Option */}
          <div 
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              userType === 'customer' 
                ? 'border-[#635bff] bg-[#635bff]/5' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onUserTypeSelect('customer')}
          >
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <RadioGroupItem value="customer" id="customer" />
              <User className="h-5 w-5 text-[#635bff]" />
              <div className="flex-1">
                <label htmlFor="customer" className="text-sm font-medium text-gray-900 cursor-pointer">
                  {text.customer.title[language]}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  {text.customer.description[language]}
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Live Preview */}
      <div className="mb-6">
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {language === 'he' ? 'תצוגה מקדימה' : 'Live Preview'}
          </h3>
          <FormPreview userType={userType} language={language} />
        </div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!userType}
        className="w-full h-12 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5248e6] hover:to-[#0052cc] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {text.continue[language]}
      </Button>
    </div>
  );
};

export default WizardStep1;
