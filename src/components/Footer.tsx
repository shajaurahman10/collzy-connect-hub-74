
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png" 
              alt="Collzy" 
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-xl font-bold">Collzy</span>
          </div>
          <p className="text-blue-200 mb-2">Your pathway to higher education</p>
          <div className="flex items-center justify-center gap-1 text-sm text-blue-300">
            <span>Created with</span>
            <Heart className="h-4 w-4 text-red-400 fill-current" />
            <span>by <span className="font-semibold text-white">Shajau Rahman</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
