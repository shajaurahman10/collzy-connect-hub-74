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

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Extended sample colleges data
  const sampleColleges = [
    {
      id: 1,
      name: "Yenapoya Institution Of Medical Science",
      location: "Manglore,Karnataka",
      type: "Private",
      rating: 4.9,
      students: 23000,
      description: "UGC ranked Indias one of most trusted medical institution",
      image: "yenapoya.jpg",
      whatsapp: "+91 8129913205",
      status: "approved",
      tuition: "100000/-",
      founded: 2001
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, CA",
      type: "Private",
      rating: 4.8,
      students: 17000,
      description: "Leading university in technology and innovation, located in Silicon Valley.",
      image: "/placeholder.svg",
      whatsapp: "+1234567891",
      status: "approved",
      tuition: "$56,169",
      founded: 1885
    },
    {
      id: 3,
      name: "MIT",
      location: "Cambridge, MA",
      type: "Private",
      rating: 4.9,
      students: 11500,
      description: "Premier institution for science, technology, engineering, and mathematics.",
      image: "/placeholder.svg",
      whatsapp: "+1234567892",
      status: "approved",
      tuition: "$57,986",
      founded: 1861
    },
    {
      id: 4,
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      type: "Public",
      rating: 4.7,
      students: 45000,
      description: "Top-ranked public research university with outstanding programs across disciplines.",
      image: "/placeholder.svg",
      whatsapp: "+1234567893",
      status: "approved",
      tuition: "$14,312",
      founded: 1868
    },
    {
      id: 5,
      name: "University of Oxford",
      location: "Oxford, UK",
      type: "Public",
      rating: 4.9,
      students: 24000,
      description: "One of the oldest and most prestigious universities in the English-speaking world.",
      image: "/placeholder.svg",
      whatsapp: "+441234567894",
      status: "approved",
      tuition: "£9,250",
      founded: 1096
    },
    {
      id: 6,
      name: "California Institute of Technology",
      location: "Pasadena, CA",
      type: "Private",
      rating: 4.8,
      students: 2200,
      description: "Small but mighty institution specializing in science and engineering research.",
      image: "/placeholder.svg",
      whatsapp: "+1234567895",
      status: "approved",
      tuition: "$58,680",
      founded: 1891
    }
  ];

  useEffect(() => {
    setColleges(sampleColleges);
  }, []);

  const filteredAndSortedColleges = colleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || college.type.toLowerCase() === filterType;
      return matchesSearch && matchesFilter && college.status === 'approved';
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Browse Colleges</h1>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              Discover the perfect college for your academic journey. Explore thousands of institutions worldwide 
              and find your ideal match.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Main Search */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                    <Input
                      placeholder="Search colleges, universities, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 text-lg border-blue-300 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-6 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                </div>

                {/* Extended Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
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
          <div className="flex items-center justify-between mb-6">
            <p className="text-blue-700">
              Showing <span className="font-semibold">{filteredAndSortedColleges.length}</span> colleges
              {searchTerm && (
                <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
            
            <div className="flex gap-2">
              <Badge variant={filterType === 'all' ? 'default' : 'outline'} className="bg-blue-600">
                All ({colleges.filter(c => c.status === 'approved').length})
              </Badge>
              <Badge variant={filterType === 'private' ? 'default' : 'outline'} className="bg-blue-600">
                Private ({colleges.filter(c => c.type.toLowerCase() === 'private' && c.status === 'approved').length})
              </Badge>
              <Badge variant={filterType === 'public' ? 'default' : 'outline'} className="bg-blue-600">
                Public ({colleges.filter(c => c.type.toLowerCase() === 'public' && c.status === 'approved').length})
              </Badge>
            </div>
          </div>

          {/* Colleges Grid */}
          {filteredAndSortedColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedColleges.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onApply={() => handleApplyToCollege(college)}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-16 border-blue-200 bg-white/80">
              <CardContent>
                <Building2 className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-700 mb-2">No colleges found</h3>
                <p className="text-blue-600 mb-6">
                  Try adjusting your search terms or filters to find more results.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
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
            <div className="text-center mt-12">
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
