
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
    console.log('Setting up auth state listener...');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'No user');
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session) {
          console.log('User signed in:', session.user.email);
          localStorage.setItem('supabase_session', JSON.stringify({
            user: session.user,
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at
          }));
          
          document.cookie = `user_email=${session.user.email}; max-age=${60*60*24*365}; path=/`;
          document.cookie = `user_id=${session.user.id}; max-age=${60*60*24*365}; path=/`;
        } else {
          console.log('User signed out');
          localStorage.removeItem('supabase_session');
          document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      } else {
        console.log('Initial session check:', session?.user?.email || 'No session');
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session) {
        localStorage.setItem('supabase_session', JSON.stringify({
          user: session.user,
          access_token: session.access_token,
          refresh_token: session.refresh_token,
          expires_at: session.expires_at
        }));
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    console.log('Starting Google sign in...');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    console.log('Starting email sign in for:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Email sign in error:', error);
      throw error;
    }
    console.log('Email sign in successful');
  };

  const signUpWithEmail = async (email: string, password: string) => {
    console.log('Starting email sign up for:', email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      console.error('Email sign up error:', error);
      throw error;
    }
    console.log('Email sign up successful');
  };

  const signOut = async () => {
    console.log('Starting sign out...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
    
    localStorage.removeItem('supabase_session');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('application_preferences');
    document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    console.log('Sign out successful');
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
