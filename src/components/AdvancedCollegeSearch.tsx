
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
  searchTerm: string;
  state: string;
  type: string;
  course: string;
  naacGrade: string;
  maxFees: number;
}

interface AdvancedCollegeSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

const AdvancedCollegeSearch = ({ onSearch, onReset }: AdvancedCollegeSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    state: '',
    type: '',
    course: '',
    naacGrade: '',
    maxFees: 1000000
  });

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Uttar Pradesh',
    'West Bengal', 'Gujarat', 'Telangana', 'Rajasthan', 'Punjab', 'Haryana',
    'Kerala', 'Odisha', 'Uttarakhand', 'Jharkhand', 'Assam', 'Chhattisgarh', 'Madhya Pradesh'
  ];

  const courses = [
    'B.Tech', 'MBA', 'MBBS', 'BBA', 'B.Com', 'B.Sc', 'M.Tech', 'MCA', 'BCA',
    'Law', 'Pharmacy', 'Architecture', 'Design', 'Liberal Arts', 'Economics'
  ];

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      state: '',
      type: '',
      course: '',
      naacGrade: '',
      maxFees: 1000000
    };
    setFilters(resetFilters);
    onReset();
  };

  const formatFees = (fees: number) => {
    if (fees >= 100000) {
      return `₹${(fees / 100000).toFixed(1)}L`;
    }
    return `₹${(fees / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-blue-900">
          <Filter className="h-5 w-5 mr-2" />
          Find Your Perfect College
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search Term */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search by College Name or City
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="e.g., VIT, Bangalore, Engineering"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="pl-10 border-blue-200 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">State</Label>
            <Select value={filters.state} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value }))}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">College Type</Label>
            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Government">Government</SelectItem>
                <SelectItem value="Deemed">Deemed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Course</Label>
            <Select value={filters.course} onValueChange={(value) => setFilters(prev => ({ ...prev, course: value }))}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">NAAC Grade</Label>
            <Select value={filters.naacGrade} onValueChange={(value) => setFilters(prev => ({ ...prev, naacGrade: value }))}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A++">A++</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B++">B++</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B">B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Fees Slider */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Maximum Annual Fees: {formatFees(filters.maxFees)}
          </Label>
          <Slider
            value={[filters.maxFees]}
            onValueChange={(value) => setFilters(prev => ({ ...prev, maxFees: value[0] }))}
            max={1000000}
            min={50000}
            step={25000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹50K</span>
            <span>₹10L</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleSearch}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Colleges
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedCollegeSearch;
