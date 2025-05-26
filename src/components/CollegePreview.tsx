
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Star, Phone, Globe, CheckCircle } from 'lucide-react';

interface College {
  id?: number;
  name: string;
  location: string;
  type: string;
  description: string;
  website?: string;
  whatsapp: string;
  email?: string;
  rating?: number;
  students?: number;
  image?: string;
}

interface CollegePreviewProps {
  college: College;
  isPreview?: boolean;
}

const CollegePreview = ({ college, isPreview = false }: CollegePreviewProps) => {
  const handleApply = () => {
    const message = `Hi! I'm interested in applying to ${college.name}. Could you please provide me with more information about the admission process and requirements? Thank you!`;
    const whatsappUrl = `https://wa.me/${college.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      {isPreview && (
        <div className="bg-green-100 border-b border-green-200 px-6 py-3">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold">College Preview - Submitted for Review</span>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {college.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-lg">
              <MapPin className="h-4 w-4 text-gray-500" />
              {college.location}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit">
              {college.type}
            </Badge>
            {college.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{college.rating}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          {college.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {college.students && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Students</p>
                <p className="font-semibold">{college.students.toLocaleString()}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <Phone className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">WhatsApp</p>
              <p className="font-semibold">{college.whatsapp}</p>
            </div>
          </div>

          {college.website && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <Globe className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a 
                  href={college.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            </div>
          )}

          {college.email && (
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <Globe className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{college.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={handleApply}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8"
            size="lg"
          >
            Apply via WhatsApp
          </Button>
        </div>

        {isPreview && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Status:</strong> Your college submission is under review. 
              Once approved by our admin team, it will be visible to all students on the platform.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollegePreview;
