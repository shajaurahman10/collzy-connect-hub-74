
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Users, Star, Building2, SlidersHorizontal } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CollegeCard from '@/components/CollegeCard';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { indianColleges, getAllStates } from '@/data/indianColleges';
import { googleSheetsService } from '@/utils/googleSheets';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const approvedColleges = await googleSheetsService.getColleges('approved');
      // Combine Indian colleges with any other approved colleges
      const allColleges = [...indianColleges, ...approvedColleges];
      setColleges(allColleges);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to Indian colleges
      setColleges(indianColleges);
    }
  };

  const filteredAndSortedColleges = colleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
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
          return b.founded - a.founded;
        default:
          return 0;
      }
    });

  const handleApplyToCollege = (college) => {
    const message = `Hi! I'm interested in applying to ${college.name}. Could you please provide me with more information about the admission process and requirements? Thank you!`;
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

  const states = getAllStates();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Browse Colleges</h1>
            <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4">
              Discover the perfect college for your academic journey. Explore thousands of institutions across India 
              and find your ideal match.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 lg:mb-8 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {/* Main Search */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                    <Input
                      placeholder="Search colleges, universities, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 sm:h-12 text-base sm:text-lg border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-10 sm:h-12 px-4 sm:px-6 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <SlidersHorizontal className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    <span className="hidden sm:inline">Filters</span>
                    <span className="sm:hidden">Filter</span>
                  </Button>
                </div>

                {/* Extended Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-blue-200">
                    <div>
                      <label className="text-sm font-medium text-blue-800 mb-2 block">State</label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="border-blue-300">
                          <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {states.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-blue-800 mb-2 block">Institution Type</label>
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="border-blue-300">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-blue-800 mb-2 block">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="border-blue-300">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="students">Most Students</SelectItem>
                          <SelectItem value="founded">Newest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-end">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm('');
                          setFilterType('all');
                          setSelectedState('all');
                          setSortBy('name');
                        }}
                        className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <p className="text-blue-700 text-sm sm:text-base">
              Showing <span className="font-semibold">{filteredAndSortedColleges.length}</span> colleges
              {searchTerm && (
                <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant={filterType === 'all' ? 'default' : 'outline'} className="bg-blue-600 text-xs sm:text-sm">
                All ({colleges.filter(c => c.status === 'approved').length})
              </Badge>
              <Badge variant={filterType === 'private' ? 'default' : 'outline'} className="bg-blue-600 text-xs sm:text-sm">
                Private ({colleges.filter(c => c.type.toLowerCase() === 'private' && c.status === 'approved').length})
              </Badge>
              <Badge variant={filterType === 'public' ? 'default' : 'outline'} className="bg-blue-600 text-xs sm:text-sm">
                Public ({colleges.filter(c => c.type.toLowerCase() === 'public' && c.status === 'approved').length})
              </Badge>
            </div>
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
            <Card className="text-center py-12 sm:py-16 border-blue-200 bg-white/80">
              <CardContent>
                <Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-2">No colleges found</h3>
                <p className="text-blue-600 mb-6 px-4">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setSelectedState('all');
                    setSortBy('name');
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Load More */}
          {filteredAndSortedColleges.length > 0 && (
            <div className="text-center mt-8 lg:mt-12">
              <Button variant="outline" size="lg" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Load More Colleges
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Colleges;
