import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Users, Star, ArrowRight, GraduationCap, Building2, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CollegeCard from '@/components/CollegeCard';
import LiveRatings from '@/components/LiveRatings';
import BlogSection from '@/components/BlogSection';
import { useToast } from '@/hooks/use-toast';
import { googleSheetsService } from '@/utils/googleSheets';
import { indianColleges, getAllStates } from '@/data/indianColleges';
import { majorCityColleges } from '@/data/majorCityColleges';
import { comprehensiveCollegeData, getAllComprehensiveStates } from '@/data/comprehensiveCollegeData';
import { privateColleges } from '@/data/privateColleges';

const Index = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const approvedColleges = await googleSheetsService.getColleges('approved');
      // Combine all college data sources including private colleges
      const allColleges = [...indianColleges, ...majorCityColleges, ...comprehensiveCollegeData, ...privateColleges, ...approvedColleges];
      setColleges(allColleges);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to combined local data including private colleges
      setColleges([...indianColleges, ...majorCityColleges, ...comprehensiveCollegeData, ...privateColleges]);
    }
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || college.type.toLowerCase() === filterType;
    const matchesState = selectedState === 'all' || college.state === selectedState;
    return matchesSearch && matchesFilter && matchesState && college.status === 'approved';
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

  const states = getAllComprehensiveStates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <Hero />

      {/* Search and Filter Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Discover Indian Colleges</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Explore 500+ colleges and universities across India. Find the perfect match for your academic journey.
            </p>
          </div>

          {/* Live Ratings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 animate-fade-in">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search colleges, universities, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10 sm:h-12 text-base sm:text-lg transition-all duration-200"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="h-10 sm:h-12 px-3 sm:px-4 border border-gray-300 rounded-md bg-white text-sm sm:text-base transition-all duration-200"
                    >
                      <option value="all">All States</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    
                    {/* Filter Buttons */}
                    <Button
                      variant={filterType === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilterType('all')}
                      className="h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4 hover:scale-105 transition-all duration-200"
                    >
                      All
                    </Button>
                    <Button
                      variant={filterType === 'private' ? 'default' : 'outline'}
                      onClick={() => setFilterType('private')}
                      className="h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4 hover:scale-105 transition-all duration-200"
                    >
                      Private
                    </Button>
                    <Button
                      variant={filterType === 'public' ? 'default' : 'outline'}
                      onClick={() => setFilterType('public')}
                      className="h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4 hover:scale-105 transition-all duration-200"
                    >
                      Public
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <LiveRatings />
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredColleges.slice(0, 50).map((college, index) => (
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

          {filteredColleges.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No colleges found</h3>
              <p className="text-gray-500 px-4">Try adjusting your search terms or filters</p>
            </div>
          )}

          {filteredColleges.length > 50 && (
            <div className="text-center mt-6 sm:mt-8">
              <p className="text-gray-600 mb-4 text-sm sm:text-base px-4">Showing first 50 results. Use filters to narrow your search.</p>
              <Button asChild variant="outline">
                <Link to="/colleges">View All Colleges</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Collzy?</h2>
            <p className="text-base sm:text-lg text-gray-600">Your complete college admissions platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Smart Search</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Find colleges that match your preferences with our advanced search and filtering system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-6 sm:h-8 w-6 sm:w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Easy Applications</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Apply to colleges with just one click through our integrated communication system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 sm:h-8 w-6 sm:w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Profile Management</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Create and manage your academic profile to showcase your achievements and track applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your College Journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
            Join thousands of students who have found their perfect college match through Collzy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-3">
              <Link to="/profile">
                Create Profile
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/colleges">
                Explore Colleges
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png" alt="Collzy" className="h-8 w-8 mr-3" />
                <span className="text-lg sm:text-xl font-bold">Collzy</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-2">
                Your trusted partner in college admissions and career guidance.
              </p>
              <p className="text-xs text-gray-500">An MSR initiative</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Platform</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link to="/colleges" className="hover:text-white transition-colors">Browse Colleges</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">Create Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-base sm:text-lg">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2024 Collzy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
