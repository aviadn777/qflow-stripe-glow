
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import type { UserProfile, Business } from '../integrations/supabase/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  business: Business | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: {
    name?: string;
    businessName?: string;
    phone?: string;
    preferredLanguage?: string;
  }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile and business data
          setTimeout(async () => {
            try {
              const { data: profileData } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              setProfile(profileData);

              if (profileData?.business_id) {
                const { data: businessData } = await supabase
                  .from('businesses')
                  .select('*')
                  .eq('id', profileData.business_id)
                  .single();
                
                setBusiness(businessData);
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }, 0);
        } else {
          setProfile(null);
          setBusiness(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, metadata?: {
    name?: string;
    businessName?: string;
    phone?: string;
    preferredLanguage?: string;
  }) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: metadata
      }
    });
    
    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    profile,
    business,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
