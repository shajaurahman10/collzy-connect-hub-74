
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, MessageCircle, Heart, ExternalLink, Phone, Mail, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CollegeCardProps {
  college: {
    id: number;
    name: string;
    location: string;
    state: string;
    type: string;
    rating: number;
    students: number;
    description: string;
    image: string;
    whatsapp: string;
    website?: string;
    email?: string;
    founded?: number;
  };
  onApply: () => void;
  onFavorite?: (collegeId: number, isFavorited: boolean) => void;
}

const CollegeCard = ({ college, onApply, onFavorite }: CollegeCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteColleges') || '[]');
    setIsFavorited(favorites.includes(college.id));
  }, [college.id]);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    
    const favorites = JSON.parse(localStorage.getItem('favoriteColleges') || '[]');
    if (newFavoriteState) {
      if (!favorites.includes(college.id)) {
        favorites.push(college.id);
      }
    } else {
      const index = favorites.indexOf(college.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favoriteColleges', JSON.stringify(favorites));
    
    if (onFavorite) {
      onFavorite(college.id, newFavoriteState);
    }
  };

  const handleWebsiteClick = () => {
    if (college.website) {
      window.open(college.website.startsWith('http') ? college.website : `https://${college.website}`, '_blank');
    }
  };

  const handleEmailClick = () => {
    if (college.email) {
      window.open(`mailto:${college.email}`, '_blank');
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white h-full flex flex-col border-0 shadow-lg">
      {/* Header with favorite button */}
      <div className="relative">
        <img 
          src={college.image} 
          alt={college.name}
          className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Heart 
              className={`h-5 w-5 transition-all duration-200 ${
                isFavorited 
                  ? 'text-red-500 fill-current scale-110' 
                  : 'text-gray-600 hover:text-red-400'
              }`} 
            />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-blue-700 border-0 shadow-sm">
            {college.type}
          </Badge>
        </div>
        {college.founded && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-blue-600 text-white border-0 text-xs">
              Est. {college.founded}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-2">
              {college.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
              <span className="text-sm truncate">{college.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-xl border border-yellow-200 flex-shrink-0">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-semibold text-gray-900">{college.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-4 sm:px-6 flex-1">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {college.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
          <span>{college.students.toLocaleString()} students</span>
        </div>

        {/* Quick Contact Icons */}
        <div className="flex gap-2 mb-4">
          {college.website && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleWebsiteClick}
              className="flex-1 h-8 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
            >
              <Globe className="h-3 w-3 mr-1" />
              <span className="text-xs">Website</span>
            </Button>
          )}
          {college.email && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailClick}
              className="flex-1 h-8 border-gray-200 hover:border-green-300 hover:bg-green-50"
            >
              <Mail className="h-3 w-3 mr-1" />
              <span className="text-xs">Email</span>
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 mt-auto">
        <Button 
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact via WhatsApp
        </Button>
        
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1 border-gray-200 hover:border-blue-300 hover:bg-blue-50">
            <ExternalLink className="h-3 w-3 mr-1" />
            Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1 border-gray-200 hover:border-purple-300 hover:bg-purple-50">
            Compare
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
