
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { UserType, Language, WizardFormData, wizardText } from './types';
import ModernGradientHeart from '@/components/ui/ModernGradientHeart';
import { Check, User, Building2, Mail, Target, Gift } from 'lucide-react';

interface ProfessionalSuccessModalProps {
  language: Language;
  userType: UserType | null;
  formData: WizardFormData;
  onComplete: () => void;
}

const ProfessionalSuccessModal: React.FC<ProfessionalSuccessModalProps> = ({ 
  language, 
  userType, 
  formData,
  onComplete 
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const isRTL = language === 'he';

  useEffect(() => {
    // Staggered animation sequence
    setTimeout(() => setShowAnimation(true), 300);
    setTimeout(() => setShowHearts(true), 1000);
  }, []);

  const welcomeText = {
    he: 'ברוכים הבאים ל-QFLOW!',
    en: 'Welcome to QFLOW!'
  };

  const emotionalMessage = {
    he: 'אנחנו שמחים שהצטרפת אלינו',
    en: "We're excited you joined us"
  };

  const ctaText = {
    business_owner: {
      he: 'התחל לנהל את העסק שלך',
      en: 'Start Managing Your Business'
    },
    customer: {
      he: 'התחל להזמין תורים',
      en: 'Start Booking Appointments'
    }
  };

  const accountTypeText = {
    business_owner: {
      he: 'בעל עסק',
      en: 'Business Owner'
    },
    customer: {
      he: 'לקוח פרטי',
      en: 'Customer'
    }
  };

  const trialText = {
    he: 'תקופת ניסיון: 14 יום בחינם',
    en: 'Free Trial: 14 days'
  };

  const freeText = {
    he: 'שירות חינמי לצמיתות',
    en: 'Free service forever'
  };

  return (
    <div className={`relative overflow-hidden p-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Floating Modern Hearts Background */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute floating-modern-hearts opacity-20"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i * 12)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + (i % 3)}s`
              }}
            >
              <ModernGradientHeart size="sm" />
            </div>
          ))}
        </div>
      )}

      {/* Success Header */}
      <div className="text-center mb-8 relative z-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-green-100 mb-4 transition-all duration-800 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <Check className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className={`text-2xl font-bold mb-2 transition-all duration-500 delay-200 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <span className="bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
            {welcomeText[language]}
          </span>
        </h2>
      </div>

      {/* User Information Card */}
      <div className={`bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-6 mb-6 border border-[#635bff]/10 shadow-lg transition-all duration-500 delay-400 relative z-10 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <div className="space-y-4">
          {formData.fullName && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#635bff]/10 to-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-[#635bff]" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{formData.fullName}</div>
              </div>
            </div>
          )}

          {formData.businessName && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#635bff]/10 to-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-[#635bff]" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{formData.businessName}</div>
              </div>
            </div>
          )}

          {formData.email && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#635bff]/10 to-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#635bff]" />
              </div>
              <div>
                <div className="font-medium text-gray-700">{formData.email}</div>
              </div>
            </div>
          )}

          {userType && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#635bff]/10 to-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-[#635bff]" />
              </div>
              <div>
                <div className="font-medium text-gray-700">
                  {accountTypeText[userType][language]}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-green-700">
                {userType === 'business_owner' ? trialText[language] : freeText[language]}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Message */}
      <div className={`text-center mb-8 transition-all duration-500 delay-600 relative z-10 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
          <ModernGradientHeart size="sm" />
          <span>{emotionalMessage[language]}</span>
          <ModernGradientHeart size="sm" />
        </p>
      </div>

      {/* CTA Button */}
      <div className={`transition-all duration-500 delay-800 relative z-10 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <Button
          onClick={onComplete}
          className="w-full h-14 bg-gradient-to-r from-[#635bff] to-[#0066ff] hover:from-[#5248e6] hover:to-[#0052cc] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-2"
        >
          <ModernGradientHeart size="sm" className="opacity-80" />
          {userType && ctaText[userType][language]}
          <ModernGradientHeart size="sm" className="opacity-80" />
        </Button>
      </div>

      <style>{`
        .floating-modern-hearts {
          animation: modernHeartFloat 8s ease-in-out infinite;
        }

        @keyframes modernHeartFloat {
          0%, 100% { 
            transform: translateY(0px) scale(0.8);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-20px) scale(1);
            opacity: 0.4;
          }
        }

        @media (max-width: 480px) {
          .floating-modern-hearts {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfessionalSuccessModal;
