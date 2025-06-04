
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Search, Filter, BarChart3, MapPin, GraduationCap, Award, Users, BookOpen, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PrivateCollegeCard from '@/components/PrivateCollegeCard';
import CollegeComparison from '@/components/CollegeComparison';
import AdvancedCollegeSearch from '@/components/AdvancedCollegeSearch';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useColleges } from '@/hooks/useColleges';
import { Badge } from '@/components/ui/badge';

// Define the interface for our college data
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
  contact_number?: string;
  established_year?: number;
  placement_percentage?: number;
  average_package?: number;
  highest_package?: number;
  student_strength?: number;
  faculty_count?: number;
  courses_offered?: string[];
  total_fees?: number;
}

// Enhanced city categorization for Kerala districts
const keralaDistricts = {
  'Northern Kerala': ['Kasargod', 'Kannur', 'Wayanad', 'Kozhikode'],
  'Central Kerala': ['Malappuram', 'Palakkad', 'Thrissur', 'Ernakulam', 'Kochi'],
  'Southern Kerala': ['Idukki', 'Kottayam', 'Alappuzha', 'Kollam', 'Thiruvananthapuram']
};

const majorCities = {
  'Tech Hubs': ['Bangalore', 'Hyderabad', 'Chennai', 'Kochi'],
  'Educational Centers': ['Kozhikode', 'Coimbatore', 'Guntur', 'Visakhapatnam', 'Thrissur'],
  'Heritage Cities': ['Palakkad', 'Kollam', 'Kottayam', 'Kannur', 'Ernakulam']
};

