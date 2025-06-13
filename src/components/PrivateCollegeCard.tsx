
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Phone, Heart, Mail, Award, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { generateApplicationEmail, openGmailCompose, openDefaultEmail } from '@/utils/emailService';

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
    console.log('Apply button clicked for:', college.name);

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

    if (!college.admission_email) {
      toast({
        title: "Email Not Available",
        description: "This college doesn't have an email address available. Please try calling or visiting their website.",
        variant: "destructive",
      });
      return;
    }

    try {
      const emailData = generateApplicationEmail(profile, { 
        name: college.name, 
        admission_email: college.admission_email 
      });
      
      // Try Gmail first, then fallback to default email
      try {
        openGmailCompose(emailData);
        toast({
          title: "🎉 Gmail Opened!",
          description: "Gmail compose window opened with your application email ready to send!",
          duration: 5000,
        });
      } catch (error) {
        openDefaultEmail(emailData);
        toast({
          title: "📧 Email Client Opened!",
          description: "Your default email client opened with the application ready to send!",
          duration: 5000,
        });
      }

      // Store application attempt
      const applicationData = {
        collegeId: college.id,
        collegeName: college.name,
        appliedAt: new Date().toISOString(),
        userEmail: profile.email,
        status: 'applied'
      };
      
      const existingApplications = JSON.parse(localStorage.getItem('college_applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('college_applications', JSON.stringify(existingApplications));

    } catch (error: any) {
      console.error('Error opening email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to open email client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    onFavorite?.(college.id, newFavoriteState);
    
    const favorites = JSON.parse(localStorage.getItem('favorite_colleges') || '[]');
    if (newFavoriteState) {
      favorites.push({
        collegeId: college.id,
        collegeName: college.name,
        addedAt: new Date().toISOString()
      });
    } else {
      const index = favorites.findIndex((fav: any) => fav.collegeId === college.id);
      if (index > -1) favorites.splice(index, 1);
    }
    localStorage.setItem('favorite_colleges', JSON.stringify(favorites));
  };

  const handleWebsite = () => {
    if (college.website) {
      try {
        let url = college.website.trim();
        
        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = `https://${url}`;
        }
        
        window.open(url, '_blank', 'noopener,noreferrer');
        
        toast({
          title: "Opening Website",
          description: "College website is opening in a new tab.",
        });
      } catch (error) {
        console.error('Website error:', error);
        toast({
          title: "Website Error",
          description: "Unable to open website. Please check the URL manually.",
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

  const handleCall = () => {
    if (college.phone) {
      try {
        window.location.href = `tel:${college.phone}`;
        toast({
          title: "Opening Phone App",
          description: `Calling ${college.name}...`,
        });
      } catch (error) {
        toast({
          title: "Phone Error",
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

      try {
        const mailtoUrl = `mailto:${college.admission_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        
        toast({
          title: "Opening Email Client",
          description: "Email client opened with pre-filled inquiry.",
        });
      } catch (error) {
        toast({
          title: "Email Error",
          description: `Please email manually: ${college.admission_email}`,
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
