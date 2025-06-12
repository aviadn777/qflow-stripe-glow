
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import SignupWizard from './SignupWizard';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ModernGradientHeart from '@/components/ui/ModernGradientHeart';

const AuthModal = () => {
  const { isModalOpen, closeModal, modalMode, setModalMode } = useAuth();

  if (modalMode === 'signup') {
    return (
      <SignupWizard 
        isOpen={isModalOpen} 
        onClose={closeModal}
        language="he"
      />
    );
  }

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-br from-white to-gray-50/50 p-6">
            <DialogHeader className="text-center space-y-3">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent flex items-center justify-center gap-2">
                <ModernGradientHeart size="sm" />
                {modalMode === 'signin' ? 'כניסה לחשבון' : 'הצטרפות ל-QFLOW'}
                <ModernGradientHeart size="sm" />
              </DialogTitle>
              <DialogDescription className="text-gray-600 text-sm leading-relaxed">
                {modalMode === 'signin' 
                  ? 'התחבר לחשבונך כדי לנהל את התור שלך'
                  : 'הצטרף אלינו והתחל לנהל את העסק שלך בצורה חכמה'
                }
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              {modalMode === 'signin' ? <LoginForm /> : <SignupForm />}
            </div>

            <div className="mt-6 text-center border-t border-gray-100 pt-6">
              <button
                onClick={() => setModalMode(modalMode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-[#635bff] hover:text-[#0066ff] transition-colors duration-200 font-medium flex items-center justify-center gap-1 mx-auto"
                dir="rtl"
              >
                <ModernGradientHeart size="sm" className="opacity-60" />
                {modalMode === 'signin' 
                  ? 'עדיין אין לך חשבון? הירשם כאן'
                  : 'כבר יש לך חשבון? היכנס כאן'
                }
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModal;
