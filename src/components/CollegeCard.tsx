
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, MessageCircle, Heart } from 'lucide-react';
import { useState } from 'react';

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
}

const CollegeCard = ({ college, onApply }: CollegeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white">
      <div className="relative">
        <img 
          src={college.image} 
          alt={college.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} 
          />
        </button>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {college.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {college.name}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{college.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-900">{college.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {college.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="h-4 w-4 mr-2" />
          <span>{college.students.toLocaleString()} students</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 space-y-3">
        <Button 
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Apply via WhatsApp
        </Button>
        
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Compare
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
