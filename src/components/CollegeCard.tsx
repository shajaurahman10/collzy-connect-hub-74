
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Heart, Globe, Phone, FileText, Send } from 'lucide-react';
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
    phone?: string;
    founded?: number;
    brochure?: string;
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

  const handleCallClick = () => {
    if (college.phone) {
      window.open(`tel:${college.phone}`, '_self');
    }
  };

  const handleWebsiteClick = () => {
    if (college.website) {
      window.open(college.website.startsWith('http') ? college.website : `https://${college.website}`, '_blank');
    }
  };

  const handleMoreInfoClick = () => {
    if (college.brochure) {
      window.open(college.brochure, '_blank');
    } else if (college.website) {
      window.open(college.website.startsWith('http') ? college.website : `https://${college.website}`, '_blank');
    }
  };

  const handleEmailApply = () => {
    const subject = `Admission Inquiry - ${college.name}`;
    const body = `Dear Admission Team,

I hope this email finds you well. I am writing to inquire about admission opportunities at ${college.name}.

I would greatly appreciate detailed information about:

📚 Available Courses & Programs:
- Course offerings and specializations
- Eligibility criteria and prerequisites
- Duration and curriculum details

💰 Fee Structure:
- Tuition fees (semester/annual)
- Additional charges (lab, library, sports, etc.)
- Payment schedule and options
- Scholarship opportunities

🏠 Accommodation:
- Hostel facilities and availability
- Hostel fees and room types
- Mess facilities and food arrangements
- Safety and security measures

📋 Admission Process:
- Application deadlines and procedure
- Entrance exams (if any)
- Required documents
- Selection criteria

🎯 Additional Information:
- Campus facilities and infrastructure
- Faculty qualifications and student-teacher ratio
- Placement opportunities and statistics
- Extracurricular activities

I am very interested in joining your esteemed institution and would be grateful for a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
Prospective Student
(Via Collzy Platform)

Note: This inquiry was sent through Collzy - India's leading college discovery platform.`;

    const mailtoLink = `mailto:${college.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_self');
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white h-full flex flex-col border-0 shadow-lg animate-fade-in">
      <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6 relative">
        <div className="absolute top-3 right-3">
          <button
            onClick={handleFavoriteClick}
            className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
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
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0 shadow-sm animate-scale-in">
            {college.type}
          </Badge>
        </div>
        
        {college.founded && (
          <div className="absolute top-3 left-20">
            <Badge variant="outline" className="bg-blue-600 text-white border-0 text-xs animate-scale-in">
              Est. {college.founded}
            </Badge>
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mt-12">
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
      </CardContent>

      <CardFooter className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 mt-auto">
        {/* Primary Apply Button */}
        <Button 
          onClick={college.email ? handleEmailApply : onApply}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg h-10 hover:scale-105"
        >
          <Send className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
        
        {/* Secondary Action Buttons */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCallClick}
            disabled={!college.phone}
            className="h-9 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-xs hover:scale-105 transition-all duration-200"
          >
            <Phone className="h-3 w-3 mr-1" />
            Call
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleWebsiteClick}
            disabled={!college.website}
            className="h-9 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-xs hover:scale-105 transition-all duration-200"
          >
            <Globe className="h-3 w-3 mr-1" />
            Website
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMoreInfoClick}
            disabled={!college.brochure && !college.website}
            className="h-9 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-xs hover:scale-105 transition-all duration-200"
          >
            <FileText className="h-3 w-3 mr-1" />
            Info
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
