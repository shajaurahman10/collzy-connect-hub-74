
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, MapPin, Star, Users } from 'lucide-react';

interface AdvancedSearchFilters {
  searchTerm: string;
  states: string[];
  naacGrades: string[];
  affiliations: string[];
  courseTypes: string[];
  establishedYear: string;
  sortBy: string;
}

interface AdvancedCollegeSearchProps {
  onSearch: (filters: AdvancedSearchFilters) => void;
  onClear: () => void;
  resultCount: number;
}

const AdvancedCollegeSearch = ({ onSearch, onClear, resultCount }: AdvancedCollegeSearchProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    searchTerm: '',
    states: [],
    naacGrades: [],
    affiliations: [],
    courseTypes: [],
    establishedYear: '',
    sortBy: 'name'
  });

  const states = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const naacGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B'];
  const affiliations = ['UGC', 'AICTE', 'NAAC', 'NBA', 'NIRF'];
  const courseTypes = [
    'Engineering', 'Medical', 'Management', 'Arts', 'Science', 'Commerce',
    'Law', 'Architecture', 'Pharmacy', 'Agriculture', 'Design'
  ];

  const handleArrayFilter = (field: keyof AdvancedSearchFilters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      searchTerm: '',
      states: [],
      naacGrades: [],
      affiliations: [],
      courseTypes: [],
      establishedYear: '',
      sortBy: 'name'
    });
    onClear();
  };

  const getActiveFiltersCount = () => {
    return (
      (filters.searchTerm ? 1 : 0) +
      filters.states.length +
      filters.naacGrades.length +
      filters.affiliations.length +
      filters.courseTypes.length +
      (filters.establishedYear ? 1 : 0)
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Advanced College Search
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Search */}
        <div className="flex space-x-2">
          <Input
            placeholder="Search colleges by name, city, or courses..."
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            {/* Location Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Location</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                {states.map((state) => (
                  <div key={state} className="flex items-center space-x-2">
                    <Checkbox
                      id={`state-${state}`}
                      checked={filters.states.includes(state)}
                      onCheckedChange={(checked) => 
                        handleArrayFilter('states', state, checked as boolean)
                      }
                    />
                    <Label htmlFor={`state-${state}`} className="text-sm">
                      {state}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* NAAC Grade */}
            <div>
              <Label className="text-sm font-medium mb-3 block">NAAC Grade</Label>
              <div className="flex flex-wrap gap-2">
                {naacGrades.map((grade) => (
                  <div key={grade} className="flex items-center space-x-2">
                    <Checkbox
                      id={`grade-${grade}`}
                      checked={filters.naacGrades.includes(grade)}
                      onCheckedChange={(checked) => 
                        handleArrayFilter('naacGrades', grade, checked as boolean)
                      }
                    />
                    <Label htmlFor={`grade-${grade}`} className="text-sm">
                      NAAC {grade}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliations */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Affiliations</Label>
              <div className="flex flex-wrap gap-2">
                {affiliations.map((affiliation) => (
                  <div key={affiliation} className="flex items-center space-x-2">
                    <Checkbox
                      id={`affiliation-${affiliation}`}
                      checked={filters.affiliations.includes(affiliation)}
                      onCheckedChange={(checked) => 
                        handleArrayFilter('affiliations', affiliation, checked as boolean)
                      }
                    />
                    <Label htmlFor={`affiliation-${affiliation}`} className="text-sm">
                      {affiliation}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Types */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Course Categories</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {courseTypes.map((course) => (
                  <div key={course} className="flex items-center space-x-2">
                    <Checkbox
                      id={`course-${course}`}
                      checked={filters.courseTypes.includes(course)}
                      onCheckedChange={(checked) => 
                        handleArrayFilter('courseTypes', course, checked as boolean)
                      }
                    />
                    <Label htmlFor={`course-${course}`} className="text-sm">
                      {course}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Established Year & Sort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="establishedYear" className="text-sm font-medium">
                  Established After
                </Label>
                <Select
                  value={filters.establishedYear}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, establishedYear: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Year</SelectItem>
                    <SelectItem value="2010">After 2010</SelectItem>
                    <SelectItem value="2000">After 2000</SelectItem>
                    <SelectItem value="1990">After 1990</SelectItem>
                    <SelectItem value="1980">After 1980</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sortBy" className="text-sm font-medium">
                  Sort By
                </Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="grade">NAAC Grade</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="established">Year Established</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button onClick={handleSearch} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Apply Filters
              </Button>
              <Button onClick={handleClear} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <span>"{filters.searchTerm}"</span>
                <X className="h-3 w-3 cursor-pointer" 
                   onClick={() => setFilters(prev => ({ ...prev, searchTerm: '' }))} />
              </Badge>
            )}
            {filters.states.map(state => (
              <Badge key={state} variant="secondary" className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{state}</span>
                <X className="h-3 w-3 cursor-pointer"
                   onClick={() => handleArrayFilter('states', state, false)} />
              </Badge>
            ))}
            {filters.naacGrades.map(grade => (
              <Badge key={grade} variant="secondary" className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>NAAC {grade}</span>
                <X className="h-3 w-3 cursor-pointer"
                   onClick={() => handleArrayFilter('naacGrades', grade, false)} />
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        {resultCount > 0 && (
          <div className="text-sm text-gray-600 pt-2 border-t">
            Found <span className="font-semibold text-blue-600">{resultCount}</span> colleges
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedCollegeSearch;
