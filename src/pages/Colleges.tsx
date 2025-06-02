
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ImprovedCollegeCard from '@/components/ImprovedCollegeCard';
import AdvancedCollegeSearch from '@/components/AdvancedCollegeSearch';
import EntranceExamCard from '@/components/EntranceExamCard';
import { useColleges } from '@/hooks/useColleges';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, Search, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
            Explore thousands of colleges across India. Find the perfect match for your career aspirations with our comprehensive search and comparison tools.
          </p>
        </div>

        <Tabs defaultValue="colleges" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur">
            <TabsTrigger value="colleges" className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Colleges</span>
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Entrance Exams</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrance Exams</h2>
              <p className="text-gray-600">Apply for entrance exams with just one click</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entranceExams.map((exam) => (
                <EntranceExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Colleges;
