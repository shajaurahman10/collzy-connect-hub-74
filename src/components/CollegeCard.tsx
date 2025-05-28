
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, MessageCircle, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CollegeCardProps {
  college: {
    id: number;
    name: string;
    location: string;
    type: string;
    rating: number;
    students: number;
    description: string;
    image: string;
    whatsapp: string;
  };
  onApply: () => void;
  onFavorite?: (collegeId: number, isFavorited: boolean) => void;
}

const CollegeCard = ({ college, onApply, onFavorite }: CollegeCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if college is in favorites on component mount
    const favorites = JSON.parse(localStorage.getItem('favoriteColleges') || '[]');
    setIsFavorited(favorites.includes(college.id));
  }, [college.id]);

  const handleFavoriteClick = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    
    // Save to localStorage for persistence
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

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white h-full flex flex-col">
      {/* Like Button - Positioned above the card */}
      <div className="flex justify-end p-3 sm:p-4 pb-0">
        <button
          onClick={handleFavoriteClick}
          className="p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
        >
          <Heart 
            className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors ${
              isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} 
          />
        </button>
      </div>

      <div className="relative">
        <img 
          src={college.image} 
          alt={college.name}
          className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs sm:text-sm">
            {college.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
              {college.name}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="text-xs sm:text-sm truncate">{college.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-1.5 sm:px-2 py-1 rounded-lg ml-2 flex-shrink-0">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">{college.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-3 sm:px-6 flex-1">
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
          {college.description}
        </p>
        
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
          <span>{college.students.toLocaleString()} students</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6 space-y-2 sm:space-y-3 mt-auto">
        <Button 
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
        >
          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
          Apply via WhatsApp
        </Button>
        
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm py-1 sm:py-2">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm py-1 sm:py-2">
            Compare
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
