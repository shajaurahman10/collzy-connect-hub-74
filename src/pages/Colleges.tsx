
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
import { googleSheetsIntegration } from '@/utils/googleSheetsIntegration';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoading(true);
      // Try to get colleges from Google Sheets first
      const sheetsColleges = await googleSheetsIntegration.getColleges();
      // Combine with Indian colleges data
      const allColleges = [...indianColleges, ...sheetsColleges];
      setColleges(allColleges);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to Indian colleges only
      setColleges(indianColleges);
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

  const handleApplyToCollege = (college) => {
    const message = `🎓 Hello! I found your college through Collzy platform and I'm very interested in applying to ${college.name}.

Could you please provide me with detailed information about:

📚 Course details and eligibility criteria
💰 Fee structure (tuition + other charges)
🏠 Hostel facilities and accommodation fees
📅 Admission process and important dates
📋 Required documents for application
🎯 Placement opportunities and statistics
🏛️ Campus facilities and infrastructure

I'm excited to learn more about your institution. Thank you for your time!

Best regards,
A prospective student from Collzy 🌟`;

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

  const states = getAllStates();

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">Loading colleges...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Discover Your Perfect College
            </h1>
            <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
              Explore thousands of institutions across India. Find your ideal academic match with our comprehensive search and filtering system.
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
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Clear All Filters
              </Button>
            )}
          </div>

          {/* Colleges Grid */}
          {filteredAndSortedColleges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredAndSortedColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onApply={() => handleApplyToCollege(college)}
                  onFavorite={handleFavoriteCollege}
                />
              ))}
            </div>
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
                  className="bg-blue-600 hover:bg-blue-700"
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
