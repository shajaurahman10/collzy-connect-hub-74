import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Phone, Heart, Mail, Award, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  website?: string;
  admission_email?: string;
  phone?: string;
  affiliation?: string;
  naac_grade?: string;
  type: string;
  created_at: string;
}

interface PrivateCollegeCardProps {
  college: College;
  onFavorite?: (collegeId: string, isFavorited: boolean) => void;
}

const PrivateCollegeCard = ({ college, onFavorite }: PrivateCollegeCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to log in to apply to colleges.",
        variant: "destructive",
      });
      window.location.href = '/auth';
      return;
    }

    if (!profile) {
      toast({
        title: "Complete your profile",
        description: "Please complete your profile before applying to colleges.",
        variant: "destructive",
      });
      window.location.href = '/create-profile';
      return;
    }

    // Generate pre-filled email message
    const subject = `Admission Enquiry from ${profile.full_name} via Collzy`;
    const body = `Dear ${college.name} Admissions Team,

I hope this email finds you well. I am ${profile.full_name}, and I came across your esteemed institution through the Collzy platform. I am very interested in applying for admission and would like to request detailed information about your programs.

My Profile Details:
• Name: ${profile.full_name}
• Email: ${profile.email}
• Phone: ${profile.phone}
• State: ${profile.state}
• 12th Grade Marks: ${profile.marks}
• Course Interest: ${profile.course_interest}

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

You can also view my complete profile and verify my details through the Collzy platform.

I am very enthusiastic about the prospect of joining your institution and would appreciate a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
${profile.full_name}
Email: ${profile.email}
Phone: ${profile.phone}

---
This inquiry was sent through Collzy - India's leading college discovery platform.
Contact us: collzy.info@gmail.com | WhatsApp: +91 8129913205
Location: Kasargod, Kerala`;

    if (college.admission_email) {
      const mailtoUrl = `mailto:${college.admission_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_self');

      toast({
        title: "🎉 Application initiated successfully!",
        description: "Your email client has opened with a pre-filled message. Please send the email to complete your application!",
        duration: 6000,
      });
    } else {
      toast({
        title: "Contact Information Unavailable",
        description: "Please visit the college website for admission details.",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    onFavorite?.(college.id, newFavoriteState);
  };

  const handleWebsite = () => {
    if (college.website) {
      const url = college.website.startsWith('http') ? college.website : `https://${college.website}`;
      window.open(url, '_blank');
      toast({
        title: "Opening Website",
        description: "College website is opening in a new tab.",
      });
    } else {
      toast({
        title: "Website Unavailable",
        description: "No website link available for this college.",
        variant: "destructive",
      });
    }
  };

  const handleCall = () => {
    if (college.phone) {
      window.open(`tel:${college.phone}`, '_self');
      toast({
        title: "Opening Phone App",
        description: `Calling ${college.name}...`,
      });
    } else {
      toast({
        title: "Phone Number Unavailable",
        description: "Please visit the college website for contact details.",
        variant: "destructive",
      });
    }
  };

  const handleEmail = () => {
    if (college.admission_email) {
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

      const mailtoUrl = `mailto:${college.admission_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_self');
      
      toast({
        title: "Opening Email Client",
        description: "Email client opened with pre-filled inquiry.",
      });
    } else {
      toast({
        title: "Email Unavailable",
        description: "No email address available for this college.",
        variant: "destructive",
      });
    }
  };

  const getGradeColor = (grade?: string) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
    switch (grade) {
      case 'A++': return 'bg-green-100 text-green-800';
      case 'A+': return 'bg-blue-100 text-blue-800';
      case 'A': return 'bg-purple-100 text-purple-800';
      case 'B++': return 'bg-yellow-100 text-yellow-800';
      case 'B+': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
              {college.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{college.city}, {college.state}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <Badge className={getGradeColor(college.naac_grade)}>
              NAAC {college.naac_grade || 'Not Rated'}
            </Badge>
          </div>
          {college.affiliation && (
            <Badge variant="secondary">
              {college.affiliation}
            </Badge>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-6 space-y-2">
          {college.admission_email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span className="truncate">{college.admission_email}</span>
            </div>
          )}
          {college.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <span>{college.phone}</span>
            </div>
          )}
        </div>

        {/* Action Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 hover:scale-105"
            size="sm"
          >
            <Mail className="h-4 w-4 mr-1" />
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            onClick={handleWebsite}
            disabled={!college.website}
            size="sm"
            className="hover:scale-105 transition-all duration-200"
          >
            <Globe className="h-4 w-4 mr-1" />
            Website
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCall}
            disabled={!college.phone}
            size="sm"
            className="hover:scale-105 transition-all duration-200"
          >
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button 
            variant="outline" 
            onClick={handleEmail}
            size="sm"
            className="hover:scale-105 transition-all duration-200"
            disabled={!college.admission_email}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivateCollegeCard;
