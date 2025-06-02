
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ImprovedCollegeCard from '@/components/ImprovedCollegeCard';
import AdvancedCollegeSearch from '@/components/AdvancedCollegeSearch';
import EntranceExamCard from '@/components/EntranceExamCard';
import { useColleges } from '@/hooks/useColleges';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Search, TrendingUp, Users, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const Colleges = () => {
  const { colleges, entranceExams, loading, searchColleges } = useColleges();
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const [searchLoading, setSearchLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFilteredColleges(colleges);
  }, [colleges]);

  const handleSearch = async (filters: any) => {
    setSearchLoading(true);
    try {
      const results = await searchColleges(filters);
      setFilteredColleges(results);
      toast({
        title: "Search completed",
        description: `Found ${results.length} colleges matching your criteria`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again with different filters",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleReset = () => {
    setFilteredColleges(colleges);
  };

  const handleApply = (collegeId: string) => {
    toast({
      title: "Application Started",
      description: "Redirecting to application portal...",
    });
    // Here you would typically redirect to the application process
  };

  const handleCompare = (college: any) => {
    toast({
      title: "Added to Comparison",
      description: `${college.name} has been added to your comparison list`,
    });
    // Here you would add to comparison state
  };

  if (loading) {
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
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Discover Your Dream College
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-3xl mx-auto px-4 leading-relaxed">
            Explore {colleges.length}+ verified colleges across India. Find the perfect match for your career aspirations with our comprehensive search and comparison tools.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-800">{colleges.length}+</h3>
              <p className="text-blue-600">Verified Colleges</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-800">{entranceExams.length}+</h3>
              <p className="text-green-600">Entrance Exams</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-800">10,000+</h3>
              <p className="text-purple-600">Students Helped</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="colleges" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur h-14">
            <TabsTrigger value="colleges" className="flex items-center space-x-3 text-lg font-medium">
              <GraduationCap className="h-5 w-5" />
              <span>Colleges ({colleges.length})</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center space-x-3 text-lg font-medium">
              <BookOpen className="h-5 w-5" />
              <span>Entrance Exams ({entranceExams.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colleges" className="space-y-6">
            <AdvancedCollegeSearch onSearch={handleSearch} onReset={handleReset} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchLoading ? 'Searching...' : `${filteredColleges.length} Colleges Found`}
              </h2>
              <div className="flex items-center text-blue-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Updated daily</span>
              </div>
            </div>

            {searchLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-white/50 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <ImprovedCollegeCard
                    key={college.id}
                    college={college}
                    onApply={handleApply}
                    onCompare={handleCompare}
                  />
                ))}
              </div>
            )}

            {filteredColleges.length === 0 && !searchLoading && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No colleges found</h3>
                <p className="text-gray-500">Try adjusting your search filters to find more results</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎯 Entrance Exams - Apply with One Click!
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Apply for {entranceExams.length}+ entrance exams directly through our platform. 
                Get instant access to official application portals.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center space-x-4">
                <Award className="h-8 w-8 text-blue-600" />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-800">One-Click Application</h3>
                  <p className="text-blue-600">Apply to multiple exams seamlessly</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entranceExams.map((exam) => (
                <EntranceExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            {entranceExams.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No entrance exams available</h3>
                <p className="text-gray-500">Check back soon for the latest entrance exam opportunities</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Colleges;
