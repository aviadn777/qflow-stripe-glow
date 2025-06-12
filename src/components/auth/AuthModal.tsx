
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = () => {
  const { isModalOpen, closeModal, modalMode, setModalMode } = useAuth();

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#635bff] to-[#0066ff] bg-clip-text text-transparent">
            {modalMode === 'signin' ? 'כניסה לחשבון' : 'הצטרפות ל-QFLOW'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            {modalMode === 'signin' 
              ? 'התחבר לחשבונך כדי לנהל את התור שלך'
              : 'הצטרף אלינו והתחל לנהל את העסק שלך בצורה חכמה'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {modalMode === 'signin' ? <LoginForm /> : <SignupForm />}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setModalMode(modalMode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-[#635bff] hover:text-[#0066ff] transition-colors duration-200"
            dir="rtl"
          >
            {modalMode === 'signin' 
              ? 'עדיין אין לך חשבון? הירשם כאן'
              : 'כבר יש לך חשבון? היכנס כאן'
            }
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
