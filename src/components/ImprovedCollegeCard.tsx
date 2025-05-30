
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Globe, Phone, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { generateApplicationEmail, openGmailCompose } from '@/utils/emailService';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  students: number;
  description: string;
  courses: string[];
  email: string;
  phone: string;
  website: string;
  image?: string;
  founded: number;
}

interface ImprovedCollegeCardProps {
  college: College;
  onFavorite?: (collegeId: string, isFavorited: boolean) => void;
}

const ImprovedCollegeCard = ({ college, onFavorite }: ImprovedCollegeCardProps) => {
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

    // Generate and send email
    const emailData = generateApplicationEmail(profile, college);
    openGmailCompose(emailData);

    toast({
      title: "🎉 Application initiated successfully!",
      description: "Gmail has been opened with a pre-filled application. Please send the email to complete your application. Share Collzy with your friends!",
      duration: 6000,
    });
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    onFavorite?.(college.id, newFavoriteState);
  };

  const handleWebsite = () => {
    if (college.website) {
      window.open(college.website, '_blank');
    }
  };

  const handleCall = () => {
    if (college.phone) {
      window.open(`tel:${college.phone}`, '_self');
    }
  };

  const handleMoreInfo = () => {
    toast({
      title: "More Information",
      description: `For detailed information about ${college.name}, please visit their website or contact them directly.`,
    });
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
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium text-gray-900">{college.rating}</span>
          </div>
          <Badge variant={college.type === 'Public' ? 'default' : 'secondary'}>
            {college.type}
          </Badge>
        </div>

        {/* Students count */}
        <div className="flex items-center text-gray-600 mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">{college.students?.toLocaleString()} students</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {college.description}
        </p>

        {/* Courses */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2">Popular Courses:</p>
          <div className="flex flex-wrap gap-1">
            {college.courses.slice(0, 3).map((course, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {course}
              </Badge>
            ))}
            {college.courses.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{college.courses.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button 
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 hover:scale-105"
            size="sm"
          >
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
            onClick={handleMoreInfo}
            size="sm"
            className="hover:scale-105 transition-all duration-200"
          >
            More Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovedCollegeCard;
