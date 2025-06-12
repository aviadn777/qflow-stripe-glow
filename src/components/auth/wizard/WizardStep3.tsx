
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { UserType, Language, WizardFormData, wizardText } from './types';
import HeartsAnimation from './HeartsAnimation';

interface WizardStep3Props {
  language: Language;
  userType: UserType | null;
  formData: WizardFormData;
  showHeartsCelebration: boolean;
  onComplete: () => void;
}

const WizardStep3: React.FC<WizardStep3Props> = ({ 
  language, 
  userType, 
  formData,
  showHeartsCelebration,
  onComplete 
}) => {
  const text = wizardText.step3;
  const isRTL = language === 'he';

  return (
    <div className={`wizard-step p-6 ${isRTL ? 'text-right' : 'text-left'} relative overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hearts Animation Overlay */}
      {showHeartsCelebration && <HeartsAnimation />}

      {/* Header with Hearts */}
      <div className="text-center space-y-4 mb-6 relative z-10">
        <div className="text-4xl mb-2">
          ❤️ ✨ ❤️
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
          {text.welcome[language]}
        </h2>
        <p className="text-gray-600 text-sm">
          {text.celebration[language]}
        </p>
      </div>

      {/* Registration Summary */}
      <div className="bg-gradient-to-br from-[#635bff]/5 to-[#0066ff]/5 rounded-xl p-6 mb-6 border border-[#635bff]/10 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">✅</span>
            <span className="font-medium text-gray-900">
              {text.success[language]}
            </span>
          </div>

          {formData.fullName && (
            <div className="flex items-center space-x-2">
              <span>👤</span>
              <span className="text-gray-700">{formData.fullName}</span>
            </div>
          )}

          {formData.email && (
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span className="text-gray-700">{formData.email}</span>
            </div>
          )}

          {formData.businessName && (
            <div className="flex items-center space-x-2">
              <span>🏢</span>
              <span className="text-gray-700">{formData.businessName}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <span>🎯</span>
            <span className="text-gray-700">
              {text.accountType[language]}: {' '}
              {userType === 'business_owner' 
                ? (language === 'he' ? 'בעל עסק' : 'Business Owner')
                : (language === 'he' ? 'לקוח פרטי' : 'Customer')
              }
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span>🎁</span>
            <span className="text-gray-700">
              {userType === 'business_owner' 
                ? text.trialInfo[language]
                : text.freeInfo[language]
              }
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span>❤️</span>
            <span className="text-gray-700">
              {text.celebration[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Final CTA Button */}
      <Button
        onClick={onComplete}
        className="w-full h-12 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5248e6] hover:to-[#0052cc] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg text-base relative z-10"
      >
        {userType === 'business_owner' 
          ? text.businessFinalCTA[language]
          : text.customerFinalCTA[language]
        }
      </Button>

      {/* Floating Hearts Decoration */}
      <div className="absolute bottom-4 left-4 text-xl animate-bounce">❤️</div>
      <div className="absolute top-4 right-4 text-xl animate-pulse">❤️</div>
    </div>
  );
};

export default WizardStep3;
