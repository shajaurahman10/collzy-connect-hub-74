import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Heart, Globe, Phone, FileText, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';

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
  const { user } = useAuth();
  const { profile } = useProfile();

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

  const handleApplyClick = () => {
    console.log('Apply button clicked for:', college.name);
    console.log('User:', user);
    console.log('Profile:', profile);

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to apply to colleges.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!profile) {
      toast({
        title: "Complete your profile",
        description: "Please complete your profile before applying to colleges.",
        variant: "destructive",
      });
      navigate('/create-profile');
      return;
    }

    if (!college.email) {
      toast({
        title: "Email Not Available",
        description: "This college doesn't have an email address available. Please try calling or visiting their website.",
        variant: "destructive",
      });
      return;
    }

    // Generate application email with profile data
    const subject = `Admission Enquiry from ${profile.full_name} via Collzy`;
    const body = `Dear ${college.name} Admissions Team,

I hope this email finds you well. I am ${profile.full_name}, and I came across your esteemed institution through the Collzy platform. I am very interested in applying for admission and would like to request detailed information about your programs.

My Profile Details:
• Name: ${profile.full_name}
• Email: ${profile.email}
• Phone: ${profile.phone || 'Not provided'}
• State: ${profile.state || 'Not provided'}
• 12th Grade Marks: ${profile.marks || 'Not provided'}
• Course Interest: ${profile.course_interest || 'Not provided'}

I would be grateful if you could provide me with information about:

📚 Course Details:
- Available programs and specializations
- Eligibility criteria and prerequisites
- Duration and curriculum structure

💰 Fee Structure:
- Tuition fees (semester/annual)
- Additional charges (lab, library, sports, etc.)
- Payment schedule and scholarship opportunities

📅 Admission Process:
- Application deadlines and procedure
- Entrance exams (if any)
- Required documents and selection criteria

🏠 Accommodation:
- Hostel facilities and availability
- Accommodation fees and room types

🎯 Additional Information:
- Campus facilities and infrastructure
- Placement opportunities and statistics
- Student life and extracurricular activities

I am very enthusiastic about the prospect of joining your institution and would appreciate a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
${profile.full_name}
Email: ${profile.email}
Phone: ${profile.phone || 'Not provided'}

---
This inquiry was sent through Collzy - India's leading college discovery platform.
Contact us: collzy.info@gmail.com | WhatsApp: +91 8129913205
Location: Kasargod, Kerala`;

    try {
      const mailtoLink = `mailto:${college.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      
      // Store application attempt
      const applications = JSON.parse(localStorage.getItem('college_applications') || '[]');
      applications.push({
        collegeId: college.id,
        collegeName: college.name,
        appliedAt: new Date().toISOString(),
        userEmail: profile.email,
        status: 'applied'
      });
      localStorage.setItem('college_applications', JSON.stringify(applications));
      
      toast({
        title: "🎉 Application Email Opened!",
        description: "Your email application has been prepared. Please send the email to complete your application!",
        duration: 6000,
      });
    } catch (error) {
      toast({
        title: "Error Opening Email",
        description: "Please copy the college email and send manually: " + college.email,
        variant: "destructive",
      });
    }
  };

  const handleCallClick = () => {
    if (college.phone) {
      try {
        window.location.href = `tel:${college.phone}`;
        toast({
          title: "Opening Phone App",
          description: `Calling ${college.name}...`,
        });
      } catch (error) {
        toast({
          title: "Phone App Error",
          description: `Please call manually: ${college.phone}`,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Phone Number Unavailable",
        description: "Please visit the college website for contact details.",
        variant: "destructive",
      });
    }
  };

  const handleWebsiteClick = () => {
    if (college.website) {
      try {
        const url = college.website.startsWith('http') ? college.website : `https://${college.website}`;
        window.open(url, '_blank');
        toast({
          title: "Opening Website",
          description: "College website is opening in a new tab.",
        });
      } catch (error) {
        toast({
          title: "Website Error",
          description: "Please visit the website manually: " + college.website,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Website Unavailable",
        description: "No website link available for this college.",
        variant: "destructive",
      });
    }
  };

  const handleEmailClick = () => {
    if (college.email) {
      const subject = `Enquiry from Collzy Platform`;
      const body = `Dear ${college.name} Team,

I found your college through Collzy platform and would like to know more about your programs and admission process.

Please provide information about:
- Available courses and eligibility
- Fee structure and scholarships
- Admission deadlines
- Campus facilities

Thank you for your time.

Best regards,
Collzy User

---
This inquiry was sent through Collzy - India's leading college discovery platform.
Visit: www.collzy.com`;

      try {
        const mailtoLink = `mailto:${college.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Opening Email Client",
          description: "Email client opened with pre-filled inquiry.",
        });
      } catch (error) {
        toast({
          title: "Email Error",
          description: `Please email manually: ${college.email}`,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Email Unavailable",
        description: "No email address available for this college.",
        variant: "destructive",
      });
    }
  };

  const handleMoreInfoClick = () => {
    if (college.brochure) {
      window.open(college.brochure, '_blank');
      toast({
        title: "Opening Brochure",
        description: "College brochure is opening in a new tab.",
      });
    } else if (college.website) {
      const url = college.website.startsWith('http') ? college.website : `https://${college.website}`;
      window.open(url, '_blank');
      toast({
        title: "Opening Website",
        description: "College website is opening in a new tab.",
      });
    } else {
      toast({
        title: "Information Unavailable",
        description: "No additional information available.",
        variant: "destructive",
      });
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
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            onClick={handleApplyClick}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg h-14 hover:scale-105 text-sm font-semibold flex flex-col items-center justify-center p-2"
          >
            <Send className="h-4 w-4 mb-1" />
            <span className="text-xs">Apply Now</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleWebsiteClick}
            className="h-14 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Globe className="h-4 w-4 mb-1" />
            <span className="text-xs">Website</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleCallClick}
            className="h-14 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <Phone className="h-4 w-4 mb-1" />
            <span className="text-xs">Call</span>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleEmailClick}
            className="h-14 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-sm hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center p-2"
          >
            <FileText className="h-4 w-4 mb-1" />
            <span className="text-xs">Email</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
