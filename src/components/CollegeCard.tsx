
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Heart, Globe, Phone, FileText, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const checkStudentProfile = () => {
    const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
    return profile.firstName && profile.email && profile.phone && profile.state && profile.marks;
  };

  const handleApplyClick = () => {
    if (!checkStudentProfile()) {
      toast({
        title: "Profile Incomplete",
        description: "Please complete your profile before applying.",
        variant: "destructive",
      });
      navigate('/profile');
      return;
    }

    const profile = JSON.parse(localStorage.getItem('studentProfile') || '{}');
    const subject = `Admission Enquiry via Collzy`;
    const body = `Dear ${college.name} Admissions Team,

I'm interested in applying to your college. I came across your profile on Collzy and would like to know more about the admission process, eligibility, and important dates.

My profile details:
- Name: ${profile.firstName} ${profile.lastName || ''}
- Email: ${profile.email}
- Phone: ${profile.phone}
- State: ${profile.state}
- 12th Grade Marks: ${profile.marks || 'Not specified'}

Kindly refer to my submitted details via this form: https://forms.gle/Cp2G5Lm5sNFe8eJu6

Thank you!
Regards,
${profile.firstName} ${profile.lastName || ''}
Collzy.com`;

    if (college.email) {
      const mailtoLink = `mailto:${college.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_self');
      
      // Send to Google Sheets
      submitToGoogleSheets(profile, college);
      
      toast({
        title: "🎉 Application Sent Successfully!",
        description: "Check your email frequently to connect with the college. Don't forget to share Collzy with friends!",
        duration: 6000,
      });
    } else {
      onApply();
    }
  };

  const submitToGoogleSheets = async (profile: any, college: any) => {
    try {
      const formData = new FormData();
      formData.append('entry.123456789', profile.firstName + ' ' + (profile.lastName || ''));
      formData.append('entry.987654321', profile.email);
      formData.append('entry.456789123', profile.phone);
      formData.append('entry.789123456', college.name);
      formData.append('entry.321654987', college.state);
      
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdCp2G5Lm5sNFe8eJu6/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (error) {
      console.log('Form submission completed');
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

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white h-full flex flex-col border-0 shadow-lg animate-fade-in hover:scale-105">
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

      <CardFooter className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        {/* 2x2 Grid for Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {/* Top Left - Apply Now (Green) */}
          <Button 
            onClick={handleApplyClick}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg h-14 hover:scale-105 text-sm font-semibold flex flex-col items-center justify-center p-2"
          >
            <Send className="h-4 w-4 mb-1" />
            <span className="text-xs">Apply Now</span>
          </Button>
          
          {/* Top Right - Website */}
          <Button 
            variant="outline" 
            onClick={handleWebsiteClick}
            disabled={!college.website}
            className="h-14 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Globe className="h-4 w-4 mb-1" />
            <span className="text-xs">Website</span>
          </Button>
          
          {/* Bottom Left - Call */}
          <Button 
            variant="outline" 
            onClick={handleCallClick}
            disabled={!college.phone}
            className="h-14 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Phone className="h-4 w-4 mb-1" />
            <span className="text-xs">Call</span>
          </Button>
          
          {/* Bottom Right - More Info */}
          <Button 
            variant="outline" 
            onClick={handleMoreInfoClick}
            disabled={!college.brochure && !college.website}
            className="h-14 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-xs">More Info</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
