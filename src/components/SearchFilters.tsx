
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  selectedState: string;
  onStateChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  states: string[];
  showFilters: boolean;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  colleges: any[];
}

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  selectedState,
  onStateChange,
  sortBy,
  onSortChange,
  states,
  showFilters,
  onToggleFilters,
  onClearFilters,
  colleges
}: SearchFiltersProps) => {
  const getTypeCount = (type: string) => {
    if (type === 'all') return colleges.filter(c => c.status === 'approved').length;
    return colleges.filter(c => c.type.toLowerCase() === type && c.status === 'approved').length;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="space-y-4">
        {/* Main Search Row */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
            <Input
              placeholder="Search colleges by name, location, or state..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 text-lg border-blue-200 focus:border-blue-400 focus:ring-blue-200 rounded-xl"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className={`h-12 px-6 border-blue-200 transition-all duration-200 ${
              showFilters 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Advanced Filters</span>
            <span className="sm:hidden">Filters</span>
          </Button>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={filterType === 'all' ? 'default' : 'outline'} 
            className={`cursor-pointer transition-all duration-200 ${
              filterType === 'all' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'hover:bg-blue-50 border-blue-200'
            }`}
            onClick={() => onFilterTypeChange('all')}
          >
            All ({getTypeCount('all')})
          </Badge>
          <Badge 
            variant={filterType === 'private' ? 'default' : 'outline'} 
            className={`cursor-pointer transition-all duration-200 ${
              filterType === 'private' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'hover:bg-blue-50 border-blue-200'
            }`}
            onClick={() => onFilterTypeChange('private')}
          >
            Private ({getTypeCount('private')})
          </Badge>
          <Badge 
            variant={filterType === 'public' ? 'default' : 'outline'} 
            className={`cursor-pointer transition-all duration-200 ${
              filterType === 'public' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'hover:bg-blue-50 border-blue-200'
            }`}
            onClick={() => onFilterTypeChange('public')}
          >
            Public ({getTypeCount('public')})
          </Badge>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-blue-100">
            <div>
              <label className="text-sm font-medium text-blue-800 mb-2 block">State/Region</label>
              <Select value={selectedState} onValueChange={onStateChange}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
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
              <Select value={filterType} onValueChange={onFilterTypeChange}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="private">Private Universities</SelectItem>
                  <SelectItem value="public">Public Universities</SelectItem>
                  <SelectItem value="community">Community Colleges</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-blue-800 mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
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
                onClick={onClearFilters}
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
