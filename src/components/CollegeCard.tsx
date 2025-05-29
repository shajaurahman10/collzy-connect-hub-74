
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Heart, Globe, Phone, FileText, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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

I hope this email finds you well. I am writing to inquire about admission opportunities at ${college.name} through Collzy platform.

STUDENT PROFILE:
- Name: [Your Full Name]
- Email: [Your Email]
- Phone: [Your Phone Number]
- Academic Background: [Your Current Education Level]
- Preferred Course: [Course of Interest]

DETAILED INQUIRY:

📚 Available Courses & Programs:
- Course offerings and specializations available
- Eligibility criteria and prerequisites for admission
- Duration and detailed curriculum structure
- Faculty qualifications and student-teacher ratio

💰 Complete Fee Structure:
- Tuition fees (semester/annual breakdown)
- Additional charges (lab, library, sports, development fees)
- Payment schedule and installment options
- Scholarship opportunities and eligibility criteria
- Financial aid programs available

🏠 Accommodation Details:
- Hostel facilities and room availability
- Hostel fees and different room types (single/double/triple sharing)
- Mess facilities and food arrangements
- Safety and security measures on campus
- Nearby accommodation options if hostel unavailable

📋 Admission Process:
- Application deadlines and important dates
- Entrance exams required (if any)
- List of required documents for application
- Selection criteria and merit process
- Interview process (if applicable)

🎯 Campus & Placement Information:
- Campus facilities and infrastructure details
- Library, laboratory, and sports facilities
- Placement opportunities and statistics for recent years
- Industry partnerships and internship programs
- Alumni network and career support services

🌟 Extracurricular Activities:
- Student clubs and societies available
- Sports and cultural activities
- Annual events and festivals
- Leadership opportunities

I am very interested in joining your esteemed institution and would be grateful for a comprehensive response. Please let me know if you need any additional information from my side or if there's a convenient time for a campus visit.

Thank you for your time and consideration. I look forward to hearing from you soon.

Best regards,
[Your Name]
Prospective Student

--
This inquiry was sent through Collzy - India's premier college discovery platform
Visit: www.collzy.com | Connect with 500+ institutions nationwide

Note: Please reply to this email for direct communication. We recommend checking your email regularly for admission updates.`;

    const mailtoLink = `mailto:${college.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_self');
    
    // Show success message
    toast({
      title: "🎉 Application Sent Successfully!",
      description: "Check your email frequently to connect with the college. Don't forget to share Collzy with friends!",
      duration: 6000,
    });
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

      <CardFooter className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 mt-auto">
        {/* Primary Apply Button - Full Width */}
        <Button 
          onClick={college.email ? handleEmailApply : onApply}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg h-12 hover:scale-105 text-base font-semibold"
        >
          <Send className="h-5 w-5 mr-2" />
          Apply Now
        </Button>
        
        {/* 2x2 Grid for Secondary Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCallClick}
            disabled={!college.phone}
            className="h-12 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Phone className="h-4 w-4 mb-1" />
            <span className="text-xs">Call</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleWebsiteClick}
            disabled={!college.website}
            className="h-12 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Globe className="h-4 w-4 mb-1" />
            <span className="text-xs">Website</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleMoreInfoClick}
            disabled={!college.brochure && !college.website}
            className="h-12 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2 col-span-2"
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
