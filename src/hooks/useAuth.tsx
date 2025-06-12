
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure Supabase client for better session persistence
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Store user session in localStorage for persistence
        if (session) {
          localStorage.setItem('supabase_session', JSON.stringify({
            user: session.user,
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at
          }));
          
          // Store basic user info in cookies for quick access
          document.cookie = `user_email=${session.user.email}; max-age=${60*60*24*365}; path=/`;
          document.cookie = `user_id=${session.user.id}; max-age=${60*60*24*365}; path=/`;
        } else {
          localStorage.removeItem('supabase_session');
          // Clear cookies
          document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      }
    );

    // Check for existing session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session) {
        // Store session data
        localStorage.setItem('supabase_session', JSON.stringify({
          user: session.user,
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear all stored data
    localStorage.removeItem('supabase_session');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('application_preferences');
    document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
