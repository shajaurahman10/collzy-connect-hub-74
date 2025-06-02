
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, GraduationCap, Star, Phone, Mail, Globe, Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  established_year: number;
  naac_grade: string;
  website?: string;
  admission_email?: string;
  phone?: string;
  courses_offered: string[];
  total_fees: number;
  hostel_available: boolean;
  placement_percentage: number;
  average_package: number;
  highest_package: number;
  student_strength?: number;
  image_url?: string;
}

interface ImprovedCollegeCardProps {
  college: College;
  onApply?: (collegeId: string) => void;
  onCompare?: (college: College) => void;
}

const ImprovedCollegeCard = ({ college, onApply, onCompare }: ImprovedCollegeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A++': return 'bg-green-100 text-green-800 border-green-200';
      case 'A+': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'A': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatFees = (fees: number) => {
    if (fees >= 100000) {
      return `₹${(fees / 100000).toFixed(1)}L`;
    }
    return `₹${(fees / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">{college.name}</h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-sm">{college.city}, {college.state}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getGradeColor(college.naac_grade)} font-medium`}>
            NAAC {college.naac_grade}
          </Badge>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {college.type}
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-200">
            Est. {college.established_year}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center text-blue-600 mb-1">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Placement</span>
            </div>
            <p className="text-sm font-bold text-blue-800">{college.placement_percentage}%</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center text-green-600 mb-1">
              <Star className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Avg Package</span>
            </div>
            <p className="text-sm font-bold text-green-800">₹{college.average_package}L</p>
          </div>
        </div>

        {/* Fees */}
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-xs text-orange-600 font-medium mb-1">Annual Fees</p>
          <p className="text-lg font-bold text-orange-800">{formatFees(college.total_fees)}</p>
        </div>

        {/* Courses */}
        <div>
          <p className="text-xs font-medium text-gray-600 mb-2">Popular Courses</p>
          <div className="flex flex-wrap gap-1">
            {college.courses_offered.slice(0, 3).map((course, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                {course}
              </Badge>
            ))}
            {college.courses_offered.length > 3 && (
              <Badge variant="secondary" className="text-xs px-2 py-1">
                +{college.courses_offered.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {college.phone && (
            <Button size="sm" variant="outline" className="text-xs p-2">
              <Phone className="h-3 w-3" />
            </Button>
          )}
          {college.admission_email && (
            <Button size="sm" variant="outline" className="text-xs p-2">
              <Mail className="h-3 w-3" />
            </Button>
          )}
          {college.website && (
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs p-2"
              onClick={() => window.open(college.website, '_blank')}
            >
              <Globe className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onApply?.(college.id)}
          >
            Apply Now
          </Button>
          <Button 
            variant="outline" 
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={() => onCompare?.(college)}
          >
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovedCollegeCard;
