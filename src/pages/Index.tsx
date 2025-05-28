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
import StarNominationForm from '@/components/StarNominationForm';
import { useToast } from '@/hooks/use-toast';
import { googleSheetsService } from '@/utils/googleSheets';
import { indianColleges, getAllStates } from '@/data/indianColleges';

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
      // Combine Indian colleges with any other approved colleges
      const allColleges = [...indianColleges, ...approvedColleges];
      setColleges(allColleges);
    } catch (error) {
      console.error('Error loading colleges:', error);
      // Fallback to Indian colleges
      setColleges(indianColleges);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navigation />
      
      <Hero />

      {/* Starred Colleges Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Star Colleges</h2>
          <p className="text-lg text-gray-600 mb-8">Featured institutions that stand out for excellence</p>
          
          <div className="bg-white rounded-2xl shadow-lg p-12 border-2 border-dashed border-yellow-300">
            <Star className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">No Star Colleges Yet</h3>
            <p className="text-gray-600 mb-6">
              Help us feature outstanding colleges by nominating your institution for star status.
            </p>
            <StarNominationForm />
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Discover Indian Colleges</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore top colleges and universities across India. Find the perfect match for your academic journey.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search colleges, universities, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="h-12 px-4 border border-gray-300 rounded-md bg-white"
                >
                  <option value="all">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterType('all')}
                  className="h-12"
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'private' ? 'default' : 'outline'}
                  onClick={() => setFilterType('private')}
                  className="h-12"
                >
                  Private
                </Button>
                <Button
                  variant={filterType === 'public' ? 'default' : 'outline'}
                  onClick={() => setFilterType('public')}
                  className="h-12"
                >
                  Public
                </Button>
              </div>
            </div>
          </div>

          {/* Colleges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.slice(0, 50).map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                onApply={() => handleApplyToCollege(college)}
                onFavorite={handleFavoriteCollege}
              />
            ))}
          </div>

          {filteredColleges.length === 0 && (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}

          {filteredColleges.length > 50 && (
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Showing first 50 results. Use filters to narrow your search.</p>
              <Button asChild variant="outline">
                <Link to="/colleges">View All Colleges</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Collzy?</h2>
            <p className="text-lg text-gray-600">Your complete college admissions platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Smart Search</CardTitle>
                <CardDescription>
                  Find colleges that match your preferences with our advanced search and filtering system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Easy Applications</CardTitle>
                <CardDescription>
                  Apply to colleges with just one click through our integrated WhatsApp communication system.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>
                  Create and manage your academic profile to showcase your achievements and track applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Removed "Add Your College" button */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your College Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have found their perfect college match through Collzy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/profile">
                Create Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/colleges">
                Explore Colleges
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/ba2b27af-670e-433d-a061-f5e9501ac624.png" alt="Collzy" className="h-8 w-8 mr-3" />
                <span className="text-xl font-bold">Collzy</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in college admissions and career guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/colleges" className="hover:text-white transition-colors">Browse Colleges</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">Create Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Collzy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
