
export type UserType = 'business_owner' | 'customer';

export type Language = 'he' | 'en';

export interface WizardFormData {
  email?: string;
  password?: string;
  fullName?: string;
  businessName?: string;
  phone?: string;
  city?: string;
  businessType?: string;
  isGoogleAuth?: boolean;
  googleUserData?: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}

export interface WizardText {
  step1: {
    title: { he: string; en: string };
    subtitle: { he: string; en: string };
    business: {
      title: { he: string; en: string };
      description: { he: string; en: string };
    };
    customer: {
      title: { he: string; en: string };
      description: { he: string; en: string };
    };
    continue: { he: string; en: string };
    preview: {
      placeholder: { he: string; en: string };
    };
  };
  step2: {
    businessTitle: { he: string; en: string };
    customerTitle: { he: string; en: string };
    googleBusiness: { he: string; en: string };
    googleCustomer: { he: string; en: string };
    or: { he: string; en: string };
    businessCTA: { he: string; en: string };
    customerCTA: { he: string; en: string };
    back: { he: string; en: string };
    fields: {
      email: { he: string; en: string };
      password: { he: string; en: string };
      fullName: { he: string; en: string };
      businessName: { he: string; en: string };
      phone: { he: string; en: string };
      city: { he: string; en: string };
      businessType: { he: string; en: string };
    };
  };
  step3: {
    welcome: { he: string; en: string };
    success: { he: string; en: string };
    accountType: { he: string; en: string };
    businessFinalCTA: { he: string; en: string };
    customerFinalCTA: { he: string; en: string };
    trialInfo: { he: string; en: string };
    freeInfo: { he: string; en: string };
    celebration: { he: string; en: string };
  };
}

export const wizardText: WizardText = {
  step1: {
    title: { 
      he: 'הרשמה ל-QFLOW', 
      en: 'Sign up to QFLOW' 
    },
    subtitle: { 
      he: 'בחר סוג חשבון', 
      en: 'Choose Account Type' 
    },
    business: {
      title: { 
        he: 'בעל עסק', 
        en: 'Business Owner' 
      },
      description: { 
        he: 'ניהול סלון • ₪89/חודש', 
        en: 'Manage salon • ₪89/month' 
      }
    },
    customer: {
      title: { 
        he: 'לקוח פרטי', 
        en: 'Customer' 
      },
      description: { 
        he: 'הזמנת תורים • חינם', 
        en: 'Book appointments • Free' 
      }
    },
    continue: { 
      he: 'המשך ❤️', 
      en: 'Continue ❤️' 
    },
    preview: {
      placeholder: { 
        he: '❤️ בחר סוג חשבון למעלה ❤️', 
        en: '❤️ Choose account type above ❤️' 
      }
    }
  },
  step2: {
    businessTitle: { 
      he: 'הרשמה כבעל עסק', 
      en: 'Business Signup' 
    },
    customerTitle: { 
      he: 'הרשמה כלקוח', 
      en: 'Customer Signup' 
    },
    googleBusiness: { 
      he: 'הרשמה עם Google - בעל עסק ❤️', 
      en: 'Sign up with Google - Business ❤️' 
    },
    googleCustomer: { 
      he: 'הרשמה עם Google - לקוח ❤️', 
      en: 'Sign up with Google - Customer ❤️' 
    },
    or: { 
      he: 'או', 
      en: 'or' 
    },
    businessCTA: { 
      he: 'התחל ניסיון 14 יום בחינם ❤️', 
      en: 'Start 14-Day Free Trial ❤️' 
    },
    customerCTA: { 
      he: 'הצטרף בחינם ❤️', 
      en: 'Join Free ❤️' 
    },
    back: { 
      he: '← חזור', 
      en: '← Back' 
    },
    fields: {
      email: { 
        he: 'כתובת אימייל', 
        en: 'Email Address' 
      },
      password: { 
        he: 'סיסמה', 
        en: 'Password' 
      },
      fullName: { 
        he: 'שם מלא', 
        en: 'Full Name' 
      },
      businessName: { 
        he: 'שם העסק', 
        en: 'Business Name' 
      },
      phone: { 
        he: 'טלפון', 
        en: 'Phone' 
      },
      city: { 
        he: 'עיר', 
        en: 'City' 
      },
      businessType: { 
        he: 'סוג העסק', 
        en: 'Business Type' 
      }
    }
  },
  step3: {
    welcome: { 
      he: 'ברוכים הבאים ל-QFLOW!', 
      en: 'Welcome to QFLOW!' 
    },
    success: { 
      he: 'חשבון נוצר בהצלחה', 
      en: 'Account created successfully' 
    },
    accountType: { 
      he: 'סוג חשבון', 
      en: 'Account Type' 
    },
    businessFinalCTA: { 
      he: 'התחל לנהל את הסלון ❤️', 
      en: 'Start Managing Salon ❤️' 
    },
    customerFinalCTA: { 
      he: 'התחל לחפש סלונים ❤️', 
      en: 'Start Finding Salons ❤️' 
    },
    trialInfo: { 
      he: 'תקופת ניסיון: 14 יום בחינם', 
      en: 'Free Trial: 14 days' 
    },
    freeInfo: { 
      he: 'חינם לחלוטין', 
      en: 'Completely Free' 
    },
    celebration: { 
      he: 'אנחנו שמחים שהצטרפת!', 
      en: 'We\'re happy you joined!' 
    }
  }
};
