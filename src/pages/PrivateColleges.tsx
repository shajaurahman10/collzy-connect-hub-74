
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Search, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PrivateCollegeCard from '@/components/PrivateCollegeCard';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useColleges } from '@/hooks/useColleges';

const PrivateColleges = () => {
  const { privateColleges, loading: collegesLoading } = useColleges();
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(24);
  const { toast } = useToast();

  // Get unique states and grades from colleges
  const states = [...new Set(privateColleges.map(college => college.state))].sort();
  const grades = [...new Set(privateColleges.map(college => college.naac_grade))].sort();

  const filteredAndSortedColleges = privateColleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === 'all' || college.state === selectedState;
      const matchesGrade = selectedGrade === 'all' || college.naac_grade === selectedGrade;
      return matchesSearch && matchesState && matchesGrade;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'state':
          return a.state.localeCompare(b.state);
        case 'grade':
          const gradeOrder = { 'A++': 6, 'A+': 5, 'A': 4, 'B++': 3, 'B+': 2, 'B': 1 };
          return (gradeOrder[b.naac_grade] || 0) - (gradeOrder[a.naac_grade] || 0);
        default:
          return 0;
      }
    });

  // Implement pagination
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * collegesPerPage;
    setDisplayedColleges(filteredAndSortedColleges.slice(startIndex, endIndex));
  }, [filteredAndSortedColleges, currentPage, collegesPerPage]);

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleFavoriteCollege = (collegeId, isFavorited) => {
    toast({
      title: isFavorited ? "Added to Favorites" : "Removed from Favorites",
      description: isFavorited ? "College added to your favorites list" : "College removed from your favorites list",
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedGrade('all');
    setSortBy('name');
    setCurrentPage(1);
  };

  if (collegesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading private colleges...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Private Colleges in India
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
            Discover verified UGC and NAAC approved private colleges across India. Find the perfect institution for your academic journey.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search colleges by name, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="All states" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">NAAC Grade</label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
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
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="grade">NAAC Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-blue-700 text-base sm:text-lg font-medium">
              Found <span className="font-bold text-blue-800">{filteredAndSortedColleges.length}</span> private colleges
              {searchTerm && (
                <span> matching "<span className="font-semibold text-blue-900">{searchTerm}</span>"</span>
              )}
            </p>
            {selectedState !== 'all' && (
              <p className="text-sm text-blue-600 mt-1">in {selectedState}</p>
            )}
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
      
      <Footer />
    </div>
  );
};

export default PrivateColleges;
