import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CollegeCard from '@/components/CollegeCard';
import SearchFilters from '@/components/SearchFilters';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { indianColleges, getAllStates } from '@/data/indianColleges';
import { majorCityColleges } from '@/data/majorCityColleges';
import { googleSheetsIntegration } from '@/utils/googleSheetsIntegration';
import { comprehensiveCollegeData, getAllComprehensiveStates } from '@/data/comprehensiveCollegeData';
import { privateColleges } from '@/data/privateColleges';
import { massiveCollegeData, getAllMassiveStates } from '@/data/massiveCollegeData';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [displayedColleges, setDisplayedColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(50);
  const { toast } = useToast();

  useEffect(() => {
    loadColleges();
  }, []);

  useEffect(() => {
    // Check if user returned from Google Form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('profile') === 'created') {
      localStorage.setItem('collzy-profile-created', 'true');
      toast({
        title: "🎉 Profile Created Successfully!",
        description: "Now you can apply to colleges. Check your email frequently to connect with colleges!",
        duration: 6000,
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  const loadColleges = async () => {
    try {
      setLoading(true);
      // Try to get colleges from Google Sheets first
      const sheetsColleges = await googleSheetsIntegration.getColleges();
      // Combine with all local college data including massive data
      const allColleges = [
        ...indianColleges, 
        ...majorCityColleges, 
        ...comprehensiveCollegeData, 
        ...privateColleges, 
        ...massiveCollegeData,
        ...sheetsColleges
      ];
      setColleges(allColleges);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to local data including massive data
      setColleges([
        ...indianColleges, 
        ...majorCityColleges, 
        ...comprehensiveCollegeData, 
        ...privateColleges, 
        ...massiveCollegeData
      ]);
      toast({
        title: "Loading Notice",
        description: "Using local college data. Connect Google Sheets for live updates.",
        variant: "default"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedColleges = colleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || college.type.toLowerCase() === filterType;
      const matchesState = selectedState === 'all' || college.state === selectedState;
      return matchesSearch && matchesFilter && matchesState && college.status === 'approved';
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
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
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  const handleApplyToCollege = (college) => {
    const message = `🎓 Hello! I found your college through Collzy platform and I'm very interested in applying to ${college.name}.

Could you please provide me with detailed information about:

📚 Available Courses & Programs:
- Course offerings and specializations
- Eligibility criteria and prerequisites
- Duration and curriculum details

💰 Fee Structure:
- Tuition fees (semester/annual)
- Additional charges (lab, library, sports, etc.)
- Payment schedule and options
- Scholarship opportunities

🏠 Accommodation:
- Hostel facilities and availability
- Hostel fees and room types
- Mess facilities and food arrangements
- Safety and security measures

📋 Admission Process:
- Application deadlines and procedure
- Entrance exams (if any)
- Required documents
- Selection criteria

🎯 Additional Information:
- Campus facilities and infrastructure
- Faculty qualifications and student-teacher ratio
- Placement opportunities and statistics
- Extracurricular activities

I am very interested in joining your esteemed institution and would be grateful for a prompt response. Please let me know if you need any additional information from my side.

Thank you for your time and consideration.

Best regards,
Prospective Student
(Via Collzy Platform)

Note: This inquiry was sent through Collzy - India's leading college discovery platform.`;

    const whatsappUrl = `https://wa.me/${college.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Application Initiated",
      description: `Opening WhatsApp to contact ${college.name}`,
    });
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
  };

  const states = getAllMassiveStates();

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">Loading 300+ colleges...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show partnership message for states with no colleges
  const showPartnershipMessage = selectedState !== 'all' && filteredAndSortedColleges.length === 0 && !searchTerm;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Discover Your Perfect College
            </h1>
            <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
              Explore 300+ institutions across India. Find your ideal academic match with our comprehensive search and filtering system.
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
            colleges={colleges}
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

          {/* Partnership Message for States with No Colleges */}
          {showPartnershipMessage && (
            <Card className="text-center py-16 sm:py-20 border-orange-200 bg-orange-50/80 backdrop-blur-sm mb-8 animate-fade-in">
              <CardContent>
                <Building2 className="h-16 sm:h-20 w-16 sm:w-20 text-orange-400 mx-auto mb-6" />
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-700 mb-3">
                  {selectedState} - Still Not Partnered with Collzy!
                </h3>
                <p className="text-orange-600 mb-8 px-4 max-w-md mx-auto">
                  We haven't partnered with colleges in {selectedState} yet, but we're working on it! 
                  Check back soon for updates.
                </p>
                <Button 
                  onClick={handleClearFilters}
                  className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-all duration-200"
                >
                  Explore Other States
                </Button>
              </CardContent>
            </Card>
          )}

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
                    <CollegeCard
                      college={college}
                      onApply={() => handleApplyToCollege(college)}
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
                    disabled={loadingMore}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading More...
                      </>
                    ) : (
                      `Load More (${filteredAndSortedColleges.length - displayedColleges.length} remaining)`
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : !showPartnershipMessage && (
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
      </div>
      <Footer />
    </>
  );
};

export default Colleges;
