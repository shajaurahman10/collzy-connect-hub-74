
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!isLogin && password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate('/');
      } else {
        await signUpWithEmail(email, password);
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account before signing in.",
        });
        setIsLogin(true); // Switch to login mode after successful signup
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      
      let errorMessage = "An error occurred during authentication.";
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message?.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
        setIsLogin(true);
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = "Please check your email and click the verification link before signing in.";
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You have successfully signed in with Google.",
      });
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Google Sign-in Error",
        description: error.message || "An error occurred during Google sign-in.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-screen py-12 px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-blue-700">
              {isLogin ? 'Welcome Back' : 'Join Collzy'}
            </CardTitle>
            <CardDescription className="text-base">
              {isLogin ? 'Sign in to your account to continue' : 'Create your account to discover colleges'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleAuth}
              disabled={loading}
              variant="outline"
              className="w-full h-12 text-base"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>
            
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>
            
            <div className="text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                disabled={loading}
              >
                {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
              </button>
            </div>

            {!isLogin && (
              <div className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
