
import React from 'react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="animate-pulse">
          <img 
            src="/lovable-uploads/40f5eab7-4999-4f01-bf78-f90c1f1afe00.png" 
            alt="Collzy Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
          />
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
