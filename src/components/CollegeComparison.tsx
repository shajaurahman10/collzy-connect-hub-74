
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Star, MapPin, Users, Award, Globe, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface College {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  established_year: number;
  affiliation: string;
  naac_grade: string;
  nirf_ranking?: number;
  website?: string;
  admission_email?: string;
  phone?: string;
  address?: string;
  courses_offered: string[];
  total_fees: number;
  hostel_available: boolean;
  placement_percentage: number;
  average_package: number;
  highest_package: number;
  accreditations?: string[];
  facilities?: string[];
  campus_size?: string;
  student_strength?: number;
  faculty_count?: number;
  library_books?: number;
  image_url?: string;
  brochure_url?: string;
  virtual_tour_url?: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface CollegeComparisonProps {
  colleges: College[];
  onClose: () => void;
}

const CollegeComparison = ({ colleges, onClose }: CollegeComparisonProps) => {
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [availableColleges, setAvailableColleges] = useState<College[]>(colleges);
  const { toast } = useToast();

  const addToComparison = (college: College) => {
    if (selectedColleges.length >= 3) {
      toast({
        title: "Maximum limit reached",
        description: "You can compare up to 3 colleges at a time.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedColleges([...selectedColleges, college]);
    setAvailableColleges(availableColleges.filter(c => c.id !== college.id));
  };

  const removeFromComparison = (college: College) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== college.id));
    setAvailableColleges([...availableColleges, college]);
  };

  const getGradeScore = (grade: string) => {
    const scores = { 'A++': 100, 'A+': 90, 'A': 80, 'B++': 70, 'B+': 60, 'B': 50 };
    return scores[grade as keyof typeof scores] || 0;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A++': return 'bg-green-100 text-green-800';
      case 'A+': return 'bg-blue-100 text-blue-800';
      case 'A': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-700">College Comparison</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {selectedColleges.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Comparing Colleges</h3>
                <p className="text-gray-600">Select colleges from the list below to compare them side by side</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {availableColleges.map((college) => (
                  <Card key={college.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{college.name}</h4>
                      <p className="text-xs text-gray-600 mb-3">{college.city}, {college.state}</p>
                      <Button 
                        size="sm" 
                        onClick={() => addToComparison(college)}
                        className="w-full"
                      >
                        Add to Compare
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Comparison Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {selectedColleges.map((college) => (
                  <Card key={college.id} className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => removeFromComparison(college)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">{college.name}</CardTitle>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{college.city}, {college.state}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">NAAC Grade</span>
                        <Badge className={getGradeColor(college.naac_grade)}>
                          {college.naac_grade}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Affiliation</span>
                        <Badge variant="outline">{college.affiliation}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Grade Score</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="font-semibold">{getGradeScore(college.naac_grade)}/100</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {college.website && (
                          <div className="flex items-center text-sm">
                            <Globe className="h-4 w-4 mr-2 text-blue-600" />
                            <a href={college.website} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-600 hover:underline truncate">
                              Website
                            </a>
                          </div>
                        )}
                        
                        {college.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-green-600" />
                            <span className="truncate">{college.phone}</span>
                          </div>
                        )}
                        
                        {college.admission_email && (
                          <div className="flex items-center text-sm">
                            <Mail className="h-4 w-4 mr-2 text-red-600" />
                            <span className="truncate">{college.admission_email}</span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Apply Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Add More Colleges */}
              {selectedColleges.length < 3 && availableColleges.length > 0 && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold mb-4">Add More Colleges to Compare</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                      {availableColleges.slice(0, 9).map((college) => (
                        <Button 
                          key={college.id}
                          variant="outline" 
                          size="sm"
                          onClick={() => addToComparison(college)}
                          className="text-left justify-start"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {college.name}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeComparison;
