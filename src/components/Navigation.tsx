
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Building2, 
  Trophy,
  BarChart3,
  User,
  LogOut,
  Settings
} from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { name: 'Home', path: '/', icon: GraduationCap },
    { name: 'Colleges', path: '/private-colleges', icon: Building2 },
    { name: 'Rankings', path: '/rankings', icon: Trophy },
    { name: 'Tracker', path: '/tracker', icon: BarChart3 },
  ];

  const secondaryItems = [
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Collzy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Secondary Items */}
            {secondaryItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {secondaryItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
