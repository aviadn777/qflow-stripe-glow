
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import WizardStep1 from './wizard/WizardStep1';
import WizardStep2 from './wizard/WizardStep2';
import ProfessionalSuccessModal from './wizard/ProfessionalSuccessModal';
import { UserType, WizardFormData } from './wizard/types';

interface SignupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'he' | 'en';
}

const SignupWizard: React.FC<SignupWizardProps> = ({ 
  isOpen, 
  onClose, 
  language = 'he' 
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState<WizardFormData>({});

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const handleFormComplete = (data: WizardFormData) => {
    setFormData(data);
    setStep(3);
  };

  const handleWizardComplete = () => {
    onClose();
    // Reset wizard state
    setStep(1);
    setUserType(null);
    setFormData({});
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setUserType(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <div className="wizard-container bg-gradient-to-br from-white to-gray-50/50">
          {step === 1 && (
            <WizardStep1
              language={language}
              userType={userType}
              onUserTypeSelect={handleUserTypeSelect}
            />
          )}
          
          {step === 2 && userType && (
            <WizardStep2
              language={language}
              userType={userType}
              onFormComplete={handleFormComplete}
              onBack={handleBack}
            />
          )}
          
          {step === 3 && (
            <ProfessionalSuccessModal
              language={language}
              userType={userType}
              formData={formData}
              onComplete={handleWizardComplete}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupWizard;
