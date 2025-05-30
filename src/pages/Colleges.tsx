
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ImprovedCollegeCard from '@/components/ImprovedCollegeCard';
import SearchFilters from '@/components/SearchFilters';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useColleges } from '@/hooks/useColleges';

const Colleges = () => {
  const { colleges: allColleges, loading: collegesLoading } = useColleges();
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(50);
  const { toast } = useToast();

  // Get unique states from colleges
  const states = [...new Set(allColleges.map(college => college.state))].sort();

  const filteredAndSortedColleges = allColleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || college.type.toLowerCase() === filterType.toLowerCase();
      const matchesState = selectedState === 'all' || college.state === selectedState;
      return matchesSearch && matchesFilter && matchesState;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'students':
          return (b.students || 0) - (a.students || 0);
        case 'founded':
          return (b.founded || 0) - (a.founded || 0);
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
    setFilterType('all');
    setSelectedState('all');
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
            <p className="text-blue-600 font-medium">Loading colleges...</p>
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
            Discover Your Perfect College
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
            Explore hundreds of institutions across India. Find your ideal academic match with our comprehensive search and filtering system.
          </p>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          selectedState={selectedState}
          onStateChange={setSelectedState}
          sortBy={sortBy}
          onSortChange={setSortBy}
          states={states}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={handleClearFilters}
          colleges={allColleges}
        />

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-blue-700 text-base sm:text-lg font-medium">
              Found <span className="font-bold text-blue-800">{filteredAndSortedColleges.length}</span> colleges
              {searchTerm && (
                <span> matching "<span className="font-semibold text-blue-900">{searchTerm}</span>"</span>
              )}
            </p>
            {selectedState !== 'all' && (
              <p className="text-sm text-blue-600 mt-1">in {selectedState}</p>
            )}
          </div>
          
          {(searchTerm || filterType !== 'all' || selectedState !== 'all') && (
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
            >
              Clear All Filters
            </Button>
          )}
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
                  <ImprovedCollegeCard
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

export default Colleges;
