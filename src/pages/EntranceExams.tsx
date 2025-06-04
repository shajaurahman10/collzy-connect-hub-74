
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink, Search, Filter, BookOpen, GraduationCap, Award, Users, MapPin, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface EntranceExam {
  id: string;
  name: string;
  full_name: string;
  conducting_body: string;
  exam_level: string;
  exam_type: string;
  exam_date?: string;
  application_start_date?: string;
  application_end_date?: string;
  registration_fee?: number;
  official_website: string;
  eligibility_criteria?: string;
  exam_pattern?: string;
  description?: string;
  participating_colleges?: string[];
  status?: string;
}

const EntranceExams = () => {
  const [exams, setExams] = useState<EntranceExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Sample exam data (in a real app, this would come from an API)
  const sampleExams: EntranceExam[] = [
    {
      id: '1',
      name: 'KEAM',
      full_name: 'Kerala Engineering Agriculture Medical',
      conducting_body: 'Commissioner for Entrance Examinations, Kerala',
      exam_level: 'State',
      exam_type: 'Engineering',
      exam_date: '2024-06-05',
      application_start_date: '2024-03-15',
      application_end_date: '2024-04-15',
      registration_fee: 500,
      official_website: 'https://cee.kerala.gov.in',
      eligibility_criteria: '12th pass with Physics, Chemistry, Mathematics',
      exam_pattern: 'Objective type questions',
      description: 'State level entrance exam for Engineering, Agriculture and Medical courses in Kerala',
      participating_colleges: ['All Kerala Government Engineering Colleges', 'Most Private Engineering Colleges in Kerala'],
      status: 'active'
    },
    {
      id: '2',
      name: 'KMAT Kerala',
      full_name: 'Kerala Management Aptitude Test',
      conducting_body: 'Commissioner for Entrance Examinations, Kerala',
      exam_level: 'State',
      exam_type: 'Management',
      exam_date: '2024-05-20',
      application_start_date: '2024-03-01',
      application_end_date: '2024-04-10',
      registration_fee: 1200,
      official_website: 'https://kmatkerala.in',
      eligibility_criteria: "Bachelor's degree in any discipline",
      exam_pattern: 'Computer based test',
      description: 'For admission to MBA programs in Kerala',
      participating_colleges: ['Kerala Business Schools', 'Management Colleges in Kerala'],
      status: 'active'
    },
    {
      id: '3',
      name: 'JEE Main',
      full_name: 'Joint Entrance Examination Main',
      conducting_body: 'National Testing Agency (NTA)',
      exam_level: 'National',
      exam_type: 'Engineering',
      exam_date: '2024-04-15',
      application_start_date: '2024-02-01',
      application_end_date: '2024-03-15',
      registration_fee: 650,
      official_website: 'https://jeemain.nta.nic.in',
      eligibility_criteria: '12th pass with 75% aggregate in PCM',
      exam_pattern: 'Computer Based Test (CBT)',
      description: 'National level entrance exam for engineering admissions to NITs, IIITs, and other centrally funded technical institutions',
      participating_colleges: ['All NITs', 'IIITs', 'GFTIs'],
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExams(sampleExams);
      setLoading(false);
    }, 1000);
  }, []);

  const examLevels = [...new Set(exams.map(exam => exam.exam_level))].sort();
  const examTypes = [...new Set(exams.map(exam => exam.exam_type))].sort();

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.conducting_body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || exam.exam_level === selectedLevel;
    const matchesType = selectedType === 'all' || exam.exam_type === selectedType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  const stats = {
    total: exams.length,
    kerala: exams.filter(e => e.conducting_body.toLowerCase().includes('kerala')).length,
    national: exams.filter(e => e.exam_level === 'National').length,
    engineering: exams.filter(e => e.exam_type === 'Engineering').length,
    management: exams.filter(e => e.exam_type === 'Management').length,
    upcoming: exams.filter(e => e.exam_date && new Date(e.exam_date) > new Date()).length
  };

  const getStatusColor = (exam: EntranceExam) => {
    if (!exam.application_end_date) return 'gray';
    const endDate = new Date(exam.application_end_date);
    const today = new Date();
    
    if (endDate < today) return 'red';
    if (endDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) return 'orange';
    return 'green';
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('all');
    setSelectedType('all');
    setSelectedState('all');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-600 font-medium">Loading entrance exams...</p>
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
            Entrance Exams Guide
          </h1>
          <p className="text-lg sm:text-xl text-blue-700 max-w-4xl mx-auto px-4 leading-relaxed mb-6">
            Complete guide to entrance exams for South India colleges. Find exam dates, eligibility, patterns, and participating colleges.
          </p>
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-blue-800">{stats.total}</span>
                </div>
                <p className="text-sm text-blue-600">Total Exams</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-green-800">{stats.kerala}</span>
                </div>
                <p className="text-sm text-green-600">Kerala Exams</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-2xl font-bold text-purple-800">{stats.national}</span>
                </div>
                <p className="text-sm text-purple-600">National Level</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <GraduationCap className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-2xl font-bold text-orange-800">{stats.engineering}</span>
                </div>
                <p className="text-sm text-orange-600">Engineering</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-indigo-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-2xl font-bold text-indigo-800">{stats.management}</span>
                </div>
                <p className="text-sm text-indigo-600">Management</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-pink-600 mr-2" />
                  <span className="text-2xl font-bold text-pink-800">{stats.upcoming}</span>
                </div>
                <p className="text-sm text-pink-600">Upcoming</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search exams by name, conducting body, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto w-full border-blue-200 hover:bg-blue-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="p-6 border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Exam Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {examLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Exam Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters}
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-blue-700 text-base sm:text-lg font-medium">
            Found <span className="font-bold text-blue-800">{filteredExams.length}</span> entrance exams
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-blue-800">{exam.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{exam.full_name}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 ${
                      getStatusColor(exam) === 'green' ? 'bg-green-100 text-green-800' :
                      getStatusColor(exam) === 'orange' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {exam.exam_level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Conducting Body:</span>
                    <p className="text-gray-600">{exam.conducting_body}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Exam Type:</span>
                    <p className="text-gray-600">{exam.exam_type}</p>
                  </div>
                  {exam.exam_date && (
                    <div>
                      <span className="font-medium text-gray-700">Exam Date:</span>
                      <p className="text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(exam.exam_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {exam.registration_fee && (
                    <div>
                      <span className="font-medium text-gray-700">Fee:</span>
                      <p className="text-gray-600">₹{exam.registration_fee}</p>
                    </div>
                  )}
                </div>

                {exam.description && (
                  <div>
                    <span className="font-medium text-gray-700">Description:</span>
                    <p className="text-gray-600 text-sm mt-1">{exam.description}</p>
                  </div>
                )}

                {exam.eligibility_criteria && (
                  <div>
                    <span className="font-medium text-gray-700">Eligibility:</span>
                    <p className="text-gray-600 text-sm mt-1">{exam.eligibility_criteria}</p>
                  </div>
                )}

                {exam.application_start_date && exam.application_end_date && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <span className="font-medium text-blue-800">Application Period:</span>
                    <p className="text-blue-700 text-sm mt-1">
                      {new Date(exam.application_start_date).toLocaleDateString()} - {new Date(exam.application_end_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(exam.official_website, '_blank')}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Official Website
                  </Button>
                  
                  {exam.participating_colleges && exam.participating_colleges.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {exam.participating_colleges.length} Participating Colleges
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <Card className="text-center py-16 border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <BookOpen className="h-16 w-16 text-blue-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-blue-700 mb-3">No exams found</h3>
              <p className="text-blue-600 mb-8 px-4 max-w-md mx-auto">
                We couldn't find any entrance exams matching your criteria. Try adjusting your search terms or filters.
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
      
      <Footer />
    </div>
  );
};

export default EntranceExams;