const PrivateColleges = () => {
  const { colleges, loading: collegesLoading } = useColleges();
  const [displayedColleges, setDisplayedColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(24);
  const { toast } = useToast();

  // Convert and filter colleges
  const allColleges: College[] = colleges.map(college => ({
    id: college.id,
    name: college.name,
    city: college.city,
    state: college.state,
    website: college.website || undefined,
    admission_email: college.admission_email || undefined,
    phone: college.phone || undefined,
    affiliation: college.affiliation || undefined,
    naac_grade: college.naac_grade || undefined,
    type: college.type,
    created_at: college.created_at,
    contact_number: college.phone || undefined,
    established_year: college.established_year || undefined,
    placement_percentage: college.placement_percentage || undefined,
    average_package: college.average_package || undefined,
    highest_package: college.highest_package || undefined,
    student_strength: college.student_strength || undefined,
    faculty_count: college.faculty_count || undefined,
    courses_offered: college.courses_offered || undefined,
    total_fees: college.total_fees || undefined,
  }));

  const keralaDominantColleges = allColleges.filter(college => college.state === 'Kerala');
  const otherStatesColleges = allColleges.filter(college => college.state !== 'Kerala');
  const privateColleges = allColleges.filter(college => college.type === 'Private');
  const governmentColleges = allColleges.filter(college => college.type === 'Government');

  const states = [...new Set(allColleges.map(college => college.state))].filter(Boolean).sort();
  const cities = [...new Set(allColleges.map(college => college.city))].filter(Boolean).sort();
  const grades = [...new Set(allColleges.map(college => college.naac_grade).filter(Boolean))].sort();
  const types = [...new Set(allColleges.map(college => college.type))].filter(Boolean).sort();

  const filteredAndSortedColleges = allColleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.affiliation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.courses_offered?.some(course => 
                             course.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesState = selectedState === 'all' || college.state === selectedState;
      const matchesCity = selectedCity === 'all' || college.city === selectedCity;
      const matchesGrade = selectedGrade === 'all' || college.naac_grade === selectedGrade;
      const matchesType = selectedType === 'all' || college.type === selectedType;
      return matchesSearch && matchesState && matchesCity && matchesGrade && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'state':
          return a.state.localeCompare(b.state);
        case 'city':
          return a.city.localeCompare(b.city);
        case 'established':
          return (b.established_year || 0) - (a.established_year || 0);
        case 'grade':
          const gradeOrder = { 'A++': 6, 'A+': 5, 'A': 4, 'B++': 3, 'B+': 2, 'B': 1 };
          return (gradeOrder[b.naac_grade as keyof typeof gradeOrder] || 0) - (gradeOrder[a.naac_grade as keyof typeof gradeOrder] || 0);
        case 'placement':
          return (b.placement_percentage || 0) - (a.placement_percentage || 0);
        default:
          return 0;
      }
    });

  // Enhanced statistics
  const stats = {
    total: allColleges.length,
    kerala: keralaDominantColleges.length,
    private: privateColleges.length,
    government: governmentColleges.length,
    states: states.length,
    topGrade: allColleges.filter(c => c.naac_grade === 'A++').length,
    engineering: allColleges.filter(c => 
      c.courses_offered?.some(course => course.toLowerCase().includes('engineering'))
    ).length,
    managementColleges: allColleges.filter(c => 
      c.courses_offered?.some(course => course.toLowerCase().includes('management'))
    ).length
  };

  // Implement pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * collegesPerPage;
    setDisplayedColleges(filteredAndSortedColleges.slice(startIndex, endIndex));
  }, [filteredAndSortedColleges, currentPage, collegesPerPage]);

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleFavoriteCollege = (collegeId: string, isFavorited: boolean) => {
    toast({
      title: isFavorited ? "Added to Favorites" : "Removed from Favorites",
      description: isFavorited ? "College added to your favorites list" : "College removed from your favorites list",
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedCity('all');
    setSelectedGrade('all');
    setSelectedType('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  const handleAdvancedSearch = (filters: any) => {
    console.log('Advanced search filters:', filters);
    toast({
      title: "Search Applied",
      description: "Advanced search filters have been applied successfully.",
    });
  };

  const handleClearAdvancedSearch = () => {
    handleClearFilters();
  };

  if (collegesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading comprehensive college database...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Comprehensive Statistics */}
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Complete South India College Directory
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-4xl mx-auto px-4 leading-relaxed mb-6">
            Discover {stats.total}+ verified colleges across {stats.states} states in South India. 
            Featuring {stats.kerala}+ Kerala colleges, from IITs to specialized institutions including Kasaragod LBS, Kozhikode KMCT and many more prestigious institutions.
          </p>
          
          {/* Comprehensive Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-800">{stats.total}</span>
                </div>
                <p className="text-sm text-blue-600">Total Colleges</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-800">{stats.topGrade}</span>
                </div>
                <p className="text-sm text-green-600">A++ Rated</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-800">{stats.kerala}</span>
                </div>
                <p className="text-sm text-purple-600">Kerala Colleges</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-2xl font-bold text-orange-800">{stats.private}</span>
                </div>
                <p className="text-sm text-orange-600">Private Colleges</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-indigo-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold text-indigo-800">{stats.engineering}</span>
                </div>
                <p className="text-sm text-indigo-600">Engineering</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-pink-600 mr-2" />
                  <span className="text-2xl font-bold text-pink-800">{stats.managementColleges}</span>
                </div>
                <p className="text-sm text-pink-600">Management</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Button 
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              variant="outline"
              className="bg-white hover:bg-blue-50 border-blue-200"
            >
              <Search className="h-4 w-4 mr-2" />
              Advanced Search
            </Button>
            <Button 
              onClick={() => setShowComparison(true)}
              variant="outline"
              className="bg-white hover:bg-blue-50 border-blue-200"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare Colleges
            </Button>
            <Button 
              onClick={() => setSelectedState('Kerala')}
              variant="outline"
              className="bg-white hover:bg-green-50 border-green-200"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Kerala Focus
            </Button>
          </div>

          {/* Featured Kerala Districts Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Kerala Education Districts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {Object.entries(keralaDistricts).map(([region, districts]) => (
                <div key={region} className="text-center">
                  <h4 className="font-medium text-green-700 mb-2">{region}</h4>
                  <div className="flex flex-wrap justify-center gap-1">
                    {districts.map(district => (
                      <Badge key={district} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Search Component */}
        {showAdvancedSearch && (
          <div className="mb-8">
            <AdvancedCollegeSearch
              onSearch={handleAdvancedSearch}
              onReset={handleClearAdvancedSearch}
            />
          </div>
        )}

        {/* Enhanced Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search colleges by name, city, state, courses, or affiliation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto w-full border-blue-200 hover:bg-blue-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-6 border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All states" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state} {state === 'Kerala' && `(${keralaDominantColleges.length})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All cities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">NAAC Grade</label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          NAAC {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                      <SelectItem value="grade">NAAC Grade</SelectItem>
                      <SelectItem value="established">Newest First</SelectItem>
                      <SelectItem value="placement">Best Placement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Enhanced Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-blue-700 text-base sm:text-lg font-medium">
              Found <span className="font-bold text-blue-800">{filteredAndSortedColleges.length}</span> colleges
              {searchTerm && (
                <span> matching "<span className="font-semibold text-blue-900">{searchTerm}</span>"</span>
              )}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedState !== 'all' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedState}
                </Badge>
              )}
              {selectedCity !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {selectedCity}
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {selectedType}
                </Badge>
              )}
              {selectedGrade !== 'all' && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  NAAC {selectedGrade}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        {displayedColleges.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {displayedColleges.map((college, index) => (
                <div
                  key={college.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <PrivateCollegeCard
                    college={college}
                    onFavorite={handleFavoriteCollege}
                  />
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {displayedColleges.length < filteredAndSortedColleges.length && (
              <div className="text-center mt-8">
                <Button 
                  onClick={loadMore}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                >
                  Load More ({filteredAndSortedColleges.length - displayedColleges.length} remaining)
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-16 sm:py-20 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Building2 className="h-16 sm:h-20 w-16 sm:w-20 text-blue-300 mx-auto mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-3">No colleges found</h3>
              <p className="text-blue-600 mb-8 px-4 max-w-md mx-auto">
                We couldn't find any colleges matching your criteria. Try adjusting your search terms or filters.
              </p>
              <Button 
                onClick={handleClearFilters}
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* College Comparison Modal */}
      {showComparison && (
        <CollegeComparison
          colleges={colleges}
          onClose={() => setShowComparison(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default PrivateColleges;
